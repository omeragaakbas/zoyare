"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";
import CookiePreferencesButton from "@/components/CookiePreferencesButton";
import { localeFromPath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

type Props = { year: number };

export default function Footer({ year }: Props) {
  const pathname = usePathname();
  const locale = localeFromPath(pathname || "/");
  const d = getDictionary(locale);

  const linkPrefix = locale === "nl" ? "/nl" : "";
  const servicePrefix = locale === "nl" ? "/nl/diensten" : "/services";
  const aboutHref = locale === "nl" ? "/nl/over-ons" : "/about";
  const privacyHref = locale === "nl" ? "/nl/privacy" : "/privacy";
  const termsHref = locale === "nl" ? "/nl/voorwaarden" : "/terms";

  return (
    <footer className="border-t border-border px-6 md:px-12 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div>
          <Logo variant="mark" height={20} className="text-primary opacity-40 mb-4" />
          <p className="text-sm text-secondary leading-relaxed mb-4">
            {d.footer.tagline}
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="font-mono text-xs text-muted tracking-widest uppercase">
              {d.footer.available}
            </span>
          </div>
        </div>

        <div>
          <p className="font-mono text-xs text-muted tracking-widest uppercase mb-4">
            {d.footer.servicesLabel}
          </p>
          <div className="flex flex-col gap-2.5">
            {d.services.items.map((s) => (
              <Link
                key={s.slug}
                href={s.href}
                className="text-sm text-secondary hover:text-accent transition-colors duration-200"
              >
                {s.title}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="font-mono text-xs text-muted tracking-widest uppercase mb-4">
            {d.footer.companyLabel}
          </p>
          <div className="flex flex-col gap-2.5">
            <Link href={aboutHref} className="text-sm text-secondary hover:text-accent transition-colors duration-200">{d.footer.aboutLinks.about}</Link>
            <Link href={`${linkPrefix}/portfolio`} className="text-sm text-secondary hover:text-accent transition-colors duration-200">{d.footer.aboutLinks.portfolio}</Link>
            <Link href={`${linkPrefix}/blog`} className="text-sm text-secondary hover:text-accent transition-colors duration-200">{d.footer.aboutLinks.blog}</Link>
            <Link href={`${linkPrefix}/faq`} className="text-sm text-secondary hover:text-accent transition-colors duration-200">{d.footer.aboutLinks.faq}</Link>
            <Link href={`${linkPrefix}/contact`} className="text-sm text-secondary hover:text-accent transition-colors duration-200">{d.footer.aboutLinks.contact}</Link>
          </div>
        </div>

        <div>
          <p className="font-mono text-xs text-muted tracking-widest uppercase mb-4">
            {d.footer.contactLabel}
          </p>
          <div className="flex flex-col gap-2.5">
            <a href="mailto:hello@zoyare.com" className="text-sm text-secondary hover:text-accent transition-colors duration-200">hello@zoyare.com</a>
            <a href="https://cal.eu/zoyare" target="_blank" rel="noopener noreferrer" className="text-sm text-secondary hover:text-accent transition-colors duration-200">{d.footer.scheduleCall}</a>
            <a href="https://www.linkedin.com/company/zoyare/" target="_blank" rel="noopener noreferrer" className="text-sm text-secondary hover:text-accent transition-colors duration-200">LinkedIn</a>
            <a href="https://www.instagram.com/zoyarehq/" target="_blank" rel="noopener noreferrer" className="text-sm text-secondary hover:text-accent transition-colors duration-200">Instagram</a>
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-6">
          <span className="font-mono text-xs text-muted tracking-widest uppercase">
            Zoyare &copy; {year}
          </span>
          <span className="font-mono text-xs text-muted">KvK: 94498555</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href={privacyHref} className="font-mono text-xs text-muted hover:text-accent transition-colors duration-200 tracking-widest uppercase">
            {d.footer.privacy}
          </Link>
          <Link href={termsHref} className="font-mono text-xs text-muted hover:text-accent transition-colors duration-200 tracking-widest uppercase">
            {d.footer.terms}
          </Link>
          <CookiePreferencesButton />
        </div>
      </div>
    </footer>
  );
}
