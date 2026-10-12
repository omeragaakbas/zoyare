"use client";

import { useEffect, useRef, useState } from "react";

interface CounterProps {
  to: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  pad?: number;
}

/**
 * Number counter that animates from 0 → `to` when scrolled into view.
 * `pad` left-pads with zeros (e.g. pad=2 gives "04" instead of "4").
 *
 * Plain IntersectionObserver + requestAnimationFrame: this used to pull in
 * framer-motion's animation engine (~30 kB of JS) for a four-step counter.
 * State is only set when the displayed integer changes, and users with
 * reduced motion get the final value immediately.
 */
export default function Counter({
  to,
  duration = 2,
  className = "",
  prefix = "",
  suffix = "",
  pad = 0,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(to);
      return;
    }

    let raf = 0;
    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / (duration * 1000));
        // ease-out quart, close to the previous cubic-bezier(0.22, 1, 0.36, 1)
        setValue(Math.floor(to * (1 - Math.pow(1 - p, 4))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        io.disconnect();
        run();
      }
    });
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration]);

  const display = pad > 0 ? String(value).padStart(pad, "0") : String(value);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
