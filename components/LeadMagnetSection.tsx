"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "@/components/animations/FadeIn";

export default function LeadMagnetSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");

    try {
      const res = await fetch("/api/leadmagnet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="px-6 md:px-12 py-24 border-t border-border">
      <div className="max-w-2xl">
        <FadeIn>
          <p className="font-mono text-xs text-muted tracking-widest uppercase mb-6">
            Free checklist
          </p>
        </FadeIn>

        <FadeIn delay={0.07}>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-primary leading-tight mb-5">
            12 questions you should ask{" "}
            <span className="text-accent">before</span> commissioning custom
            software.
          </h2>
        </FadeIn>

        <FadeIn delay={0.13}>
          <p className="text-secondary text-sm leading-relaxed mb-10 max-w-lg">
            Most software projects don&apos;t fail because of bad code — but
            because of unclear expectations. This checklist helps you ask the
            right questions before the budget is committed.
          </p>
        </FadeIn>

        <FadeIn delay={0.19}>
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-3"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                <p className="font-mono text-xs text-secondary tracking-widest uppercase">
                  Checklist on its way — check your inbox.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-4 items-start"
              >
                <label htmlFor="leadmagnet-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="leadmagnet-email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  spellCheck={false}
                  className="input-line flex-1 min-w-0 max-w-sm"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="group relative px-6 py-3 bg-primary text-background text-sm font-medium overflow-hidden disabled:opacity-50 whitespace-nowrap shrink-0"
                >
                  <motion.span
                    className="absolute inset-0 bg-accent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <span className="relative group-hover:text-white transition-colors duration-300">
                    {status === "loading" ? "Sending..." : "Get it free →"}
                  </span>
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          {status === "error" && (
            <p className="mt-3 font-mono text-xs text-red-400">
              Something went wrong. Email directly at hello@zoyare.com.
            </p>
          )}

          {status !== "success" && (
            <p className="mt-4 font-mono text-xs text-muted">
              No spam. One email. Immediately useful.
            </p>
          )}
        </FadeIn>
      </div>
    </section>
  );
}
