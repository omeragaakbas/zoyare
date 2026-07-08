import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, type Post } from "@/lib/blog";
import FadeIn from "@/components/animations/FadeIn";
import LoadMoreList from "@/components/LoadMoreList";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical articles about custom software, API integrations and app development. Honest knowledge without the sales pitch.",
  alternates: {
    canonical: "https://zoyare.com/blog",
  },
  openGraph: {
    title: "Blog — Zoyare Software Engineering",
    description:
      "Practical knowledge about custom software, API integrations and app development.",
    url: "https://zoyare.com/blog",
  },
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function PostRow({ post, index }: { post: Post; index: number }) {
  return (
    <FadeIn delay={(index % 4) * 0.05}>
      <Link
        href={`/blog/${post.slug}`}
        className="group flex flex-col md:flex-row md:items-start gap-4 md:gap-12 py-10 border-b border-border hover:bg-surface/40 px-4 -mx-4 transition-colors duration-200"
      >
        <div className="flex-shrink-0 md:w-40 flex md:flex-col items-baseline md:items-start gap-4 md:gap-3">
          <span className="numeral-outline font-mono text-3xl font-bold leading-none select-none">
            {String(index + 2).padStart(2, "0")}
          </span>
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
            {formatDate(post.date)}
          </span>
          <span className="font-mono text-xs text-muted">
            {post.readTime} min
          </span>
        </div>
      </Link>
    </FadeIn>
  );
}

export default function Blog() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <div className="pt-32 px-6 md:px-12 pb-24">
      <FadeIn className="mb-20">
        <p className="font-mono text-xs text-muted tracking-widest uppercase mb-6">
          Blog
        </p>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-primary leading-[0.93]">
          Knowledge &amp;
          <br />
          <span className="font-display">insights.</span>
        </h1>
      </FadeIn>

      {featured && (
        <FadeIn>
          <Link
            href={`/blog/${featured.slug}`}
            className="group block border-t border-border pt-12 pb-14 hover:bg-surface/40 px-4 -mx-4 transition-colors duration-200"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
              <div className="md:col-span-2 flex md:flex-col items-baseline md:items-start gap-4 md:gap-3">
                <span className="inline-flex items-center gap-2 font-mono text-xs text-accent tracking-widest uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  Latest
                </span>
                <span className="font-mono text-xs text-muted tracking-widest uppercase">
                  {featured.category}
                </span>
              </div>

              <div className="md:col-span-8">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-primary leading-[1.02] mb-6 group-hover:text-accent transition-colors duration-200">
                  {featured.title}
                </h2>
                <p className="text-secondary leading-relaxed max-w-2xl mb-8">
                  {featured.description}
                </p>
                <span className="font-mono text-xs text-muted">
                  {formatDate(featured.date)} — {featured.readTime} min read
                </span>
              </div>

              <div className="hidden md:flex md:col-span-2 justify-end items-start pt-2">
                <span
                  className="text-accent text-2xl opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                  aria-hidden="true"
                >
                  →
                </span>
              </div>
            </div>
          </Link>
        </FadeIn>
      )}

      <div className="border-t border-border">
        <LoadMoreList
          initial={8}
          step={8}
          label="Load more articles"
          items={rest.map((post, i) => (
            <PostRow key={post.slug} post={post} index={i} />
          ))}
        />
      </div>
    </div>
  );
}
