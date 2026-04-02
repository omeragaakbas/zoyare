export const site = {
  name: "Zoyare",
  tagline: "Software built to scale.",
  description:
    "Zoyare ontwikkelt maatwerk software en mobiele applicaties voor ondernemingen die verder willen dan standaard oplossingen.",
};

export const about = {
  name: "Ömer Akbas",
  role: "Software Engineer & Founder",
  bio: "Ik bouw software die werkt — van enterprise-integraties tot producten die van nul naar productie gaan. Zoyare is opgericht vanuit een eenvoudig idee: goede software vereist technische diepgang én begrip van het probleem dat je oplost.",
  focus: [
    "Back-end architectuur & API-design",
    "Enterprise systeem-integraties",
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
};

export const projects: Project[] = [
  {
    id: "siemens",
    client: "Siemens",
    category: "Enterprise Integration",
    title: "BuildingX Platform Connector",
    short:
      "Mendix-connector voor het Siemens BuildingX platform — Java, REST API-integraties en een volledige sample applicatie.",
    description:
      "Ontwikkeling van een production-ready connector voor het Siemens BuildingX IoT-platform via Mendix. Het project omvatte complexe Java-implementatie, gelaagde REST API-integraties en een custom sample applicatie die de volledige functionaliteit en use-cases van het platform demonstreert aan enterprise-klanten.",
    tags: ["Java", "Mendix", "REST API", "IoT", "Enterprise"],
    type: "Enterprise",
  },
  {
    id: "stratex",
    client: "StrateX",
    category: "Back-end Engineering",
    title: "Workforce Management System",
    short:
      "Back-end voor een Workforce Management platform — database-architectuur en RESTful API's in teamverband.",
    description:
      "Verantwoordelijk voor de volledige back-end ontwikkeling van een Workforce Management System. Ontwerp van het database-schema, implementatie van RESTful API's en samenwerking binnen een professioneel engineering-team. Focus op schaalbaarheid en betrouwbaarheid van de data-laag.",
    tags: ["Back-end", "REST API", "Database Design", "Team"],
    type: "Engineering",
  },
  {
    id: "studybuddy",
    client: "StudyBuddy",
    category: "Product Development",
    title: "Student Matching Platform",
    short:
      "Matching-app voor studenten om lokale studiegenoten te vinden op basis van vak, locatie en beschikbaarheid.",
    description:
      "Concept en ontwikkeling van een student-matching applicatie. Studenten vinden lokale peers op basis van gedeelde vakken, locatie en beschikbaarheid — met een swipe-interface en directe chat bij een match. Volledig eigen product, van architectuur tot UX.",
    tags: ["Product", "Mobile", "Matching", "Full-stack"],
    type: "Product",
  },
  {
    id: "proaspect",
    client: "ProAspect",
    category: "Business Automation",
    title: "ZZP Facturatie Automatisering",
    short:
      "Automatiseringstool voor urenverwerking en facturatie tussen ZZP'ers en opdrachtgevers via een administratiekantoor.",
    description:
      "Maatwerk automatiseringstool die de wekelijkse urenstaten van ZZP'ers verwerkt en automatisch facturen genereert richting opdrachtgevers. Elimineert handmatig werk in het administratieve proces — van CSV-upload tot verzonden PDF-factuur.",
    tags: ["Automation", "Finance", "PDF", "Admin"],
    type: "Automation",
  },
];

export const services = [
  {
    title: "Maatwerk Software",
    description:
      "Van requirement tot deployment. Geen kant-en-klare oplossingen, maar software die past bij jouw proces.",
    href: "/diensten/maatwerk-software",
  },
  {
    title: "API & Integraties",
    description:
      "Systemen die niet met elkaar praten, verbonden. REST APIs, platform-connectoren, data-pipelines.",
    href: "/diensten/api-integraties",
  },
  {
    title: "Mobiele Applicaties",
    description:
      "iOS en Android apps die daadwerkelijk gebruikt worden. Focus op snelheid, betrouwbaarheid en UX.",
    href: "/diensten/mobiele-applicaties",
  },
  {
    title: "Process Automation",
    description:
      "Handmatige workflows automatiseren. Minder fouten, minder tijd, meer controle.",
    href: "/diensten/process-automation",
  },
];

export const contact = {
  email: "hello@zoyare.com",
  cta: "Een project bespreken?",
};
