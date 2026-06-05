export const locales = ["en", "nl"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const LOCALE_COOKIE = "zoyare-locale";

export function isLocale(value: string | undefined): value is Locale {
  return value === "en" || value === "nl";
}

/**
 * Map between EN and NL URLs so we can render hreflang alternates
 * and the language switcher knows where to send the user.
 *
 * Keys are the EN paths (canonical). Values are the NL counterparts.
 * Dynamic routes are matched by prefix; everything else is exact.
 */
export const localePathMap: Record<string, string> = {
  "/": "/nl",
  "/about": "/nl/over-ons",
  "/contact": "/nl/contact",
  "/faq": "/nl/faq",
  "/portfolio": "/nl/portfolio",
  "/blog": "/nl/blog",
  "/privacy": "/nl/privacy",
  "/terms": "/nl/voorwaarden",
  "/services/custom-software": "/nl/diensten/maatwerk-software",
  "/services/api-integrations": "/nl/diensten/api-integraties",
  "/services/mobile-applications": "/nl/diensten/mobiele-applicaties",
  "/services/process-automation": "/nl/diensten/process-automation",
};

const nlToEn: Record<string, string> = Object.fromEntries(
  Object.entries(localePathMap).map(([en, nl]) => [nl, en])
);

/** Return the alternate-language URL for a given path, or null if none. */
export function alternatePath(path: string, target: Locale): string | null {
  if (target === "nl") {
    return localePathMap[path] ?? null;
  }
  return nlToEn[path] ?? null;
}

/** Detect locale from a URL pathname. */
export function localeFromPath(pathname: string): Locale {
  return pathname === "/nl" || pathname.startsWith("/nl/") ? "nl" : "en";
}
