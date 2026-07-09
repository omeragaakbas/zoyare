"use client";

import { useState } from "react";
import Link from "next/link";
import { m, AnimatePresence } from "framer-motion";
import { contact } from "@/lib/content";
import { track } from "@/lib/track";

type ServiceKey = "custom" | "api" | "mobile" | "automation";

type Tier = { label: string; detail: string; range: string; time: string };

const SERVICES: { key: ServiceKey; title: string; detail: string }[] = [
  {
    key: "custom",
    title: "Custom software",
    detail: "Internal tools, portals, dashboards — software that fits your process.",
  },
  {
    key: "api",
    title: "API & integrations",
    detail: "Connect systems that don't talk to each other. APIs, connectors, pipelines.",
  },
  {
    key: "mobile",
    title: "Mobile application",
    detail: "iOS and Android apps via React Native, from MVP to full platform.",
  },
  {
    key: "automation",
    title: "Process automation",
    detail: "Automate manual workflows. Fewer errors, less time, more control.",
  },
];

// Ranges match the published tiers on the service pages — keep them in sync.
const TIERS: Record<ServiceKey, Tier[]> = {
  custom: [
    { label: "Small tool", detail: "One focused workflow or automation", range: "€5k – €20k", time: "2–6 weeks" },
    { label: "Mid-sized system", detail: "Multiple workflows, users and roles", range: "€20k – €75k", time: "2–4 months" },
    { label: "Enterprise platform", detail: "Complex domain, many integrations", range: "€75k+", time: "4–12 months" },
  ],
  api: [
    { label: "Simple connection", detail: "Two systems, one direction", range: "€2.5k – €8k", time: "1–3 weeks" },
    { label: "Multi-system integration", detail: "Several systems, transformations", range: "€8k – €25k", time: "3–8 weeks" },
    { label: "Enterprise / legacy", detail: "Complex or undocumented systems", range: "€25k+", time: "2–6 months" },
  ],
  mobile: [
    { label: "MVP", detail: "6–10 screens, core feature set", range: "€15k – €35k", time: "6–10 weeks" },
    { label: "Full app + backend", detail: "Accounts, data, notifications", range: "€35k – €80k", time: "3–5 months" },
    { label: "Complex platform", detail: "Real-time, payments, scale", range: "€80k+", time: "5–12 months" },
  ],
  automation: [
    { label: "Single workflow", detail: "One manual process, automated", range: "€5k – €20k", time: "2–6 weeks" },
    { label: "Connected processes", detail: "Multiple workflows and systems", range: "€20k – €75k", time: "2–4 months" },
    { label: "Organization-wide", detail: "Many teams, many processes", range: "€75k+", time: "4–12 months" },
  ],
};

const TIMELINES = [
  {
    label: "As soon as possible",
    note: "The studio is currently available — a project can usually start within 1–2 weeks of a signed quote.",
  },
  {
    label: "Next 1–3 months",
    note: "Good timing. Starting the intake now means the discovery work is done before the build begins.",
  },
  {
    label: "Just exploring",
    note: "No pressure. An intake call is free and gives you a realistic picture to plan with — no strings attached.",
  },
];

