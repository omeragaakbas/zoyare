"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { projects, services } from "@/lib/content";
import FadeIn from "@/components/animations/FadeIn";

const heroVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const heroLine = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

export default function Home() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative min-h-screen flex flex-col justify-end px-6 md:px-12 pb-20 pt-32 overflow-hidden">

        {/* Ambient glow behind heading */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 15% 55%, rgba(241,95,14,0.07) 0%, transparent 65%)",
          }}
        />

        <div className="relative max-w-5xl">
          {/* Status badge */}
          <motion.div
            className="inline-flex items-center gap-2 mb-10 border border-border px-3 py-1.5"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-xs text-muted tracking-widest uppercase">
              Beschikbaar voor projecten
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter text-primary leading-[0.93] mb-10"
            variants={heroVariants}
            initial="hidden"
            animate="show"
          >
            <motion.span className="block overflow-hidden">
              <motion.span className="block" variants={heroLine}>Software</motion.span>
            </motion.span>
            <motion.span className="block overflow-hidden">
              <motion.span className="block" variants={heroLine}>built to</motion.span>
            </motion.span>
            <motion.span className="block overflow-hidden">
              <motion.span className="block" variants={heroLine}>
                <span className="text-accent">scale.</span>
                <motion.span
                  className="inline-block w-[3px] h-[0.82em] bg-accent ml-2 align-middle"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.75, repeat: Infinity, repeatType: "reverse", ease: "steps(1)" }}
                />
              </motion.span>
            </motion.span>
          </motion.h1>

          {/* Subline */}
          <motion.p
            className="text-secondary text-lg md:text-xl max-w-lg leading-relaxed mb-12 font-light"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            Maatwerk software en mobiele applicaties voor ondernemingen die
            verder willen dan standaard oplossingen.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex items-center gap-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href="/portfolio"
              className="group relative px-6 py-3 bg-primary text-background text-sm font-medium overflow-hidden"
            >
              <motion.span
                className="absolute inset-0 bg-accent"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
              <span className="relative group-hover:text-primary transition-colors duration-300">
                Bekijk werk
              </span>
            </Link>
            <Link
              href="/contact"
              className="text-sm text-secondary hover:text-primary transition-colors duration-200 underline underline-offset-4"
            >
              Gesprek plannen
            </Link>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          className="mt-24 flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
        >
          <motion.div
            className="h-px bg-muted"
            initial={{ width: 0 }}
            animate={{ width: 48 }}
            transition={{ duration: 0.8, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
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
      <section className="px-6 md:px-12 py-24 border-t border-border">
        <FadeIn className="mb-14">
          <p className="font-mono text-xs text-muted tracking-widest uppercase">Wat ik doe</p>
        </FadeIn>

        <div>
          {services.map((service, i) => (
            <FadeIn key={service.title} delay={i * 0.07}>
              <Link href={service.href}>
                <motion.div
                  className="group grid grid-cols-12 items-start gap-4 md:gap-6 py-8 border-b border-border cursor-pointer"
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* Number */}
                  <div className="col-span-2 md:col-span-1 pt-0.5">
                    <span className="font-mono text-sm text-border group-hover:text-accent transition-colors duration-300">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="col-span-10 md:col-span-4">
                    <h3 className="text-base md:text-lg font-medium text-primary group-hover:text-accent transition-colors duration-300 leading-snug">
                      {service.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <div className="col-span-12 md:col-span-6 pl-[calc(16.67%)] md:pl-0">
                    <p className="text-sm text-secondary leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Arrow */}
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
      <section className="px-6 md:px-12 py-24 border-t border-border">
        <FadeIn className="flex justify-between items-end mb-14">
          <p className="font-mono text-xs text-muted tracking-widest uppercase">Geselecteerd werk</p>
          <Link
            href="/portfolio"
            className="text-sm text-secondary hover:text-primary transition-colors duration-200"
          >
            Alles bekijken →
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
                {/* Hover accent bar */}
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

      {/* ─── CTA ─── */}
      <section className="px-6 md:px-12 py-32 border-t border-border">
        <FadeIn>
          <div className="flex items-center gap-2.5 mb-10">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <p className="font-mono text-xs text-muted tracking-widest uppercase">
              Beschikbaar
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.08}>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-primary leading-tight mb-10">
            Een project
            <br />
            bespreken?
          </h2>
        </FadeIn>
        <FadeIn delay={0.16}>
          <Link
            href="/contact"
            className="group relative inline-flex items-center gap-3 px-6 py-3 border border-primary text-primary text-sm font-medium overflow-hidden"
          >
            <motion.span
              className="absolute inset-0 bg-accent border-accent"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
            <span className="relative group-hover:text-primary transition-colors duration-300">
              Neem contact op
            </span>
            <span className="relative group-hover:text-primary transition-colors duration-300">
              →
            </span>
          </Link>
        </FadeIn>
      </section>
    </>
  );
}
