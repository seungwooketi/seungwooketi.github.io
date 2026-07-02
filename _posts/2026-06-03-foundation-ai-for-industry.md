---
layout: post
title: "What an Industrial Foundation Model Should Be"
date: 2026-06-03 09:00:00+0900
og_image: https://seungwooketi.github.io/assets/img/foundation-ai-hero.png
description: "The phrase 'industrial foundation model' turns up in every R&D program now. But to earn the word 'foundation,' such a model shouldn't be an omniscient know-it-all — it should be the bedrock that domain knowledge gets built on."
tags: foundation-models industrial-ai manufacturing domain-knowledge ai-policy ipcei eu-ai-act open-source
giscus_comments: true
related_posts: false
published: true
toc:
  sidebar: left
---

<p class="text-center">
  <img src="{{ '/assets/img/foundation-ai-hero.png' | relative_url }}"
       alt="Several industries standing on a shared industrial foundation model as bedrock"
       style="max-width:100%; height:auto;">
</p>

<p class="text-center"><small><em>한국어 버전: <a href="{{ '/blog/ko/foundation-ai-for-industry/' | relative_url }}">산업 파운데이션 모델은 무엇이어야 하는가</a></em></small></p>

AI is being pushed into one field after another, and faster every year. In Korea
that push has a particular shape: a wave of public R&D money aimed at _industrial
foundation models_. Across the programs announced lately, the ministries — MOTIE,
MSIT, and others — keep pairing two themes: the importance of data, and the need
to _share_ that data in order to build industrial foundation AI.

It's worth pausing on what we're actually asking for. What is a foundation model,
exactly? And what would an _industrial_ foundation model have to do to deserve the
name?

## What makes a model "foundational"

There are many definitions, but the report that first pinned the term down —
Stanford's CRFM — describes a foundation model as one "trained on broad data …
that can be **adapted** to a wide range of downstream tasks."[^crfm] The center of
gravity sits on _adaptable_, not _all-knowing_: the whole point is that you can
build something on top of it.

Take the word at face value. A foundation model should be something that _grounds_
other things — less a God-Almighty that understands everything and solves every
problem, and more the bedrock, or the cornerstone, you set the rest of the
building on.

## An omniscient model is not a foundation

That distinction isn't academic; it shapes how such a model lands in an industry.
Picture a foundation model for the semiconductor business. Suppose some chipmaker,
sitting on an enormous trove of data, trains an excellent model that guides
decisions across its fabrication process. Now suppose it ships that model under
the banner of a _foundation model_. What happens to the barriers to entry in that
market? They come down.

The first mover would simply be handing its hard-won know-how to everyone behind
it — a pure **floor-lifting** effect that raises the floor for latecomers at the
leader's own expense. A model like that is more accurately called _almighty_ or
_omniscient_ than _foundational_. It's closer to a finished product than to a base
you build on.

## A foundation holds knowledge up; it doesn't hold it in

So when I say _foundation model_, I don't mean a model that already contains every
domain's knowledge. I mean one whose job is to let that knowledge be **stacked on
top of it**. Domain expertise accumulates on the industrial foundation model and
spreads outward — into manufacturing, into service operations, into quality
management, into one domain-specific model after another. Only then does the word
_foundation_ actually fit.

<p class="text-center">
  <img src="{{ '/assets/img/foundation-ai-stack.png' | relative_url }}"
       alt="Domain knowledge stacking on top of an industrial foundation model and growing into specialized models for each domain"
       style="max-width:100%; height:auto;">
</p>

<p class="text-center"><small><em>Domain knowledge stacks on top of the industrial foundation model at the base, growing into a specialized model for each domain.</em></small></p>

## So what actually matters

Which means the thing to get right, when we talk about industrial foundation
models, is a **base-shaped service**: one that can read each domain's language and
support its connection to domain knowledge. Not a model with every answer
pre-loaded, but one on top of which each domain's answers can grow.

Europe's **IPCEI-AI** initiative — the AI strand of the Important Projects of
Common European Interest — is a fairly concrete picture of this view.[^ipcei] It
frames the development of industrial AI models not as a single finished artifact
but as a three-layer **life-cycle**.

<p class="text-center">
  <img src="{{ '/assets/img/ipcei-ai-systemic-approach.png' | relative_url }}"
       alt="IPCEI-AI's three-tier structure for industrial AI development — basic, sector-specific, and company-specific models connected by fine-tuning"
       style="max-width:100%; height:auto;">
</p>

<p class="text-center"><small><em>IPCEI-AI's three-tier life-cycle for industrial AI development. The base model stays open and shared (free and open-source); each layer above narrows toward domain- and company-specific models. Source: <a href="https://www.bundeswirtschaftsministerium.de/Redaktion/EN/Dossier/ipcei-ai.html">BMWE, IPCEI-AI</a>.</em></small></p>

1. **Basic AI models.** The base model at the bottom, pre-trained on common data.
   The decisive move is to define this layer as a kind of public good — **free and
   open-source**, with common governance, AI-model marketplaces, and EU AI Act
   compliance.
2. **Sector-specific AI models.** On top of that, fine-tuning and continued
   pre-training on domain data produce domain models, and then domain reasoning
   models.
3. **Company-specific AI models.** Higher still, fine-tuning on customer and
   corporate data yields **high-security, company-owned proprietary models**.

What I find compelling is that this picture answers the _floor-lifting_ dilemma
through its structure. The base layer is open for anyone to stand on, while a
company's real know-how stays in the domain- and company-specific layers above. Put
another way, it draws the line for **how much to open up as foundation** _below_
the know-how. The base lifts everyone's floor as a public good, and yet the first
mover never has to hand over its own cornerstone wholesale.

The other thing worth noticing is that the three layers aren't a static deliverable
you build once. They're bound together as a **continuously trained, continuously
improving life-cycle**. Fine-tuning and continued pre-training are the connective
tissue between the layers, and keeping that flow unbroken is precisely the
foundation's job. In the end, the value of an industrial foundation model comes not
from _how much it knows_, but from **how well domain and company knowledge can grow
on top of it**.

---

[^crfm]: Bommasani et al., "On the Opportunities and Risks of Foundation Models," Stanford CRFM, 2021. [arXiv:2108.07258](https://arxiv.org/abs/2108.07258)

[^ipcei]: IPCEI-AI (Important Projects of Common European Interest – Artificial Intelligence), coordinated by the German Federal Ministry for Economic Affairs and Energy (BMWE). [IPCEI Artificial Intelligence (BMWE)](https://www.bundeswirtschaftsministerium.de/Redaktion/EN/Dossier/ipcei-ai.html)
