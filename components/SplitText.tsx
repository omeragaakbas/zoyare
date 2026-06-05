"use client";

import { motion, useReducedMotion } from "framer-motion";

interface SplitTextProps {
  children: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "span" | "div";
}

/**
 * Character-level reveal: each letter slides up + fades + un-blurs.
 * Whitespace is preserved by splitting on words first, then chars.
 */
export default function SplitText({
  children,
  className = "",
  delay = 0,
  stagger = 0.03,
}: SplitTextProps) {
  const reduced = useReducedMotion();
  const words = children.split(" ");

  if (reduced) {
    return <span className={className}>{children}</span>;
  }

  let charIndex = 0;

  return (
    <span className={`inline-block ${className}`}>
      {words.map((word, wi) => (
        <span
          key={`w-${wi}`}
          className="inline-block whitespace-nowrap"
          style={{ paddingBottom: "0.05em" }}
        >
          {word.split("").map((char, ci) => {
            const i = charIndex++;
            return (
              <motion.span
                key={`c-${ci}`}
                className="inline-block"
                initial={{ y: 32, opacity: 0, filter: "blur(8px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{
                  duration: 0.55,
                  delay: delay + i * stagger,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {char}
              </motion.span>
            );
          })}
          {wi < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </span>
  );
}
