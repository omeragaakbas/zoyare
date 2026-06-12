import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/animations/FadeIn";
import { InvestmentTiers, StepRail } from "@/components/PageBlocks";
import { breadcrumbList, service } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Custom Software Development",
  description:
    "Zoyare builds custom software for businesses. From requirement to deployment — no off-the-shelf solutions, but software that fits your process.",
  alternates: {
    canonical: "https://zoyare.com/services/custom-software",
  },
  openGraph: {
    title: "Custom Software Development — Zoyare",
    description:
      "Custom software development for businesses that need more than standard SaaS. From requirement to deployment.",
    url: "https://zoyare.com/services/custom-software",
  },
};

const jsonLd = [
  service({
    name: "Custom Software Development",
    description:
      "End-to-end custom software development — from requirement gathering and architecture to deployment and handover. For businesses that need more than off-the-shelf solutions.",
    path: "/services/custom-software",
    serviceType: "Custom Software Development",
  }),
  breadcrumbList([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services/custom-software" },
    { name: "Custom Software", path: "/services/custom-software" },
  ]),
];

const steps = [
  { num: "01", title: "Discovery", text: "Understanding the problem before the first line of code. Process, pain points, desired outcome." },
  { num: "02", title: "Architecture", text: "Technical choices that scale. Database design, API structure, deployment strategy." },
  { num: "03", title: "Iterative building", text: "Working in sprints. Early feedback, no surprises at delivery." },
  { num: "04", title: "Delivery", text: "Documented code, tests, handover. So you can continue with any developer afterward." },
];

const useCases = [
  "Internal tools and dashboards",
  "Process automation",
  "Client or employee portals",
  "Integrations with existing systems",
  "Data pipelines and reporting software",
  "Replacing manual spreadsheet processes",
];

export default function CustomSoftware() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="pt-32 px-6 md:px-12 pb-24">
      <FadeIn className="mb-20 max-w-4xl">
        <p className="font-mono text-xs text-muted tracking-widest uppercase mb-6">
          Service
        </p>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-primary leading-[0.93] mb-8">
          Custom
          <br />
          <span className="font-display">software.</span>
        </h1>
        <p className="text-xl md:text-2xl text-secondary font-light leading-relaxed max-w-2xl">
          Software that fits your process, not the other way around. From requirement to
          deployment — without layers of project managers.
        </p>
      </FadeIn>

      <FadeIn className="mb-24 border-t border-border pt-16">
        <p className="font-mono text-xs text-muted tracking-widest uppercase mb-10">
          When is this the solution?
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

      <StepRail steps={steps} />

      <InvestmentTiers
        tiers={[
          { range: "€5k – €20k", label: "Small automation", time: "2–6 weeks" },
          { range: "€20k – €75k", label: "Mid-sized system", time: "2–4 months" },
          { range: "€75k+", label: "Enterprise platform", time: "4–12 months" },
        ]}
      />

      <FadeIn className="border-t border-border pt-16">
        <p className="font-mono text-xs text-muted tracking-widest uppercase mb-6">Next step</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-primary mb-4">
          Have a process that needs better software?
        </h2>
        <p className="text-secondary leading-relaxed max-w-xl mb-8">
          Tell me what you&apos;re dealing with — I&apos;ll let you know within 24 hours whether
          custom software is the right solution, what it would look like and what it would cost.
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
