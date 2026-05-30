"use client";

import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { QRBadge } from "@/components/icons";
import { FloorPlan } from "@/components/icons";
import { copy } from "@/lib/copy";
import { currentStudent } from "@/lib/current-user";
import { visitorStream } from "@/lib/extended-data/visitor-stream";
import { employers } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const p = copy.pages.student.eventDay;

const BOOTH = "B-23";
const SLOT_TIME = "13:00 – 13:20";

const statusConfig: Record<string, { label: string; variant: "success" | "gold" | "secondary" | "default" }> = {
  viewing: { label: "Viewing now", variant: "success" },
  viewed: { label: "Viewed profile", variant: "secondary" },
  saved: { label: "Saved to shortlist", variant: "gold" },
  left_feedback: { label: "Left feedback", variant: "gold" },
  messaged: { label: "Sent message", variant: "success" },
};

function getEmployer(id: string) {
  return employers.find((e) => e.id === id);
}

export default function EventDayPage() {
  const [qrOpen, setQrOpen] = useState(false);
  const [countdown] = useState("12:34");

  const myVisits = visitorStream.filter((v) => v.studentId === currentStudent.id);
  const savedCount = myVisits.filter((v) => v.status === "saved").length;
  const feedbackCount = myVisits.filter((v) => v.status === "left_feedback").length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Live status bar */}
      <div className="mb-6 flex flex-col gap-2 rounded-xl bg-ink-900 px-5 py-4 text-surface-0 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <span className="relative flex size-3">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-75" />
            <span className="relative inline-flex size-3 rounded-full bg-success" />
          </span>
          <span className="text-sm font-semibold">{p.liveLabel}</span>
        </div>
        <div className="text-sm text-ink-300">
          {p.slotEndsLabel} <span className="font-mono font-bold text-gold-400">{countdown}</span>
        </div>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        {/* Left — main content */}
        <div className="min-w-0 flex-1 space-y-6">
          {/* Booth info */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">{p.boothCardTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-5xl font-black text-ink-900">{BOOTH}</p>
                  <p className="mt-1 text-sm font-medium text-ink-600">{p.locationLabel}</p>
                  <Badge variant="gold" className="mt-2">{SLOT_TIME}</Badge>
                </div>
                <div className="h-32 w-48 overflow-hidden rounded-lg bg-ink-50 sm:h-36 sm:w-56">
                  <FloorPlan
                    highlightedBooth={BOOTH}
                    numbering="global"
                    className="h-full w-full"
                    preserveAspectRatio="xMidYMid meet"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick actions */}
          <div>
            <h2 className="mb-3 text-sm font-semibold text-ink-700">{p.quickActionsTitle}</h2>
            <div className="grid gap-3 sm:grid-cols-3">
              <button
                onClick={() => setQrOpen(true)}
                className="flex min-h-[80px] flex-col items-center justify-center gap-2 rounded-xl border-2 border-gold-400 bg-gold-50 text-ink-900 transition-colors hover:bg-gold-100"
              >
                <span className="text-2xl">📲</span>
                <span className="text-sm font-semibold">{p.showQrLabel}</span>
              </button>
              <Link
                href="/student/profile"
                className="flex min-h-[80px] flex-col items-center justify-center gap-2 rounded-xl border border-ink-200 bg-surface-0 text-ink-700 transition-colors hover:border-ink-300 hover:bg-ink-50"
              >
                <span className="text-2xl">📁</span>
                <span className="text-sm font-medium">{p.openPortfolioLabel}</span>
              </Link>
              <button className="flex min-h-[80px] flex-col items-center justify-center gap-2 rounded-xl border border-ink-200 bg-surface-0 text-ink-700 transition-colors hover:border-ink-300 hover:bg-ink-50">
                <span className="text-2xl">⏸️</span>
                <span className="text-sm font-medium">{p.requestBreakLabel}</span>
              </button>
            </div>
          </div>

          {/* Visitor stream */}
          <div>
            <h2 className="mb-3 text-sm font-semibold text-ink-700">{p.visitorStreamTitle}</h2>
            <div className="space-y-2">
              {myVisits.map((visit) => {
                const employer = getEmployer(visit.employerId);
                if (!employer) return null;
                const status = statusConfig[visit.status] ?? statusConfig.viewed;
                return (
                  <div
                    key={visit.id}
                    className="flex items-center justify-between gap-3 rounded-lg border border-ink-200 bg-surface-0 px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="flex size-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white"
                        style={{ backgroundColor: employer.logoColor }}
                      >
                        {employer.logoLetter}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-ink-900">{employer.name}</p>
                        <p className="text-xs text-ink-400">{visit.visitedAt}</p>
                      </div>
                    </div>
                    <Badge variant={status.variant} className="shrink-0 text-xs">
                      {status.label}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <aside className="w-full shrink-0 space-y-4 lg:sticky lg:top-[145px] lg:w-[280px]">
          {/* QR badge card */}
          <Card className="border-2 border-gold-400">
            <CardContent className="flex flex-col items-center pt-5">
              <QRBadge
                studentId={currentStudent.id}
                boothNumber={BOOTH}
                verifiedCaption={copy.status.verified}
                className="h-44 w-36"
              />
              <p className="mt-3 text-center text-xs text-ink-500">{p.qrInstruction}</p>
              <div className="mt-2 text-center">
                <p className="text-xs font-bold text-ink-900">Booth {BOOTH}</p>
                <p className="text-xs text-ink-400">{SLOT_TIME}</p>
              </div>
            </CardContent>
          </Card>

          {/* Live stats */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">{p.sessionStatsTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { value: myVisits.length, label: p.visitorsLabel, color: "text-ink-900" },
                  { value: savedCount, label: p.shortlistedLabel, color: "text-gold-600" },
                  { value: feedbackCount, label: p.feedbackLabel, color: "text-success" },
                ].map(({ value, label, color }) => (
                  <div key={label} className="flex items-baseline gap-2">
                    <span className={cn("text-2xl font-bold", color)}>{value}</span>
                    <span className="text-xs text-ink-500">{label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>

      {/* QR Dialog */}
      <Dialog open={qrOpen} onOpenChange={setQrOpen}>
        <DialogContent className="flex flex-col items-center sm:max-w-sm">
          <DialogHeader className="w-full">
            <DialogTitle className="text-center">{p.qrDialogTitle}</DialogTitle>
            <DialogDescription className="sr-only">Your event QR badge to show employers</DialogDescription>
          </DialogHeader>
          <QRBadge
            studentId={currentStudent.id}
            boothNumber={BOOTH}
            verifiedCaption={copy.status.verified}
            className="h-64 w-52"
          />
          <div className="text-center">
            <p className="text-sm font-semibold text-ink-900">{currentStudent.name}</p>
            <p className="text-xs text-ink-500">Booth {BOOTH} · {SLOT_TIME}</p>
          </div>
          <Button variant="outline" className="w-full" onClick={() => setQrOpen(false)}>Close</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
