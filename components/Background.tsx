"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Living background — performance-tuned versie.
 *  - dot grid (CSS, geen paint cost)
 *  - 2 langzaam drijvende warm-orange blobs (lichtere blur, alleen desktop)
 *  - SVG film grain via een 256×256 tile pattern (i.p.v. fullscreen filter)
 *
 * Op touch devices staan de blobs stil; de zware filter wordt eenmalig
 * berekend voor een kleine tile en daarna goedkoop herhaald.
 */
export default function Background() {
  const reduced = useReducedMotion();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    setAnimate(!isTouch && !reduced);
  }, [reduced]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #1A1916 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Animated gradient blobs — lichtere blur (40-50px) */}
      <motion.div
        className="absolute -top-1/4 -left-1/4 w-[55vw] h-[55vw] rounded-full will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(241,95,14,0.20) 0%, transparent 60%)",
          filter: "blur(50px)",
          transform: "translateZ(0)",
        }}
        animate={
          animate
            ? {
                x: [0, 70, -30, 0],
                y: [0, -50, 30, 0],
              }
            : undefined
        }
        transition={{ duration: 55, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -right-1/4 w-[50vw] h-[50vw] rounded-full will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(241,95,14,0.14) 0%, transparent 60%)",
          filter: "blur(60px)",
          transform: "translateZ(0)",
        }}
        animate={
          animate
            ? {
                x: [0, -50, 20, 0],
                y: [0, 40, -20, 0],
              }
            : undefined
        }
        transition={{ duration: 65, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Film grain overlay — small tiled pattern (cheap to paint) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.07] mix-blend-multiply"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="zoyare-noise" x="0" y="0" width="200" height="200">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.85"
              numOctaves="2"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <pattern
            id="zoyare-grain"
            x="0"
            y="0"
            width="200"
            height="200"
            patternUnits="userSpaceOnUse"
          >
            <rect width="200" height="200" filter="url(#zoyare-noise)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#zoyare-grain)" />
      </svg>
    </div>
  );
}
