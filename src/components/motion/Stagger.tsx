"use client";

import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

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
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn("will-change-[transform,opacity]", className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.12 }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: gap,
            delayChildren: delay,
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
                show: { opacity: 1, y: 0, transition: { duration: 0.48, ease: easeOutExpo } },
              }}
            >
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
}
