import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/animations/FadeIn";
import { InvestmentTiers, StepRail, ServiceFaq, PullQuote } from "@/components/PageBlocks";
import { breadcrumbList, service, faqPage } from "@/lib/jsonld";
import { testimonials } from "@/lib/content";

const URL = "https://zoyare.com/software-development-netherlands";

export const metadata: Metadata = {
  title: "Software Development Company in the Netherlands",
  description:
    "Zoyare is a Dutch software engineering studio (KvK 94498555). Custom software, integrations and automation for businesses in the Netherlands and Benelux — EU-hosted, AVG-compliant, invoiced in euros.",
  alternates: { canonical: URL },
  openGraph: {
    title: "Software Development Company in the Netherlands — Zoyare",
    description:
      "Dutch software engineering studio. Custom software, integrations and automation for businesses in the Netherlands and Benelux.",
    url: URL,
  },
};

const faq = [
  {
    q: "Is Zoyare a registered Dutch company?",
    a: "Yes. Zoyare is registered with the Dutch Chamber of Commerce under KvK number 94498555. Contracts run under Dutch law, invoices are issued in euros with Dutch BTW, and reverse-charge VAT applies for clients with an EU VAT number outside the Netherlands.",
  },
  {
    q: "Where is our data stored, and is that AVG/GDPR-compliant?",
    a: "Everything runs on EU infrastructure by default — typically the Amsterdam or Frankfurt regions. You get a processing agreement (verwerkersovereenkomst) before any personal data is touched, and the architecture keeps personal data inside the EU unless you explicitly ask otherwise.",
  },
  {
    q: "Do you work on-site, or fully remote?",
    a: "Mostly remote, which is what keeps the rate honest. But for discovery sessions, workshops and go-live moments an on-site day in the Randstad — Amsterdam, Rotterdam, Utrecht, The Hague — or anywhere else in the Netherlands is straightforward to arrange. Same time zone, no midnight stand-ups.",
  },
  {
    q: "Can you work with our team in Dutch?",
    a: "Yes. Requirement sessions, workshops and day-to-day contact happen in Dutch or English, whichever suits your team. Code, documentation and technical handover are written in English so any future developer can pick them up.",
  },
  {
    q: "Why hire a one-person studio instead of a Dutch software agency?",
    a: "Rate and directness. At a typical agency you pay for an account manager, a project manager and a delivery lead on top of the developer, and you rarely speak to the person writing the code. Here you talk to the engineer. The trade-off is capacity: for work that genuinely needs five people in parallel, an agency is the better fit — and you will hear that during the intake.",
  },
  {
    q: "What happens if you become unavailable mid-project?",
    a: "Every project ships with documented code, automated tests, deployment scripts and a handover file, in your own repository from day one. Nothing runs on infrastructure only Zoyare controls. Any Dutch developer or agency can take over without an archaeology phase first.",
  },
];

const jsonLd = [
  faqPage(faq),
  service({
    name: "Software Development in the Netherlands",
    description:
      "Custom software development, system integrations and process automation for businesses in the Netherlands and Benelux. Dutch KvK-registered studio, EU-hosted, AVG-compliant.",
    path: "/software-development-netherlands",
    serviceType: "Custom Software Development",
  }),
  breadcrumbList([
    { name: "Home", path: "/" },
    { name: "Software development in the Netherlands", path: "/software-development-netherlands" },
  ]),
];

const steps = [
  { num: "01", title: "Intake call", text: "Thirty minutes, free, in Dutch or English. What the process looks like today and what it costs you." },
  { num: "02", title: "Fixed quote", text: "A written proposal with scope, price and delivery date. Not an open-ended hourly estimate." },
  { num: "03", title: "Build in sprints", text: "Working software every two weeks. Feedback lands before it becomes expensive to act on." },
  { num: "04", title: "Handover", text: "Code, tests, documentation and deployment in your own repository. A support contract is optional, never mandatory." },
];

const localFit = [
  {
    title: "Integrations with the Dutch software landscape",
    text: "Exact Online, AFAS, Twinfield, Mollie, PostNL and DHL carrier APIs, Peppol e-invoicing. The bookkeeping and logistics stack most Dutch businesses already run on.",
  },
  {
    title: "Replacing the spreadsheet that runs the company",
    text: "Almost every Dutch SME has one: an Excel file three people are afraid to touch. Turning it into real software is the single most common first project here.",
  },
  {
    title: "AVG-proof client and employee portals",
    text: "Portals where personal data stays inside the EU, with a processing agreement and a retention policy that survives an audit rather than one written after the fact.",
  },
  {
    title: "Automating the manual hand-off",
    text: "Order to invoice, CRM to bookkeeping, warehouse to carrier. The repetitive step someone still does by hand every Friday afternoon.",
  },
];

const propositions: [string, string][] = [
  [
    "Dutch law, Dutch invoice",
    "KvK 94498555. Contracts under Dutch law, euro invoices with BTW, reverse charge for EU VAT numbers abroad. No cross-border procurement exercise to get started.",
  ],
  [
    "Data stays in the EU",
    "EU-region hosting by default and a verwerkersovereenkomst before any personal data moves. AVG compliance designed in, not bolted on at the end.",
  ],
  [
    "One time zone",
    "Europe/Amsterdam. A question in the morning gets an answer the same morning — not after a night shift on the other side of the planet.",
  ],
  [
    "On-site when it matters",
    "Remote by default to keep the rate honest, on-site in the Randstad or anywhere in the Netherlands for discovery, workshops and go-live.",
  ],
];

