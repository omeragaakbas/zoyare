import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for Zoyare software engineering services.",
  alternates: {
    canonical: "https://zoyare.com/terms",
    languages: {
      en: "https://zoyare.com/terms",
      nl: "https://zoyare.com/nl/voorwaarden",
      "x-default": "https://zoyare.com/terms",
    },
  },
};

export default function Terms() {
  return (
    <div className="pt-32 px-6 md:px-12 pb-24 max-w-3xl">
      <p className="font-mono text-xs text-muted tracking-widest uppercase mb-6">
        Legal
      </p>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-primary leading-tight mb-12">
        Terms &amp; Conditions
      </h1>

      <div className="prose-zoyare">
        <p>Last updated: April 2026</p>

        <h2>1. General</h2>
        <p>
          These terms apply to all services provided by Zoyare,
          registered with KvK number 94498555 in the Netherlands. By engaging our services,
          you agree to these terms.
        </p>

        <h2>2. Services</h2>
        <p>
          Zoyare provides custom software development, API integration, mobile application
          development, and business process automation services. The specific scope, timeline,
          and deliverables for each project are defined in a separate project proposal or
          statement of work.
        </p>

        <h2>3. Proposals and agreements</h2>
        <p>
          All proposals are valid for 30 days unless otherwise stated. A project commences
          upon written acceptance of the proposal (email is sufficient). Changes to the scope
          after acceptance may affect timeline and pricing — these will be communicated and
          agreed upon before implementation.
        </p>

        <h2>4. Payment</h2>
        <ul>
          <li>Invoices are due within 14 days of the invoice date unless otherwise agreed.</li>
          <li>For larger projects, payment is split into milestones as defined in the proposal.</li>
          <li>Late payments may incur statutory interest as permitted under Dutch law.</li>
        </ul>

        <h2>5. Intellectual property</h2>
        <p>
          Upon full payment, all intellectual property rights of the delivered software
          transfer to the client, unless otherwise agreed in writing. Third-party libraries
          and open-source components retain their original licenses.
        </p>

        <h2>6. Confidentiality</h2>
        <p>
          Both parties agree to keep confidential any information shared during the course
          of the project. This includes but is not limited to business processes, technical
          documentation, and proprietary data.
        </p>

        <h2>7. Liability</h2>
        <p>
          Zoyare&apos;s liability is limited to the amount invoiced for the specific project
          in question. We are not liable for indirect damages, lost profits, or damages
          resulting from the use of delivered software in production environments without
          adequate testing.
        </p>

        <h2>8. Warranty</h2>
        <p>
          Delivered software includes a 30-day warranty period after delivery. During this
          period, bugs directly related to the agreed scope will be fixed at no additional
          cost. Feature requests or changes outside the original scope are not covered.
        </p>

        <h2>9. Termination</h2>
        <p>
          Either party may terminate the agreement with 14 days written notice. In case of
          termination, work completed up to that point will be invoiced and delivered.
        </p>

        <h2>10. Applicable law</h2>
        <p>
          These terms are governed by Dutch law. Any disputes will be submitted to the
          competent court in the Netherlands.
        </p>
      </div>
    </div>
  );
}
