import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/animations/FadeIn";

export const metadata: Metadata = {
  title: "Maatwerk Software Laten Bouwen",
  description:
    "Zoyare bouwt maatwerk software voor Nederlandse ondernemingen. Van requirement tot deployment — geen standaard oplossingen, maar software die past bij jouw proces.",
  alternates: { canonical: "https://zoyare.com/diensten/maatwerk-software" },
  openGraph: {
    title: "Maatwerk Software Laten Bouwen — Zoyare",
    description:
      "Custom software development voor bedrijven die meer nodig hebben dan standaard SaaS. Van requirement tot deployment.",
    url: "https://zoyare.com/diensten/maatwerk-software",
  },
};

const steps = [
  { num: "01", title: "Discovery", text: "Het probleem begrijpen vóór de eerste regel code. Proces, pijnpunten, gewenst resultaat." },
  { num: "02", title: "Architectuur", text: "Technische keuzes die schalen. Database-design, API-structuur, deployment-strategie." },
  { num: "03", title: "Iteratief bouwen", text: "Werken in sprints. Vroeg feedback, geen verrassingen bij oplevering." },
  { num: "04", title: "Oplevering", text: "Gedocumenteerde code, tests, overdracht. Zodat je daarna met elke developer verder kunt." },
];

const useCases = [
  "Interne tools en dashboards",
  "Procesautomatisering",
  "Portals voor klanten of medewerkers",
  "Integraties met bestaande systemen",
  "Data-pipelines en rapportagesoftware",
  "Vervangen van handmatige Excel-processen",
];

export default function MaatwerkSoftware() {
  return (
    <div className="pt-32 px-6 md:px-12 pb-24">
      <FadeIn className="mb-20 max-w-4xl">
        <p className="font-mono text-xs text-muted tracking-widest uppercase mb-6">
          Dienst
        </p>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-primary leading-[0.93] mb-8">
          Maatwerk
          <br />
          software.
        </h1>
        <p className="text-xl md:text-2xl text-secondary font-light leading-relaxed max-w-2xl">
          Software die past bij jouw proces, niet andersom. Van requirement tot
          deployment — zonder lagen van projectmanagers.
        </p>
      </FadeIn>

      {/* Use cases */}
      <FadeIn className="mb-24 border-t border-border pt-16">
        <p className="font-mono text-xs text-muted tracking-widest uppercase mb-10">
          Wanneer is dit de oplossing?
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {useCases.map((item, i) => (
            <div key={i} className="bg-background p-6 hover:bg-surface transition-colors duration-200">
              <span className="font-mono text-xs text-accent mr-3">—</span>
              <span className="text-sm text-secondary">{item}</span>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* Process */}
      <FadeIn className="mb-24 border-t border-border pt-16">
        <p className="font-mono text-xs text-muted tracking-widest uppercase mb-12">
          Werkwijze
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {steps.map((step) => (
            <div key={step.num} className="bg-background p-8 hover:bg-surface transition-colors duration-200">
              <span className="font-mono text-xs text-accent block mb-6">{step.num}</span>
              <h3 className="text-base font-medium text-primary mb-3">{step.title}</h3>
              <p className="text-sm text-secondary leading-relaxed">{step.text}</p>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* Pricing signal */}
      <FadeIn className="mb-24 border-t border-border pt-16">
        <p className="font-mono text-xs text-muted tracking-widest uppercase mb-8">Investering</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
          {[
            { range: "€5k – €20k", label: "Kleine automatisering", time: "2–6 weken" },
            { range: "€20k – €75k", label: "Middelgroot systeem", time: "2–4 maanden" },
            { range: "€75k+", label: "Enterprise platform", time: "4–12 maanden" },
          ].map((tier) => (
            <div key={tier.label} className="bg-background p-8 hover:bg-surface transition-colors duration-200">
              <span className="text-2xl font-bold text-accent block mb-2">{tier.range}</span>
              <p className="text-sm text-primary font-medium mb-1">{tier.label}</p>
              <p className="font-mono text-xs text-muted">{tier.time}</p>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* CTA */}
      <FadeIn className="border-t border-border pt-16">
        <p className="font-mono text-xs text-muted tracking-widest uppercase mb-6">Volgende stap</p>
        <p className="text-3xl md:text-4xl font-bold tracking-tighter text-primary mb-8">
          Bespreek jouw project.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-3 px-6 py-3 bg-primary text-background text-sm font-medium hover:bg-accent transition-colors duration-300"
        >
          Gratis gesprek plannen →
        </Link>
      </FadeIn>
    </div>
  );
}
