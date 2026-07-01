"use client";

import Link from "next/link";
import { toast } from "sonner";
import {
  ArrowRight,
  BadgeCheck,
  Bookmark,
  CalendarClock,
  FileDown,
  Hourglass,
  MessageSquare,
  ScanLine,
  Target,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CandidatePipelineBoard } from "@/components/employer/CandidatePipelineBoard";
import { EmployerMetricCard } from "@/components/employer/EmployerMetricCard";
import { CompanyMockDisclaimer, PrototypeNotice } from "@/components/brand/prototype-notice";
import { PremiumHeroPanel } from "@/components/aurora";
import { MatchExplanation } from "@/components/product/match-explanation";
import { EmployerLogo } from "@/components/brand/EmployerLogo";
import { StudentAvatar } from "@/components/brand/StudentAvatar";
import { copy } from "@/lib/copy";
import { currentEmployer } from "@/lib/current-employer";
import { boothReadiness, employerRoles, recruiterActivity } from "@/lib/employer-workspace";
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
    studentGpa: s.gpa,
    studentPreferredLocations: s.preferredLocations,
    employerLocation: currentEmployer.location,
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

  const commandCenter = [
    {
      title: "Scan Spring Fair QR badges",
      body: "Use simulated scanner mode at the booth to open consent-aware demo profiles instantly.",
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

  const metrics = [
    {
      icon: Users,
      label: p.browsedLabel,
      value: students.length,
      detail: "Portfolio-ready demo profiles visible to your team.",
      tone: "ink" as const,
    },
    {
      icon: Bookmark,
      label: p.shortlistedLabel,
      value: SEEDED_SHORTLIST.length,
      detail: "Candidates saved for role review and event follow-up.",
      tone: "gold" as const,
    },
    {
      icon: MessageSquare,
      label: p.messagesLabel,
      value: employerConvs.reduce((n, c) => n + c.unreadCount, 0),
      detail: "Unread replies requiring recruiter attention.",
      tone: "sky" as const,
    },
    {
      icon: CalendarClock,
      label: "Interview invitations",
      value: 3,
      detail: "Mock interview invites prepared for this cohort.",
      tone: "success" as const,
    },
    {
      icon: BadgeCheck,
      label: "Booth slots booked",
      value: `${boothReadiness.bookedSlots}/${boothReadiness.totalSlots}`,
      detail: `${boothReadiness.eventName} · Booth ${boothReadiness.boothNumber}`,
      tone: "gold" as const,
    },
    {
      icon: ScanLine,
      label: "Event leads",
      value: boothReadiness.checkedIn,
      detail: "Students checked in through the scanner flow.",
      tone: "success" as const,
    },
    {
      icon: Hourglass,
      label: "Response pending",
      value: 2,
      detail: "Students waiting for a recruiter reply.",
      tone: "violet" as const,
    },
    {
      icon: TrendingUp,
      label: "Strong matches",
      value: topStudents.filter((student) => student.score >= 88).length,
      detail: "High-confidence role fit from portfolio evidence.",
      tone: "success" as const,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      <PremiumHeroPanel
        eyebrow={`${p.welcomePrefix} ${currentEmployer.name}`}
        title="Recruiting command center"
        body={p.welcomeSuffix}
      >
        <PrototypeNotice
          variant="dark"
          message="Recruiting metrics, booth actions, exports, and recommendations are prototype/demo behavior."
          className="max-w-2xl"
        />
      </PremiumHeroPanel>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {metrics.map((metric) => (
          <EmployerMetricCard key={metric.label} {...metric} />
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
                  Event readiness
                </h2>
              </div>
              <Badge variant="gold" className="bg-gold-500 text-ink-900">
                {boothReadiness.qrStatus}
              </Badge>
            </div>
            <div className="mt-5 space-y-3">
              {[
                ["Event", boothReadiness.eventName],
                ["Booth", `${boothReadiness.boothNumber} · ${boothReadiness.hall}`],
                ["Recruiters", boothReadiness.recruiters.join(", ")],
                ["Current slot", boothReadiness.currentSlot],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg border border-surface-0/10 bg-surface-0/5 px-3 py-2">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink-400">{label}</p>
                  <p className="mt-1 text-sm font-semibold text-surface-0">{value}</p>
                </div>
              ))}
              <div className="flex gap-2 pt-1">
                <Button variant="inverse" size="sm" className="h-9 flex-1 text-xs" asChild>
                  <Link href="/employer/scanner">Open scanner</Link>
                </Button>
                <Button
                  type="button"
                  variant="inverse"
                  size="sm"
                  className="h-9 flex-1 text-xs"
                  onClick={() => toast.success("Demo lead export prepared.")}
                >
                  <FileDown className="size-3.5" />
                  Export leads
                </Button>
              </div>
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

      <CandidatePipelineBoard />

      {/* Company profile and booth management */}
      <Card className="overflow-hidden">
        <CardContent className="pt-5">
          <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
            <div className="rounded-xl border border-ink-200 bg-surface-0 p-4">
              <div className="flex items-start gap-3">
                <EmployerLogo employer={currentEmployer} className="size-12 rounded-xl" />
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-base font-semibold text-ink-900">{currentEmployer.name}</h2>
                    <Badge variant="success" className="text-[10px]">Employer review demo</Badge>
                  </div>
                  <p className="mt-1 text-sm text-ink-500">{currentEmployer.industry} · {currentEmployer.size}</p>
                  <CompanyMockDisclaimer className="mt-1 text-[11px]" />
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-ink-600">{currentEmployer.description}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {currentEmployer.hiringCategories.map((category) => (
                  <Badge key={category} variant="outline" className="text-[10px]">
                    {category}
                  </Badge>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={() => toast.success("Company profile preview opened in mock mode.")}>
                  Company profile
                </Button>
                <Button variant="outline" size="sm" onClick={() => toast.success("Recruiter contact update saved locally.")}>
                  Recruiter contacts
                </Button>
              </div>
            </div>

            <div className="rounded-xl border border-gold-200 bg-gold-50/60 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-700">
                    Booth management
                  </p>
                  <h2 className="mt-1 text-base font-semibold text-ink-900">
                    Booth {boothReadiness.boothNumber}
                  </h2>
                </div>
                <Badge variant="gold">{boothReadiness.qrStatus}</Badge>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {[
                  ["Booked slots", `${boothReadiness.bookedSlots}/${boothReadiness.totalSlots}`],
                  ["Checked in", String(boothReadiness.checkedIn)],
                  ["Follow-ups", String(boothReadiness.followUpsQueued)],
                  ["Recruiters", String(boothReadiness.recruiters.length)],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-lg bg-surface-0 p-3 ring-1 ring-gold-100">
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink-400">{label}</p>
                    <p className="mt-1 text-lg font-bold text-ink-900">{value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {["Prepare booth", "Download booth QR", "View booth schedule", "Export event leads"].map((action) => (
                  <Button
                    key={action}
                    variant={action === "Prepare booth" ? "primary" : "outline"}
                    size="sm"
                    className="text-xs"
                    onClick={() => toast.success(`${action} prepared for this demo.`)}
                  >
                    {action}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Roles and activity */}
      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="overflow-hidden">
          <CardContent className="pt-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-400">
                  Role briefs
                </p>
                <h2 className="mt-1 text-base font-semibold text-ink-900">
                  Hiring roles driving match explanations
                </h2>
              </div>
              <Badge variant="outline">{employerRoles.length} roles</Badge>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {employerRoles.slice(0, 4).map((role) => (
                <div key={role.id} className="rounded-lg border border-ink-200 bg-ink-50/50 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-ink-900">{role.title}</p>
                      <p className="mt-1 text-xs text-ink-500">{role.department}</p>
                    </div>
                    <Badge variant="gold" className="text-[10px]">
                      {role.type}
                    </Badge>
                  </div>
                  <p className="mt-3 text-xs leading-5 text-ink-500">{role.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {role.requiredSkills.slice(0, 3).map((skill) => (
                      <span key={skill} className="rounded-full bg-surface-0 px-2 py-0.5 text-[10px] font-medium text-ink-600 ring-1 ring-ink-100">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <p className="mt-3 text-xs font-semibold text-ink-700">{role.salaryRange}</p>
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
                  Recruiter activity
                </p>
                <h2 className="mt-1 text-base font-semibold text-ink-900">Recent team actions</h2>
              </div>
              <UserCheck className="size-5 text-success" aria-hidden="true" />
            </div>
            <div className="space-y-3">
              {recruiterActivity.map((activity) => (
                <div key={activity.id} className="rounded-lg border border-ink-200 bg-surface-0 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <Badge variant="secondary" className="text-[10px]">
                      {activity.type}
                    </Badge>
                    <span className="text-[11px] text-ink-400">{activity.timestamp}</span>
                  </div>
                  <p className="mt-2 text-sm leading-5 text-ink-700">{activity.text}</p>
                </div>
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
                  <MatchExplanation
                    score={s.score}
                    student={s}
                    employer={currentEmployer}
                    compact
                    surface="inline"
                    className="mt-3"
                  />
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
