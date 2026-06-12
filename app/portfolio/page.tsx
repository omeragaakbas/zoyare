import { projects } from "@/lib/content";
import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";
import ProjectSchematic from "@/components/ProjectSchematic";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Zoyare projects: Siemens BuildingX connector, Workforce Management systems, mobile matching apps and freelancer invoicing automation. Enterprise to startup.",
  alternates: {
    canonical: "https://zoyare.com/portfolio",
  },
  openGraph: {
    title: "Portfolio — Zoyare Software Projects",
    description:
      "From Siemens enterprise integrations to product development. See how Zoyare builds custom software.",
    url: "https://zoyare.com/portfolio",
  },
};

export default function Portfolio() {
  return (
    <div className="pt-32 px-6 md:px-12 pb-24">
      <FadeIn className="mb-20">
        <p className="font-mono text-xs text-muted tracking-widest uppercase mb-6">Portfolio</p>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-primary leading-[0.93]">
          Selected
          <br />
          <span className="font-display">work.</span>
        </h1>
      </FadeIn>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
        {projects.map((project, i) => (
          <StaggerItem key={project.id}>
            <Link href={`/portfolio/${project.id}`}>
            <article className="relative bg-background group flex flex-col hover:bg-surface transition-colors duration-300 overflow-hidden cursor-pointer h-full">
              <div className="relative border-b border-border bg-background aspect-[16/10] overflow-hidden">
                <ProjectSchematic
                  id={project.id}
                  className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <span className="absolute left-6 top-5 font-mono text-xs text-accent tracking-widest uppercase">
                  {project.type}
                </span>
                <span className="absolute right-6 top-3 font-mono text-4xl font-bold leading-none text-border/60 group-hover:text-border transition-colors duration-500 select-none pointer-events-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="relative p-8 md:p-10 flex-1 flex flex-col">
                <p className="font-mono text-xs text-muted tracking-widest uppercase mb-3">
                  {project.client} — {project.category}
                </p>
                <h2 className="text-xl md:text-2xl font-bold tracking-tight text-primary mb-4 leading-snug group-hover:text-accent transition-colors duration-200">
                  {project.title}
                </h2>
                <p className="text-sm text-secondary leading-relaxed mb-8">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
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
            </Link>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}
