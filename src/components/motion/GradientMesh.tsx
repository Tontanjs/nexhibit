"use client";

import { cn } from "@/lib/utils";

export function GradientMesh({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden opacity-30 motion-reduce:hidden", className)} aria-hidden="true">
      <div className="mesh-blob mesh-blob-gold" />
      <div className="mesh-blob mesh-blob-ink" />
      <div className="mesh-blob mesh-blob-violet" />
    </div>
  );
}
