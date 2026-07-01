"use client";

import { useEffect, useRef, useState } from "react";

import { isMotionForced } from "@/components/motion/motion-preference";

type CursorMode = "default" | "hover" | "view";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef(0);
  const cursorRef = useRef({
    mode: "default" as CursorMode,
    ringX: -100,
    ringY: -100,
    targetX: -100,
    targetY: -100,
  });
  const targetRef = useRef<EventTarget | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktopViewport = window.matchMedia("(min-width: 768px)");

    if (!desktopViewport.matches || !canHover.matches || (reduceMotion.matches && !isMotionForced())) {
      return undefined;
    }

    setActive(true);
    document.body.classList.add("custom-cursor-active");

    const setMode = (nextMode: CursorMode) => {
      const cursor = cursorRef.current;
      if (cursor.mode === nextMode) {
        return;
      }

      cursor.mode = nextMode;
      if (ringRef.current) {
        ringRef.current.dataset.mode = nextMode;
      }
    };

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
      if (event.pointerType && event.pointerType !== "mouse") {
        return;
      }

      const cursor = cursorRef.current;
      const wasOffscreen = cursor.targetX < 0 || cursor.targetY < 0;
      cursor.targetX = event.clientX;
      cursor.targetY = event.clientY;

      if (wasOffscreen) {
        cursor.ringX = event.clientX;
        cursor.ringY = event.clientY;
      }

      if (targetRef.current !== event.target) {
        targetRef.current = event.target;
        updateMode(event.target);
      }
    };

    const handlePointerLeave = () => {
      const cursor = cursorRef.current;
      cursor.targetX = -100;
      cursor.targetY = -100;
      cursor.ringX = -100;
      cursor.ringY = -100;
      setMode("default");
    };

    const renderCursor = () => {
      const cursor = cursorRef.current;
      const dot = dotRef.current;
      const ring = ringRef.current;

      if (dot) {
        dot.style.transform = `translate3d(${cursor.targetX}px, ${cursor.targetY}px, 0) translate(-50%, -50%)`;
      }

      if (ring) {
        cursor.ringX += (cursor.targetX - cursor.ringX) * 0.34;
        cursor.ringY += (cursor.targetY - cursor.ringY) * 0.34;
        ring.style.transform = `translate3d(${cursor.ringX}px, ${cursor.ringY}px, 0) translate(-50%, -50%)`;
      }

      frameRef.current = window.requestAnimationFrame(renderCursor);
    };

    frameRef.current = window.requestAnimationFrame(renderCursor);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.cancelAnimationFrame(frameRef.current);
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  if (!active) {
    return null;
  }

  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot" aria-hidden="true" />
      <div
        ref={ringRef}
        className="custom-cursor-ring"
        data-mode="default"
        aria-hidden="true"
      >
        <span className="custom-cursor-label">View</span>
      </div>
    </>
  );
}
