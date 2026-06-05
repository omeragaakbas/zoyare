import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { projects } from "@/lib/content";
import { caseStudy, breadcrumbList } from "@/lib/jsonld";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.short,
    alternates: { canonical: `https://zoyare.com/portfolio/${project.id}` },
    openGraph: {
      title: `${project.title} — Zoyare`,
      description: project.short,
      url: `https://zoyare.com/portfolio/${project.id}`,
    },
  };
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.id === slug);
  const next = projects[index + 1] ?? projects[0];

  const jsonLd = [
    caseStudy({
      title: project.title,
      description: project.description,
      slug: project.id,
      client: project.client,
      year: project.year,
      tags: project.tags,
    }),
    breadcrumbList([
      { name: "Home", path: "/" },
      { name: "Portfolio", path: "/portfolio" },
      { name: project.title, path: `/portfolio/${project.id}` },
    ]),
  ];

  return (
    <div className="pt-32 px-6 md:px-12 pb-24">
      {jsonLd.map((ld, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
        />
      ))}
      <div className="mb-16">
        <Link
          href="/portfolio"
          className="font-mono text-xs text-muted tracking-widest uppercase hover:text-primary transition-colors duration-200"
        >
          ← Portfolio
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-20 pb-20 border-b border-border">
        <div className="md:col-span-8">
          <p className="font-mono text-xs text-accent tracking-widest uppercase mb-4">
            {project.type} — {project.year}
          </p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-primary leading-[0.93] mb-6">
            {project.title}
          </h1>
          <p className="text-secondary text-lg leading-relaxed max-w-2xl">
            {project.description}
          </p>
        </div>
        <div className="md:col-span-4 flex flex-col gap-8 md:items-end md:text-right">
          <div>
            <p className="font-mono text-xs text-muted tracking-widest uppercase mb-2">Client</p>
            <p className="text-primary font-medium">{project.client}</p>
          </div>
          <div>
            <p className="font-mono text-xs text-muted tracking-widest uppercase mb-2">Category</p>
            <p className="text-primary font-medium">{project.category}</p>
          </div>
          <div>
            <p className="font-mono text-xs text-muted tracking-widest uppercase mb-3">Tech stack</p>
            <div className="flex flex-wrap gap-2 md:justify-end">
              {project.stack.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs text-muted border border-border px-2 py-0.5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-px bg-border mb-px">
        <div className="md:col-span-4 bg-background p-10">
          <p className="font-mono text-xs text-muted tracking-widest uppercase mb-6">01 — Challenge</p>
          <p className="text-secondary leading-relaxed">{project.challenge}</p>
        </div>

        <div className="md:col-span-4 bg-background p-10">
          <p className="font-mono text-xs text-muted tracking-widest uppercase mb-6">02 — Approach</p>
          <p className="text-secondary leading-relaxed">{project.approach}</p>
        </div>

        <div className="md:col-span-4 bg-background p-10">
          <p className="font-mono text-xs text-muted tracking-widest uppercase mb-6">03 — Result</p>
          <p className="text-secondary leading-relaxed">{project.result}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-8 mb-24 pb-24 border-b border-border">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-xs text-muted border border-border px-3 py-1"
          >
            {tag}
          </span>
        ))}
      </div>

      <div>
        <p className="font-mono text-xs text-muted tracking-widest uppercase mb-8">Next project</p>
        <Link
          href={`/portfolio/${next.id}`}
          className="group flex items-center justify-between py-8 border-t border-border hover:bg-surface/40 -mx-6 px-6 transition-colors duration-200"
        >
          <div>
            <p className="font-mono text-xs text-muted tracking-widest uppercase mb-2">{next.client}</p>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-primary group-hover:text-accent transition-colors duration-200">
              {next.title}
            </h3>
          </div>
          <span className="text-accent text-xl opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            →
          </span>
        </Link>
      </div>

      <div className="mt-24 pt-16 border-t border-border">
        <p className="text-secondary mb-6 max-w-md">
          Have a similar project in mind? Let&apos;s discuss it.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-3 px-6 py-3 border border-primary text-primary text-sm font-medium hover:bg-primary hover:text-background transition-colors duration-300"
        >
          Get in touch →
        </Link>
      </div>
    </div>
  );
}
