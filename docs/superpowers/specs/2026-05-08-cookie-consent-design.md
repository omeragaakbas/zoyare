# Cookie Consent Design — Zoyare

**Date:** 2026-05-08
**Status:** Approved (pending implementation plan)
**Context:** zoyare.com loads GA4 (`G-RGS25GLB2M`) on every visitor without prior consent, which is non-compliant with EU/NL AVG (GDPR) law. This spec defines a minimal, AVG-compliant cookie consent banner.

---

## Goals

1. **Legal compliance:** GA4 must not load until user gives explicit consent (opt-in, not opt-out).
2. **Minimal friction:** Single-purpose banner, two clear actions, no nested menus or "manage preferences" complexity at this stage.
3. **Future-ready architecture:** State model and storage support adding more categories (marketing, functional) later without rewriting the banner.
4. **Match site design:** Cream/orange aesthetic, Space Grotesk + Space Mono fonts, no visual noise.

## Non-goals

- Multi-category consent UI (analytics is the only category in scope today).
- Server-side consent storage or sync across devices.
- Cookie auto-scanner / dynamic discovery of cookies.
- Geo-targeted banner (showing only in EU). The banner is shown to all visitors; this is simpler and still legal globally.
- Integration with Google Consent Mode v2 (overkill for current scale; can be added later).

---

## User-facing behavior

### First visit
- Page loads normally. GA4 scripts do **not** load.
- Banner slides up from the bottom of the viewport after a brief delay (~400ms post-mount).
- Banner contains:
  - Heading: `COOKIES` (Space Mono, uppercase, tracked, muted color)
  - Body: short message in English (see Copy section)
  - Two actions: `Reject` (text-style link, left) and `Accept` (orange primary button, right)
  - Privacy Policy link below the actions

### After clicking Accept
- Consent state is saved to `localStorage`.
- A custom event `consent-changed` is dispatched on `window`.
- Layout listens for this event and dynamically injects the GA4 scripts.
- Banner hides with a slide-down animation.

### After clicking Reject
- Consent state is saved (analytics: false).
- No GA scripts ever load.
- Banner hides.

### Returning visitor with stored consent
- Banner does **not** appear.
- If `analytics: true` and timestamp < 12 months ago → GA loads on mount.
- If `analytics: false` and timestamp < 12 months ago → no GA, no banner.
- If timestamp ≥ 12 months ago → state is treated as expired, banner shown again.

### Settings revisit
- Footer gets a new link: `Cookie preferences`.
- Clicking it re-shows the banner regardless of stored state, allowing the user to change their decision.
- After choosing, banner hides and consent is updated.

---

## Visual design

### Layout
- Position: `fixed`, bottom of viewport, `z-50` to stay above all content.
- Mobile: full width, padding 16px, vertical stacking of buttons.
- Desktop: centered with `max-width: 720px`, padding 24px, horizontal layout.
- Background: `#F8F6F2` (cream, matches site).
- Border: 1px solid `border` token (subtle), top border emphasized.
- Box shadow: subtle drop shadow to lift it above content.

### Animation
- Mount: slide-up from bottom (`translateY(100%)` → `translateY(0)`), 400ms easing.
- Dismiss: slide-down (reverse), 300ms.
- Use Framer Motion (already a project dependency).

### Typography
- Heading: Space Mono, 11px, uppercase, letter-spacing wide, color `muted`.
- Body: Space Grotesk, 14px, color `secondary`.
- Buttons: Space Grotesk, 14px, weight 500.

### Buttons
- **Reject**: text-style, color `secondary`, hover → `primary`. No background, no border. Underline on hover.
- **Accept**: solid background `primary` (dark), text `background` (cream). Hover: background slides to orange `accent`. Matches existing `MagneticButton` style for visual consistency.

---

## Copy

```
COOKIES

We use Google Analytics to understand how visitors use our site.
No personal data is sold or shared.

[Reject]   [Accept]

Read our Privacy Policy
```

- Tone: matter-of-fact, brief, English (matches site language).
- Privacy Policy link points to existing `/privacy` page.

---

## Technical architecture

### File structure

```
lib/consent.ts             ← Pure functions: state read/write/expiry check
components/CookieConsent.tsx  ← Client component: banner UI + state management
components/AnalyticsLoader.tsx ← Client component: dynamic GA4 script injection
app/layout.tsx             ← Replaces hardcoded GA scripts with <AnalyticsLoader />
                             Adds <CookieConsent /> to body
                             Adds "Cookie preferences" link in footer
```

### State model (`lib/consent.ts`)

