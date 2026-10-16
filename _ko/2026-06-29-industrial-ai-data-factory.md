---
layout: post
lang: ko
title: "산업 AI를 위한 Industrial Data Lake 구상"
date: 2026-06-29 14:00:00+0900
permalink: /blog/ko/industrial-ai-data-factory/
description: 데이터와 모델을 기업의 자산으로 보호하면서도 산업 AI 모델을 개발할 수 있게 하는 Industrial Data Lake 구상. 섹터 파운데이션 모델, 이해관계자 구조와 비즈니스 모델, 독일과 유럽 IPCEI-AI의 시사점, 그리고 시스템 안에 넣어야 할 데이터 보안 기능을 정리해 보았습니다.
tags: industrial-AI industrial-data-lake foundation-model agentic-AI multi-agent data-security AI-BOM trustworthy-AI korean
thumbnail: assets/img/industrial-ai-data-factory-thumb.png
og_image: /assets/img/industrial-ai-data-factory-thumb.png
giscus_comments: true
related_posts: false
published: true
toc:
  sidebar: left
---

<p class="text-center"><small><em>English version: <a href="{{ '/blog/2026/industrial-ai-data-factory/' | relative_url }}">An Industrial Data Lake for Industrial AI</a></em></small></p>

## 문제 제기

산업 파운데이션 모델에 대한 요구는 꾸준히 커지고 있는데요, 현장마다 "우리 공정에
맞는 좋은 기반 모델이 있었으면" 하는 바람도 분명합니다. 다만 막상 만들려고 하면
산업계는 곧바로 **서로 부딪히는 요구**와 마주하게 됩니다.

한쪽에는 데이터 자산이 유출될 수 있다는 우려가 있습니다. 일반 AI에서 데이터는 많을수록 좋은
연료지만, 산업 현장에서 데이터는 곧 기업의 경쟁력 그 자체거든요. "300℃ 체임버 안에서
2시간 보관한 뒤 90% 출력, 12mm/s, 에어 블로잉으로 레이저 절단해 형상을 가공한다"와
같은 공정 파라미터 한 줄이, 그 회사가 수년에 걸쳐 쌓아 온 지식 자산입니다.
다른 한쪽에는 [예전 글]({{ '/blog/ko/foundation-ai-for-industry/' | relative_url }})에서도 한 번 짚었던 **floor lifting** 효과가 있습니다. 좋은
파운데이션 모델이 공개되면 업계 전체의 성능 하한이 함께 올라가고, 그만큼 개별
기업이 데이터로 벌려 둔 격차는 줄어들 수 있습니다. 정리하면 모순처럼 들리는데요, 좋은 파운데이션
모델은 필요하지만 정작 그것을 만들 데이터와 모델은 공유하기 어려운 상황입니다.

여기에 부담이 하나 더 있습니다. AI는 성능이 높아지는 만큼 구성도 함께 복잡해지고
있어서, 산업계가 AI를 직접 개발하고 운용하기는 점점 더 어려워지는 것 같아요. 그렇다면
데이터와 AI 모델을 **어떻게 운영하는 것이 좋을까요?** 이 질문에서 출발해 정리해 보았습니다.

## 에이전틱 AI라는 해법

에이전틱 AI는 이 상충을 풀어 갈 수 있는 하나의 방법이 될 수 있다고 생각합니다. 핵심은 "모든 걸 다 해내는
모델"을 포기하는 데 있는데요, 그 대신 **컨텍스트를 이해하는 생성형 AI**를 둡니다. 이
에이전트는 산업 데이터의 맥락을 알고 있고, 주어진 상황에서 **어떤 도구를 호출할지**를
제시합니다. 만능 두뇌라기보다는, 맥락을 읽고 적절한 도구로 연결해 주는
조율자에 가깝다고 봅니다.

{% include figure.liquid loading="eager" path="assets/img/industrial-ai-data-factory-fig.png" class="img-fluid rounded z-depth-1" alt="산업 데이터의 컨텍스트를 이해하고 적절한 도구를 호출하는 에이전트, 그리고 파인튜닝과 도구 연결이라는 두 가지 활용 경로" %}

이때 파운데이션 모델은 두 가지 방식으로 활용될 수 있습니다.

- **파인튜닝으로 내재화**: 특정 산업의 컨텍스트로 파운데이션 모델을 직접
  파인튜닝해, 지식을 모델 안에 녹여 넣는 방법.
- **도구로 연결**: 특정 산업 지식에 기반한 해석 도구를 붙여, 필요할 때마다
  외부의 지식을 끌어다 쓰는 방법.

