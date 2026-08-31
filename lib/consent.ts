const STORAGE_KEY = "zoyare-consent";
const EXPIRY_MS = 365 * 24 * 60 * 60 * 1000;

export const CONSENT_CHANGED_EVENT = "consent-changed";
export const CONSENT_REOPEN_EVENT = "consent:reopen";

export type ConsentState = {
  analytics: boolean;
  marketing: boolean;
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
    // Records written before marketing consent existed have no `marketing`
    // field. They are deliberately treated as "no decision" — a new purpose
    // needs its own consent, so those visitors see the banner once more.
    if (
      typeof parsed.analytics !== "boolean" ||
      typeof parsed.marketing !== "boolean" ||
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
