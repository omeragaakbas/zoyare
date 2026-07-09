import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/animations/FadeIn";
import { InvestmentTiers, ServiceFaq, PullQuote } from "@/components/PageBlocks";
import { breadcrumbList, service, faqPage } from "@/lib/jsonld";
import { testimonials } from "@/lib/content";

export const metadata: Metadata = {
  title: "API Integrations & System Connections",
  description:
    "Connect your systems via API integration. Zoyare links your ERP, CRM, accounting and custom software so data flows automatically.",
  alternates: {
    canonical: "https://zoyare.com/services/api-integrations",
  },
  openGraph: {
    title: "API Integrations — Connect Your Systems | Zoyare",
    description:
      "Stop manually copying data. Zoyare connects your systems via REST APIs and webhooks.",
    url: "https://zoyare.com/services/api-integrations",
  },
};

const faq = [
  {
    q: "Can you connect systems that don't have an API?",
    a: "Often, yes. There's usually another route: database access, file exports, scheduled reports or e-mail parsing. During the intake I'll assess what's technically possible — and tell you honestly when a connection isn't worth building.",
  },
  {
    q: "What happens when one of the connected systems changes its API?",
    a: "Integrations are built in layers, so a change in one system means a small, isolated fix — not a rebuild. Error handling and monitoring flag issues early, and a maintenance agreement can cover adjustments if you want them handled for you.",
  },
  {
    q: "How do you handle data security in an integration?",
    a: "Authentication via OAuth 2.0 or API keys with minimal permissions, encrypted connections, and no data stored outside your systems unless the design requires it. For sensitive projects an NDA is standard before we discuss specifics.",
  },
  {
    q: "How long does an integration project take?",
    a: "A simple one-way connection: 1–3 weeks. Multi-system integrations with transformations: 3–8 weeks. Enterprise or legacy systems with limited documentation take longer — you'll get a realistic estimate after the intake, not an optimistic one.",
  },
];

const jsonLd = [
  faqPage(faq),
  service({
    name: "API & System Integrations",
    description:
      "API integration and system connection development. REST APIs, webhooks, ETL flows and platform connectors so your tools share data automatically.",
    path: "/services/api-integrations",
    serviceType: "API Integration",
  }),
  breadcrumbList([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services/api-integrations" },
    { name: "API & Integrations", path: "/services/api-integrations" },
  ]),
];

const systems = [
  "Xero", "HubSpot", "Salesforce", "SAP", "Mendix",
  "Shopify", "Stripe", "Twilio", "Slack", "Custom APIs",
];

export default function ApiIntegrations() {
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
          API &amp;
          <br />
          <span className="font-display">integrations.</span>
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

      <InvestmentTiers
        tiers={[
          { range: "€2.5k – €8k", label: "Simple connection", time: "1–3 weeks" },
          { range: "€8k – €25k", label: "Multi-system integration", time: "3–8 weeks" },
          { range: "€25k+", label: "Enterprise / legacy", time: "2–6 months" },
        ]}
      />

      <PullQuote
        quote={testimonials[0].quote}
        name={testimonials[0].name}
        company={testimonials[0].company}
      />

      <ServiceFaq items={faq} />

      <FadeIn className="border-t border-border pt-16">
        <p className="font-mono text-xs text-muted tracking-widest uppercase mb-6">Next step</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-primary mb-4">
          Which systems do you want to connect?
        </h2>
        <p className="text-secondary leading-relaxed max-w-xl mb-8">
          Tell me which tools you&apos;re using and what data needs to flow between them.
          I&apos;ll send you a feasibility assessment within 24 hours — no strings attached.
        </p>
        <div className="flex items-center gap-6 flex-wrap">
          <a
            href="https://cal.eu/zoyare"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 bg-primary text-background text-sm font-medium hover:bg-accent transition-colors duration-300"
          >
            Book a free intake call →
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
