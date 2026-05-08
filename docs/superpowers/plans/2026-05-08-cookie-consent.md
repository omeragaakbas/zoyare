# Cookie Consent Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Block GA4 (`G-RGS25GLB2M`) until the visitor accepts cookies via a minimal AVG-compliant banner, with a footer link to revisit the choice later.

**Architecture:** A pure consent module (`lib/consent.ts`) handles localStorage state and event names. Three small client components consume it: a banner UI (`CookieConsent`), a conditional GA loader (`AnalyticsLoader`), and a tiny footer button (`CookiePreferencesButton`). The server-rendered `app/layout.tsx` mounts all three; GA scripts only render when consent is granted, decoupled from layout via a `consent-changed` event.

**Tech Stack:** Next.js 15 (App Router, server + client components), TypeScript, Tailwind CSS, Framer Motion (already a dep).

**Note on testing:** This project has no test framework configured. Verification is via TypeScript compile (`npm run build`) and manual browser checks against the spec's acceptance criteria. For `lib/consent.ts` (pure functions), a quick one-shot Node script verifies behavior before integration.

---

## File structure

**Create:**
- `lib/consent.ts` — pure state functions + event name constants
- `components/CookieConsent.tsx` — banner UI client component
- `components/AnalyticsLoader.tsx` — conditional GA4 script loader (client)
- `components/CookiePreferencesButton.tsx` — footer button to re-open banner (client)

**Modify:**
- `app/layout.tsx` — replace inline GA `<Script>` block with `<AnalyticsLoader />`, mount `<CookieConsent />` in body, add `<CookiePreferencesButton />` to footer's bottom row

---

## Task 1: Create `lib/consent.ts`

**Files:**
- Create: `lib/consent.ts`

- [ ] **Step 1: Write the file**

```ts
const STORAGE_KEY = "zoyare-consent";
const EXPIRY_MS = 365 * 24 * 60 * 60 * 1000;

export const CONSENT_CHANGED_EVENT = "consent-changed";
export const CONSENT_REOPEN_EVENT = "consent:reopen";

export type ConsentState = {
  analytics: boolean;
  timestamp: number;
};

export type ConsentInput = Omit<ConsentState, "timestamp">;

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

function isExpired(state: ConsentState): boolean {
  return Date.now() - state.timestamp > EXPIRY_MS;
}

export function getConsent(): ConsentState | null {
  if (!isBrowser()) return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentState;
    if (
      typeof parsed.analytics !== "boolean" ||
      typeof parsed.timestamp !== "number"
    ) {
      return null;
    }
    if (isExpired(parsed)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function setConsent(input: ConsentInput): void {
  if (!isBrowser()) return;
  const state: ConsentState = { ...input, timestamp: Date.now() };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage may be unavailable in private browsing
  }
}

export function hasDecided(): boolean {
  return getConsent() !== null;
}

export function clearConsent(): void {
  if (!isBrowser()) return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
```

- [ ] **Step 2: Type-check by running build**

Run: `npm run build`
Expected: build succeeds with no TypeScript errors. Runtime behavior of these pure functions is verified in browser as part of Task 6.

- [ ] **Step 3: Commit**

```bash
git add lib/consent.ts
git commit -m "feat(consent): add pure consent state module

localStorage-backed consent state with 12-month expiry.
Schema is extensible to additional categories (marketing,
functional) without breaking changes."
```

---

## Task 2: Create `components/AnalyticsLoader.tsx`

**Files:**
- Create: `components/AnalyticsLoader.tsx`

- [ ] **Step 1: Write the file**

```tsx
"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { getConsent, CONSENT_CHANGED_EVENT } from "@/lib/consent";

type Props = { gaId: string };

export default function AnalyticsLoader({ gaId }: Props) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const update = () => setEnabled(getConsent()?.analytics === true);
    update();
    window.addEventListener(CONSENT_CHANGED_EVENT, update);
    return () => window.removeEventListener(CONSENT_CHANGED_EVENT, update);
  }, []);

  if (!enabled) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', { page_path: window.location.pathname });
        `}
      </Script>
    </>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add components/AnalyticsLoader.tsx
git commit -m "feat(consent): add AnalyticsLoader for conditional GA4 injection

