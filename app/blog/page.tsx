import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import FadeIn from "@/components/animations/FadeIn";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Praktische artikelen over maatwerk software, API-integraties en app development in Nederland. Eerlijke kennis zonder verkooppraatje.",
  alternates: { canonical: "https://zoyare.com/blog" },
  openGraph: {
    title: "Blog — Zoyare Software Engineering",
    description:
      "Praktische kennis over maatwerk software, API-integraties en app development.",
    url: "https://zoyare.com/blog",
  },
};

export default function Blog() {
  const posts = getAllPosts();

  return (
    <div className="pt-32 px-6 md:px-12 pb-24">
      <FadeIn className="mb-20">
        <p className="font-mono text-xs text-muted tracking-widest uppercase mb-6">
          Blog
        </p>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-primary leading-[0.93]">
          Kennis &amp;
          <br />
          inzichten.
        </h1>
      </FadeIn>

      <div className="border-t border-border">
        {posts.map((post, i) => (
          <FadeIn key={post.slug} delay={i * 0.06}>
            <Link
              href={`/blog/${post.slug}`}
              className="group flex flex-col md:flex-row md:items-start gap-4 md:gap-12 py-10 border-b border-border hover:bg-surface/40 px-4 -mx-4 transition-colors duration-200"
            >
              <div className="flex-shrink-0 md:w-40">
                <span className="font-mono text-xs text-muted tracking-widest uppercase">
                  {post.category}
                </span>
              </div>

              <div className="flex-1">
                <h2 className="text-lg md:text-xl font-medium text-primary mb-3 group-hover:text-accent transition-colors duration-200 leading-snug">
                  {post.title}
                </h2>
                <p className="text-sm text-secondary leading-relaxed max-w-2xl">
                  {post.description}
                </p>
              </div>

              <div className="flex-shrink-0 flex flex-col items-end gap-2">
                <span className="font-mono text-xs text-muted">
                  {new Date(post.date).toLocaleDateString("nl-NL", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <span className="font-mono text-xs text-muted">
                  {post.readTime} min
                </span>
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
