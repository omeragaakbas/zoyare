"use client";

import { motion, useReducedMotion } from "framer-motion";
import Logo from "./Logo";

/**
 * Hero accent: oversized Zoyare cube as a faint watermark.
 * Slowly drifts + tilts. A radial glow sits behind it for warmth.
 * Hidden on mobile to keep the hero clean.
 */
export default function FloatingShape() {
  const reduced = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-[-2%] xl:right-[4%] top-[8%] hidden lg:block"
    >
      {/* Soft warm glow behind the mark */}
      <div
        className="absolute -inset-32 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(241,95,14,0.18) 0%, transparent 60%)",
          filter: "blur(40px)",
        }}
      />

      {/* Floating cube */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{
          duration: 1.4,
          delay: 0.4,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <motion.div
          animate={
            reduced
              ? undefined
              : {
                  y: [0, -18, 0],
                  rotate: [-2, 2, -2],
                }
          }
          transition={{
            y: { duration: 9, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 14, repeat: Infinity, ease: "easeInOut" },
          }}
          style={{ transformOrigin: "center center" }}
        >
          <Logo
            variant="mark"
            height={460}
            className="opacity-[0.18] xl:opacity-[0.22]"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
