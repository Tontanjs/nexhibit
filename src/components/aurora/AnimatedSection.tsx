"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

import { useStableReducedMotion } from "@/components/motion/use-stable-reduced-motion";
import { cn } from "@/lib/utils";

type AnimatedSectionProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function AnimatedSection({ children, className, delay = 0 }: AnimatedSectionProps) {
  const reduceMotion = useStableReducedMotion();

  return (
    <motion.section
      className={cn(className)}
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.28, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.section>
  );
}
