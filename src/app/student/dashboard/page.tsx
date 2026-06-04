"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  ClipboardCheck,
  Eye,
  Bookmark,
  MessageSquare,
  Star,
  TrendingUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { EmployerLogo } from "@/components/brand/EmployerLogo";
import { copy } from "@/lib/copy";
import { currentStudent } from "@/lib/current-user";
import { employers } from "@/lib/mock-data";
import { visitorStream } from "@/lib/extended-data/visitor-stream";
import { applicationStatuses } from "@/lib/extended-data/application-statuses";
import { employerFeedback } from "@/lib/extended-data/feedback";
import { cn } from "@/lib/utils";

const p = copy.pages.student.dashboard;

type ViewFilter = "All" | "This week" | "This month";

function getEmployer(id: string) {
  return employers.find((e) => e.id === id);
}

const stageMeta: Record<string, { label: string; variant: "secondary" | "gold" | "success" | "destructive" }> = {
  profile_viewed: { label: "Profile viewed", variant: "secondary" },
  shortlisted: { label: "Shortlisted", variant: "gold" },
  messaged: { label: "In conversation", variant: "secondary" },
  interview_scheduled: { label: "Interview scheduled", variant: "success" },
  offer: { label: "Offer received", variant: "success" },
  declined: { label: "Declined", variant: "destructive" },
};

