"use client";

import { motion } from "framer-motion";

type LogoVariant = "full" | "mark";

interface LogoProps {
  variant?: LogoVariant;
  className?: string;
  height?: number;
  animate?: boolean;
}

/*
  Icon paths: 3 orange paths from the original Zoyare vectorized SVG.
  Rendered at scale(0.373) with translate(2 5) to position in viewBox.
  Original coordinate space: 1536×1024, icon region x≈285–490, y≈385–640.
*/
const ICON_TRANSFORM = "translate(2 5) scale(0.373) translate(-285 -385)";

const iconPaths = [
  // Main body — left arrows + outer frame
  "M 349.29 551.02 l -47.75 -26.09 0 -52.06 0 -52.18 20.06 10.46 c 25.72 13.54 67.20 36.18 69.42 38.03 1.23 0.98 1.60 3.45 1.35 8.12 l -0.37 6.89 -8.62 5.05 c -4.68 2.83 -18.71 10.95 -31.14 17.85 l -22.52 12.68 3.45 2.09 c 9.11 5.54 65.60 35.69 66.71 35.69 0.86 0 1.48 -14.89 1.60 -44.55 l 0.37 -44.55 8 -4.55 c 4.43 -2.58 8.37 -4.31 8.86 -3.82 0.49 0.49 0.98 3.08 1.23 5.78 l 0.37 4.92 4.68 -8.86 c 4.92 -9.35 6.52 -10.83 19.69 -18.09 6.03 -3.45 8.25 -4.18 8.25 -2.83 0 1.60 -10.22 23.75 -30.28 65.48 -2.71 5.78 -2.95 7.63 -3.20 31.88 l -0.37 25.85 -5.54 3.20 c -3.08 1.72 -8 4.68 -11.08 6.52 l -5.54 3.20 -47.63 -26.09 z m 1.48 -64 c 7.14 -4.06 13.91 -8 15.14 -8.86 1.85 -1.35 0.37 -2.46 -12.31 -9.60 -24 -13.17 -33.11 -18.09 -33.97 -18.09 -0.49 0 -0.86 12.18 -0.86 27.20 l 0 27.08 9.60 -5.17 c 5.17 -2.83 15.26 -8.49 22.40 -12.55 z",
  // Right column / staff
  "M 429.54 547.69 c 0 -9.85 0 -9.97 3.82 -12.06 2.09 -1.11 11.08 -6.40 19.94 -11.57 l 16.25 -9.48 0.62 -42.83 0.62 -42.71 8 -4.68 8 -4.55 0.37 51.82 c 0.25 40.49 -0.12 52.31 -1.23 53.42 -1.35 1.23 -44.80 26.46 -53.54 31.14 -2.83 1.48 -2.83 1.48 -2.83 -8.49 z",
  // Upper section / top face
  "M 392.49 456.74 l -3.20 -2.46 0.12 -32.12 c 0 -17.60 -0.25 -32 -0.62 -32 -0.49 0 -4.92 2.46 -9.85 5.42 -23.38 13.78 -49.11 27.82 -50.95 27.82 -2.09 0 -16.62 -7.51 -16.62 -8.62 0 -0.37 19.45 -11.82 43.32 -25.48 l 43.32 -24.74 4.68 2.34 4.68 2.34 0 32 c 0 17.60 0.49 32 0.98 32 0.98 0 42.58 -23.51 50.22 -28.31 2.22 -1.35 3.57 -0.98 11.32 3.08 4.92 2.58 8.86 4.92 8.86 5.42 -0.12 1.11 -77.42 44.80 -80.49 45.29 -1.48 0.37 -4.06 -0.62 -5.78 -1.97 z",
];

/*
  Wordmark paths (Z O Y A R E) — custom geometric paths from original brand system.
  Designed for viewBox coordinate space 0 0 180 36.
  Use fill="currentColor" so the component inherits dark/light from CSS.
  Scale + translate to align with icon in the shared viewBox.

  transform="translate(-21.2 7.9) scale(2.766)" places ZOYARE at:
    x: 117–446, y: 30–95  (in the 0 0 455/480 viewBox)
*/
const WORDMARK_TRANSFORM = "translate(-21.2 7.9) scale(2.766)";

const wordmarkPaths = [
  "M50 8h14v3.5L54.5 28H64v3.5H50V28l9.5-16.5H50V8z",                                                          // Z
  "M70 17.75C70 12.36 73.36 8 79 8s9 4.36 9 9.75-3.36 9.75-9 9.75-9-4.36-9-9.75zm14 0C84 14.2 82 11.5 79 11.5s-5 2.7-5 6.25 2 6.25 5 6.25 5-2.7 5-6.25z", // O (ring)
  "M96 8l5.5 9.5L107 8h4l-7.5 13v10.5h-4V21L92 8h4z",                                                          // Y
  "M117 8h4l8 23.5h-4l-2-6h-8l-2 6h-4L117 8zm4.75 14-2.75-8.5-2.75 8.5h5.5z",                                 // A (counter)
  "M133 8h8c4.4 0 7 2.5 7 6.5 0 3-1.5 5.2-4 6.2l4.5 10.8h-4.5l-4-10h-3.5v10H133V8zm4 3.5v6.5h4c2 0 3.5-1.3 3.5-3.25S143 11.5 141 11.5h-4z", // R (bowl)
  "M155 8h14v3.5h-10v6h9v3.5h-9v7h10v3.5h-14V8z",                                                              // E
];

const fadeIn = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

function IconPaths({ animated }: { animated: boolean }) {
  if (animated) {
    return (
      <motion.g fill="#f15f0e" transform={ICON_TRANSFORM} variants={fadeIn} initial="hidden" animate="show">
        {iconPaths.map((d, i) => <path key={i} d={d} />)}
      </motion.g>
    );
  }
  return (
    <g fill="#f15f0e" transform={ICON_TRANSFORM}>
      {iconPaths.map((d, i) => <path key={i} d={d} />)}
    </g>
  );
}

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
        viewBox="0 0 90 108"
        height={height}
        fill="none"
        className={className}
        aria-label="Zoyare"
      >
        <IconPaths animated={animate} />
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 455 108"
      height={height}
      fill="none"
      className={className}
      aria-label="Zoyare"
    >
      <IconPaths animated={animate} />
      <g fill="currentColor" transform={WORDMARK_TRANSFORM}>
        {wordmarkPaths.map((d, i) => <path key={i} d={d} />)}
      </g>
    </svg>
  );
}
