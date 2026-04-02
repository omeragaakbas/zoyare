import { about } from "@/lib/content";
import Link from "next/link";
import type { Metadata } from "next";
import FadeIn from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";

export const metadata: Metadata = {
  title: "Over",
  description:
    "Ömer Akbas is software engineer en founder van Zoyare. Bouwt maatwerk software voor ondernemingen — van back-end architectuur tot enterprise integraties.",
  alternates: { canonical: "https://zoyare.com/about" },
  openGraph: {
    title: "Over Zoyare — Ömer Akbas, Software Engineer",
    description:
      "Ömer Akbas bouwt maatwerk software voor ondernemingen. Directe samenwerking, technische diepgang, van requirement tot deployment.",
    url: "https://zoyare.com/about",
  },
};

export default function About() {
  return (
    <div className="pt-32 px-6 md:px-12 pb-24">
      {/* Header */}
      <FadeIn className="mb-20">
        <p className="font-mono text-xs text-muted tracking-widest uppercase mb-6">Over</p>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-primary leading-[0.93]">
          {about.name}
        </h1>
        <p className="text-secondary text-base font-light mt-4 tracking-wide">{about.role}</p>
      </FadeIn>

      {/* Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 border-t border-border pt-16">
        <FadeIn className="lg:col-span-7" delay={0.1}>
          <p className="text-primary text-xl md:text-2xl leading-relaxed font-light tracking-tight">
            {about.bio}
          </p>
        </FadeIn>

        <FadeIn className="lg:col-span-4 lg:col-start-9" delay={0.2}>
          <p className="font-mono text-xs text-muted tracking-widest uppercase mb-6">Focus</p>
          <ul className="flex flex-col gap-5">
            {about.focus.map((item, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="font-mono text-xs text-accent mt-0.5">—</span>
                <span className="text-sm text-secondary leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>

      {/* Approach */}
      <div className="mt-24 border-t border-border pt-16">
        <FadeIn className="mb-12">
          <p className="font-mono text-xs text-muted tracking-widest uppercase">Werkwijze</p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
          {[
            {
              num: "01",
              title: "Probleem eerst",
              text: "Software bouwen begint met begrijpen wat je oplost. Geen aannames, geen overengineering.",
            },
            {
              num: "02",
              title: "Technische diepgang",
              text: "Van database-schema tot API-contract — elk onderdeel wordt doordacht gebouwd, niet snel geplakt.",
            },
            {
              num: "03",
              title: "Direct contact",
              text: "Geen lagen van project managers. Je werkt rechtstreeks met de engineer die het bouwt.",
            },
          ].map((item) => (
            <StaggerItem key={item.num}>
              <div className="bg-background p-10 h-full group hover:bg-surface transition-colors duration-300">
                <span className="font-mono text-xs text-accent block mb-8">{item.num}</span>
                <h3 className="text-base font-medium text-primary mb-4">{item.title}</h3>
                <p className="text-sm text-secondary leading-relaxed">{item.text}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* CTA */}
      <FadeIn className="mt-24 border-t border-border pt-16">
        <p className="font-mono text-xs text-muted tracking-widest uppercase mb-8">Samenwerken</p>
        <Link
          href="/contact"
          className="group inline-flex items-center gap-3 text-3xl md:text-5xl font-bold tracking-tighter text-primary hover:text-accent transition-colors duration-200"
        >
          Laten we praten.
          <span className="text-accent transition-transform duration-300 group-hover:translate-x-2">→</span>
        </Link>
      </FadeIn>
    </div>
  );
}
