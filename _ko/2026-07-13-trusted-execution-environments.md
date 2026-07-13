---
layout: post
lang: ko
title: "신뢰 실행 환경(TEE) 안에서 AI 돌리기"
date: 2026-07-13 17:20:00+0900
permalink: /blog/ko/trusted-execution-environments/
description: 교과서보다는 현장 노트에 가깝게 — 왜 AI 모델을 신뢰 실행 환경(TEE) 안에서 돌리려 하는가(가중치와 데이터를 호스트의 손에서 지키기 위해), 지금의 TEE가 왜 AI 앞에서 삐걱대는가(너무 작은 엔클레이브 메모리, CPU 중심의 신뢰, 비싼 CPU↔GPU 전송), 그리고 남은 문제들 — 기밀 GPU 추론이 왜 Hopper급 데이터센터 GPU를 요구하고, Jetson Thor의 Blackwell은 왜 안 되는지까지.
tags: TEE confidential-computing gpu nvidia-hopper attestation model-protection edge-AI trustworthy-AI korean
giscus_comments: true
related_posts: false
published: false
toc:
  sidebar: left
---

<p class="text-center"><small><em>English version: <a href="{{ '/blog/2026/trusted-execution-environments/' | relative_url }}">Running AI Inside a Trusted Execution Environment</a></em></small></p>

우리는 데이터를 **저장 중(at rest, 암호화된 디스크)**과 **전송 중(in transit,
TLS)**으로는 꽤 잘 지킨다. 늘 슬쩍 넘어가는 건 세 번째 상태 — **사용 중(in
use)**, 즉 데이터가 메모리로 복호화되어 프로세서가 연산하는 그 순간이다. 이때
평문은 그 메모리를 읽을 권한을 가진 무엇에게든 노출된다. 운영체제, 하이퍼바이저,
옆 테넌트, 그 기계를 소유한 클라우드 운영자에게. **신뢰 실행 환경(Trusted
Execution Environment, TEE)**은 이 세 번째 상태에 대한 하드웨어의 답이다. 그리고
AI에서는 이게 더 이상 추상적인 얘기가 아니다. AI에서 가장 값진 것 — 모델 가중치와
입력 데이터 — 이 바로, GPU가 연산하는 동안 메모리에 놓여 있는 그 평문이기
때문이다. 이 글은 TEE 안에서 AI를 돌리는 이야기다. 왜 그러고 싶은지, 그리고 왜
하드웨어가 아직 그걸 어렵게 만드는지.

## TEE란 무엇인가, 한 번에

TEE는 프로세서가 떼어 내 강제하는 격리 영역이다 — 기술에 따라 _엔클레이브_,
_시큐어 월드_, _컨피덴셜 VM_ — 그 안의 코드와 데이터에 두 가지를 보장한다.
**기밀성**(환경 밖의 무엇도, 더 높은 권한의 소프트웨어라도 그 메모리를 못 읽는다)과
**무결성**(밖에서 몰래 변조할 수 없고, 변조는 탐지된다). 요즘 칩에서는 그 메모리를
하드웨어가 **암호화**하므로 DRAM 버스를 들여다봐도 암호문뿐이다. 대신 위협
모델이 바뀐다. 소프트웨어 스택 전체를 신뢰하는 대신, 작고 명확한 한 줄을 지켜 주는
**CPU 벤더**를 신뢰한다.

이걸 쓸모 있게 만드는 두 조각이 더 있다. **증명(attestation)**은 환경이 원격
상대에게 "나는 이 벤더의 진짜 TEE이고, 내 안의 코드 해시는 정확히 *이 값*이다"를
입증하게 해 준다 — 그 증거가 통과한 뒤에야 비밀이 건네진다. **봉인(sealing)**은
암호 키를 하드웨어와 코드의 측정값에 묶어, 같은 기계의 같은 코드만이 데이터를 다시
복호화할 수 있게 한다. 만나게 될 기술들: **ARM TrustZone**(시큐어/노멀 월드, 폰과
엣지 어디에나), **Intel SGX**(작은 프로세스 엔클레이브, 이제 VM 단위 **TDX**로 방향
전환), **AMD SEV-SNP**(암호화·증명되는 VM).

이들은 두 갈래로 나뉜다 — 프로세스 단위의 **TEE**와 하이퍼바이저 단위의 **TEE 하이퍼바이저**(컨피덴셜 VM):

