import type { ComponentType } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type MetricTone = "ink" | "gold" | "success" | "warning" | "muted";

const toneClasses: Record<MetricTone, { icon: string; value: string; bg: string }> = {
  ink: { icon: "text-ink-700", value: "text-ink-900", bg: "bg-ink-100" },
  gold: { icon: "text-gold-700", value: "text-gold-700", bg: "bg-gold-50" },
  success: { icon: "text-success", value: "text-success", bg: "bg-success/10" },
  warning: { icon: "text-warning", value: "text-warning", bg: "bg-warning/10" },
  muted: { icon: "text-ink-400", value: "text-ink-700", bg: "bg-ink-50" },
};

type MetricCardProps = {
  icon?: ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
  detail?: string;
  trend?: string;
  tone?: MetricTone;
  className?: string;
};

export function MetricCard({
  icon: Icon,
  label,
  value,
  detail,
  trend,
  tone = "ink",
  className,
}: MetricCardProps) {
  const styles = toneClasses[tone];

  return (
    <Card className={cn("overflow-hidden transition hover:-translate-y-0.5 hover:shadow-lg", className)}>
      <CardContent className="pt-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className={cn("text-2xl font-black tracking-normal", styles.value)}>
              {typeof value === "number" ? value.toLocaleString() : value}
            </p>
            <p className="mt-1 text-xs font-semibold text-ink-600">{label}</p>
          </div>
          {Icon ? (
            <span className={cn("flex size-9 shrink-0 items-center justify-center rounded-lg", styles.bg, styles.icon)}>
              <Icon className="size-4" aria-hidden="true" />
            </span>
          ) : null}
        </div>
        {detail ? <p className="mt-3 text-xs leading-5 text-ink-500">{detail}</p> : null}
        {trend ? (
          <p className="mt-2 inline-flex rounded-full bg-success/10 px-2 py-0.5 text-[11px] font-semibold text-success">
            {trend}
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}
