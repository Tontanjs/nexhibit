"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export const MOTION_PREFERENCE_KEY = "nexhibit-motion-preference";
export const MOTION_PREFERENCE_EVENT = "nexhibit:motion-preference";

export function isMotionForced() {
  if (typeof window === "undefined") {
    return false;
  }

  return (
    window.localStorage.getItem(MOTION_PREFERENCE_KEY) === "force" ||
    document.documentElement.dataset.motion === "force"
  );
}

export function setMotionForced(force: boolean) {
  if (typeof window === "undefined") {
    return;
  }

  if (force) {
    window.localStorage.setItem(MOTION_PREFERENCE_KEY, "force");
    document.documentElement.dataset.motion = "force";
  } else {
    window.localStorage.removeItem(MOTION_PREFERENCE_KEY);
    delete document.documentElement.dataset.motion;
  }

  window.dispatchEvent(new Event(MOTION_PREFERENCE_EVENT));
}

export function useMotionForcedPreference() {
  const [forced, setForced] = useState(false);

  useEffect(() => {
    const sync = () => setForced(isMotionForced());
    sync();
    window.addEventListener(MOTION_PREFERENCE_EVENT, sync);
    window.addEventListener("storage", sync);

    return () => {
      window.removeEventListener(MOTION_PREFERENCE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return forced;
}

export function useShouldReduceMotion() {
  const reduceMotion = useReducedMotion();
  const forceMotion = useMotionForcedPreference();

  return Boolean(reduceMotion) && !forceMotion;
}
