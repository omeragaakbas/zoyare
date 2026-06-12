"use client";

import Link from "next/link";
import { m } from "framer-motion";
import { contact } from "@/lib/content";
import SplitText from "@/components/SplitText";
import MagneticButton from "@/components/MagneticButton";
import FloatingShape from "@/components/FloatingShape";
import Counter from "@/components/Counter";
import { dict } from "@/lib/dictionary";

export default function HeroSection() {
  const d = dict.home;

  return (
    <section className="relative min-h-screen flex flex-col justify-end px-6 md:px-12 pb-20 pt-32 overflow-hidden">
      <FloatingShape />

      <div className="relative max-w-5xl">
        <m.div
          className="inline-flex items-center gap-2 mb-10 border border-border bg-background/40 backdrop-blur-sm px-3 py-1.5"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-xs text-muted tracking-widest uppercase">
            {d.badge}
          </span>
        </m.div>

        <m.div
          className="flex flex-wrap items-center gap-x-8 gap-y-3 mb-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="flex items-baseline gap-2">
            <Counter
              to={4}
              pad={2}
              className="font-mono text-2xl text-primary tabular-nums"
            />
            <span className="font-mono text-[10px] text-muted tracking-widest uppercase">
              {d.activeProjects}
            </span>
          </div>
          <span className="w-px h-6 bg-border hidden md:block" />
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-2xl text-primary tabular-nums">
              100%
            </span>
            <span className="font-mono text-[10px] text-muted tracking-widest uppercase">
              {d.custom}
            </span>
          </div>
          <span className="w-px h-6 bg-border hidden md:block" />
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-2xl text-primary tabular-nums">
              {d.estimated}
            </span>
            <span className="font-mono text-[10px] text-muted tracking-widest uppercase">
              2024
            </span>
          </div>
        </m.div>

        <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter text-primary leading-[0.95] mb-10">
          <span className="block">
            <SplitText delay={0.05}>{d.headlineLine1}</SplitText>
          </span>
          <span className="block">
            <SplitText delay={0.2}>{d.headlineLine2}</SplitText>
          </span>
          <span className="block">
            <SplitText
              delay={0.35}
              className="font-display italic text-accent"
            >
              {d.headlineLine3}
            </SplitText>
            <m.span
              className="inline-block w-[3px] h-[0.78em] bg-accent ml-2 align-middle"
              animate={{ opacity: [1, 0] }}
              transition={{
                duration: 0.75,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear",
              }}
            />
          </span>
        </h1>

        <m.p
          className="text-secondary text-lg md:text-xl max-w-lg leading-relaxed mb-12 font-light"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {d.subtitle}
        </m.p>

        <m.div
          className="flex items-center gap-6 flex-wrap"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.85,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <MagneticButton>
            <Link
              href="/portfolio"
              data-magnetic
              className="group relative inline-flex items-center gap-3 px-7 py-3.5 bg-primary text-background text-sm font-medium overflow-hidden"
            >
              <m.span
                className="absolute inset-0 bg-accent"
                initial={{ y: "100%" }}
                whileHover={{ y: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              />
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                {d.viewWork}
              </span>
              <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </Link>
          </MagneticButton>

          <MagneticButton strength={0.25}>
            <a
              href={contact.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic
              className="text-sm text-secondary hover:text-primary transition-colors duration-200 underline underline-offset-4"
            >
              {d.scheduleCall}
            </a>
          </MagneticButton>
        </m.div>
      </div>

      <m.div
        className="mt-24 flex items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.0 }}
      >
        <m.div
          className="h-px bg-muted"
          initial={{ width: 0 }}
          animate={{ width: 48 }}
          transition={{
            duration: 0.6,
            delay: 1.1,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
        <m.span
          className="font-mono text-xs text-muted tracking-widest uppercase"
          animate={{ y: [0, 3, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          {d.scroll}
        </m.span>
      </m.div>
    </section>
  );
}