수요자는 상황에 따라 둘 중 하나를 고를 수 있습니다. 다만 장단점은 꽤 뚜렷한 편인데요, 지식을
모델에 내재화하는 쪽은 학습 비용이 크고, 이후 모델을 유지보수하는 데에도 비용이 듭니다.
반대로 기존 파운데이션 모델에 도구를 붙이는 쪽은 유연하게 대응할 수
있지만, 그만큼 다양한 관리 기법이 필요해집니다.

| 활용 방식                         | 강점                           | 감안할 비용                              |
| --------------------------------- | ------------------------------ | ---------------------------------------- |
| 파운데이션 모델 파인튜닝 (내재화) | 지식이 모델에 녹아 일관된 응답 | 높은 학습 비용, 지속적인 유지보수 비용   |
| 도구 연결 (외부 지식)             | 유연한 대응, 쉬운 지식 갱신    | 도구와 호출에 대한 다양한 관리 기법 필요 |

그래서 둘 중 하나로 고정하기보다는 **단일 에이전트가 아닌 멀티 에이전트
구성**이 현실적인 방향이라고 생각합니다. 여러 에이전트가 각자 맥락과 도구를 나눠 맡으면, 상황에
맞는 기법을 그때그때 조합해 제시할 수 있겠죠.

그럼 이 에이전트와 파운데이션 모델을, 데이터와 모델을 공개하지 않고도 거래할 수
있게 해 주는 시스템 위에 올려 보면 어떨까요? 아래는 그 시스템을 **Industrial Data Lake**라는
이름으로 정리해 본 구상입니다.

## 목표와 범위

목적을 간단히 말하면, 산업에 로봇과 AI를 적용하는 데 필요한 데이터를
확보하고, 이를 학습에 바로 쓸 수 있는 형태로 갖춰 주는 것입니다. 시스템이 제공하는
범위는 크게 다음 세 가지로 볼 수 있을 것 같아요.

- **데이터 확보**: 산업 현장에서 나오는 원 데이터를 모은다.
- **AI-Ready Data 구성**: 원 데이터를 학습에 바로 투입할 수 있는 형태로 가공한다.
- **모델 학습 인프라**: GPU 등 학습에 필요한 컴퓨팅 자원을 함께 제공한다.

아직 정하지 못한 부분은, AI 모델 학습 도구까지 시스템에 포함할지 아니면
수요자가 직접 가져오게 할지인데요, 시스템의 경계를 어디까지 둘지와 맞닿은
문제라 따로 적어 둡니다.

## 이해관계자와 비즈니스 모델

Industrial Data Lake에 참여하는 주체는 크게 네 부류로 나눠 볼 수 있습니다. 각자 무언가를
내놓고 그 대가로 사용료를 받는 구조입니다.

| 주체          | 내놓는 것                                                                    | 과금                                            |
| ------------- | ---------------------------------------------------------------------------- | ----------------------------------------------- |
| 데이터 제공자 | 원 데이터                                                                    | 데이터 사용료 수취                              |
| 데이터 가공자 | 원 데이터를 유효한 AI-Ready Data로 바꾸는 소프트웨어/변환기 (품질 관리 포함) | 소프트웨어 사용료 수취                          |
| 모델 개발자   | 데이터로 학습한 파운데이션 모델(base model)                                  | 데이터 사용료 지불, 모델 사용료 수취            |
| 데이터 수요자 | (AI 기반으로 자사 제조 환경을 개선하려는 곳)                                 | 데이터 및 가공 비용 지불, 튜닝된 특화 모델 확보 |

여기에 더해 데이터 보안 기술을 가진 주체가 시스템 전반을 뒷받침합니다. 가치 사슬을
한 줄로 그려 보면 데이터 제공자 → 데이터 가공자 → 모델 개발자 → AI 수요자로 이어지고,
각 화살표를 따라 "데이터/소프트웨어/모델"이 넘어가며 반대 방향으로는 "사용료"가
흐르는 셈이에요. 수요자는 사용료를 내고 자신의 private data를 넣은 뒤, 피드백을 받아
특화 모델을 얻게 됩니다.

중요한 점은 이 사슬 어디에서도 데이터나 모델의 **원본이 그대로 공개되지 않는다**는
것입니다. 거래되는 것은 사용 권한과 결과물이지, 자산 자체는 아니거든요.

## 처리 흐름

데이터가 특화 모델이 되기까지의 과정은 컨테이너 단위로 나눠 보았습니다. 각 단계가
독립된 컨테이너이므로, 공급자는 자기 자산(데이터든 소프트웨어든)을 통째로
넘기지 않고도 이 사슬에 참여할 수 있습니다.

