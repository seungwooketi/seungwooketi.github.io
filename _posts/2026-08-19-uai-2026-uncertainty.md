---
layout: post
title: "At UAI 2026: My Pipeline Was Far Too Sure of Itself"
date: 2026-08-19 09:00:00+0900
description: Sitting through a conference on uncertainty and causality, I realized the real problem with the LLM and agent pipelines I've been building isn't that they get things wrong. It's that they have no way to say they don't know.
tags: UQ conference-notes knowledge-base causal-inference trustworthy-AI
giscus_comments: true
related_posts: false
published: true
toc:
  sidebar: left
---

<p class="text-center"><small><em>한국어 버전: <a href="{{ '/blog/ko/uai-2026-uncertainty/' | relative_url }}">UAI 2026에서, 내 파이프라인이 너무 단호했다는 걸 깨닫다</a></em></small></p>

I'm at UAI 2026 — the Conference on Uncertainty in Artificial Intelligence. Every
time I attend something like this I'm reminded of the same thing: I trained as an
engineer, I've made a living at this for years, and my mathematical foundations
are still thinner than they ought to be. Sitting among the probability notation
and the vocabulary I only half recognize, I'm learning a great deal. Although
"learning" isn't quite right. It's closer to being shown, again, how much I don't
know.

But there was something bothering me more than the equations I couldn't follow.
The things I've built have been far too sure of themselves.

## Every judgment I built was a confident one

The work I've been doing with LLMs and agents has been deeply heuristic and
deterministic. What kind of document is this, what features should be pulled out
of it, which class does it belong to — nearly all of that runs on accumulated
experience. And because none of it is written down as a probability, there is no
way for the system to represent ambiguity at all.

The problem isn't that the answers are wrong. It's that when the pipeline can't
tell whether a file is an agreement or an amendment to an agreement, it still has
to pick one. The prompt always returns something, and that something has no field
for "honestly, this one is borderline." A judgment made at 0.9 confidence and one
made at 0.4 come out in exactly the same shape, so nothing downstream can tell
them apart. If uncertainty is high, the system ought to be able to throw the
judgment away — and there was no mechanism for that anywhere in it.

## What it takes to say "I don't know"

A lot of what I heard today comes down to making *I don't know* a first-class
output. The simplest form is a rule that declines to answer:

$$
\hat{y}(x) =
\begin{cases}
\arg\max_k \, p(y = k \mid x), & \max_k \, p(y = k \mid x) \ge \tau \\
\text{abstain}, & \text{otherwise}
\end{cases}
$$

Selective prediction like this needs one threshold, so it could go into my
pipeline tomorrow. The more interesting part is decomposing where the uncertainty
comes from:

$$
\underbrace{H\big[\mathbb{E}_{\theta}\,p(y \mid x, \theta)\big]}_{\text{total}}
=
\underbrace{\mathbb{E}_{\theta}\,H\big[p(y \mid x, \theta)\big]}_{\text{aleatoric}}
\;+\;
\underbrace{I(y; \theta \mid x)}_{\text{epistemic}}
$$

Being unable to decide because the document is genuinely ambiguous is a different
condition from being unable to decide because I've never seen a document like it,
and the two call for different responses. The first says a human would hesitate
too — change the taxonomy, or record both labels. The second says give the model
more examples, or open a new class. My current pipeline collapses both into "pick
one and move on." I worked through this distinction once before while
[reviewing uncertainty quantification]({{ '/blog/2026/uncertainty-quantification-review/' | relative_url }})
in a robotics context, and never thought to carry it over to something as mundane
as sorting documents.

Layer conformal prediction on top and the output stops being a label and becomes
a set $$C(x)$$ with a coverage guarantee — and the size of that set is itself the
ambiguity measure. One label, accept it. Three labels, send it to a person. That
one looks cheap enough to retrofit.

## The same thing applies to the knowledge base

None of this felt abstract, because it lands precisely on the problems I ran into
while
[rebuilding my knowledge base three times]({{ '/blog/2026/knowledge-base-three-failures/' | relative_url }}).
There are at least three places it applies directly.

**Classification.** Right now a guess and a confident call are stored identically.
Attach an uncertainty value and you suddenly have a principled review queue —
nobody has to check everything, they check the ambiguous things first.

**Relations between entities.** Deciding that a trip belongs to a project, or
that an institution is a party to an agreement, is currently a yes or a no. Those
edges need a strength of evidence, and more importantly they need a way to say
"the documents I have cannot settle the direction of this one."

**Creating classes that don't exist yet — the part I find most interesting.**
When a document arrives that the ontology has no home for, the system currently
jams it into the nearest existing class. From a Dirichlet-process view, a new
class isn't an exception to be handled; it's part of the model:

$$
p(z_{n+1} = k \mid z_{1:n}) = \frac{n_k}{n + \alpha}, \qquad
p(z_{n+1} = \text{new} \mid z_{1:n}) = \frac{\alpha}{n + \alpha}
$$

"This fits none of the existing classes well" becomes quantitative grounds for
opening a new one. That would take real pressure off the assumption that a human
must design the whole ontology before any documents get processed.

## SEM and FCI are worth actually studying

Two names came up repeatedly today.

**SEM (Structural Equation Modeling)** models latent variables together with the
observed indicators that reveal them indirectly. Something like "the character of
a document" was never a directly measurable quantity — it's estimated from a
handful of signals — which is structurally close to what I've been papering over
with heuristics.

**FCI (Fast Causal Inference)** searches for causal structure while allowing for
unobserved confounders. What struck me was the shape of its output. The PAG it
produces leaves edges it cannot orient explicitly marked as undetermined. The
algorithm hasn't failed to reach a conclusion; it has drawn the line between what
the data can settle and what it cannot. The idea of attaching uncertainty to
relations has already made it down to the level of graph notation — which seems
like the right reference point when I revisit how the knowledge base represents
its edges.

I know both only at the level of the name and a sentence, so they're going on the
reading list for when I get back.

## So

The takeaway today isn't a technique. It's a question I can now ask at every
decision point in my pipeline: *is there any basis on which this judgment could be
discarded?* Right now the answer is almost always no.

Papers alone really aren't enough — you have to turn up. Off to the poster session
to go ask about some of this.
