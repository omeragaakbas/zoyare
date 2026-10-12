"use client";

import { m, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <m.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-accent origin-left z-[9998]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
