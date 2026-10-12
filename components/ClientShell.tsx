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
 *
 * The custom cursor and the ⌘K palette are mouse/keyboard features (the palette
 * has no touch trigger), so they are not even downloaded on touch devices.
 */
export default function ClientShell({ palette }: { palette: PaletteEntry[] }) {
  const [ready, setReady] = useState(false);
  const [pointerDevice, setPointerDevice] = useState(false);

  useEffect(() => {
    setPointerDevice(window.matchMedia("(hover: hover) and (pointer: fine)").matches);

    const schedule =
      "requestIdleCallback" in window
        ? (cb: () => void) => window.requestIdleCallback(cb, { timeout: 3000 })
        : (cb: () => void) => window.setTimeout(cb, 1500);
    schedule(() => setReady(true));
  }, []);

  return (
    <>
      {pointerDevice && <Cursor />}
      {ready && (
        <>
          <ChatWidget />
          {pointerDevice && <CommandPalette entries={palette} />}
        </>
      )}
    </>
  );
}
