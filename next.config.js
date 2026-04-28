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
}

module.exports = nextConfig
