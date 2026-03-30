"use client";

import { motion } from "framer-motion";

type LogoVariant = "full" | "mark";

interface LogoProps {
  variant?: LogoVariant;
  className?: string;
  height?: number;
  animate?: boolean;
}

const diagonalVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Logo({
  variant = "full",
  className = "",
  height = 24,
  animate = false,
}: LogoProps) {
  if (variant === "mark") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 36 36"
        fill="none"
        height={height}
        className={className}
        aria-label="Zoyare"
      >
        <rect x="2" y="2" width="32" height="6" fill="currentColor" />
        {animate ? (
          <motion.path
            d="M33 8 L3 28"
            stroke="#FF4500"
            strokeWidth="4.5"
            strokeLinecap="butt"
            variants={diagonalVariants}
            initial="hidden"
            animate="show"
          />
        ) : (
          <line x1="33" y1="8" x2="3" y2="28" stroke="#FF4500" strokeWidth="4.5" strokeLinecap="butt" />
        )}
        <rect x="2" y="28" width="32" height="6" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 180 36"
      fill="none"
      height={height}
      className={className}
      aria-label="Zoyare"
    >
      {/* Z Mark */}
      <rect x="0" y="2" width="32" height="6" fill="currentColor" />
      {animate ? (
        <motion.path
          d="M31 8 L1 28"
          stroke="#FF4500"
          strokeWidth="4.5"
          strokeLinecap="butt"
          variants={diagonalVariants}
          initial="hidden"
          animate="show"
        />
      ) : (
        <line x1="31" y1="8" x2="1" y2="28" stroke="#FF4500" strokeWidth="4.5" strokeLinecap="butt" />
      )}
      <rect x="0" y="28" width="32" height="6" fill="currentColor" />

      {/* Wordmark */}
      <path d="M50 8h14v3.5L54.5 28H64v3.5H50V28l9.5-16.5H50V8z" fill="currentColor" />
      <path d="M70 17.75C70 12.36 73.36 8 79 8s9 4.36 9 9.75-3.36 9.75-9 9.75-9-4.36-9-9.75zm14 0C84 14.2 82 11.5 79 11.5s-5 2.7-5 6.25 2 6.25 5 6.25 5-2.7 5-6.25z" fill="currentColor" />
      <path d="M96 8l5.5 9.5L107 8h4l-7.5 13v10.5h-4V21L92 8h4z" fill="currentColor" />
      <path d="M117 8h4l8 23.5h-4l-2-6h-8l-2 6h-4L117 8zm4.75 14-2.75-8.5-2.75 8.5h5.5z" fill="currentColor" />
      <path d="M133 8h8c4.4 0 7 2.5 7 6.5 0 3-1.5 5.2-4 6.2l4.5 10.8h-4.5l-4-10h-3.5v10H133V8zm4 3.5v6.5h4c2 0 3.5-1.3 3.5-3.25S143 11.5 141 11.5h-4z" fill="currentColor" />
      <path d="M155 8h14v3.5h-10v6h9v3.5h-9v7h10v3.5h-14V8z" fill="currentColor" />
    </svg>
  );
}
