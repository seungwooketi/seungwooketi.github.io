---
layout: post
title: "Leaking Through an Authorized Door — the Security Problem of Generative and Agentic AI"
date: 2026-06-29 16:30:00+0900
description: Industrial foundation models and agentic AI can transform process management, but they punch a different kind of hole in information protection. This is about information that leaks through a legitimate access route, the attacks worth thinking about, and a new defensive paradigm that brings an AI point of view into cybersecurity.
tags: industrial-AI agentic-AI prompt-injection data-security watermarking zero-trust trustworthy-AI
thumbnail: assets/img/industrial-ai-information-protection-thumb.png
og_image: /assets/img/industrial-ai-information-protection-thumb.png
giscus_comments: false
related_posts: false
published: false
toc:
  sidebar: left
---

<p class="text-center"><small><em>한국어 버전: <a href="{{ '/blog/ko/industrial-ai-information-protection/' | relative_url }}">허용된 문으로 새는 산업 정보</a></em></small></p>

Industrial foundation models could transform process management across
manufacturing and other major sectors. They can read the state of equipment,
suggest set-points, and flag anomalies ahead of time — faster and more
consistently than a person. But the flip side of that promise carries a problem
unlike the ones we are used to. What do these models — generative AI, and agentic
AI — actually do to **the protection of industrial information**?

## It comes in through an authorized door

When we talk about security, we usually picture blocking the paths that
*shouldn't* be open: detect abnormal access, shut down backdoors, build a
perimeter out of firewalls and permissions. That defense still matters. But the
agentic-AI problem has a different texture. This thing **comes in through an
authorized route.**

Suppose an agent holding legitimate credentials walks through a legitimate door
and asks, "how should I configure this process?" There is no grounds to block the
question. Yet in the act of producing an answer, information tied to the process
can spill out naturally. It leaks not through a break-in but through
**conversation**. The perimeter is intact, and the information walks out anyway.

It gets thornier when this agentic AI is wired into the databases and ERP systems
where industrial information piles up. No matter how tightly you secure the ERP
itself, once data passes through a generative AI's reasoning it can come back out
**dissolved into the answer**, and leak that way. The vault holding the data is
locked, but the interpreter who reads that vault and puts it into words is leaking
the contents through a side door. From an access-control point of view, it is a
path you cannot catch.

## Attacks worth considering

{% include figure.liquid loading="eager" path="assets/img/industrial-ai-information-protection-fig.png" class="img-fluid rounded z-depth-1" alt="Three attacks on the left (prompt injection, process sabotage, dataset extraction) flowing into a central AI agent, with three defenses on the right (watermarking, an irreversible gate, and an intelligence/control split with a zero-trust checkpoint) holding them off" %}

The attacks you can imagine in this setup fall into roughly three lines. The first
two are about making the AI **misbehave**; the last is about **pulling data out**
of it.

| Attack | What it targets | A problem of similar shape |
| --- | --- | --- |
| Prompt injection | Coax a generative AI into giving a forbidden answer | Akin to the ethics/jailbreak problem in consumer AI |
| Process sabotage | Get it to carry out an abnormal process action | Aims squarely at the integrity of safety and control |
| Dataset extraction | Engineer query/response pairs to reconstruct training data | Leakage of an asset dissolved into the model |

The first is a familiar face. It is the same family as the prompt injection that
tries to draw a "shouldn't-say" answer out of a consumer generative AI, and you
can carry over almost the whole approach developed for the ethics problem. The
second is a hazard specific to the shop floor. It does not stop at making the
model leak an answer — it makes the **process move the wrong way**, an attack
closer to sabotage. The third is the quietest: repeat ordinary questions and
answers, collect the pairs, and slowly reconstruct the dataset that soaked into
the model. What they share is that none of them looks like "punching through a
firewall."

## A different paradigm is needed

So these problems demand a **paradigm different** from existing security
technology. Stacking the perimeter higher does nothing to stop information that
comes in through an authorized door and leaks out in words. It means we have to
bring an **AI point of view** into cybersecurity. Three responses are on the
table right now.

**Watermarking at training time.** Plant a watermark while training the model so
the watermark surfaces in its responses. That lets you verify after the fact
whether data derived from one model was reused to train another. Less a way to
stop leakage itself than a device to **trace** a leaked asset.

**Irreversible training.** During training, deliberately suppress information
about the source data so that you cannot reason backward from the output to the
input. The model still answers well, but reconstructing the original from that
answer is hard — aimed squarely at the third attack above (dataset extraction).

**Separating intelligence from control, plus zero-trust.** Pull apart the
intelligence that judges and the control that actually moves the equipment, and
put a zero-trust architecture between them. Even if the model produces a wrong
judgment, the structure keeps that error from spreading straight into control. It
is the safety catch for the second attack (sabotage).

## Wrap-up

The change industrial foundation models and agentic AI will bring is real, but it
opens a **new kind of hole** in information protection along the way. It leaks
through authorized conversation rather than intrusion, and it seeps out dissolved
into answers even with the ERP locked down. Prompt injection, process sabotage,
dataset extraction — none of them is caught by traditional perimeter defense.

What is needed in the end is more than individual techniques like watermarking,
irreversible training, or an intelligence/control split — it is a **systematic
response to this new paradigm.** Cybersecurity has to step out of the frame that
sees AI only as an external threat, and take in the very way AI handles and leaks
information as an object of security.
