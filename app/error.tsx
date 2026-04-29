"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="pt-32 px-6 md:px-12 pb-24 min-h-[70vh] flex flex-col justify-center">
      <p className="font-mono text-xs text-muted tracking-widest uppercase mb-6">
        Error
      </p>
      <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-primary leading-[0.93] mb-6">
        Something
        <br />
        went wrong.
      </h1>
      <p className="text-secondary text-lg leading-relaxed max-w-md mb-12">
        An unexpected error occurred. Try again or contact us directly.
      </p>
      <div className="flex items-center gap-6 flex-wrap">
        <button
          onClick={reset}
          className="inline-flex items-center gap-3 px-6 py-3 bg-primary text-background text-sm font-medium hover:bg-accent transition-colors duration-300"
        >
          Try again →
        </button>
        <a
          href="mailto:hello@zoyare.com"
          className="text-sm text-secondary hover:text-primary transition-colors duration-200 underline underline-offset-4"
        >
          hello@zoyare.com
        </a>
      </div>
    </div>
  );
}
