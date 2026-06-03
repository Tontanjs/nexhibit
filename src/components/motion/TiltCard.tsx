"use client";

import { useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";

import { useStableReducedMotion } from "@/components/motion/use-stable-reduced-motion";
import { cn } from "@/lib/utils";

export function TiltCard({
  children,
  className,
  glare = false,
  max = 8,
}: {
  children: React.ReactNode;
  className?: string;
  glare?: boolean;
  max?: number;
}) {
  const reduceMotion = useStableReducedMotion();
  const [hovered, setHovered] = useState(false);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [max, -max]), { stiffness: 180, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-max, max]), { stiffness: 180, damping: 20 });
  const glareX = useTransform(mouseX, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(mouseY, [0, 1], ["0%", "100%"]);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.5), transparent 34%)`;

  return (
    <motion.div
      data-cursor="card"
      className={cn("relative [perspective:1000px]", className)}
      onMouseMove={(event) => {
        if (reduceMotion) {
          return;
        }
        const rect = event.currentTarget.getBoundingClientRect();
        mouseX.set((event.clientX - rect.left) / rect.width);
        mouseY.set((event.clientY - rect.top) / rect.height);
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        mouseX.set(0.5);
        mouseY.set(0.5);
      }}
      style={reduceMotion ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileHover={reduceMotion ? undefined : { y: -2 }}
      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
      {glare && !reduceMotion ? (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300"
          animate={{ opacity: hovered ? 0.35 : 0 }}
          style={{ background: glareBackground }}
          aria-hidden="true"
        />
      ) : null}
    </motion.div>
  );
}
