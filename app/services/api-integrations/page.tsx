import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/animations/FadeIn";

export const metadata: Metadata = {
  title: "API Integrations & System Connections",
  description:
    "Connect your systems via API integration. Zoyare links your ERP, CRM, accounting and custom software so data flows automatically.",
  alternates: { canonical: "https://zoyare.com/services/api-integrations" },
  openGraph: {
    title: "API Integrations — Connect Your Systems | Zoyare",
    description:
      "Stop manually copying data. Zoyare connects your systems via REST APIs and webhooks.",
    url: "https://zoyare.com/services/api-integrations",
  },
};

const systems = [
  "Xero", "HubSpot", "Salesforce", "SAP", "Mendix",
  "Shopify", "Stripe", "Twilio", "Slack", "Custom APIs",
];

export default function ApiIntegrations() {
  return (
    <div className="pt-32 px-6 md:px-12 pb-24">
      <FadeIn className="mb-20 max-w-4xl">
        <p className="font-mono text-xs text-muted tracking-widest uppercase mb-6">Service</p>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-primary leading-[0.93] mb-8">
          API &amp;
          <br />
          Integrations.
        </h1>
        <p className="text-xl md:text-2xl text-secondary font-light leading-relaxed max-w-2xl">
          Systems that don&apos;t talk to each other, connected. No more manual data
          entry — automatic data flows between all your tools.
        </p>
      </FadeIn>

      <FadeIn className="mb-24 border-t border-border pt-16">
        <p className="font-mono text-xs text-muted tracking-widest uppercase mb-10">Systems I connect</p>
        <div className="flex flex-wrap gap-2">
          {systems.map((s) => (
            <span key={s} className="font-mono text-sm text-secondary border border-border px-4 py-2 hover:border-muted hover:text-primary transition-colors duration-200">
              {s}
            </span>
          ))}
        </div>
      </FadeIn>

      <FadeIn className="mb-24 border-t border-border pt-16">
        <p className="font-mono text-xs text-muted tracking-widest uppercase mb-12">What you get</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
          {[
            { title: "Reliable connection", text: "Error handling, retry logic and monitoring so the integration works even when a system goes offline briefly." },
            { title: "Documented code", text: "Full documentation of the data flow, fields and transformation logic. Understandable for any developer." },
            { title: "Maintainable", text: "Clean architecture so when an API changes, the adjustment is minimal." },
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
            { range: "€2.5k – €8k", label: "Simple connection", time: "1–3 weeks" },
            { range: "€8k – €25k", label: "Multi-system integration", time: "3–8 weeks" },
            { range: "€25k+", label: "Enterprise / legacy", time: "2–6 months" },
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
        <p className="text-3xl md:text-4xl font-bold tracking-tighter text-primary mb-8">
          Which systems do you want to connect?
        </p>
        <Link href="/contact" className="inline-flex items-center gap-3 px-6 py-3 bg-primary text-background text-sm font-medium hover:bg-accent transition-colors duration-300">
          Free intake check →
        </Link>
      </FadeIn>
    </div>
  );
}
