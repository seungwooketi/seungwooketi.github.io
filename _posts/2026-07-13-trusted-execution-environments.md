---
layout: post
title: "Trusted Execution Environments, Explained"
date: 2026-07-13 17:20:00+0900
description: A plain-language introduction to Trusted Execution Environments (TEEs) — the hardware-enforced "safe room" inside a processor that keeps code and data protected while they are running, even from the operating system, hypervisor, or cloud operator. Isolation, remote attestation, sealing, the main technologies (ARM TrustZone, Intel SGX/TDX, AMD SEV-SNP, confidential VMs and containers), and the caveats.
tags: TEE confidential-computing trustzone sgx hardware-security attestation trustworthy-AI
giscus_comments: true
related_posts: false
published: false
toc:
  sidebar: left
---

<p class="text-center"><small><em>한국어 버전: <a href="{{ '/blog/ko/trusted-execution-environments/' | relative_url }}">신뢰 실행 환경(TEE) 입문</a></em></small></p>

We have gotten good at protecting data in two of its three states. Data **at
rest** sits on an encrypted disk; data **in transit** travels inside TLS. But
there is a third state we usually wave away: data **in use** — the moment it is
decrypted into memory and the CPU actually computes on it. At that instant the
plaintext is exposed to whatever software has enough privilege to read that
memory: the operating system, the hypervisor, a kernel driver, another tenant
who has escaped their sandbox, or the cloud operator who owns the machine. A
**Trusted Execution Environment (TEE)** is the hardware's answer to that third
state.

## What a TEE actually is

A TEE is an isolated execution environment, enforced by the processor itself,
where code runs and data lives with two guarantees:

- **Confidentiality** — nothing outside the environment can read its memory,
  even software running at higher privilege than the environment's own code.
- **Integrity** — nothing outside can silently tamper with the code or data
  inside; tampering is detected.

The key move is the **threat model**. Ordinary security assumes the operating
system is trustworthy and defends the app from other apps. A TEE flips part of
that: it assumes the OS, the hypervisor, and the physical operator might all be
compromised or hostile, and it still protects the code and data inside the
environment from them. You are no longer trusting the whole software stack — you
are trusting the CPU (and the vendor who made it) to hold a small, well-defined
line.

## Three things every TEE gives you

**Isolation.** The processor carves out a protected region — an _enclave_, a
_secure world_, or a _confidential VM_, depending on the technology — and
enforces that only code inside it can touch its memory. On modern designs the
memory is also **encrypted** by the hardware, so even someone with physical
access reading the DRAM bus sees ciphertext.

**Attestation.** Isolation is worthless if you can't tell whether you're talking
to the _genuine_ protected code or an impostor. Attestation lets a TEE prove, to
a remote party, "I am a real TEE from this vendor, and the exact code running
inside me hashes to _this_ value." Only after checking that proof does the remote
party hand over its secrets. More on this below — it's the part that makes TEEs
useful rather than merely isolated.

**Sealing.** A TEE can derive an encryption key that is bound to the hardware
_and_ to the measurement of the code running in it. It can encrypt ("seal") data
with that key so the data can only ever be decrypted again by the _same_ code on
the _same_ machine — handy for persisting secrets between runs.

## The landscape

TEEs come in two broad shapes: **process-level**, which protect a single
application (small trusted computing base, but you often have to rewrite the app
to split its secret parts into the enclave), and **VM-level**, which wrap an
entire virtual machine (drop-in for existing workloads, larger trusted base).

- **ARM TrustZone** — splits the whole system-on-chip into a _secure world_ and a
  _normal world_. Ubiquitous in phones, embedded, and edge devices, where it
  backs things like key stores, biometrics, and DRM. TrustZone-M brings the same
  idea to microcontrollers.
- **Intel SGX** — user-space _enclaves_ at the granularity of a process, with a
  deliberately tiny trusted base. Influential and widely studied; Intel has since
  deprecated it on client CPUs and steered server confidential computing toward
  VM-level TDX.
- **Intel TDX** — _trust domains_: a whole guest VM shielded from the hypervisor.
- **AMD SEV / SEV-SNP** — encrypted VMs; SEV-SNP adds strong integrity and
  attestation. The AMD side of confidential VMs.
- **AWS Nitro Enclaves** — an isolated VM carved off an instance, with no
  persistent storage and no external network, reachable only over a local
  channel, with its own attestation.
- **RISC-V** — open designs such as Keystone, plus vendor-specific TEEs.

On top of these, the **Confidential Computing** ecosystem (coordinated by the
Confidential Computing Consortium under the Linux Foundation) has grown a
friendlier layer — **confidential VMs** and **confidential containers** (e.g.,
running Kata/CoCo workloads inside TDX or SEV) — so teams can adopt TEEs without
rewriting everything as an enclave.

## Attestation, a little closer

Attestation is the handshake that turns isolation into trust. Roughly:

1. **Measurement.** When the TEE is created, the hardware records a cryptographic
   hash of its initial code and data — its _measurement_.
2. **Quote.** The relying party sends a challenge; the TEE asks the hardware to
   produce a _quote_ — the measurement plus the challenge, signed by a key that
   is rooted in the CPU vendor's hardware and cannot leave it.
3. **Verification.** The relying party checks the signature against the vendor's
   certificate chain (confirming it's genuine silicon) and checks the measurement
   against a **reference value** it expects (confirming it's the exact code it
   meant to talk to).
4. **Release.** Only now does the relying party provision secrets — decrypt the
   dataset, hand over a model, release a key — into the environment it has just
   verified.

This is what lets two mutually distrusting parties cooperate: each verifies the
other's TEE and code _before_ sending anything sensitive.

## What people build with it

- **Confidential inference / confidential AI.** Run a model inside a TEE so that
  the data owner's inputs are never exposed to whoever hosts the model, _and_ the
  model owner's weights are never exposed to whoever owns the data. Attestation
  lets each side verify before releasing its half.
- **Key management and secrets.** HSM-like protection for signing keys and
  wallets without dedicated hardware.
- **Multi-party computation and clean rooms.** Several parties pool sensitive
  data for a joint computation, seeing only the agreed-upon result.
- **Edge and IoT.** A hardware root of trust on devices in the field, where the
  physical environment itself is untrusted.

## Where TEEs fall short

A TEE is a sharp tool, not a magic shield. The honest caveats:

- **Side channels.** TEEs protect the _contents_ of memory, but timing, cache,
  power, and speculative-execution behavior can still leak. A long line of
  attacks (Foreshadow, ÆPIC Leak, and the broader Spectre/Meltdown family, among
  others) has repeatedly pulled data out of enclaves; defense is an ongoing arms
  race, not a solved problem.
- **You still trust the vendor.** A TEE doesn't remove trust — it _relocates_ it,
  from the OS and cloud operator to the CPU vendor and their attestation service.
  If you don't trust the silicon, a TEE can't help you.
- **Availability isn't covered.** A TEE guarantees confidentiality and integrity,
  not that your code gets to run. A malicious host can still refuse to schedule
  it or simply pull the plug.
- **Cost and friction.** Memory encryption and enclave transitions add overhead;
  process-level TEEs may need real re-architecting; measurements and reference
  values have to be managed as the code evolves.

## Wrap-up

Strip it down and a TEE is one idea: a **hardware-enforced root of trust for
data in use**, plus a way to **prove remotely** exactly what is running inside it
before anyone trusts it with secrets. It doesn't replace encryption at rest or in
transit — it closes the gap between them, the runtime moment when plaintext is
unavoidable. Used with clear eyes about its limits, it's the piece that lets you
compute on data you don't fully control, on a machine you don't fully trust.
