"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageSquare, Eye, Bookmark, Star, TrendingUp } from "lucide-react";

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
              {applicationStatuses.filter((a) => a.studentId === currentStudent.id).map((app, i, arr) => {
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
                      <Button variant="ghost" size="sm" className="h-7 text-xs" asChild>
                        <Link href="/student/messages">{p.sendMessage}</Link>
                      </Button>
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
          {visibleFeedback.slice(0, 3).map((fb) => {
            const employer = getEmployer(fb.employerId);
            if (!employer) return null;
            return (
              <Card key={fb.id}>
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3">
                    <EmployerLogo employer={employer} className="size-9" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-ink-900">{employer.name}</p>
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
