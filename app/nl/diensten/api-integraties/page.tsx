import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/animations/FadeIn";
import { breadcrumbList, service } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "API-integraties & Systeemkoppelingen",
  description:
    "Koppel je systemen via API-integratie. Zoyare verbindt je ERP, CRM, boekhouding en maatwerk software zodat data automatisch doorstroomt.",
  alternates: {
    canonical: "https://zoyare.com/nl/diensten/api-integraties",
    languages: {
      en: "https://zoyare.com/services/api-integrations",
      nl: "https://zoyare.com/nl/diensten/api-integraties",
      "x-default": "https://zoyare.com/services/api-integrations",
    },
  },
  openGraph: {
    title: "API-integraties — Koppel je systemen | Zoyare",
    description:
      "Stop met handmatig data overtikken. Zoyare verbindt je systemen via REST APIs en webhooks.",
    url: "https://zoyare.com/nl/diensten/api-integraties",
    locale: "nl_NL",
  },
};

const jsonLd = [
  service({
    name: "API & Systeemintegraties",
    description:
      "API-integratie en systeemkoppeling. REST APIs, webhooks, ETL-flows en platform connectors zodat je tools automatisch data delen.",
    path: "/nl/diensten/api-integraties",
    serviceType: "API Integration",
  }),
  breadcrumbList([
    { name: "Home", path: "/nl" },
    { name: "Diensten", path: "/nl/diensten/api-integraties" },
    { name: "API & Integraties", path: "/nl/diensten/api-integraties" },
  ]),
];

const systems = [
  "Xero", "HubSpot", "Salesforce", "SAP", "Mendix",
  "Shopify", "Stripe", "Twilio", "Slack", "Custom APIs",
];

export default function ApiIntegraties() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="pt-32 px-6 md:px-12 pb-24">
      <FadeIn className="mb-20 max-w-4xl">
        <p className="font-mono text-xs text-muted tracking-widest uppercase mb-6">Dienst</p>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-primary leading-[0.93] mb-8">
          API &amp;
          <br />
          Integraties.
        </h1>
        <p className="text-xl md:text-2xl text-secondary font-light leading-relaxed max-w-2xl">
          Systemen die niet met elkaar praten, verbonden. Geen handmatige
          data-entry meer — automatische dataflows tussen al je tools.
        </p>
      </FadeIn>

      <FadeIn className="mb-24 border-t border-border pt-16">
        <p className="font-mono text-xs text-muted tracking-widest uppercase mb-10">Systemen die ik koppel</p>
        <div className="flex flex-wrap gap-2">
          {systems.map((s) => (
            <span key={s} className="font-mono text-sm text-secondary border border-border px-4 py-2 hover:border-muted hover:text-primary transition-colors duration-200">
              {s}
            </span>
          ))}
        </div>
      </FadeIn>

      <FadeIn className="mb-24 border-t border-border pt-16">
        <p className="font-mono text-xs text-muted tracking-widest uppercase mb-12">Wat je krijgt</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
          {[
            { title: "Betrouwbare koppeling", text: "Error handling, retry logic en monitoring zodat de integratie werkt, ook als een systeem kortstondig offline is." },
            { title: "Gedocumenteerde code", text: "Volledige documentatie van de dataflow, velden en transformatielogica. Begrijpelijk voor elke developer." },
            { title: "Onderhoudbaar", text: "Schone architectuur zodat aanpassingen minimaal zijn wanneer een API verandert." },
          ].map((item) => (
            <div key={item.title} className="bg-background p-8 hover:bg-surface transition-colors duration-200">
              <h3 className="text-base font-medium text-primary mb-3">{item.title}</h3>
              <p className="text-sm text-secondary leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </FadeIn>

      <FadeIn className="mb-24 border-t border-border pt-16">
        <p className="font-mono text-xs text-muted tracking-widest uppercase mb-8">Investering</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
          {[
            { range: "€2,5k – €8k", label: "Simpele koppeling", time: "1–3 weken" },
            { range: "€8k – €25k", label: "Multi-systeem integratie", time: "3–8 weken" },
            { range: "€25k+", label: "Enterprise / legacy", time: "2–6 maanden" },
          ].map((tier) => (
            <div key={tier.label} className="bg-background p-8 hover:bg-surface transition-colors duration-200">
              <span className="text-2xl font-bold text-accent block mb-2">{tier.range}</span>
              <p className="text-sm text-primary font-medium mb-1">{tier.label}</p>
              <p className="font-mono text-xs text-muted">{tier.time}</p>
            </div>
          ))}
        </div>
      </FadeIn>

      <FadeIn className="border-t border-border pt-16">
        <p className="font-mono text-xs text-muted tracking-widest uppercase mb-6">Volgende stap</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-primary mb-4">
          Welke systemen wil je koppelen?
        </h2>
        <p className="text-secondary leading-relaxed max-w-xl mb-8">
          Vertel me welke tools je gebruikt en welke data er tussen moet stromen.
          Ik stuur je binnen 24 uur een haalbaarheidsadvies — geheel vrijblijvend.
        </p>
        <div className="flex items-center gap-6 flex-wrap">
          <a
            href="https://cal.eu/zoyare"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 bg-primary text-background text-sm font-medium hover:bg-accent transition-colors duration-300"
          >
            Plan een gratis intake →
          </a>
          <Link
            href="/nl/contact"
            className="text-sm text-secondary hover:text-primary transition-colors duration-200 underline underline-offset-4"
          >
            Of stuur een bericht
          </Link>
        </div>
      </FadeIn>
    </div>
    </>
  );
}
