"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Modern triple-layer cursor:
 *  1. Slow soft warm glow (ambience)
 *  2. Medium follower ring (expands on hover over interactive elements)
 *  3. Snappy accent dot (precise position)
 *
 * Hidden on touch / small screens (md:block).
 */
export default function Cursor() {
  const [visible, setVisible] = useState(false);
  const [hover, setHover] = useState(false);

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  // Soft glow follower (slow ambient)
  const glowX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const glowY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  // Ring follower (snappy)
  const ringX = useSpring(mouseX, { stiffness: 420, damping: 30 });
  const ringY = useSpring(mouseY, { stiffness: 420, damping: 30 });

  // NB: dot is bound directly to mouseX/mouseY for 1:1 feel — no spring

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);

      const target = e.target as HTMLElement | null;
      const interactive = target?.closest(
        "a, button, [role=button], input, textarea, label, [data-magnetic]"
      );
      setHover(!!interactive);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [visible, mouseX, mouseY]);

  return (
    <>
      {/* Soft warm glow */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9990] w-80 h-80 rounded-full hidden md:block"
        style={{
          x: glowX,
          y: glowY,
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle, rgba(241,95,14,0.08) 0%, transparent 70%)",
          opacity: visible ? 1 : 0,
        }}
      />

      {/* Ring follower */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:flex items-center justify-center"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
        animate={{
          width: hover ? 56 : 30,
          height: hover ? 56 : 30,
        }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="w-full h-full rounded-full border border-primary/70" />
      </motion.div>

      {/* Accent dot — bound directly to raw mouse for instant response */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-1.5 h-1.5 rounded-full bg-accent hidden md:block"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
      />
    </>
  );
}
