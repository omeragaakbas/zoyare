import { about } from "@/lib/content";
import Link from "next/link";
import type { Metadata } from "next";
import FadeIn from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";
import { webPage, breadcrumbList } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "About",
  description:
    "Zoyare is a software engineering studio that builds custom software for businesses — from back-end architecture to enterprise integrations.",
  alternates: {
    canonical: "https://zoyare.com/about",
  },
  openGraph: {
    title: "About Zoyare — Software Engineering Studio",
    description:
      "Zoyare builds custom software for businesses. Direct collaboration, technical depth, from requirement to deployment.",
    url: "https://zoyare.com/about",
  },
};

export default function About() {
  const jsonLd = [
    webPage({
      name: "About Zoyare",
      description: "Zoyare is a software engineering studio that builds custom software for businesses — from back-end architecture to enterprise integrations.",
      path: "/about",
    }),
    breadcrumbList([
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
    ]),
  ];

  return (
    <div className="pt-32 px-6 md:px-12 pb-24">
      {jsonLd.map((ld, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
        />
      ))}
      <FadeIn className="mb-20">
        <p className="font-mono text-xs text-muted tracking-widest uppercase mb-6">About</p>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-primary leading-[0.93]">
          {about.name}
        </h1>
        <p className="text-secondary text-base font-light mt-4 tracking-wide">{about.role}</p>
      </FadeIn>

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

      <div className="mt-24 border-t border-border pt-16">
        <FadeIn className="mb-12">
          <p className="font-mono text-xs text-muted tracking-widest uppercase">Approach</p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
          {[
            {
              num: "01",
              title: "Problem first",
              text: "Building software starts with understanding what you're solving. No assumptions, no overengineering.",
            },
            {
              num: "02",
              title: "Technical depth",
              text: "From database schema to API contract — every component is thoughtfully built, not hastily patched.",
            },
            {
              num: "03",
              title: "Direct contact",
              text: "No layers of project managers. You work directly with the engineer who builds it.",
            },
          ].map((item) => (
            <StaggerItem key={item.num}>
              <div className="bg-background p-10 h-full group hover:bg-surface transition-colors duration-300">
                <span className="numeral-outline font-mono text-6xl font-bold leading-none block mb-8 select-none">
                  {item.num}
                </span>
                <h3 className="text-base font-medium text-primary mb-4">{item.title}</h3>
                <p className="text-sm text-secondary leading-relaxed">{item.text}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      <FadeIn className="mt-24 border-t border-border pt-16">
        <p className="font-mono text-xs text-muted tracking-widest uppercase mb-8">Collaborate</p>
        <Link
          href="/contact"
          className="group inline-flex items-center gap-3 text-3xl md:text-5xl font-bold tracking-tighter text-primary hover:text-accent transition-colors duration-200"
        >
          Let&apos;s <span className="font-display">talk.</span>
          <span className="text-accent transition-transform duration-300 group-hover:translate-x-2">→</span>
        </Link>
      </FadeIn>
    </div>
  );
}