export default function DashboardPage() {
  const [viewFilter, setViewFilter] = useState<ViewFilter>("All");

  const myVisits = visitorStream.filter((v) => v.studentId === currentStudent.id);
  const savedCount = myVisits.filter((v) => v.status === "saved" || v.status === "left_feedback" || v.status === "messaged").length;
  const unreadMessages = 2;
  const visibleFeedback = employerFeedback.filter((f) => f.studentId === currentStudent.id && f.visibleToStudent);
  const myApplications = applicationStatuses.filter((a) => a.studentId === currentStudent.id);

  const nextActions = [
    {
      title: "Reply to Alibaba Cloud",
      body: "Confirm the debugging exercise context and bring one product decision changed after feedback.",
      href: "/student/messages",
      cta: "Open message",
      icon: MessageSquare,
      accent: "bg-gold-50 text-gold-700",
    },
    {
      title: "Prepare booth evidence",
      body: "Keep the chatbot test notes, QR badge, and architecture diagram ready for Spring Fair check-in.",
      href: "/student/event-day",
      cta: "Open event day",
      icon: ClipboardCheck,
      accent: "bg-emerald-50 text-emerald-700",
    },
    {
      title: "Review company fit",
      body: "Compare salary bands and hiring signals before your next employer conversation.",
      href: "/student/companies/emp-001",
      cta: "View company",
      icon: CalendarClock,
      accent: "bg-indigo-50 text-indigo-700",
    },
  ];

  const pipelineStages = [
    { key: "profile_viewed", label: "Viewed" },
    { key: "shortlisted", label: "Shortlisted" },
    { key: "messaged", label: "Messaged" },
    { key: "interview_scheduled", label: "Interview" },
    { key: "offer", label: "Offer" },
  ] as const;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Welcome strip */}
      <div className="overflow-hidden rounded-lg border border-surface-0/10 bg-ink-900 px-6 py-5 text-surface-0 shadow-2xl shadow-ink-900/10">
        <p className="text-base font-medium text-ink-300">{p.welcomePrefix} {currentStudent.name.split(" ")[0]},</p>
        <p className="text-lg font-semibold text-surface-0">{p.welcomeSuffix}</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { icon: Eye, label: p.profileViewsLabel, value: myVisits.length, trend: p.thisWeekTrend, color: "text-ink-700" },
          { icon: Bookmark, label: p.savedLabel, value: savedCount, trend: null, color: "text-gold-600" },
          { icon: MessageSquare, label: p.messagesLabel, value: unreadMessages, trend: null, color: "text-ink-700" },
          { icon: Star, label: p.feedbackReceivedLabel, value: visibleFeedback.length, trend: null, color: "text-success" },
        ].map(({ icon: Icon, label, value, trend, color }) => (
          <Card key={label}>
            <CardContent className="pt-5">
              <Icon className={cn("size-5 mb-2", color)} />
              <p className="text-2xl font-bold text-ink-900">{value}</p>
              <p className="text-xs text-ink-500">{label}</p>
              {trend && (
                <div className="mt-1.5 flex items-center gap-1 text-xs text-success">
                  <TrendingUp className="size-3" />
                  {trend}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Demo guidance */}
      <div className="grid gap-4 lg:grid-cols-[1.35fr_0.85fr]">
        <Card className="overflow-hidden border-gold-200/80 bg-gradient-to-br from-gold-50 via-surface-0 to-surface-0">
          <CardContent className="pt-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-700">
                  Next best actions
                </p>
                <h2 className="mt-1 text-base font-semibold text-ink-900">
                  What to do before the fair floor opens
                </h2>
              </div>
              <Badge variant="gold" className="hidden text-xs sm:inline-flex">
                Demo-ready
              </Badge>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {nextActions.map(({ title, body, href, cta, icon: Icon, accent }) => (
                <Link
                  key={title}
                  href={href}
                  className="group rounded-lg border border-ink-200 bg-surface-0 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-gold-300 hover:shadow-md"
                >
                  <span className={cn("mb-3 flex size-9 items-center justify-center rounded-lg", accent)}>
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <p className="text-sm font-semibold text-ink-900">{title}</p>
                  <p className="mt-1 min-h-[54px] text-xs leading-5 text-ink-500">{body}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-ink-900">
                    {cta}
                    <ArrowRight className="size-3.5 transition group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardContent className="pt-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-400">
                  Pipeline snapshot
                </p>
                <h2 className="mt-1 text-base font-semibold text-ink-900">
                  Employer interest is moving
                </h2>
              </div>
              <CheckCircle2 className="size-5 text-success" aria-hidden="true" />
            </div>
            <div className="mt-5 space-y-3">
              {pipelineStages.map((stage) => {
                const count = myApplications.filter((app) => app.stage === stage.key).length;
                const width = `${Math.max(count * 22, count ? 18 : 6)}%`;
                return (
                  <div key={stage.key}>
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="font-medium text-ink-700">{stage.label}</span>
                      <span className="text-ink-400">{count}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-ink-100">
                      <div className="h-full rounded-full bg-gold-500" style={{ width }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Who viewed your profile */}
      <div>
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-base font-semibold text-ink-900">{p.viewersTitle} (last 30 days)</h2>
          <div className="flex gap-1">
            {(["All", "This week", "This month"] as ViewFilter[]).map((f) => (
              <button
                key={f}
                onClick={() => setViewFilter(f)}
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                  viewFilter === f
                    ? "bg-ink-900 text-surface-0"
                    : "bg-ink-100 text-ink-600 hover:bg-ink-200",
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          {myVisits.map((visit) => {
            const employer = getEmployer(visit.employerId);
            if (!employer) return null;
            const statusLabel =
              visit.status === "saved" ? "Saved to shortlist"
              : visit.status === "left_feedback" ? "Sent feedback"
              : visit.status === "messaged" ? "Sent message"
              : "Viewed profile";
            const variant =
              visit.status === "saved" || visit.status === "left_feedback" ? "gold" : "secondary";
            return (
              <div key={visit.id} className="flex items-center justify-between gap-3 rounded-lg border border-ink-200 px-4 py-3 hover:bg-ink-50 transition-colors">
                <div className="flex items-center gap-3">
                  <EmployerLogo employer={employer} />
                  <div>
                    <p className="text-sm font-semibold text-ink-900">{employer.name}</p>
                    <p className="text-xs text-ink-400">{employer.industry} · Viewed {visit.visitedAt}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 sm:flex-row sm:items-center">
                  <Badge variant={variant} className="text-xs whitespace-nowrap">{statusLabel}</Badge>
                  <div className="flex gap-1.5">
                    <Button variant="ghost" size="sm" className="h-7 text-xs" asChild>
                      <Link href={`/student/companies/${employer.id}`}>{p.viewCompany}</Link>
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 text-xs" asChild>
                      <Link href="/student/messages">{p.sendMessage}</Link>
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Separator />

      {/* Application status */}
      <div>
        <h2 className="mb-4 text-base font-semibold text-ink-900">{p.applicationTitle}</h2>
        <div className="overflow-x-auto rounded-lg border border-ink-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink-200 bg-ink-50 text-left">
                <th className="px-4 py-3 font-semibold text-ink-600">Employer</th>
                <th className="px-4 py-3 font-semibold text-ink-600">Stage</th>
                <th className="hidden px-4 py-3 font-semibold text-ink-600 sm:table-cell">Last update</th>
                <th className="px-4 py-3 font-semibold text-ink-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {myApplications.map((app, i, arr) => {
                const employer = getEmployer(app.employerId);
                if (!employer) return null;
                const meta = stageMeta[app.stage] ?? stageMeta.profile_viewed;
                return (
                  <tr key={app.id} className={cn("transition-colors hover:bg-ink-50", i < arr.length - 1 && "border-b border-ink-200")}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <EmployerLogo employer={employer} className="size-8 rounded-md" />
                        <span className="font-medium text-ink-900 truncate max-w-[120px]">{employer.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={meta.variant} className="text-xs whitespace-nowrap">{meta.label}</Badge>
                    </td>
                    <td className="hidden px-4 py-3 text-ink-400 sm:table-cell">{app.lastUpdate}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1.5">
                        <Button variant="ghost" size="sm" className="h-7 text-xs" asChild>
                          <Link href={`/student/companies/${employer.id}`}>{p.viewCompany}</Link>
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 text-xs" asChild>
                          <Link href="/student/messages">{p.sendMessage}</Link>
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <Separator />

      {/* Recent feedback */}
      <div>
        <h2 className="mb-4 text-base font-semibold text-ink-900">{p.feedbackTitle}</h2>
        <div className="space-y-3">
          {visibleFeedback.map((fb) => {
            const employer = getEmployer(fb.employerId);
            if (!employer) return null;
            return (
              <Card key={fb.id}>
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3">
                    <Link href={`/student/companies/${employer.id}`} aria-label={`View ${employer.name}`}>
                      <EmployerLogo employer={employer} className="size-9 transition hover:scale-105" />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <Link href={`/student/companies/${employer.id}`} className="text-sm font-semibold text-ink-900 hover:text-gold-700">
                          {employer.name}
                        </Link>
                        <div className="flex shrink-0 gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={cn("size-3.5", i < fb.rating ? "fill-gold-500 text-gold-500" : "text-ink-200")} />
                          ))}
                        </div>
                      </div>
                      <p className="mt-1.5 text-sm italic text-ink-600">&ldquo;{fb.text}&rdquo;</p>
                      <p className="mt-1 text-xs text-ink-400">{fb.timestamp}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
