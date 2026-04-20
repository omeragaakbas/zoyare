"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import FadeIn from "@/components/animations/FadeIn";

const faqs = [
  {
    category: "Cost & Timeline",
    items: [
      {
        q: "What does custom software cost?",
        a: "It depends on the complexity. As a guideline: a small automation or tool costs €5,000–€20,000 (2–6 weeks). A mid-sized system with API integrations €20,000–€75,000 (2–4 months). An enterprise platform or mobile app €75,000+ (4–12 months). I always give an honest estimate after a free conversation — no hidden costs afterward.",
      },
      {
        q: "How long does a typical project take?",
        a: "A simple automation: 2–6 weeks. An API integration: 2–8 weeks. A mobile app or larger system: 3–6 months for a solid MVP. I work in sprints so you can course-correct early — no waiting 6 months for one big delivery.",
      },
      {
        q: "Do you work with fixed price or hourly rate?",
        a: "Both are possible, depending on the project. For clearly scoped projects I prefer a fixed price — that gives you certainty. For ongoing collaboration or projects with an unclear scope, an hourly rate is fairer. I always lay this out upfront.",
      },
      {
        q: "What's the minimum project size?",
        a: "There's no strict minimum, but for projects under €3,000 custom work is rarely the smartest choice. Then there are better alternatives (no-code tools, existing SaaS). If I think a standard solution is a better fit, I'll say so.",
      },
    ],
  },
  {
    category: "Collaboration & Process",
    items: [
      {
        q: "What does the first conversation look like?",
        a: "A 30-minute call, free and no strings attached. No sales pitch. We discuss your problem, the current process and what you want to achieve. Then I give honest advice: whether custom work is the right solution, how I'd approach it and a rough price indication.",
      },
      {
        q: "Do you work alone or with a team?",
        a: "I work as a solo engineer — that's by design. No PM layer, no passing work to juniors. You work directly with the person writing the code. For specific components (design, security audit) I bring in selected specialists, but responsibility and direction always stay with me.",
      },
      {
        q: "How does communication work during a project?",
        a: "Weekly updates, direct access via email or chat, and sprint reviews where you see progress before it's delivered. I don't believe in months of silence followed by one big delivery. You always know what's being built and why.",
      },
      {
        q: "Can you extend or rebuild existing software?",
        a: "Yes. I first look at what's there — code review, architecture, documentation. Then I give an honest assessment: continue building or start fresh. Sometimes a restart is cheaper in the long run. I give that assessment without commercial bias.",
      },
    ],
  },
  {
    category: "Technology & Delivery",
    items: [
      {
        q: "Which technologies do you use?",
        a: "For back-end and APIs: Node.js, TypeScript, PostgreSQL, REST. For mobile apps: React Native via Expo. For enterprise integrations: Java, Mendix, REST APIs. For web: Next.js, React. I choose the technology that fits the problem — not whatever happens to be my favorite.",
      },
      {
        q: "Who manages the software after delivery?",
        a: "We agree on that upfront. Options: you (I deliver full documentation and source code), an internal team, or me via a maintenance contract. I always ensure a handover where any competent developer can continue — no vendor lock-in.",
      },
      {
        q: "Do I get the source code?",
        a: "Always. The source code is fully yours. You're never dependent on me for access to your own software.",
      },
      {
        q: "How do you handle testing and quality?",
        a: "Automated tests are a standard part of my deliveries, not an extra option. I also provide a staging environment so you can test before anything goes live. Bugs that surface after delivery and trace back to my code get fixed.",
      },
    ],
  },
  {
    category: "Specific Situations",
    items: [
      {
        q: "I'm not sure if I need custom software. What then?",
        a: "Schedule a free call. I'll help you objectively assess whether custom work is the right choice. If a no-code tool or SaaS package is a better fit for your situation, I'll say so honestly — even if it means I don't get the project.",
      },
      {
        q: "Do you work with NDAs and confidentiality agreements?",
        a: "Yes. For sensitive projects I sign an NDA by default before we discuss specifics. That's standard and no problem at all.",
      },
      {
        q: "Can Zoyare support enterprise procurement processes?",
        a: "Yes. I have experience with enterprise procurement processes (including Siemens) and can provide the required documentation. Get in touch for the specific requirements of your organization.",
      },
    ],
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<string | null>(null);

  function toggle(key: string) {
    setOpen((prev) => (prev === key ? null : key));
  }

  return (
    <div className="pt-32 px-6 md:px-12 pb-32">
      <FadeIn className="mb-20">
        <p className="font-mono text-xs text-muted tracking-widest uppercase mb-6">FAQ</p>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-primary leading-[0.93] max-w-2xl">
          Frequently
          <br />
          <span className="text-accent">asked.</span>
        </h1>
      </FadeIn>

      <div className="border-t border-border">
        {faqs.map((section, si) => (
          <FadeIn key={section.category} delay={si * 0.05}>
            <div className="py-16 border-b border-border grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-3">
                <p className="font-mono text-xs text-muted tracking-widest uppercase sticky top-24">
                  {section.category}
                </p>
              </div>

              <div className="lg:col-span-8 lg:col-start-5 flex flex-col divide-y divide-border">
                {section.items.map((item, ii) => {
                  const key = `${si}-${ii}`;
                  const isOpen = open === key;

                  return (
                    <div key={key}>
                      <button
                        onClick={() => toggle(key)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-answer-${key}`}
                        className="w-full flex items-start justify-between gap-6 py-6 text-left group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-sm"
                      >
                        <span
                          className={`text-base font-medium leading-snug transition-colors duration-200 ${
                            isOpen ? "text-accent" : "text-primary group-hover:text-accent"
                          }`}
                        >
                          {item.q}
                        </span>
                        <motion.span
                          animate={{ rotate: isOpen ? 45 : 0 }}
                          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                          aria-hidden="true"
                          className={`shrink-0 text-xl leading-none mt-0.5 transition-colors duration-200 ${
                            isOpen ? "text-accent" : "text-muted group-hover:text-primary"
                          }`}
                        >
                          +
                        </motion.span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            key="answer"
                            id={`faq-answer-${key}`}
                            role="region"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="text-secondary text-sm leading-relaxed pb-6 max-w-2xl">
                              {item.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn className="pt-20 max-w-xl">
        <p className="font-mono text-xs text-muted tracking-widest uppercase mb-6">
          Question not listed?
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-primary leading-tight mb-8">
          Ask directly.
        </h2>
        <Link
          href="/contact"
          className="group relative inline-flex items-center gap-3 px-6 py-3 bg-primary text-background text-sm font-medium overflow-hidden"
        >
          <motion.span
            className="absolute inset-0 bg-accent"
            initial={{ x: "-100%" }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
          <span className="relative group-hover:text-white transition-colors duration-300">
            Get in touch →
          </span>
        </Link>
      </FadeIn>
    </div>
  );
}
