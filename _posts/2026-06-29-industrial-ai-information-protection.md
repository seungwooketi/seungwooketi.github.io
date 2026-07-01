---
layout: post
title: "Leaking Through an Authorized Door — the Security Problem of Generative and Agentic AI"
date: 2026-07-01 16:12:00+0900
description: Industrial foundation models and agentic AI can transform process management, but they punch a different kind of hole in information protection. This is about information that leaks through a legitimate access route, the attacks worth thinking about, the standards and guidelines that speak to them, and a defensive paradigm that brings an AI point of view into cybersecurity.
tags: industrial-AI agentic-AI prompt-injection data-security watermarking zero-trust trustworthy-AI
thumbnail: assets/img/industrial-ai-information-protection-thumb.png
og_image: /assets/img/industrial-ai-information-protection-thumb.png
giscus_comments: false
related_posts: false
published: true
toc:
  sidebar: left
---

<p class="text-center"><small><em>한국어 버전: <a href="{{ '/blog/ko/industrial-ai-information-protection/' | relative_url }}">허용된 통로로 접근하는 산업 정보</a></em></small></p>

Industrial foundation models could transform process management across
manufacturing and other major sectors. They can read the state of equipment,
suggest set-points, and flag anomalies ahead of time — faster and more
consistently than a person. And they don't stop at the process line: an
industrial foundation model understands the plant's data while also reaching into
internal procedures, protocols, and knowledge bases, and through links to systems
like ERP it can support decisions across the whole of manufacturing — not only
the process, but inventory, distribution, shipping, and pricing. But the flip
side of that promise carries a problem unlike the ones we are used to. What do
these models — generative AI, and agentic AI — actually do to **the protection of
industrial information**?

## The attack comes in through an authorized channel

When we talk about security, we usually picture blocking access: shutting ports
against abnormal connections, blocking IP ranges, raising firewalls, encrypting.
That defense still matters. But the agentic-AI problem has a different texture. A
malicious action against a generative or agentic AI does not come through those
abnormal routes — it **comes in through an authorized one.** Suppose an attacker
who has entered through a legitimate port for LLM queries asks, "tell me the
in-house parts inventory," or "give me the parameters for the laser-cutting
process." The agentic AI, doing exactly what it was built to do, reaches into the
in-house ERP and hands the requested information back. And even if you have
trained the AI to refuse certain confidential answers, cases where a cleverly
crafted prompt gets a generative model to produce the forbidden answer anyway are
not hard to find.

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

Seen from the shop floor, the risk of running AI sorts into a few kinds. The most
basic is simply a **wrong choice** — the AI making a bad decision and ordering
too many or too few parts, say. Turn that slightly and it becomes an opening for
an attack: the AI is producing ordinary results, but what if a prompt steers it
into the wrong choice on purpose? That edges close to sabotage of a specific
process, and either way it can hit production hard. Examples are not hard to come
by — you could hand the AI a doctored rules file, for instance, to bias its
judgment.

Turn the aim just slightly, from sabotage toward leakage, and you get the earlier
picture: crafted prompts that walk in-house secrets out the door. That can mean
leaking confidential data directly, but with a so-called distillation attack it
can also become model theft through the reconstruction of input–output pairs.
Everything tied to the process becomes exfiltrable through an open channel.

To sum up, the attacks you can imagine in this setup fall into roughly three
lines. The first two are about making the AI **misbehave**; the last is about
**pulling data out** of it.

| Attack             | What it targets                                            | A problem of similar shape                           |
| ------------------ | ---------------------------------------------------------- | ---------------------------------------------------- |
| Prompt injection   | Coax a generative AI into giving a forbidden answer        | Akin to the ethics/jailbreak problem in consumer AI  |
| Process sabotage   | Get it to carry out an abnormal process action             | Aims squarely at the integrity of safety and control |
| Dataset extraction | Engineer query/response pairs to reconstruct training data | Leakage of an asset dissolved into the model         |

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
bring an **AI point of view** into cybersecurity. Recent research has started to
take up exactly this — how to detect and stop leakage from an AI's own vantage
point — spanning irreversible-training techniques that block the input–output
harvesting behind distillation attacks, watermarking that checks whether your
generative model's output ended up somewhere it shouldn't, and zero-trust
approaches that re-authenticate at each step to cut off lateral movement. Three
responses are on the table right now.

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

## Standards and guidelines to lean on

