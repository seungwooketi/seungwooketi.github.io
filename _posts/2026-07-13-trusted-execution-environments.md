---
layout: post
title: "Running AI Inside a Trusted Execution Environment"
date: 2026-07-13 17:20:00+0900
description: Less a tutorial, more a field report — why you'd run an AI model inside a Trusted Execution Environment (to keep weights and data out of the host's reach), why today's TEEs strain under it (tiny enclave memory, CPU-only trust, costly CPU↔GPU transfers), and the open problems, including why confidential GPU inference needs a Hopper-class data-center GPU and why Jetson Thor's Blackwell doesn't qualify.
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

A [previous post]({{ '/blog/2026/industrial-ai-information-protection/' | relative_url }}) took up AI security from the model's side — how a generative or agentic AI leaks information through its own answers, and the software-level defenses (watermarking, irreversible learning, zero-trust) that hold the line. Here I want to turn the scope the other way: toward the **infrastructure the model runs on**, and toward **edge and embedded AI** in particular, where the box doing the inference sits somewhere you don't fully control. There the question isn't what the model _says_, but who can read the model and its data while it runs. That's a hardware question — so let's talk about the hardware.

We've gotten good at protecting data **at rest** (encrypted disk) and **in
transit** (TLS). The state we still wave away is data **in use** — the moment it
is decrypted into memory and the processor computes on it, exposed to anything
with enough privilege to read that memory: the OS, the hypervisor, another
tenant, or the cloud operator who owns the machine. A **Trusted Execution
Environment (TEE)** is the hardware's answer to that third state. For AI it stops
being an abstraction, because with AI the crown jewels — the model weights and
the input data — are _exactly_ the plaintext sitting in memory while the GPU
crunches. This post is about running AI in a TEE: why you'd want to, and why the
hardware still makes it hard.

## What a TEE is, in one pass

A TEE is an isolated region the processor carves out and enforces — an
_enclave_, a _secure world_, or a _confidential VM_ — with two guarantees for the
code and data inside: **confidentiality** (nothing outside can read its memory,
not even higher-privileged software) and **integrity** (nothing outside can
tamper with it undetected). On modern parts the memory is hardware-**encrypted**,
so even someone probing the DRAM bus sees ciphertext. The trade is in the threat
model: you stop trusting the whole software stack and instead trust the **CPU
vendor** to hold one small, well-defined line.

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

## Why you'd put AI inside one

The pitch is simple: run the model where the host can't see it. Concretely, that
defends against a cluster of very real threats.

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
- **Input / prompt privacy.** Medical, financial, or industrial inputs stay
  unreadable to whoever operates the inference server.
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

## Where today's hardware strains

Here's the rub: the two decades of TEE design above were built for CPUs and small
secrets, and AI is neither.

**The enclave is too small.** Classic CPU enclaves offered on the order of ~100 MB
of protected memory. A modern model is gigabytes. It simply doesn't fit, and
paging weights in and out of a small enclave is punishingly slow. VM-level TEEs
(TDX, SEV-SNP) removed _that_ specific ceiling by protecting a whole VM's memory —
but they're still CPU-side.

**The compute lives on the GPU; the TEE doesn't.** AI runs on GPUs, and until
recently GPUs sat entirely _outside_ the trust boundary. That left a bad choice:
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
it bites.

{% include figure.liquid loading="eager" path="assets/img/tee-confidential-path.png" class="img-fluid rounded z-depth-1" alt="Confidential VM (CPU) and an attested GPU inside one trust boundary, linked by an encrypted padlocked channel, with the untrusted host blocked outside" %}

## Recent research topics

Protecting data and models in AI is an active field, and a handful of topics are
on the table right now.

- **Harmonizing CPU-TEE, GPU, and memory.** The enclave is small and CPU-side;
  the model and the math live on the GPU. Getting the most from both is a
  resource-optimization problem as much as a security one: schedule work so the
  sensitive parts stay protected while the heavy compute runs accelerated, and
  cut the encrypted CPU↔GPU traffic to the bone.
- **Which layers to shield.** Putting the whole model in the TEE is simplest and
  costliest. A lot of current work asks whether you can protect only what
  matters — the layers whose weights are most valuable or most exposed to
  extraction, or a thin "shield" sub-network — and run the rest in the clear on
  the GPU, trading a controlled, measured amount of exposure for a large speedup.
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

None of these are settled, but the direction is clear. As industry adoption of AI
keeps accelerating, information protection in AI will only grow in importance —
and the demand for TEEs will keep rising with it. A TEE gives AI a hardware root
of trust for its data-in-use; the work ahead is making that trust reach the GPU
without paying too much for it — and, for anyone building at the edge, remembering
that today the confidential path still runs through the data center, not the
robot.

## References

1. Florian Tramèr and Dan Boneh, [Slalom: Fast, Verifiable and Private Execution of Neural Networks in Trusted Hardware](https://arxiv.org/abs/1806.03287), ICLR 2019 — keeps a DNN's sensitive work inside a CPU TEE while offloading the heavy linear layers to a faster, untrusted co-processor; an early take on the CPU-TEE ↔ GPU split.
2. Stavros Volos, Kapil Vaswani, and Rodrigo Bruno, [Graviton: Trusted Execution Environments on GPUs](https://www.usenix.org/conference/osdi18/presentation/volos), USENIX OSDI 2018 — the first research GPU TEE; its overhead is dominated by encrypting traffic to and from the GPU, exactly the CPU↔GPU cost this post flags.
3. Ziqi Zhang et al., [No Privacy Left Outside: On the (In-)Security of TEE-Shielded DNN Partition for On-Device ML](https://arxiv.org/abs/2310.07152), IEEE S&P 2024 — shows that shielding only _some_ layers in a TEE is trickier than it looks, and proposes TEESlice; directly on point for "which layers to shield."
4. NVIDIA, [Confidential Compute on NVIDIA Hopper H100](https://images.nvidia.com/aem-dam/en-zz/Solutions/data-center/HCC-Whitepaper-v1.0.pdf) (whitepaper) — the H100 as the first GPU with confidential computing: on-die root of trust, GPU attestation, and the encrypted CPU↔GPU bounce buffer.
