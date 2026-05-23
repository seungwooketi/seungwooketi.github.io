---
layout: page
title: AGRIDATA — Smart-Greenhouse AI Data Platform
description: Big-data platform for smart-greenhouse production-environment management — data curation, quality, and AI analytics
img: assets/img/projects/agridata_concept.png
importance: 4
category: completed
---

**AGRIDATA** built a practical **AI platform for managing the production
environment of smart greenhouses** (Korean title: _스마트 온실 생산환경 관리용
인공지능 플랫폼 실용화_), under the national multi-ministry Smart Farm package
program. The goal was a data-centric, autonomous-cultivation greenhouse: collect
and curate field data, learn growth models, and drive AI-based decision support
and optimal environment control. The consortium was led by **Kyungpook National
University**, with **KETI** and **Daliworks** as co-research institutions.

{% include figure.liquid loading="eager" path="assets/img/projects/agridata_concept.png" class="img-fluid rounded z-depth-1" zoomable=true caption="Platform overview: a smart-farm big-data pipeline feeds AI model management and analysis, driving a decision-support precision-agriculture platform (FES) for optimal cultivation timing and control." %}

**Highlights**

- A **full-lifecycle agricultural data platform** — multi-source ingestion (self-collected, platform, and public data), storage, and automatic metadata generation
- **Eight data-quality-improvement modules** plus a formal quality-metric scheme (syntactic, semantic, and range accuracy, and risk-of-inaccuracy)
- **Multi-source data alignment** to reconcile differing sampling periods and types without distorting the originals
- **Cloud integration** on a Naver Data Box / Connected-Server architecture, feeding decision-support and farming-execution (FES) services

**KETI's major contributions** (KETI was the co-research institution for the data platform)

- Greenhouse **data-processing modules** with performance evaluation, a **dual-database data catalog**, and quality criteria for training-data construction
- A **data quality-measurement scheme** — syntactic, semantic, and range accuracy plus a risk-of-inaccuracy index — to validate data before analysis
- **Multi-source data alignment** and **Naver Data Box cloud integration**, enabling model inference and data processing within the platform's access constraints

{% include figure.liquid loading="lazy" path="assets/img/projects/agridata_keti.png" class="img-fluid rounded z-depth-1" zoomable=true caption="KETI contribution (Year 1): greenhouse data-processing modules and performance evaluation, a dual-database data catalog, and quality criteria for training-data construction." %}

**Funding:** Ministry of Agriculture, Food and Rural Affairs / IITP  
**Period:** 2021 – 2023  
**Role:** Co-PI (KETI)
