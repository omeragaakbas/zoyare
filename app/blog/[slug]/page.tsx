import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPost, getAllPosts } from "@/lib/blog";
import { breadcrumbList } from "@/lib/jsonld";

const BASE_URL = "https://zoyare.com";

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
    alternates: { canonical: `${BASE_URL}/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${BASE_URL}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: ["Ömer Akbas"],
      section: post.category,
    },
  };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: "Ömer Akbas",
      url: `${BASE_URL}/about`,
    },
    publisher: {
      "@type": "Organization",
      name: "Zoyare",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.svg`,
      },
    },
    image: [`${BASE_URL}/opengraph-image.png`],
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${post.slug}`,
    },
    articleSection: post.category,
    url: `${BASE_URL}/blog/${post.slug}`,
    inLanguage: "en",
  };

  const breadcrumbs = breadcrumbList([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ]);

  const jsonLd = [articleSchema, breadcrumbs];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="pt-32 px-6 md:px-12 pb-24">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-mono text-xs text-muted tracking-widest uppercase hover:text-primary transition-colors duration-200 mb-16"
        >
          ← Blog
        </Link>

        <div className="max-w-3xl mb-16">
          <p className="font-mono text-xs text-accent tracking-widest uppercase mb-6">
            {post.category}
          </p>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-primary leading-tight mb-6">
            {post.title}
          </h1>
          <div className="flex items-center gap-6 text-sm text-muted">
            <span>
              {new Date(post.date).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span>{post.readTime} min read</span>
          </div>
        </div>

        <article
          className="max-w-3xl prose-zoyare"
          dangerouslySetInnerHTML={{ __html: post.body }}
        />

        <div className="max-w-3xl mt-20 pt-12 border-t border-border">
          <p className="font-mono text-xs text-muted tracking-widest uppercase mb-4">
            Collaborate
          </p>
          <p className="text-xl md:text-2xl font-light text-primary leading-relaxed mb-8">
            Question? Project? Just want to brainstorm?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-6 py-3 bg-primary text-background text-sm font-medium hover:bg-accent transition-colors duration-300"
          >
            Get in touch →
          </Link>
        </div>
      </div>
    </>
  );
}
