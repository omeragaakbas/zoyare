"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

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
  const inView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.floor(v)),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  const display = pad > 0 ? String(value).padStart(pad, "0") : String(value);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
