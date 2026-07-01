---
layout: post
lang: ko
title: "산업 AI를 위한 Industrial Data Lake 구상"
date: 2026-06-29 14:00:00+0900
permalink: /blog/ko/industrial-ai-data-factory/
description: 데이터와 모델을 기업의 자산으로 보호하면서도 산업 AI 모델을 개발할 수 있게 하는 Industrial Data Lake 구상. 섹터 파운데이션 모델, 이해관계자 구조와 비즈니스 모델, 독일·유럽 IPCEI-AI의 시사점, 그리고 시스템 안에 넣어야 할 데이터 보안 기능을 정리했다.
tags: industrial-AI industrial-data-lake foundation-model agentic-AI multi-agent data-security AI-BOM trustworthy-AI korean
thumbnail: assets/img/industrial-ai-data-factory-thumb.png
og_image: /assets/img/industrial-ai-data-factory-thumb.png
giscus_comments: false
related_posts: false
published: true
toc:
  sidebar: left
---

<p class="text-center"><small><em>English version: <a href="{{ '/blog/2026/industrial-ai-data-factory/' | relative_url }}">An Industrial Data Lake for Industrial AI</a></em></small></p>

## 문제 제기

산업 파운데이션 모델에 대한 요구는 꾸준히 커지고 있다. 현장마다 "우리 공정에
맞는 좋은 기반 모델이 있었으면" 하는 바람은 분명한데, 막상 그걸 만들려고 하면
산업계는 곧바로 **상충된 요구** 앞에 서게 된다.

한쪽에는 데이터 자산의 유출 우려가 있다. 일반 AI에서 데이터는 많을수록 좋은
연료지만, 산업 현장에서 데이터는 곧 기업의 경쟁력 그 자체다. "300℃ 체임버 안에서
2시간 보관한 뒤 90% 출력, 12mm/s, 에어 블로잉으로 레이저 절단해 형상을 가공한다"
— 이 한 줄 같은 공정 파라미터가 그 회사가 수년에 걸쳐 쌓아 온 지식 자산이다.
다른 한쪽에는 [예전 글]({{ '/blog/ko/foundation-ai-for-industry/' | relative_url }})에서도 한 번 짚었던 **floor lifting** 효과가 있다. 좋은
파운데이션 모델이 풀리면 업계 전체의 성능 하한이 함께 올라가고, 그만큼 개별
기업이 데이터로 벌어 둔 격차는 깎인다. 결론은 모순처럼 들린다 — 좋은 파운데이션
모델은 필요하지만, 정작 그걸 만들 데이터와 모델을 공유하기는 어렵다.

여기에 또 하나의 압력이 겹친다. AI는 성능이 고도화되는 만큼 구성의 복잡성도
비례해서 커지고 있고, 이는 산업계가 AI를 직접 개발하고 운용하기를 점점 더 어렵게
만든다. 그렇다면 데이터와 AI 모델을 **과연 어떻게 운영해야 하는가** — 이 글은
그 질문에서 출발한다.

## 에이전틱 AI라는 해법

에이전틱 AI는 이 상충에 하나의 출구를 제시한다. 핵심 발상은 "모든 걸 다 해내는
모델"을 포기하는 데 있다. 대신 **컨텍스트를 이해하는 생성형 AI**를 둔다. 이
에이전트는 산업 데이터의 맥락을 알고 있고, 주어진 상황에서 **어떤 툴을 호출해야
할지**를 준비한다. 만능 두뇌가 아니라, 맥락을 읽고 적절한 도구로 연결해 주는
조율자에 가깝다.

{% include figure.liquid loading="eager" path="assets/img/industrial-ai-data-factory-fig.png" class="img-fluid rounded z-depth-1" alt="산업 데이터의 컨텍스트를 이해하고 적절한 도구를 호출하는 에이전트, 그리고 파인튜닝과 도구 연결이라는 두 가지 활용 경로" %}

이때 파운데이션 모델은 두 가지 방식으로 활용될 수 있다.

- **파인튜닝으로 내재화** — 특정 산업의 컨텍스트를 파운데이션 모델에 직접
  파인튜닝해, 지식을 모델 안에 녹여 넣는 방법.
- **도구로 연결** — 특정 산업 지식에 기반한 해석 도구를 툴로 붙여, 그때그때
  지식을 외부에서 끌어다 쓰는 방법.

수요자는 상황에 따라 둘 중에서 고르면 된다. 다만 트레이드오프가 분명하다. 지식을
모델에 내재화하는 쪽은 학습 비용이 크고 이후 모델 유지·보수에도 비용이 든다.
반대로 기존 파운데이션 모델에 도구를 붙이는 쪽은 도구를 통한 유연한 대응이
가능하지만, 그만큼 다양한 관리 기법이 요구된다.

