---
layout: post
lang: ko
title: "산업 파운데이션 모델은 무엇이어야 하는가"
date: 2026-06-03 09:00:00+0900
permalink: /blog/ko/foundation-ai-for-industry/
description: 산업 파운데이션 모델이라는 말이 R&D 사업마다 등장한다. 그런데 '파운데이션'이라는 이름에 걸맞으려면 그 모델은 모든 걸 아는 전지(全知)한 모델이 아니라, 그 위에 도메인 지식을 쌓을 수 있는 반석이어야 하지 않을까.
tags: foundation-models industrial-ai manufacturing domain-knowledge ai-policy ipcei eu-ai-act open-source korean
giscus_comments: false
related_posts: false
published: false
toc:
  sidebar: left
---

<p class="text-center">
  <img src="{{ '/assets/img/foundation-ai-hero.png' | relative_url }}"
       alt="공통 산업 파운데이션 모델이라는 반석 위에 제조·서비스 등 여러 산업이 올라서 있는 모습"
       style="max-width:100%; height:auto;">
</p>

AI 기술의 발전은 다양한 분야로의 AI 적용을 빠르게 진행시키고 있다. 특히 국내의
경우 산업 파운데이션 모델에 대한 연구개발 투자가 정부를 비롯한 여러 분야에서
이뤄지고 있다. 산업부, 과기부 등 다양한 정부기구들은 최근 공개되는 R&D 사업들에서
데이터의 중요성과 함께 산업 파운데이션 AI 를 위한 데이터 공유를 강조하고 있다.

여기서 산업 파운데이션 모델에 대한 고민이 조금 필요하지 않을까 싶다. 파운데이션
모델은 무엇으로 정의할 수 있을까? 그리고 산업 파운데이션 모델이라는 것은 어떤
기능을 제공해야 그 이름에 걸맞는 역할을 할 수 있을까?

## 파운데이션 모델은 무엇으로 정의되는가

파운데이션 모델에 대해서는 다양한 정의가 있다. 이 용어를 처음 정리한 스탠퍼드
CRFM 의 보고서는 파운데이션 모델을 "넓은 데이터로 학습되어(주로 대규모
자기지도 학습으로) 다양한 다운스트림 과제에 **적응**시킬 수 있는
모델"이라고 규정한다.[^crfm] 정의의 무게중심이 '모든 것을 안다'가 아니라 '그
위에 무언가를 적응시켜 올릴 수 있다'에 있다는 점이 중요하다.

말 그대로다. 파운데이션 모델은 기반이 되고, 기반을 제공할 수 있는 모델이어야
한다. 모든 걸 이해하고 모든 문제를 해결하는 전지전능한(God-Almighty) 존재라기보다,
그 위에 무언가를 지을 수 있는 반석이나 머릿돌 같은 역할을 해야 하지 않을까.

## 전지(全知)한 모델은 기반이 아니다

이 구분은 파운데이션 모델이 산업에 끼치는 영향과도 직접 맞닿는다. 예를 들어
반도체 산업의 파운데이션 모델을 생각해 보자. 어느 반도체 기업이 엄청난 양의
데이터로 제조 공정 의사결정을 지원하는 훌륭한 모델을 개발했다고 하자. 만일 이
모델이 '파운데이션 모델'이라는 이름으로 공개된다면, 그것은 반도체 시장의
진입장벽을 허무는 결과를 가져올 수 있다.

이때 선발주자는 자신의 노하우가 그대로 담긴 모델을 후발주자에게 넘겨주는,
이른바 **floor lifting**(바닥을 올려주는) 효과만을 얻게 될 것이다. 이런 모델은
파운데이션 모델이라기보다 전능한(almighty) 혹은 전지한(omniscient) 모델이라고
부르는 편이 더 정확하다. 기반이 아니라 완성품에 가깝기 때문이다.

## 기반은 지식을 담는 그릇이 아니라, 지식을 쌓는 반석

그래서 기반 모델, 파운데이션 모델이라 함은 각 도메인의 지식을 모두 담고 있는
모델이라기보다, 각 도메인의 지식을 **그 위에 쌓을 수 있도록** 하는 역할에 더
충실해야 한다고 생각한다. 도메인 지식이 산업 파운데이션 모델 위에 쌓이고, 이를
통해 제조 공정, 서비스 관리, 품질 관리 등 다양한 도메인 특화 산업 모델로 확산될
수 있어야 비로소 '기반'이라는 이름에 어울리는 역할을 한다고 볼 수 있다.

<p class="text-center">
  <img src="{{ '/assets/img/foundation-ai-stack.png' | relative_url }}"
       alt="산업 파운데이션 모델을 기반으로 제조·서비스·품질 도메인 지식이 쌓여 각 도메인 특화 모델로 발전하는 구조"
       style="max-width:100%; height:auto;">
