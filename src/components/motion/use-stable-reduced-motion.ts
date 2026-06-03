"use client";

import { useEffect, useState } from "react";
import { useShouldReduceMotion } from "@/components/motion/motion-preference";

export function useStableReducedMotion() {
  const reduceMotion = useShouldReduceMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted && Boolean(reduceMotion);
}