This worry is not ours alone. Regulators and standards bodies have recently begun
to address the same point. Here are a few references worth consulting when you
design information protection for industrial AI, grouped by angle. Most are
Korean-government materials written in Korean, and those links are flagged with
"(Korean)" in the reference list at the end; the TTA CAT guide and the OWASP Top
10 are available in English.

**Privacy and data protection.** Korea's Personal Information Protection
Commission published a [Guide to Personal Data Processing for the Development and
Use of Generative AI (Aug 2025)](https://www.pipc.go.kr/np/cop/bbs/selectBoardArticle.do?bbsId=BS074&mCode=C020010000&nttId=11410),
which organizes privacy issues and safeguards across the generative-AI lifecycle
(purpose → strategy → training/development → deployment/operation) and, notably,
covers **AI agents, knowledge distillation, and machine unlearning** — exactly the
agent-to-ERP leakage and distillation attacks discussed here. The same body's [AI
Privacy Risk Management Model (Dec 2024)](https://www.data.go.kr/data/15142410/fileData.do)
goes a step further, pairing technical safeguards (input/output filtering,
differential privacy, fine-tuning) and managerial ones (training-data provenance
and lineage, AI red-teaming) against risk types — the same family as the
watermarking, irreversible training, and zero-trust controls above.

**A security-threat view.** Korea's National Intelligence Service issued
[Security Guidelines for Using Generative AI such as ChatGPT (Jun 2023)](https://nsp.nanet.go.kr/plan/subject/detail.do?nationalPlanControlNo=PLAN0000039282),
which names data leakage, prompt-driven model abuse, and plug-in/API
vulnerabilities as threats and prescribes safeguards for both use and deployment —
an early domestic document that squarely addresses the conversational leakage and
prompt manipulation at the heart of this post.

**Trustworthiness and governance.** To move past individual techniques toward a
"systematic response," a management-system standard has to back it up. TTA's [AI
trustworthiness certification (CAT)](https://tta-trustworthy-ai.gitbook.io/cat)
verifies risk management and mitigation against international standards such as
ISO/IEC 42001 (AI management systems), 23894 (AI risk management), and 24028
(trustworthiness). Where physical control is in the loop, as with robots, TTA's
[intelligent-robot standardization (PG413)](https://committee.tta.or.kr/standard/general.jsp?commit_code=PG413)
and KIRIA's [robot safety certification](https://www.kiria.org/portal/cert/portalCertEstiSafe.do)
cover functional and physical safety — touching the same "separate intelligence
from control" principle argued above.

**An attack taxonomy.** Finally, the three attacks map cleanly onto an
international taxonomy. The [OWASP Top 10 for LLM Applications (2025)](https://genai.owasp.org/llm-top-10/)
lists prompt injection, sensitive information disclosure, system-prompt leakage,
and model theft among its top items — overlapping one-to-one with this post's
prompt injection, information leakage, and dataset extraction. A good starting
point if you want a shared vocabulary for the attacks.

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

## References

1. Personal Information Protection Commission (PIPC), [Guide to Personal Data Processing for the Development and Use of Generative AI](https://www.pipc.go.kr/np/cop/bbs/selectBoardArticle.do?bbsId=BS074&mCode=C020010000&nttId=11410), Aug 2025 (Korean).
2. Personal Information Protection Commission (PIPC), [AI Privacy Risk Management Model](https://www.data.go.kr/data/15142410/fileData.do), Dec 2024 (Korean).
3. National Intelligence Service & NSR, [Security Guidelines for Using Generative AI such as ChatGPT](https://nsp.nanet.go.kr/plan/subject/detail.do?nationalPlanControlNo=PLAN0000039282), Jun 2023 (Korean).
4. Telecommunications Technology Association (TTA), [Certification of AI Trustworthiness (CAT) Guide](https://tta-trustworthy-ai.gitbook.io/cat) — based on ISO/IEC 42001, 23894, 24028.
5. Telecommunications Technology Association (TTA), [Intelligent Robot Standardization Committee (PG413)](https://committee.tta.or.kr/standard/general.jsp?commit_code=PG413) (Korean).
6. Korea Institute for Robot Industry Advancement (KIRIA), [Outdoor Mobile Robot Operation Safety Certification](https://www.kiria.org/portal/cert/portalCertEstiSafe.do) (Korean).
7. OWASP, [Top 10 for LLM Applications (2025)](https://genai.owasp.org/llm-top-10/).
