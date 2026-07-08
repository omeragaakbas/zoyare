/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
  async redirects() {
    return [
      // The NL site was removed in June 2026 (international audience, EN only).
      // Every URL that ever served Dutch content 301s straight to its EN
      // canonical — no chains, so Google's link equity transfers in one hop.

      // Legacy root-level NL service URLs (pre-EN era, indexed since 2024).
      { source: "/diensten/maatwerk-software", destination: "/services/custom-software", permanent: true },
      { source: "/diensten/api-integraties", destination: "/services/api-integrations", permanent: true },
      { source: "/diensten/mobiele-applicaties", destination: "/services/mobile-applications", permanent: true },
      { source: "/diensten/process-automation", destination: "/services/process-automation", permanent: true },

      // Legacy NL blog slugs.
      { source: "/blog/waarom-software-projecten-mislukken", destination: "/blog/why-software-projects-fail", permanent: true },
      { source: "/blog/ai-integreren-in-bedrijfssoftware", destination: "/blog/ai-integration-business-software", permanent: true },

      // /nl/* tree (live June 2026). Routes whose NL path differs from the EN
      // path need an explicit mapping; the catch-all below handles the rest
      // (/nl, /nl/blog, /nl/contact, /nl/faq, /nl/portfolio, /nl/privacy).
      { source: "/nl/diensten/maatwerk-software", destination: "/services/custom-software", permanent: true },
      { source: "/nl/diensten/api-integraties", destination: "/services/api-integrations", permanent: true },
      { source: "/nl/diensten/mobiele-applicaties", destination: "/services/mobile-applications", permanent: true },
      { source: "/nl/diensten/process-automation", destination: "/services/process-automation", permanent: true },
      { source: "/nl/diensten", destination: "/", permanent: true },
      { source: "/nl/over-ons", destination: "/about", permanent: true },
      { source: "/nl/voorwaarden", destination: "/terms", permanent: true },
      // /nl needs its own rule: the catch-all matches it with zero segments,
      // which produces an empty Location header.
      { source: "/nl", destination: "/", permanent: true },
      { source: "/nl/:path*", destination: "/:path*", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        // Static brand assets change rarely; let browsers keep them a day
        // and serve stale while revalidating in the background.
        source: "/:file(favicon\\.svg|logo\\.svg|logo-light\\.svg)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
    ];
  },
}

module.exports = nextConfig
