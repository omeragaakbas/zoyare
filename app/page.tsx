"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { projects, services } from "@/lib/content";
import FadeIn from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";
import ServiceCard from "@/components/ServiceCard";

const heroVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const heroLine = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-end px-6 md:px-12 pb-16 pt-32">
        <div className="max-w-5xl">
          <motion.p
            className="font-mono text-xs text-accent tracking-widest uppercase mb-8"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Software Engineering Studio
          </motion.p>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-primary leading-[0.95] mb-10"
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
                {/* Blinking cursor */}
                <motion.span
                  className="inline-block w-[4px] h-[0.85em] bg-accent ml-2 align-middle"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.7, repeat: Infinity, repeatType: "reverse", ease: "steps(1)" }}
                />
              </motion.span>
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-secondary text-lg md:text-xl max-w-xl leading-relaxed mb-12"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Maatwerk software en mobiele applicaties voor ondernemingen die
            verder willen dan standaard oplossingen.
          </motion.p>

          <motion.div
            className="flex items-center gap-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
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

        {/* Scroll indicator */}
        <motion.div
          className="mt-24 flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.div
            className="h-px bg-muted"
            initial={{ width: 0 }}
            animate={{ width: 48 }}
            transition={{ duration: 0.8, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.span
            className="font-mono text-xs text-muted tracking-widest uppercase"
            animate={{ y: [0, 3, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            Scroll
          </motion.span>
        </motion.div>
      </section>

      {/* Services */}
      <section className="px-6 md:px-12 py-24 border-t border-border">
        <FadeIn className="mb-16">
          <p className="font-mono text-xs text-muted tracking-widest uppercase">Wat ik doe</p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {services.map((service) => (
            <StaggerItem key={service.title}>
              <ServiceCard title={service.title} description={service.description} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Selected work */}
      <section className="px-6 md:px-12 py-24 border-t border-border">
        <FadeIn className="flex justify-between items-end mb-16">
          <p className="font-mono text-xs text-muted tracking-widest uppercase">Geselecteerd werk</p>
          <Link href="/portfolio" className="text-sm text-secondary hover:text-primary transition-colors duration-200">
            Alles bekijken →
          </Link>
        </FadeIn>

        <div className="flex flex-col divide-y divide-border">
          {projects.map((project, i) => (
            <FadeIn key={project.id} delay={i * 0.07} direction="left">
              <motion.div
                className="group grid grid-cols-12 gap-6 py-8 px-4 -mx-4 cursor-default"
                whileHover={{ backgroundColor: "rgba(17,17,17,1)", x: 4 }}
                transition={{ duration: 0.2 }}
              >
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
                <div className="col-span-5">
                  <h3 className="text-base font-medium text-primary mb-2 group-hover:text-accent transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="text-sm text-secondary leading-relaxed">{project.short}</p>
                </div>
                <div className="col-span-3 flex flex-wrap gap-2 justify-end items-start">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-xs text-muted border border-border px-2 py-1 group-hover:border-muted transition-colors duration-200"
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

      {/* CTA */}
      <section className="px-6 md:px-12 py-32 border-t border-border">
        <FadeIn>
          <p className="font-mono text-xs text-muted tracking-widest uppercase mb-8">Samenwerken</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-primary leading-tight mb-8">
            Een project
            <br />
            bespreken?
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
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
            <span className="relative group-hover:text-primary transition-colors duration-300">→</span>
          </Link>
        </FadeIn>
      </section>
    </>
  );
}
