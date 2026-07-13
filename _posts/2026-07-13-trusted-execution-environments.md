---
layout: post
title: "Running AI Inside a Trusted Execution Environment"
date: 2026-07-13 17:20:00+0900
description: Less a tutorial, more a field report — why you'd run an AI model inside a Trusted Execution Environment (to keep weights and data out of the host's reach), why today's TEEs strain under it (tiny enclave memory, CPU-only trust, costly CPU↔GPU transfers), and recent research directions, including why confidential GPU inference needs a Hopper-class data-center GPU and why Jetson Thor's Blackwell doesn't qualify.
tags: TEE confidential-computing gpu nvidia-hopper attestation model-protection edge-AI trustworthy-AI
thumbnail: assets/img/tee-hero.png
og_image: /assets/img/tee-hero.png
giscus_comments: true
related_posts: false
published: true
toc:
  sidebar: left
---

<p class="text-center"><small><em>한국어 버전: <a href="{{ '/blog/ko/trusted-execution-environments/' | relative_url }}">신뢰 실행 환경(TEE) 안에서 AI 돌리기</a></em></small></p>

{% include figure.liquid loading="eager" path="assets/img/tee-hero.png" class="img-fluid rounded z-depth-1" alt="An AI model and a data crystal sealed inside a glowing vault on a processor die, shielded while an eye and a hand are blocked outside" %}

A [previous post]({{ '/blog/2026/industrial-ai-information-protection/' | relative_url }}) took up AI security from the model's side — how a generative or agentic AI leaks information through its own answers, and the software-level defenses (watermarking, irreversible learning, zero-trust) that hold the line. This time I want to come at security from a different angle: the **infrastructure the model is used on**, and **edge and embedded AI** in particular, where the box doing the inference sits somewhere you don't fully control. There the question isn't what the model _says_, but who can read the model and its data while it runs — and that turns out to be a question best answered down in the hardware.

A range of cryptographic techniques now protects data **at rest** (encrypted
disk) and **in transit** (TLS), backed by mature regulations and guidelines —
personal data, for instance, is expected to be stored encrypted. So what about
data **in use**? Data that sat encrypted on disk gets decrypted into plaintext
and loaded into memory to be computed on, and at that point it is readable by
anything with enough privilege over that memory: the OS, the hypervisor, a
neighboring tenant, the cloud operator who owns the machine — and a single memory
dump can lay bare a model's structure and parameters.

A **Trusted Execution Environment (TEE)** is the hardware's answer to that third
state, and in AI it becomes a security issue that's hard to wave away. The crown
jewels — the model weights and the input data — are _exactly_ the plaintext
sitting in memory while the GPU crunches, so anyone who can read that memory can
walk off with them. This post is about running AI in a TEE: why you'd go to the
trouble, and a light tour of today's hardware constraints and the research trying
to work around them.

## So, what is a TEE?

A TEE is an isolated region the processor carves out and enforces. It sets aside
a specific area of memory for security-sensitive data; the contents of that
region are encrypted and decrypted in place, and any process without the right to
be there simply cannot reach it. Depending on how it's built it goes by different
names — an _enclave_, a _secure world_, a _confidential VM_ — and the
implementations differ in their details, but the end goal is the same: security
for the code and data inside. That comes in two parts. **Confidentiality**:
nothing outside can read its memory, not even higher-privileged software.
**Integrity**: nothing outside can tamper with it undetected. On modern parts the
memory is hardware-**encrypted**, so even someone probing the DRAM bus sees
ciphertext. The trade is in the threat model: you stop trusting the whole
software stack and instead trust the **CPU vendor** to hold one small,
well-defined line.

Two more pieces make it usable. **Attestation** lets the environment prove to a
remote party "I'm a genuine TEE from this vendor, and the exact code inside me
hashes to _this_ value" — so secrets are released only after that proof checks
out. **Sealing** binds an encryption key to the hardware and the code's
measurement, so data can only be decrypted again by the same code on the same
machine. The technologies you'll meet: **ARM TrustZone** (secure/normal world,
everywhere in phones and edge), **Intel SGX** (tiny process enclaves, now steered
toward VM-level **TDX**), and **AMD SEV-SNP** (encrypted, attested VMs).

These sort into two families — a process-level **TEE** and a hypervisor-level **TEE hypervisor** (a confidential VM):

