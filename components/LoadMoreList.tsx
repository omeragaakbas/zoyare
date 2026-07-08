"use client";

import { useState, type ReactNode } from "react";

interface LoadMoreListProps {
  items: ReactNode[];
  initial?: number;
  step?: number;
  label?: string;
}

/**
 * Progressive reveal for long lists. Every item is server-rendered and stays
 * in the HTML (hidden via the `hidden` attribute), so crawlers see all links —
 * the button only toggles visibility.
 */
export default function LoadMoreList({
  items,
  initial = 8,
  step = 8,
  label = "Load more",
}: LoadMoreListProps) {
  const [visible, setVisible] = useState(initial);
  const remaining = items.length - visible;

  return (
    <>
      {items.map((item, i) => (
        <div key={i} hidden={i >= visible}>
          {item}
        </div>
      ))}

      {remaining > 0 && (
        <div className="flex justify-center pt-14">
          <button
            type="button"
            onClick={() => setVisible((v) => v + step)}
            className="group inline-flex items-baseline gap-3 border border-primary px-7 py-3.5 text-sm font-medium text-primary hover:bg-primary hover:text-background transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {label}
            <span className="font-mono text-xs text-muted group-hover:text-background/60 transition-colors duration-300">
              +{Math.min(step, remaining)}
            </span>
          </button>
        </div>
      )}
    </>
  );
}
