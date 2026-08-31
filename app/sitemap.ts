import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { projects } from "@/lib/content";

const BASE_URL = "https://zoyare.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  // Newest published post — drives lastModified for the pages that change with the blog,
  // so Google gets a real recrawl signal instead of a date frozen in the source.
  const latestPost = posts.reduce((newest, p) => (p.date > newest ? p.date : newest), posts[0].date);

  const enStaticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL,                                           lastModified: latestPost,   changeFrequency: "monthly",  priority: 1.0 },
    { url: `${BASE_URL}/portfolio`,                            lastModified: "2026-05-27", changeFrequency: "monthly",  priority: 0.8 },
    { url: `${BASE_URL}/about`,                                lastModified: "2026-04-01", changeFrequency: "yearly",   priority: 0.7 },
    { url: `${BASE_URL}/contact`,                              lastModified: "2026-05-27", changeFrequency: "yearly",   priority: 0.7 },
    { url: `${BASE_URL}/blog`,                                 lastModified: latestPost,   changeFrequency: "weekly",   priority: 0.8 },
    { url: `${BASE_URL}/faq`,                                  lastModified: "2026-04-01", changeFrequency: "monthly",  priority: 0.7 },
    { url: `${BASE_URL}/estimate`,                             lastModified: "2026-07-08", changeFrequency: "monthly",  priority: 0.8 },
    { url: `${BASE_URL}/services/custom-software`,             lastModified: "2026-04-01", changeFrequency: "monthly",  priority: 0.9 },
    { url: `${BASE_URL}/services/api-integrations`,            lastModified: "2026-04-01", changeFrequency: "monthly",  priority: 0.9 },
    { url: `${BASE_URL}/services/mobile-applications`,         lastModified: "2026-04-01", changeFrequency: "monthly",  priority: 0.9 },
    { url: `${BASE_URL}/services/process-automation`,          lastModified: "2026-04-01", changeFrequency: "monthly",  priority: 0.9 },
    { url: `${BASE_URL}/privacy`,                              lastModified: "2026-03-01", changeFrequency: "yearly",   priority: 0.3 },
    { url: `${BASE_URL}/terms`,                                lastModified: "2026-03-01", changeFrequency: "yearly",   priority: 0.3 },
  ];

  const portfolioRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${BASE_URL}/portfolio/${project.id}`,
    lastModified: `${project.year}-12-01`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...enStaticRoutes, ...portfolioRoutes, ...blogRoutes];
}
