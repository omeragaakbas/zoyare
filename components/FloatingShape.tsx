"use client";

import { motion, useReducedMotion } from "framer-motion";
import Logo from "./Logo";

/**
 * Hero accent: oversized Zoyare cube as a faint watermark.
 * Organic circular drift + scale breath (no clumsy rocking rotation).
 * Hidden on mobile.
 */
export default function FloatingShape() {
  const reduced = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-[8%] xl:right-[12%] top-[16%] hidden lg:block"
    >
      {/* Soft warm glow behind the mark */}
      <motion.div
        className="absolute -inset-32 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(241,95,14,0.20) 0%, transparent 60%)",
          filter: "blur(50px)",
        }}
        animate={
          reduced
            ? undefined
            : {
                scale: [1, 1.08, 1],
                opacity: [0.85, 1, 0.85],
              }
        }
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Cube — gentle entrance */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{
          duration: 1.6,
          delay: 0.4,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {/* Inner motion: organic circular drift + scale breath */}
        <motion.div
          animate={
            reduced
              ? undefined
              : {
                  x: [0, 8, 0, -8, 0],
                  y: [0, -14, -22, -14, 0],
                  scale: [1, 1.025, 1.035, 1.025, 1],
                }
          }
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.25, 0.5, 0.75, 1],
          }}
          style={{ transformOrigin: "center center" }}
        >
          <Logo
            variant="mark"
            height={380}
            className="opacity-[0.20] xl:opacity-[0.24]"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
