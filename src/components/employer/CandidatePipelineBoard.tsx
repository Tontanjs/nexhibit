import Link from "next/link";

import { StudentAvatar } from "@/components/brand/StudentAvatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { employerPipeline, getCandidateSignal } from "@/lib/employer-workspace";
import { students } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

type CandidatePipelineBoardProps = {
  compact?: boolean;
  className?: string;
};

export function CandidatePipelineBoard({
  compact = false,
  className,
}: CandidatePipelineBoardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className={cn("pt-5", compact && "p-4 pt-4")}>
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-400">
              Candidate pipeline
            </p>
            <h2 className="mt-1 text-base font-semibold text-ink-900">
              New to offer, without leaving the fair workflow
            </h2>
          </div>
          <Badge variant="gold" className="hidden text-xs sm:inline-flex">
            Mock ATS
          </Badge>
        </div>

        <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
          {employerPipeline.map((stage) => (
            <div key={stage.id} className="rounded-lg border border-ink-200 bg-ink-50/60 p-3">
              <div className="mb-3 flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-ink-900">{stage.label}</p>
                  <p className="mt-0.5 text-[11px] leading-4 text-ink-400">{stage.description}</p>
                </div>
                <span className="rounded-full bg-surface-0 px-2 py-0.5 text-xs font-bold text-ink-700 ring-1 ring-ink-100">
                  {stage.candidateIds.length}
                </span>
              </div>

              <div className="space-y-2">
                {stage.candidateIds.slice(0, compact ? 2 : 3).map((studentId) => {
                  const student = students.find((item) => item.id === studentId);
                  if (!student) return null;
                  const signal = getCandidateSignal(student.id);
                  return (
                    <Link
                      key={student.id}
                      href={`/employer/student/${student.id}`}
                      className="group flex items-center gap-2 rounded-md bg-surface-0 p-2 shadow-sm ring-1 ring-ink-100 transition hover:-translate-y-0.5 hover:ring-gold-200"
                    >
                      <StudentAvatar student={student} className="size-7" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-xs font-semibold text-ink-900">
                          {student.name}
                        </span>
                        <span className="block truncate text-[10px] text-ink-400">
                          {signal.status}
                        </span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
