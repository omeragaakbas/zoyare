import Link from "next/link";
import { projects, services, clients } from "@/lib/content";
import FadeIn from "@/components/animations/FadeIn";
import LeadMagnetSection from "@/components/LeadMagnetSection";
import Marquee from "@/components/Marquee";
import HeroSection from "@/components/HeroSection";
import { ServicesList, ProjectsList, CTASection } from "@/components/HomeSections";
import TestimonialsSection from "@/components/TestimonialsSection";

export default function Home() {
  return (
    <>
      <HeroSection />

      <section className="relative px-6 md:px-12 py-24 border-t border-border">
        <FadeIn className="mb-14">
          <p className="font-mono text-xs text-muted tracking-widest uppercase">
            What I do
          </p>
        </FadeIn>
        <ServicesList services={services} />
      </section>

      <section className="relative px-6 md:px-12 py-24 border-t border-border">
        <FadeIn className="flex justify-between items-end mb-14">
          <p className="font-mono text-xs text-muted tracking-widest uppercase">
            Selected work
          </p>
          <Link
            href="/portfolio"
            className="text-sm text-secondary hover:text-primary transition-colors duration-200"
          >
            View all →
          </Link>
        </FadeIn>
        <ProjectsList projects={projects} />
      </section>

      <TestimonialsSection />

      <section className="relative py-20 border-t border-border">
        <FadeIn className="mb-10 px-6 md:px-12">
          <p className="font-mono text-xs text-muted tracking-widest uppercase">
            Built for
          </p>
        </FadeIn>

        <Marquee duration={40}>
          {clients.concat(clients).map((c, i) => (
            <div
              key={`${c.name}-${i}`}
              className="flex items-center gap-6 px-10 border-r border-border"
            >
              <span className="font-display italic text-3xl md:text-4xl text-primary">
                {c.name}
              </span>
              <span className="font-mono text-[10px] text-muted tracking-widest uppercase">
                {c.detail}
              </span>
            </div>
          ))}
        </Marquee>

        <Marquee duration={50} reverse className="mt-6 opacity-60">
          {clients.concat(clients).map((c, i) => (
            <div
              key={`r-${c.name}-${i}`}
              className="flex items-center gap-4 px-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span className="font-mono text-xs text-muted tracking-widest uppercase">
                {c.detail}
              </span>
            </div>
          ))}
        </Marquee>
      </section>

      <LeadMagnetSection />

      <CTASection />
    </>
  );
}
