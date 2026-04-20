"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { projects, services, clients, contact } from "@/lib/content";
import FadeIn from "@/components/animations/FadeIn";
import LeadMagnetSection from "@/components/LeadMagnetSection";
import SplitText from "@/components/SplitText";
import MagneticButton from "@/components/MagneticButton";
import FloatingShape from "@/components/FloatingShape";
import Counter from "@/components/Counter";
import Marquee from "@/components/Marquee";

export default function Home() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative min-h-screen flex flex-col justify-end px-6 md:px-12 pb-20 pt-32 overflow-hidden">
        <FloatingShape />

        <div className="relative max-w-5xl">
          <motion.div
            className="inline-flex items-center gap-2 mb-10 border border-border bg-background/40 backdrop-blur-sm px-3 py-1.5"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-xs text-muted tracking-widest uppercase">
              Available for projects
            </span>
          </motion.div>

          <motion.div
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
                Active projects
              </span>
            </div>
            <span className="w-px h-6 bg-border hidden md:block" />
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-2xl text-primary tabular-nums">
                100%
              </span>
              <span className="font-mono text-[10px] text-muted tracking-widest uppercase">
                Custom
              </span>
            </div>
            <span className="w-px h-6 bg-border hidden md:block" />
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-2xl text-primary tabular-nums">
                EST.
              </span>
              <span className="font-mono text-[10px] text-muted tracking-widest uppercase">
                2024
              </span>
            </div>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter text-primary leading-[0.95] mb-10">
            <span className="block">
              <SplitText delay={0.2}>Software</SplitText>
            </span>
            <span className="block">
              <SplitText delay={0.45}>built to</SplitText>
            </span>
            <span className="block">
              <SplitText
                delay={0.75}
                className="font-display italic text-accent"
              >
                scale.
              </SplitText>
              <motion.span
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

          <motion.p
            className="text-secondary text-lg md:text-xl max-w-lg leading-relaxed mb-12 font-light"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 1.4,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            Custom software and mobile applications for businesses that need
            more than off-the-shelf solutions.
          </motion.p>

          <motion.div
            className="flex items-center gap-6 flex-wrap"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 1.55,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <MagneticButton>
              <Link
                href="/portfolio"
                data-magnetic
                className="group relative inline-flex items-center gap-3 px-7 py-3.5 bg-primary text-background text-sm font-medium overflow-hidden"
              >
                <motion.span
                  className="absolute inset-0 bg-accent"
                  initial={{ y: "100%" }}
                  whileHover={{ y: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                />
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                  View work
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
                Schedule a call
              </a>
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          className="mt-24 flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          <motion.div
            className="h-px bg-muted"
            initial={{ width: 0 }}
            animate={{ width: 48 }}
            transition={{
              duration: 0.8,
              delay: 1.9,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
          <motion.span
            className="font-mono text-xs text-muted tracking-widest uppercase"
            animate={{ y: [0, 3, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            Scroll
          </motion.span>
        </motion.div>
      </section>

      {/* ─── Services ─── */}
      <section className="relative px-6 md:px-12 py-24 border-t border-border">
        <FadeIn className="mb-14">
          <p className="font-mono text-xs text-muted tracking-widest uppercase">
            What I do
          </p>
        </FadeIn>

        <div>
          {services.map((service, i) => (
            <FadeIn key={service.title} delay={i * 0.07}>
              <Link href={service.href}>
                <motion.div
                  className="group grid grid-cols-12 items-start gap-4 md:gap-6 py-8 border-b border-border cursor-pointer relative"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.25 }}
                >
                  <motion.span
                    className="absolute left-0 top-0 bottom-0 w-px bg-accent origin-top opacity-0 group-hover:opacity-100"
                    initial={{ scaleY: 0 }}
                    whileHover={{ scaleY: 1 }}
                    transition={{ duration: 0.3 }}
                  />

                  <div className="col-span-2 md:col-span-1 pt-0.5">
                    <span className="font-mono text-sm text-border group-hover:text-accent transition-colors duration-300">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="col-span-10 md:col-span-4">
                    <h3 className="text-base md:text-lg font-medium text-primary group-hover:text-accent transition-colors duration-300 leading-snug">
                      {service.title}
                    </h3>
                  </div>

                  <div className="col-span-12 md:col-span-6 pl-[calc(16.67%)] md:pl-0">
                    <p className="text-sm text-secondary leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="hidden md:flex col-span-1 justify-end items-start pt-0.5">
                    <span
                      className="text-accent text-sm opacity-0 -translate-x-2
                                 group-hover:opacity-100 group-hover:translate-x-0
                                 transition-all duration-300"
                    >
                      →
                    </span>
                  </div>
                </motion.div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ─── Selected work ─── */}
      <section className="relative px-6 md:px-12 py-24 border-t border-border">
        <FadeIn className="flex justify-between items-end mb-14">
          <p className="font-mono text-xs text-muted tracking-widest uppercase">
            Selected work
          </p>
          <Link
            href="/portfolio"
            className="text-sm text-secondary hover:text-primary transition-colors duration-200"
          >
            View all →
          </Link>
        </FadeIn>

        <div className="flex flex-col divide-y divide-border">
          {projects.map((project, i) => (
            <FadeIn key={project.id} delay={i * 0.06} direction="left">
              <motion.div
                className="group grid grid-cols-12 gap-4 md:gap-6 py-7 cursor-default relative"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.22 }}
              >
                <motion.span
                  className="absolute left-0 top-0 bottom-0 w-px bg-accent origin-top"
                  initial={{ scaleY: 0 }}
                  whileHover={{ scaleY: 1 }}
                  transition={{ duration: 0.25 }}
                />

                <div className="col-span-1 flex items-start pt-1">
                  <span className="font-mono text-xs text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="col-span-3 flex items-start pt-1">
                  <span className="font-mono text-xs text-muted tracking-widest uppercase">
                    {project.category}
                  </span>
                </div>
                <div className="col-span-5 md:col-span-5">
                  <h3 className="text-sm md:text-base font-medium text-primary mb-2 group-hover:text-accent transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="text-sm text-secondary leading-relaxed hidden md:block">
                    {project.short}
                  </p>
                </div>
                <div className="col-span-3 flex flex-wrap gap-2 justify-end items-start">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-xs text-muted border border-border px-2 py-0.5 group-hover:border-muted/60 transition-colors duration-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ─── Clients — marquee ─── */}
      <section className="relative py-20 border-t border-border">
        <FadeIn className="mb-10 px-6 md:px-12">
          <p className="font-mono text-xs text-muted tracking-widest uppercase">
            Built for
          </p>
        </FadeIn>

        <Marquee duration={40}>
          {clients.concat(clients).map((c, i) => (
            <div
              key={`${c.name}-${i}`}
              className="flex items-center gap-6 px-10 border-r border-border"
            >
              <span className="font-display italic text-3xl md:text-4xl text-primary">
                {c.name}
              </span>
              <span className="font-mono text-[10px] text-muted tracking-widest uppercase">
                {c.detail}
              </span>
            </div>
          ))}
        </Marquee>

        <Marquee duration={50} reverse className="mt-6 opacity-60">
          {clients.concat(clients).map((c, i) => (
            <div
              key={`r-${c.name}-${i}`}
              className="flex items-center gap-4 px-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span className="font-mono text-xs text-muted tracking-widest uppercase">
                {c.detail}
              </span>
            </div>
          ))}
        </Marquee>
      </section>

      {/* ─── Lead Magnet ─── */}
      <LeadMagnetSection />

      {/* ─── CTA ─── */}
      <section className="relative px-6 md:px-12 py-32 border-t border-border">
        <FadeIn>
          <div className="flex items-center gap-2.5 mb-10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <p className="font-mono text-xs text-muted tracking-widest uppercase">
              Available
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.08}>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-primary leading-tight mb-10">
            Discuss a{" "}
            <span className="font-display italic text-accent">project</span>
            ?
          </h2>
        </FadeIn>
        <FadeIn delay={0.16}>
          <MagneticButton>
            <Link
              href="/contact"
              data-magnetic
              className="group relative inline-flex items-center gap-3 px-7 py-3.5 border border-primary text-primary text-sm font-medium overflow-hidden"
            >
              <motion.span
                className="absolute inset-0 bg-accent"
                initial={{ y: "100%" }}
                whileHover={{ y: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              />
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                Get in touch
              </span>
              <span className="relative z-10 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
                →
              </span>
            </Link>
          </MagneticButton>
        </FadeIn>
      </section>
    </>
  );
}