<div style="max-width: 560px; margin: 1.5rem auto;">
<svg viewBox="0 0 620 972" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block" font-family="Pretendard, 'Noto Sans KR', system-ui, -apple-system, sans-serif" role="img" aria-label="Industrial Data Lake 처리 흐름: 데이터 공급자 → 원 데이터 → 가공 데이터 → 섹터 파운데이션 모델 → 기업 특화 모델 → AI 수요자, 소프트웨어 공급자의 컨테이너 제공, AI 수요자의 기업 데이터 제공">
  <rect x="3" y="3" width="614" height="966" rx="16" fill="#FCFCFF" stroke="#E7E7F2" stroke-width="1.5"/>
  <defs>
    <marker id="dlah" markerWidth="12" markerHeight="12" refX="9" refY="4" orient="auto" markerUnits="userSpaceOnUse">
      <path d="M0,0 L9,4 L0,8 Z" fill="#5A6B86"/>
    </marker>
  </defs>
  <g stroke="#5A6B86" stroke-width="2.2" fill="none" marker-end="url(#dlah)">
    <line x1="175" y1="108" x2="175" y2="190"/>
    <line x1="175" y1="276" x2="175" y2="358"/>
    <line x1="175" y1="444" x2="175" y2="526"/>
    <line x1="175" y1="612" x2="175" y2="694"/>
    <line x1="175" y1="780" x2="175" y2="862"/>
    <path d="M345,402 L269,402" stroke-dasharray="2 6"/>
    <path d="M265,894 L322,894 L322,772 L269,772" stroke-dasharray="2 6"/>
  </g>
  <g font-size="14" fill="#475569" text-anchor="middle">
    <rect x="150" y="139" width="50" height="22" rx="5" fill="#FCFCFF" opacity="0.92"/><text x="175" y="155">제공</text>
    <rect x="62" y="307" width="226" height="22" rx="5" fill="#FCFCFF" opacity="0.92"/><text x="175" y="323">데이터 가공 SW (컨테이너)</text>
    <rect x="95" y="475" width="160" height="22" rx="5" fill="#FCFCFF" opacity="0.92"/><text x="175" y="491">학습 모듈 (컨테이너)</text>
    <rect x="88" y="643" width="174" height="22" rx="5" fill="#FCFCFF" opacity="0.92"/><text x="175" y="659">최적화 모듈 (컨테이너)</text>
    <rect x="139" y="811" width="72" height="22" rx="5" fill="#FCFCFF" opacity="0.92"/><text x="175" y="827">특화 모델</text>
    <rect x="258" y="377" width="98" height="22" rx="5" fill="#FCFCFF" opacity="0.92"/><text x="307" y="393">컨테이너 제공</text>
    <rect x="318" y="817" width="80" height="22" rx="5" fill="#FCFCFF" opacity="0.92"/><text x="358" y="833">기업 데이터</text>
  </g>
  <g>
    <rect x="85" y="24" width="180" height="84" rx="14" fill="#F1ECFB" stroke="#7A5AD6" stroke-width="2"/>
    <text x="175" y="58" text-anchor="middle" font-size="15" font-weight="600" fill="#1f2a44">데이터 공급자</text>
    <text x="175" y="81" text-anchor="middle" font-size="13" fill="#5b6b86" font-style="italic">‘데이터를 팔아줄게’</text>
    <rect x="85" y="192" width="180" height="84" rx="14" fill="#EAF0FB" stroke="#4F76D6" stroke-width="2"/>
    <text x="175" y="240" text-anchor="middle" font-size="16" font-weight="600" fill="#1f2a44">원 데이터</text>
    <rect x="85" y="360" width="180" height="84" rx="14" fill="#EAF0FB" stroke="#4F76D6" stroke-width="2"/>
    <text x="175" y="408" text-anchor="middle" font-size="16" font-weight="600" fill="#1f2a44">가공 데이터</text>
    <rect x="85" y="528" width="180" height="84" rx="14" fill="#EAF0FB" stroke="#4F76D6" stroke-width="2"/>
    <text x="175" y="576" text-anchor="middle" font-size="15" font-weight="600" fill="#1f2a44">섹터 파운데이션 모델</text>
    <rect x="85" y="696" width="180" height="84" rx="14" fill="#EAF0FB" stroke="#4F76D6" stroke-width="2"/>
    <text x="175" y="744" text-anchor="middle" font-size="16" font-weight="600" fill="#1f2a44">기업 특화 모델</text>
    <rect x="85" y="864" width="180" height="84" rx="14" fill="#F1ECFB" stroke="#7A5AD6" stroke-width="2"/>
    <text x="175" y="898" text-anchor="middle" font-size="15" font-weight="600" fill="#1f2a44">AI 수요자</text>
    <text x="175" y="921" text-anchor="middle" font-size="13" fill="#5b6b86" font-style="italic">‘나는 AI 모델이 필요해’</text>
    <rect x="345" y="360" width="230" height="84" rx="14" fill="#F1ECFB" stroke="#7A5AD6" stroke-width="2"/>
    <text x="460" y="394" text-anchor="middle" font-size="15" font-weight="600" fill="#1f2a44">소프트웨어 공급자</text>
    <text x="460" y="417" text-anchor="middle" font-size="13" fill="#5b6b86" font-style="italic">‘내 소프트웨어를 팔아줄게’</text>
  </g>
