"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import FadeIn from "@/components/animations/FadeIn";
import type { FaqSection } from "@/lib/faqs";

interface Props {
  faqs: FaqSection[];
}

export default function FAQClient({ faqs }: Props) {
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
