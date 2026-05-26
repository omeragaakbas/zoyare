import type { Metadata } from "next";
import Script from "next/script";
import { Space_Grotesk, Space_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Nav from "@/components/Nav";
import Logo from "@/components/Logo";
import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";
import ChatWidget from "@/components/ChatWidget";
import Background from "@/components/Background";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
        "@type": "Organization",
        name: "Zoyare",
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
    <html lang="en" className={`${spaceGrotesk.variable} ${spaceMono.variable} ${instrumentSerif.variable}`} style={{ colorScheme: "light" }}>
      <head>
        <meta name="theme-color" content="#F8F6F2" />
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
        <footer className="border-t border-border px-6 md:px-12 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div>
              <Logo variant="mark" height={20} className="text-primary opacity-40 mb-4" />
              <p className="text-sm text-secondary leading-relaxed mb-4">
                Software engineering studio. Custom software, API integrations and mobile apps.
              </p>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="font-mono text-xs text-muted tracking-widest uppercase">Available for projects</span>
              </div>
            </div>

            <div>
              <p className="font-mono text-xs text-muted tracking-widest uppercase mb-4">Services</p>
              <div className="flex flex-col gap-2.5">
                <Link href="/services/custom-software" className="text-sm text-secondary hover:text-accent transition-colors duration-200">Custom Software</Link>
                <Link href="/services/api-integrations" className="text-sm text-secondary hover:text-accent transition-colors duration-200">API & Integrations</Link>
                <Link href="/services/mobile-applications" className="text-sm text-secondary hover:text-accent transition-colors duration-200">Mobile Applications</Link>
                <Link href="/services/process-automation" className="text-sm text-secondary hover:text-accent transition-colors duration-200">Process Automation</Link>
              </div>
            </div>

            <div>
              <p className="font-mono text-xs text-muted tracking-widest uppercase mb-4">Company</p>
              <div className="flex flex-col gap-2.5">
                <Link href="/about" className="text-sm text-secondary hover:text-accent transition-colors duration-200">About</Link>
                <Link href="/portfolio" className="text-sm text-secondary hover:text-accent transition-colors duration-200">Portfolio</Link>
                <Link href="/blog" className="text-sm text-secondary hover:text-accent transition-colors duration-200">Blog</Link>
                <Link href="/faq" className="text-sm text-secondary hover:text-accent transition-colors duration-200">FAQ</Link>
                <Link href="/contact" className="text-sm text-secondary hover:text-accent transition-colors duration-200">Contact</Link>
              </div>
            </div>

            <div>
              <p className="font-mono text-xs text-muted tracking-widest uppercase mb-4">Contact</p>
              <div className="flex flex-col gap-2.5">
                <a href="mailto:hello@zoyare.com" className="text-sm text-secondary hover:text-accent transition-colors duration-200">hello@zoyare.com</a>
                <a href="https://cal.eu/zoyare" target="_blank" rel="noopener noreferrer" className="text-sm text-secondary hover:text-accent transition-colors duration-200">Schedule a call</a>
                <a href="https://www.linkedin.com/company/zoyare/" target="_blank" rel="noopener noreferrer" className="text-sm text-secondary hover:text-accent transition-colors duration-200">LinkedIn</a>
                <a href="https://www.instagram.com/zoyarehq/" target="_blank" rel="noopener noreferrer" className="text-sm text-secondary hover:text-accent transition-colors duration-200">Instagram</a>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-6">
              <span
                className="font-mono text-xs text-muted tracking-widest uppercase"
                suppressHydrationWarning
              >
                Zoyare &copy; {new Date().getFullYear()}
              </span>
              <span className="font-mono text-xs text-muted">KvK: 94498555</span>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="font-mono text-xs text-muted hover:text-accent transition-colors duration-200 tracking-widest uppercase">Privacy</Link>
              <Link href="/terms" className="font-mono text-xs text-muted hover:text-accent transition-colors duration-200 tracking-widest uppercase">Terms</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