```ts
export type ConsentState = {
  analytics: boolean;
  // Future categories added here:
  // marketing?: boolean;
  // functional?: boolean;
  timestamp: number; // Unix ms when decision was made
};

const STORAGE_KEY = "zoyare-consent";
const EXPIRY_MS = 365 * 24 * 60 * 60 * 1000; // 12 months

export function getConsent(): ConsentState | null;
export function setConsent(state: Omit<ConsentState, "timestamp">): void;
export function hasDecided(): boolean; // false if no consent OR expired
export function clearConsent(): void;  // for "Cookie preferences" reopen flow
```

All functions are SSR-safe (guard with `typeof window !== "undefined"`).

### Component: `CookieConsent.tsx`

- Client component (`"use client"`).
- On mount: checks `hasDecided()`. If false → render banner.
- Listens for custom event `consent:reopen` (dispatched by footer link) to re-show.
- On Accept/Reject: calls `setConsent()`, dispatches `window.dispatchEvent(new Event("consent-changed"))`, hides banner.
- Animation via Framer Motion `<AnimatePresence>` and `motion.div`.

### Component: `AnalyticsLoader.tsx`

- Client component.
- On mount: checks `getConsent()`. If `analytics === true` → load GA4 via `<Script>`.
- Listens for `consent-changed` event. If consent flips to true → inject scripts.
- If consent flips to false → no action (the script tags stay if already loaded; GA cookies persist until expiry, but no new tracking happens because GA4 init is gated).
  - **Note:** for stricter compliance, can later add cookie-clearing on rejection. Out of scope for v1.

### Footer integration (`app/layout.tsx`)

In the existing footer's bottom row, alongside Privacy/Terms links, add:

```tsx
<button
  type="button"
  onClick={() => window.dispatchEvent(new Event("consent:reopen"))}
  className="font-mono text-xs text-muted hover:text-accent transition-colors duration-200 tracking-widest uppercase"
>
  Cookie preferences
</button>
```

Note: it's a `<button>` not a `<Link>` — no navigation needed.

### GA loading flow

Current `app/layout.tsx`:
```tsx
{GA_ID && (<Script src={`...gtag/js?id=${GA_ID}`} ... />)}
```

New:
```tsx
{GA_ID && <AnalyticsLoader gaId={GA_ID} />}
```

`AnalyticsLoader` internally renders the same `<Script>` tags but only when consent is granted.

---

## Edge cases

- **No localStorage available** (private browsing edge cases): treat as "no consent given," banner shows every session, no GA loads. Acceptable degradation.
- **User rejects, then comes back via "Cookie preferences" and accepts**: GA scripts inject mid-session via the `consent-changed` event. No reload needed.
- **User accepts, then later rejects via Cookie preferences**: GA scripts already loaded for current session; new pageviews still tracked until reload. Acceptable for v1; documented as known limitation.
- **JavaScript disabled**: banner doesn't appear, GA doesn't load. Net effect: compliant by accident. Acceptable.
- **Server-side rendering**: banner rendered client-side only to avoid hydration mismatch. Initial HTML has no banner; appears after mount.

---

## Accessibility

- Banner is a `<div role="dialog" aria-label="Cookie consent">`.
- Buttons are real `<button>` elements with clear labels.
- Tab order follows visual LTR layout: Privacy link → Reject → Accept.
- No focus trap (banner is non-blocking; users can interact with the page).
- Color contrast: all text meets WCAG AA against cream background.
- Reduced motion: respect `prefers-reduced-motion` to disable slide animation.

---

## Out of scope (future work)

1. Adding Marketing or Functional consent categories (when those cookies are introduced).
2. Google Consent Mode v2 integration (allows GA4 to send cookieless pings even on rejection).
3. Server-side consent log for audit trail.
4. Geo-detection to skip the banner outside EU.
5. Granular "Manage preferences" panel.
6. Auto-clear of GA cookies on rejection mid-session.

---

## Acceptance criteria

- [ ] First-time visitor sees banner; GA scripts not in DOM until they accept.
- [ ] After Accept, GA4 loads and tracks the current pageview within the same session (no reload required).
- [ ] After Reject, no GA scripts load; banner does not reappear on next visit (within 12 months).
- [ ] Footer "Cookie preferences" link re-opens the banner from any page.
- [ ] Consent state persists across browser tabs/sessions for 12 months.
- [ ] Banner respects `prefers-reduced-motion`.
- [ ] No hydration warnings in dev console.
- [ ] Banner copy and styling match the existing site design (cream/orange/mono).
