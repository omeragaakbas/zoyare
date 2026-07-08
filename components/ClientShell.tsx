"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Cursor = dynamic(() => import("./Cursor"), { ssr: false });
const ChatWidget = dynamic(() => import("./ChatWidget"), { ssr: false });

/**
 * Client-only extras. The chat widget chunk is deferred until the browser is
 * idle so it never competes with hydration or LCP.
 */
export default function ClientShell() {
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const schedule =
      "requestIdleCallback" in window
        ? (cb: () => void) => window.requestIdleCallback(cb, { timeout: 3000 })
        : (cb: () => void) => window.setTimeout(cb, 1500);
    schedule(() => setShowChat(true));
  }, []);

  return (
    <>
      <Cursor />
      {showChat && <ChatWidget />}
    </>
  );
}
