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
  Gauge,
  MessageSquare,
  ShieldCheck,
  Star,
  TrendingUp,
  UserRoundCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { EmployerLogo } from "@/components/brand/EmployerLogo";
import { PrototypeNotice } from "@/components/brand/prototype-notice";
import { PremiumHeroPanel } from "@/components/aurora";
import { DashboardPerformanceSection } from "@/components/student/DashboardPerformanceSection";
import { EmployerFeedbackSummary } from "@/components/student/EmployerFeedbackSummary";
import { ReadinessChecklist } from "@/components/product/readiness-checklist";
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
      accent: "bg-success/10 text-success",
    },
    {
      title: "Review company fit",
      body: "Compare salary bands and hiring signals before your next employer conversation.",
      href: "/student/companies/emp-001",
      cta: "View company",
      icon: CalendarClock,
      accent: "bg-aurora-blue/10 text-aurora-blue",
    },
  ];

  const pipelineStages = [
    { key: "profile_viewed", label: "Viewed" },
    { key: "shortlisted", label: "Shortlisted" },
    { key: "messaged", label: "Messaged" },
    { key: "interview_scheduled", label: "Interview" },
    { key: "offer", label: "Offer" },
  ] as const;
  const readinessItems = [
    { label: "Booth booked", complete: true, detail: "Spring Fair · Booth B-23" },
    { label: "QR badge ready", complete: true, detail: "Demo career pass generated" },
    { label: "Portfolio selected", complete: true, detail: "Chatbot project leads the profile" },
    { label: "Privacy reviewed", complete: true, detail: "Employer preview checked" },
    { label: "2-minute pitch prepared", complete: false, detail: "One rehearsal remains" },
    { label: "Resume attached", complete: true },
    { label: "Company shortlist reviewed", complete: false, detail: "Review two new matches" },
    { label: "Follow-up templates ready", complete: true },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      <PremiumHeroPanel
        eyebrow={`${p.welcomePrefix} ${currentStudent.name.split(" ")[0]}`}
        title="Student career control center"
        body={p.welcomeSuffix}
      >
        <PrototypeNotice
          variant="dark"
          message="Profile views, application stages, feedback, and messages are mock activity for the prototype demo."
          className="max-w-2xl"
        />
      </PremiumHeroPanel>

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

      <section className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]" aria-labelledby="career-readiness-title">
        <Card className="overflow-hidden border-gold-200/80 bg-gradient-to-br from-ink-900 via-ink-900 to-aurora-purple/30 text-surface-0 shadow-xl">
          <CardContent className="grid gap-6 pt-6 sm:grid-cols-[auto_1fr] sm:items-center">
            <div
              className="relative mx-auto flex size-36 items-center justify-center rounded-full"
              style={{
                background: "conic-gradient(var(--accent) 0 86%, rgba(255,255,255,0.1) 86% 100%)",
              }}
              aria-label="Career readiness score 86 out of 100"
            >
              <div className="flex size-[120px] flex-col items-center justify-center rounded-full bg-ink-900">
                <Gauge className="size-5 text-gold-300" aria-hidden="true" />
                <span className="mt-1 text-4xl font-black text-surface-0">86</span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-300">of 100</span>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-300">Career readiness</p>
              <h2 id="career-readiness-title" className="mt-2 text-2xl font-black">Ready to be discovered—with two smart moves left.</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-300">
                Your profile evidence and employer visibility are strong. Rehearse the two-minute pitch and review the newest company matches before event day.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {[
                  { icon: UserRoundCheck, label: "Profile strength", value: `${currentStudent.profileStrength}%` },
                  { icon: ClipboardCheck, label: "Event readiness", value: "75%" },
                  { icon: ShieldCheck, label: "Visible fields", value: "6 of 8" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="rounded-lg border border-white/10 bg-white/[0.06] p-3">
                    <Icon className="size-4 text-gold-300" aria-hidden="true" />
                    <p className="mt-2 text-xl font-black">{value}</p>
                    <p className="text-xs text-ink-300">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        <ReadinessChecklist title="Event readiness checklist" items={readinessItems} />
      </section>

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

      <Card className="overflow-hidden">
        <CardHeader className="border-b border-ink-200 bg-ink-50/80">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-700">Post-event report</p>
              <CardTitle className="mt-1 text-lg">What happened—and what to do next</CardTitle>
            </div>
            <Badge variant="secondary">Mock event analytics</Badge>
          </div>
        </CardHeader>
        <CardContent className="grid gap-5 pt-5 lg:grid-cols-[1fr_1.15fr]">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
            {[
              ["Profile viewers", myVisits.length],
              ["Saved to shortlist", savedCount],
              ["Feedback summaries", visibleFeedback.length],
              ["Messages received", unreadMessages],
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg border border-ink-200 bg-surface-0 p-3">
                <p className="text-2xl font-black text-ink-900">{value}</p>
                <p className="mt-1 text-xs text-ink-500">{label}</p>
              </div>
            ))}
          </div>
          <div>
            <p className="text-sm font-semibold text-ink-900">Best opportunities</p>
            <p className="mt-1 text-sm leading-6 text-ink-600">
              Alibaba Cloud has the clearest interview signal; Bosch China shows strong architecture fit; Siemens China responded positively to service-design evidence.
            </p>
            <ol className="mt-4 grid gap-2">
              {[
                "Reply to the Alibaba Cloud thread within 24 hours.",
                "Add one measurable outcome to the campus navigator project.",
                "Rehearse the five-minute chatbot walkthrough.",
              ].map((action, index) => (
                <li key={action} className="flex gap-3 rounded-lg bg-ink-50 px-3 py-2 text-xs leading-5 text-ink-700">
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-gold-500 text-[10px] font-black text-ink-900">{index + 1}</span>
                  {action}
                </li>
              ))}
            </ol>
          </div>
        </CardContent>
      </Card>

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

      <EmployerFeedbackSummary feedback={visibleFeedback} />

      <Separator />

      <DashboardPerformanceSection />
    </div>
  );
}
