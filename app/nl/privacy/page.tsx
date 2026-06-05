import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacybeleid",
  description: "Privacybeleid voor Zoyare — hoe we omgaan met je gegevens.",
  alternates: {
    canonical: "https://zoyare.com/nl/privacy",
    languages: {
      en: "https://zoyare.com/privacy",
      nl: "https://zoyare.com/nl/privacy",
      "x-default": "https://zoyare.com/privacy",
    },
  },
};

export default function PrivacyNL() {
  return (
    <div className="pt-32 px-6 md:px-12 pb-24 max-w-3xl">
      <p className="font-mono text-xs text-muted tracking-widest uppercase mb-6">
        Juridisch
      </p>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-primary leading-tight mb-12">
        Privacybeleid
      </h1>

      <div className="prose-zoyare">
        <p>Laatst bijgewerkt: april 2026</p>

        <h2>Wie we zijn</h2>
        <p>
          Zoyare is een software engineering studio gevestigd in Nederland.
          KvK: 94498555. Voor vragen over dit beleid kun je contact opnemen via{" "}
          <a href="mailto:hello@zoyare.com">hello@zoyare.com</a>.
        </p>

        <h2>Welke gegevens we verzamelen</h2>
        <p>We verzamelen de volgende gegevens wanneer je onze website gebruikt:</p>
        <ul>
          <li>
            <strong>Contactformulier:</strong> naam, e-mailadres, bedrijfsnaam (optioneel)
            en je bericht. We gebruiken dit uitsluitend om op je vraag te reageren.
          </li>
          <li>
            <strong>Lead magnet:</strong> e-mailadres wanneer je een resource downloadt. We
            gebruiken dit om je de gevraagde content te sturen.
          </li>
          <li>
            <strong>Analytics:</strong> we gebruiken Google Analytics 4 voor geanonimiseerde
            gebruiksdata (bezochte pagina's, tijd op site, apparaat). Geen persoonlijk
            identificeerbare informatie wordt opgeslagen.
          </li>
          <li>
            <strong>Chat widget:</strong> berichten die je via onze AI-chatassistent verstuurt
            worden verwerkt om antwoorden te genereren. We slaan deze gesprekken niet op.
          </li>
        </ul>

        <h2>Hoe we je gegevens gebruiken</h2>
        <ul>
          <li>Om te reageren op je berichten via het contactformulier</li>
          <li>Om gevraagde content te leveren (lead magnets)</li>
          <li>Om te begrijpen hoe bezoekers onze website gebruiken en te verbeteren</li>
          <li>Om te communiceren over projecten wanneer je klant wordt</li>
        </ul>

        <h2>Externe diensten</h2>
        <p>We gebruiken de volgende externe diensten:</p>
        <ul>
          <li>
            <strong>Resend</strong> — voor het versturen van e-mails (contactformulier, lead magnets)
          </li>
          <li>
            <strong>Google Analytics 4</strong> — voor geanonimiseerde website-analytics
          </li>
          <li>
            <strong>Vercel</strong> — voor de hosting van onze website
          </li>
        </ul>

        <h2>Cookies</h2>
        <p>
          Onze website gebruikt functionele cookies die nodig zijn voor de goede werking
          van de site. Google Analytics kan cookies plaatsen om geanonimiseerd gebruik te
          meten. Je kunt cookies altijd uitschakelen in je browserinstellingen.
        </p>

        <h2>Bewaartermijn</h2>
        <p>
          Gegevens uit het contactformulier worden bewaard voor de duur van onze correspondentie
          en daarna verwijderd, tenzij een zakelijke relatie tot stand komt. Analytics-data
          wordt 14 maanden bewaard volgens de standaardinstellingen van Google Analytics.
        </p>

        <h2>Je rechten</h2>
        <p>
          Onder de AVG heb je recht op inzage, rectificatie of verwijdering van je
          persoonsgegevens. Je kunt ook bezwaar maken tegen verwerking of dataportabiliteit
          vragen. Om deze rechten uit te oefenen, mail naar{" "}
          <a href="mailto:hello@zoyare.com">hello@zoyare.com</a>.
        </p>

        <h2>Wijzigingen</h2>
        <p>
          We kunnen dit beleid van tijd tot tijd bijwerken. Wijzigingen worden op deze
          pagina geplaatst met een bijgewerkte datum.
        </p>
      </div>
    </div>
  );
}
