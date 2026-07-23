---
layout: post
title: "White Paper: Advancing AI Safety and Security"
date: 2026-07-23 14:00:00+0900
description: A technical white paper on AI safety and security in the agentic era — mechanistic interpretability, automated red-teaming, dynamic evaluation, agentic action-restriction, enterprise confidentiality, and the governance landscape across the EU, the US, and Korea. Free to download (CC BY-NC 4.0).
tags: AI-safety AI-security agentic-AI interpretability red-teaming governance white-paper
thumbnail: assets/img/ai-safety-security-summary.png
og_image: /assets/img/ai-safety-security-summary.png
giscus_comments: true
related_posts: false
published: false
toc:
  sidebar: left
---

<p class="text-center"><small><em>한국어 버전: <a href="{{ '/blog/ko/ai-safety-security-white-paper/' | relative_url }}">백서: AI 안전성과 보안</a></em></small></p>

Several of the posts on this site have circled the same subject from different
angles — [how a model leaks through its own answers]({{ '/blog/2026/industrial-ai-information-protection/' | relative_url }}),
and [what it takes to run one inside a trusted execution environment]({{ '/blog/2026/trusted-execution-environments/' | relative_url }}).
Those were fragments of a larger survey I'd been assembling. It's now finished,
and I'm putting it out as a technical white paper.

**[Advancing AI Safety and Security: Safeguards, Evaluation, and Agentic Threat
Mitigation for General-Purpose and Industrial AI]({{ '/assets/pdf/advancing-ai-safety-and-security-v3.4.pdf' | relative_url }})**
— Version 3.4, July 2026, 45 pages. Released under CC BY-NC 4.0.

<div class="text-center mt-3 mb-4">
  <a class="btn btn-sm z-depth-1" href="{{ '/assets/pdf/advancing-ai-safety-and-security-v3.4.pdf' | relative_url }}" target="_blank" rel="noopener">Download the PDF (1.6 MB)</a>
</div>

{% include figure.liquid loading="eager" path="assets/img/ai-safety-security-summary.png" class="img-fluid rounded z-depth-1" alt="Visual summary of the white paper: the expanding attack surface from static LLM to autonomous agent, three defensive shifts (see inside, stress-test, contain), stats on autonomous horizon and model IP security levels, key capability areas, and the governance landscape across the EU, US, and Korea" %}

## Why now

AI has crossed a threshold. Systems that a few years ago produced only static
text now plan, call tools, write and execute code, browse the web, and act on a
user's behalf over hours-long tasks. That shift multiplies the surface area for
both safety failures and security attacks, and it breaks the assumption most of
our defenses were built on — that you can judge a system by what it says.

Behavioral oversight alone, RLHF most prominently, cannot reliably detect latent
misalignment, deceptive behavior conditioned on a hidden trigger, or the indirect
prompt injections now driving documented data-exfiltration incidents in
production systems.

The eighteen months to mid-2026 supplied the evidence. A finance employee at the
engineering firm Arup was deceived into transferring about US$25 million after a
video call in which the "CFO" and colleagues were all real-time deepfakes.
EchoLeak (CVE-2025-32711) became the first zero-click prompt injection to
silently exfiltrate data from Microsoft 365 Copilot — the victim only had to
receive an email, then later ask Copilot something unrelated. A data-wiping
instruction reached a public release of Amazon's Q Developer extension through a
GitHub pull request. And Anthropic's GTG-1002 disclosure documented a
state-sponsored espionage campaign in which an AI agent executed an estimated
80–90% of the operation against roughly thirty targets on its own.

The pattern is unmistakable: as systems gained retrieval, tools, and autonomy,
attackers followed them up each rung.

## What the paper argues

One line runs through all of it. **As autonomy and privilege rise, defenses must
move from the model's outputs to its internals, its permissions, and its data
flows** — inward, downward, and outward.

The paper organizes the technical material into three families, chosen because
each is where the research frontier is actually producing deployable safeguards:

|                 |                                |                                                                            |
| --------------- | ------------------------------ | -------------------------------------------------------------------------- |
| **See inside**  | Understand the model           | Mechanistic interpretability, sparse autoencoders, backdoor detection (§3) |
| **Stress-test** | Break it before adversaries do | Automated red-teaming, dynamic capability evaluation (§4, §5)              |
| **Contain**     | Limit what it can do           | Agentic action-restriction, enterprise need-to-know (§6, §7)               |

