import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type EmployerMetricCardProps = {
  label: string;
  value: string | number;
  detail: string;
  icon: LucideIcon;
  tone?: "ink" | "gold" | "success" | "sky" | "violet";
};

const toneClasses = {
  ink: "bg-ink-100 text-ink-700",
  gold: "bg-gold-50 text-gold-700",
  success: "bg-success/10 text-success",
  sky: "bg-sky-50 text-sky-700",
  violet: "bg-violet-50 text-violet-700",
};

export function EmployerMetricCard({
  label,
  value,
  detail,
  icon: Icon,
  tone = "ink",
}: EmployerMetricCardProps) {
  return (
    <Card className="overflow-hidden transition hover:-translate-y-0.5 hover:shadow-md">
      <CardContent className="pt-5">
        <div className="mb-3 flex items-start justify-between gap-3">
          <span className={cn("flex size-9 items-center justify-center rounded-lg", toneClasses[tone])}>
            <Icon className="size-4" aria-hidden="true" />
          </span>
          <span className="rounded-full bg-ink-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-400">
            Live
          </span>
        </div>
        <p className="text-2xl font-bold text-ink-900">{value}</p>
        <p className="mt-1 text-xs font-semibold text-ink-700">{label}</p>
        <p className="mt-1 line-clamp-2 text-xs leading-5 text-ink-400">{detail}</p>
      </CardContent>
    </Card>
  );
}
