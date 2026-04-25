import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/animations/FadeIn";
import { breadcrumbList, service } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Business Process Automation — Automate Manual Workflows",
  description:
    "Automate manual workflows with custom software. Fewer errors, less time, more control. Zoyare builds automation tools for businesses.",
  alternates: { canonical: "https://zoyare.com/services/process-automation" },
  openGraph: {
    title: "Process Automation — Automate Workflows | Zoyare",
    description:
      "Stop with manual spreadsheet processes and repetitive work. Let it be automated.",
    url: "https://zoyare.com/services/process-automation",
  },
};

const jsonLd = [
  service({
    name: "Business Process Automation",
    description:
      "Automation of manual workflows: invoicing, reporting, data processing, document generation and approval flows. Custom-built tools for measurable time savings.",
    path: "/services/process-automation",
    serviceType: "Business Process Automation",
  }),
  breadcrumbList([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services/process-automation" },
    { name: "Process Automation", path: "/services/process-automation" },
  ]),
];

export default function ProcessAutomation() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="pt-32 px-6 md:px-12 pb-24">
      <FadeIn className="mb-20 max-w-4xl">
        <p className="font-mono text-xs text-muted tracking-widest uppercase mb-6">Service</p>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-primary leading-[0.93] mb-8">
          Process
          <br />
          automation.
        </h1>
        <p className="text-xl md:text-2xl text-secondary font-light leading-relaxed max-w-2xl">
          Automate manual workflows. Fewer errors, less time, more
          control — so your team can focus on what actually creates value.
        </p>
      </FadeIn>

      <FadeIn className="mb-24 border-t border-border pt-16">
        <p className="font-mono text-xs text-muted tracking-widest uppercase mb-10">What I automate</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {[
            { title: "Invoicing & administration", text: "From timesheets to sent PDF invoices, without any manual step." },
            { title: "Report generation", text: "Automatic reports based on data from multiple sources." },
            { title: "Data processing", text: "CSV imports, transformations, exports to other systems." },
            { title: "Notifications & alerts", text: "Automatic notifications based on thresholds or events." },
            { title: "Document processing", text: "Templates, bulk generation, digital signing workflows." },
            { title: "Approval workflows", text: "Digital workflows replacing email chains and paper forms." },
          ].map((item) => (
            <div key={item.title} className="bg-background p-8 hover:bg-surface transition-colors duration-200">
              <h3 className="text-base font-medium text-primary mb-3">{item.title}</h3>
              <p className="text-sm text-secondary leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </FadeIn>

      <FadeIn className="mb-24 border-t border-border pt-16">
        <p className="font-mono text-xs text-muted tracking-widest uppercase mb-8">Example</p>
        <div className="bg-surface border border-border p-10 max-w-3xl">
          <p className="font-mono text-xs text-accent tracking-widest uppercase mb-4">Case study</p>
          <h3 className="text-xl font-bold text-primary mb-4">Freelancer Invoicing Automation — ProAspect</h3>
          <p className="text-secondary leading-relaxed mb-6">
            An accounting firm manually processed weekly timesheets from dozens of
            freelancers and generated invoices for their clients. Time-consuming, error-prone and not scalable.
          </p>
          <p className="text-secondary leading-relaxed">
            We built an automation tool that handles the entire process: CSV upload of
            timesheets → validation → invoice calculation → PDF generation → delivery. The manual
            work has been eliminated.
          </p>
        </div>
      </FadeIn>

      <FadeIn className="border-t border-border pt-16">
        <p className="font-mono text-xs text-muted tracking-widest uppercase mb-6">Next step</p>
        <p className="text-3xl md:text-4xl font-bold tracking-tighter text-primary mb-8">
          Which process do you want to automate?
        </p>
        <Link href="/contact" className="inline-flex items-center gap-3 px-6 py-3 bg-primary text-background text-sm font-medium hover:bg-accent transition-colors duration-300">
          Tell me more →
        </Link>
      </FadeIn>
    </div>
    </>
  );
}
