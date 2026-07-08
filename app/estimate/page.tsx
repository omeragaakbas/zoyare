import type { Metadata } from "next";
import FadeIn from "@/components/animations/FadeIn";
import EstimateWizard from "@/components/EstimateWizard";
import { webPage, breadcrumbList } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Get an Estimate",
  description:
    "Answer three questions and get an honest price indication for your custom software, integration, mobile app or automation project — based on real project data.",
  alternates: {
    canonical: "https://zoyare.com/estimate",
  },
  openGraph: {
    title: "Get an Estimate — Zoyare",
    description:
      "Three questions, an honest price indication. Custom software, integrations, mobile apps and automation.",
    url: "https://zoyare.com/estimate",
  },
};

const jsonLd = [
  webPage({
    name: "Get an Estimate",
    description:
      "Interactive project estimator for custom software, API integrations, mobile apps and process automation.",
    path: "/estimate",
  }),
  breadcrumbList([
    { name: "Home", path: "/" },
    { name: "Get an Estimate", path: "/estimate" },
  ]),
];

export default function Estimate() {
  return (
    <>
      {jsonLd.map((ld, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
        />
      ))}
      <div className="pt-32 px-6 md:px-12 pb-24">
        <FadeIn className="mb-16 max-w-3xl">
          <p className="font-mono text-xs text-muted tracking-widest uppercase mb-6">
            Project estimator
          </p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-primary leading-[0.93] mb-8">
            What would
            <br />
            it <span className="font-display">cost?</span>
          </h1>
          <p className="text-xl text-secondary font-light leading-relaxed max-w-xl">
            Three questions, an honest indication. The ranges come from real
            projects — no sales games, no &ldquo;it depends&rdquo;.
          </p>
        </FadeIn>

        <FadeIn delay={0.15} className="border-t border-border pt-16 max-w-4xl">
          <EstimateWizard />
        </FadeIn>
      </div>
    </>
  );
}
