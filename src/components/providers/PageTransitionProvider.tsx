"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || reduceMotion) {
    return <>{children}</>;
  }

  return (
    <>
      <motion.div
        key={`progress-${pathname}`}
        className="fixed left-0 top-0 z-[90] h-0.5 w-full origin-left bg-gold-500"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.88, ease: easeOutExpo }}
        aria-hidden="true"
      />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.32, ease: easeOutExpo }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
