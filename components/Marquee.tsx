import { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  duration?: number;
  className?: string;
  reverse?: boolean;
  fade?: boolean;
}

/**
 * Infinite horizontal marquee. Children are rendered twice for a seamless
 * loop. Pure CSS animation (see globals.css) — zero client JS, runs on the
 * compositor thread and pauses on hover. `prefers-reduced-motion` is
 * neutralized by the global reduced-motion block.
 */
export default function Marquee({
  children,
  duration = 35,
  className = "",
  reverse = false,
  fade = true,
}: MarqueeProps) {
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
      <div
        className="marquee-track flex whitespace-nowrap"
        data-reverse={reverse || undefined}
        style={{
          width: "max-content",
          ["--marquee-duration" as string]: `${duration}s`,
        }}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
