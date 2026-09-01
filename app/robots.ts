import type { MetadataRoute } from "next";

// AI answer engines are a real referral channel for a studio like this: they cite
// sources, and being citable costs nothing. Listed explicitly because several of these
// crawlers treat an absent user-agent block as a reason to be conservative.
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
  "cohere-ai",
  "Meta-ExternalAgent",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: AI_CRAWLERS,
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: "https://zoyare.com/sitemap.xml",
    host: "https://zoyare.com",
  };
}
