import type { Metadata } from "next";
import { webPage, breadcrumbList } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Bespreek je project met Zoyare. Maatwerk software, API-integraties en mobiele applicaties — neem contact op voor een vrijblijvend gesprek.",
  alternates: {
    canonical: "https://zoyare.com/nl/contact",
    languages: {
      en: "https://zoyare.com/contact",
      nl: "https://zoyare.com/nl/contact",
      "x-default": "https://zoyare.com/contact",
    },
  },
  openGraph: {
    title: "Contact — Zoyare",
    description:
      "Bespreek je project met Zoyare. Neem contact op voor een vrijblijvend gesprek.",
    url: "https://zoyare.com/nl/contact",
    locale: "nl_NL",
  },
};

const jsonLd = [
  webPage({
    name: "Contact Zoyare",
    description:
      "Neem contact op met Zoyare voor maatwerk software development, API-integraties en mobiele applicaties.",
    path: "/nl/contact",
  }),
  breadcrumbList([
    { name: "Home", path: "/nl" },
    { name: "Contact", path: "/nl/contact" },
  ]),
];

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {jsonLd.map((ld, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
        />
      ))}
      {children}
    </>
  );
}
