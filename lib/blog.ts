export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  readTime: number;
  body: string; // HTML string
};

export const posts: Post[] = [
  {
    slug: "maatwerk-software-laten-bouwen",
    title: "Maatwerk software laten bouwen: wat kost het en wat moet je weten?",
    description:
      "Alles wat je moet weten voordat je maatwerk software laat bouwen: kosten, doorlooptijden, valkuilen en hoe je de juiste partner kiest.",
    date: "2026-03-20",
    category: "Maatwerk Software",
    readTime: 8,
    body: `
<p>Maatwerk software laten bouwen is een grote stap. Je kiest bewust voor een oplossing die niet van de plank komt — en dat heeft een reden. Maar wat kost het precies? Wat moet je regelen? En hoe voorkom je de meest gemaakte fouten?</p>

<p>In dit artikel leg ik alles uit vanuit mijn eigen praktijk als software engineer. Geen verkooppraatje, maar eerlijke informatie.</p>

<h2>Wanneer kies je voor maatwerk software?</h2>

<p>Standaard software werkt prima voor generieke processen. Maar zodra jouw bedrijf een werkwijze heeft die te specifiek is voor wat een SaaS-pakket biedt, loop je tegen grenzen aan:</p>

<ul>
  <li>Twee systemen die niet met elkaar communiceren</li>
  <li>Medewerkers die handmatig data overzetten tussen tools</li>
  <li>Rapportages die nooit precies kloppen omdat het systeem jouw definitie niet kent</li>
  <li>Procesautomatisering die "bijna" werkt maar toch een handmatige stap vereist</li>
</ul>

<p>Als je jezelf herkent in één van deze situaties, is maatwerk software de moeite van het onderzoeken waard.</p>

<h2>Wat kost maatwerk software?</h2>

<p>Het eerlijke antwoord: <strong>het hangt af van de complexiteit</strong>. Maar om een kader te geven:</p>

<ul>
  <li><strong>Kleine automatisering of tool (2–6 weken)</strong>: €5.000 – €20.000</li>
  <li><strong>Middelgroot systeem met API-integraties (2–4 maanden)</strong>: €20.000 – €75.000</li>
  <li><strong>Enterprise platform of mobiele app (4–12 maanden)</strong>: €75.000+</li>
</ul>

<p>Vergelijk dit met de alternatieven: een FTE software developer kost je jaarlijks €60.000–€90.000 aan salariskosten, nog zonder overhead. Maatwerk software is in veel gevallen goedkoper dan een intern team, zeker voor afgebakende projecten.</p>

<h2>Wat bepaalt de prijs?</h2>

<p>De grootste prijsfactoren zijn:</p>

<ol>
  <li><strong>Complexiteit van de logica</strong> — Hoe meer uitzonderingen, berekeningen of beslisbomen, hoe meer tijd.</li>
  <li><strong>Integraties met bestaande systemen</strong> — Elke API-koppeling kost tijd, vooral als de documentatie van het andere systeem matig is.</li>
  <li><strong>Gebruikersinterface</strong> — Een intern tool zonder fraaie UI is sneller dan een consumentenapp waar design telt.</li>
  <li><strong>Schaling en performance</strong> — Software voor 10 gebruikers bouwen is anders dan voor 10.000.</li>
  <li><strong>Onderhoud en doorontwikkeling</strong> — Wie beheert het na oplevering?</li>
</ol>

<h2>Het proces: van idee naar live software</h2>

<p>Een goed traject ziet er zo uit:</p>

<ol>
  <li><strong>Discovery</strong> — Het probleem doorgronden. Wat is het proces nu? Waar zit de pijn? Wat is het gewenste resultaat?</li>
  <li><strong>Scope definitie</strong> — Wat bouwen we wél, en wat niet? Een scherpe scope voorkomt eindeloze doorlooptijden.</li>
  <li><strong>Architectuurbeslissingen</strong> — Welke technologie? Welk datamodel? Hoe schalen we later?</li>
  <li><strong>Bouwen in iteraties</strong> — Niet 6 maanden bouwen en dan één keer opleveren. Werken in sprints zodat je vroeg feedback kunt geven.</li>
  <li><strong>Testing en deployment</strong> — Automatische tests, staging-omgeving, productie-deployment.</li>
  <li><strong>Overdracht en documentatie</strong> — Zodat je later met elke developer verder kunt, niet alleen met mij.</li>
</ol>

<h2>De meest gemaakte fouten</h2>

<p><strong>1. Te veel willen in de eerste versie</strong><br>
De v1 moet het kernprobleem oplossen, niet alle mogelijke toekomstige wensen. Elke feature die je toevoegt aan de eerste versie verdubbelt bijna de kans op vertraging.</p>

<p><strong>2. Onvoldoende tijd investeren in de discovery-fase</strong><br>
Software bouwen begint met begrijpen wat je bouwt. Weken besteden aan het doorgronden van het probleem bespaart maanden aan herwerk.</p>

<p><strong>3. Kiezen op prijs in plaats van kwaliteit</strong><br>
De goedkoopste offerte is zelden de beste investering. Slecht gebouwde software kost je meer in onderhoud en herschrijven.</p>

<p><strong>4. Geen eigenaar intern aanwijzen</strong><br>
Maatwerk software vereist een contactpersoon aan jouw kant die beslissingen kan nemen. Zonder die persoon loopt een project vast.</p>

<h2>Hoe kies je de juiste partner?</h2>

<p>Stel bij elk gesprek deze vragen:</p>

<ul>
  <li>Wat is jouw aanpak als de scope halverwege wijzigt?</li>
  <li>Kun je voorbeelden geven van vergelijkbare projecten?</li>
  <li>Wie bouwt het precies — jij, of wordt het uitbesteed?</li>
  <li>Wat krijg ik als ik na oplevering een bug ontdek?</li>
  <li>Hoe ziet de documentatie eruit?</li>
</ul>

<p>Let op: agencies schalen hun teams op met juniors of uitbesteden naar lagelonenlanden. Een gespecialiseerde engineer die het werk zelf doet is in de meeste gevallen sneller, goedkoper en betrouwbaarder.</p>

<h2>Klaar om te starten?</h2>

<p>Bij Zoyare begin ik altijd met een gratis gesprek van een half uur. Geen verkoopgesprek, maar een eerlijk advies over of maatwerk software de juiste oplossing is voor jouw situatie. Als standaard software beter past, zeg ik dat ook.</p>
    `.trim(),
  },
  {
    slug: "api-integratie-systemen-koppelen",
    title: "Systemen koppelen via API: zo werkt het in de praktijk",
    description:
      "Je gebruikt vijf verschillende tools, maar ze praten niet met elkaar. API-integratie lost dat op. Uitleg in begrijpelijke taal + wat het kost.",
    date: "2026-03-28",
    category: "API & Integraties",
    readTime: 6,
    body: `
<p>Bijna elk bedrijf dat groeit, loopt er op een gegeven moment tegenaan: meerdere systemen die niet met elkaar communiceren. De boekhouding zit in Exact, de CRM in HubSpot, de planning in een eigen tool en de rapportages worden handmatig in Excel gebouwd. Elke week opnieuw.</p>

<p>Dit is oplosbaar. API-integratie verbindt die systemen met elkaar, zodat data automatisch doorstroomt en handmatig overtypen verleden tijd is.</p>

<h2>Wat is een API precies?</h2>

<p>Een API (Application Programming Interface) is een gestandaardiseerde manier waarop softwaresystemen met elkaar communiceren. Bijna elke moderne softwaretoepassing heeft een API — van Exact en HubSpot tot Shopify en SAP.</p>

<p>Simpel gezegd: een API is een deur waarmee systemen data kunnen uitwisselen. Mijn werk is het bouwen van de verbinding tussen die deuren.</p>

<h2>Wanneer is API-integratie de oplossing?</h2>

<p>API-integratie is relevant als je:</p>

<ul>
  <li>Data handmatig overzet tussen systemen (kopieert, plakt, exporteert/importeert)</li>
  <li>Rapportages bouwt door gegevens uit meerdere bronnen samen te voegen</li>
  <li>Een nieuw systeem wil koppelen aan bestaande software</li>
  <li>Real-time data-uitwisseling nodig hebt (bijv. voorraad, orders, klantgegevens)</li>
  <li>Meldingen of acties wil automatiseren op basis van events in een ander systeem</li>
</ul>

<h2>Hoe werkt een API-integratie project?</h2>

<p>Een typisch integratieproject verloopt in deze stappen:</p>

<ol>
  <li><strong>Mapping</strong> — Welke data moet van welk systeem naar welk systeem? Wat zijn de velden, formaten en frequenties?</li>
  <li><strong>API-documentatie analyseren</strong> — Elk systeem heeft zijn eigen regels. Sommige APIs zijn uitstekend gedocumenteerd (Stripe, Twilio), andere zijn een uitdaging (oudere enterprise systemen).</li>
  <li><strong>Authenticatie oplossen</strong> — OAuth, API keys, webhooks — de verbinding moet veilig zijn.</li>
  <li><strong>Transformatielogica bouwen</strong> — Data in systeem A ziet er anders uit dan in systeem B. Dat vertalen is het echte werk.</li>
  <li><strong>Error handling</strong> — Wat gebeurt er als een systeem even offline is? Goede integraties zijn bestand tegen storingen.</li>
  <li><strong>Monitoring</strong> — Na oplevering wil je weten of de integratie werkt. Logging en alerts zijn standaard onderdeel van mijn opleveringen.</li>
</ol>

<h2>Voorbeelden uit de praktijk</h2>

<p><strong>Siemens BuildingX Connector</strong><br>
Voor Siemens bouwde ik een production-ready Mendix-connector voor het BuildingX IoT-platform. Dit omvatte complexe Java-implementatie, gelaagde REST API-integraties en een volledige sample applicatie voor enterprise-klanten.</p>

<p><strong>Facturatie automatisering</strong><br>
Een administratiekantoor verwerkte handmatig de urenstaten van tientallen ZZP'ers. We bouwden een automatiseringstool die het hele proces afhandelt — van CSV-upload tot verzonden PDF-factuur — zonder handmatige tussenstap.</p>

<h2>Wat kost een API-integratie?</h2>

<p>Afhankelijk van complexiteit:</p>

<ul>
  <li><strong>Eenvoudige koppeling tussen twee moderne systemen</strong>: €2.500 – €8.000</li>
  <li><strong>Meervoudige integratie met transformatielogica</strong>: €8.000 – €25.000</li>
  <li><strong>Enterprise koppeling met legacy systemen</strong>: €25.000+</li>
</ul>

<p>De doorlooptijd is doorgaans 2–8 weken, afhankelijk van de kwaliteit van de API-documentatie en de complexiteit van de businesslogica.</p>

<h2>Wat maakt een goede integratie?</h2>

<p>Veel integratieprojecten worden gebouwd als een "quick fix" — en dat wreekt zich later. Een goede integratie is:</p>

<ul>
  <li><strong>Betrouwbaar</strong>: werkt ook als een systeem even niet bereikbaar is</li>
  <li><strong>Gedocumenteerd</strong>: zodat je weet wat er precies gebeurt</li>
  <li><strong>Onderhoudbaar</strong>: als een systeem z'n API wijzigt, is de aanpassing minimaal</li>
  <li><strong>Gemonitord</strong>: alerts als er iets misgaat</li>
</ul>

<h2>Klaar om te beginnen?</h2>

<p>Beschrijf welke systemen je wilt koppelen en wat de data-flow moet zijn, dan kijk ik gratis mee of en hoe dit technisch haalbaar is.</p>
    `.trim(),
  },
  {
    slug: "mobiele-app-laten-maken",
    title: "Mobiele app laten maken in 2026: alles wat je moet weten",
    description:
      "Wat kost een mobiele app, hoe lang duurt het en wat zijn de valkuilen? Een eerlijk overzicht van iOS en Android app development.",
    date: "2026-04-01",
    category: "Mobiele Applicaties",
    readTime: 7,
    body: `
<p>Een mobiele app laten maken is voor veel ondernemers een grote stap. De vragen zijn altijd hetzelfde: wat kost het, hoe lang duurt het, moet ik kiezen voor iOS of Android, en hoe weet ik of mijn idee werkt?</p>

<p>In dit artikel geef ik een eerlijk overzicht — geen verkooppraatje, maar de werkelijkheid van app development in 2026.</p>

<h2>iOS, Android of allebei?</h2>

<p>Dit is de eerste vraag die je moet beantwoorden. De opties:</p>

<p><strong>Native (iOS + Android apart)</strong><br>
Twee aparte codebases, maximale performance en platformspecifieke mogelijkheden. Duurder en langzamer te bouwen, maar de beste gebruikerservaring.</p>

<p><strong>Cross-platform (React Native / Expo)</strong><br>
Één codebase, draait op zowel iOS als Android. Kosten 30–50% lager dan native, kwaliteit voor de meeste use cases uitstekend. Dit is mijn standaard aanpak voor nieuwe apps.</p>

<p><strong>Progressive Web App (PWA)</strong><br>
Geen app store nodig — de website gedraagt zich als een app. Beperkte toegang tot hardware, maar voor bepaalde use cases een slimme keuze.</p>

<p>Voor de meeste B2B en zakelijke apps is <strong>React Native via Expo</strong> de verstandigste keuze: één codebase, lagere kosten, voldoende performance.</p>

<h2>Wat kost een mobiele app?</h2>

<p>Eerlijk gezegd: goede apps zijn niet goedkoop. Hier zijn realistische cijfers:</p>

<ul>
  <li><strong>Eenvoudige app (MVP, 6–10 schermen)</strong>: €15.000 – €35.000</li>
  <li><strong>Middelgrote app met backend en authenticatie</strong>: €35.000 – €80.000</li>
  <li><strong>Complexe app met matching, payments of real-time features</strong>: €80.000+</li>
</ul>

<p>Aanbiedingen onder €10.000 voor een "volledige app" zijn bijna altijd een template met jouw logo erop, of werk van lage kwaliteit dat je later duur staat.</p>

<h2>Hoe lang duurt het?</h2>

<p>Een realistisch tijdlijn:</p>

<ul>
  <li><strong>Discovery en design (2–4 weken)</strong>: User flows, wireframes, technische architectuur</li>
  <li><strong>MVP bouwen (6–16 weken)</strong>: Kernfunctionaliteit live</li>
  <li><strong>Testing en app store review (1–3 weken)</strong>: Apple kan tot 2 weken duren</li>
  <li><strong>Totaal</strong>: 3–6 maanden voor een solide MVP</li>
</ul>

<h2>Wat maakt een goede app?</h2>

<p>De meeste apps falen niet vanwege slechte code, maar vanwege slechte product beslissingen. Wat ik altijd aanraad:</p>

<ol>
  <li><strong>Begin met een MVP</strong> — Bouw de kleinste versie die het kernprobleem oplost. Valideer met echte gebruikers voordat je verder bouwt.</li>
  <li><strong>Focus op één ding</strong> — De beste apps doen één ding uitzonderlijk goed.</li>
  <li><strong>Performance is geen luxe</strong> — Een app die trager dan 300ms reageert verliest gebruikers. Performance moet ingebakken zijn, niet achteraf toegevoegd.</li>
  <li><strong>App Store Optimization (ASO)</strong> — Zichtbaarheid in de App Store is voor veel apps de grootste groeihefboom.</li>
</ol>

<h2>Mijn aanpak</h2>

<p>Voor mobiele apps werk ik met React Native en Expo. Dit geeft:</p>

<ul>
  <li>Één codebase voor iOS en Android</li>
  <li>Native performance voor de meeste use cases</li>
  <li>Over-the-air updates (geen nieuwe App Store review voor kleine updates)</li>
  <li>Toegang tot native hardware (camera, GPS, biometrie, push notifications)</li>
</ul>

<p>Een voorbeeld uit mijn portfolio: <strong>StudyBuddy</strong> — een matching-app voor studenten om lokale studiegenoten te vinden op basis van vak, locatie en beschikbaarheid, met swipe-interface en directe chat bij een match.</p>

<h2>Klaar om je app idee te bespreken?</h2>

<p>Stuur me een korte beschrijving van wat je wilt bouwen, dan geef ik je een eerlijk beeld van haalbaarheid, kosten en doorlooptijd — gratis en vrijblijvend.</p>
    `.trim(),
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAllPosts(): Post[] {
  return [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
