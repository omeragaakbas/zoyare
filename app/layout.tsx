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
import MotionProvider from "@/components/MotionProvider";
import { Analytics } from "@vercel/analytics/next";
import { getAllPosts } from "@/lib/blog";
import { projects } from "@/lib/content";
import { dict } from "@/lib/dictionary";

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
    default: "Zoyare — Custom Software Development in the Netherlands",
    template: "%s — Zoyare",
  },
  description:
    "Dutch software engineering studio. Custom software, API integrations, mobile apps and process automation for businesses in the Netherlands and Benelux. Fixed quote after a free intake call.",
  keywords: [
    "custom software development netherlands",
    "software development company netherlands",
    "software ontwikkeling op maat",
    "api integration netherlands",
    "maatwerk software",
    "software engineering studio",
    "mobile app development netherlands",
    "process automation",
    "mendix developer netherlands",
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
    title: "Zoyare — Custom Software Development in the Netherlands",
    description:
      "Dutch software engineering studio. Custom software, API integrations and mobile apps for businesses in the Netherlands and Benelux.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zoyare — Custom Software Development in the Netherlands",
    description:
      "Dutch software engineering studio. Custom software, API integrations and mobile apps for businesses in the Netherlands and Benelux.",
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
        // PNG route — Google's logo rich results don't reliably accept SVG
        url: `${BASE_URL}/apple-icon`,
        width: 180,
        height: 180,
      },
      email: "hello@zoyare.com",
      description:
        "Dutch software engineering studio for custom software, API integrations, mobile applications and process automation. Based in the Netherlands, working with businesses across the Benelux and worldwide.",
      foundingDate: "2024",
      // Chamber of Commerce registration — a verifiable entity signal for a studio that
      // deliberately stays anonymous at the person level.
      legalName: "Zoyare",
      identifier: {
        "@type": "PropertyValue",
        name: "KvK",
        value: "94498555",
      },
      address: {
        "@type": "PostalAddress",
        addressCountry: "NL",
      },
      knowsLanguage: ["nl-NL", "en-GB"],
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
      // Home market first: the Netherlands and Benelux are where Zoyare can realistically
      // rank and where a client can meet in person. The rest stays listed, not led with.
      areaServed: [
        { "@type": "Country", name: "Netherlands" },
        { "@type": "Country", name: "Belgium" },
        { "@type": "Country", name: "Luxembourg" },
        { "@type": "Country", name: "Germany" },
        { "@type": "Country", name: "United Kingdom" },
        { "@type": "Country", name: "United States" },
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
        "Custom software, API integrations and mobile applications for businesses in the Netherlands and Benelux.",
      email: "hello@zoyare.com",
      priceRange: "€€€",
      currenciesAccepted: "EUR",
      address: {
        "@type": "PostalAddress",
        addressCountry: "NL",
      },
      areaServed: [
        { "@type": "Country", name: "Netherlands" },
        { "@type": "Country", name: "Belgium" },
        { "@type": "AdministrativeArea", name: "Benelux" },
      ],
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

// Lightweight index for the ⌘K command palette — labels and hrefs only.
const paletteEntries = [
  { group: "Pages", label: "Home", href: "/" },
  { group: "Pages", label: "Portfolio", href: "/portfolio" },
  { group: "Pages", label: "Blog", href: "/blog" },
  { group: "Pages", label: "About", href: "/about" },
  { group: "Pages", label: "Contact", href: "/contact" },
  { group: "Pages", label: "FAQ", href: "/faq" },
  { group: "Pages", label: "Get an estimate", href: "/estimate" },
  { group: "Pages", label: "For Dutch businesses", href: "/software-development-netherlands" },
  ...dict.services.items.map((s) => ({
    group: "Services",
    label: s.title,
    href: s.href,
  })),
  ...projects.map((p) => ({
    group: "Work",
    label: `${p.client} — ${p.title}`,
    href: `/portfolio/${p.id}`,
  })),
  ...getAllPosts().map((p) => ({
    group: "Articles",
    label: p.title,
    href: `/blog/${p.slug}`,
  })),
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${spaceMono.variable} ${instrumentSerif.variable}`} style={{ colorScheme: "light" }}>
      <head>
        <meta name="theme-color" content="#F8F6F2" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Zoyare — Blog"
          href="/feed.xml"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[10000] focus:bg-primary focus:text-background focus:px-4 focus:py-2 focus:text-sm"
        >
          Skip to content
        </a>
        {GA_ID && <AnalyticsLoader gaId={GA_ID} />}
        <Background />
        <MotionProvider>
          <ScrollProgress />
          <Nav />
          <main id="main" className="relative">{children}</main>
          <ClientShell palette={paletteEntries} />
          <Footer year={CURRENT_YEAR} />
          {/* Only ask for consent when there is actually a tracker to consent to */}
          {GA_ID && <CookieConsent />}
        </MotionProvider>
        <Analytics />
      </body>
    </html>
  );
}
