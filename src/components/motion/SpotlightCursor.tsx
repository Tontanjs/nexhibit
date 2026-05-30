"use client";

import { useEffect, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

import { cn } from "@/lib/utils";

export function SpotlightCursor({ className }: { className?: string }) {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 120, damping: 24 });
  const smoothY = useSpring(y, { stiffness: 120, damping: 24 });
  const background = useMotionTemplate`radial-gradient(600px circle at ${smoothX}px ${smoothY}px, rgba(245,197,24,0.08), transparent 62%)`;

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!canHover.matches || reduceMotion.matches) {
      return undefined;
    }

    setEnabled(true);
    const handleMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, [x, y]);

  if (!enabled) {
    return null;
  }

  return <motion.div className={cn("pointer-events-none absolute inset-0 z-[1]", className)} style={{ background }} aria-hidden="true" />;
}
