import type { ComponentType } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type InsightTone = "gold" | "success" | "warning" | "ink";

const insightTone: Record<InsightTone, string> = {
  gold: "border-gold-200 bg-gold-50/70 text-gold-700",
  success: "border-success/20 bg-success/10 text-success",
  warning: "border-warning/20 bg-warning/10 text-warning",
  ink: "border-ink-200 bg-ink-50 text-ink-700",
};

type InsightCardProps = {
  title: string;
  body: string;
  label?: string;
  icon?: ComponentType<{ className?: string }>;
  tone?: InsightTone;
  className?: string;
};

export function InsightCard({
  title,
  body,
  label,
  icon: Icon,
  tone = "ink",
  className,
}: InsightCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="pt-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            {label ? (
              <Badge variant={tone === "gold" ? "gold" : tone === "success" ? "success" : "outline"} className="mb-3 text-[10px]">
                {label}
              </Badge>
            ) : null}
            <h3 className="text-sm font-semibold text-ink-900">{title}</h3>
          </div>
          {Icon ? (
            <span className={cn("flex size-9 shrink-0 items-center justify-center rounded-lg border", insightTone[tone])}>
              <Icon className="size-4" aria-hidden="true" />
            </span>
          ) : null}
        </div>
        <p className="mt-2 text-sm leading-6 text-ink-600">{body}</p>
      </CardContent>
    </Card>
  );
}