|                    | TEE (enclave)                       | TEE hypervisor (confidential VM)                                    |
| ------------------ | ----------------------------------- | ------------------------------------------------------------------- |
| Protects           | part of one app — an _enclave_      | a whole guest **VM**                                                |
| Examples           | Intel SGX, ARM TrustZone            | Intel TDX, AMD SEV-SNP, ARM CCA                                     |
| Trusted base (TCB) | tiny — enclave code only            | large — guest OS + app                                              |
| The host           | OS untrusted; the app guards itself | hypervisor untrusted; hardware + a secure monitor enforce isolation |
| App changes        | usually rewrite / partition the app | drop-in (lift-and-shift)                                            |
| Protected memory   | small (classic ~100 MB)             | the whole VM's RAM (GBs)                                            |
| Fit for AI         | the model won't fit                 | the practical base for confidential AI                              |

Which family you use decides much of what follows — the memory problem below most
of all. Keep that much in your head; the rest of this post is what happens when
you try to put a model inside one.

## Why TEE is drawing attention in AI

The pitch is simple: run the model where the host can't see it, so a model's
structure and parameters stay visible only to the people meant to see them.
Concretely, that defends against a cluster of very real threats.

- **Model / weight theft.** Trained weights are the asset. On someone else's
  machine — a cloud host, an on-prem box you don't control, an insider with
  root — they can be copied straight out of memory. A TEE keeps them encrypted
  everywhere except inside the boundary.
- **Training-data and membership extraction.** Attackers reconstruct training
  data or infer whether a specific record was in the training set. Keeping the
  model and its I/O confidential shrinks the surface — though, honestly, a TEE
  guards the _substrate_, not the query surface: a legitimate querier can still
  probe the model, so this pairs with model-level defenses (irreversible
  learning, watermarking, output filtering) rather than replacing them.
- **Input / prompt privacy.** Medical, financial, or industrial inputs can be
  kept unreadable even to whoever operates the inference server.
- **Integrity by attestation.** You can prove the _exact_ model and code are
  running — no silently swapped or backdoored weights.

The pattern that ties these together is **confidential inference** (and,
increasingly, confidential training): the model owner and the data owner each
verify the other's TEE by attestation and only then release their half — weights
from one side, data from the other — into an environment neither host can read.
It's already shipping: cloud providers offer confidential GPU VMs, "model-as-a-
service" vendors can serve weights they never expose, hospitals pool records for
a joint model inside a confidential VM, and large consumer AI backends now lean on
attested confidential compute so even the operator can't read your requests.

## The hardware constraints

TEE wasn't designed for AI. It's a long-standing piece of computing security —
Secure Boot at power-on is a familiar example — and from a practitioner's seat
it's a somewhat demanding tool: you have to set memory and compute aside in
advance, and everything in that region pays an encrypt/decrypt tax, so leaning on
it more than you need to costs performance. So TEEs have traditionally focused on
shielding only what truly needs shielding, with keeping system overhead low as an
explicit goal. Which is exactly why ever-larger AI models run into a fairly high
wall of hardware constraints.

**The enclave is too small.** Classic CPU enclaves offered on the order of ~100 MB
of protected memory. A modern model is gigabytes. It simply doesn't fit, and
paging weights in and out of a small enclave is punishingly slow. VM-level TEEs
(TDX, SEV-SNP) removed _that_ specific ceiling by protecting a whole VM's memory —
but they're still CPU-side.

**TEE was built for CPUs; protection on the GPU is still a work in progress.** AI
runs on GPUs, and until recently GPUs sat entirely _outside_ the trust boundary. That left a bad choice:
keep the model in a CPU TEE and lose GPU acceleration (unusably slow for real
models), or ship the data to an untrusted GPU and lose the confidentiality you
built the TEE for.

**Bridging CPU and GPU has a cost.** NVIDIA's **Confidential Computing**,
introduced with the **Hopper H100**, pulls the GPU inside the boundary: the GPU
runs in a confidential mode with encrypted memory, the data crossing PCIe between
the CPU's confidential VM and the GPU is encrypted, and the GPU itself can be
attested. Pair an attested H100 with a confidential VM (TDX or SEV-SNP) and you
get an end-to-end TEE spanning CPU and GPU. But that PCIe crossing is the catch:
data is encrypted through a **bounce buffer** in the CPU TEE and copied to the
device, so the more you shuttle between host and GPU, the more you pay. For large,
compute-bound models the overhead is modest; for small models or chatty pipelines
the performance hit is something you have to plan around.

