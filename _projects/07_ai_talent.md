---
layout: page
title: Generative AI Talent Development Program
description: Workforce program for generative AI; KETI's research develops Vision-Language-Action (VLA) models for robot manipulation
img: assets/img/projects/ai_talent_vla.png
importance: 7
category: ongoing
---

KETI participates in the **Generative AI Talent Development** program (led by
Sejong University), which pairs next-generation AI workforce development with core
research. KETI's research thread develops **Vision-Language-Action (VLA) models
for human-motion imitation** — generating general-purpose robot tasks with
stepwise reasoning.

{% include figure.liquid loading="eager" path="assets/img/projects/ai_talent_vla.png" class="img-fluid rounded z-depth-1" zoomable=true caption="VLA model for human-motion imitation: an Inverse Dynamics Model supplies latent-token action representations and a VLM handles low-level task planning, feeding a diffusion transformer (skill-space embedding) and action decoder for general robot task generation." %}

**Research approach**

- Latent-skill-based hierarchical imitation learning with few-shot adaptation
- An Inverse Dynamics Model (IDM) extracts latent-token action representations and a Vision-Language Model (VLM) performs low-level task planning, both feeding a diffusion transformer (skill-space embedding) that drives an action decoder
- We are currently investigating **uncertainty quantification (UQ) to enhance the VLA dataset** — using UQ to improve the quality and selection of demonstration data

**Funding:** IITP (Ministry of Science and ICT)  
**Period:** 2025 –  
**Role:** Participant (KETI)
