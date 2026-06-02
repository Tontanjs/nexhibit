"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { useStableReducedMotion } from "@/components/motion/use-stable-reduced-motion";

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Stagger({
  children,
  className,
  delay = 0,
  gap = 0.08,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  gap?: number;
  once?: boolean;
}) {
  const reduceMotion = useStableReducedMotion();

  return (
    <motion.div
      className={cn("will-change-[transform,opacity]", className)}
      initial={reduceMotion ? false : "hidden"}
      animate={reduceMotion ? "show" : undefined}
      whileInView={reduceMotion ? undefined : "show"}
      viewport={{ once, amount: 0.12 }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: reduceMotion ? 0 : gap,
            delayChildren: reduceMotion ? 0 : delay,
          },
        },
      }}
    >
      {Array.isArray(children)
        ? children.map((child, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: reduceMotion ? { duration: 0 } : { duration: 0.48, ease: easeOutExpo },
                },
              }}
            >
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
}