| 활용 방식 | 강점 | 감안할 비용 |
| --- | --- | --- |
| 파운데이션 모델 파인튜닝 (내재화) | 지식이 모델에 녹아 일관된 응답 | 높은 학습 비용 + 지속적 유지·보수 비용 |
| 도구 연결 (외부 지식) | 유연한 대응, 지식 갱신이 쉬움 | 도구·호출에 대한 다양한 관리 기법 필요 |

그래서 정답은 둘 중 하나의 고정이 아니라, **단일 에이전트가 아닌 멀티-에이전트
구성**일 가능성이 높다. 여러 에이전트가 각자 맥락과 도구를 나눠 맡으면, 상황에
맞는 기법을 그때그때 조합해 제시할 수 있다.

이제 이 에이전트와 파운데이션 모델을, 데이터·모델을 공개하지 않으면서 거래
가능하게 만드는 시스템 위에 올려 보자. 아래는 그 시스템을 **Industrial Data Lake**라는
이름으로 정리한 구상이다.

## 무엇을 만들려는가

목적은 단순하게 잡으면 이렇다 — 산업에 로봇 및 AI를 적용하기 위한 데이터를
확보하고, 그것을 학습에 바로 쓸 수 있는 형태까지 갖춰 주는 것. 시스템이 제공하는
범위는 크게 세 가지다.

- **데이터 확보** — 산업에서 나오는 원 데이터를 모은다.
- **AI-Ready Data 구성** — 원 데이터를 학습에 바로 투입할 수 있는 형태로 가공한다.
- **모델 학습 인프라** — GPU 등 학습에 필요한 컴퓨팅을 함께 제공한다.

여기서 한 가지 열어 둔 질문은, AI 모델 학습 도구까지 시스템이 품을지 아니면
수요자가 자체적으로 들고 들어올지다. 시스템의 경계를 어디까지로 그을지를 가르는
지점이라 따로 적어 둔다.

## 이해관계자와 비즈니스 모델

Industrial Data Lake를 움직이는 주체는 네 부류로 나뉘고, 각자 무언가를 내놓고 그 대가로
사용료를 받는 구조다.

| 주체 | 내놓는 것 | 과금 |
| --- | --- | --- |
| 데이터 제공자 | 원 데이터 | 데이터 사용료 수취 |
| 데이터 가공자 | 원 데이터를 유효한 AI-Ready Data로 바꾸는 소프트웨어·변환기 (품질 관리 포함) | 소프트웨어 사용료 수취 |
| 모델 개발자 | 데이터로 학습한 파운데이션 모델(base model) | 데이터 사용료 지불, 모델 사용료 수취 |
| 데이터 수요자 | (AI 기반으로 자사 제조 환경을 개선하려는 곳) | 데이터·가공 비용 지불, 튜닝된 특화 모델 확보 |

여기에 데이터 보안 기술을 보유한 주체가 시스템 전반을 떠받친다. 가치 사슬을
한 줄로 보면 데이터 제공자 → 데이터 가공자 → 모델 개발자 → AI 수요자로 흐르고,
각 화살표마다 "데이터/소프트웨어/모델"이 넘어가고 반대 방향으로 "사용료"가
흐른다. 수요자 쪽에서는 자신의 private data를 (사용료를 내고) 넣어 피드백을 받아
특화 모델을 얻는다.

핵심은, 이 사슬 어디에서도 데이터나 모델 **원본이 그대로 공개되지 않는다**는
점이다. 거래되는 것은 사용 권한과 결과물이지, 자산 자체가 아니다.

## 처리 플로우

데이터가 특화 모델이 되기까지의 흐름은 컨테이너 단위로 끊어 둔다. 각 단계가
독립된 컨테이너이기 때문에, 공급자는 자기 자산(데이터든 소프트웨어든)을 통째로
내주지 않고도 사슬에 참여할 수 있다.

<div style="max-width: 560px; margin: 1.5rem auto;">
<svg viewBox="0 0 620 972" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block" font-family="Pretendard, 'Noto Sans KR', system-ui, -apple-system, sans-serif" role="img" aria-label="Industrial Data Lake 처리 플로우: 데이터 공급자 → 원 데이터 → 가공 데이터 → 섹터 파운데이션 모델 → 기업 특화 모델 → AI 수요자. 소프트웨어 공급자가 컨테이너를 제공하고, AI 수요자가 기업 데이터를 제공한다.">
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
    <rect x="62" y="307" width="226" height="22" rx="5" fill="#FCFCFF" opacity="0.92"/><text x="175" y="323">데이터 가공 SW · 컨테이너</text>
    <rect x="95" y="475" width="160" height="22" rx="5" fill="#FCFCFF" opacity="0.92"/><text x="175" y="491">학습 모듈 · 컨테이너</text>
    <rect x="88" y="643" width="174" height="22" rx="5" fill="#FCFCFF" opacity="0.92"/><text x="175" y="659">최적화 모듈 · 컨테이너</text>
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

