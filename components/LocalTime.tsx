"use client";

import { useEffect, useState } from "react";

/**
 * Live studio clock — Amsterdam time, updates every minute.
 * Renders nothing until mounted to avoid a hydration mismatch.
 */
export default function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/Amsterdam",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  return (
    <span className="font-mono text-xs text-muted tracking-widest uppercase tabular-nums">
      Amsterdam {time}
    </span>
  );
}
