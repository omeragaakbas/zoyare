import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/animations/FadeIn";
import { breadcrumbList, service } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Mobile App Development — iOS & Android",
  description:
    "Mobile app development for iOS and Android. Zoyare builds native-quality apps with React Native/Expo. Honest pricing, fast delivery.",
  alternates: {
    canonical: "https://zoyare.com/services/mobile-applications",
  },
  openGraph: {
    title: "Mobile App Development — Zoyare",
    description:
      "iOS and Android app development with React Native. One codebase, native quality, lower costs.",
    url: "https://zoyare.com/services/mobile-applications",
  },
};

const jsonLd = [
  service({
    name: "Mobile App Development",
    description:
      "iOS and Android mobile application development with React Native and Expo. From MVP to full platform — covering backend, store deployment and OTA updates.",
    path: "/services/mobile-applications",
    serviceType: "Mobile App Development",
  }),
  breadcrumbList([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services/mobile-applications" },
    { name: "Mobile Applications", path: "/services/mobile-applications" },
  ]),
];

export default function MobileApplications() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="pt-32 px-6 md:px-12 pb-24">
      <FadeIn className="mb-20 max-w-4xl">
        <p className="font-mono text-xs text-muted tracking-widest uppercase mb-6">Service</p>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-primary leading-[0.93] mb-8">
          Mobile
          <br />
          applications.
        </h1>
        <p className="text-xl md:text-2xl text-secondary font-light leading-relaxed max-w-2xl">
          iOS and Android apps that actually get used. Focus on
          speed, reliability and UX — built with React Native &amp; Expo.
        </p>
      </FadeIn>

      <FadeIn className="mb-24 border-t border-border pt-16">
        <p className="font-mono text-xs text-muted tracking-widest uppercase mb-10">Tech stack</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {[
            { title: "React Native + Expo", text: "One codebase for iOS and Android. Native performance, over-the-air updates, access to all hardware features." },
            { title: "TypeScript", text: "Type-safe code that produces fewer bugs and is easier to maintain." },
            { title: "Backend of choice", text: "Node.js, Supabase, Firebase or a custom REST API — depending on your requirements." },
            { title: "App Store + Play Store", text: "I handle the full deployment process including App Store review and Play Store publication." },
          ].map((item) => (
            <div key={item.title} className="bg-background p-8 hover:bg-surface transition-colors duration-200">
              <h3 className="text-base font-medium text-primary mb-3">{item.title}</h3>
              <p className="text-sm text-secondary leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </FadeIn>

      <FadeIn className="mb-24 border-t border-border pt-16">
        <p className="font-mono text-xs text-muted tracking-widest uppercase mb-8">Investment</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
          {[
            { range: "€15k – €35k", label: "MVP (6–10 screens)", time: "6–10 weeks" },
            { range: "€35k – €80k", label: "Full app + backend", time: "3–5 months" },
            { range: "€80k+", label: "Complex platform", time: "5–12 months" },
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
        <p className="font-mono text-xs text-muted tracking-widest uppercase mb-6">Next step</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-primary mb-4">
          Have an app idea?
        </h2>
        <p className="text-secondary leading-relaxed max-w-xl mb-8">
          Describe what you want to build — I&apos;ll give you an honest assessment of scope,
          timeline and budget within 24 hours. No sales pitch, just clarity.
        </p>
        <div className="flex items-center gap-6 flex-wrap">
          <a
            href="https://cal.eu/zoyare"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 bg-primary text-background text-sm font-medium hover:bg-accent transition-colors duration-300"
          >
            Book a free 30-min call →
          </a>
          <Link
            href="/contact"
            className="text-sm text-secondary hover:text-primary transition-colors duration-200 underline underline-offset-4"
          >
            Or send a message
          </Link>
        </div>
      </FadeIn>
    </div>
    </>
  );
}
