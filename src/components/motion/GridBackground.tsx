"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";

export function GridBackground({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1200], [0, 360]);

  return (
    <motion.div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      style={reduceMotion ? undefined : { y }}
      aria-hidden="true"
    >
      <svg className="h-full w-full opacity-60 [mask-image:radial-gradient(circle_at_center,black_30%,transparent_72%)]">
        <defs>
          <pattern id="nexhibit-grid" width="44" height="44" patternUnits="userSpaceOnUse">
            <path d="M 44 0 L 0 0 0 44" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#nexhibit-grid)" className="text-ink-800/10" />
      </svg>
    </motion.div>
  );
}
