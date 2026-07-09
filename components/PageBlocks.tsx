import Link from "next/link";
import FadeIn from "@/components/animations/FadeIn";

/**
 * Shared editorial blocks for inner pages. Server components — no client JS.
 */

export type Tier = { range: string; label: string; time: string };

export function InvestmentTiers({ tiers, highlight = 1 }: { tiers: Tier[]; highlight?: number }) {
  return (
    <FadeIn className="mb-24 border-t border-border pt-16">
      <p className="font-mono text-xs text-muted tracking-widest uppercase mb-10">Investment</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
        {tiers.map((tier, i) => {
          const featured = i === highlight;
          return (
            <div
              key={tier.label}
              className={`relative p-8 md:p-10 transition-colors duration-200 ${
                featured
                  ? "bg-primary text-background"
                  : "bg-background hover:bg-surface"
              }`}
            >
              {featured && (
                <span className="absolute right-6 top-6 font-mono text-[10px] tracking-widest uppercase text-accent">
                  Most projects
                </span>
              )}
              <span
                className={`font-display block text-3xl md:text-4xl mb-4 not-italic ${
                  featured ? "text-accent" : "text-primary"
                }`}
              >
                {tier.range}
              </span>
              <p className={`text-sm font-medium mb-1 ${featured ? "text-background" : "text-primary"}`}>
                {tier.label}
              </p>
              <p className={`font-mono text-xs ${featured ? "text-background/60" : "text-muted"}`}>
                {tier.time}
              </p>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-between gap-4 flex-wrap mt-4">
        <p className="font-mono text-[10px] text-muted tracking-widest uppercase">
          Fixed quote after intake — no hourly surprises
        </p>
        <Link
          href="/estimate"
          className="font-mono text-[10px] text-accent tracking-widest uppercase hover:text-primary transition-colors duration-200"
        >
          Get an instant estimate →
        </Link>
      </div>
    </FadeIn>
  );
}

export type QA = { q: string; a: string };

/** Zero-JS FAQ block — native <details>, matches the /faq page look. */
export function ServiceFaq({ items }: { items: QA[] }) {
  return (
    <FadeIn className="mb-24 border-t border-border pt-16">
      <p className="font-mono text-xs text-muted tracking-widest uppercase mb-10">
        Common questions
      </p>
      <div className="max-w-3xl flex flex-col divide-y divide-border border-b border-border">
        {items.map((item) => (
          <details key={item.q} className="group py-6">
            <summary className="flex items-start justify-between gap-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden text-base font-medium leading-snug text-primary hover:text-accent transition-colors duration-200">
              {item.q}
              <span
                className="shrink-0 text-xl leading-none mt-0.5 text-muted group-open:rotate-45 group-open:text-accent transition-transform duration-200"
                aria-hidden="true"
              >
                +
              </span>
            </summary>
            <p className="text-secondary text-sm leading-relaxed pt-4 max-w-2xl">
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </FadeIn>
  );
}

/** Single client quote — social proof on the page where the decision happens. */
export function PullQuote({
  quote,
  name,
  company,
}: {
  quote: string;
  name: string;
  company: string;
}) {
  return (
    <FadeIn className="mb-24 border-t border-border pt-16">
      <blockquote className="max-w-3xl">
        <p className="font-display text-2xl md:text-3xl text-primary/85 leading-snug mb-6">
          &ldquo;{quote}&rdquo;
        </p>
        <footer className="flex items-center gap-3">
          <span className="w-6 h-px bg-accent" aria-hidden="true" />
          <cite className="not-italic text-sm text-secondary">
            {name},{" "}
            <span className="font-mono text-xs text-muted tracking-widest uppercase">
              {company}
            </span>
          </cite>
        </footer>
      </blockquote>
    </FadeIn>
  );
}

export type Step = { num: string; title: string; text: string };

export function StepRail({ steps, label = "Process" }: { steps: Step[]; label?: string }) {
  return (
    <FadeIn className="mb-24 border-t border-border pt-16">
      <p className="font-mono text-xs text-muted tracking-widest uppercase mb-12">{label}</p>
      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12 ${
          steps.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
        }`}
      >
        {steps.map((step, i) => (
          <div key={step.num} className="relative">
            <div className="flex items-baseline gap-4 mb-5">
              <span className="numeral-outline font-mono text-6xl font-bold leading-none select-none">
                {step.num}
              </span>
              {i < steps.length - 1 && (
                <span className="hidden lg:block flex-1 h-px bg-border translate-y-[-0.8rem]" />
              )}
            </div>
            <h3 className="text-base font-medium text-primary mb-3">{step.title}</h3>
            <p className="text-sm text-secondary leading-relaxed">{step.text}</p>
          </div>
        ))}
      </div>
    </FadeIn>
  );
}
