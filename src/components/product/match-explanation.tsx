import { BriefcaseBusiness, CheckCircle2, Languages, MapPin, Puzzle, ShieldQuestion, Target, TrendingUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Employer, Student } from "@/lib/mock-data/types";
import { cn } from "@/lib/utils";

type MatchExplanationProps = {
  score: number;
  student: Student;
  employer: Employer;
  roleTitle?: string;
  compact?: boolean;
  surface?: "card" | "inline";
  className?: string;
};

function normalize(value: string) {
  return value.trim().toLowerCase();
}

export function MatchExplanation({
  score,
  student,
  employer,
  roleTitle,
  compact = false,
  surface = "card",
  className,
}: MatchExplanationProps) {
  const employerSkills = new Set(employer.hiringSkills.map(normalize));
  const skillOverlap = student.skills.filter((skill) => employerSkills.has(normalize(skill)));
  const visibleSkills = skillOverlap.length > 0 ? skillOverlap.slice(0, 4) : student.skills.slice(0, 3);
  const categoryFit = employer.hiringCategories.includes(student.category);
  const hskLabel = student.hsk ? `HSK ${student.hsk}` : "No HSK listed";
  const employerLocation = employer.location.split(",")[0]?.trim() ?? employer.location;
  const locationFit = student.preferredLocations.some((location) =>
    normalize(employer.location).includes(normalize(location)),
  );
  const followUpLikelihood = score >= 85 ? "Strong" : score >= 70 ? "Promising" : "Explore";

  const rows = [
    {
      icon: Target,
      label: "Category fit",
      value: categoryFit
        ? `${student.category} matches ${employer.name}'s hiring focus`
        : `${student.category} is adjacent to ${employer.name}'s current focus`,
    },
    {
      icon: Puzzle,
      label: "Skill overlap",
      value:
        skillOverlap.length > 0
          ? visibleSkills.join(", ")
          : `${visibleSkills.join(", ")} can support adjacent roles`,
    },
    {
      icon: Languages,
      label: "Language fit",
      value: `${student.englishLevel} English · ${hskLabel} Mandarin`,
    },
    {
      icon: CheckCircle2,
      label: "Availability",
      value: `${student.availableFrom} · ${student.lookingFor}`,
    },
    {
      icon: MapPin,
      label: "Location fit",
      value: locationFit
        ? `${employerLocation} appears in the student's preferred locations`
        : `${student.preferredLocations.slice(0, 3).join(", ")} listed as preferences`,
    },
    {
      icon: BriefcaseBusiness,
      label: "Role fit",
      value: roleTitle ?? `${student.lookingFor} opportunities connected to ${student.category}`,
    },
    {
      icon: Target,
      label: "Employer hiring focus",
      value: `${employer.hiringCategories.slice(0, 2).join(", ")} · ${employer.hiringSkills.slice(0, 3).join(", ")}`,
    },
    {
      icon: TrendingUp,
      label: "Follow-up likelihood",
      value: `${followUpLikelihood} prototype signal based on the rule-based score`,
    },
  ];

  const content = (
    <>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold-700">Why this match</p>
            <h3 className={cn("mt-1 font-black text-ink-900", compact ? "text-xl" : "text-3xl")}>
              {score}% match
            </h3>
          </div>
          <Badge variant="gold" className="text-[10px]">
            Rule-based
          </Badge>
        </div>
        {roleTitle ? <p className="mt-2 text-xs font-semibold text-ink-700">Role focus: {roleTitle}</p> : null}
        <div className={cn("mt-3 grid gap-2", compact ? "grid-cols-1" : "sm:grid-cols-2")}>
          {rows.map(({ icon: Icon, label, value }) => (
            <div key={label} className="rounded-lg border border-gold-200/80 bg-surface-0 px-3 py-2">
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-ink-400">
                <Icon className="size-3.5" aria-hidden="true" />
                {label}
              </div>
              <p className="mt-1 text-xs leading-5 text-ink-700">{value}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 flex gap-1.5 text-[11px] leading-5 text-ink-500">
          <ShieldQuestion className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
          Rule-based prototype score, not validated AI recruiting intelligence.
        </p>
    </>
  );

  if (surface === "inline") {
    return (
      <div className={cn("rounded-lg border border-gold-200/80 bg-gold-50/50 p-3", className)}>
        {content}
      </div>
    );
  }

  return (
    <Card className={cn("border-gold-200/80 bg-gold-50/50", className)}>
      <CardContent className={cn(compact ? "pt-3" : "pt-4")}>{content}</CardContent>
    </Card>
  );
}
