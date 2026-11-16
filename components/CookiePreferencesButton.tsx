"use client";

import { CONSENT_REOPEN_EVENT } from "@/lib/consent";

export default function CookiePreferencesButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(CONSENT_REOPEN_EVENT))}
      className="text-sm text-[#9b9996] hover:text-background"
    >
      Cookie preferences
    </button>
  );
}
