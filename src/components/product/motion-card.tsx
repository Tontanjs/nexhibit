"use client";

import type { ComponentProps } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

type MotionCardProps = ComponentProps<typeof motion.div> & {
  lift?: boolean;
};

export function MotionCard({ className, lift = true, ...props }: MotionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
      whileHover={lift ? { y: -3 } : undefined}
      className={cn("motion-reduce:transform-none", className)}
      {...props}
    />
  );
}
