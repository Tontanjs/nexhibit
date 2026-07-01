import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type InteractiveGlowListItemProps = {
  children: ReactNode;
  className?: string;
};

export function InteractiveGlowListItem({ children, className }: InteractiveGlowListItemProps) {
  return (
    <div className={cn("motion-safe-hover rounded-lg border border-white/10 bg-white/[0.055] p-3 hover:border-gold-300/25 hover:bg-white/[0.085]", className)}>
      {children}
    </div>
  );
}
