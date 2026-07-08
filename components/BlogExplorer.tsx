"use client";

import { useMemo, useState, type ReactNode } from "react";

interface BlogExplorerProps {
  items: { category: string; node: ReactNode }[];
  initial?: number;
  step?: number;
}

/**
 * Category filter + progressive reveal for the blog index. Every post row is
 * server-rendered and stays in the HTML (hidden via the `hidden` attribute),
 * so crawlers always see all links — this component only toggles visibility.
 */
export default function BlogExplorer({
  items,
  initial = 8,
  step = 8,
}: BlogExplorerProps) {
  const [filter, setFilter] = useState<string | null>(null);
  const [visible, setVisible] = useState(initial);

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const item of items) {
      counts.set(item.category, (counts.get(item.category) ?? 0) + 1);
    }
    return [...counts.entries()];
  }, [items]);

  function pick(category: string | null) {
    setFilter(category);
    setVisible(initial);
  }

  const matching = filter
    ? items.filter((i) => i.category === filter).length
    : items.length;
  const remaining = matching - visible;

  const chipClass = (active: boolean) =>
    `font-mono text-xs tracking-widest uppercase border px-3 py-1.5 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent ${
      active
        ? "border-accent text-accent"
        : "border-border text-muted hover:text-primary hover:border-muted"
    }`;

  let shown = 0;

  return (
    <>
      <div className="flex flex-wrap items-center gap-2.5 py-8 border-b border-border">
        <button type="button" onClick={() => pick(null)} className={chipClass(filter === null)}>
          All ({items.length})
        </button>
        {categories.map(([category, count]) => (
          <button
            key={category}
            type="button"
            onClick={() => pick(filter === category ? null : category)}
            className={chipClass(filter === category)}
          >
            {category} ({count})
          </button>
        ))}
      </div>

      {items.map((item, i) => {
        const matches = filter === null || item.category === filter;
        const index = matches ? shown++ : -1;
        return (
          <div key={i} hidden={!matches || index >= visible}>
            {item.node}
          </div>
        );
      })}

      {remaining > 0 && (
        <div className="flex justify-center pt-14">
          <button
            type="button"
            onClick={() => setVisible((v) => v + step)}
            className="group inline-flex items-baseline gap-3 border border-primary px-7 py-3.5 text-sm font-medium text-primary hover:bg-primary hover:text-background transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Load more articles
            <span className="font-mono text-xs text-muted group-hover:text-background/60 transition-colors duration-300">
              +{Math.min(step, remaining)}
            </span>
          </button>
        </div>
      )}
    </>
  );
}
