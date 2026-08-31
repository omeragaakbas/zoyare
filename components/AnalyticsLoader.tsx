"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { getConsent, CONSENT_CHANGED_EVENT } from "@/lib/consent";

type Props = { gaId: string };

export default function AnalyticsLoader({ gaId }: Props) {
  const [enabled, setEnabled] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const update = () => {
      const consent = getConsent();
      setEnabled(consent?.analytics === true);
      setMarketing(consent?.marketing === true);
    };
    update();
    window.addEventListener(CONSENT_CHANGED_EVENT, update);
    return () => window.removeEventListener(CONSENT_CHANGED_EVENT, update);
  }, []);

  if (!enabled) return null;

  const adConsent = marketing ? "granted" : "denied";

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
          // Consent Mode v2 — the script only loads after the visitor accepts
          // analytics, so analytics_storage is granted here. The ad signals
          // follow the separate marketing choice from the banner.
          gtag('consent', 'default', {
            analytics_storage: 'granted',
            ad_storage: '${adConsent}',
            ad_user_data: '${adConsent}',
            ad_personalization: '${adConsent}'
          });
          gtag('js', new Date());
          gtag('config', '${gaId}', { page_path: window.location.pathname });
        `}
      </Script>
    </>
  );
}
