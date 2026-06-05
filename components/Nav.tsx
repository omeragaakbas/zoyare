"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/Logo";
import {
  alternatePath,
  localeFromPath,
  LOCALE_COOKIE,
  type Locale,
} from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

type NavLink = { href: string; label: string };

function linksForLocale(locale: Locale): NavLink[] {
  const d = getDictionary(locale);
  if (locale === "nl") {
    return [
      { href: "/nl/portfolio", label: d.nav.portfolio },
      { href: "/nl/blog", label: d.nav.blog },
      { href: "/nl/over-ons", label: d.nav.about },
      { href: "/nl/contact", label: d.nav.contact },
    ];
  }
  return [
    { href: "/portfolio", label: d.nav.portfolio },
    { href: "/blog", label: d.nav.blog },
    { href: "/about", label: d.nav.about },
    { href: "/contact", label: d.nav.contact },
  ];
}

function setLocaleCookie(locale: Locale) {
  if (typeof document === "undefined") return;
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
}

export default function Nav() {
  const pathname = usePathname();
  const locale = localeFromPath(pathname || "/");
  const links = linksForLocale(locale);
  const altLocale: Locale = locale === "en" ? "nl" : "en";
  const altPath =
    alternatePath(pathname || "/", altLocale) ??
    (altLocale === "nl" ? "/nl" : "/");
  const d = getDictionary(locale);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const homeHref = locale === "nl" ? "/nl" : "/";

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16 border-b border-border bg-background/80 backdrop-blur-md">
        <Link
          href={homeHref}
          className="text-primary hover:text-accent transition-colors duration-200"
          aria-label="Zoyare home"
        >
          <Logo variant="full" height={20} animate />
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <li key={href} className="relative flex flex-col items-center gap-1.5">
                <Link
                  href={href}
                  className={`text-sm transition-colors duration-200 rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                    active ? "text-primary" : "text-secondary hover:text-primary"
                  }`}
                >
                  {label}
                </Link>
                {active && (
                  <span className="absolute -bottom-[22px] w-1 h-1 rounded-full bg-accent" />
                )}
              </li>
            );
          })}
          <li className="ml-2 flex items-center gap-1.5 border-l border-border pl-4">
            <Link
              href={altPath}
              onClick={() => setLocaleCookie(altLocale)}
              className="font-mono text-xs tracking-widest uppercase text-secondary hover:text-accent transition-colors duration-200"
              aria-label={altLocale === "nl" ? "Bekijk in het Nederlands" : "View in English"}
            >
              {d.nav.languageSwitch[altLocale]}
            </Link>
          </li>
        </ul>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px]"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span className={`block w-5 h-px bg-primary transition-all duration-300 ${open ? "translate-y-[3px] rotate-45" : ""}`} />
          <span className={`block w-5 h-px bg-primary transition-all duration-300 ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background pt-16 md:hidden"
          >
            <div className="flex flex-col px-6 pt-12">
              {links.map(({ href, label }, i) => {
                const active = pathname === href;
                return (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.06 }}
                  >
                    <Link
                      href={href}
                      className={`block py-4 border-b border-border text-2xl font-bold tracking-tight transition-colors duration-200 ${
                        active ? "text-accent" : "text-primary"
                      }`}
                    >
                      {label}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: links.length * 0.06 }}
              >
                <Link
                  href={altPath}
                  onClick={() => setLocaleCookie(altLocale)}
                  className="block py-4 border-b border-border text-2xl font-bold tracking-tight text-secondary"
                >
                  {altLocale === "nl" ? "Bekijk in Nederlands" : "View in English"}
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="mt-12"
              >
                <a
                  href="mailto:hello@zoyare.com"
                  className="font-mono text-xs text-muted tracking-widest uppercase"
                >
                  hello@zoyare.com
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
