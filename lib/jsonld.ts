const BASE_URL = "https://zoyare.com";

export function jsonLdScript(data: object) {
  return {
    type: "application/ld+json" as const,
    html: JSON.stringify(data),
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbList(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${BASE_URL}${c.path}`,
    })),
  };
}

export function service(opts: {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    serviceType: opts.serviceType ?? opts.name,
    url: `${BASE_URL}${opts.path}`,
    areaServed: { "@type": "Country", name: "Netherlands" },
    provider: {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "Zoyare",
      url: BASE_URL,
    },
  };
}
