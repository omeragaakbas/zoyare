"use client";

import Link from "next/link";
import { m } from "framer-motion";
import type { Project } from "@/lib/content";
import FadeIn from "@/components/animations/FadeIn";
import MagneticButton from "@/components/MagneticButton";

export function ServicesList({
  services,
}: {
  services: readonly { title: string; description: string; href: string }[];
}) {
  return (
    <div>
      {services.map((service, i) => (
        <FadeIn key={service.title} delay={i * 0.07}>
          <Link href={service.href}>
            <m.div
              className="group grid grid-cols-12 items-start gap-4 md:gap-6 py-8 border-b border-border cursor-pointer relative"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.25 }}
            >
              <m.span
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
            </m.div>
          </Link>
        </FadeIn>
      ))}
    </div>
  );
}

export function ProjectsList({ projects }: { projects: Project[] }) {
  return (
    <div className="flex flex-col divide-y divide-border">
      {projects.map((project, i) => (
        <FadeIn key={project.id} delay={i * 0.06} direction="left">
          <m.div
            className="group grid grid-cols-12 gap-4 md:gap-6 py-7 cursor-default relative"
            whileHover={{ x: 4 }}
            transition={{ duration: 0.22 }}
          >
            <m.span
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
          </m.div>
        </FadeIn>
      ))}
    </div>
  );
}

function CornerTicks() {
  const tick = "pointer-events-none select-none absolute font-mono text-sm text-muted/50";
  return (
    <span aria-hidden="true">
      <span className={`${tick} left-4 top-3`}>+</span>
      <span className={`${tick} right-4 top-3`}>+</span>
      <span className={`${tick} left-4 bottom-3`}>+</span>
      <span className={`${tick} right-4 bottom-3`}>+</span>
    </span>
  );
}

export function CTASection() {
  return (
    <section className="relative px-6 md:px-12 py-32 border-t border-border">
      <CornerTicks />
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
          <span className="font-display italic text-accent">project</span>?
        </h2>
      </FadeIn>
      <FadeIn delay={0.16}>
        <div className="flex items-center gap-6 flex-wrap">
          <MagneticButton>
            <Link
              href="/contact"
              data-magnetic
              className="group relative inline-flex items-center gap-3 px-7 py-3.5 border border-primary text-primary text-sm font-medium overflow-hidden"
            >
              <m.span
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
          <Link
            href="/estimate"
            className="text-sm text-secondary hover:text-primary transition-colors duration-200 underline underline-offset-4"
          >
            Or get an instant estimate
          </Link>
        </div>
      </FadeIn>
    </section>
  );
}
