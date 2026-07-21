---
layout: post
title: "Three Failures Before a Knowledge Base That Held"
date: 2026-07-21 10:00:00+0900
description: I wanted a knowledge base over the documents my research projects generate — proposals, agreements, reports, trip records. It took three abandoned designs to learn that the hard part was never extraction. It was change, cost, and knowing what you don't know.
tags: knowledge-base local-LLM pipeline HITL ontology engineering-lessons
giscus_comments: true
related_posts: false
published: false
toc:
  sidebar: left
---

<p class="text-center"><small><em>한국어 버전: <a href="{{ '/blog/ko/knowledge-base-three-failures/' | relative_url }}">지식베이스 하나 만드는데 세 번을 엎었다</a></em></small></p>

Running research projects generates a particular kind of sediment. Proposals,
agreements, annual reports, settlement forms, trip authorizations, trip reports —
years of them, in folders organized by whoever happened to be organizing that
year. The information I actually need is in there: which program a project sits
under, which ministry and which regulation governs it, who the partner
institutions are and who the contact at each one is, what the stated goals were
and what actually came out, which trips belonged to which project.

None of that is hard to find if you know which file to open. The problem is that
you usually don't, and the answer to a simple question — _which projects did that
2024 trip to Germany belong to?_ — lives spread across four documents that never
reference each other.

So: build a knowledge base over the corpus. Extract the facts, link them, keep it
current. I've now done this three times badly. What follows is what each attempt
got wrong, and what the fourth one looks like.

## Attempt 1 — one straight line from file to database

The obvious design. Walk the folders, read each file, extract what's in it, write
it to the database. A single serial pipeline, front to back.

It worked, once. The trouble started the second time.

A knowledge base isn't a report you generate and file away — it has to keep
absorbing new documents, and the old ones keep changing. A file gets added. A
file gets deleted. Someone opens a proposal, fixes a number, and saves it. Every
one of those events threatens the database with stale or contradictory rows, and
in a straight-through pipeline there's nowhere to put the logic that handles it.
So it goes everywhere: guards at the read step, guards at the write step,
reconciliation passes, delete detection.

I ended up with more code defending the database against change than doing the
actual extraction. The maintenance cost of that defense, weighed against a
knowledge base whose entire purpose is to be continuously updated, was the wrong
trade. The design didn't survive contact with its own use case.

## Attempt 2 — a producer and a consumer

The next design split the work along what seemed like the natural seam. One side
reads documents and pulls out features — a **producer**, working folder by
folder. The other side reads what was produced and works out the relationships
between those features — a **consumer**, updating and tidying the links.

Structurally this was much better. The producer doesn't care what the consumer
does with its output, and the consumer doesn't care where the features came from.
Change a folder, re-produce that folder.

It died on cost. Extraction meant sending document text to a model, and the
corpus is large, and every re-run meant paying for all of it again. The token
bill for a full pass was high enough that I couldn't iterate — and a design you
can't afford to run twice is a design you can't debug. The architecture was
sound and the economics killed it.

## Attempt 3 — a local model and Claude, split down the middle

The fix for cost seemed obvious: move the expensive, high-volume part onto
hardware I already own. A local LLM reads the documents and extracts the
features. Claude, which is far better at it, handles the relational reasoning on
top — how these entities connect, which mention refers to which organization.

For a while this looked like the answer. Local extraction was effectively free,
and the relational quality was good.

Then it drifted. Every new kind of relationship in the corpus needed its own
prompting to handle, and those prompts accumulated. The context I had to ship to
Claude grew with them — more instructions, more extracted context, more variety
of relationship to explain. Each individual increase was reasonable. The sum
wasn't: the volume of context going to the expensive model kept climbing until
the savings from running extraction locally had been quietly eaten away.

I'd moved the cost rather than removed it. The hybrid had no mechanism to stop
its own expensive half from growing.

## Starting over — the ledger is the system

The fourth attempt started from a different question. Not _how do I extract this
well_, but _what has to be true for this thing to survive being changed?_

