import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Algemene voorwaarden",
  description: "Algemene voorwaarden voor Zoyare software engineering diensten.",
  alternates: {
    canonical: "https://zoyare.com/nl/voorwaarden",
    languages: {
      en: "https://zoyare.com/terms",
      nl: "https://zoyare.com/nl/voorwaarden",
      "x-default": "https://zoyare.com/terms",
    },
  },
};

export default function VoorwaardenNL() {
  return (
    <div className="pt-32 px-6 md:px-12 pb-24 max-w-3xl">
      <p className="font-mono text-xs text-muted tracking-widest uppercase mb-6">
        Juridisch
      </p>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-primary leading-tight mb-12">
        Algemene voorwaarden
      </h1>

      <div className="prose-zoyare">
        <p>Laatst bijgewerkt: april 2026</p>

        <h2>1. Algemeen</h2>
        <p>
          Deze voorwaarden zijn van toepassing op alle diensten geleverd door Zoyare,
          ingeschreven bij de KvK onder nummer 94498555 in Nederland. Door gebruik te
          maken van onze diensten ga je akkoord met deze voorwaarden.
        </p>

        <h2>2. Diensten</h2>
        <p>
          Zoyare biedt diensten op het gebied van maatwerk software development, API-integratie,
          mobiele applicatie ontwikkeling en business process automation. De specifieke scope,
          planning en deliverables per project worden vastgelegd in een afzonderlijk
          projectvoorstel of statement of work.
        </p>

        <h2>3. Offertes en overeenkomsten</h2>
        <p>
          Alle offertes zijn 30 dagen geldig tenzij anders aangegeven. Een project start
          bij schriftelijke akkoordverklaring van de offerte (e-mail volstaat). Wijzigingen
          in de scope na akkoord kunnen impact hebben op planning en prijs — deze worden
          besproken en overeengekomen voor uitvoering.
        </p>

        <h2>4. Betaling</h2>
        <ul>
          <li>Facturen dienen binnen 14 dagen na factuurdatum betaald te worden, tenzij anders afgesproken.</li>
          <li>Voor grotere projecten wordt de betaling opgesplitst in mijlpalen zoals beschreven in de offerte.</li>
          <li>Bij te late betaling kan de wettelijke rente in rekening worden gebracht conform het Nederlands recht.</li>
        </ul>

        <h2>5. Intellectueel eigendom</h2>
        <p>
          Na volledige betaling gaan alle intellectuele eigendomsrechten van de opgeleverde
          software over naar de klant, tenzij schriftelijk anders overeengekomen. Externe
          libraries en open-source componenten behouden hun oorspronkelijke licentie.
        </p>

        <h2>6. Geheimhouding</h2>
        <p>
          Beide partijen verplichten zich tot geheimhouding van alle informatie die tijdens
          het project gedeeld wordt. Dit omvat onder andere bedrijfsprocessen, technische
          documentatie en bedrijfsgegevens.
        </p>

        <h2>7. Aansprakelijkheid</h2>
        <p>
          De aansprakelijkheid van Zoyare is beperkt tot het bedrag dat voor het betreffende
          project is gefactureerd. We zijn niet aansprakelijk voor indirecte schade, gederfde
          winst of schade die voortvloeit uit het gebruik van opgeleverde software in productie
          zonder voldoende testing.
        </p>

        <h2>8. Garantie</h2>
        <p>
          Opgeleverde software heeft een garantieperiode van 30 dagen na oplevering. Binnen
          deze periode worden bugs die direct te maken hebben met de overeengekomen scope
          kosteloos opgelost. Feature requests of wijzigingen buiten de oorspronkelijke
          scope vallen niet onder de garantie.
        </p>

        <h2>9. Beëindiging</h2>
        <p>
          Beide partijen kunnen de overeenkomst beëindigen met een schriftelijke opzegtermijn
          van 14 dagen. Bij beëindiging wordt het tot dat moment uitgevoerde werk gefactureerd
          en opgeleverd.
        </p>

        <h2>10. Toepasselijk recht</h2>
        <p>
          Op deze voorwaarden is het Nederlands recht van toepassing. Geschillen worden
          voorgelegd aan de bevoegde rechter in Nederland.
        </p>
      </div>
    </div>
  );
}
