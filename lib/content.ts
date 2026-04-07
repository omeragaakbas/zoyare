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
    short: "Mendix-connector voor het Siemens BuildingX platform — Java, REST API-integraties en een volledige sample applicatie.",
    description: "Ontwikkeling van een production-ready connector voor het Siemens BuildingX IoT-platform via Mendix. Het project omvatte complexe Java-implementatie, gelaagde REST API-integraties en een custom sample applicatie die de volledige functionaliteit en use-cases van het platform demonstreert aan enterprise-klanten.",
    tags: ["Java", "Mendix", "REST API", "IoT", "Enterprise"],
    type: "Enterprise",
    year: "2024",
    challenge: "Siemens had een production-ready connector nodig die het BuildingX IoT-platform toegankelijk maakt voor Mendix-developers wereldwijd. De API was complex, de documentatie beperkt en de connector moest voldoen aan enterprise-kwaliteitseisen.",
    approach: "Gestart met een grondige analyse van de BuildingX REST API en OAuth-authenticatieflow. Vervolgens een gelaagde Java-implementatie gebouwd in Mendix met abstractie per API-domein. Parallel een volledige sample-applicatie ontwikkeld die alle use-cases demonstreert — zodat andere developers direct kunnen starten.",
    result: "Een production-ready connector die live staat in de Siemens ecosystem. Enterprise-developers kunnen BuildingX-functionaliteit direct integreren in hun Mendix-applicaties zonder de onderliggende API te hoeven begrijpen.",
    stack: ["Java", "Mendix", "REST API", "OAuth 2.0", "IoT", "JSON"],
  },
  {
    id: "stratex",
    client: "StrateX",
    category: "Back-end Engineering",
    title: "Workforce Management System",
    short: "Back-end voor een Workforce Management platform — database-architectuur en RESTful API's in teamverband.",
    description: "Verantwoordelijk voor de volledige back-end ontwikkeling van een Workforce Management System. Ontwerp van het database-schema, implementatie van RESTful API's en samenwerking binnen een professioneel engineering-team. Focus op schaalbaarheid en betrouwbaarheid van de data-laag.",
    tags: ["Back-end", "REST API", "Database Design", "Team"],
    type: "Engineering",
    year: "2024",
    challenge: "Een Workforce Management platform dat planning, urenregistratie en rapportage moest samenvoegen in één schaalbare back-end. Bestaande data-architectuur was niet ontworpen op groei — een redesign was noodzakelijk.",
    approach: "Database-schema volledig herontworpen met focus op query-performance en schaalbaarheid. RESTful API's geïmplementeerd per domein (planning, medewerkers, rapportage) met consistente error-handling en authenticatie. Nauw samengewerkt met het front-end team voor afstemming op de interface-behoeften.",
    result: "Een stabiele, schaalbare back-end die het front-end team direct kon overnemen. Duidelijke API-documentatie en een solide datamodel als fundament voor doorontwikkeling.",
    stack: ["Node.js", "PostgreSQL", "REST API", "Docker", "TypeScript"],
  },
  {
    id: "studybuddy",
    client: "StudyBuddy",
    category: "Product Development",
    title: "Student Matching Platform",
    short: "Matching-app voor studenten om lokale studiegenoten te vinden op basis van vak, locatie en beschikbaarheid.",
    description: "Concept en ontwikkeling van een student-matching applicatie. Studenten vinden lokale peers op basis van gedeelde vakken, locatie en beschikbaarheid — met een swipe-interface en directe chat bij een match. Volledig eigen product, van architectuur tot UX.",
    tags: ["Product", "Mobile", "Matching", "Full-stack"],
    type: "Product",
    year: "2025",
    challenge: "Studenten hebben moeite om studiegenoten te vinden die hetzelfde vak volgen, in de buurt zijn en op hetzelfde moment beschikbaar zijn. Bestaande tools (WhatsApp-groepen, Facebook) zijn ongeorganiseerd en schaalbaar niet.",
    approach: "Van nul gebouwd als eigen product. Begonnen met user research onder studenten, daarna architectuur uitgetekend (matching-algoritme, real-time chat, locatiebepaling). React Native gekozen voor cross-platform bereik. Swipe-interface gebouwd voor laagdrempeligheid, met directe chat zodra twee studenten elkaar matchen.",
    result: "Een volledig werkende MVP met matching op basis van vak, locatie en beschikbaarheid. Real-time chat via WebSockets. Klaar voor app store lancering.",
    stack: ["React Native", "Expo", "Node.js", "WebSockets", "PostgreSQL", "TypeScript"],
  },
  {
    id: "proaspect",
    client: "ProAspect",
    category: "Business Automation",
    title: "ZZP Facturatie Automatisering",
    short: "Automatiseringstool voor urenverwerking en facturatie tussen ZZP'ers en opdrachtgevers via een administratiekantoor.",
    description: "Maatwerk automatiseringstool die de wekelijkse urenstaten van ZZP'ers verwerkt en automatisch facturen genereert richting opdrachtgevers. Elimineert handmatig werk in het administratieve proces — van CSV-upload tot verzonden PDF-factuur.",
    tags: ["Automation", "Finance", "PDF", "Admin"],
    type: "Automation",
    year: "2025",
    challenge: "Een administratiekantoor verwerkte handmatig de wekelijkse urenstaten van tientallen ZZP'ers. Elke week: CSV's downloaden, facturen opmaken, PDF's genereren, e-mails versturen. Foutgevoelig, tijdrovend en niet schaalbaar.",
    approach: "Het volledige proces in kaart gebracht — van CSV-aanlevering tot verzonden factuur. Een automatiseringstool gebouwd die de CSV inleest, de juiste tarieven en klantgegevens ophaalt, een PDF-factuur genereert op basis van een template en de factuur automatisch verstuurt naar de opdrachtgever.",
    result: "Het wekelijkse handmatige proces van meerdere uren is teruggebracht naar nul. De tool draait volledig automatisch. Geen fouten meer door handmatig overtypen. Schaalbaar naar elk aantal ZZP'ers.",
    stack: ["Node.js", "PDF-lib", "CSV parsing", "Nodemailer", "PostgreSQL"],
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
  bookingUrl: "https://cal.eu/zoyare", // vervang met jouw Calendly of Cal.com link
};

export const clients = [
  { name: "Siemens",    detail: "Enterprise IoT-integratie" },
  { name: "StrateX",   detail: "Workforce Management back-end" },
  { name: "StudyBuddy",detail: "Mobiel product — matching platform" },
  { name: "ProAspect", detail: "Facturatie automatisering" },
];