|                | TEE (엔클레이브)                | TEE 하이퍼바이저 (컨피덴셜 VM)                                |
| -------------- | ------------------------------- | ------------------------------------------------------------- |
| 보호 단위      | 앱의 일부 — _엔클레이브_        | 게스트 **VM** 전체                                            |
| 대표 기술      | Intel SGX, ARM TrustZone        | Intel TDX, AMD SEV-SNP, ARM CCA                               |
| 신뢰 기반(TCB) | 작음 — 엔클레이브 코드만        | 큼 — 게스트 OS + 앱                                           |
| 호스트         | OS 신뢰 안 함, 앱이 스스로 방어 | 하이퍼바이저 신뢰 안 함, 하드웨어 + 시큐어 모니터가 격리 강제 |
| 앱 수정        | 대개 재작성·분리 필요           | 그대로 이식(lift-and-shift)                                   |
| 보호 메모리    | 작음 (고전 ~100 MB)             | VM 전체 RAM (GB급)                                            |
| AI 적합성      | 모델이 안 들어감                | 기밀 AI의 실용적 기반                                         |

어느 갈래를 쓰느냐가 이후 많은 걸 좌우한다 — 특히 아래의 메모리 문제. 여기까지만
머리에 담아 두자. 이 글의 나머지는 그 안에 모델을 넣으려 할 때 벌어지는 일이다.

## 왜 AI를 그 안에 넣나

핵심은 단순하다. 호스트가 볼 수 없는 곳에서 모델을 돌린다. 구체적으로는, 아주
현실적인 위협 묶음을 막는다.

- **모델·가중치 탈취.** 학습된 가중치가 곧 자산이다. 남의 기계 — 클라우드 호스트,
  내가 통제하지 못하는 온프렘 장비, root 권한을 쥔 내부자 — 에서는 메모리에서
  바로 복사해 갈 수 있다. TEE는 경계 안을 빼면 어디서나 가중치를 암호문으로
  유지한다.
- **학습 데이터·멤버십 추출.** 공격자는 학습 데이터를 복원하거나, 특정 레코드가
  학습셋에 있었는지 추론한다. 모델과 그 입·출력을 기밀로 두면 표면이 줄어든다 —
  다만 솔직히 말하면, TEE가 지키는 건 *실행 기반*이지 *질의 표면*이 아니다. 정당한
  질의자는 여전히 모델을 캐볼 수 있으니, 이건 모델 차원의 방어(비가역 학습,
  워터마킹, 출력 필터링)를 대체하는 게 아니라 함께 쓰는 것이다.
- **입력·프롬프트 프라이버시.** 의료·금융·산업 입력이 추론 서버 운영자에게도
  읽히지 않는다.
- **증명에 의한 무결성.** _정확히_ 그 모델과 코드가 돌고 있음을 입증할 수 있다 —
  몰래 바꿔치기하거나 백도어를 심은 가중치가 아니라는 걸.

이 모두를 하나로 묶는 패턴이 **기밀 추론(confidential inference)**이다(그리고 점점
기밀 학습도). 모델 주인과 데이터 주인이 증명으로 상대의 TEE를 검증한 **뒤에야**
각자의 몫 — 한쪽은 가중치, 다른 쪽은 데이터 — 을, 어느 호스트도 읽지 못하는 환경
안으로 내놓는다. 이미 현장에 있다. 클라우드 사업자는 기밀 GPU VM을 제공하고,
"모델 서비스" 업체는 끝내 노출하지 않는 가중치를 서빙하며, 병원들은 컨피덴셜 VM
안에서 기록을 모아 공동 모델을 만들고, 대형 소비자 AI 백엔드는 이제 증명된 기밀
컴퓨팅에 기대어 운영자조차 당신의 요청을 읽지 못하게 한다.

## 지금 하드웨어가 삐걱대는 지점

문제는 여기다. 앞의 20년치 TEE 설계는 CPU와 작은 비밀을 위해 만들어졌는데, AI는
둘 다 아니다.

**엔클레이브가 너무 작다.** 고전적 CPU 엔클레이브의 보호 메모리는 대략 ~100 MB
수준이었다. 요즘 모델은 기가바이트다. 애초에 들어가지 않고, 작은 엔클레이브
안팎으로 가중치를 페이징하는 건 견디기 힘들 만큼 느리다. VM 단위 TEE(TDX,
SEV-SNP)가 VM 전체 메모리를 보호하며 _그_ 특정 천장은 걷어 냈지만, 여전히 CPU
쪽이다.

