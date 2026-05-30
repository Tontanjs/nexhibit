"use client";

import { motion, useReducedMotion } from "framer-motion";
import { createElement } from "react";

import { cn } from "@/lib/utils";

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function SplitText({
  text,
  as = "span",
  className,
  highlight = [],
  once = true,
}: {
  text: string;
  as?: "span" | "h1" | "h2" | "h3" | "p";
  className?: string;
  highlight?: string[];
  once?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const words = text.split(" ");
  const Component =
    as === "h1"
      ? motion.h1
      : as === "h2"
        ? motion.h2
        : as === "h3"
          ? motion.h3
          : as === "p"
            ? motion.p
            : motion.span;

  if (reduceMotion) {
    return createElement(as, { className }, text);
  }

  return (
    <Component
      aria-label={text}
      className={cn("inline-block", className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.65 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.04 } },
      }}
    >
      {words.map((word, index) => {
        const normalized = word.toLowerCase().replace(/[^\w]/g, "");
        const isHighlighted = highlight.some((item) => item.toLowerCase().replace(/[^\w]/g, "") === normalized);

        return (
          <span key={`${word}-${index}`} aria-hidden="true">
            <motion.span
              className={cn("inline-block pr-[0.22em]", isHighlighted && "text-gold-500")}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: {
                  opacity: 1,
                  y: 0,
                  scale: isHighlighted ? [1, 1.045, 1] : 1,
                  transition: {
                    duration: isHighlighted ? 0.72 : 0.56,
                    ease: easeOutExpo,
                  },
                },
              }}
            >
              {word}
            </motion.span>
            {index < words.length - 1 ? " " : null}
          </span>
        );
      })}
    </Component>
  );
}
