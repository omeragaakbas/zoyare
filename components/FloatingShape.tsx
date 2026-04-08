"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Abstract floating Z-shape used as a hero accent.
 * Slowly drifts and tilts; dotted orbital ring rotates continuously.
 * Hidden on mobile to keep the hero clean on small screens.
 */
export default function FloatingShape() {
  const reduced = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute right-[6%] top-[18%] w-72 h-72 xl:w-96 xl:h-96 hidden lg:block"
      animate={
        reduced
          ? undefined
          : {
              y: [0, -22, 0],
              rotate: [0, 6, 0],
            }
      }
      transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <linearGradient id="zoyShape" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F15F0E" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#F15F0E" stopOpacity="0.25" />
          </linearGradient>
        </defs>

        {/* Orbital dotted ring */}
        <motion.g
          animate={reduced ? undefined : { rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "100px 100px" }}
        >
          <circle
            cx="100"
            cy="100"
            r="88"
            fill="none"
            stroke="#1A1916"
            strokeOpacity="0.18"
            strokeDasharray="2 7"
          />
        </motion.g>

        {/* Inner counter-rotating ring */}
        <motion.g
          animate={reduced ? undefined : { rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "100px 100px" }}
        >
          <circle
            cx="100"
            cy="100"
            r="72"
            fill="none"
            stroke="#F15F0E"
            strokeOpacity="0.25"
            strokeDasharray="1 5"
          />
        </motion.g>

        {/* Z-shape stroke */}
        <motion.path
          d="M50 55 L150 55 L60 145 L150 145"
          stroke="url(#zoyShape)"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="square"
          strokeLinejoin="miter"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Pulse dot at the corner */}
        <motion.circle
          cx="150"
          cy="55"
          r="4"
          fill="#F15F0E"
          animate={
            reduced
              ? undefined
              : { scale: [1, 1.8, 1], opacity: [1, 0.4, 1] }
          }
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "150px 55px" }}
        />
      </svg>
    </motion.div>
  );
}
