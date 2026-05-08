"use client";

import { CONSENT_REOPEN_EVENT } from "@/lib/consent";

export default function CookiePreferencesButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(CONSENT_REOPEN_EVENT))}
      className="font-mono text-xs text-muted hover:text-accent transition-colors duration-200 tracking-widest uppercase"
    >
      Cookie preferences
    </button>
  );
}
