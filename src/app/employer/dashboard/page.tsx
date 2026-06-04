"use client";

import Link from "next/link";
import {
  ArrowRight,
  Bookmark,
  CalendarClock,
  MessageSquare,
  ScanLine,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StudentAvatar } from "@/components/brand/StudentAvatar";
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

  const pipeline = [
    { label: "New matches", value: 12, tone: "bg-ink-100 text-ink-800" },
    { label: "Reviewed", value: 9, tone: "bg-sky-50 text-sky-700" },
    { label: "Shortlisted", value: SEEDED_SHORTLIST.length, tone: "bg-gold-50 text-gold-700" },
    { label: "Messages", value: employerConvs.length, tone: "bg-indigo-50 text-indigo-700" },
  ];

  const commandCenter = [
    {
      title: "Scan Spring Fair QR badges",
      body: "Use scanner mode at the booth to open verified student profiles instantly.",
      href: "/employer/scanner",
      icon: ScanLine,
    },
    {
      title: "Review top technical matches",
      body: "Start with TypeScript, Python, and bilingual support tooling overlap.",
      href: "/employer/browse",
      icon: Target,
    },
    {
      title: "Schedule follow-ups",
      body: "Turn promising booth conversations into structured post-event interviews.",
      href: "/employer/messages",
      icon: CalendarClock,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Welcome strip */}
      <div className="overflow-hidden rounded-lg border border-surface-0/10 bg-ink-900 px-6 py-5 text-surface-0 shadow-2xl shadow-ink-900/10">
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

      {/* Hiring command center */}
      <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
        <Card className="overflow-hidden border-ink-900 bg-ink-900 text-surface-0">
          <CardContent className="pt-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-400">
                  Live hiring pipeline
                </p>
                <h2 className="mt-1 text-base font-semibold text-surface-0">
                  Reverse fair activity
                </h2>
              </div>
              <Badge variant="gold" className="bg-gold-500 text-ink-900">
                Active
              </Badge>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {pipeline.map((item) => (
                <div key={item.label} className="rounded-lg border border-surface-0/10 bg-surface-0/5 p-3">
                  <p className="text-2xl font-bold text-gold-400">{item.value}</p>
                  <p className="mt-1 text-xs text-ink-300">{item.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardContent className="pt-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-400">
                  Recommended workflow
                </p>
                <h2 className="mt-1 text-base font-semibold text-ink-900">
                  Turn profile signals into conversations
                </h2>
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {commandCenter.map(({ title, body, href, icon: Icon }) => (
                <Link
                  key={title}
                  href={href}
                  className="group rounded-lg border border-ink-200 bg-surface-0 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-gold-300 hover:shadow-md"
                >
                  <span className="mb-3 flex size-9 items-center justify-center rounded-lg bg-gold-50 text-gold-700">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <p className="text-sm font-semibold text-ink-900">{title}</p>
                  <p className="mt-1 min-h-[54px] text-xs leading-5 text-ink-500">{body}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-ink-900">
                    Open
                    <ArrowRight className="size-3.5 transition group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
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
                    <StudentAvatar student={s} className="size-10" />
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
                  <StudentAvatar student={student} className="size-9" />
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
