import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPost, getAllPosts } from "@/lib/blog";

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getPost(params.slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `https://zoyare.com/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://zoyare.com/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: ["Ömer Akbas"],
    },
  };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  // JSON-LD for article
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: "Ömer Akbas",
      url: "https://zoyare.com/about",
    },
    publisher: {
      "@type": "Organization",
      name: "Zoyare",
      url: "https://zoyare.com",
    },
    url: `https://zoyare.com/blog/${post.slug}`,
    inLanguage: "nl-NL",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="pt-32 px-6 md:px-12 pb-24">
        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-mono text-xs text-muted tracking-widest uppercase hover:text-primary transition-colors duration-200 mb-16"
        >
          ← Blog
        </Link>

        {/* Header */}
        <div className="max-w-3xl mb-16">
          <p className="font-mono text-xs text-accent tracking-widest uppercase mb-6">
            {post.category}
          </p>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-primary leading-tight mb-6">
            {post.title}
          </h1>
          <div className="flex items-center gap-6 text-sm text-muted">
            <span>
              {new Date(post.date).toLocaleDateString("nl-NL", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span>{post.readTime} minuten leestijd</span>
          </div>
        </div>

        {/* Article body */}
        <article
          className="max-w-3xl prose-zoyare"
          dangerouslySetInnerHTML={{ __html: post.body }}
        />

        {/* CTA */}
        <div className="max-w-3xl mt-20 pt-12 border-t border-border">
          <p className="font-mono text-xs text-muted tracking-widest uppercase mb-4">
            Samenwerken
          </p>
          <p className="text-xl md:text-2xl font-light text-primary leading-relaxed mb-8">
            Vraag? Project? Gewoon even sparren?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-6 py-3 bg-primary text-background text-sm font-medium hover:bg-accent transition-colors duration-300"
          >
            Neem contact op →
          </Link>
        </div>
      </div>
    </>
  );
}
