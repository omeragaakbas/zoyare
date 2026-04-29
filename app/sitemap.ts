import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { projects } from "@/lib/content";

const BASE_URL = "https://zoyare.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL,                                           lastModified: new Date(), changeFrequency: "monthly",  priority: 1.0 },
    { url: `${BASE_URL}/portfolio`,                            lastModified: new Date(), changeFrequency: "monthly",  priority: 0.8 },
    { url: `${BASE_URL}/about`,                                lastModified: new Date(), changeFrequency: "yearly",   priority: 0.7 },
    { url: `${BASE_URL}/contact`,                              lastModified: new Date(), changeFrequency: "yearly",   priority: 0.7 },
    { url: `${BASE_URL}/blog`,                                 lastModified: new Date(), changeFrequency: "weekly",   priority: 0.8 },
    { url: `${BASE_URL}/faq`,                                  lastModified: new Date(), changeFrequency: "monthly",  priority: 0.7 },
    { url: `${BASE_URL}/services/custom-software`,             lastModified: new Date(), changeFrequency: "monthly",  priority: 0.9 },
    { url: `${BASE_URL}/services/api-integrations`,            lastModified: new Date(), changeFrequency: "monthly",  priority: 0.9 },
    { url: `${BASE_URL}/services/mobile-applications`,         lastModified: new Date(), changeFrequency: "monthly",  priority: 0.9 },
    { url: `${BASE_URL}/services/process-automation`,          lastModified: new Date(), changeFrequency: "monthly",  priority: 0.9 },
    { url: `${BASE_URL}/privacy`,                              lastModified: new Date(), changeFrequency: "yearly",   priority: 0.3 },
    { url: `${BASE_URL}/terms`,                                lastModified: new Date(), changeFrequency: "yearly",   priority: 0.3 },
  ];

  const portfolioRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${BASE_URL}/portfolio/${project.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...portfolioRoutes, ...blogRoutes];
}
