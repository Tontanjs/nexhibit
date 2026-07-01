"use client";

import { useEffect, useRef, useState } from "react";
import { Download, FolderOpen, PauseCircle, QrCode } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { FloorPlan } from "@/components/icons";
import { EmployerLogo } from "@/components/brand/EmployerLogo";
import { PrototypeNotice } from "@/components/brand/prototype-notice";
import { EventPassCard, PremiumHeroPanel } from "@/components/aurora";
import { ConsentSummary } from "@/components/product/consent-summary";
import { ReadinessChecklist } from "@/components/product/readiness-checklist";
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
  const [breakOpen, setBreakOpen] = useState(false);
  const seedSeconds = useRef(12 * 60 + 34);
  const [secondsLeft, setSecondsLeft] = useState(seedSeconds.current);
  const countdown = `${String(Math.floor(secondsLeft / 60)).padStart(2, "0")}:${String(secondsLeft % 60).padStart(2, "0")}`;

  useEffect(() => {
    const id = setInterval(() => setSecondsLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);

  const myVisits = visitorStream.filter((v) => v.studentId === currentStudent.id);
  const savedCount = myVisits.filter((v) => v.status === "saved").length;
  const feedbackCount = myVisits.filter((v) => v.status === "left_feedback").length;
  const eventTips = [
    { label: "Keep QR badge visible", complete: true },
    { label: "Open strongest project first", complete: true },
    { label: "End each visit with one next step", complete: false },
    { label: "Log recruiter questions after the slot", complete: false },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <PremiumHeroPanel
        eyebrow={p.liveLabel}
        title="Event-day booth control"
        body="Keep your QR pass, booth context, visitor stream, and next actions visible while employers move through the fair floor."
        className="mb-6"
        actions={
          <div className="rounded-full border border-gold-300/30 bg-gold-500/[0.12] px-4 py-2 text-sm text-ink-200">
            {p.slotEndsLabel} <span className="font-mono font-bold text-gold-300">{countdown}</span>
          </div>
        }
      >
        <PrototypeNotice
          variant="dark"
          message="Live visitor stream, QR badge, break request, and countdown are simulated for the prototype demo."
          className="max-w-3xl"
        />
      </PremiumHeroPanel>

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
                className="motion-safe-hover gold-glow flex min-h-[80px] flex-col items-center justify-center gap-2 rounded-xl border border-gold-300/40 bg-gold-500 text-aurora-black transition-colors hover:bg-gold-400"
              >
                <QrCode className="size-6" aria-hidden="true" />
                <span className="text-sm font-semibold">{p.showQrLabel}</span>
              </button>
              <a
                href="/student/profile"
                className="motion-safe-hover flex min-h-[80px] flex-col items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.07] text-ink-200 transition-colors hover:border-gold-300/30 hover:bg-white/[0.1]"
              >
                <FolderOpen className="size-6" aria-hidden="true" />
                <span className="text-sm font-medium">{p.openPortfolioLabel}</span>
              </a>
              <button
                type="button"
                onClick={() => setBreakOpen(true)}
                className="motion-safe-hover flex min-h-[80px] flex-col items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.07] text-ink-200 transition-colors hover:border-gold-300/30 hover:bg-white/[0.1]"
              >
                <PauseCircle className="size-6" aria-hidden="true" />
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
                      <EmployerLogo employer={employer} className="size-9" />
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
          <EventPassCard
            studentName={currentStudent.name}
            studentId={currentStudent.id}
            boothNumber={BOOTH}
            slotTime={SLOT_TIME}
            verifiedCaption={copy.status.verified}
          />

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

          <ReadinessChecklist title="End-of-slot checklist" items={eventTips} />
        </aside>
      </div>

      {/* QR Dialog */}
      <Dialog open={qrOpen} onOpenChange={setQrOpen}>
        <DialogContent className="flex max-h-[100dvh] flex-col items-center overflow-y-auto max-sm:h-[100dvh] max-sm:w-screen max-sm:max-w-none max-sm:rounded-none sm:max-w-sm">
          <DialogHeader className="w-full">
            <DialogTitle className="text-center">{p.qrDialogTitle}</DialogTitle>
            <DialogDescription className="sr-only">Your event QR badge to show employers</DialogDescription>
          </DialogHeader>
          <EventPassCard
            studentName={currentStudent.name}
            studentId={currentStudent.id}
            boothNumber={BOOTH}
            slotTime={SLOT_TIME}
            verifiedCaption={copy.status.verified}
            className="w-full"
          />
          <ConsentSummary student={currentStudent} />
          <p className="text-center text-xs leading-5 text-ink-500">
            Privacy reminder: only fields marked visible in this prototype profile are shown to employers.
          </p>
          <Button
            type="button"
            variant="primary"
            className="w-full"
            onClick={() => toast.success("Demo QR pass prepared. No real credential was downloaded.")}
          >
            <Download className="size-4" aria-hidden="true" />
            Download demo pass
          </Button>
          <Button variant="outline" className="w-full" onClick={() => setQrOpen(false)}>Close</Button>
        </DialogContent>
      </Dialog>

      <Dialog open={breakOpen} onOpenChange={setBreakOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>{p.breakDialogTitle}</DialogTitle>
            <DialogDescription>{p.breakDialogBody}</DialogDescription>
          </DialogHeader>
          <Button
            variant="primary"
            className="w-full"
            onClick={() => {
              setBreakOpen(false);
              toast.success("Break request saved for this prototype session.");
            }}
          >
            {p.breakDialogButton}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
