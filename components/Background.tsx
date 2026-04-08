"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Living background — vervangt de statische cream achtergrond.
 * Combineert:
 *  - subtiel dot grid (engineering feel)
 *  - 3 langzaam drijvende warm-orange blobs (meer leven)
 *  - SVG film grain overlay (premium texture)
 */
export default function Background() {
  const reduced = useReducedMotion();

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

      {/* Animated gradient blobs */}
      <motion.div
        className="absolute -top-1/4 -left-1/4 w-[60vw] h-[60vw] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(241,95,14,0.18) 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
        animate={
          reduced
            ? undefined
            : {
                x: [0, 80, -40, 0],
                y: [0, -60, 40, 0],
              }
        }
        transition={{ duration: 50, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -right-1/4 w-[55vw] h-[55vw] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(241,95,14,0.13) 0%, transparent 60%)",
          filter: "blur(90px)",
        }}
        animate={
          reduced
            ? undefined
            : {
                x: [0, -60, 30, 0],
                y: [0, 50, -30, 0],
              }
        }
        transition={{ duration: 60, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-10%] left-1/4 w-[45vw] h-[45vw] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,180,80,0.10) 0%, transparent 60%)",
          filter: "blur(100px)",
        }}
        animate={
          reduced
            ? undefined
            : {
                x: [0, 50, -50, 0],
                y: [0, -30, 30, 0],
              }
        }
        transition={{ duration: 70, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Film grain overlay */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.08] mix-blend-multiply"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="zoyare-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#zoyare-noise)" />
      </svg>
    </div>
  );
}
