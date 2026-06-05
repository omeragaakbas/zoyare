import type { Metadata } from "next";
import { faqsNl } from "@/lib/faqs-nl";
import FAQClientNL from "./FAQClientNL";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Antwoorden op veelgestelde vragen over Zoyare's maatwerk software werk — prijzen, planning, samenwerking en technologie.",
  alternates: {
    canonical: "https://zoyare.com/nl/faq",
    languages: {
      en: "https://zoyare.com/faq",
      nl: "https://zoyare.com/nl/faq",
      "x-default": "https://zoyare.com/faq",
    },
  },
  openGraph: {
    title: "FAQ — Zoyare",
    description:
      "Prijzen, planning, technologie en samenwerking — beantwoord.",
    url: "https://zoyare.com/nl/faq",
    locale: "nl_NL",
  },
};

export default function FAQNL() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "nl-NL",
    mainEntity: faqsNl.flatMap((section) =>
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
      <FAQClientNL faqs={faqsNl} />
    </>
  );
}
