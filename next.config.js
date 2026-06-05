/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
  async redirects() {
    return [
      // Reroute legacy NL service URLs to the new NL pages — recovers Google's
      // memory of the old /diensten/* URLs which were ranking before the EN switch.
      { source: "/diensten/api-integraties", destination: "/nl/diensten/api-integraties", permanent: true },
      { source: "/diensten/maatwerk-software", destination: "/nl/diensten/maatwerk-software", permanent: true },
      { source: "/diensten/mobiele-applicaties", destination: "/nl/diensten/mobiele-applicaties", permanent: true },
      { source: "/diensten/process-automation", destination: "/nl/diensten/process-automation", permanent: true },
      // Existing blog redirects stay pointed at the EN canonicals — blog posts
      // haven't been translated yet, NL versions can be added later.
      { source: "/blog/waarom-software-projecten-mislukken", destination: "/blog/why-software-projects-fail", permanent: true },
      { source: "/blog/ai-integreren-in-bedrijfssoftware", destination: "/blog/ai-integration-business-software", permanent: true },
    ];
  },
  async headers() {
    return [
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
