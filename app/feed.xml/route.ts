import { getAllPosts } from "@/lib/blog";

export const dynamic = "force-static";

const BASE_URL = "https://zoyare.com";

function esc(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function GET() {
  const posts = getAllPosts();
  const lastBuildDate = new Date(posts[0]?.date ?? Date.now()).toUTCString();

  const items = posts
    .map(
      (post) => `    <item>
      <title>${esc(post.title)}</title>
      <link>${BASE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/blog/${post.slug}</guid>
      <description>${esc(post.description)}</description>
      <category>${esc(post.category)}</category>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`
    )
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Zoyare — Blog</title>
    <link>${BASE_URL}/blog</link>
    <description>Practical articles about custom software, API integrations and app development. Honest knowledge without the sales pitch.</description>
    <language>en</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;

  return new Response(body, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
