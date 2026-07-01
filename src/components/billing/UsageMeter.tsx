import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

type Props = {
  label: string;
  current: number;
  limit: number;
  unit?: string;
};

export function UsageMeter({ label, current, limit, unit = "" }: Props) {
  const unlimited = limit === -1;
  const percent = unlimited ? 100 : Math.min(100, Math.round((current / limit) * 100));
  const hot = !unlimited && percent > 80;

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-semibold text-ink-800">{label}</span>
        <span className="text-sm tabular-nums text-ink-500">
          {unlimited ? (
            <span className="inline-flex items-center gap-1 font-semibold text-gold-700">
              <Check className="size-4" />
              Unlimited
            </span>
          ) : (
            `${current}/${limit}${unit ? ` ${unit}` : ""}`
          )}
        </span>
      </div>
      <div className="mt-2 h-1 rounded-full bg-ink-100">
        <div
          className={cn("h-1 rounded-full", hot || unlimited ? "bg-gold-500" : "bg-ink-700")}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
