import type { ComponentType } from "react";

import { cn } from "@/lib/utils";

type FloatingFeatureCardProps = {
  icon?: ComponentType<{ className?: string }>;
  label: string;
  value: string;
  className?: string;
};

export function FloatingFeatureCard({ icon: Icon, label, value, className }: FloatingFeatureCardProps) {
  return (
    <div className={cn("glass-card float-card rounded-lg p-4 text-left", className)}>
      <div className="flex items-center gap-3">
        {Icon ? (
          <span className="flex size-9 items-center justify-center rounded-lg bg-white/10 text-gold-300">
            <Icon className="size-4" aria-hidden="true" />
          </span>
        ) : null}
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink-400">{label}</p>
          <p className="mt-1 text-sm font-semibold text-surface-0">{value}</p>
        </div>
      </div>
    </div>
  );
}
