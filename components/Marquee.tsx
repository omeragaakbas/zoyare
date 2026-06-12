"use client";

import { m, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  duration?: number;
  className?: string;
  reverse?: boolean;
  fade?: boolean;
}

/**
 * Infinite horizontal marquee. Children are rendered twice for seamless loop.
 * Pauses on hover. Edge fade via mask-image.
 */
export default function Marquee({
  children,
  duration = 35,
  className = "",
  reverse = false,
  fade = true,
}: MarqueeProps) {
  const reduced = useReducedMotion();

  const maskStyle = fade
    ? {
        maskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }
    : undefined;

  return (
    <div
      className={`group relative overflow-hidden ${className}`}
      style={maskStyle}
    >
      <m.div
        className="flex whitespace-nowrap will-change-transform"
        animate={
          reduced
            ? undefined
            : { x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }
        }
        transition={{ duration, repeat: Infinity, ease: "linear" }}
        style={{ width: "max-content" }}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden="true">
          {children}
        </div>
      </m.div>
    </div>
  );
}
