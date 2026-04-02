import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/animations/FadeIn";

export const metadata: Metadata = {
  title: "Business Process Automation — Handmatige Workflows Automatiseren",
  description:
    "Handmatige workflows automatiseren met maatwerk software. Minder fouten, minder tijd, meer controle. Zoyare bouwt automatiseringstools voor Nederlandse bedrijven.",
  alternates: { canonical: "https://zoyare.com/diensten/process-automation" },
  openGraph: {
    title: "Process Automation — Workflows Automatiseren | Zoyare",
    description:
      "Stop met handmatige Excel-processen en repetitief werk. Laat het automatiseren.",
    url: "https://zoyare.com/diensten/process-automation",
  },
};

export default function ProcessAutomation() {
  return (
    <div className="pt-32 px-6 md:px-12 pb-24">
      <FadeIn className="mb-20 max-w-4xl">
        <p className="font-mono text-xs text-muted tracking-widest uppercase mb-6">Dienst</p>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-primary leading-[0.93] mb-8">
          Process
          <br />
          automation.
        </h1>
        <p className="text-xl md:text-2xl text-secondary font-light leading-relaxed max-w-2xl">
          Handmatige workflows automatiseren. Minder fouten, minder tijd, meer
          controle — zodat jouw team zich kan richten op wat echt waarde creëert.
        </p>
      </FadeIn>

      {/* Use cases */}
      <FadeIn className="mb-24 border-t border-border pt-16">
        <p className="font-mono text-xs text-muted tracking-widest uppercase mb-10">Wat automatiseer ik?</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {[
            { title: "Facturatie & administratie", text: "Van urenstaten tot verzonden PDF-facturen, zonder handmatige tussenstap." },
            { title: "Rapportage generatie", text: "Automatische rapporten op basis van data uit meerdere bronnen." },
            { title: "Data verwerking", text: "CSV-imports, transformaties, exports naar andere systemen." },
            { title: "Notificaties & alerts", text: "Automatische meldingen op basis van drempelwaarden of events." },
            { title: "Documentverwerking", text: "Templates, bulk-generatie, digitale signing workflows." },
            { title: "Goedkeuringsprocessen", text: "Digitale workflows ter vervanging van email-ketens en papieren formulieren." },
          ].map((item) => (
            <div key={item.title} className="bg-background p-8 hover:bg-surface transition-colors duration-200">
              <h3 className="text-base font-medium text-primary mb-3">{item.title}</h3>
              <p className="text-sm text-secondary leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* Case study */}
      <FadeIn className="mb-24 border-t border-border pt-16">
        <p className="font-mono text-xs text-muted tracking-widest uppercase mb-8">Voorbeeld</p>
        <div className="bg-surface border border-border p-10 max-w-3xl">
          <p className="font-mono text-xs text-accent tracking-widest uppercase mb-4">Case study</p>
          <h3 className="text-xl font-bold text-primary mb-4">ZZP Facturatie Automatisering — ProAspect</h3>
          <p className="text-secondary leading-relaxed mb-6">
            Een administratiekantoor verwerkte handmatig de wekelijkse urenstaten van tientallen
            ZZP&apos;ers en genereerde facturen richting opdrachtgevers. Tijdrovend, foutgevoelig en schaalbaar.
          </p>
          <p className="text-secondary leading-relaxed">
            We bouwden een automatiseringstool die het volledige proces afhandelt: CSV-upload van
            urenstaten → validatie → factuurberekening → PDF-generatie → verzending. Het handmatige
            werk is geëlimineerd.
          </p>
        </div>
      </FadeIn>

      <FadeIn className="border-t border-border pt-16">
        <p className="font-mono text-xs text-muted tracking-widest uppercase mb-6">Volgende stap</p>
        <p className="text-3xl md:text-4xl font-bold tracking-tighter text-primary mb-8">
          Welk proces wil je automatiseren?
        </p>
        <Link href="/contact" className="inline-flex items-center gap-3 px-6 py-3 bg-primary text-background text-sm font-medium hover:bg-accent transition-colors duration-300">
          Vertel me meer →
        </Link>
      </FadeIn>
    </div>
  );
}
