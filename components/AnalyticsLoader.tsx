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
