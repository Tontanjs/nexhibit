"use client";

import { useState } from "react";
import Link from "next/link";
import { Download, MessageSquare, Tags, UserPlus, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StudentAvatar } from "@/components/brand/StudentAvatar";
import { EmptyShortlist } from "@/components/illustrations/EmptyShortlist";
import { copy } from "@/lib/copy";
import { currentEmployer } from "@/lib/current-employer";
import { getCandidateSignal } from "@/lib/employer-workspace";
import { students } from "@/lib/mock-data";
import { calculateMatchScore, getMatchTier } from "@/lib/utils-lib/matching";
import { getCategoryColors } from "@/lib/utils-lib/colors";
import { cn } from "@/lib/utils";

const p = copy.pages.employer.shortlist;

const SEEDED_SHORTLIST = ["stu-001", "stu-003", "stu-006"];
const filters = ["All", "Strong match", "Interview-ready", "Messaged", "Not contacted"] as const;
type ShortlistFilter = (typeof filters)[number];

export default function ShortlistPage() {
  const [shortlistedIds, setShortlistedIds] = useState<string[]>(SEEDED_SHORTLIST);
  const [activeFilter, setActiveFilter] = useState<ShortlistFilter>("All");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const shortlistedStudents = shortlistedIds
    .map((id) => students.find((s) => s.id === id))
    .filter(Boolean) as (typeof students)[number][];
  const visibleStudents = shortlistedStudents.filter((student) => {
    const signal = getCandidateSignal(student.id);
    if (activeFilter === "All") return true;
    if (activeFilter === "Strong match") return getScore(student.id) >= 88 || signal.status === "Strong match";
    if (activeFilter === "Interview-ready") return signal.status === "Interview-ready" || signal.stage === "Interview";
    if (activeFilter === "Messaged") return signal.stage === "Contacted" || signal.stage === "Interview";
    return signal.stage === "New" || signal.stage === "Viewed";
  });

  function remove(id: string) {
    setShortlistedIds((prev) => prev.filter((x) => x !== id));
    setSelectedIds((prev) => prev.filter((x) => x !== id));
  }

  function toggleSelected(id: string) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((value) => value !== id) : [...prev, id].slice(0, 3),
    );
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
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6 overflow-hidden rounded-xl border border-ink-900 bg-ink-900 p-5 text-surface-0 shadow-2xl shadow-ink-900/10">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-400">Shortlist management</p>
          <h1 className="mt-2 text-2xl font-bold text-surface-0">{p.heading}</h1>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-ink-300">{p.subheading}</p>
        </div>
        {shortlistedStudents.length > 0 && (
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-surface-0/10 px-3 py-1 text-xs text-ink-200">
              {shortlistedStudents.length} {p.studentsCount}
            </span>
            <Button variant="inverse" size="sm" onClick={() => toast.success("Shortlist export prepared.")}>
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
        <>
        <div className="mb-4 rounded-lg border border-ink-200 bg-surface-0 p-3 shadow-sm">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-semibold transition",
                  activeFilter === filter
                    ? "bg-ink-900 text-surface-0"
                    : "bg-ink-100 text-ink-600 hover:bg-ink-200",
                )}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-2 border-t border-ink-100 pt-3">
            {[
              "Send batch message",
              "Invite selected to booth",
              "Move to interview",
              "Add tag",
            ].map((action) => (
              <Button
                key={action}
                variant="outline"
                size="sm"
                className="h-8 text-xs"
                disabled={selectedIds.length === 0}
                onClick={() => toast.success(`${action} prepared for ${selectedIds.length} candidate${selectedIds.length > 1 ? "s" : ""}.`)}
              >
                {action === "Add tag" ? <Tags className="size-3.5" /> : <UserPlus className="size-3.5" />}
                {action}
              </Button>
            ))}
          </div>
        </div>

        {selectedIds.length >= 2 && (
          <div className="mb-4 rounded-xl border border-gold-200 bg-gold-50/70 p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-700">Compare mode</p>
                <h2 className="mt-1 text-base font-semibold text-ink-900">Selected candidates side by side</h2>
              </div>
              <Badge variant="gold">{selectedIds.length}/3</Badge>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {selectedIds.map((id) => {
                const student = students.find((item) => item.id === id);
                if (!student) return null;
                const signal = getCandidateSignal(student.id);
                return (
                  <div key={id} className="rounded-lg bg-surface-0 p-3 ring-1 ring-gold-100">
                    <div className="flex items-center gap-2">
                      <StudentAvatar student={student} className="size-8" />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-ink-900">{student.name}</p>
                        <p className="truncate text-xs text-ink-400">{student.major}</p>
                      </div>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                      <span className="text-ink-400">Match</span><span className="font-semibold text-ink-900">{getScore(student.id)}%</span>
                      <span className="text-ink-400">GPA</span><span className="font-semibold text-ink-900">{student.gpa.toFixed(2)}</span>
                      <span className="text-ink-400">Availability</span><span className="font-semibold text-ink-900">{student.availableFrom}</span>
                      <span className="text-ink-400">Response</span><span className="font-semibold text-ink-900">{signal.responseSpeed}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="space-y-3">
          {visibleStudents.map((s) => {
            const score = getScore(s.id);
            const tier = getMatchTier(score);
            const catColors = getCategoryColors(s.category);
            const signal = getCandidateSignal(s.id);
            const isSelected = selectedIds.includes(s.id);
            const tierColor =
              tier === "Strong"
                ? "text-success"
                : tier === "Good"
                  ? "text-warning"
                  : "text-ink-400";

            return (
              <div
                key={s.id}
                className={cn(
                  "flex flex-col gap-3 rounded-xl border bg-surface-0 p-4 transition sm:flex-row sm:items-center",
                  isSelected ? "border-gold-300 shadow-md shadow-gold-500/10" : "border-ink-200 hover:border-ink-300",
                )}
              >
                {/* Avatar + info */}
                <div className="flex flex-1 items-center gap-3">
                  <button
                    type="button"
                    onClick={() => toggleSelected(s.id)}
                    aria-label={`Compare ${s.name}`}
                    className={cn(
                      "flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-bold transition",
                      isSelected
                        ? "border-gold-500 bg-gold-500 text-ink-900"
                        : "border-ink-200 text-ink-300 hover:border-gold-300 hover:text-gold-600",
                    )}
                  >
                    {isSelected ? "✓" : "+"}
                  </button>
                  <StudentAvatar student={s} className="size-11" />
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
                    <p className="mt-2 line-clamp-1 text-xs text-ink-400">{signal.note}</p>
                  </div>
                </div>

                {/* Match + actions */}
                <div className="flex min-w-0 flex-wrap items-center gap-2 sm:max-w-[430px] sm:justify-end">
                  <Badge variant={signal.status === "Strong match" ? "success" : "outline"} className="text-[10px]">
                    {signal.status}
                  </Badge>
                  <Badge variant="secondary" className="text-[10px]">
                    {signal.stage}
                  </Badge>
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
        </>
      )}
    </div>
  );
}
