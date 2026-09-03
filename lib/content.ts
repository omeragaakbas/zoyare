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
  {
    id: "customs-compliance",
    client: "International Parcel Carrier",
    category: "Regulatory Integration",
    title: "Cross-Border Customs Compliance Service",
    short: "Event-driven AWS service that determines customs eligibility for cross-border parcels and tracks them through a strict compliance window before release to sorting.",
    description: "Built the service responsible for EU pre-arrival customs compliance on a subset of an international parcel carrier's cross-border volume. It ingests pre-departure shipment data, determines which parcels fall under the regulation, and polls the customs data provider for a clearance status within a fixed time window — feeding the result back into the carrier's own sorting decision.",
    tags: ["Customs Compliance", "Event-Driven", "AWS", "Node.js", "Enterprise"],
    type: "Compliance",
    year: "2025",
    challenge: "Under EU pre-arrival security rules, cross-border transit parcels need a customs clearance status before they can continue their journey. Customs can take up to two hours to complete its security check, and a parcel that isn't tracked correctly through that window either gets pulled from the line manually or risks moving without clearance. There was no automated way to determine which parcels were even subject to the rule, let alone track them through the compliance window.",
    approach: "Built an event-driven service on AWS (Lambda, DynamoDB, EventBridge, SQS) that ingests pre-departure shipment messages, applies the eligibility rules — origin, destination, transport mode — to flag which parcels fall under the regulation, and schedules a status check exactly at the end of the customs security window. Each parcel's compliance state is tracked through acknowledgement, clearance, rework and hold statuses, with the outcome routed back into the carrier's sorting system automatically.",
    result: "Cross-border parcels are tracked through the full compliance window without manual intervention, and parcels needing rework or a customs hold get flagged automatically instead of being discovered on the sorting floor.",
    stack: ["Node.js", "TypeScript", "AWS Lambda", "DynamoDB", "EventBridge", "SQS"],
  },
  {
    id: "membership-content-platform",
    client: "National Pet Information Platform",
    category: "Digital Platform",
    title: "Member Accounts, Webshop & Content Platform",
    short: "Session-based member accounts, an integrated webshop and a refactored content model for a national pet-care information platform built on a headless CMS.",
    description: "Contributed to a national pet-care information platform's move from static content into a full membership product: secure member accounts, an integrated webshop, and a content model flexible enough for the editorial team to extend on their own.",
    tags: ["Authentication", "CMS", ".NET", "Content Platform"],
    type: "Platform",
    year: "2026",
    challenge: "The platform needed to move beyond static informational content into a real membership product — letting visitors create accounts and buy through an integrated webshop — while the underlying content model, built on a headless CMS, needed to support increasingly complex banner, media and document structures without becoming unmanageable for the editorial team.",
    approach: "Implemented session-based member authentication with token refresh, protected routes and full account management. Built the shopping cart and checkout flow for the platform's webshop, and refactored the content layer — banners, media and downloadable documents — into a more generic, reusable model on top of the headless CMS, alongside an RSS feed and caching to keep public pages fast.",
    result: "Visitors can register, log in and manage their own account, buy through an integrated webshop, and find practical resources grouped by category — all served through a content model the editorial team can extend without a developer for every new banner or document type.",
    stack: ["ASP.NET Core", "C#", "Umbraco Headless CMS", "Razor"],
  },
  {
    id: "malole-studio",
    client: "Malole Studio",
    category: "Booking & Payments",
    title: "Commission-Free Booking & Payment System",
    short: "Online booking with iDEAL deposits, automatic invoicing and a phone-first admin — replacing a per-booking commission platform for a beauty studio.",
    description: "A booking system for a beauty studio that wanted online appointments and paid deposits without handing a commission to a marketplace on every booking. Clients pick a slot, pay a deposit via iDEAL and receive a confirmation, a calendar file and an invoice automatically. The studio runs the whole thing — availability, treatments, invoices, VAT totals — from a phone.",
    tags: ["Next.js", "Payments", "iDEAL", "Scheduling", "SMB"],
    type: "Product",
    year: "2026",
    challenge: "Booking marketplaces take a cut of every appointment and own the client relationship, but running on WhatsApp and a paper diary means no-shows, double bookings and an evening of invoice admin every quarter. The studio also doesn't work a fixed week — availability changes per week around other commitments, so a standard opening-hours model was never going to fit.",
    approach: "Built as an owned product on Next.js and Postgres. Availability is opt-in per day rather than a recurring week: the studio opens blocks from a phone, and the booking page only ever offers what's actually been opened. Deposits run through Mollie over iDEAL, with a slot held for twenty minutes and released automatically if payment doesn't land. Every booking generates its confirmation email, an .ics calendar file and a PDF deposit invoice; cancelling inside the notice period refunds through the same payment provider without anyone touching it. The admin side covers treatments and add-ons, the day's agenda, a reminder run the day before, and an invoice overview with quarterly totals for the VAT return. Data is hosted in the EU under GDPR.",
    result: "Bookings and deposits run without commission and without manual confirmation. The quarterly VAT figure comes straight out of the invoice overview, and the studio's own domain — not a marketplace profile — is what clients book through.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Drizzle ORM", "Mollie / iDEAL", "Resend", "pdf-lib"],
  },
  {
    id: "refaja-zorgt",
    client: "Refaja Zorgt",
    category: "Local Discovery",
    title: "Independent Care Provider Site & Local SEO",
    short: "A single hand-built page with structured data for an independent care provider — built to be found in her own region, not to win design awards.",
    description: "An independent care provider working in home care and disability support needed a site that explains what she does, what the intake process looks like, and how care is funded and invoiced — and that shows up when someone in her region searches for exactly that. Built as one hand-written page with full structured data, moved off a hosted website builder onto her own infrastructure.",
    tags: ["Local SEO", "Structured Data", "Healthcare", "Static Site"],
    type: "Website",
    year: "2026",
    challenge: "Care is bought locally and on trust: families and case managers search by service and by town, then want to know within a minute whether this person can take on the care, and how it gets funded. The existing setup was a hosted website-builder subscription — recurring cost, no control over markup, and nothing a search engine could read beyond plain text.",
    approach: "Wrote a single page by hand — no framework, no build step — covering the six care services, the intake path from first meeting through care agreement and care plan to invoicing, and the business details a case manager needs to check before placing care. Marked it up with LocalBusiness, Service and OfferCatalog structured data, with the service area listed municipality by municipality so the region she actually travels to is machine-readable. Contact is direct: phone and email, no form to wait on. Deployed on the studio's own hosting by repointing DNS, so the site is no longer tied to a builder subscription.",
    result: "One page that loads instantly, reads correctly in both light and dark mode, states the funding and administrative details up front, and gives search engines an explicit, structured answer for every service and every town in the region.",
    stack: ["HTML", "CSS", "JSON-LD Structured Data", "Vercel"],
  },
];

export const contact = {
  bookingUrl: "https://cal.eu/zoyare",
};

export const clients = [
  { name: "Siemens",    detail: "Enterprise IoT integration" },
  { name: "StrateX",   detail: "Workforce Management back-end" },
  { name: "StudyBuddy",detail: "Mobile product — matching platform" },
  { name: "ProAspect", detail: "Invoicing automation" },
  { name: "Malole Studio", detail: "Booking & iDEAL deposits" },
  { name: "Refaja Zorgt", detail: "Local discovery for a care practice" },
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
