// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
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
        },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-blog-kr",
          title: "Blog(KR)",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
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
