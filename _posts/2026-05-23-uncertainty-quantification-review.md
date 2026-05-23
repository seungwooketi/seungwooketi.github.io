---
layout: post
title: "Uncertainty Quantification: 기술 검토 노트"
date: 2026-05-23 09:00:00+0900
description: 신뢰성 있는 AI를 위한 불확실성 정량화(UQ) 기법 검토 노트
tags: UQ trustworthy-AI machine-learning
giscus_comments: false
related_posts: false
published: false
toc:
  sidebar: left
---

> 이 글은 템플릿입니다. 아래 구조에 채팅에서 정리한 UQ 검토 내용을 옮겨 넣고,
> 머리말의 `published: false` 를 `true` 로 바꾸면 공개됩니다.

## 배경 — 왜 UQ인가

검토를 시작하게 된 맥락. (예: LLM/엣지 AI의 신뢰성 요구, 안전·보안 관점에서의 필요성)

## 핵심 기법 정리

대표적인 UQ 접근을 항목별로. 본문에서는 자연스러운 문단으로 풀어 쓰되,
필요하면 표로 비교할 수 있습니다.

| 기법 | 핵심 아이디어 | 장점 | 한계 |
| :-- | :-- | :-- | :-- |
| Bayesian NN | 가중치를 분포로 | 이론적 근거 | 계산 비용 |
| MC Dropout | 추론 시 dropout 샘플링 | 구현 간단 | 근사 품질 |
| Deep Ensembles | 다중 모델 분산 | 성능·견고성 | 자원 소모 |
| Conformal Prediction | 분포가정 없는 보장 | 통계적 커버리지 | 보정 데이터 필요 |

## 수식 표기 예시

인라인 수식 $$p(y \mid x)$$ 과 블록 수식 모두 지원됩니다 (KaTeX):

$$
\mathrm{Var}[y] = \underbrace{\mathbb{E}[\mathrm{Var}(y\mid\theta)]}_{\text{aleatoric}} + \underbrace{\mathrm{Var}(\mathbb{E}[y\mid\theta])}_{\text{epistemic}}
$$

## 적용 관점 / 평가

KETI 연구(엣지 AI, 보안)와 연결되는 지점, 실무 적용 시 고려사항.

## 참고문헌

- 인용을 정식으로 달려면 `_bibliography/papers.bib` 에 항목을 추가하고
  본문에서 cite 태그로 참조하면 됩니다.