**연산은 GPU에 있는데, TEE는 없다.** AI는 GPU에서 돈다. 그런데 최근까지 GPU는
신뢰 경계 *바깥*에 통째로 놓여 있었다. 그래서 나쁜 선택이 남았다. 모델을 CPU TEE에
두고 GPU 가속을 포기하거나(실전 모델엔 못 쓸 만큼 느리다), 데이터를 신뢰되지 않는
GPU로 보내 TEE를 만든 이유였던 기밀성을 잃거나.

**CPU와 GPU를 잇는 데엔 비용이 든다.** NVIDIA의 **컨피덴셜 컴퓨팅(Confidential
Computing)**은 **Hopper H100**에서 도입되며 GPU를 경계 안으로 끌어들였다. GPU가
기밀 모드로 암호화된 메모리에서 돌고, CPU의 컨피덴셜 VM과 GPU 사이 PCIe를 건너는
데이터도 암호화되며, GPU 자체를 증명할 수 있다. 증명된 H100과 컨피덴셜 VM(TDX 또는
SEV-SNP)을 짝지으면 CPU와 GPU를 아우르는 엔드투엔드 TEE가 된다. 그런데 바로 그
PCIe 횡단이 관건이다. 데이터는 CPU TEE 안의 **바운스 버퍼**를 거쳐 암호화된 뒤
디바이스로 복사되므로, 호스트와 GPU 사이를 많이 오갈수록 비용이 커진다. 크고
연산 위주인 모델에선 오버헤드가 크지 않지만, 작은 모델이나 왕복이 잦은
파이프라인에선 아프게 다가온다.

<div style="max-width: 700px; margin: 1.75rem auto;">
<svg viewBox="0 0 720 440" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block" font-family="Pretendard, 'Noto Sans KR', system-ui, -apple-system, sans-serif" role="img" aria-label="기밀 AI 경로: 컨피덴셜 VM(CPU TEE — Intel TDX 또는 AMD SEV-SNP)과 증명된 GPU(Hopper/Blackwell)가 하나의 증명된 신뢰 경계 안에 있고, 암호화된 PCIe 전송(바운스 버퍼)으로 연결된다. 신뢰되지 않는 호스트(하이퍼바이저·OS·운영자)는 경계 밖에서 암호문만 본다.">
  <rect x="3" y="3" width="714" height="434" rx="16" fill="#FCFCFF" stroke="#E7E7F2" stroke-width="1.5"/>
  <defs>
    <marker id="teeARk" markerWidth="11" markerHeight="11" refX="7.5" refY="4" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,0 L8,4 L0,8 Z" fill="#2f54d4"/></marker>
  </defs>
  <text x="28" y="38" font-size="12" letter-spacing="1" fill="#2f54d4">컨피덴셜 AI  ·  CPU-TEE ↔ GPU</text>
  <rect x="40" y="62" width="640" height="196" rx="16" fill="none" stroke="#2f54d4" stroke-width="2" stroke-dasharray="7 6"/>
  <rect x="54" y="52" width="150" height="20" rx="5" fill="#FCFCFF"/>
  <text x="62" y="66" font-size="11.5" fill="#2f54d4">신뢰 경계 (증명됨)</text>
  <rect x="72" y="98" width="232" height="130" rx="12" fill="#EAF0FB" stroke="#4F76D6" stroke-width="2"/>
  <text x="188" y="126" text-anchor="middle" font-size="14.5" font-weight="600" fill="#1f2a44">컨피덴셜 VM · CPU TEE</text>
  <text x="188" y="146" text-anchor="middle" font-size="11.5" fill="#5b6b86">Intel TDX · AMD SEV-SNP</text>
  <line x1="92" y1="160" x2="284" y2="160" stroke="#D4DEEF" stroke-width="1"/>
  <text x="188" y="187" text-anchor="middle" font-size="14" fill="#1f2a44">모델 + 데이터</text>
  <text x="188" y="206" text-anchor="middle" font-size="11.5" font-style="italic" fill="#5b6b86">평문, 사용 중</text>
  <rect x="416" y="98" width="232" height="130" rx="12" fill="#EAF0FB" stroke="#4F76D6" stroke-width="2"/>
  <circle cx="636" cy="110" r="13" fill="#12a594"/>
  <path d="M631,110 l3.2,3.2 L641,104" stroke="#fff" stroke-width="2.3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="524" y="126" text-anchor="middle" font-size="14.5" font-weight="600" fill="#1f2a44">GPU · 증명됨</text>
  <text x="524" y="146" text-anchor="middle" font-size="11.5" fill="#5b6b86">Hopper H100 · Blackwell</text>
  <line x1="436" y1="160" x2="628" y2="160" stroke="#D4DEEF" stroke-width="1"/>
  <text x="532" y="187" text-anchor="middle" font-size="14" fill="#1f2a44">암호화된 VRAM</text>
  <text x="532" y="206" text-anchor="middle" font-size="11.5" font-style="italic" fill="#5b6b86">기밀 모드</text>
  <text x="360" y="120" text-anchor="middle" font-size="10.5" fill="#475569">암호화 전송</text>
  <rect x="351" y="150" width="18" height="14" rx="2.5" fill="#2f54d4"/>
  <path d="M354,150 v-3 a6,6 0 0 1 12,0 v3" fill="none" stroke="#2f54d4" stroke-width="2"/>
  <line x1="312" y1="178" x2="404" y2="178" stroke="#2f54d4" stroke-width="2" marker-end="url(#teeARk)"/>
  <line x1="408" y1="192" x2="316" y2="192" stroke="#2f54d4" stroke-width="2" marker-end="url(#teeARk)"/>
  <text x="360" y="216" text-anchor="middle" font-size="10.5" fill="#5b6b86">PCIe · 바운스 버퍼</text>
  <rect x="250" y="322" width="220" height="82" rx="12" fill="#F1F2F5" stroke="#C4CAD6" stroke-width="1.5"/>
  <text x="360" y="352" text-anchor="middle" font-size="14" font-weight="600" fill="#57606f">신뢰되지 않는 호스트</text>
  <text x="360" y="374" text-anchor="middle" font-size="11.5" fill="#7a8494">하이퍼바이저 · OS · 운영자</text>
  <line x1="360" y1="322" x2="360" y2="270" stroke="#C4CAD6" stroke-width="1.6" stroke-dasharray="3 4"/>
  <circle cx="360" cy="258" r="12" fill="#d4482f"/>
  <path d="M355,253 L365,263 M365,253 L355,263" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/>
  <text x="380" y="292" font-size="11" fill="#d4482f">암호문만 보임</text>
