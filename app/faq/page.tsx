import type { Metadata } from "next";
import { faqs } from "@/lib/faqs";
import FAQClient from "./FAQClient";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about Zoyare's custom software work — pricing, timelines, collaboration and technologies.",
  alternates: {
    canonical: "https://zoyare.com/faq",
  },
  openGraph: {
    title: "FAQ — Zoyare",
    description:
      "Pricing, timelines, technologies and collaboration — answered.",
    url: "https://zoyare.com/faq",
  },
};

export default function FAQ() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.flatMap((section) =>
      section.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      }))
    ),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FAQClient faqs={faqs} />
    </>
  );
}
