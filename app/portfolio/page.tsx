import { projects } from "@/lib/content";
import type { Metadata } from "next";
import FadeIn from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";

export const metadata: Metadata = {
  title: "Portfolio — Zoyare",
  description: "Overzicht van projecten: enterprise integraties, back-end engineering, product development en automations.",
};

export default function Portfolio() {
  return (
    <div className="pt-32 px-6 md:px-12 pb-24">
      {/* Header */}
      <FadeIn className="mb-20">
        <p className="font-mono text-xs text-muted tracking-widest uppercase mb-6">Portfolio</p>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-primary leading-[0.93]">
          Geselecteerd
          <br />
          werk.
        </h1>
      </FadeIn>

      {/* Project grid */}
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
        {projects.map((project, i) => (
          <StaggerItem key={project.id}>
            <article className="relative bg-background group flex flex-col justify-between p-10 min-h-[22rem] hover:bg-surface transition-colors duration-300 overflow-hidden">
              {/* Large decorative number */}
              <span
                className="absolute right-8 top-6 font-mono text-[5rem] font-bold leading-none text-border/40
                           group-hover:text-border/70 transition-colors duration-500 select-none pointer-events-none"
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="flex justify-between items-start relative">
                <span className="font-mono text-xs text-accent tracking-widest uppercase">
                  {project.type}
                </span>
              </div>

              <div className="relative mt-10">
                <p className="font-mono text-xs text-muted tracking-widest uppercase mb-3">
                  {project.client} — {project.category}
                </p>
                <h2 className="text-xl md:text-2xl font-bold tracking-tight text-primary mb-4 leading-snug">
                  {project.title}
                </h2>
                <p className="text-sm text-secondary leading-relaxed mb-8">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-xs text-muted border border-border px-2 py-0.5
                                 group-hover:border-muted/60 transition-colors duration-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}