const stepVariants = {
  enter: { opacity: 0, y: 16 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

function OptionCard({
  title,
  detail,
  meta,
  onClick,
}: {
  title: string;
  detail: string;
  meta?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group text-left border border-border bg-background p-6 md:p-7 hover:border-accent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="text-base font-medium text-primary group-hover:text-accent transition-colors duration-200">
          {title}
        </h3>
        <span
          className="text-accent opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
          aria-hidden="true"
        >
          →
        </span>
      </div>
      <p className="text-sm text-secondary leading-relaxed">{detail}</p>
      {meta && (
        <p className="font-mono text-xs text-muted mt-4 tracking-wide">{meta}</p>
      )}
    </button>
  );
}

export default function EstimateWizard() {
  const [service, setService] = useState<ServiceKey | null>(null);
  const [tier, setTier] = useState<Tier | null>(null);
  const [timeline, setTimeline] = useState<(typeof TIMELINES)[number] | null>(null);

  const step = service === null ? 0 : tier === null ? 1 : timeline === null ? 2 : 3;

  function back() {
    if (step === 1) setService(null);
    else if (step === 2) setTier(null);
    else if (step === 3) setTimeline(null);
  }

  function reset() {
    setService(null);
    setTier(null);
    setTimeline(null);
  }

  const stepLabels = ["What are we building?", "What scale?", "When do you want to start?"];

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-accent tracking-widest tabular-nums">
            {String(Math.min(step + 1, 3)).padStart(2, "0")} / 03
          </span>
          <span className="hidden sm:flex items-center gap-1.5" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`h-px w-8 transition-colors duration-300 ${
                  i <= Math.min(step, 2) ? "bg-accent" : "bg-border"
                }`}
              />
            ))}
          </span>
        </div>
        {step > 0 && step < 3 && (
          <button
            type="button"
            onClick={back}
            className="font-mono text-xs text-muted tracking-widest uppercase hover:text-primary transition-colors duration-200"
          >
            ← Back
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <m.div
            key="step-0"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-primary mb-8">
              {stepLabels[0]}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
              {SERVICES.map((s) => (
                <OptionCard
                  key={s.key}
                  title={s.title}
                  detail={s.detail}
                  onClick={() => setService(s.key)}
                />
              ))}
            </div>
          </m.div>
        )}

        {step === 1 && service && (
          <m.div
            key="step-1"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-primary mb-8">
              {stepLabels[1]}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border">
              {TIERS[service].map((t) => (
                <OptionCard
                  key={t.label}
                  title={t.label}
                  detail={t.detail}
                  meta={t.time}
                  onClick={() => setTier(t)}
                />
              ))}
            </div>
          </m.div>
        )}

        {step === 2 && (
          <m.div
            key="step-2"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-primary mb-8">
              {stepLabels[2]}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border">
              {TIMELINES.map((t) => (
                <OptionCard
                  key={t.label}
                  title={t.label}
                  detail={t.note}
                  onClick={() => {
                    setTimeline(t);
                    track("estimate_completed", {
                      service: service ?? "",
                      tier: tier?.label ?? "",
                      timeline: t.label,
                    });
                  }}
                />
              ))}
            </div>
          </m.div>
        )}

        {step === 3 && service && tier && timeline && (
          <m.div
            key="result"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="border border-border bg-background">
              <div className="p-8 md:p-12 border-b border-border">
                <p className="font-mono text-xs text-muted tracking-widest uppercase mb-6">
                  Indication — {SERVICES.find((s) => s.key === service)?.title} · {tier.label}
                </p>
                <p className="font-display not-italic text-5xl md:text-7xl text-primary mb-4">
                  {tier.range}
                </p>
                <p className="font-mono text-sm text-secondary">
                  Typical timeline: {tier.time}
                </p>
              </div>

              <div className="p-8 md:p-12 border-b border-border">
                <p className="text-sm text-secondary leading-relaxed max-w-xl">
                  {timeline.note}
                </p>
              </div>

              <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { num: "01", text: "Free 30-minute intake call — problem, context, feasibility." },
                  { num: "02", text: "A fixed quote within 48 hours: scope, timeline, price." },
                  { num: "03", text: "No surprises: the quote is the price. Change requests are always discussed first." },
                ].map((item) => (
                  <div key={item.num}>
                    <span className="numeral-outline font-mono text-4xl font-bold leading-none block mb-4 select-none">
                      {item.num}
                    </span>
                    <p className="text-sm text-secondary leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <p className="font-mono text-[10px] text-muted tracking-widest uppercase mt-4 mb-10">
              Indication only — a fixed quote follows the free intake
            </p>

            <div className="flex items-center gap-6 flex-wrap">
              <a
                href={contact.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("book_call_click", { source: "estimate" })}
                className="inline-flex items-center gap-3 px-7 py-3.5 bg-primary text-background text-sm font-medium hover:bg-accent transition-colors duration-300"
              >
                Book the free intake call →
              </a>
              <Link
                href={`/contact?service=${encodeURIComponent(
                  SERVICES.find((s) => s.key === service)?.title ?? ""
                )}&tier=${encodeURIComponent(tier.label)}&range=${encodeURIComponent(tier.range)}`}
                className="text-sm text-secondary hover:text-primary transition-colors duration-200 underline underline-offset-4"
              >
                Or send a message
              </Link>
              <button
                type="button"
                onClick={reset}
                className="font-mono text-xs text-muted tracking-widest uppercase hover:text-primary transition-colors duration-200"
              >
                Start over
              </button>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
