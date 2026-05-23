---
layout: post
title: "Uncertainty Quantification Meets Inverse Dynamics"
date: 2026-05-23 09:00:00+0900
description: A concept review of uncertainty quantification (UQ), inverse dynamic models (IDM), and why combining them matters for safe, data-efficient robot control.
tags: UQ IDM bayesian-deep-learning robotics trustworthy-AI
giscus_comments: false
related_posts: false
published: true
toc:
  sidebar: left
---

Most machine-learning models hand you a single number and stay silent about how
much to trust it. For a classifier that is merely inconvenient; for a robot
computing the torque to send to a motor, a confident-but-wrong estimate can be
unsafe. This post is a concept review of two ideas I have been looking at
together — **uncertainty quantification (UQ)** and the **inverse dynamic model
(IDM)** — and why their combination is a promising direction for trustworthy
control. It is deliberately concept-first; the references at the end point to the
math and the code.

## What uncertainty quantification is really about

UQ is the umbrella term for measuring and managing the uncertainty attached to a
model's prediction. Instead of returning a point estimate, a UQ-aware model
returns the prediction *together with* a confidence or error range, which is what
lets a downstream system make a safe decision rather than a blind one.

The first distinction that matters is between two kinds of uncertainty:

| Type | What it is | Cause | Reducible? |
| :-- | :-- | :-- | :-- |
| **Epistemic** | The model doesn't know | Too little training data, model misspecification | Yes — more data, better model |
| **Aleatoric** | The data is inherently noisy | Sensor error, measurement limits, intrinsic randomness | No — it's a property of the data |

Keeping these apart is practically important: epistemic uncertainty tells you
*where to collect more data*, while aleatoric uncertainty tells you the *floor*
below which no amount of data will help.

A useful working principle for estimating uncertainty without labels is the
**consistency hypothesis**: the more confident a model is about an input, the
more consistent its outputs stay under repeated or perturbed inference. If you
rephrase the same question several ways and the answer wobbles, the model is
effectively uncertain in that region. This is especially handy for generative
models, where ground-truth labels for "confidence" don't exist.

## Four ways to estimate uncertainty

Several methods operationalize these ideas, each trading off fidelity against
cost:

| Method | Core idea | Strength | Limitation |
| :-- | :-- | :-- | :-- |
| **MC Dropout** | Keep dropout on at inference, do N forward passes; the spread is the uncertainty | Trivial to implement | Approximation quality is sensitive |
| **Deep Ensembles** | Train K models from different seeds; their disagreement is the uncertainty | High-quality epistemic estimates | K× the storage and compute |
| **Gaussian Process** | A kernel-defined process that outputs mean *and* variance | Variance grows automatically where data is sparse | O(N³) in the number of points |
| **Conformal Prediction** | Returns a set with a coverage guarantee: P(truth ∈ set) ≥ 1−α | Distribution-free statistical guarantee | Needs a calibration set |

MC Dropout has a clean theoretical grounding — Gal & Ghahramani showed that a
dropout network approximates a Gaussian process, with each dropout mask acting
like a sample from the weight posterior. Conformal prediction is attractive for
safety-critical settings (clinical decisions, autonomous driving) precisely
because its guarantee holds for *any* underlying model.

UQ also drives **active learning**: if the question is "which sample, once
labeled, teaches the model the most?", the answer is the one with the highest
*epistemic* uncertainty. BALD (Bayesian Active Learning by Disagreement) targets
exactly that — samples where each model is individually confident but the models
disagree with each other are the most valuable to label.

## Inverse dynamic models in one paragraph

