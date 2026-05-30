"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

type CursorMode = "default" | "hover" | "view";

export function CustomCursor() {
  const [active, setActive] = useState(false);
  const [mode, setMode] = useState<CursorMode>("default");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const dotX = useSpring(x, { stiffness: 900, damping: 48, mass: 0.3 });
  const dotY = useSpring(y, { stiffness: 900, damping: 48, mass: 0.3 });
  const ringX = useSpring(x, { stiffness: 170, damping: 24, mass: 0.9 });
  const ringY = useSpring(y, { stiffness: 170, damping: 24, mass: 0.9 });
  const targetRef = useRef<EventTarget | null>(null);

  const dotTranslateX = useTransform(dotX, (value) => value - 4);
  const dotTranslateY = useTransform(dotY, (value) => value - 4);
  const ringTranslateX = useTransform(ringX, (value) => value - (mode === "view" ? 34 : mode === "hover" ? 28 : 16));
  const ringTranslateY = useTransform(ringY, (value) => value - (mode === "view" ? 18 : mode === "hover" ? 28 : 16));

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!canHover.matches || reduceMotion.matches) {
      return undefined;
    }

    setActive(true);
    document.body.classList.add("custom-cursor-active");

    const updateMode = (target: EventTarget | null) => {
      if (!(target instanceof Element)) {
        setMode("default");
        return;
      }

      if (target.closest("[data-cursor='view'], [data-cursor='card'], article, img")) {
        setMode("view");
        return;
      }

      if (target.closest("button, a, [data-cursor='hover']")) {
        setMode("hover");
        return;
      }

      setMode("default");
    };

    const handlePointerMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      if (targetRef.current !== event.target) {
        targetRef.current = event.target;
        updateMode(event.target);
      }
    };

    const handlePointerLeave = () => {
      x.set(-100);
      y.set(-100);
      setMode("default");
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [x, y]);

  if (!active) {
    return null;
  }

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] size-2 rounded-full bg-gold-500 mix-blend-difference"
        style={{ x: dotTranslateX, y: dotTranslateY }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99] grid place-items-center rounded-full border border-gold-400/80 text-[10px] font-bold uppercase tracking-wide text-gold-200 mix-blend-difference"
        animate={{
          width: mode === "view" ? 68 : mode === "hover" ? 56 : 32,
          height: mode === "view" ? 36 : mode === "hover" ? 56 : 32,
          borderRadius: mode === "view" ? 999 : 999,
          backgroundColor: mode === "default" ? "rgba(245,197,24,0)" : "rgba(245,197,24,0.28)",
        }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ x: ringTranslateX, y: ringTranslateY }}
        aria-hidden="true"
      >
        {mode === "view" ? "View ->" : null}
      </motion.div>
    </>
  );
}
