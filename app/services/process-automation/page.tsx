import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/animations/FadeIn";
import { ServiceFaq, PullQuote } from "@/components/PageBlocks";
import { breadcrumbList, service, faqPage } from "@/lib/jsonld";
import { testimonials } from "@/lib/content";

export const metadata: Metadata = {
  title: "Business Process Automation — Automate Manual Workflows",
  description:
    "Automate manual workflows with custom software. Fewer errors, less time, more control. Zoyare builds automation tools for businesses.",
  alternates: {
    canonical: "https://zoyare.com/services/process-automation",
  },
  openGraph: {
    title: "Process Automation — Automate Workflows | Zoyare",
    description:
      "Stop with manual spreadsheet processes and repetitive work. Let it be automated.",
    url: "https://zoyare.com/services/process-automation",
  },
};

const faq = [
  {
    q: "Which processes are worth automating?",
    a: "Repetitive, rule-based work that eats hours every week: invoicing, report generation, data entry between systems, document creation. Rule of thumb: if a process follows the same steps every time and costs your team multiple hours weekly, automation usually pays for itself quickly.",
  },
  {
    q: "Will automation work with the tools we already use?",
    a: "Yes — that's the point. Automation is built around your existing tools (Excel, e-mail, accounting software, CRM), not as a replacement for them. Your team keeps working the way they know; the robot work disappears.",
  },
  {
    q: "What if our process changes later?",
    a: "Processes always change, so automations are built with configuration instead of hard-coded rules where it matters — rates, templates, recipients. Small changes you adjust yourself; bigger ones are a small, quoted adjustment.",
  },
  {
    q: "How quickly does automation pay for itself?",
    a: "For a weekly manual process, typically within months. Example: ProAspect's invoicing took several hours every week and now runs fully automatically with zero errors. Multiply your hours per week by an honest hourly cost and compare that to a one-time build — the math is usually clear.",
  },
];

const jsonLd = [
  faqPage(faq),
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
          <span className="font-display">automation.</span>
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
        <Link
          href="/portfolio/proaspect"
          className="group block bg-surface border border-border p-10 max-w-3xl hover:border-muted transition-colors duration-200"
        >
          <p className="font-mono text-xs text-accent tracking-widest uppercase mb-4">Case study</p>
          <h3 className="text-xl font-bold text-primary mb-4 group-hover:text-accent transition-colors duration-200">
            Freelancer Invoicing Automation — ProAspect
          </h3>
          <p className="text-secondary leading-relaxed mb-6">
            An accounting firm manually processed weekly timesheets from dozens of
            freelancers and generated invoices for their clients. Time-consuming, error-prone and not scalable.
          </p>
          <p className="text-secondary leading-relaxed mb-6">
            We built an automation tool that handles the entire process: CSV upload of
            timesheets → validation → invoice calculation → PDF generation → delivery. The manual
            work has been eliminated.
          </p>
          <span className="font-mono text-xs text-muted tracking-widest uppercase group-hover:text-accent transition-colors duration-200">
            View the case →
          </span>
        </Link>
      </FadeIn>

      <PullQuote
        quote={testimonials[2].quote}
        name={testimonials[2].name}
        company={testimonials[2].company}
      />

      <ServiceFaq items={faq} />

      <FadeIn className="border-t border-border pt-16">
        <p className="font-mono text-xs text-muted tracking-widest uppercase mb-6">Next step</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-primary mb-4">
          Which process is eating your time?
        </h2>
        <p className="text-secondary leading-relaxed max-w-xl mb-8">
          Tell me about the manual work that&apos;s slowing you down. I&apos;ll assess whether
          automation makes sense and estimate the time and cost savings — free, within 24 hours.
        </p>
        <div className="flex items-center gap-6 flex-wrap">
          <a
            href="https://cal.eu/zoyare"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 bg-primary text-background text-sm font-medium hover:bg-accent transition-colors duration-300"
          >
            Book a free automation review →
          </a>
          <Link
            href="/contact"
            className="text-sm text-secondary hover:text-primary transition-colors duration-200 underline underline-offset-4"
          >
            Or send a message
          </Link>
        </div>
      </FadeIn>
    </div>
    </>
  );
}
