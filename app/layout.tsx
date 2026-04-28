import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Link from "next/link";
import Nav from "@/components/Nav";
import Logo from "@/components/Logo";
import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";
import ChatWidget from "@/components/ChatWidget";
import Background from "@/components/Background";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const BASE_URL = "https://zoyare.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Zoyare — Custom Software & App Development",
    template: "%s — Zoyare",
  },
  description:
    "Zoyare is a software engineering studio. Custom software, API integrations and mobile applications for businesses. From requirement to deployment.",
  keywords: [
    "custom software development",
    "software development agency",
    "app development",
    "API integration",
    "software engineering studio",
    "mobile app development",
    "enterprise software",
    "mendix developer",
    "business automation",
  ],
  authors: [{ name: "Ömer Akbas", url: BASE_URL }],
  creator: "Zoyare",
  publisher: "Zoyare",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Zoyare",
    title: "Zoyare — Custom Software & App Development",
    description:
      "Software engineering studio. Custom software, API integrations and mobile apps for businesses.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zoyare — Custom Software & App Development",
    description:
      "Software engineering studio. Custom software, API integrations and mobile apps for businesses.",
    creator: "@zoyare",
  },
  alternates: {
    canonical: BASE_URL,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "Zoyare",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.svg`,
      },
      email: "hello@zoyare.com",
      description:
        "Software engineering studio for custom software, API integrations and mobile applications for businesses.",
      founder: {
        "@type": "Person",
        name: "Ömer Akbas",
        jobTitle: "Software Engineer & Founder",
      },
      areaServed: [
        { "@type": "Country", name: "Netherlands" },
        { "@type": "Country", name: "United States" },
        { "@type": "Country", name: "United Kingdom" },
        { "@type": "Country", name: "United Arab Emirates" },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "Zoyare",
      publisher: { "@id": `${BASE_URL}/#organization` },
      inLanguage: "en",
    },
    {
      "@type": "ProfessionalService",
      "@id": `${BASE_URL}/#service`,
      name: "Zoyare",
      url: BASE_URL,
      description:
        "Custom software, API integrations and mobile applications for businesses.",
      areaServed: "Worldwide",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Software Engineering Services",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom Software Development" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "API & System Integrations" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mobile App Development" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Business Process Automation" } },
        ],
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{ colorScheme: "light" }}>
      <head>
        <meta name="theme-color" content="#F8F6F2" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&family=Instrument+Serif:ital@0;1&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { page_path: window.location.pathname });
              `}
            </Script>
          </>
        )}
        <Background />
        <Cursor />
        <ScrollProgress />
        <Nav />
        <main className="relative">{children}</main>
        <ChatWidget />
        <footer className="border-t border-border px-6 md:px-12 py-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <Logo variant="mark" height={16} className="text-primary opacity-30" />
            <span
              className="font-mono text-xs text-muted tracking-widest uppercase"
              suppressHydrationWarning
            >
              Zoyare © {new Date().getFullYear()}
            </span>
          </div>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="font-mono text-xs text-muted tracking-widest uppercase">Available</span>
            </div>
            <Link
              href="/faq"
              className="text-sm text-secondary hover:text-accent transition-colors duration-200"
            >
              FAQ
            </Link>
            <a
              href="mailto:hello@zoyare.com"
              className="text-sm text-secondary hover:text-accent transition-colors duration-200"
            >
              hello@zoyare.com
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
