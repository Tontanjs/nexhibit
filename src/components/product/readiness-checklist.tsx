import { CheckCircle2, Circle } from "lucide-react";

import { cn } from "@/lib/utils";

export type ReadinessItem = {
  label: string;
  complete: boolean;
  detail?: string;
};

type ReadinessChecklistProps = {
  title: string;
  items: ReadinessItem[];
  className?: string;
};

export function ReadinessChecklist({ title, items, className }: ReadinessChecklistProps) {
  const complete = items.filter((item) => item.complete).length;
  const score = Math.round((complete / Math.max(items.length, 1)) * 100);

  return (
    <div className={cn("rounded-xl border border-ink-200 bg-surface-0 p-4 shadow-sm", className)}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-ink-900">{title}</p>
          <p className="mt-1 text-xs text-ink-500">{complete} of {items.length} complete</p>
        </div>
        <span className="text-2xl font-black text-gold-700">{score}%</span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-ink-100">
        <div className="h-full rounded-full bg-gold-500" style={{ width: `${score}%` }} />
      </div>
      <div className="mt-4 space-y-2">
        {items.map((item) => (
          <div key={item.label} className="flex gap-2 rounded-lg bg-ink-50 px-3 py-2">
            {item.complete ? (
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
            ) : (
              <Circle className="mt-0.5 size-4 shrink-0 text-ink-300" aria-hidden="true" />
            )}
            <div className="min-w-0">
              <p className="text-xs font-semibold text-ink-800">{item.label}</p>
              {item.detail ? <p className="mt-0.5 text-[11px] leading-4 text-ink-500">{item.detail}</p> : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
