"use client";

import { useState } from "react";

interface ShareRowProps {
  url: string;
  title: string;
}

/**
 * Minimal share row for blog articles: LinkedIn, X and copy-link.
 */
export default function ShareRow({ url, title }: ShareRowProps) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (e.g. insecure context) — ignore.
    }
  }

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const linkClass =
    "font-mono text-xs text-muted tracking-widest uppercase hover:text-accent transition-colors duration-200";

  return (
    <div className="flex items-center gap-6 flex-wrap">
      <span className="font-mono text-xs text-muted tracking-widest uppercase select-none">
        Share —
      </span>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        LinkedIn
      </a>
      <a
        href={`https://x.com/intent/post?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        X
      </a>
      <button type="button" onClick={copy} className={linkClass}>
        {copied ? "Copied ✓" : "Copy link"}
      </button>
    </div>
  );
}