const furtherReading: [string, string][] = [
  ["/blog/from-excel-to-custom-software", "From Excel to custom software: when to make the jump"],
  ["/blog/build-in-house-or-outsource-software", "Build in-house or outsource? The honest comparison"],
  ["/blog/custom-software-security-gdpr", "Security and GDPR in custom software"],
  ["/blog/vendor-lock-in-software-code-ownership", "Vendor lock-in: who owns the code you paid for"],
];

export default function SoftwareDevelopmentNetherlands() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="pt-32 px-6 md:px-12 pb-24">
        <FadeIn className="mb-20 max-w-4xl">
          <p className="font-mono text-xs text-muted tracking-widest uppercase mb-6">
            Netherlands &amp; Benelux
          </p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-primary leading-[0.93] mb-8">
            Software development
            <br />
            in the <span className="font-display">Netherlands.</span>
          </h1>
          <p className="text-xl md:text-2xl text-secondary font-light leading-relaxed max-w-2xl">
            A Dutch engineering studio for businesses that have outgrown their spreadsheets
            and their off-the-shelf software. KvK-registered, EU-hosted, invoiced in euros —
            and you speak to the person who writes the code.
          </p>
        </FadeIn>

        <FadeIn className="mb-24 border-t border-border pt-16">
          <p className="font-mono text-xs text-muted tracking-widest uppercase mb-10">
            What a Dutch studio changes in practice
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
            {propositions.map(([title, text]) => (
              <div key={title} className="bg-background p-8 hover:bg-surface transition-colors duration-200">
                <h2 className="text-lg font-bold tracking-tight text-primary mb-3">{title}</h2>
                <p className="text-sm text-secondary leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn className="mb-24 border-t border-border pt-16">
          <p className="font-mono text-xs text-muted tracking-widest uppercase mb-10">
            The work Dutch businesses actually ask for
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 max-w-5xl">
            {localFit.map((item) => (
              <div key={item.title}>
                <h2 className="text-lg font-bold tracking-tight text-primary mb-3">
                  <span className="font-mono text-xs text-accent mr-3">—</span>
                  {item.title}
                </h2>
                <p className="text-sm text-secondary leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn className="mb-24 border-t border-border pt-16">
          <p className="font-mono text-xs text-muted tracking-widest uppercase mb-8">Services</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 max-w-4xl">
            <p className="text-secondary leading-relaxed">
              <Link
                href="/services/custom-software"
                className="text-primary underline underline-offset-4 hover:text-accent transition-colors duration-200"
              >
                Custom software development
              </Link>{" "}
              — systems built around your process instead of the other way around.
            </p>
            <p className="text-secondary leading-relaxed">
              <Link
                href="/services/api-integrations"
                className="text-primary underline underline-offset-4 hover:text-accent transition-colors duration-200"
              >
                API &amp; system integrations
              </Link>{" "}
              — connecting the tools your business already pays for.
            </p>
            <p className="text-secondary leading-relaxed">
              <Link
                href="/services/process-automation"
                className="text-primary underline underline-offset-4 hover:text-accent transition-colors duration-200"
              >
                Process automation
              </Link>{" "}
              — removing the manual step that quietly costs a day a week.
            </p>
            <p className="text-secondary leading-relaxed">
              <Link
                href="/services/mobile-applications"
                className="text-primary underline underline-offset-4 hover:text-accent transition-colors duration-200"
              >
                Mobile applications
              </Link>{" "}
              — iOS and Android for teams in the field or customers on the go.
            </p>
          </div>
        </FadeIn>

        <StepRail steps={steps} label="How a project runs" />

        <InvestmentTiers
          tiers={[
            { range: "€5k – €20k", label: "Automation or integration", time: "2–6 weeks" },
            { range: "€20k – €75k", label: "Mid-sized business system", time: "2–4 months" },
            { range: "€75k+", label: "Platform build", time: "4–12 months" },
          ]}
        />

        <PullQuote
          quote={testimonials[2].quote}
          name={testimonials[2].name}
          company={testimonials[2].company}
        />

        <ServiceFaq items={faq} />

        <FadeIn className="mb-24 border-t border-border pt-16">
          <p className="font-mono text-xs text-muted tracking-widest uppercase mb-8">
            Worth reading first
          </p>
          <ul className="space-y-4 max-w-2xl">
            {furtherReading.map(([href, label]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-secondary hover:text-primary transition-colors duration-200 underline underline-offset-4"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </FadeIn>

        <FadeIn className="border-t border-border pt-16">
          <p className="font-mono text-xs text-muted tracking-widest uppercase mb-6">Next step</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-primary mb-4">
            Thirty minutes, in Dutch or English.
          </h2>
          <p className="text-secondary leading-relaxed max-w-xl mb-8">
            Describe the process that is costing you time. You get an honest read on whether
            software is the answer, what it would look like and what it would cost — within
            24 hours, and without a sales call attached.
          </p>
          <div className="flex items-center gap-6 flex-wrap">
            <a
              href="https://cal.eu/zoyare"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 bg-primary text-background text-sm font-medium hover:bg-accent transition-colors duration-300"
            >
              Book a free intake call →
            </a>
            <Link
              href="/estimate"
              className="text-sm text-secondary hover:text-primary transition-colors duration-200 underline underline-offset-4"
            >
              Or get a price indication first
            </Link>
          </div>
        </FadeIn>
      </div>
    </>
  );
}
