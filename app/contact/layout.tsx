import type { Metadata } from "next";
import { webPage, breadcrumbList } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Discuss your project with Zoyare. Custom software, API integrations and mobile applications — get in touch for a free consultation.",
  alternates: { canonical: "https://zoyare.com/contact" },
  openGraph: {
    title: "Contact — Zoyare",
    description:
      "Discuss your project with Zoyare. Get in touch for a free consultation.",
    url: "https://zoyare.com/contact",
  },
};

const jsonLd = [
  webPage({
    name: "Contact Zoyare",
    description:
      "Get in touch with Zoyare for custom software development, API integrations and mobile applications.",
    path: "/contact",
  }),
  breadcrumbList([
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
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
