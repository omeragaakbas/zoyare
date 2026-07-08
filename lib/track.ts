/**
 * GA4 event helper. `gtag` only exists after the visitor accepted analytics
 * (AnalyticsLoader), so this is a silent no-op without consent.
 */
export function track(event: string, params?: Record<string, string | number>) {
  if (typeof window === "undefined") return;
  const gtag = (window as { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag === "function") {
    gtag("event", event, params);
  }
}
