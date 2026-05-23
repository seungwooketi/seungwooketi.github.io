---
layout: page
title: KRESIP — Korea–Spain Smart-Farm AI Platform
description: AI-based precision-agriculture platform jointly developed by Korea and Spain
img: assets/img/projects/kresip_architecture.png
importance: 5
category: completed
---

**KRESIP** developed an **AI-based smart-farm precision-agriculture platform**
through a Korea–Spain international joint R&D collaboration (Korean project title:
_AI 기반 스마트팜 정밀농업 플랫폼 기술개발_). The platform spans the full pipeline —
field data collection, deep-learning analysis, and cloud–edge service deployment —
validated on real farms in both countries.

{% include figure.liquid loading="eager" path="assets/img/projects/kresip_architecture.png" class="img-fluid rounded z-depth-1" zoomable=true caption="Platform architecture: field data collection → deep-learning analysis and model deployment → cloud–edge service for smart-farm decision support." %}

**Highlights**

- **World-first flower-cluster (화방) tracking model** for strawberries, plus a fruit-detection model — contributing to an **international standard**
- A **cloud–edge platform** on a Kubernetes / AWS EKS microservice architecture for deploying and managing smart-farm AI services
- A field **rail-camera** image-acquisition system feeding the growth-recognition models
- **Dual testbeds** in Korea (strawberry) and Spain (vineyard), with a series of commercialized products (2021–2024)

**Consortium**

- **Korea:** KETI (lead), Sejong University, Daliworks, Naretrend, and Kyungpook National University (consigned)
- **Spain:** CT Ingenieros, Bodegas Bohórquez, and the University of Salamanca

{% include figure.liquid loading="lazy" path="assets/img/projects/kresip_collaboration.png" class="img-fluid rounded z-depth-1" zoomable=true caption="Korea–Spain collaboration structure: shared use-cases and work packages across the two consortia, with jointly developed field hardware." %}

**What we built**

- A cloud–edge edge-computing platform with a microservice architecture (Kubernetes / AWS EKS) for smart-farm AI services
- Agricultural growth-recognition deep-learning models and a rail-camera field imaging system
- A world-first flower-cluster tracking model and a fruit-detection model, contributing to an international standard
- A time-series agricultural data platform supporting 10+ time-series processing methods, with analysis and visualization services
- A water-stress-index complex environment-control system

{% include figure.liquid loading="lazy" path="assets/img/projects/kresip_flower_tracking.png" class="img-fluid rounded z-depth-1" zoomable=true caption="World-first flower-cluster (화방) recognition and tracking: object detection, cluster identification, and tracking on the strawberry testbed (KETI)." %}

{% include figure.liquid loading="lazy" path="assets/img/projects/kresip_edge.png" class="img-fluid rounded z-depth-1" zoomable=true caption="Edge-resource optimization for running the AI services on constrained field hardware (KETI)." %}

{% include figure.liquid loading="lazy" path="assets/img/projects/kresip_poc.png" class="img-fluid rounded z-depth-1" zoomable=true caption="PoC and testbed operation: Kubernetes-based deployment of the AI services in the field (KETI)." %}

**Testbeds and outcomes:** the platform was validated on a strawberry farm in Korea
and a vineyard/winery in Spain. The project produced world-first technologies and
international standardization, domestic and international publications, and a series
of commercialized products (2021–2024). Results were promoted at IFA Berlin 2022
and KES 2023 among other venues, and seeded follow-on Korea–Spain / Korea–EU
proposals (e.g. Horizon Europe).

**Funding:** KIAT  
**Period:** 2021 – 2024  
**Role:** Korean PI (KETI)
