---
layout: post
title: "Industrial AI and its visibility"
date: 2026-06-06 09:00:00+0900
og_image: https://seungwooketi.github.io/assets/img/industrial-ai-visibility-hero.png
description: "Commercial AI is already astonishingly good — so do we even need a separate industrial AI model? A look at three constraints (protecting information, cost, and sustainability) and why the thing that ultimately holds it all together is AI visibility."
tags: industrial-ai foundation-models ai-visibility agentic-ai sustainability llm
giscus_comments: false
related_posts: false
published: true
toc:
  sidebar: left
---

<p class="text-center">
  <img src="{{ '/assets/img/industrial-ai-visibility-hero.png' | relative_url }}"
       alt="A heap of data being funneled into an AI model, with the words 'AI Visibility'"
       style="max-width:100%; height:auto;">
</p>

<p class="text-center"><small><em>한국어 버전: <a href="{{ '/blog/ko/industrial-ai-visibility/' | relative_url }}">산업 AI의 지속가능성은 결국 'AI 가시성'에서 온다</a></em></small></p>

Having already opened up the thread on [what an industrial foundation model should be]({{ '/blog/2026/foundation-ai-for-industry/' | relative_url }}), I want to sit with a more practical question this time. And let me give away the ending up front: where this lands is **AI visibility**. If an industrial AI system is going to be something that stays alive — rather than something you build once and forget — I suspect visibility is the key.

That AI is improving fast is something we all feel by now. I lean on a few AI services myself — I'm a particular fan of [Claude](https://claude.ai) — and the tools that, as late as last summer or autumn, felt "helpful but still a bit clumsy" got noticeably sharper over the turn of the year. These days they keep shrinking the amount I have to fix by hand. For a recent paper I designed the study and left almost all of the implementation and the write-up of results to Claude Code, and I was genuinely surprised at how polished it came out.

## Isn't commercial AI enough?

Which naturally raises the question: do we even need a separate industrial AI model? Can't we just use a commercial AI service? Plenty of people ask exactly that — "why not just use Claude or ChatGPT?" — and it's a fair question, given how good these already are.

A year ago my research plans still included work on pushing up NL2SQL (natural language → query) accuracy for RAG. That line item has quietly disappeared. Hand a commercial AI an Excel file and a DB schema — without even explaining them — and it reads the context inside and produces a high-quality query on the spot. Better still, it runs the query, reads the error message, and fixes and retries it on its own.

## The catch that won't go away: protecting your information

Still, there's one place where everyone hesitates: information leakage. I used Claude and ChatGPT myself while putting together a few project proposals recently, and I was quietly impressed at how well these overseas services understood Korean RFPs and proposal formats. Flip that around, though, and it means that in the very act of asking, I'm already handing a fair amount of information over. In this era information is an asset, and an asset that flows into a commercial AI becomes one that anyone can conveniently borrow to get better results.

So the first constraint for industrial AI is, I think, information protection — running on an isolated or internal network so that information simply has no path out. This is a slightly different idea from conventional security. Where we used to reason about encryption or attack defense at the physical layer or the service layer, using only part of the picture, the targets here grow more concrete — data, models, tampering — and so the security and safety policy has to grow more concrete with them.

## Performance, and cost

Say we've managed to keep information safe inside a closed space. The next worry is performance. The "traditional" toolkit that comes to mind is fine-tuning, tool calling, and knowledge hookups like RAG — though calling techniques barely five or ten years old "traditional" is a little funny.

And here cost shows up. Gathering data, labeling it, running extra training — done properly, it adds up faster than you'd expect.

## Sustainability

Building it well isn't the end of the story either. Next comes sustainability. Manufacturing processes with short lifespans, input data that keeps shifting, regulations and rules that keep getting revised. It would be lovely if a well-built model just kept working, but reality isn't that generous.

## Three things, really

Read only this far and you might conclude, "maybe industrial AI models just aren't worth it." Heh. But the axes of the problem actually collapse into three.

1. **Information protection** — how do I keep my information safe while using AI?
2. **Accuracy and cost** — how do I raise accuracy, and how do I keep the cost of doing so down?
3. **Sustainability** — and, most important of all, how do I keep the whole thing running?

