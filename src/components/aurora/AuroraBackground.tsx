import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type AuroraBackgroundProps = {
  children?: ReactNode;
  className?: string;
  contentClassName?: string;
};

export function AuroraBackground({ children, className, contentClassName }: AuroraBackgroundProps) {
  return (
    <section className={cn("aurora-bg", className)}>
      <div className={cn("relative z-10", contentClassName)}>{children}</div>
    </section>
  );
}
