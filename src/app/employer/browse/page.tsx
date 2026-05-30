"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Bookmark,
  BookmarkCheck,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  Globe2,
  GraduationCap,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  X,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StudentAvatar } from "@/components/brand/StudentAvatar";
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

function isRecentlyActive(lastActive: string) {
  return lastActive.includes("minute") || lastActive.includes("hour");
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

  const talentStats = useMemo(() => {
    const strongMatches = students.filter((s) => (scoreMap.get(s.id) ?? 0) >= 88).length;
    const countries = new Set(students.map((s) => s.nationality)).size;
    const activeRecently = students.filter((s) => isRecentlyActive(s.lastActive)).length;

    return [
      { label: p.totalProfilesLabel, value: students.length.toString(), detail: p.verifiedProfilesLabel, Icon: Users },
      { label: p.countriesLabel, value: countries.toString(), detail: currentEmployer.location, Icon: Globe2 },
      { label: p.strongMatchesLabel, value: strongMatches.toString(), detail: p.matchLabel, Icon: TrendingUp },
      { label: p.activeRecentlyLabel, value: activeRecently.toString(), detail: p.activeLabel, Icon: Clock3 },
    ];
  }, [scoreMap]);

  function toggleShortlist(id: string) {
    setShortlisted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const hasFilters = category !== "all" || search.trim().length > 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink-900 sm:text-3xl">{p.heading}</h1>
          <p className="mt-1 text-sm text-ink-500">{p.subheading}</p>
        </div>
        <div className="inline-flex w-fit items-center gap-2 rounded-md border border-success/20 bg-success/10 px-3 py-2 text-xs font-semibold text-success">
          <ShieldCheck className="size-4" />
          {p.verifiedBadge}
        </div>
      </div>

      <section className="mb-6 overflow-hidden rounded-lg border border-ink-200 bg-surface-0 shadow-sm">
        <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
          <div className="flex min-h-56 flex-col justify-between bg-ink-900 p-5 text-surface-0 sm:p-6">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-md bg-surface-0/10 px-3 py-1.5 text-xs font-semibold text-gold-400">
                <Sparkles className="size-4" />
                {p.commandEyebrow}
              </div>
              <h2 className="max-w-xl text-2xl font-bold leading-tight sm:text-3xl">{p.commandTitle}</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-surface-0/70">{p.commandBody}</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {currentEmployer.hiringCategories.map((focus) => (
                <span
                  key={focus}
                  className="rounded-md border border-surface-0/20 px-2.5 py-1 text-xs font-medium text-surface-0/80"
                >
                  {focus}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2">
            {talentStats.map(({ label, value, detail, Icon }, index) => (
              <div
                key={label}
                className={cn(
                  "p-4 sm:p-5",
                  index < 2 && "border-b border-ink-200",
                  index % 2 === 0 && "border-r border-ink-200",
                )}
              >
                <div className="mb-3 flex size-9 items-center justify-center rounded-md bg-ink-100 text-ink-700">
                  <Icon className="size-4" />
                </div>
                <p className="text-2xl font-bold text-ink-900">{value}</p>
                <p className="mt-1 text-xs font-semibold text-ink-700">{label}</p>
                <p className="mt-1 truncate text-xs text-ink-400">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mb-5 rounded-lg border border-ink-200 bg-surface-0 p-3 shadow-sm sm:p-4">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink-800">
          <Search className="size-4 text-ink-400" />
          {p.searchPanelTitle}
        </div>
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_180px_190px_auto]">
          <div className="relative min-w-0">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={p.searchPlaceholder}
              className="h-11 pl-9"
            />
          </div>

          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="h-11 w-full">
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

          <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortBy)}>
            <SelectTrigger className="h-11 w-full">
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
              onClick={() => {
                setSearch("");
                setCategory("all");
              }}
              className="h-11 w-full justify-center text-ink-500 hover:text-ink-800 lg:w-auto"
            >
              <X className="size-4" />
              {p.clearFilters}
            </Button>
          )}
        </div>
      </div>

      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-ink-500">
          {p.showingPrefix} <span className="font-semibold text-ink-800">{filtered.length}</span> {p.showingConnector}{" "}
          <span className="font-semibold text-ink-800">{students.length}</span> {p.verifiedProfilesLabel}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {currentEmployer.hiringSkills.slice(0, 4).map((skill) => (
            <Badge key={skill} variant="outline" className="text-[10px] text-ink-500">
              {skill}
            </Badge>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-ink-300 bg-surface-0 py-16 text-center">
          <p className="text-sm font-semibold text-ink-700">{p.noResults}</p>
          <p className="mt-1 text-xs text-ink-400">{p.noResultsHint}</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
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
                  : "text-ink-500";
            const barColor =
              tier === "Strong"
                ? "bg-success"
                : tier === "Good"
                  ? "bg-warning"
                  : "bg-ink-400";
            const facts = [
              { label: p.gpaLabel, value: s.gpa.toFixed(2), Icon: GraduationCap },
              { label: p.hskLabel, value: s.hsk === null ? p.hskNone : s.hsk.toString(), Icon: Globe2 },
              { label: p.availableLabel, value: s.availableFrom, Icon: BriefcaseBusiness },
              { label: p.responseLabel, value: s.responseTime, Icon: Clock3 },
            ];

            return (
              <Card
                key={s.id}
                className="gap-0 overflow-hidden p-0 transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <CardContent className="flex h-full flex-col p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-start gap-3">
                      <div className="relative shrink-0">
                        <StudentAvatar student={s} className="size-12" />
                        <span className="absolute -bottom-0.5 -right-0.5 flex size-5 items-center justify-center rounded-full border-2 border-surface-0 bg-success text-surface-0">
                          <CheckCircle2 className="size-3" />
                        </span>
                      </div>
                      <div className="min-w-0">
                        <div className="flex min-w-0 items-center gap-2">
                          <p className="truncate text-sm font-semibold text-ink-900">{s.name}</p>
                          <span className="shrink-0 text-base leading-none">{s.nationalityFlag}</span>
                        </div>
                        <p className="mt-0.5 truncate text-xs text-ink-500">{s.headline}</p>
                        <p className="mt-1 truncate text-xs text-ink-400">
                          {s.nationality} · {p.yearLabel} {s.year} · {s.major}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleShortlist(s.id)}
                      className="shrink-0 rounded-md p-1.5 text-ink-400 transition hover:bg-ink-100 hover:text-ink-700"
                      aria-label={isShortlisted ? p.removeFromShortlistLabel : p.addToShortlistLabel}
                    >
                      {isShortlisted ? (
                        <BookmarkCheck className="size-4 text-gold-500" />
                      ) : (
                        <Bookmark className="size-4" />
                      )}
                    </button>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {facts.map(({ label, value, Icon }) => (
                      <div key={label} className="min-w-0 rounded-md bg-ink-50 px-2.5 py-2">
                        <div className="flex items-center gap-1.5 text-[10px] font-medium text-ink-400">
                          <Icon className="size-3" />
                          <span className="truncate">{label}</span>
                        </div>
                        <p className="mt-1 truncate text-xs font-semibold text-ink-800">{value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {s.skills.slice(0, 4).map((skill) => (
                      <Badge key={skill} variant="secondary" className="max-w-full text-[10px]">
                        <span className="max-w-32 truncate">{skill}</span>
                      </Badge>
                    ))}
                    {s.skills.length > 4 && (
                      <Badge variant="outline" className="text-[10px] text-ink-400">
                        +{s.skills.length - 4}
                      </Badge>
                    )}
                  </div>

                  <div className="mt-4 rounded-md bg-ink-50 p-3">
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <Badge
                        variant="outline"
                        className={cn("border text-[10px]", catColors.bg, catColors.text, catColors.border)}
                      >
                        {s.category}
                      </Badge>
                      <span className={cn("text-sm font-bold", tierColor)}>
                        {score}% {p.matchLabel}
                      </span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-ink-200">
                      <div className={cn("h-full rounded-full", barColor)} style={{ width: `${score}%` }} />
                    </div>
                  </div>

                  <div className="mt-auto flex gap-2 pt-4">
                    <Button variant="outline" size="sm" className="h-9 flex-1 px-2 text-xs" asChild>
                      <Link href={`/employer/student/${s.id}`}>{p.viewProfile}</Link>
                    </Button>
                    <Button
                      variant={isShortlisted ? "secondary" : "primary"}
                      size="sm"
                      className="h-9 flex-1 px-2 text-xs"
                      onClick={() => toggleShortlist(s.id)}
                    >
                      {isShortlisted ? p.shortlisted : p.shortlist}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
