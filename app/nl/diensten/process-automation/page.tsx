import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/animations/FadeIn";
import { breadcrumbList, service } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Process Automation — Automatiseer handmatige workflows",
  description:
    "Automatiseer handmatige workflows met maatwerk software. Minder fouten, minder tijd, meer controle. Zoyare bouwt automatiseringstools voor bedrijven.",
  alternates: {
    canonical: "https://zoyare.com/nl/diensten/process-automation",
    languages: {
      en: "https://zoyare.com/services/process-automation",
      nl: "https://zoyare.com/nl/diensten/process-automation",
      "x-default": "https://zoyare.com/services/process-automation",
    },
  },
  openGraph: {
    title: "Process Automation — Automatiseer workflows | Zoyare",
    description:
      "Stop met handmatige spreadsheet processen en repetitief werk. Laat het automatiseren.",
    url: "https://zoyare.com/nl/diensten/process-automation",
    locale: "nl_NL",
  },
};

const jsonLd = [
  service({
    name: "Business Process Automation",
    description:
      "Automatisering van handmatige workflows: facturatie, rapportage, dataverwerking, documentgeneratie en goedkeuringsflows. Maatwerk tools voor meetbare tijdsbesparing.",
    path: "/nl/diensten/process-automation",
    serviceType: "Business Process Automation",
  }),
  breadcrumbList([
    { name: "Home", path: "/nl" },
    { name: "Diensten", path: "/nl/diensten/process-automation" },
    { name: "Process Automation", path: "/nl/diensten/process-automation" },
  ]),
];

export default function ProcessAutomationNL() {
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
          Process
          <br />
          automation.
        </h1>
        <p className="text-xl md:text-2xl text-secondary font-light leading-relaxed max-w-2xl">
          Automatiseer handmatige workflows. Minder fouten, minder tijd, meer
          controle — zodat je team zich kan focussen op werk dat écht waarde toevoegt.
        </p>
      </FadeIn>

      <FadeIn className="mb-24 border-t border-border pt-16">
        <p className="font-mono text-xs text-muted tracking-widest uppercase mb-10">Wat ik automatiseer</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {[
            { title: "Facturatie & administratie", text: "Van urenstaten tot verzonden PDF-facturen, zonder enige handmatige stap." },
            { title: "Rapportgeneratie", text: "Automatische rapporten op basis van data uit meerdere bronnen." },
            { title: "Dataverwerking", text: "CSV imports, transformaties, exports naar andere systemen." },
            { title: "Notificaties & alerts", text: "Automatische meldingen op basis van drempelwaardes of events." },
            { title: "Documentverwerking", text: "Templates, bulk-generatie, digitale ondertekenflows." },
            { title: "Goedkeuringsflows", text: "Digitale workflows die e-mailketens en papieren formulieren vervangen." },
          ].map((item) => (
            <div key={item.title} className="bg-background p-8 hover:bg-surface transition-colors duration-200">
              <h3 className="text-base font-medium text-primary mb-3">{item.title}</h3>
              <p className="text-sm text-secondary leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </FadeIn>

      <FadeIn className="mb-24 border-t border-border pt-16">
        <p className="font-mono text-xs text-muted tracking-widest uppercase mb-8">Voorbeeld</p>
        <div className="bg-surface border border-border p-10 max-w-3xl">
          <p className="font-mono text-xs text-accent tracking-widest uppercase mb-4">Case study</p>
          <h3 className="text-xl font-bold text-primary mb-4">Freelancer Facturatie Automation — ProAspect</h3>
          <p className="text-secondary leading-relaxed mb-6">
            Een administratiekantoor verwerkte wekelijks handmatig urenstaten van tientallen
            freelancers en genereerde facturen voor hun klanten. Tijdrovend, foutgevoelig en niet schaalbaar.
          </p>
          <p className="text-secondary leading-relaxed">
            We bouwden een automatiseringstool die het volledige proces afhandelt: CSV upload van
            urenstaten → validatie → factuurberekening → PDF-generatie → verzending. Het handmatige
            werk is geëlimineerd.
          </p>
        </div>
      </FadeIn>

      <FadeIn className="border-t border-border pt-16">
        <p className="font-mono text-xs text-muted tracking-widest uppercase mb-6">Volgende stap</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-primary mb-4">
          Welk proces vreet jouw tijd op?
        </h2>
        <p className="text-secondary leading-relaxed max-w-xl mb-8">
          Vertel me over het handmatige werk dat je vertraagt. Ik beoordeel of automatisering
          zinvol is en schat de tijd- en kostenbesparing in — gratis, binnen 24 uur.
        </p>
        <div className="flex items-center gap-6 flex-wrap">
          <a
            href="https://cal.eu/zoyare"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 bg-primary text-background text-sm font-medium hover:bg-accent transition-colors duration-300"
          >
            Plan een gratis automatisering-review →
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
