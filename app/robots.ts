import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://zoyare.com/sitemap.xml",
    host: "https://zoyare.com",
  };
}
