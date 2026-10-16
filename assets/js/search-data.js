// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-blog",
    title: "blog",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-about",
          title: "about",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/about/";
          },
        },{id: "nav-cv",
          title: "cv",
          description: "Curriculum Vitae",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "nav-publications",
          title: "publications",
          description: "Peer-reviewed publications, grouped by year. Citation counts are updated automatically from Google Scholar.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-patents",
          title: "patents",
          description: "Granted and pending patents.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/patents/";
          },
        },{id: "nav-projects",
          title: "projects",
          description: "Major research projects and programs.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "post-zero-trust-from-the-system-down-into-the-hardware",
        
          title: "Zero Trust: From the System Down into the Hardware",
        
        description: "Zero trust stops at the &quot;network-connected device.&quot; Inside it, every command a robot controller sends to a joint still rides on a CRC and an implicit assumption. Using a pick-and-place robot as the example, what changes when you push ZTA&#39;s decision and enforcement points down into the machine - the meaning of access, the decision cycle, component identity, policy enforcement, and how security has to coexist with safety and fail-safe behavior.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/zero-trust-into-hardware/";
          
        },
      },{id: "post-confidential-computing-tee-vs-pcc-component-vs-system",
        
          title: "Confidential Computing: TEE vs. PCC, Component vs. System",
        
        description: "Does running inside a TEE make an AI service confidential? What cloud confidential computing protects and what it leaves open, what Apple&#39;s Private Cloud Compute (PCC) builds on top of the TEE, and what PCC&#39;s June 2026 move onto Google Cloud&#39;s TDX and Blackwell confidential GPUs says about where trust actually comes from - the hardware is the floor, the system is the building.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/confidential-computing-tee-vs-pcc/";
          
        },
      },{id: "post-at-uai-2026-my-pipeline-was-far-too-sure-of-itself",
        
          title: "At UAI 2026: My Pipeline Was Far Too Sure of Itself",
        
        description: "Sitting through a conference on uncertainty and causality, I realized the real problem with the LLM and agent pipelines I&#39;ve been building isn&#39;t that they get things wrong. It&#39;s that they have no way to say they don&#39;t know.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/uai-2026-uncertainty/";
          
        },
      },{id: "post-white-paper-advancing-ai-safety-and-security",
        
          title: "White Paper: Advancing AI Safety and Security",
        
        description: "A technical white paper on AI safety and security in the agentic era — mechanistic interpretability, automated red-teaming, dynamic evaluation, agentic action-restriction, enterprise confidentiality, and the governance landscape across the EU, the US, and Korea. Free to download (CC BY-NC 4.0).",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/ai-safety-security-white-paper/";
          
        },
      },{id: "post-three-failures-before-a-knowledge-base-that-held",
        
          title: "Three Failures Before a Knowledge Base That Held",
        
        description: "I wanted a knowledge base over the documents my research projects generate — proposals, agreements, reports, trip records. It took three abandoned designs to learn that the hard part was never extraction. It was change, cost, and knowing what you don&#39;t know.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/knowledge-base-three-failures/";
          
        },
      },{id: "post-running-ai-inside-a-trusted-execution-environment",
        
          title: "Running AI Inside a Trusted Execution Environment",
        
        description: "Less a tutorial, more a field report — why you&#39;d run an AI model inside a Trusted Execution Environment (to keep weights and data out of the host&#39;s reach), why today&#39;s TEEs strain under it (tiny enclave memory, CPU-only trust, costly CPU↔GPU transfers), and recent research directions, including why confidential GPU inference needs a Hopper-class data-center GPU and why Jetson Thor&#39;s Blackwell doesn&#39;t qualify.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/trusted-execution-environments/";
          
        },
      },{id: "post-leaking-through-an-authorized-door-the-security-problem-of-generative-and-agentic-ai",
        
          title: "Leaking Through an Authorized Door — the Security Problem of Generative and Agentic...",
        
        description: "Industrial foundation models and agentic AI can transform process management, but they punch a different kind of hole in information protection. This is about information that leaks through a legitimate access route, the attacks worth thinking about, the standards and guidelines that speak to them, and a defensive paradigm that brings an AI point of view into cybersecurity.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/industrial-ai-information-protection/";
          
        },
      },{id: "post-an-industrial-data-lake-for-industrial-ai",
        
          title: "An Industrial Data Lake for Industrial AI",
        
        description: "A sketch of an Industrial Data Lake — a way to build industrial AI while keeping data and models protected as corporate assets. It covers the conflicting requirements industry faces, agentic AI as an answer, a stakeholder-and-business-model structure, what Germany and Europe&#39;s IPCEI-AI suggests, and the security functions the system has to carry.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/industrial-ai-data-factory/";
          
        },
      },{id: "post-industrial-ai-and-its-visibility",
        
          title: "Industrial AI and its visibility",
        
        description: "Commercial AI is already astonishingly good — so do we even need a separate industrial AI model? A look at three constraints (protecting information, cost, and sustainability) and why the thing that ultimately holds it all together is AI visibility.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/industrial-ai-visibility/";
          
        },
      },{id: "post-what-an-industrial-foundation-model-should-be",
        
          title: "What an Industrial Foundation Model Should Be",
        
        description: "The phrase &#39;industrial foundation model&#39; turns up in every R&amp;D program now. But to earn the word &#39;foundation,&#39; such a model shouldn&#39;t be an omniscient know-it-all — it should be the bedrock that domain knowledge gets built on.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/foundation-ai-for-industry/";
          
        },
      },{id: "post-when-the-knowledge-base-wants-to-be-a-graph",
        
          title: "When the Knowledge Base Wants to Be a Graph",
        
        description: "Two days after building a markdown knowledge base, the cracks started showing. Notes on turning it into an RDF graph using Apache Jena Fuseki - the architectural calls, the model comparisons across Claude, qwen2.5, and exaone3.5, and why the documents themselves are the only sustainable source of truth.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/from-markdown-to-knowledge-graph/";
          
        },
      },{id: "post-bootstrapping-a-personal-knowledge-base-in-an-afternoon",
        
          title: "Bootstrapping a Personal Knowledge Base in an Afternoon",
        
        description: "Notes from a day spent designing folders, slugs, and a small LLM skill so that future updates to a personal knowledge base only require pointing at the source material.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/personal-knowledge-base-with-claude/";
          
        },
      },{id: "post-a-study-roadmap-for-uncertainty-quantification-inverse-dynamics",
        
          title: "A Study Roadmap for Uncertainty Quantification + Inverse Dynamics",
        
        description: "A leveled reading list and a 10-week curriculum for getting from Bayesian basics to physics-informed, uncertainty-aware inverse dynamic models.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/uq-idm-study-roadmap/";
          
        },
      },{id: "post-uncertainty-quantification-meets-inverse-dynamics",
        
          title: "Uncertainty Quantification Meets Inverse Dynamics",
        
        description: "A concept review of uncertainty quantification (UQ), inverse dynamic models (IDM), and why combining them matters for safe, data-efficient robot control.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/uncertainty-quantification-review/";
          
        },
      },{id: "ko-지식-베이스가-그래프가-되고-싶을-때",
          title: '지식 베이스가 그래프가 되고 싶을 때',
          description: "마크다운으로 개인 지식 베이스를 만든 지 이틀 만에 한계가 보였다. Apache Jena Fuseki 위에 RDF 그래프를 올리면서 내린 결정들과 모델 비교, 그리고 결국 원본 문서를 SoT 로 둘 수밖에 없다고 판단하게 된 과정.",
          section: "Ko",handler: () => {
              window.location.href = "/blog/ko/markdown-to-knowledge-graph-ko/";
            },},{id: "ko-산업-파운데이션-모델은-무엇이어야-하는가",
          title: '산업 파운데이션 모델은 무엇이어야 하는가',
          description: "산업 파운데이션 모델이라는 말이 R&amp;D 사업마다 등장한다. 그런데 &#39;파운데이션&#39;이라는 이름에 걸맞으려면, 그 모델은 모든 것을 아는 전지(全知)한 모델이 아니라 그 위에 도메인 지식을 쌓을 수 있는 반석이어야 하지 않을까.",
          section: "Ko",handler: () => {
              window.location.href = "/blog/ko/foundation-ai-for-industry/";
            },},{id: "ko-산업-ai의-지속가능성은-결국-39-ai-가시성-39-에서-온다",
          title: '산업 AI의 지속가능성은 결국 &amp;#39;AI 가시성&amp;#39;에서 온다',
          description: "상용 AI는 이미 놀랄 만큼 잘한다. 그렇다면 산업 AI 모델이 따로 필요할까? 정보 보호, 비용, 지속가능성이라는 세 가지 제약을 짚어 보고, 이 모든 것을 계속 굴러가게 하는 열쇠로 &#39;AI 가시성(visibility)&#39;을 이야기한다.",
          section: "Ko",handler: () => {
              window.location.href = "/blog/ko/industrial-ai-visibility/";
            },},{id: "ko-산업-ai를-위한-industrial-data-lake-구상",
          title: '산업 AI를 위한 Industrial Data Lake 구상',
          description: "데이터와 모델을 기업의 자산으로 보호하면서도 산업 AI 모델을 개발할 수 있게 하는 Industrial Data Lake 구상. 섹터 파운데이션 모델, 이해관계자 구조와 비즈니스 모델, 독일과 유럽 IPCEI-AI의 시사점, 그리고 시스템 안에 넣어야 할 데이터 보안 기능을 정리했다.",
          section: "Ko",handler: () => {
              window.location.href = "/blog/ko/industrial-ai-data-factory/";
            },},{id: "ko-허용된-통로로-새는-산업-정보-생성형-에이전틱-ai의-보안-문제",
          title: '허용된 통로로 새는 산업 정보: 생성형, 에이전틱 AI의 보안 문제',
          description: "산업 파운데이션 모델과 에이전틱 AI는 공정 관리를 바꿔 놓을 수 있지만, 정보 보호 측면에서는 기존과 다른 종류의 구멍을 낸다. 허용된 접근 경로로 들어와 자연스럽게 정보를 흘리는 문제, 생각해 볼 수 있는 공격 유형, 그리고 사이버 보안에 AI의 관점을 더한 새로운 대응 패러다임을 정리했다.",
          section: "Ko",handler: () => {
              window.location.href = "/blog/ko/industrial-ai-information-protection/";
            },},{id: "ko-신뢰-실행-환경-tee-안에서-ai-돌리기",
          title: '신뢰 실행 환경(TEE) 안에서 AI 돌리기',
          description: "교과서적인 설명보다는 현장 감각으로 정리했다. AI 모델을 신뢰 실행 환경(TEE) 안에서 돌리려는 이유(가중치와 데이터를 호스트로부터 지키기), 지금의 TEE가 AI 앞에서 삐걱대는 지점(너무 작은 엔클레이브 메모리, CPU에 갇힌 신뢰, 값비싼 CPU↔GPU 전송), 그리고 최근 연구 토픽까지 다룬다. 기밀 GPU 추론에 왜 Hopper급 데이터센터 GPU가 필요한지, Jetson Thor의 Blackwell로는 왜 안 되는지도 짚었다.",
          section: "Ko",handler: () => {
              window.location.href = "/blog/ko/trusted-execution-environments/";
            },},{id: "ko-지식베이스-하나-만드는데-세-번을-엎었다",
          title: '지식베이스 하나 만드는데 세 번을 엎었다',
          description: "연구과제를 하면서 쌓인 문서들 위에 지식베이스를 올려 보려 했다. 세 번 엎고 나서야 알았다. 어려운 건 추출이 아니었다. 변경이고, 비용이고, 모르는 걸 모른다고 말하게 하는 일이었다.",
          section: "Ko",handler: () => {
              window.location.href = "/blog/ko/knowledge-base-three-failures/";
            },},{id: "ko-백서-ai-안전성과-보안",
          title: '백서: AI 안전성과 보안',
          description: "에이전틱 시대의 AI 안전성과 보안을 다룬 기술 백서. 기계적 해석가능성, 자동화된 레드티밍, 동적 평가, 에이전트 행위 제한, 기업 기밀성, 그리고 EU, 미국, 한국의 거버넌스 동향까지 다룬다. 자유롭게 내려받을 수 있다 (CC BY-NC 4.0).",
          section: "Ko",handler: () => {
              window.location.href = "/blog/ko/ai-safety-security-white-paper/";
            },},{id: "ko-국제공동연구-생각보다-문턱이-낮습니다-자료-공유",
          title: '국제공동연구, 생각보다 문턱이 낮습니다: 자료 공유',
          description: "최근 국제공동연구 관련 문의가 있어 정리한 김에 자료 두 건을 공유합니다. Horizon Europe과 EUREKA를 처음 시작하는 분들을 위한 컨설팅 개요와 실무 심화 안내서입니다. 첨부 문서는 모두 국문입니다.",
          section: "Ko",handler: () => {
              window.location.href = "/blog/ko/international-joint-research/";
            },},{id: "ko-uai-2026에서-내-파이프라인이-너무-단호했다는-걸-깨닫다",
          title: 'UAI 2026에서, 내 파이프라인이 너무 단호했다는 걸 깨닫다',
          description: "확률과 인과 추론을 다루는 학회에 앉아 있다가, 그동안 LLM과 에이전트로 만들어 온 판단이 얼마나 heuristic하고 단호했는지 새삼 깨달았다. &#39;모른다&#39;고 말할 근거가 없는 파이프라인에 대한 메모.",
          section: "Ko",handler: () => {
              window.location.href = "/blog/ko/uai-2026-uncertainty/";
            },},{id: "ko-기밀-컴퓨팅-tee와-pcc-부품과-시스템-사이",
          title: '기밀 컴퓨팅: TEE와 PCC, 부품과 시스템 사이',
          description: "TEE를 쓰면 기밀 AI 서비스가 되는 걸까요. 클라우드 기밀 컴퓨팅이 지켜 주는 범위와 지켜 주지 못하는 범위를 짚고, Apple Private Cloud Compute(PCC)가 TEE 위에 무엇을 더 쌓았는지, 그리고 2026년 6월 PCC가 Google Cloud의 TDX와 Blackwell 기밀 GPU 위로 옮겨 가면서 드러난 &#39;하드웨어는 바닥, 신뢰는 시스템&#39;이라는 흐름을 정리했습니다.",
          section: "Ko",handler: () => {
              window.location.href = "/blog/ko/confidential-computing-tee-vs-pcc/";
            },},{id: "ko-제로-트러스트-시스템에서-하드웨어로",
          title: '제로 트러스트: 시스템에서 하드웨어로',
          description: "제로 트러스트는 &#39;네트워크에 연결된 장치&#39;에서 멈춥니다. 그 안쪽, 로봇 제어기가 관절에 보내는 지령 하나하나는 여전히 CRC만 믿고 움직입니다. pick-and-place 로봇을 예로, ZTA의 판단과 집행 지점을 장치 안으로 끌어내릴 때 무엇이 달라지는지(접근의 의미, 판단 주기, 부품 신원, 정책 집행, 안전과 Fail Safe)를 정리했습니다.",
          section: "Ko",handler: () => {
              window.location.href = "/blog/ko/zero-trust-into-hardware/";
            },},{id: "news-posted-a-new-update-on-linkedin",
          title: 'Posted a new update on LinkedIn.',
          description: "",
          section: "News",},{id: "projects-edgecar-edge-ai-for-autonomous-vehicles",
          title: 'EdgeCar — Edge AI for Autonomous Vehicles',
          description: "Edge AI computing platform for real-time perception and decision-making in connected vehicles",
          section: "Projects",handler: () => {
              window.location.href = "/projects/03_edgecar/";
            },},{id: "projects-agridata-smart-greenhouse-ai-data-platform",
          title: 'AGRIDATA — Smart-Greenhouse AI Data Platform',
          description: "Big-data platform for smart-greenhouse production-environment management — data curation, quality, and AI analytics",
          section: "Projects",handler: () => {
              window.location.href = "/projects/04_agridata/";
            },},{id: "projects-kresip-korea-spain-smart-farm-ai-platform",
          title: 'KRESIP — Korea–Spain Smart-Farm AI Platform',
          description: "AI-based precision-agriculture platform jointly developed by Korea and Spain",
          section: "Projects",handler: () => {
              window.location.href = "/projects/05_kresip/";
            },},{id: "projects-vibes-smart-livestock-cloud-edge-ai-platform",
          title: 'VIBES — Smart-Livestock Cloud–Edge AI Platform',
          description: "Hierarchical cloud–edge platform and embedded intelligent services for smart livestock farming (Korea–Czech joint R&amp;D)",
          section: "Projects",handler: () => {
              window.location.href = "/projects/06_vibes/";
            },},{id: "projects-generative-ai-talent-development-program",
          title: 'Generative AI Talent Development Program',
          description: "Workforce program for generative AI; KETI&#39;s research develops Vision-Language-Action (VLA) models for robot manipulation",
          section: "Projects",handler: () => {
              window.location.href = "/projects/07_ai_talent/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%73%65%75%6E%67%77%6F%6F.%6B%75%6D@%67%6D%61%69%6C.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/seungwooketi", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/seung-woo-kum-80907980", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=8DEsYMsAAAAJ", "_blank");
        },
      },{
        id: 'social-orcid',
        title: 'ORCID',
        section: 'Socials',
        handler: () => {
          window.open("https://orcid.org/0000-0002-6834-9255", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
