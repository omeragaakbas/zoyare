import Link from "next/link";
import Logo from "@/components/Logo";
import CookiePreferencesButton from "@/components/CookiePreferencesButton";
import ClosingCta from "@/components/ClosingCta";

type Props = { year: number };

// Same columns, order and words as the footer of the static pages
// (scripts/taste/lib.cjs). Change both when a link changes.
const columns: { title: string; links: [string, string][] }[] = [
  {
    title: "AI services",
    links: [
      ["AI agents", "/services/ai-agents"],
      ["Customer support", "/services/ai-customer-support"],
      ["Ads and video", "/services/creative-production"],
      ["Growth reports", "/services/growth-reporting"],
    ],
  },
  {
    title: "Builds",
    links: [
      ["Custom software", "/services/custom-software"],
      ["Integrations", "/services/api-integrations"],
      ["Mobile apps", "/services/mobile-applications"],
      ["Automation", "/services/process-automation"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About", "/about"],
      ["Portfolio", "/portfolio"],
      ["Blog", "/blog"],
      ["Netherlands", "/software-development-netherlands"],
    ],
  },
  {
    title: "Contact",
    links: [
      ["Contact", "/contact"],
      ["Estimator", "/estimate"],
      ["Questions", "/faq"],
    ],
  },
];

const linkClass =
  "text-[15px] text-background/85 underline-offset-4 decoration-1 hover:text-background hover:underline";

export default function Footer({ year }: Props) {
  return (
    <footer className="cv-auto bg-primary text-background px-6 md:px-20 pt-16 md:pt-24 pb-8">
      <ClosingCta />

      <div className="grid grid-cols-2 md:grid-cols-12 gap-x-6 gap-y-10">
        <div className="col-span-2 md:col-span-4 flex flex-col gap-4">
          <Link href="/" aria-label="Zoyare home" className="text-background w-fit">
            <Logo variant="full" height={20} />
          </Link>
          <p className="text-xl md:text-2xl font-medium tracking-[-0.03em] leading-tight max-w-[22ch]">
            Dutch engineering studio for AI agents, automations and custom software.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title} className="md:col-span-2">
            <h3 className="text-sm font-normal text-[#9b9996] mb-4">{col.title}</h3>
            <ul className="flex flex-col gap-2.5">
              {col.links.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className={linkClass}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 text-sm text-[#9b9996]">
        <span className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span>&copy; {year} Zoyare</span>
          <Link href="/privacy" className="hover:text-background">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-background">
            Terms
          </Link>
          {process.env.NEXT_PUBLIC_GA_ID && <CookiePreferencesButton />}
        </span>
        <span>KvK 94498555</span>
      </div>
    </footer>
  );
}
