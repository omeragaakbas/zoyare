"use client";

import { useEffect, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  hasDecided,
  setConsent,
  CONSENT_CHANGED_EVENT,
  CONSENT_REOPEN_EVENT,
} from "@/lib/consent";

export default function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!hasDecided()) {
      const t = setTimeout(() => setOpen(true), 400);
      return () => clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    const reopen = () => setOpen(true);
    window.addEventListener(CONSENT_REOPEN_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_REOPEN_EVENT, reopen);
  }, []);

  function decide(analytics: boolean, marketing: boolean) {
    setConsent({ analytics, marketing });
    window.dispatchEvent(new Event(CONSENT_CHANGED_EVENT));
    setOpen(false);
  }

  return (
    <AnimatePresence>
      {open && (
        <m.div
          role="dialog"
          aria-label="Cookie consent"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 md:pb-6 pointer-events-none"
        >
          <div className="mx-auto max-w-3xl bg-background border border-border shadow-lg p-6 md:p-7 pointer-events-auto">
            <p className="font-mono text-[11px] text-muted tracking-widest uppercase mb-3">
              Cookies
            </p>
            <p className="text-sm text-secondary leading-relaxed mb-5">
              We use Google Analytics to understand how visitors use our site.
              With your permission we also use advertising cookies, which let us
              measure whether our ads bring in the right people. No personal
              data is sold or shared.
            </p>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <Link
                href="/privacy"
                className="font-mono text-xs text-muted hover:text-accent transition-colors duration-200 tracking-widest uppercase"
              >
                Read our Privacy Policy
              </Link>
              <div className="flex items-center gap-5">
                <button
                  type="button"
                  onClick={() => decide(false, false)}
                  className="text-sm text-secondary hover:text-primary transition-colors duration-200 underline underline-offset-4"
                >
                  Reject
                </button>
                <button
                  type="button"
                  onClick={() => decide(true, false)}
                  className="text-sm text-secondary hover:text-primary transition-colors duration-200 underline underline-offset-4"
                >
                  Analytics only
                </button>
                <button
                  type="button"
                  onClick={() => decide(true, true)}
                  className="group relative inline-flex items-center px-6 py-2.5 bg-primary text-background text-sm font-medium overflow-hidden"
                >
                  <m.span
                    className="absolute inset-0 bg-accent"
                    initial={{ y: "100%" }}
                    whileHover={{ y: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                    Accept all
                  </span>
                </button>
              </div>
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
