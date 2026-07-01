import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ScannerGlowFrameProps = {
  children?: ReactNode;
  className?: string;
  state?: "ready" | "scanning" | "matched" | "saved" | "error";
};

const stateLabel: Record<NonNullable<ScannerGlowFrameProps["state"]>, string> = {
  ready: "Ready",
  scanning: "Scanning",
  matched: "Matched",
  saved: "Saved",
  error: "Invalid ID",
};

export function ScannerGlowFrame({ children, className, state = "ready" }: ScannerGlowFrameProps) {
  return (
    <div className={cn("scanner-aurora-frame mx-auto flex min-h-[320px] w-full max-w-[360px] items-center justify-center p-8", className)}>
      <div className="relative z-10 flex flex-col items-center gap-4 text-center">
        {children}
        <span className="inline-flex rounded-full border border-white/[0.12] bg-white/[0.08] px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-ink-200">
          {stateLabel[state]}
        </span>
      </div>
    </div>
  );
}
