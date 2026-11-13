/**
 * Central site copy for shared components (Nav, Footer, homepage sections).
 * Page-level copy lives in the page files themselves.
 */
export const dict = {
  nav: {
    portfolio: "Portfolio",
    about: "About",
    blog: "Blog",
    contact: "Contact",
    bookCall: "Book a call",
  },
  footer: {
    available: "Available for projects",
    servicesLabel: "Services",
    companyLabel: "Company",
    contactLabel: "Contact",
    scheduleCall: "Schedule a call",
    privacy: "Privacy",
    terms: "Terms",
    tagline:
      "Dutch engineering studio for AI agents, automations and custom software, for businesses in the Netherlands and Benelux.",
    aboutLinks: {
      about: "About",
      netherlands: "For Dutch businesses",
      portfolio: "Portfolio",
      blog: "Blog",
      faq: "FAQ",
      contact: "Contact",
    },
  },
  home: {
    badge: "Available for projects",
    activeProjects: "Active projects",
    custom: "Custom",
    estimated: "EST.",
    headlineLine1: "Software",
    headlineLine2: "built to",
    headlineLine3: "scale.",
    subtitle:
      "Custom software and mobile applications for businesses that need more than off-the-shelf solutions.",
    viewWork: "View work",
    scheduleCall: "Schedule a call",
    scroll: "Scroll",
    whatIdo: "What I do",
    selectedWork: "Selected work",
    viewAll: "View all →",
    builtFor: "Built for",
  },
  services: {
    items: [
      {
        slug: "ai-agents",
        title: "AI agents",
        description: "Agents that handle orders, leads, documents and reports.",
        href: "/services/ai-agents",
      },
      {
        slug: "ai-customer-support",
        title: "Customer support agent",
        description: "Answers from your own data, hard cases to a person.",
        href: "/services/ai-customer-support",
      },
      {
        slug: "creative-production",
        title: "Ads and video",
        description: "One brief becomes static ads, cuts and captions.",
        href: "/services/creative-production",
      },
      {
        slug: "growth-reporting",
        title: "Growth reports",
        description: "Every source in one place, one report your team reads.",
        href: "/services/growth-reporting",
      },
      {
        slug: "custom-software",
        title: "Custom Software",
        description:
          "From requirement to deployment. No off-the-shelf solutions — software that fits your process.",
        href: "/services/custom-software",
      },
      {
        slug: "api-integrations",
        title: "API & Integrations",
        description:
          "Systems that don't talk to each other, connected. REST APIs, platform connectors, data pipelines.",
        href: "/services/api-integrations",
      },
      {
        slug: "mobile-applications",
        title: "Mobile Applications",
        description:
          "iOS and Android apps that actually get used. Focus on speed, reliability and UX.",
        href: "/services/mobile-applications",
      },
      {
        slug: "process-automation",
        title: "Process Automation",
        description:
          "Automate manual workflows. Fewer errors, less time, more control.",
        href: "/services/process-automation",
      },
    ],
  },
} as const;