</svg>
</div>

## 남은 문제들 (그리고 하드웨어 현실 점검)

지금 흥미로운 연구가 몰려 있는 곳이 여기다.

- **CPU-TEE, GPU, 메모리의 조화.** 엔클레이브는 작고 CPU 쪽이고, 모델과 연산은
  GPU에 있다. 둘 다에서 최대치를 뽑는 건 보안 문제이자 자원 최적화 문제다. 민감한
  부분은 보호된 채 두면서 무거운 연산은 가속으로 돌도록 작업을 스케줄링하고,
  암호화된 CPU↔GPU 트래픽을 뼈만 남게 깎는 일.
- **어느 계층을 가릴 것인가.** 모델 전체를 TEE에 넣는 게 가장 단순하고 가장 비싸다.
  요즘 많은 연구가 묻는다 — 중요한 것만 보호할 수 있을까? 가중치가 가장 값지거나
  추출에 가장 취약한 계층, 혹은 얇은 "실드" 서브네트워크만 TEE에 두고 나머지는
  GPU에서 평문으로 돌려, 통제되고 측정된 만큼의 노출을 큰 속도와 맞바꾸는 것.
- **하드웨어 하한은 실재한다.** 기밀 GPU 추론은 **컨피덴셜 컴퓨팅을 지원하는
  데이터센터 GPU — Hopper(H100/H200) 또는 Blackwell(B100/B200/GB200) — 와
  컨피덴셜 VM을 지원하는 CPU**가 필요하다. 이전 GPU(Ada, Ampere)엔 없다. 그리고
  **아키텍처 세대만으로는 부족하다.** Jetson Thor는 Blackwell 세대 GPU로 만들어졌지만
  이걸 _못_ 한다 — 컨피덴셜 컴퓨팅은 NVIDIA의 개별 **데이터센터** GPU와 플랫폼의
  기능이지, CC 하드웨어 보안 엔진·펌웨어·증명 경로가 없는 Jetson/임베디드 SoC
  라인의 기능이 아니기 때문이다. Thor는 엣지 로보틱스를 겨냥하지, 증명된 기밀
  추론을 겨냥하지 않는다. "Blackwell이다"가 GB200처럼 TEE를 주지는 않는다.

무엇 하나 끝난 문제가 아니다. 하지만 방향은 분명하고, 그게 실용적인 최전선이다.
TEE는 AI의 사용 중 데이터에 하드웨어 신뢰 기반을 준다. 이제 할 일은, 그 신뢰가
너무 비싸지 않게 GPU까지 닿게 하는 것이다 — 그리고 엣지에서 무언가를 만드는
사람에게는, 오늘의 기밀 경로가 로봇이 아니라 데이터센터를 지난다는 사실을 아는
것이다.
