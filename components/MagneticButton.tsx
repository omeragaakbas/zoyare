"use client";

import { useRef, ReactNode } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

/**
 * Wrapper that pulls its child slightly toward the cursor on hover.
 * The actual interactive element (Link / button) lives inside as children.
 *
 * A plain transform + CSS transition: the spring version pulled framer-motion's
 * physics into the homepage bundle for an effect that only exists with a mouse
 * (touch screens never fire mousemove, so they pay nothing at runtime).
 */
export default function MagneticButton({
  children,
  className = "",
  strength = 0.35,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Current pull, so the pointer is measured against the button's resting
  // centre and the effect cannot feed back on itself.
  const offset = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2 - offset.current.x;
    const cy = rect.top + rect.height / 2 - offset.current.y;
    offset.current = { x: (e.clientX - cx) * strength, y: (e.clientY - cy) * strength };
    el.style.transform = `translate3d(${offset.current.x}px, ${offset.current.y}px, 0)`;
  };

  const handleMouseLeave = () => {
    offset.current = { x: 0, y: 0 };
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block transition-transform duration-200 ease-out ${className}`}
    >
      {children}
    </div>
  );
}
