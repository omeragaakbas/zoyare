import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Zoyare — Software built to scale",
    short_name: "Zoyare",
    description:
      "Software engineering studio. Custom software, API integrations and mobile apps for businesses.",
    start_url: "/",
    display: "standalone",
    background_color: "#F8F6F2",
    theme_color: "#F8F6F2",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
