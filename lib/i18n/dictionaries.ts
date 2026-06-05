import type { Locale } from "./config";

export type Dictionary = {
  nav: {
    services: string;
    portfolio: string;
    about: string;
    blog: string;
    faq: string;
    contact: string;
    bookCall: string;
    languageSwitch: { en: string; nl: string };
  };
  footer: {
    available: string;
    servicesLabel: string;
    companyLabel: string;
    contactLabel: string;
    scheduleCall: string;
    privacy: string;
    terms: string;
    tagline: string;
    aboutLinks: {
      about: string;
      portfolio: string;
      blog: string;
      faq: string;
      contact: string;
    };
  };
  home: {
    badge: string;
    activeProjects: string;
    custom: string;
    estimated: string;
    headlineLine1: string;
    headlineLine2: string;
    headlineLine3: string;
    subtitle: string;
    viewWork: string;
    scheduleCall: string;
    scroll: string;
    whatIdo: string;
    selectedWork: string;
    viewAll: string;
    builtFor: string;
  };
  about: {
    label: string;
    bio: string;
    focusLabel: string;
    role: string;
    focus: string[];
  };
  services: {
    /** Order corresponds to services array */
    items: Array<{
      slug: string;
      title: string;
      description: string;
      href: string;
    }>;
  };
  contact: {
    label: string;
    title: string;
    intro: string;
    nameLabel: string;
    emailLabel: string;
    companyLabel: string;
    messageLabel: string;
    sendButton: string;
    sending: string;
    successMessage: string;
    errorMessage: string;
    or: string;
    emailUs: string;
    bookCall: string;
  };
  faq: {
    label: string;
    title: string;
    intro: string;
  };
  portfolio: {
    label: string;
    title: string;
    intro: string;
    challenge: string;
    approach: string;
    result: string;
    stack: string;
    nextProject: string;
    backToPortfolio: string;
  };
  blog: {
    label: string;
    title: string;
    intro: string;
    readMore: string;
    minRead: string;
    backToBlog: string;
    publishedOn: string;
  };
  cookies: {
    label: string;
    body: string;
    reject: string;
    accept: string;
    readPolicy: string;
    preferencesButton: string;
  };
  chat: {
    greeting: string;
    placeholder: string;
    online: string;
    title: string;
    error: string;
  };
  notFound: {
    title: string;
    description: string;
    backHome: string;
  };
};