</p>

<p class="text-center"><small><em>가장 아래의 산업 파운데이션 모델 위에 도메인 지식이 쌓여, 여러 도메인 특화 모델로 발전한다.</em></small></p>

## 그래서 무엇이 중요해지는가

결국 산업 파운데이션 모델을 이야기할 때는, 각 도메인의 언어를 이해할 수 있고
도메인 지식과의 연계를 지원할 수 있는, **기반이 되는 형태의 서비스 구성**이
중요해진다. 모든 답을 미리 담아 둔 모델이 아니라, 도메인의 답이 그 위에서 자라게
하는 모델 말이다.

이런 관점을 꽤 구체적으로 보여 주는 사례가 유럽의 **IPCEI-AI**(Important
Projects of Common European Interest 중 AI 분야) 구상이다.[^ipcei] 이들은 산업
AI 모델의 개발을 하나의 완성된 산출물이 아니라, 세 개의 층위로 쌓여 가는
**생애주기(life-cycle)**로 그린다.

<p class="text-center">
  <img src="{{ '/assets/img/ipcei-ai-systemic-approach.png' | relative_url }}"
       alt="IPCEI-AI가 제시하는 3계층 산업 AI 모델 개발 구조 — 기반 모델, 섹터 특화 모델, 기업 특화 모델이 파인튜닝으로 연결된다"
       style="max-width:100%; height:auto;">
</p>

<p class="text-center"><small><em>IPCEI-AI 가 그리는 산업 AI 모델 개발의 3계층 생애주기. 가장 아래 기반 모델은 개방·공유(free and open-source)로 두고, 위로 갈수록 도메인·기업 특화로 좁혀진다. 출처: <a href="https://www.bundeswirtschaftsministerium.de/Redaktion/EN/Dossier/ipcei-ai.html">BMWE, IPCEI-AI</a>.</em></small></p>

1. **기반 모델(Basic AI models).** 공통 데이터로 사전학습(pre-training)된 가장
   아래의 베이스 모델이다. 핵심은 이 층을 **개방·공유**(free and open-source),
   공통 거버넌스, AI 모델 마켓플레이스, 그리고 EU AI Act 준수라는 일종의
   공공재로 정의한다는 점이다.
2. **섹터·도메인 특화 모델(Sector-specific AI models).** 그 위에서 도메인
   데이터로 파인튜닝(fine-tuning)과 추가 사전학습(continued pre-training)을 거쳐
   도메인 모델, 나아가 도메인 추론 모델로 발전한다.
3. **기업 특화 모델(Company-specific AI models).** 다시 그 위에서 고객·기업
   데이터로 파인튜닝하여 만들어지는, **고보안·기업 소유의 독점 모델**이다.

이 그림이 흥미로운 이유는, 앞서 이야기한 *floor lifting* 의 딜레마에 대한 답을
구조 자체로 제시하고 있기 때문이다. 기반 모델 층은 누구나 딛고 설 수 있도록
개방하되, 기업의 진짜 노하우는 위쪽의 도메인·기업 특화 층에 남는다. 다시 말해,
**'어디까지를 파운데이션으로 공개할 것인가'의 경계선을 노하우 아래에 긋는
것**이다. 그러면 기반은 모두의 바닥을 올려 주는 공공재 역할을 하면서도, 선발주자가
자기 머릿돌까지 통째로 넘겨주는 일은 일어나지 않는다.

또 하나 눈여겨볼 점은, 이 세 층이 한 번 만들고 끝나는 정적인 결과물이 아니라
**지속적으로 학습되고 강화되는 하나의 생애주기**로 묶여 있다는 것이다.
파인튜닝과 추가 사전학습이 층과 층을 잇는 연결 조직이고, 그 흐름이 끊기지 않게
받쳐 주는 것이 바로 기반 모델의 역할이다. 결국 산업 파운데이션 모델의 가치는
'얼마나 많이 아는가'가 아니라, **그 위에서 도메인과 기업의 지식이 얼마나 잘
자라게 하는가**에서 나온다.

---

[^crfm]: Bommasani et al., "On the Opportunities and Risks of Foundation Models," Stanford CRFM, 2021. [arXiv:2108.07258](https://arxiv.org/abs/2108.07258)

[^ipcei]: IPCEI-AI (Important Projects of Common European Interest – Artificial Intelligence), 독일 연방경제에너지부(BMWE) 주관. [IPCEI Artificial Intelligence (BMWE)](https://www.bundeswirtschaftsministerium.de/Redaktion/EN/Dossier/ipcei-ai.html)
