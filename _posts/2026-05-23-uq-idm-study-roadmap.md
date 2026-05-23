---
layout: post
title: "A Study Roadmap for Uncertainty Quantification + Inverse Dynamics"
date: 2026-05-23 10:00:00+0900
description: A leveled reading list and a 10-week curriculum for getting from Bayesian basics to physics-informed, uncertainty-aware inverse dynamic models.
tags: UQ IDM reading-list bayesian-deep-learning robotics
giscus_comments: false
related_posts: false
published: true
toc:
  sidebar: left
---

This is the companion to my [concept review of uncertainty quantification and
inverse dynamics]({% post_url 2026-05-23-uncertainty-quantification-review %}) —
a study plan for actually learning the material. The aim is a path from the
Bayesian fundamentals up to physics-informed, uncertainty-aware inverse dynamic
models, using sources that are free to access. I have grouped it into three
levels and then sequenced it into a ten-week curriculum.

## The one idea everything rests on

Before any specific method, it helps to internalize the Bayesian view, because
every UQ technique is a way of approximating it. A Bayesian model treats its
parameters not as single values but as a distribution, and updates that
distribution as data arrives:

$$
\underbrace{p(\theta \mid D)}_{\text{posterior}} \;\propto\;
\underbrace{p(D \mid \theta)}_{\text{likelihood}} \;\times\;
\underbrace{p(\theta)}_{\text{prior}}.
$$

In words: _belief after seeing the data = evidence from the data × belief before_.
MC Dropout, Deep Ensembles, and Gaussian Processes are all different ways of
approximating that posterior when computing it exactly is intractable.

## Level 1 — Foundations

Start with the lay of the land and the core probabilistic machinery.

- **A Review of Uncertainty Quantification in Deep Learning** — Abdar et al. (2021), [arXiv:2011.06225](https://arxiv.org/abs/2011.06225). The survey to read first; it maps the whole UQ landscape.
- **A Survey on UQ Methods for Deep Learning** — He & Jiang (2024), [arXiv:2302.13425](https://arxiv.org/abs/2302.13425). Organizes methods by the _source_ of uncertainty (data vs. model) and connects to active learning and RL.
- **Gaussian Processes for Machine Learning** — Rasmussen & Williams (MIT Press, 2006), free PDF at [gaussianprocess.org/gpml](https://gaussianprocess.org/gpml/). The standard GP text; chapters 1–2 (regression) and 5 (model selection) are the priority.

## Level 2 — Core papers

These four define the methods you will actually use.

- **Dropout as a Bayesian Approximation** — Gal & Ghahramani, ICML 2016, [arXiv:1506.02142](https://arxiv.org/abs/1506.02142). Proves that a dropout network approximates Bayesian inference in a Gaussian process — the theoretical basis for MC Dropout.
- **A Gentle Introduction to Conformal Prediction** — Angelopoulos & Bates (2021/2023), [arXiv:2107.07511](https://arxiv.org/abs/2107.07511). Distribution-free coverage guarantees that apply to any model, with code and worked examples.
- **PILCO: Data-Efficient Learning in Robotics and Control** — Deisenroth & Rasmussen, PAMI 2015. The textbook treatment of a GP dynamics model with uncertainty propagation.
- **BatchBALD** — Kirsch et al., NeurIPS 2019, [arXiv:1906.08158](https://arxiv.org/abs/1906.08158). Extends BALD active learning to diverse batches; PyTorch code is public.

For the inverse-dynamics-specific thread, two recent works connect directly to
the research directions in the companion post:

- **A Black-Box Physics-Informed Estimator based on GP Regression for Robot Inverse Dynamics** — Giacomuzzo et al. (2023), [arXiv:2310.06585](https://arxiv.org/abs/2310.06585).
- **Efficient Learning of Inverse Dynamics Models for Adaptive Control** — Jorge & Mistry (2022), [arXiv:2205.04796](https://arxiv.org/abs/2205.04796). Sparse variational GP for online IDM uncertainty on a 7-DOF arm.

## Level 3 — Tutorials and lectures

For implementation and a faster visual overview:

- **Active Learning for Deep Learning** — Jacob Gil's blog: BALD/BatchBALD with PyTorch code, the most approachable hands-on resource.
- **Conformal Prediction lecture notes** — Ryan Tibshirani, UC Berkeley (2023): a rigorous, math-first complement to the Angelopoulos tutorial.
- **Uncertainty Quantification in Deep Learning** — Franchi, ECCV 2024 tutorial slides: a visual, end-to-end overview of modern UQ methods.

## A 10-week curriculum

| Weeks | Focus                                                         | Primary material                     |
| :---- | :------------------------------------------------------------ | :----------------------------------- |
| 1–2   | Survey the UQ landscape; method types and uncertainty sources | Abdar et al. survey                  |
| 3–4   | MC Dropout and the Bayesian deep-learning view                | Gal & Ghahramani + ECCV 2024 slides  |
| 5–6   | Gaussian processes, then GP dynamics via PILCO                | Rasmussen & Williams ch. 1–2 + PILCO |
| 7     | Conformal prediction theory, then run the code                | Angelopoulos & Bates                 |
| 8     | BALD / BatchBALD theory, then run the GitHub code             | BatchBALD + PyTorch_BatchBALD        |
| 9–10  | Physics-informed GP IDM — connect to the research plan        | Giacomuzzo et al. + Jorge & Mistry   |

The through-line is the same as the concept review: build up to a model that
reports not just a prediction but how much to trust it, then put that uncertainty
to work in control. If you only have time for three things, read the Abdar
survey, the Gal & Ghahramani paper, and the Angelopoulos conformal-prediction
tutorial — they cover the map, the workhorse method, and the guarantee.
