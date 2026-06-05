import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import ScrollProgress from "@/components/ScrollProgress";
import Background from "@/components/Background";
import CookieConsent from "@/components/CookieConsent";
import AnalyticsLoader from "@/components/AnalyticsLoader";
import ClientShell from "@/components/ClientShell";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const BASE_URL = "https://zoyare.com";

const CURRENT_YEAR = new Date().getFullYear();

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
  authors: [{ name: "Zoyare", url: BASE_URL }],
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
    languages: {
      en: BASE_URL,
      nl: `${BASE_URL}/nl`,
      "x-default": BASE_URL,
    },
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
      foundingDate: "2024",
      founder: {
        "@type": "Person",
        name: "Ömer Akbas",
      },
      address: {
        "@type": "PostalAddress",
        addressCountry: "NL",
      },
      contactPoint: {
        "@type": "ContactPoint",
        email: "hello@zoyare.com",
        url: "https://cal.eu/zoyare",
        contactType: "customer service",
        availableLanguage: ["English", "Dutch"],
      },
      sameAs: [
        "https://www.linkedin.com/company/zoyare/",
        "https://www.instagram.com/zoyarehq/",
      ],
      knowsAbout: [
        "Custom Software Development",
        "API Integration",
        "Mobile App Development",
        "Business Process Automation",
      ],
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
    <html lang="en" className={`${spaceGrotesk.variable} ${spaceMono.variable} ${instrumentSerif.variable}`} style={{ colorScheme: "light" }}>
      <head>
        <meta name="theme-color" content="#F8F6F2" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {GA_ID && <AnalyticsLoader gaId={GA_ID} />}
        <Background />
        <ScrollProgress />
        <Nav />
        <main className="relative">{children}</main>
        <ClientShell />
        <Footer year={CURRENT_YEAR} />
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