AI is genuinely expensive. You evaluate and pick a foundation model, build and vet data, attach labels, run extra training, layer on security — and after all that effort, the moment the target product or service changes, you start over. That repetition is the heart of the cost, which is why the third item, sustainability, ends up quietly swallowing the other two.

## So, the foundation model's role

When I think about sustainability, the thing I value most is **separating context understanding from domain information**. These two are better kept apart: context understanding handled by the foundation model, and the link to domain information handled by an agent built from various tools.

When you feed in data and ask "how does this data look?", the answer shouldn't pop straight out of a trained model. It's closer to this: the model grasps the intent of the question (the context), calls the right tool, and pulls in domain knowledge — knowledge it was never trained on — through that tool.

In this picture the foundation model's job is bounded: understand the context, and propose the right way to call a tool for that context. It doesn't need to interpret time-series data directly, and it doesn't need to know the latest classification method. Drawing the line this way lightens the demand for retraining or fine-tuning, and the cost comes down with it. The domain side, meanwhile, you keep well organized and refresh through a closed-loop whenever the data changes — edits, additions, deletions.

That's the design. The trouble is that a design left alone drifts out of alignment over time. What keeps up with that drift is the next part of the story.

<p class="text-center">
  <img src="{{ '/assets/img/industrial-ai-visibility-arch.png' | relative_url }}"
       alt="The foundation model (context understanding) and the knowledge base (domain knowledge), with AI visibility monitoring and feeding back to both"
       style="max-width:100%; height:auto;">
</p>

<p class="text-center"><small><em>Context understanding (the foundation model) and domain knowledge (the knowledge base) are kept separate; AI visibility monitors the user–AI interaction and feeds back into both — fine-tuning on one side, schema/knowledge updates on the other.</em></small></p>

## The piece that matters most: AI visibility

No matter how cleanly you've split context understanding (the foundation model) from domain knowledge (the knowledge base and tools), once processes change, data changes, and rules change, both sides start to drift. The awkward part is that **if you don't know where and why it drifted, you can't fix it.** AI visibility is what makes that "where and why" visible.

Concretely: a user asks for some domain knowledge and doesn't get an answer. The cause is usually one of two. Either the AI **failed to understand the context at all**, or it understood the context but **couldn't produce a query that fit the knowledge base.** These are entirely different failures, and they call for different remedies. The first is about raising the foundation model's context understanding (say, fine-tuning); the second is about the knowledge base's structure and schema.

So visibility is more than logging. It's closer to a feedback loop that watches the user–AI interaction continuously and (1) names the knowledge that never reached the user, (2) tells apart whether the cause sits on the context-understanding side or the knowledge-base side, and (3) feeds that diagnosis back to each of the two. If context understanding is lacking, back toward the foundation model (fine-tuning and the like); if knowledge is missing, back toward the knowledge base (adding schema and knowledge).

Only with this feedback does an industrial AI become a living system that updates itself as the field changes, rather than a build-it-once artifact. Without visibility, the careful separation, the closed-loop, and ultimately the sustainability all risk staying slogans. With it running well, even accuracy gains and cost savings turn into "local updates guided by a diagnosis" instead of "one big retraining." That's why, of the three constraints, I think visibility quietly does the work of a lever.

## Closing

So an industrial AI model, to me, isn't about building "an even bigger do-everything model than the commercial ones." If anything it's the opposite. Inside a closed, information-protected environment, you clearly separate the context-understanding foundation model from the knowledge base and tools that hold domain knowledge, and let an agent connect the two — and that much is a matter of design.

But what makes that design _sustainable_ is, in the end, AI visibility: surfacing what failed to reach the user and why, and feeding that diagnosis back into both context understanding and domain knowledge. Only when that loop is in place does an industrial AI survive as its field keeps shifting.

In the previous post I argued that a foundation model should be "bedrock you build knowledge on," not "a model that knows everything." Take one more step and you arrive here: the work of watching over the structures on that bedrock and repairing them so they don't collapse — that is visibility, and it's the real value that sets industrial AI apart from simply using a commercial one.
