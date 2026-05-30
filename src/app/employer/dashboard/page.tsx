"use client";

import Link from "next/link";
import { Users, Bookmark, MessageSquare, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { copy } from "@/lib/copy";
import { currentEmployer } from "@/lib/current-employer";
import { students } from "@/lib/mock-data";
import { conversations } from "@/lib/extended-data/conversations";
import { calculateMatchScore, getMatchTier } from "@/lib/utils-lib/matching";
import { getCategoryColors } from "@/lib/utils-lib/colors";
import { cn } from "@/lib/utils";

const p = copy.pages.employer.dashboard;

const SEEDED_SHORTLIST = ["stu-001", "stu-003", "stu-006"];

function matchFor(studentId: string) {
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

export default function EmployerDashboardPage() {
  const employerConvs = conversations.filter(
    (c) => c.participantEmployerId === currentEmployer.id,
  );

  const topStudents = [...students]
    .map((s) => ({ ...s, score: matchFor(s.id) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Welcome strip */}
      <div className="rounded-xl bg-gradient-to-r from-ink-900 to-ink-700 px-6 py-5 text-surface-0">
        <p className="text-base font-medium text-ink-300">
          {p.welcomePrefix} {currentEmployer.name},
        </p>
        <p className="text-lg font-semibold text-surface-0">{p.welcomeSuffix}</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {[
          { icon: Users, label: p.browsedLabel, value: students.length, color: "text-ink-700" },
          {
            icon: Bookmark,
            label: p.shortlistedLabel,
            value: SEEDED_SHORTLIST.length,
            color: "text-gold-600",
          },
          {
            icon: MessageSquare,
            label: p.messagesLabel,
            value: employerConvs.reduce((n, c) => n + c.unreadCount, 0),
            color: "text-ink-700",
          },
        ].map(({ icon: Icon, label, value, color }) => (
          <Card key={label}>
            <CardContent className="pt-5">
              <Icon className={cn("size-5 mb-2", color)} />
              <p className="text-2xl font-bold text-ink-900">{value}</p>
              <p className="text-xs text-ink-500">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recommended students */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-ink-900">{p.recommendedTitle}</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/employer/browse">{p.viewAllStudents}</Link>
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {topStudents.map((s) => {
            const tier = getMatchTier(s.score);
            const catColors = getCategoryColors(s.category);
            const tierColor =
              tier === "Strong"
                ? "text-success"
                : tier === "Good"
                  ? "text-warning"
                  : "text-ink-400";
            return (
              <Card key={s.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-ink-900 text-sm font-bold text-surface-0">
                      {s.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-ink-900">{s.name}</p>
                      <p className="text-xs text-ink-400">
                        {s.nationalityFlag} {s.nationality} · Year {s.year}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className={cn("text-xs font-semibold", catColors.text, catColors.bg, "rounded px-1.5 py-0.5")}>
                      {s.category}
                    </span>
                    <span className={cn("text-sm font-bold", tierColor)}>
                      {s.score}% {p.matchLabel}
                    </span>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 text-xs h-7" asChild>
                      <Link href={`/employer/student/${s.id}`}>{copy.pages.employer.browse.viewProfile}</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent conversations */}
      {employerConvs.length > 0 && (
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-ink-900">{p.recentActivityTitle}</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/employer/messages">{copy.pages.employer.messages.heading}</Link>
            </Button>
          </div>
          <div className="space-y-2">
            {employerConvs.map((conv) => {
              const student = students.find((s) => s.id === conv.participantStudentId);
              if (!student) return null;
              const lastMsg = conv.messages[conv.messages.length - 1];
              return (
                <Link
                  key={conv.id}
                  href="/employer/messages"
                  className="flex items-center gap-3 rounded-lg border border-ink-200 px-4 py-3 hover:bg-ink-50 transition-colors"
                >
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-ink-900 text-xs font-bold text-surface-0">
                    {student.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-ink-900">{student.name}</p>
                      {conv.unreadCount > 0 && (
                        <span className="flex size-4 items-center justify-center rounded-full bg-gold-500 text-[10px] font-bold text-ink-900">
                          {conv.unreadCount}
                        </span>
                      )}
                    </div>
                    <p className="line-clamp-1 text-xs text-ink-400">{lastMsg?.text}</p>
                  </div>
                  <TrendingUp className="size-4 shrink-0 text-ink-300" />
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
