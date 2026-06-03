"use client";

import { useEffect, useState } from "react";

import { setMotionForced } from "@/components/motion/motion-preference";

function cleanMotionParam() {
  const url = new URL(window.location.href);
  url.searchParams.delete("motion");
  window.history.replaceState(null, "", url.toString());
}

export function MotionPreferenceProvider({ children }: { children: React.ReactNode }) {
  const [showControl, setShowControl] = useState(false);

  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("motion")?.toLowerCase();

    if (param === "on" || param === "force" || param === "1" || param === "true") {
      setMotionForced(true);
      const url = new URL(window.location.href);
      url.searchParams.delete("motion");
      window.location.replace(url.toString());
      return undefined;
    }

    if (param === "system" || param === "off" || param === "0" || param === "false") {
      setMotionForced(false);
      cleanMotionParam();
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => {
      const forced = window.localStorage.getItem("nexhibit-motion-preference") === "force";
      document.documentElement.dataset.motion = forced ? "force" : "";
      if (!forced) {
        delete document.documentElement.dataset.motion;
      }
      setShowControl(reduceMotion.matches && !forced);
    };

    sync();
    reduceMotion.addEventListener("change", sync);

    return () => reduceMotion.removeEventListener("change", sync);
  }, []);

  return (
    <>
      {children}
      {showControl ? (
        <button
          type="button"
          className="fixed bottom-4 right-4 z-[120] rounded-full border border-gold-400/40 bg-ink-900 px-4 py-2 text-xs font-bold uppercase tracking-wide text-gold-100 shadow-2xl shadow-ink-900/25"
          onClick={() => {
            setMotionForced(true);
            window.location.reload();
          }}
        >
          Enable motion
        </button>
      ) : null}
    </>
  );
}
