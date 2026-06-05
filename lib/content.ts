export const site = {
  name: "Zoyare",
  tagline: "Software built to scale.",
  description:
    "Zoyare builds custom software and mobile applications for businesses that need more than off-the-shelf solutions.",
};

export const about = {
  name: "Zoyare",
  role: "Software Engineering Studio",
  bio: "We build software that works — from enterprise integrations to products that go from zero to production. Zoyare was founded on a simple idea: great software requires both technical depth and a deep understanding of the problem you're solving.",
  focus: [
    "Back-end architecture & API design",
    "Enterprise system integrations",
    "Full-stack product development",
    "Business process automation",
  ],
};

export type Project = {
  id: string;
  client: string;
  category: string;
  title: string;
  short: string;
  description: string;
  tags: string[];
  type: string;
  year: string;
  challenge: string;
  approach: string;
  result: string;
  stack: string[];
};

export const projects: Project[] = [
  {
    id: "siemens",
    client: "Siemens",
    category: "Enterprise Integration",
    title: "BuildingX Platform Connector",
    short: "Mendix connector for the Siemens BuildingX platform — Java, REST API integrations and a complete sample application.",
    description: "Development of a production-ready connector for the Siemens BuildingX IoT platform via Mendix. The project involved complex Java implementation, layered REST API integrations and a custom sample application demonstrating the platform's full functionality and use cases to enterprise customers.",
    tags: ["Java", "Mendix", "REST API", "IoT", "Enterprise"],
    type: "Enterprise",
    year: "2024",
    challenge: "Siemens needed a production-ready connector to make the BuildingX IoT platform accessible to Mendix developers worldwide. The API was complex, documentation was limited and the connector had to meet enterprise quality standards.",
    approach: "Started with a thorough analysis of the BuildingX REST API and OAuth authentication flow. Then built a layered Java implementation in Mendix with abstraction per API domain. Developed a complete sample application in parallel that demonstrates all use cases — so other developers can get started immediately.",
    result: "A production-ready connector that's live in the Siemens ecosystem. Enterprise developers can integrate BuildingX functionality directly into their Mendix applications without needing to understand the underlying API.",
    stack: ["Java", "Mendix", "REST API", "OAuth 2.0", "IoT", "JSON"],
  },
  {
    id: "stratex",
    client: "StrateX",
    category: "Back-end Engineering",
    title: "Workforce Management System",
    short: "Back-end for a Workforce Management platform — database architecture and RESTful APIs built within a team.",
    description: "Responsible for the full back-end development of a Workforce Management System. Database schema design, RESTful API implementation and collaboration within a professional engineering team. Focus on scalability and reliability of the data layer.",
    tags: ["Back-end", "REST API", "Database Design", "Team"],
    type: "Engineering",
    year: "2024",
    challenge: "A Workforce Management platform that needed to combine scheduling, time tracking and reporting into one scalable back-end. The existing data architecture wasn't designed for growth — a redesign was necessary.",
    approach: "Completely redesigned the database schema with a focus on query performance and scalability. Implemented RESTful APIs per domain (scheduling, employees, reporting) with consistent error handling and authentication. Worked closely with the front-end team to align with interface requirements.",
    result: "A stable, scalable back-end that the front-end team could immediately adopt. Clear API documentation and a solid data model as the foundation for further development.",
    stack: ["Node.js", "PostgreSQL", "REST API", "Docker", "TypeScript"],
  },
  {
    id: "studybuddy",
    client: "StudyBuddy",
    category: "Product Development",
    title: "Student Matching Platform",
    short: "Matching app for students to find local study partners based on course, location and availability.",
    description: "Concept and development of a student matching application. Students find local peers based on shared courses, location and availability — with a swipe interface and direct chat upon matching. Fully owned product, from architecture to UX.",
    tags: ["Product", "Mobile", "Matching", "Full-stack"],
    type: "Product",
    year: "2025",
    challenge: "Students struggle to find study partners taking the same course, nearby and available at the same time. Existing tools (WhatsApp groups, Facebook) are unorganized and don't scale.",
    approach: "Built from scratch as an owned product. Started with user research among students, then mapped out the architecture (matching algorithm, real-time chat, geolocation). Chose React Native for cross-platform reach. Built a swipe interface for low-friction interaction, with direct chat when two students match.",
    result: "A fully functional MVP with matching based on course, location and availability. Real-time chat via WebSockets. Ready for app store launch.",
    stack: ["React Native", "Expo", "Node.js", "WebSockets", "PostgreSQL", "TypeScript"],
  },
  {
    id: "proaspect",
    client: "ProAspect",
    category: "Business Automation",
    title: "Freelancer Invoicing Automation",
    short: "Automation tool for timesheet processing and invoicing between freelancers and clients through an accounting firm.",
    description: "Custom automation tool that processes weekly freelancer timesheets and automatically generates invoices for clients. Eliminates manual work in the administrative process — from CSV upload to sent PDF invoice.",
    tags: ["Automation", "Finance", "PDF", "Admin"],
    type: "Automation",
    year: "2025",
    challenge: "An accounting firm manually processed weekly timesheets from dozens of freelancers. Every week: downloading CSVs, creating invoices, generating PDFs, sending emails. Error-prone, time-consuming and not scalable.",
    approach: "Mapped the entire process — from CSV delivery to sent invoice. Built an automation tool that reads the CSV, retrieves the correct rates and client data, generates a PDF invoice from a template and automatically sends the invoice to the client.",
    result: "The weekly manual process of several hours has been reduced to zero. The tool runs fully automatically. No more errors from manual data entry. Scalable to any number of freelancers.",
    stack: ["Node.js", "PDF-lib", "CSV parsing", "Nodemailer", "PostgreSQL"],
  },
];

export const services = [
  {
    title: "Custom Software",
    description:
      "From requirement to deployment. No off-the-shelf solutions — software that fits your process.",
    href: "/services/custom-software",
  },
  {
    title: "API & Integrations",
    description:
      "Systems that don't talk to each other, connected. REST APIs, platform connectors, data pipelines.",
    href: "/services/api-integrations",
  },
  {
    title: "Mobile Applications",
    description:
      "iOS and Android apps that actually get used. Focus on speed, reliability and UX.",
    href: "/services/mobile-applications",
  },
  {
    title: "Process Automation",
    description:
      "Automate manual workflows. Fewer errors, less time, more control.",
    href: "/services/process-automation",
  },
];

export const contact = {
  email: "hello@zoyare.com",
  cta: "Discuss a project?",
  bookingUrl: "https://cal.eu/zoyare",
};

export const clients = [
  { name: "Siemens",    detail: "Enterprise IoT integration" },
  { name: "StrateX",   detail: "Workforce Management back-end" },
  { name: "StudyBuddy",detail: "Mobile product — matching platform" },
  { name: "ProAspect", detail: "Invoicing automation" },
];

export const testimonials = [
  {
    quote: "Zoyare delivered a production-ready connector that met our enterprise quality standards. The technical depth and understanding of our API was impressive.",
    name: "Engineering Lead",
    company: "Siemens",
    project: "BuildingX Platform Connector",
  },
  {
    quote: "The back-end architecture Zoyare designed scaled exactly as we needed. Clean APIs, solid documentation, and seamless collaboration with our front-end team.",
    name: "Product Owner",
    company: "StrateX",
    project: "Workforce Management System",
  },
  {
    quote: "What used to take us hours every week is now fully automated. Zero errors, zero manual work. The ROI was immediate.",
    name: "Managing Director",
    company: "ProAspect",
    project: "Invoicing Automation",
  },
];