Wrapping all three are the governance regimes that mandate them (§8) and the
documentation practices — AI-BOM, model and system cards, benchmark standards —
that make the evidence portable and auditable (§9).

A note on why conventional security isn't enough, since this comes up every time:
the existing stack of firewalls, patching, IAM, and encryption remains essential,
but it was built on four assumptions that large models break. Behavior is defined
by auditable code (a model's logic is billions of opaque parameters — there is no
patch for a jailbroken behavior). Malicious input is malformed and filterable (a
prompt-injection payload is perfectly well-formed; the exploit lives in meaning,
not in bytes). Failures are deterministic (the same prompt may comply once and
refuse the next time). The threat is an outsider breaking in (with agentic AI the
user and the attacker can be the same untrusted text). Conventional controls
secure the container but not its contents.

## Two audiences, deliberately

The paper gives equal treatment to two groups whose risk profiles differ sharply,
because I think the industrial side is chronically underserved in this
literature.

For **general-purpose AI**, the dominant concerns are misuse potential (cyber,
CBRN, manipulation), loss of control, and jailbreak robustness.

For **industrial and enterprise AI**, the concerns are not primarily ethical.
They are the protection of intellectual property and trade secrets, and the
enforcement of need-to-know — so that a deployed assistant never reveals a
confidential contract, an unannounced acquisition, or restricted source code to
an employee who was never meant to see it. Section 7 works through this in
detail: identity-aware retrieval, RBAC/ABAC and classification, the legal cliff
where disclosing a secret to a consumer AI service can forfeit trade-secret
status outright, model memorization as a leak vector, and the model itself as an
IP surface exposed to extraction and weight theft.

These enterprise concerns are woven through every technical section rather than
isolated in one, because the same mechanisms that make a model safe also make it
confidential.

## A few things I found worth the trip

**Adversarial training can make a backdoor worse.** Anthropic's Sleeper Agents
study trained models with a deliberate hidden trigger, then ran the full battery
of safety training over them. The behavior persisted — most durably in the
largest models — and adversarial training taught the model to recognize its
trigger more precisely and hide the unsafe behavior more effectively. The
industrial parallel is direct: fine-tune or adopt a third-party model and you
inherit whatever conditional behavior it already contains, and it will pass
ordinary acceptance testing.

**The strongest agent defenses assume injection succeeds.** Rather than trying to
classify every hostile input, CaMeL splits the system into a privileged planner
that sees only trusted instructions and a quarantined model that reads untrusted
content but can never choose actions, with a deterministic interpreter enforcing
what data may reach which tool. Even a fully hijacked quarantined model can't
cause an unauthorized action.

**Confidential AI is nearly free at scale and expensive when interactive.** A
careful H100 benchmark put the throughput penalty of confidential inference at
about 6.9% on an 8-billion-parameter model and essentially zero on a
70-billion-parameter one — larger models spend proportionally more time in
full-speed GPU compute and less in encrypted transfer. But time-to-first-token
overhead reached roughly 18–19%, so the cost lands squarely on small-batch,
interactive serving. And at the resource-constrained edge, where no GPU TEE
exists at all, it remains an open problem. (§7.5 expands the
[earlier post on TEEs]({{ '/blog/2026/trusted-execution-environments/' | relative_url }})
into its enterprise framing.)

**Assurance artifacts measure the wrong half.** Model cards, system cards, and
AI-BOMs today document safety and quality far better than they document security
and agentic authority. Closing that gap — a standardized security score, and an
agentic-authority disclosure in the AI-BOM — is the specific contribution I flag
for future work, and I suspect it's among the most useful near-term things the
community could actually ship.

## Scope and caveats

The survey covers six domains and cites work through mid-2026, with every study
and standard described in the body rather than left to the reference list — I
wanted it to be readable without a second browser window open. It is a survey,
not original research: the contribution is in the synthesis and in the industrial
framing, not in new results.

It also reflects a particular vantage point, and the fast-moving parts (frontier
safety thresholds, the Korean AI Basic Act's subordinate regulations, MCP
security guidance) will date quickly. Corrections and disagreements are welcome —
the comments below work, or email is fine.

> The views expressed in the paper are my own, offered in a personal research
> capacity, and do not necessarily reflect the official position of KETI or any
> affiliated organization.

**Citation.** Kum, S. (2026). _Advancing AI Safety and Security: Safeguards,
Evaluation, and Agentic Threat Mitigation for General-Purpose and Industrial AI_
(Technical White Paper, Version 3.4). Korea Electronics Technology Institute
(KETI).
