"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, X, Bookmark, BookmarkCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { copy } from "@/lib/copy";
import { currentEmployer } from "@/lib/current-employer";
import { students } from "@/lib/mock-data";
import { calculateMatchScore, getMatchTier } from "@/lib/utils-lib/matching";
import { filterStudents, sortStudents } from "@/lib/utils-lib/filters";
import { getCategoryColors } from "@/lib/utils-lib/colors";
import { STUDENT_BROWSE_FILTERS } from "@/lib/config/filters";
import { cn } from "@/lib/utils";

const p = copy.pages.employer.browse;

const SEEDED_SHORTLIST = new Set(["stu-001", "stu-003", "stu-006"]);

type SortBy = "match_desc" | "match_asc" | "name_asc" | "newest" | "gpa_desc" | "year_desc";

function calcScore(studentId: string) {
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

export default function BrowsePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState<SortBy>("match_desc");
  const [shortlisted, setShortlisted] = useState<Set<string>>(SEEDED_SHORTLIST);
  const scoreMap = useMemo(() => {
    const map = new Map<string, number>();
    for (const s of students) map.set(s.id, calcScore(s.id));
    return map;
  }, []);

  const filtered = useMemo(() => {
    const base = filterStudents(students, {
      searchQuery: search,
      categories: category !== "all" ? [category] : undefined,
    });
    return sortStudents(base, sortBy, scoreMap);
  }, [search, category, sortBy, scoreMap]);

  function toggleShortlist(id: string) {
    setShortlisted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const hasFilters = category !== "all" || search.length > 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-ink-900">{p.heading}</h1>
        <p className="mt-1 text-sm text-ink-500">{p.subheading}</p>
      </div>

      {/* Controls row */}
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-400" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={p.searchPlaceholder}
            className="pl-9"
          />
        </div>

        {/* Category filter */}
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder={p.filterCategory} />
          </SelectTrigger>
          <SelectContent>
            {STUDENT_BROWSE_FILTERS.categories.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Sort */}
        <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortBy)}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder={p.sortLabel} />
          </SelectTrigger>
          <SelectContent>
            {STUDENT_BROWSE_FILTERS.sortOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => { setSearch(""); setCategory("all"); }}
            className="text-ink-400 hover:text-ink-700"
          >
            <X className="mr-1 size-3.5" />
            {p.clearFilters}
          </Button>
        )}
      </div>

      {/* Result count */}
      <p className="mb-4 text-xs text-ink-400">
        {filtered.length} {p.studentsFound}
      </p>

      {/* Student grid */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-sm font-semibold text-ink-700">{p.noResults}</p>
          <p className="mt-1 text-xs text-ink-400">{p.noResultsHint}</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s) => {
            const score = scoreMap.get(s.id) ?? 0;
            const tier = getMatchTier(score);
            const catColors = getCategoryColors(s.category);
            const isShortlisted = shortlisted.has(s.id);
            const tierColor =
              tier === "Strong"
                ? "text-success"
                : tier === "Good"
                  ? "text-warning"
                  : "text-ink-400";

            return (
              <div
                key={s.id}
                className="flex flex-col rounded-xl border border-ink-200 bg-surface-0 p-4 hover:shadow-md transition-shadow"
              >
                {/* Top row */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-ink-900 text-sm font-bold text-surface-0">
                      {s.initials}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-ink-900">{s.name}</p>
                      <p className="text-xs text-ink-400">
                        {s.nationalityFlag} · Year {s.year} · {s.major}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleShortlist(s.id)}
                    className="shrink-0 rounded-md p-1 text-ink-400 hover:bg-ink-100 hover:text-ink-700"
                    aria-label={isShortlisted ? "Remove from shortlist" : "Add to shortlist"}
                  >
                    {isShortlisted ? (
                      <BookmarkCheck className="size-4 text-gold-500" />
                    ) : (
                      <Bookmark className="size-4" />
                    )}
                  </button>
                </div>

                {/* Skills */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {s.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-ink-100 px-2 py-0.5 text-[10px] font-medium text-ink-600"
                    >
                      {skill}
                    </span>
                  ))}
                  {s.skills.length > 3 && (
                    <span className="rounded-full bg-ink-100 px-2 py-0.5 text-[10px] font-medium text-ink-400">
                      +{s.skills.length - 3}
                    </span>
                  )}
                </div>

                {/* Footer row */}
                <div className="mt-3 flex items-center justify-between">
                  <span className={cn("rounded px-1.5 py-0.5 text-[10px] font-medium", catColors.bg, catColors.text)}>
                    {s.category}
                  </span>
                  <span className={cn("text-xs font-bold", tierColor)}>
                    {score}% {p.matchLabel}
                  </span>
                </div>

                <div className="mt-3 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 h-7 text-xs" asChild>
                    <Link href={`/employer/student/${s.id}`}>{p.viewProfile}</Link>
                  </Button>
                  <Button
                    variant={isShortlisted ? "secondary" : "primary"}
                    size="sm"
                    className="flex-1 h-7 text-xs"
                    onClick={() => toggleShortlist(s.id)}
                  >
                    {isShortlisted ? p.shortlisted : p.shortlist}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