{% include figure.liquid loading="eager" path="assets/img/tee-confidential-path.png" class="img-fluid rounded z-depth-1" alt="Confidential VM (CPU) and an attested GPU inside one trust boundary, linked by an encrypted padlocked channel, with the untrusted host blocked outside" %}

## Recent research topics

So a TEE is unavoidable, and there's a lot of recent work on getting past the
hardware limits. Intel offers VM-based TEEs (through SGX and its successors), and
NVIDIA has begun bringing TEE support to embedded platforms like Jetson — but
running large models directly on any of them still hits trouble. Intel has been
dropping TEE features from everything but its server-class CPUs; NVIDIA's Jetson
Thor is constrained despite being Blackwell-class; Apple's M-series limits what
you can do with its secure enclave in the first place. Full hardware support
isn't something you can count on yet, so a range of software techniques is being
explored alongside the silicon.

- **Harmonizing CPU-TEE, GPU, and memory.** The enclave is small and CPU-side;
  the model and the math live on the GPU. Getting the most from both is a
  resource-optimization problem as much as a security one: partition and schedule
  the model so the sensitive parts stay protected while the heavy compute runs
  accelerated, and cut the encrypted CPU↔GPU traffic to the bone to hold the
  performance loss down.
- **Which layers to shield.** Putting the whole model in the TEE is simplest and
  costliest — and the hardware that could hold a whole model barely exists yet.
  So the practical route is to run only certain parts of the model inside the
  TEE, and a lot of current work asks which parts, in a large model, buy the most
  protection for the cost. The suggestions so far: the MLP portion for a typical
  CNN, the Q/V projections for a transformer-based model — with plenty of room
  left for new ideas.
- **The hardware floor is real.** Confidential GPU inference needs a **data-center
  GPU with Confidential Computing — Hopper (H100/H200) or Blackwell
  (B100/B200/GB200)** — plus a CPU that supports a confidential VM. Older GPUs
  (Ada, Ampere) don't have it. And **architecture family alone isn't enough**:
  Jetson Thor is built on a Blackwell-generation GPU, yet it _can't_ do this —
  Confidential Computing is a feature of NVIDIA's discrete **data-center** GPUs
  and platforms, not the Jetson/embedded SoC line, which lacks the CC
  hardware-security engine, firmware, and attestation path. Thor targets edge
  robotics, not attested confidential inference; "it's Blackwell" doesn't buy you
  a TEE the way a GB200 does.

None of these offer a perfect answer yet, but the need for model security in AI
is unmistakable. As industry adoption of AI keeps accelerating, information
protection will only grow in importance — and the demand for TEEs will keep
rising with it. What a TEE offers is one more tool, this one rooted in hardware,
for protecting AI data while it's in use.

## References

1. Florian Tramèr and Dan Boneh, [Slalom: Fast, Verifiable and Private Execution of Neural Networks in Trusted Hardware](https://arxiv.org/abs/1806.03287), ICLR 2019 — keeps a DNN's sensitive work inside a CPU TEE while offloading the heavy linear layers to a faster, untrusted co-processor; an early take on the CPU-TEE ↔ GPU split.
2. Stavros Volos, Kapil Vaswani, and Rodrigo Bruno, [Graviton: Trusted Execution Environments on GPUs](https://www.usenix.org/conference/osdi18/presentation/volos), USENIX OSDI 2018 — the first research GPU TEE; its overhead is dominated by encrypting traffic to and from the GPU, exactly the CPU↔GPU cost this post flags.
3. Ziqi Zhang et al., [No Privacy Left Outside: On the (In-)Security of TEE-Shielded DNN Partition for On-Device ML](https://arxiv.org/abs/2310.07152), IEEE S&P 2024 — shows that shielding only _some_ layers in a TEE is trickier than it looks, and proposes TEESlice; directly on point for "which layers to shield."
4. NVIDIA, [Confidential Compute on NVIDIA Hopper H100](https://images.nvidia.com/aem-dam/en-zz/Solutions/data-center/HCC-Whitepaper-v1.0.pdf) (whitepaper) — the H100 as the first GPU with confidential computing: on-die root of trust, GPU attestation, and the encrypted CPU↔GPU bounce buffer.