Robotics has two complementary dynamics problems. A **forward** dynamic model
maps forces to motion ("if I apply this torque, how does it move?"); an
**inverse** dynamic model maps a desired motion to the force required ("to move
like this, what torque do I need?"). For a rigid-body system the relationship is
the Euler–Lagrange equation,

$$
\tau = M(q)\,\ddot{q} + C(q,\dot{q})\,\dot{q} + G(q),
$$

where $$M$$ is the inertia matrix, $$C$$ the Coriolis/centrifugal term, $$G$$
gravity, and $$\tau$$ the joint torque the IDM outputs given a trajectory
$$(q,\dot{q},\ddot{q})$$. A good IDM enables feedforward control: the more
accurate it is, the less work the feedback controller has to do, and the more
precise the motion.

You can build an IDM two ways. The **model-based** route computes the physics
directly — interpretable and physically correct, but it needs accurate
parameters and struggles with un-modeled nonlinearities (flexible joints,
friction). The **learning-based** route fits a neural network — it captures
complex nonlinearities automatically, but it is data-hungry and extrapolates
poorly. Interestingly, the IDM idea has also escaped robotics: in **action-free**
imitation learning, an IDM infers the action from $$(\text{state},
\text{next state})$$ pairs, which is how OpenAI's VPT learned to play Minecraft
from unlabeled video, and how Ego4D-style work learns policies from human hand
videos.

## Why combine UQ with IDM

A plain IDM outputs a single torque with no notion of how reliable it is. Putting
a distribution on that torque is what makes uncertain-aware, robust control
possible. A Gaussian-process IDM, for example, outputs

$$
\tau^\* \sim \mathcal{N}(\mu^\*, \sigma^{\*2}),
$$

where the variance $$\sigma^\*$$ inflates automatically in joint configurations
the model hasn't seen — a built-in warning signal. Where GPs don't scale,
Bayesian neural network approximations (MC Dropout, Deep Ensembles, or a
heteroscedastic head that separates mean torque from aleatoric noise) play the
same role.

Sensor noise also has to be tracked: a first-order Taylor expansion propagates
measurement covariance through the IDM Jacobian into torque uncertainty,

$$
\Sigma_\tau \approx \frac{\partial\tau}{\partial q}\,\Sigma_q\,\frac{\partial\tau}{\partial q}^{\!\top}
+ \frac{\partial\tau}{\partial \dot q}\,\Sigma_{\dot q}\,\frac{\partial\tau}{\partial \dot q}^{\!\top}
+ \frac{\partial\tau}{\partial \ddot q}\,\Sigma_{\ddot q}\,\frac{\partial\tau}{\partial \ddot q}^{\!\top}.
$$

Once you have $$p(\tau)$$, the uncertainty can flow straight into the controller.
**Tube MPC** adds a constraint "tube" sized to the uncertainty so the real
trajectory stays within bounds. **Chance-constrained control** enforces
$$P(\tau \le \tau_{\max}) \ge 1-\varepsilon$$, which expands to
$$\mu_\tau + \Phi^{-1}(1-\varepsilon)\,\sigma_\tau \le \tau_{\max}$$ — i.e. the
command becomes more conservative exactly when the model is less certain.
**Control barrier functions** can likewise be made probabilistic, widening the
safety margin automatically under high uncertainty.

## Research directions worth pursuing

Four topics fall out of this combination:

**Physics-informed Bayesian IDM** — embed the structure of the physics equations
into a Bayesian network (e.g. a Hamiltonian neural network with MC Dropout) so it
extrapolates better and stays physically plausible with less data.

**Safety-constrained active learning for IDM** — instead of just maximizing
information gain, choose trajectories that are *both* informative *and* safe,
optimizing something like $$P(\text{safe} \mid \text{traj}) \times I(\tau;\theta
\mid \text{traj})$$. Useful for quickly calibrating a new robot platform and for
human-robot collaboration.

**Consistency-based UQ for action-free IDM** — when learning an IDM from video
with no action labels, infer the action several times for the same $$(\text{state},
\text{next state})$$ pair and treat the disagreement as uncertainty, sending the
shaky transitions to human-in-the-loop relabeling.

**An HITL-integrated UQ-IDM pipeline** — switch between automatic, semi-automatic,
and manual control as a function of the uncertainty level, so the system runs
itself when confident and asks for help when it isn't.

The through-line is simple: a model that knows what it doesn't know can act
safely at the edge of its competence instead of failing silently. That is the
property I want in any system that touches the physical world.

## References

- Abdar et al., *A Review of Uncertainty Quantification in Deep Learning* (2021) — [arXiv:2011.06225](https://arxiv.org/abs/2011.06225)
- Gal & Ghahramani, *Dropout as a Bayesian Approximation* (ICML 2016) — [arXiv:1506.02142](https://arxiv.org/abs/1506.02142)
- Angelopoulos & Bates, *A Gentle Introduction to Conformal Prediction* (2021) — [arXiv:2107.07511](https://arxiv.org/abs/2107.07511)
- Rasmussen & Williams, *Gaussian Processes for Machine Learning* (MIT Press, 2006) — [gaussianprocess.org/gpml](https://gaussianprocess.org/gpml/)
- Deisenroth & Rasmussen, *PILCO: Data-Efficient Learning in Robotics and Control* (PAMI 2015)
- Giacomuzzo et al., *A Black-Box Physics-Informed Estimator based on GP Regression for Robot Inverse Dynamics* (2023) — [arXiv:2310.06585](https://arxiv.org/abs/2310.06585)
- Kirsch et al., *BatchBALD: Efficient and Diverse Batch Acquisition for Deep Bayesian Active Learning* (NeurIPS 2019) — [arXiv:1906.08158](https://arxiv.org/abs/1906.08158)
- Baker et al., *Video PreTraining (VPT)* (OpenAI, 2022)
