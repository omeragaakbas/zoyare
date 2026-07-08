import Link from "next/link";
import { projects, clients } from "@/lib/content";
import FadeIn from "@/components/animations/FadeIn";
import LeadMagnetSection from "@/components/LeadMagnetSection";
import Marquee from "@/components/Marquee";
import HeroSection from "@/components/HeroSection";
import { ServicesList, ProjectsList, CTASection } from "@/components/HomeSections";
import TestimonialsSection from "@/components/TestimonialsSection";
import { dict as d } from "@/lib/dictionary";

export default function Home() {

  return (
    <>
      <HeroSection />

      <section className="relative px-6 md:px-12 py-24 border-t border-border">
        <FadeIn className="mb-14">
          <p className="font-mono text-xs text-muted tracking-widest uppercase">
            {d.home.whatIdo}
          </p>
        </FadeIn>
        <ServicesList services={d.services.items} />
      </section>

      <section className="relative px-6 md:px-12 py-24 border-t border-border">
        <FadeIn className="flex justify-between items-end mb-14">
          <p className="font-mono text-xs text-muted tracking-widest uppercase">
            How it works
          </p>
          <Link
            href="/estimate"
            className="text-sm text-secondary hover:text-primary transition-colors duration-200"
          >
            Get an estimate →
          </Link>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12">
          {[
            { num: "01", title: "Intake", text: "A free 30-minute call to understand the problem — no pitch, no obligations." },
            { num: "02", title: "Proposal", text: "A fixed quote within 48 hours: scope, timeline and price. No hourly surprises." },
            { num: "03", title: "Build", text: "Short sprints with working software early. You talk directly to the engineer." },
            { num: "04", title: "Handover", text: "Documented code, tests and full ownership. Continue with anyone, anytime." },
          ].map((step, i) => (
            <FadeIn key={step.num} delay={i * 0.07}>
              <div className="flex items-baseline gap-4 mb-5">
                <span className="numeral-outline font-mono text-6xl font-bold leading-none select-none">
                  {step.num}
                </span>
                {i < 3 && (
                  <span className="hidden lg:block flex-1 h-px bg-border translate-y-[-0.8rem]" />
                )}
              </div>
              <h3 className="text-base font-medium text-primary mb-3">{step.title}</h3>
              <p className="text-sm text-secondary leading-relaxed">{step.text}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="relative px-6 md:px-12 py-24 border-t border-border">
        <FadeIn className="flex justify-between items-end mb-14">
          <p className="font-mono text-xs text-muted tracking-widest uppercase">
            {d.home.selectedWork}
          </p>
          <Link
            href="/portfolio"
            className="text-sm text-secondary hover:text-primary transition-colors duration-200"
          >
            {d.home.viewAll}
          </Link>
        </FadeIn>
        <ProjectsList projects={projects} />
      </section>

      <TestimonialsSection />

      <section className="relative py-20 border-t border-border">
        <FadeIn className="mb-10 px-6 md:px-12">
          <p className="font-mono text-xs text-muted tracking-widest uppercase">
            {d.home.builtFor}
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
