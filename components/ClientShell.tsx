"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import type { PaletteEntry } from "./CommandPalette";

const Cursor = dynamic(() => import("./Cursor"), { ssr: false });
const ChatWidget = dynamic(() => import("./ChatWidget"), { ssr: false });
const CommandPalette = dynamic(() => import("./CommandPalette"), { ssr: false });

/**
 * Client-only extras. The chat widget and command palette chunks are deferred
 * until the browser is idle so they never compete with hydration or LCP.
 */
export default function ClientShell({ palette }: { palette: PaletteEntry[] }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const schedule =
      "requestIdleCallback" in window
        ? (cb: () => void) => window.requestIdleCallback(cb, { timeout: 3000 })
        : (cb: () => void) => window.setTimeout(cb, 1500);
    schedule(() => setReady(true));
  }, []);

  return (
    <>
      <Cursor />
      {ready && (
        <>
          <ChatWidget />
          <CommandPalette entries={palette} />
        </>
      )}
    </>
  );
}