**Specify each step, and give every file a ledger entry.** The heart of the
redesign is a plain table recording, for every document, which stage it has
reached and what the result was. Not a log — a ledger, and the stages read from
it. Stages don't call each other. Each one asks the ledger what work is
outstanding, does it, and writes back its state. When one stage stalls, the
others keep going; there's nothing for a failure to cascade through. Earlier
designs died in part because classification called extraction directly, so
anything that jammed jammed everything.

**Break it into genuinely independent procedures.** Deciding what type of
document this is. Pulling the fields out of it. Linking the extracted entities to
each other. Each is separately runnable, separately re-runnable, separately
debuggable — and each picks whatever model actually fits. Some steps warrant a
local LLM. Plenty of others are better served by rules or a small regression than
by any language model at all, and are cheaper and more predictable for it.

**Put a human in the loop, with a UI over the ledger.** This is the part I'd been
missing entirely. There's now a web interface whose only job is to let me look at
what the pipeline decided and correct it — a misclassified document, a field
extracted correctly but interpreted wrong, two records that should have resolved
to the same organization. My correction is the highest authority in the system;
nothing downstream is allowed to overwrite it.

Crucially, corrections don't just patch a row. They feed back into the procedures
themselves — a corrected alias becomes a rule the validator uses next time, a
corrected classification becomes evidence for the classifier. The system gets
better because it's used, rather than getting better only when I rewrite code.

**Separate what you ask from how you judge.** The single most useful distinction
I found. A field definition has two faces: the part that shapes the prompt sent
to the model (its name, type, description) and the part used to judge the answer
that comes back (accepted aliases, normalization, whether it's required). Change
the first and you must re-extract, which costs GPU time. Change the second and
you only need to re-judge the output you already have — zero model calls.

Conflating those two is expensive in a way that's easy to miss. In the first
system, a single field's accepted-value list was too narrow: documents wrote out
a longer official form of a word than the list allowed, so the validator threw
away answers the model had read correctly. That one field accounted for **72.5%**
of all rejections. The fix was one line of data. But because the fix was tangled
into the extraction path, applying it meant re-extracting the whole corpus — so I
didn't apply it. Of 284 known issues in that system, 279 went unfixed.

## Lessons learned

**A knowledge base is a process, not an artifact.** Almost every mistake above
came from designing something that could be _built_ rather than something that
could be _maintained_. The first version of any of these designs works. Ask what
the tenth run looks like.

**State beats flow.** The pipeline metaphor is seductive and it hides the thing
that actually matters — where each item is, and what happens when one gets stuck.
Once the ledger became the system rather than the sequence, most of the
change-management code I'd been writing simply stopped being necessary.

**If the cost of doing the right thing is wrong, nobody does the right thing.**
This is the lesson I keep coming back to. The strongest evidence wasn't a failure,
it was an avoidance: I once skipped a schema-version bump I was supposed to make,
because the tool couldn't express _"re-do only the documents this actually
affects"_ and the correct action would have wasted a re-run on unrelated files.
My judgment was fine. The tool had mispriced discipline. Make the cost of a
change proportional to its real blast radius, or people will route around your
process — and they'll be right to.

**Don't spend a language model on what a rule can decide.** Checking that annual
budget figures sum to the stated total is arithmetic. Checking that an expense
postdates a project's end is a date comparison. Sending either to an LLM is
slower, costlier, and less reliable than the ten lines of code that do it exactly.
Save the model for what genuinely needs judgment.

**Make the system say "I don't know."** The most damaging failure in the first
version wasn't wrong answers, it was confident ones — over half of all documents
collapsed into a catch-all classification, and a model replying _"this is not
stated in the document"_ got recorded as a successful extraction. Uncertainty has
to be a first-class outcome that lands in a review queue, not something the
schema quietly rounds off to a value.

**Human correction isn't a fallback, it's a component.** I spent three designs
treating manual fixes as an admission that the automation had failed, and so
never built anywhere to put them. The correction interface turned out to be the
most valuable part of the system — not because the pipeline is bad, but because
it's the only channel through which the pipeline learns what it got wrong.

None of this is novel. It's the ordinary lesson that arrives at whatever pace
you're willing to learn it — that the hard part of building on top of language
models is rarely the model, and almost always everything around it.
