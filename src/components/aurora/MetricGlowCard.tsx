import type { ComponentType } from "react";

import { cn } from "@/lib/utils";

type MetricGlowTone = "gold" | "violet" | "cyan" | "blue" | "success";

const toneClass: Record<MetricGlowTone, { icon: string; ring: string; value: string }> = {
  gold: {
    icon: "bg-gold-500/[0.14] text-gold-300",
    ring: "shadow-[0_0_30px_rgba(245,197,24,0.18)]",
    value: "text-gold-200",
  },
  violet: {
    icon: "bg-aurora-violet/[0.14] text-violet-200",
    ring: "shadow-[0_0_30px_rgba(168,85,247,0.2)]",
    value: "text-violet-100",
  },
  cyan: {
    icon: "bg-aurora-cyan/[0.14] text-cyan-200",
    ring: "shadow-[0_0_30px_rgba(6,182,212,0.2)]",
    value: "text-cyan-100",
  },
  blue: {
    icon: "bg-aurora-blue/[0.14] text-blue-200",
    ring: "shadow-[0_0_30px_rgba(37,99,235,0.18)]",
    value: "text-blue-100",
  },
  success: {
    icon: "bg-success/[0.14] text-emerald-200",
    ring: "shadow-[0_0_30px_rgba(16,185,129,0.18)]",
    value: "text-emerald-100",
  },
};

type MetricGlowCardProps = {
  icon?: ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
  detail?: string;
  trend?: string;
  tone?: MetricGlowTone;
  className?: string;
};

export function MetricGlowCard({
  icon: Icon,
  label,
  value,
  detail,
  trend,
  tone = "gold",
  className,
}: MetricGlowCardProps) {
  const styles = toneClass[tone];

  return (
    <div className={cn("glow-card motion-safe-hover rounded-lg p-5", styles.ring, className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className={cn("text-3xl font-black tracking-normal", styles.value)}>
            {typeof value === "number" ? value.toLocaleString() : value}
          </p>
          <p className="mt-1 text-xs font-semibold text-ink-300">{label}</p>
        </div>
        {Icon ? (
          <span className={cn("flex size-10 shrink-0 items-center justify-center rounded-lg border border-white/10", styles.icon)}>
            <Icon className="size-5" aria-hidden="true" />
          </span>
        ) : null}
      </div>
      {detail ? <p className="mt-4 text-xs leading-5 text-ink-400">{detail}</p> : null}
      {trend ? (
        <span className="mt-3 inline-flex rounded-full border border-success/20 bg-success/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-200">
          {trend}
        </span>
      ) : null}
    </div>
  );
}
