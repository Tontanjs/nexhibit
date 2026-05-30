"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageSquare, X, Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { EmptyShortlist } from "@/components/illustrations/EmptyShortlist";
import { copy } from "@/lib/copy";
import { currentEmployer } from "@/lib/current-employer";
import { students } from "@/lib/mock-data";
import { calculateMatchScore, getMatchTier } from "@/lib/utils-lib/matching";
import { getCategoryColors } from "@/lib/utils-lib/colors";
import { cn } from "@/lib/utils";

const p = copy.pages.employer.shortlist;

const SEEDED_SHORTLIST = ["stu-001", "stu-003", "stu-006"];

export default function ShortlistPage() {
  const [shortlistedIds, setShortlistedIds] = useState<string[]>(SEEDED_SHORTLIST);

  const shortlistedStudents = shortlistedIds
    .map((id) => students.find((s) => s.id === id))
    .filter(Boolean) as (typeof students)[number][];

  function remove(id: string) {
    setShortlistedIds((prev) => prev.filter((x) => x !== id));
  }

  function getScore(studentId: string) {
    const s = students.find((x) => x.id === studentId);
    if (!s) return 0;
    return calculateMatchScore({
      studentCategory: s.category,
      studentSkills: [...s.skills],
      studentEnglishLevel: s.englishLevel,
      studentHSK: s.hsk,
      employerHiringCategories: [...currentEmployer.hiringCategories],
      employerHiringSkills: [...currentEmployer.hiringSkills],
      studentId: s.id,
      employerId: currentEmployer.id,
    }).score;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-ink-900">{p.heading}</h1>
          <p className="mt-0.5 text-sm text-ink-500">{p.subheading}</p>
        </div>
        {shortlistedStudents.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-ink-400">
              {shortlistedStudents.length} {p.studentsCount}
            </span>
            <Button variant="outline" size="sm">
              <Download className="mr-1.5 size-3.5" />
              {p.exportList}
            </Button>
          </div>
        )}
      </div>

      {shortlistedStudents.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
          <EmptyShortlist size={120} />
          <p className="text-base font-semibold text-ink-700">{p.emptyHeading}</p>
          <p className="max-w-xs text-sm text-ink-400">{p.emptyBody}</p>
          <Button variant="primary" size="sm" asChild>
            <Link href="/employer/browse">{copy.pages.employer.browse.heading}</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {shortlistedStudents.map((s) => {
            const score = getScore(s.id);
            const tier = getMatchTier(score);
            const catColors = getCategoryColors(s.category);
            const tierColor =
              tier === "Strong"
                ? "text-success"
                : tier === "Good"
                  ? "text-warning"
                  : "text-ink-400";

            return (
              <div
                key={s.id}
                className="flex flex-col gap-3 rounded-xl border border-ink-200 bg-surface-0 p-4 sm:flex-row sm:items-center"
              >
                {/* Avatar + info */}
                <div className="flex flex-1 items-center gap-3">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-ink-900 text-sm font-bold text-surface-0">
                    {s.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold text-ink-900">{s.name}</p>
                      <span className={cn("rounded px-1.5 py-0.5 text-[10px] font-medium", catColors.bg, catColors.text)}>
                        {s.category}
                      </span>
                    </div>
                    <p className="text-xs text-ink-400">
                      {s.nationalityFlag} {s.nationality} · Year {s.year} · {s.major}
                    </p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {s.skills.slice(0, 3).map((skill) => (
                        <span key={skill} className="rounded-full bg-ink-100 px-2 py-0.5 text-[10px] text-ink-600">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Match + actions */}
                <div className="flex shrink-0 items-center gap-3">
                  <span className={cn("text-sm font-bold", tierColor)}>{score}% {p.matchLabel}</span>
                  <Button variant="outline" size="sm" className="h-7 text-xs" asChild>
                    <Link href={`/employer/student/${s.id}`}>{p.viewProfile}</Link>
                  </Button>
                  <Button variant="primary" size="sm" className="h-7 text-xs" asChild>
                    <Link href="/employer/messages">
                      <MessageSquare className="mr-1 size-3.5" />
                      {p.sendMessage}
                    </Link>
                  </Button>
                  <button
                    onClick={() => remove(s.id)}
                    className="flex size-7 items-center justify-center rounded-md text-ink-400 hover:bg-ink-100 hover:text-error"
                    aria-label={p.remove}
                  >
                    <X className="size-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