</svg>
</div>

이 흐름 위에서 세 참여자가 각자의 동기를 가지고 만납니다. 데이터 공급자는
"데이터를 팔아줄게", 소프트웨어 공급자는 "내 소프트웨어를 팔아줄게", AI
수요자는 "나는 AI 모델이 필요해"라는 입장이구요. Industrial Data Lake는 이 세 동기가 서로의 자산을
노출하지 않고도 거래로 이어지는 자리를 만들어 주는 셈입니다.

개인적으로는 **섹터 파운데이션 모델**이라는 개념이 흥미롭다고 생각합니다. 무엇이든 할 수
있는 만능 모델을 만들겠다는 것이 아니라, 그 위에 각자 무언가를 쌓아 올릴 수 있는
**기반(파운데이션)까지만** 공공이 제공하겠다는 발상이거든요. 공공이 어디까지
관여하고 어디서부터 민간에 맡길지도 바로 이 지점에서 나뉜다고 봅니다.

## 공공 지원 영역과 민간 영역

위 시사점을 시스템 설계에 반영하면, 자산을 다음과 같이 두 층으로 나눠 볼 수 있을 것 같아요.

| 구분                        | 대상                                          | 위치                                                    |
| --------------------------- | --------------------------------------------- | ------------------------------------------------------- |
| **공공 지원 영역**          | 데이터, 가공 소프트웨어, 섹터 파운데이션 모델 | 시스템 *안*에 존재하되 비공개, 과금 대상                |
| **민간 영역** (공공 지원 X) | 민간 데이터, 학습 모듈, 민간 특화 모델        | 시스템 *밖*에 존재, 시스템 안에서도 비공개, 보안성 보장 |

여기서 짚어 둘 점은 "시스템 안에 있다"와 "공개된다"가 서로 다른 이야기라는 것입니다. 공공이
지원한 자산도 시스템 안에서 보호된 채 과금만 이뤄지고, 민간 자산은 아예
시스템 밖에 두면서도 보안을 보장받는 구조입니다.

## 시스템에 필요한 데이터 보안 기능

그럼 자산을 공개하지 않는다는 원칙은 어떻게 지킬 수 있을까요? 이를 기술로 뒷받침해 보는 것도 의미가 있을 듯 합니다. 시스템
내부 기능으로는 다음 두 가지를 생각해 볼 수 있습니다.

**데이터/모델 안전 명세**: 데이터 쪽으로는 불확실성 정량화(uncertainty
quantification)나 jailbreak 대응 안전성 같은 메트릭을, 모델 쪽으로는 모델 증류
방지를 위한 워터마킹과 비가역 학습 기술 등을 명세 항목으로 둡니다. 자산이 사슬을
따라 흐르는 동안 "얼마나 안전한가"에 대한 정량 지표가 함께 따라가게 하는 셈이에요.

**AI 명세서 기반 학습 파이프라인 관리(AI Manifest / AI-BOM)**: 각 단계에 어떤
기술이 적용됐고 데이터/모델 품질이 어땠는지를 명세로 남겨, **이 모델이 어떤
데이터로부터 어떻게 가공되어 나왔는지**를 추적할 수 있게 합니다. 이때 불완전성,
프롬프트 안전성 같은 다양한 메트릭을 함께 반영하고, 모델 버전이 바뀌면 그 변경
이력까지 추적하고 관리하는 방식입니다. 소프트웨어 공급망에서 쓰는 S-BOM 개념을 어디까지 가져올지는
좀 더 검토해 볼 문제로 남겨 두려고 합니다.

## 정리

Industrial Data Lake 구상을 한 문장으로 줄이면, **데이터와 모델을 자산으로 보호하면서
산업 AI 개발을 가능하게 하는 거래 및 보안 시스템**이라고 할 수 있을 것 같아요. 공개를 전제로
하는 일반 AI의 방식을 산업 현장에 그대로 가져오기는 어렵거든요. 그래서 비즈니스 모델에서는
원본 대신 사용 권한과 결과물을 거래하고, 공공의 역할은 섹터 파운데이션 모델까지로
한정하며, 자산의 출처와 안전성은 AI-BOM으로 끝까지 추적하는 방향을 생각해 볼 수 있습니다.

아직 남은 질문도 여럿입니다. 학습 도구를 시스템에 포함할지, S-BOM을 어디까지
반영할지, 산업과 로봇, 그리고 AI 적용 범위를 어떻게 정할지 등이죠. 그래도 "자산을
지키면서 AI를 만든다"는 큰 방향은 분명하니, 그 위에 나머지를 하나씩 쌓아 갈 수 있지 않을까 싶습니다.
