"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { m, AnimatePresence } from "framer-motion";
import Logo from "@/components/Logo";
import { dict } from "@/lib/dictionary";
import { contact } from "@/lib/content";
import { track } from "@/lib/track";

const links = [
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: dict.nav.portfolio },
  { href: "/blog", label: dict.nav.blog },
  { href: "/about", label: dict.nav.about },
  { href: "/contact", label: dict.nav.contact },
];

export default function Nav() {
  const pathname = usePathname();

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

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-20 h-14 md:h-[72px] border-b border-border bg-background">
        <Link
          href="/"
          className="text-primary hover:text-accent transition-colors duration-200"
          aria-label="Zoyare home"
        >
          <Logo variant="full" height={20} animate />
        </Link>

        <div className="hidden md:flex flex-1 items-center justify-end gap-8">
          <ul className="absolute left-1/2 -translate-x-1/2 flex items-center gap-8">
            {links.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <li key={href} className="relative flex flex-col items-center gap-1.5">
                  <Link
                    href={href}
                    className={`text-[15px] font-medium text-primary underline-offset-8 decoration-2 hover:underline ${
                      active ? "underline decoration-accent" : ""
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href="/estimate"
            onClick={() => track("estimate_click", { source: "nav" })}
            className="inline-flex h-11 items-center rounded-lg bg-accent px-6 text-base font-medium text-[#111111] transition-transform duration-150 hover:-translate-y-px active:translate-y-0"
          >
            Get a price indication
          </Link>
        </div>

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
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background pt-14 md:hidden"
          >
            <div className="flex flex-col px-6 pt-12">
              {links.map(({ href, label }, i) => {
                const active = pathname === href;
                return (
                  <m.div
                    key={href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.06 }}
                  >
                    <Link
                      href={href}
                      className={`block py-4 border-b border-border text-2xl font-medium tracking-tight transition-colors duration-200 ${
                        active ? "text-accent" : "text-primary"
                      }`}
                    >
                      {label}
                    </Link>
                  </m.div>
                );
              })}
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="mt-12 flex flex-col items-start gap-6"
              >
                <Link
                  href="/estimate"
                  className="inline-flex h-12 items-center rounded-lg bg-accent px-6 text-base font-medium text-[#111111]"
                >
                  Get a price indication
                </Link>
                <a
                  href="mailto:hello@zoyare.com"
                  className="font-mono text-xs text-muted tracking-widest uppercase"
                >
                  hello@zoyare.com
                </a>
              </m.div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
