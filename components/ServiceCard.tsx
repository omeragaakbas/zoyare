"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

interface ServiceCardProps {
  title: string;
  description: string;
}

export default function ServiceCard({ title, description }: ServiceCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-60, 60], [5, -5]);
  const rotateY = useTransform(x, [-60, 60], [-5, 5]);

  const springX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformStyle: "preserve-3d",
        transformPerspective: 800,
      }}
      className="bg-background p-8 flex flex-col gap-4 hover:bg-surface transition-colors duration-200 h-full cursor-default"
    >
      <h3
        className="text-base font-medium text-primary"
        style={{ transform: "translateZ(12px)" }}
      >
        {title}
      </h3>
      <p
        className="text-sm text-secondary leading-relaxed"
        style={{ transform: "translateZ(6px)" }}
      >
        {description}
      </p>
    </motion.div>
  );
}
