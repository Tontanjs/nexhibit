"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import { cn } from "@/lib/utils";
import { useStableReducedMotion } from "@/components/motion/use-stable-reduced-motion";

type RevealDirection = "up" | "down" | "left" | "right" | "fade";

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

function getOffset(direction: RevealDirection, distance: number) {
  switch (direction) {
    case "down":
      return { y: -distance };
    case "left":
      return { x: distance };
    case "right":
      return { x: -distance };
    case "fade":
      return {};
    case "up":
    default:
      return { y: distance };
  }
}

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  distance = 24,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: RevealDirection;
  distance?: number;
  once?: boolean;
}) {
  const reduceMotion = useStableReducedMotion();
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: once });
  const hiddenState = { opacity: 0, ...getOffset(direction, distance) };
  const visibleState = { opacity: 1, x: 0, y: 0 };

  return (
    <motion.div
      ref={ref}
      className={cn("will-change-[transform,opacity]", className)}
      initial={reduceMotion ? false : hiddenState}
      animate={reduceMotion ? visibleState : inView ? visibleState : hiddenState}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.56, delay, ease: easeOutExpo }}
    >
      {children}
    </motion.div>
  );
}
