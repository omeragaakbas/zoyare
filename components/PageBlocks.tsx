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
      <p className="font-mono text-[10px] text-muted tracking-widest uppercase mt-4">
        Fixed quote after intake — no hourly surprises
      </p>
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
