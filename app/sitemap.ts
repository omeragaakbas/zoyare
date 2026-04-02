import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

const BASE_URL = "https://zoyare.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL,                                         lastModified: new Date(), changeFrequency: "monthly",  priority: 1.0 },
    { url: `${BASE_URL}/portfolio`,                          lastModified: new Date(), changeFrequency: "monthly",  priority: 0.8 },
    { url: `${BASE_URL}/about`,                              lastModified: new Date(), changeFrequency: "yearly",   priority: 0.7 },
    { url: `${BASE_URL}/contact`,                            lastModified: new Date(), changeFrequency: "yearly",   priority: 0.7 },
    { url: `${BASE_URL}/blog`,                               lastModified: new Date(), changeFrequency: "weekly",   priority: 0.8 },
    { url: `${BASE_URL}/diensten/maatwerk-software`,         lastModified: new Date(), changeFrequency: "monthly",  priority: 0.9 },
    { url: `${BASE_URL}/diensten/api-integraties`,           lastModified: new Date(), changeFrequency: "monthly",  priority: 0.9 },
    { url: `${BASE_URL}/diensten/mobiele-applicaties`,       lastModified: new Date(), changeFrequency: "monthly",  priority: 0.9 },
    { url: `${BASE_URL}/diensten/process-automation`,        lastModified: new Date(), changeFrequency: "monthly",  priority: 0.9 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}
