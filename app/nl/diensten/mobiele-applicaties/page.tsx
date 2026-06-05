import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/animations/FadeIn";
import { breadcrumbList, service } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Mobiele App Development — iOS & Android",
  description:
    "Mobiele app development voor iOS en Android. Zoyare bouwt apps met native-kwaliteit via React Native/Expo. Eerlijke prijzen, snelle oplevering.",
  alternates: {
    canonical: "https://zoyare.com/nl/diensten/mobiele-applicaties",
    languages: {
      en: "https://zoyare.com/services/mobile-applications",
      nl: "https://zoyare.com/nl/diensten/mobiele-applicaties",
      "x-default": "https://zoyare.com/services/mobile-applications",
    },
  },
  openGraph: {
    title: "Mobiele App Development — Zoyare",
    description:
      "iOS en Android app development met React Native. Eén codebase, native kwaliteit, lagere kosten.",
    url: "https://zoyare.com/nl/diensten/mobiele-applicaties",
    locale: "nl_NL",
  },
};

const jsonLd = [
  service({
    name: "Mobiele App Development",
    description:
      "iOS en Android mobiele applicatie ontwikkeling met React Native en Expo. Van MVP tot volledig platform — inclusief backend, store deployment en OTA updates.",
    path: "/nl/diensten/mobiele-applicaties",
    serviceType: "Mobile App Development",
  }),
  breadcrumbList([
    { name: "Home", path: "/nl" },
    { name: "Diensten", path: "/nl/diensten/mobiele-applicaties" },
    { name: "Mobiele Applicaties", path: "/nl/diensten/mobiele-applicaties" },
  ]),
];

export default function MobieleApplicaties() {
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
          Mobiele
          <br />
          applicaties.
        </h1>
        <p className="text-xl md:text-2xl text-secondary font-light leading-relaxed max-w-2xl">
          iOS en Android apps die daadwerkelijk gebruikt worden. Focus op
          snelheid, betrouwbaarheid en UX — gebouwd met React Native &amp; Expo.
        </p>
      </FadeIn>

      <FadeIn className="mb-24 border-t border-border pt-16">
        <p className="font-mono text-xs text-muted tracking-widest uppercase mb-10">Tech stack</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {[
            { title: "React Native + Expo", text: "Eén codebase voor iOS en Android. Native performance, over-the-air updates, toegang tot alle hardware features." },
            { title: "TypeScript", text: "Type-safe code met minder bugs, makkelijker te onderhouden." },
            { title: "Backend naar keuze", text: "Node.js, Supabase, Firebase of een custom REST API — afhankelijk van je requirements." },
            { title: "App Store + Play Store", text: "Ik regel het volledige deployment proces inclusief App Store review en Play Store publicatie." },
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
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-primary mb-4">
          Heb je een app-idee?
        </h2>
        <p className="text-secondary leading-relaxed max-w-xl mb-8">
          Beschrijf wat je wilt bouwen — ik geef je binnen 24 uur een eerlijke
          inschatting van scope, planning en budget. Geen sales pitch, gewoon duidelijkheid.
        </p>
        <div className="flex items-center gap-6 flex-wrap">
          <a
            href="https://cal.eu/zoyare"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 bg-primary text-background text-sm font-medium hover:bg-accent transition-colors duration-300"
          >
            Plan een gratis 30-min gesprek →
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
