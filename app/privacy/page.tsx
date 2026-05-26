import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Zoyare — how we handle your data.",
  alternates: { canonical: "https://zoyare.com/privacy" },
};

export default function Privacy() {
  return (
    <div className="pt-32 px-6 md:px-12 pb-24 max-w-3xl">
      <p className="font-mono text-xs text-muted tracking-widest uppercase mb-6">
        Legal
      </p>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-primary leading-tight mb-12">
        Privacy Policy
      </h1>

      <div className="prose-zoyare">
        <p>Last updated: April 2026</p>

        <h2>Who we are</h2>
        <p>
          Zoyare is a software engineering studio based in the Netherlands.
          KvK: 94498555. For questions about this policy, contact us at{" "}
          <a href="mailto:hello@zoyare.com">hello@zoyare.com</a>.
        </p>

        <h2>What data we collect</h2>
        <p>We collect the following data when you interact with our website:</p>
        <ul>
          <li>
            <strong>Contact form:</strong> name, email address, company name (optional),
            and your message. We use this solely to respond to your inquiry.
          </li>
          <li>
            <strong>Lead magnet:</strong> email address when you download a resource. We
            use this to send you the requested content.
          </li>
          <li>
            <strong>Analytics:</strong> we use Google Analytics 4 to collect anonymized
            usage data (pages visited, time on site, device type). No personally
            identifiable information is stored.
          </li>
          <li>
            <strong>Chat widget:</strong> messages you send through our AI chat assistant
            are processed to provide answers. We do not store these conversations.
          </li>
        </ul>

        <h2>How we use your data</h2>
        <ul>
          <li>To respond to your contact form submissions</li>
          <li>To deliver requested content (lead magnets)</li>
          <li>To understand how visitors use our website and improve it</li>
          <li>To communicate about projects if you become a client</li>
        </ul>

        <h2>Third-party services</h2>
        <p>We use the following third-party services:</p>
        <ul>
          <li>
            <strong>Resend</strong> — for sending emails (contact form, lead magnets)
          </li>
          <li>
            <strong>Google Analytics 4</strong> — for anonymized website analytics
          </li>
          <li>
            <strong>Vercel</strong> — for hosting our website
          </li>
        </ul>

        <h2>Cookies</h2>
        <p>
          Our website uses functional cookies required for the website to work properly.
          Google Analytics may set cookies to track anonymized usage. You can disable
          cookies in your browser settings at any time.
        </p>

        <h2>Data retention</h2>
        <p>
          Contact form data is retained for the duration of our correspondence and deleted
          afterward unless a business relationship is established. Analytics data is
          retained for 14 months per Google Analytics default settings.
        </p>

        <h2>Your rights</h2>
        <p>
          Under the GDPR, you have the right to access, rectify, or delete your personal
          data. You can also object to processing or request data portability. To exercise
          these rights, email us at{" "}
          <a href="mailto:hello@zoyare.com">hello@zoyare.com</a>.
        </p>

        <h2>Changes</h2>
        <p>
          We may update this policy from time to time. Changes will be posted on this page
          with an updated date.
        </p>
      </div>
    </div>
  );
}