Renders gtag scripts only when consent.analytics === true.
Listens for 'consent-changed' to react to mid-session decisions
without requiring a page reload."
```

---

## Task 3: Create `components/CookieConsent.tsx`

**Files:**
- Create: `components/CookieConsent.tsx`

- [ ] **Step 1: Write the file**

```tsx
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

  function decide(analytics: boolean) {
    setConsent({ analytics });
    window.dispatchEvent(new Event(CONSENT_CHANGED_EVENT));
    setOpen(false);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
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
              No personal data is sold or shared.
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
                  onClick={() => decide(false)}
                  className="text-sm text-secondary hover:text-primary transition-colors duration-200 underline underline-offset-4"
                >
                  Reject
                </button>
                <button
                  type="button"
                  onClick={() => decide(true)}
                  className="group relative inline-flex items-center px-6 py-2.5 bg-primary text-background text-sm font-medium overflow-hidden"
                >
                  <motion.span
                    className="absolute inset-0 bg-accent"
                    initial={{ y: "100%" }}
                    whileHover={{ y: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                    Accept
                  </span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

Notes:
- `pointer-events-none` on the outer wrapper + `pointer-events-auto` on the card prevents the banner's empty padding area from blocking clicks on the page underneath.
- Animation respects `prefers-reduced-motion` automatically via the global CSS rule in `app/globals.css` (lines 109–119).

- [ ] **Step 2: Type-check**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add components/CookieConsent.tsx
git commit -m "feat(consent): add CookieConsent banner UI

Slide-up banner with Accept/Reject + Privacy Policy link.
Listens for 'consent:reopen' event to re-show after a user
clicks 'Cookie preferences' in the footer."
```

---

## Task 4: Create `components/CookiePreferencesButton.tsx`

**Files:**
- Create: `components/CookiePreferencesButton.tsx`

- [ ] **Step 1: Write the file**

```tsx
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
```

- [ ] **Step 2: Type-check**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add components/CookiePreferencesButton.tsx
git commit -m "feat(consent): add CookiePreferencesButton for footer

Tiny client component that dispatches the consent:reopen event,
keeping app/layout.tsx as a server component."
```

---

## Task 5: Wire components into `app/layout.tsx`

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Add imports**

At the top of the file, alongside the existing imports, add:

```tsx
import CookieConsent from "@/components/CookieConsent";
import AnalyticsLoader from "@/components/AnalyticsLoader";
import CookiePreferencesButton from "@/components/CookiePreferencesButton";
```

- [ ] **Step 2: Replace inline GA scripts**

Find this block (currently lines ~165–180 in `app/layout.tsx`):

```tsx
{GA_ID && (
  <>
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      strategy="afterInteractive"
    />
    <Script id="ga4-init" strategy="afterInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_ID}', { page_path: window.location.pathname });
      `}
    </Script>
  </>
)}
```

Replace with:

```tsx
{GA_ID && <AnalyticsLoader gaId={GA_ID} />}
```

The `import Script from "next/script";` line at the top is no longer needed in `layout.tsx` — remove it.

- [ ] **Step 3: Mount the consent banner**

Find the closing `</footer>` tag near the end of the body. **Before** the closing `</body>` tag, add:

```tsx
<CookieConsent />
```

The relevant region should look like:

```tsx
        </footer>
        <CookieConsent />
      </body>
```

- [ ] **Step 4: Add Cookie preferences button to footer**

Find the footer's bottom row that contains the Privacy and Terms links:

```tsx
<div className="flex items-center gap-6">
  <Link href="/privacy" className="font-mono text-xs text-muted hover:text-accent transition-colors duration-200 tracking-widest uppercase">Privacy</Link>
  <Link href="/terms" className="font-mono text-xs text-muted hover:text-accent transition-colors duration-200 tracking-widest uppercase">Terms</Link>
</div>
```

Add the button **after** the Terms link, inside the same flex container:

```tsx
<div className="flex items-center gap-6">
  <Link href="/privacy" className="font-mono text-xs text-muted hover:text-accent transition-colors duration-200 tracking-widest uppercase">Privacy</Link>
  <Link href="/terms" className="font-mono text-xs text-muted hover:text-accent transition-colors duration-200 tracking-widest uppercase">Terms</Link>
  <CookiePreferencesButton />