export const en: Dictionary = {
  nav: {
    services: "Services",
    portfolio: "Portfolio",
    about: "About",
    blog: "Blog",
    faq: "FAQ",
    contact: "Contact",
    bookCall: "Book a call",
    languageSwitch: { en: "EN", nl: "NL" },
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
      "Software engineering studio. Custom software, API integrations and mobile apps.",
    aboutLinks: {
      about: "About",
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
  about: {
    label: "About",
    bio: "We build software that works — from enterprise integrations to products that go from zero to production. Zoyare was founded on a simple idea: great software requires both technical depth and a deep understanding of the problem you're solving.",
    focusLabel: "Focus",
    role: "Software Engineering Studio",
    focus: [
      "Back-end architecture & API design",
      "Enterprise system integrations",
      "Full-stack product development",
      "Business process automation",
    ],
  },
  services: {
    items: [
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
  contact: {
    label: "Contact",
    title: "Discuss a project?",
    intro:
      "Tell me about your project — what you're solving, what you've tried and where you'd like to be. I'll respond within a day.",
    nameLabel: "Name",
    emailLabel: "Email",
    companyLabel: "Company",
    messageLabel: "Project description",
    sendButton: "Send message",
    sending: "Sending…",
    successMessage:
      "Thanks for reaching out. I'll respond within a day.",
    errorMessage:
      "Something went wrong. Try again or email hello@zoyare.com.",
    or: "Or",
    emailUs: "send an email",
    bookCall: "schedule a 30-min call",
  },
  faq: {
    label: "FAQ",
    title: "Frequently asked questions",
    intro:
      "The questions I get most often — about costs, timelines, process and how I work.",
  },
  portfolio: {
    label: "Portfolio",
    title: "Selected work",
    intro:
      "A selection of projects — from enterprise integrations to mobile products.",
    challenge: "Challenge",
    approach: "Approach",
    result: "Result",
    stack: "Stack",
    nextProject: "Next project →",
    backToPortfolio: "← Back to portfolio",
  },
  blog: {
    label: "Blog",
    title: "Field notes",
    intro:
      "Practical notes on software, custom development and the way we build at Zoyare.",
    readMore: "Read article →",
    minRead: "min read",
    backToBlog: "← Back to blog",
    publishedOn: "Published",
  },
  cookies: {
    label: "Cookies",
    body: "We use Google Analytics to understand how visitors use our site. No personal data is sold or shared.",
    reject: "Reject",
    accept: "Accept",
    readPolicy: "Read our Privacy Policy",
    preferencesButton: "Cookie preferences",
  },
  chat: {
    greeting:
      "Hi! I'm the Zoyare assistant. Have a question about our services or want to know if Zoyare is the right fit for your project?",
    placeholder: "Ask a question…",
    online: "Online",
    title: "Zoyare Assistant",
    error: "Something went wrong. Send an email to hello@zoyare.com.",
  },
  notFound: {
    title: "Page not found",
    description: "The page you were looking for doesn't exist or was moved.",
    backHome: "← Back to home",
  },
};

export const nl: Dictionary = {
  nav: {
    services: "Diensten",
    portfolio: "Portfolio",
    about: "Over",
    blog: "Blog",
    faq: "FAQ",
    contact: "Contact",
    bookCall: "Plan een gesprek",
    languageSwitch: { en: "EN", nl: "NL" },
  },
  footer: {
    available: "Beschikbaar voor projecten",
    servicesLabel: "Diensten",
    companyLabel: "Bedrijf",
    contactLabel: "Contact",
    scheduleCall: "Plan een gesprek",
    privacy: "Privacy",
    terms: "Voorwaarden",
    tagline:
      "Software engineering studio. Maatwerk software, API-integraties en mobiele apps.",
    aboutLinks: {
      about: "Over ons",
      portfolio: "Portfolio",
      blog: "Blog",
      faq: "FAQ",
      contact: "Contact",
    },
  },
  home: {
    badge: "Beschikbaar voor projecten",
    activeProjects: "Actieve projecten",
    custom: "Maatwerk",
    estimated: "OPGER.",
    headlineLine1: "Software",
    headlineLine2: "gebouwd om",
    headlineLine3: "te schalen.",
    subtitle:
      "Maatwerk software en mobiele applicaties voor bedrijven die meer nodig hebben dan standaardoplossingen.",
    viewWork: "Bekijk werk",
    scheduleCall: "Plan een gesprek",
    scroll: "Scroll",
    whatIdo: "Wat we doen",
    selectedWork: "Geselecteerd werk",
    viewAll: "Bekijk alles →",
    builtFor: "Gebouwd voor",
  },
  about: {
    label: "Over",
    bio: "We bouwen software die werkt — van enterprise-integraties tot producten die van nul tot productie gaan. Zoyare is opgericht vanuit een simpel idee: goede software vraagt zowel technische diepgang als een goed begrip van het probleem dat je oplost.",
    focusLabel: "Focus",
    role: "Software Engineering Studio",
    focus: [
      "Back-end architectuur & API-ontwerp",
      "Enterprise systeemintegraties",
      "Full-stack productontwikkeling",
      "Business process automation",
    ],
  },
  services: {
    items: [
      {
        slug: "maatwerk-software",
        title: "Maatwerk Software",
        description:
          "Van requirement tot deployment. Geen standaardoplossingen — software die past bij jouw proces.",
        href: "/nl/diensten/maatwerk-software",
      },
      {
        slug: "api-integraties",
        title: "API & Integraties",
        description:
          "Systemen die niet met elkaar praten, verbonden. REST APIs, platform connectors, data pipelines.",
        href: "/nl/diensten/api-integraties",
      },
      {
        slug: "mobiele-applicaties",
        title: "Mobiele Applicaties",
        description:
          "iOS en Android apps die daadwerkelijk gebruikt worden. Focus op snelheid, betrouwbaarheid en UX.",
        href: "/nl/diensten/mobiele-applicaties",
      },
      {
        slug: "process-automation",
        title: "Process Automation",
        description:
          "Automatiseer handmatige workflows. Minder fouten, minder tijd, meer controle.",
        href: "/nl/diensten/process-automation",
      },
    ],
  },
  contact: {
    label: "Contact",
    title: "Een project bespreken?",
    intro:
      "Vertel me over je project — wat je oplost, wat je geprobeerd hebt en waar je naartoe wilt. Ik reageer binnen een dag.",
    nameLabel: "Naam",
    emailLabel: "E-mail",
    companyLabel: "Bedrijf",
    messageLabel: "Projectomschrijving",
    sendButton: "Bericht versturen",
    sending: "Versturen…",
    successMessage:
      "Bedankt voor je bericht. Ik reageer binnen een dag.",
    errorMessage:
      "Er ging iets mis. Probeer opnieuw of mail naar hello@zoyare.com.",
    or: "Of",
    emailUs: "stuur een e-mail",
    bookCall: "plan een gesprek van 30 min",
  },
  faq: {
    label: "FAQ",
    title: "Veelgestelde vragen",
    intro:
      "De vragen die ik het vaakst krijg — over kosten, timing, proces en hoe ik werk.",
  },
  portfolio: {
    label: "Portfolio",
    title: "Geselecteerd werk",
    intro:
      "Een selectie van projecten — van enterprise-integraties tot mobiele producten.",
    challenge: "Uitdaging",
    approach: "Aanpak",
    result: "Resultaat",
    stack: "Stack",
    nextProject: "Volgend project →",
    backToPortfolio: "← Terug naar portfolio",
  },
  blog: {
    label: "Blog",
    title: "Veldnotities",
    intro:
      "Praktische notities over software, maatwerkontwikkeling en hoe we bouwen bij Zoyare.",
    readMore: "Lees artikel →",
    minRead: "min lezen",
    backToBlog: "← Terug naar blog",
    publishedOn: "Gepubliceerd",
  },
  cookies: {
    label: "Cookies",
    body: "We gebruiken Google Analytics om te begrijpen hoe bezoekers onze site gebruiken. Geen persoonlijke data wordt verkocht of gedeeld.",
    reject: "Weigeren",
    accept: "Accepteren",
    readPolicy: "Lees onze Privacy Policy",
    preferencesButton: "Cookievoorkeuren",
  },
  chat: {
    greeting:
      "Hoi! Ik ben de Zoyare assistent. Heb je een vraag over onze diensten of wil je weten of Zoyare past bij jouw project?",
    placeholder: "Stel een vraag…",
    online: "Online",
    title: "Zoyare Assistent",
    error: "Er ging iets mis. Stuur een e-mail naar hello@zoyare.com.",
  },
  notFound: {
    title: "Pagina niet gevonden",
    description: "De pagina die je zocht bestaat niet of is verplaatst.",
    backHome: "← Terug naar home",
  },
};

const dictionaries: Record<Locale, Dictionary> = { en, nl };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
