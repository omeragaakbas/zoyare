"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [visible, setVisible] = useState(false);
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  const x = useSpring(mouseX, { stiffness: 70, damping: 20 });
  const y = useSpring(mouseY, { stiffness: 70, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [visible, mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] w-80 h-80 rounded-full"
      style={{
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
        background:
          "radial-gradient(circle, rgba(241,95,14,0.07) 0%, transparent 70%)",
        opacity: visible ? 1 : 0,
      }}
    />
  );
}