</div>
```

- [ ] **Step 5: Type-check**

Run: `npm run build`
Expected: build succeeds. If a stale `Script` import is unused, TypeScript will flag it — remove the import and rebuild.

- [ ] **Step 6: Commit**

```bash
git add app/layout.tsx
git commit -m "feat(consent): wire consent components into root layout

Replaces inline GA4 scripts with AnalyticsLoader (gated by
consent), mounts the CookieConsent banner, and adds a Cookie
preferences button to the footer."
```

---

## Task 6: Manual browser verification

**Files:** none (verification only)

Run: `npm run dev` in one terminal. Open `http://localhost:3000` in a **fresh browser profile** (or incognito) so localStorage is empty.

- [ ] **Step 1: First-visit banner appears**

Verify:
- Banner slides up from the bottom ~400ms after page load.
- Heading reads "COOKIES", body text matches spec, "Reject" and "Accept" buttons visible, "Read our Privacy Policy" link visible.
- Layout: full-width on mobile (resize to 400px), max-width 720px and centered on desktop.

Open DevTools → Network → filter "gtag". **Confirm no GA scripts are loaded yet.**

- [ ] **Step 2: Accept flow**

Click `Accept`.

Verify:
- Banner slides down and disappears.
- DevTools → Application → Local Storage → `localhost:3000` → key `zoyare-consent` exists with `{ "analytics": true, "timestamp": <recent> }`.
- DevTools → Network → "gtag" filter now shows `gtag/js?id=G-RGS25GLB2M` request (status 200).
- Reload page: banner does NOT reappear, GA loads on mount.

- [ ] **Step 3: Reject flow**

Clear localStorage (DevTools → Application → Storage → Clear site data) and reload.

Click `Reject`.

Verify:
- Banner disappears.
- localStorage `zoyare-consent` shows `{ "analytics": false, "timestamp": <recent> }`.
- DevTools → Network: NO gtag requests.
- Reload page: banner does NOT reappear, NO gtag requests.

- [ ] **Step 4: Cookie preferences re-open**

While on the homepage (with consent stored from step 3), scroll to the footer.

Verify:
- "Cookie preferences" button visible alongside Privacy and Terms.
- Clicking it re-shows the banner.
- Choosing the opposite option (Accept) updates localStorage and triggers GA load mid-session (Network shows gtag request without page reload).

- [ ] **Step 5: Expiry behavior (optional sanity check)**

In DevTools → Application → Local Storage, manually edit `zoyare-consent` and set `timestamp` to a value older than 12 months ago (e.g., `1700000000000`). Reload.

Verify: banner reappears (treats expired state as no decision).

- [ ] **Step 6: Reduced motion**

DevTools → Rendering tab → Emulate CSS media `prefers-reduced-motion: reduce`. Clear localStorage and reload.

Verify: banner appears without slide animation (or with near-instant transition). Buttons still functional.

- [ ] **Step 7: Hydration check**

Open DevTools console. Reload the page.

Verify: no React hydration warnings (e.g., "Text content does not match server-rendered HTML").

If any verification fails, debug and patch the relevant component, then re-run the failing step. Do not proceed to Task 7 with failing checks.

---

## Task 7: Push to remote

- [ ] **Step 1: Verify clean tree and push**

```bash
git status
git push origin master
```

Expected: 5 new commits pushed to `origin/master`. Vercel auto-deploys.

- [ ] **Step 2: Verify on production**

After Vercel finishes deploying (check vercel.com dashboard), open `https://zoyare.com` in a fresh incognito window and re-run Task 6 steps 1–4 against production.

If production behavior matches local, mark this task complete.

---

## Acceptance criteria recap (from spec)

- [ ] First-time visitor sees banner; GA scripts not in DOM until they accept. *(Task 6, step 1)*
- [ ] After Accept, GA4 loads and tracks the current pageview within the same session. *(Task 6, step 2)*
- [ ] After Reject, no GA scripts load; banner does not reappear on next visit. *(Task 6, step 3)*
- [ ] Footer "Cookie preferences" link re-opens the banner. *(Task 6, step 4)*
- [ ] Consent state persists across browser tabs/sessions for 12 months. *(Task 6, step 2 + step 5)*
- [ ] Banner respects `prefers-reduced-motion`. *(Task 6, step 6)*
- [ ] No hydration warnings. *(Task 6, step 7)*
- [ ] Banner copy and styling match the existing site design. *(Task 6, step 1)*
