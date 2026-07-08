import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPost, getAllPosts } from "@/lib/blog";
import { breadcrumbList } from "@/lib/jsonld";
import ShareRow from "@/components/ShareRow";

const BASE_URL = "https://zoyare.com";

/**
 * Adds slug ids to <h2> headings so the table of contents can anchor-link
 * to them. Returns the enriched HTML plus the extracted headings.
 */
function withHeadingAnchors(html: string): {
  html: string;
  headings: { id: string; text: string }[];
} {
  const headings: { id: string; text: string }[] = [];
  const enriched = html.replace(/<h2>([\s\S]*?)<\/h2>/g, (_, inner: string) => {
    const text = inner.replace(/<[^>]+>/g, "").trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
    headings.push({ id, text });
    return `<h2 id="${id}">${inner}</h2>`;
  });
  return { html: enriched, headings };
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
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
      authors: ["Zoyare"],
      section: post.category,
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { html: bodyHtml, headings } = withHeadingAnchors(post.body);

  // Related reading: same category first, then most recent — max 2.
  const related = getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) =>
      Number(b.category === post.category) - Number(a.category === post.category)
    )
    .slice(0, 2);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: "Zoyare",
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
    image: [`${BASE_URL}/blog/${post.slug}/opengraph-image`],
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

        {headings.length >= 3 && (
          <nav
            aria-label="Table of contents"
            className="max-w-3xl border border-border bg-surface/40 p-6 md:p-8 mb-14"
          >
            <p className="font-mono text-xs text-muted tracking-widest uppercase mb-5">
              In this article
            </p>
            <ol className="flex flex-col gap-2.5">
              {headings.map((h, i) => (
                <li key={h.id} className="flex items-baseline gap-4">
                  <span className="font-mono text-xs text-accent tabular-nums select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <a
                    href={`#${h.id}`}
                    className="text-sm text-secondary hover:text-accent transition-colors duration-200"
                  >
                    {h.text}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <article
          className="max-w-3xl prose-zoyare"
          dangerouslySetInnerHTML={{ __html: bodyHtml }}
        />

        <div className="max-w-3xl mt-14 pt-8 border-t border-border">
          <ShareRow url={`${BASE_URL}/blog/${post.slug}`} title={post.title} />
        </div>

        {related.length > 0 && (
          <div className="max-w-3xl mt-16 pt-12 border-t border-border">
            <p className="font-mono text-xs text-muted tracking-widest uppercase mb-8">
              Keep reading
            </p>
            <div className="flex flex-col divide-y divide-border">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/blog/${rel.slug}`}
                  className="group flex items-start justify-between gap-6 py-6"
                >
                  <div>
                    <p className="font-mono text-xs text-muted tracking-widest uppercase mb-2">
                      {rel.category} — {rel.readTime} min
                    </p>
                    <h3 className="text-base md:text-lg font-medium text-primary leading-snug group-hover:text-accent transition-colors duration-200">
                      {rel.title}
                    </h3>
                  </div>
                  <span
                    className="text-accent text-sm mt-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

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
