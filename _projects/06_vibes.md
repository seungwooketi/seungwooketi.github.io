---
layout: page
title: VIBES — Smart-Livestock Cloud–Edge AI Platform
description: Hierarchical cloud–edge platform and embedded intelligent services for smart livestock farming (Korea–Czech joint R&D)
img: assets/img/projects/vibes_architecture.png
importance: 6
category: completed
---

**VIBES** developed a **hierarchical cloud–edge platform with embedded intelligent
services for smart livestock farming** (Korean title: _스마트 축산용 계층형
클라우드-엣지 플랫폼 및 임베디드 지능형 서비스 솔루션 개발_), under the 2019
Korea–Czech International Joint Technology Development program (bilateral
co-funding, 2019–2022). The system combines AI, IoT, and video to diagnose and
predict farm-environment and animal-growth conditions, and manages them through
tiered cloud–edge services.

**Consortium**

- **Korea:** Gluesys (lead), KETI, and Korea National Open University (KNOU)
- **Czech Republic:** Iterait (lead), Brno University of Technology, and the Czech University of Life Sciences

**Concept**

The platform is split across an **AI-Cloud Platform** — a Control Server for
hierarchical farm/edge management plus an AI Server for training and model
deployment — and multiple **AI-Edge Systems** that collect IoT and video data and
run on-site inference, complemented by a **portable meter** for body-temperature
and growth data. This tiering distributes compute efficiently and keeps services
running under network delays or outages, while AI analysis drives environment,
growth, and fire-management services with forecast-based alerts.

{% include figure.liquid loading="eager" path="assets/img/projects/vibes_architecture.png" class="img-fluid rounded z-depth-1" zoomable=true caption="System architecture: a tiered AI-Cloud Platform (Control Server + AI Server) with multiple AI-Edge Systems and a portable meter, delivering environment, growth, and fire-management services." %}

**KETI's major contributions**

- A **hierarchical AI-edge platform and AI model-management system** — an AI service interface, an AI model repository, and a container-deployment service built on Kubernetes — that packages AI as microservices and offloads them from cloud to edge, including embedded accelerators (ARM, NVIDIA Xavier)
- An **environment-prediction AI server and module** — time-series preprocessing (refinement, outlier cleaning, imputation) and AutoML for regression, forecasting, and classification — reaching **84.96% average prediction accuracy** against a 75% target
- An **edge-resource monitoring dashboard** built on Prometheus, with a Xavier node exporter for real-time CPU/GPU/memory monitoring of embedded edge nodes

{% include figure.liquid loading="lazy" path="assets/img/projects/vibes_env_ai.png" class="img-fluid rounded z-depth-1" zoomable=true caption="KETI's environment-prediction AI server: time-series analysis, visualization, and AutoML over the collected farm sensor data." %}

{% include figure.liquid loading="lazy" path="assets/img/projects/vibes_ai_platform.png" class="img-fluid rounded z-depth-1" zoomable=true caption="KETI's hierarchical AI model-management platform: an AI interface, model repository, and container deployment over Kubernetes, offloading AI from cloud to edge." %}

**Outcomes:** field-validated on commercial pig farms (Sangju and Gunwi, Korea),
the project exceeded its quantitative targets and contributed an international
standard proposal to ISO/IEC JTC1 SC29 WG7 (MPEG-IoMT, m61001) on time-series
data analysis for smart farming.

**Funding:** Korea–Czech International Joint Technology Development Program  
**Period:** 2019 – 2022  
**Role:** KETI PI (Korean participating institution; Gluesys was the Korean lead)
