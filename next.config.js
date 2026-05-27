/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/diensten/api-integraties", destination: "/services/api-integrations", permanent: true },
      { source: "/diensten/maatwerk-software", destination: "/services/custom-software", permanent: true },
      { source: "/diensten/mobiele-applicaties", destination: "/services/mobile-applications", permanent: true },
      { source: "/diensten/process-automation", destination: "/services/process-automation", permanent: true },
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
