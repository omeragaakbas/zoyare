import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/animations/FadeIn";

export const metadata: Metadata = {
  title: "Mobiele App Laten Bouwen — iOS & Android",
  description:
    "Mobiele app laten bouwen voor iOS en Android. Zoyare bouwt native-kwaliteit apps met React Native/Expo. Eerlijke kosten, snelle doorlooptijd.",
  alternates: { canonical: "https://zoyare.com/diensten/mobiele-applicaties" },
  openGraph: {
    title: "Mobiele App Laten Bouwen — Zoyare",
    description:
      "iOS en Android app development met React Native. Één codebase, native kwaliteit, lagere kosten.",
    url: "https://zoyare.com/diensten/mobiele-applicaties",
  },
};

export default function MobieleApplicaties() {
  return (
    <div className="pt-32 px-6 md:px-12 pb-24">
      <FadeIn className="mb-20 max-w-4xl">
        <p className="font-mono text-xs text-muted tracking-widest uppercase mb-6">Dienst</p>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-primary leading-[0.93] mb-8">
          Mobiele
          <br />
          applicaties.
        </h1>
        <p className="text-xl md:text-2xl text-secondary font-light leading-relaxed max-w-2xl">
          iOS en Android apps die daadwerkelijk gebruikt worden. Focus op
          snelheid, betrouwbaarheid en UX — gebouwd met React Native &amp; Expo.
        </p>
      </FadeIn>

      {/* Tech stack */}
      <FadeIn className="mb-24 border-t border-border pt-16">
        <p className="font-mono text-xs text-muted tracking-widest uppercase mb-10">Tech stack</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {[
            { title: "React Native + Expo", text: "Één codebase voor iOS en Android. Native performance, over-the-air updates, toegang tot alle hardware features." },
            { title: "TypeScript", text: "Typeveilige code die minder bugs produceert en makkelijker te onderhouden is." },
            { title: "Backend naar keuze", text: "Node.js, Supabase, Firebase of een custom REST API — afhankelijk van jouw requirements." },
            { title: "App Store + Play Store", text: "Ik regel het volledige deployment-proces inclusief App Store review en Play Store publicatie." },
          ].map((item) => (
            <div key={item.title} className="bg-background p-8 hover:bg-surface transition-colors duration-200">
              <h3 className="text-base font-medium text-primary mb-3">{item.title}</h3>
              <p className="text-sm text-secondary leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* Pricing */}
      <FadeIn className="mb-24 border-t border-border pt-16">
        <p className="font-mono text-xs text-muted tracking-widest uppercase mb-8">Investering</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
          {[
            { range: "€15k – €35k", label: "MVP (6–10 schermen)", time: "6–10 weken" },
            { range: "€35k – €80k", label: "Volledige app + backend", time: "3–5 maanden" },
            { range: "€80k+", label: "Complex platform", time: "5–12 maanden" },
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
        <p className="text-3xl md:text-4xl font-bold tracking-tighter text-primary mb-8">
          Beschrijf jouw app-idee.
        </p>
        <Link href="/contact" className="inline-flex items-center gap-3 px-6 py-3 bg-primary text-background text-sm font-medium hover:bg-accent transition-colors duration-300">
          Gratis gesprek plannen →
        </Link>
      </FadeIn>
    </div>
  );
}
