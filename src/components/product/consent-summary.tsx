import { Eye, EyeOff, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { Student } from "@/lib/mock-data/types";
import { cn } from "@/lib/utils";

export type ConsentField = {
  label: string;
  value?: string;
  visible: boolean;
};

type ConsentSummaryProps = {
  student?: Student;
  fields?: ConsentField[];
  className?: string;
};

export function ConsentSummary({ student, fields, className }: ConsentSummaryProps) {
  const resolvedFields =
    fields ??
    [
      { label: "GPA", value: student ? student.gpa.toFixed(2) : "Visible", visible: true },
      { label: "Class ranking", value: student?.classRanking ?? "Hidden", visible: false },
      { label: "Awards", value: student ? `${student.awards.length} awards` : "Visible", visible: true },
      { label: "Activities", value: student ? `${student.activities.length} activities` : "Visible", visible: true },
      { label: "Contact preference", value: "In-app message first", visible: true },
    ];

  return (
    <div className={cn("rounded-xl border border-ink-200 bg-surface-0 p-4 shadow-sm", className)}>
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="size-4 text-success" aria-hidden="true" />
          <p className="text-sm font-semibold text-ink-900">Visible by student consent</p>
        </div>
        <Badge variant="outline" className="text-[10px]">
          Demo privacy
        </Badge>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {resolvedFields.map((field) => (
          <div key={field.label} className="flex items-start gap-2 rounded-lg bg-ink-50 px-3 py-2">
            {field.visible ? (
              <Eye className="mt-0.5 size-3.5 shrink-0 text-success" aria-hidden="true" />
            ) : (
              <EyeOff className="mt-0.5 size-3.5 shrink-0 text-ink-400" aria-hidden="true" />
            )}
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-400">{field.label}</p>
              <p className="mt-0.5 truncate text-xs font-medium text-ink-800">
                {field.visible ? field.value ?? "Visible" : "Hidden"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
