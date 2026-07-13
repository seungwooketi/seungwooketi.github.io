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
        },{id: "nav-blog-kr",
          title: "Blog(KR)",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "post-running-ai-inside-a-trusted-execution-environment",
        
          title: "Running AI Inside a Trusted Execution Environment",
        
        description: "Less a tutorial, more a field report — why you&#39;d run an AI model inside a Trusted Execution Environment (to keep weights and data out of the host&#39;s reach), why today&#39;s TEEs strain under it (tiny enclave memory, CPU-only trust, costly CPU↔GPU transfers), and the open problems, including why confidential GPU inference needs a Hopper-class data-center GPU and why Jetson Thor&#39;s Blackwell doesn&#39;t qualify.",
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
          description: "마크다운으로 개인 지식 베이스를 만든 지 이틀 만에 한계가 보였다. Apache Jena Fuseki 위에 RDF 그래프를 올리면서 했던 결정들과 모델 비교, 그리고 결국 문서가 SoT 일 수밖에 없다는 결론.",
          section: "Ko",handler: () => {
              window.location.href = "/blog/ko/markdown-to-knowledge-graph-ko/";
            },},{id: "ko-산업-파운데이션-모델은-무엇이어야-하는가",
          title: '산업 파운데이션 모델은 무엇이어야 하는가',
          description: "산업 파운데이션 모델이라는 말이 R&amp;D 사업마다 등장한다. 그런데 &#39;파운데이션&#39;이라는 이름에 걸맞으려면 그 모델은 모든 걸 아는 전지(全知)한 모델이 아니라, 그 위에 도메인 지식을 쌓을 수 있는 반석이어야 하지 않을까.",
          section: "Ko",handler: () => {
              window.location.href = "/blog/ko/foundation-ai-for-industry/";
            },},{id: "ko-산업-ai의-지속가능성은-결국-39-ai-가시성-39-에서-온다",
          title: '산업 AI의 지속가능성은 결국 &amp;#39;AI 가시성&amp;#39;에서 온다',
          description: "상용 AI는 이미 놀랍도록 잘 한다. 그렇다면 산업 AI 모델은 따로 필요할까? 정보 보호·비용·지속가능성이라는 세 제약을 짚고, 그 모든 걸 지속가능하게 만드는 핵심이 왜 &#39;AI 가시성(visibility)&#39;인지 이야기한다.",
          section: "Ko",handler: () => {
              window.location.href = "/blog/ko/industrial-ai-visibility/";
            },},{id: "ko-산업-ai를-위한-industrial-data-lake-구상",
          title: '산업 AI를 위한 Industrial Data Lake 구상',
          description: "데이터와 모델을 기업의 자산으로 보호하면서도 산업 AI 모델을 개발할 수 있게 하는 Industrial Data Lake 구상. 섹터 파운데이션 모델, 이해관계자 구조와 비즈니스 모델, 독일·유럽 IPCEI-AI의 시사점, 그리고 시스템 안에 넣어야 할 데이터 보안 기능을 정리했다.",
          section: "Ko",handler: () => {
              window.location.href = "/blog/ko/industrial-ai-data-factory/";
            },},{id: "ko-허용된-통로로-접근하는-산업-정보-생성형-에이전틱-ai의-보안-문제",
          title: '허용된 통로로 접근하는 산업 정보 — 생성형·에이전틱 AI의 보안 문제',
          description: "산업 파운데이션 모델과 에이전틱 AI는 공정 관리를 바꿔 놓을 수 있지만, 정보 보호에는 기존과 다른 종류의 구멍을 낸다. 허용된 접근 루트로 들어와 자연스럽게 정보를 흘리는 문제, 생각해 볼 수 있는 공격 유형, 그리고 사이버 시큐리티에 AI의 관점을 더한 새로운 대응 패러다임을 정리했다.",
          section: "Ko",handler: () => {
              window.location.href = "/blog/ko/industrial-ai-information-protection/";
            },},{id: "ko-신뢰-실행-환경-tee-안에서-ai-돌리기",
          title: '신뢰 실행 환경(TEE) 안에서 AI 돌리기',
          description: "교과서적인 설명보다는 현장 감각으로 정리했다. AI 모델을 신뢰 실행 환경(TEE) 안에서 돌리려는 이유(가중치와 데이터를 호스트 손에서 지키기), 지금의 TEE가 AI 앞에서 삐걱대는 대목(너무 작은 엔클레이브 메모리, CPU에 갇힌 신뢰, 값비싼 CPU↔GPU 전송), 그리고 아직 열려 있는 문제들까지. 기밀 GPU 추론이 왜 Hopper급 데이터센터 GPU를 요구하는지, Jetson Thor의 Blackwell로는 왜 안 되는지도 짚었다.",
          section: "Ko",handler: () => {
              window.location.href = "/blog/ko/trusted-execution-environments/";
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
