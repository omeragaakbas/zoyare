"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { track } from "@/lib/track";

/**
 * The closing band above the footer links. Same words and shape as the
 * static pages (scripts/taste/lib.cjs, `closing__cta`); keep the two equal.
 * Left out on /estimate, where the button would point at its own page.
 */
export default function ClosingCta() {
  const pathname = usePathname();
  if (pathname === "/estimate") return null;

  return (
    <div className="flex flex-col gap-8 pb-16 md:pb-24">
      <div className="grid gap-4 max-w-[760px]">
        <h2 className="text-[clamp(30px,1.72vw+23.3px,48px)] font-medium tracking-[-0.03em] leading-[1.05] text-background">
          Know the cost before the first call
        </h2>
        <p className="text-base text-[#9b9996]">
          Three questions, an honest range, and a fixed quote within 48 hours of the intake.
        </p>
      </div>
      <Link
        href="/estimate"
        onClick={() => track("estimate_click", { source: "footer" })}
        className="group flex w-full items-center justify-between rounded-lg bg-accent px-6 md:px-8 h-[clamp(64px,1.4vw+48px,72px)] text-[clamp(20px,0.6vw+16px,26px)] font-medium tracking-[-0.03em] text-[#111111] transition-transform duration-150 hover:-translate-y-px active:translate-y-0"
      >
        Get a price indication
        <svg
          viewBox="0 0 12 12"
          aria-hidden="true"
          className="h-4 w-4 fill-none stroke-current stroke-[1.4] transition-transform duration-200 group-hover:translate-x-1"
        >
          <path d="M1 6h8" strokeLinecap="round" />
          <path d="M4.5 2.5 8 6l-3.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </div>
  );
}
