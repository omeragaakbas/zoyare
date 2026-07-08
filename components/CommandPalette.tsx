"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { m, AnimatePresence } from "framer-motion";
import { track } from "@/lib/track";

export type PaletteEntry = { group: string; label: string; href: string };

/**
 * ⌘K / Ctrl+K command palette — quick keyboard navigation across pages,
 * case studies and articles.
 */
export default function CommandPalette({ entries }: { entries: PaletteEntry[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const openRef = useRef(false);
  openRef.current = open;

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (!openRef.current) track("palette_opened");
        setOpen(!openRef.current);
      } else if (e.key === "Escape" && openRef.current) {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setIndex(0);
      const t = setTimeout(() => inputRef.current?.focus(), 60);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return entries;
    return entries.filter(
      (e) =>
        e.label.toLowerCase().includes(q) || e.group.toLowerCase().includes(q)
    );
  }, [entries, query]);

  useEffect(() => {
    setIndex(0);
  }, [query]);

  useEffect(() => {
    document
      .getElementById(`palette-item-${index}`)
      ?.scrollIntoView({ block: "nearest" });
  }, [index]);

  function go(href: string) {
    setOpen(false);
    router.push(href);
  }

  function onInputKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[index]) {
      e.preventDefault();
      go(results[index].href);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[9995] flex items-start justify-center px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Quick navigation"
        >
          <div
            className="absolute inset-0 bg-primary/20 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          <m.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="relative mt-[12vh] w-full max-w-lg bg-background border border-border shadow-2xl"
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
              <span className="font-mono text-sm text-accent select-none" aria-hidden="true">
                →
              </span>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKey}
                placeholder="Where to?"
                aria-label="Search pages and articles"
                className="flex-1 bg-transparent text-sm text-primary placeholder:text-muted focus-visible:outline-none"
              />
              <kbd className="font-mono text-[10px] text-muted border border-border px-1.5 py-0.5 select-none">
                ESC
              </kbd>
            </div>

            <div className="max-h-[50vh] overflow-y-auto py-2">
              {results.length === 0 && (
                <p className="px-5 py-6 text-sm text-muted">
                  Nothing found — try a different term.
                </p>
              )}
              {results.map((entry, i) => {
                const showGroup = i === 0 || results[i - 1].group !== entry.group;
                return (
                  <div key={`${entry.href}-${i}`}>
                    {showGroup && (
                      <p className="px-5 pt-4 pb-1.5 font-mono text-[10px] text-muted tracking-widest uppercase select-none">
                        {entry.group}
                      </p>
                    )}
                    <button
                      id={`palette-item-${i}`}
                      type="button"
                      onClick={() => go(entry.href)}
                      onMouseMove={() => setIndex(i)}
                      className={`w-full flex items-center justify-between gap-4 px-5 py-2.5 text-left text-sm transition-colors duration-100 ${
                        i === index
                          ? "bg-surface text-accent"
                          : "text-secondary"
                      }`}
                    >
                      <span className="truncate">{entry.label}</span>
                      {i === index && (
                        <span className="font-mono text-xs shrink-0" aria-hidden="true">
                          ↵
                        </span>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-5 px-5 py-3 border-t border-border">
              <span className="font-mono text-[10px] text-muted tracking-widest uppercase select-none">
                ↑↓ Navigate
              </span>
              <span className="font-mono text-[10px] text-muted tracking-widest uppercase select-none">
                ↵ Open
              </span>
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
