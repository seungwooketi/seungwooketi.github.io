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
        },{id: "nav-collaborations",
          title: "collaborations",
          description: "International collaborative research partnerships.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/collaborations/";
          },
        },{id: "news-successfully-completed-three-major-national-projects-edgeai-edgecar-and-agridata-delivering-open-datasets-edge-deployment-frameworks-and-technology-transfer-to-industry-partners",
          title: 'Successfully completed three major national projects: EdgeAI, EdgeCar, and AGRIDATA — delivering open...',
          description: "",
          section: "News",},{id: "news-continued-leadership-of-the-national-ai-talent-development-program-hosted-annual-research-workshop-with-80-participants-from-academia-and-industry",
          title: 'Continued leadership of the National AI Talent Development Program — hosted annual research...',
          description: "",
          section: "News",},{id: "news-preparing-new-korea-spain-bilateral-ai-research-proposal-in-collaboration-with-spanish-research-institutions-through-kiat",
          title: 'Preparing new Korea–Spain bilateral AI research proposal in collaboration with Spanish research institutions...',
          description: "",
          section: "News",},{id: "news-launched-a-new-national-r-amp-amp-d-project-on-industrial-ai-agent-technology-developing-autonomous-ai-agents-for-real-world-industrial-problem-solving",
          title: 'Launched a new national R&amp;amp;amp;D project on Industrial AI Agent Technology — developing...',
          description: "",
          section: "News",},{id: "projects-industrial-ai-agent-technology",
          title: 'Industrial AI Agent Technology',
          description: "Development of AI agent systems for solving real-world industrial problems (2026–)",
          section: "Projects",handler: () => {
              window.location.href = "/projects/01_industrial_ai_agent/";
            },},{id: "projects-edge-ai-platform",
          title: 'Edge AI Platform',
          description: "Lightweight AI inference and learning framework for resource-constrained edge devices",
          section: "Projects",handler: () => {
              window.location.href = "/projects/02_edge_ai/";
            },},{id: "projects-edgecar-edge-ai-for-autonomous-vehicles",
          title: 'EdgeCar — Edge AI for Autonomous Vehicles',
          description: "Edge AI computing platform for real-time perception and decision-making in connected vehicles",
          section: "Projects",handler: () => {
              window.location.href = "/projects/03_edgecar/";
            },},{id: "projects-agridata-agricultural-ai-data-platform",
          title: 'AGRIDATA — Agricultural AI Data Platform',
          description: "AI-powered data collection, curation, and analytics platform for smart agriculture",
          section: "Projects",handler: () => {
              window.location.href = "/projects/04_agridata/";
            },},{id: "projects-kresip-korea-spain-ai-research-collaboration",
          title: 'KRESIP — Korea-Spain AI Research Collaboration',
          description: "Bilateral AI research program between Korea and Spain",
          section: "Projects",handler: () => {
              window.location.href = "/projects/05_kresip/";
            },},{id: "projects-vibes",
          title: 'VIBES',
          description: "AI-based video intelligence and behavior analysis system",
          section: "Projects",handler: () => {
              window.location.href = "/projects/06_vibes/";
            },},{id: "projects-national-ai-talent-development-program",
          title: 'National AI Talent Development Program',
          description: "Training next-generation AI researchers and engineers",
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