이 흐름 위에 세 명의 플레이어가 각자의 동기를 가지고 만난다. 데이터 공급자는
"데이터를 팔아줄게", 소프트웨어 공급자는 "내 소프트웨어를 팔아줄게", AI
수요자는 "나는 AI 모델이 필요해". Industrial Data Lake는 이 세 동기가 서로의 자산을
노출하지 않고도 거래로 연결되는 자리를 만들어 주는 셈이다.

**섹터 파운데이션 모델**이라는 개념은 흥미롭다. 모든 걸 다 할 수
있는 만능 모델을 만들겠다는 게 아니라, 그 위에 각자 무언가를 쌓아 올릴 수 있는
**기반(파운데이션)까지만** 공공이 제공하겠다는 발상이다. 공공이 어디까지
관여하고 어디서부터 민간에 넘길지를 가르는 선이 바로 여기에 그어진다.

## 공공이 지원할 영역과 민간의 영역

위 시사점을 시스템 설계로 옮기면, 자산을 두 층으로 나누는 그림이 된다.

| 구분 | 무엇 | 어디에 있나 |
| --- | --- | --- |
| **공공 지원 영역** | 데이터, 가공 소프트웨어, 섹터 파운데이션 모델 | 시스템 *안*에 존재하되 공개되지 않음. 과금의 대상이 된다. |
| **민간 영역** (공공 지원 X) | 민간 데이터, 학습 모듈, 민간 특화 모델 | 시스템 *밖*에 존재. 시스템 안에서도 공개되지 않으며, 보안성을 보장받는다. |

요점은 "시스템 안에 있다"와 "공개된다"가 서로 다른 말이라는 것이다. 공공이
지원한 자산조차 시스템 안에서 보호된 채 과금만 이뤄지고, 민간 자산은 아예
시스템 밖에 두면서도 보안을 보장받는다.

## 시스템 안에 넣어야 할 데이터 보안 기능

자산을 공개하지 않는다는 원칙이 성립하려면, 그걸 기술로 받쳐 줘야 한다. 시스템
내부 기능으로 두 갈래를 생각하고 있다.

**데이터·모델 안전 명세.** 데이터 쪽으로는 불확실성 정량화(uncertainty
quantification)나 jailbreak 대응 안전성 같은 메트릭을, 모델 쪽으로는 모델 증류
방지를 위한 워터마킹과 비가역 학습 기술 등을 명세 항목으로 둔다. 자산이 사슬을
따라 흐르는 동안 "이것이 얼마나 안전한가"를 정량적으로 따라붙게 하는 셈이다.

**AI 명세서 기반 학습 파이프라인 관리(AI Manifest / AI-BOM).** 각 단계에서 어떤
기술이 적용됐고 데이터/모델 품질이 어땠는지를 명세로 남겨, **이 모델이 어느
데이터로부터 어떻게 가공되어 나왔는지**를 추적할 수 있게 한다. 이때 불완전성,
프롬프트 안전성 같은 다양한 메트릭을 함께 반영하고, 모델 버전이 바뀌면 그 변경
이력까지 추적·관리한다. 소프트웨어 공급망에서 쓰는 S-BOM 개념을 어디까지 끌어올지는
더 따져 볼 문제로 남겨 둔다.

## 정리

Industrial Data Lake 구상을 한 문장으로 줄이면, **데이터와 모델을 자산으로 보호하는
것을 전제로 산업 AI 개발을 가능하게 하는 거래·보안 시스템**이다. 공개를 전제로
한 일반 AI의 문법을 산업 현장에 그대로 가져오면 깨지기 때문에, 비즈니스 모델은
거래되는 것을 원본이 아니라 사용 권한과 결과물로 바꾸고, 공공의 역할은 섹터
파운데이션 모델까지로 긋고, 자산의 출처와 안전성을 AI-BOM으로 끝까지 추적한다.

아직 물음표가 여럿 남아 있다 — 학습 도구를 시스템이 품을지, S-BOM을 어디까지
포함할지, 산업과 로봇, 그리고 AI 적용의 범위를 어떻게 확정할지. 그래도 "자산을
지키면서 AI를 만든다"는 한 축은 분명해서, 그 위에 나머지를 쌓아 갈 수 있다. 
