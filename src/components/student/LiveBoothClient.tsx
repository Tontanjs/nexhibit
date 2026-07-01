"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { Copy, MessageSquareText, Radio, Send, SquareArrowOutUpRight } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { toast } from "sonner";

import { EmployerLogo } from "@/components/brand/EmployerLogo";
import { PrototypeNotice } from "@/components/brand/prototype-notice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { boothVisitors } from "@/lib/mock-data/booth-visitors";
import { employers } from "@/lib/mock-data/employers";
import type { Student } from "@/lib/mock-data/types";
import { useStudentLiveBoothStore, type PresenceState } from "@/stores/student-live-booth-store";
import { cn } from "@/lib/utils";

function getEmployer(id: string) {
  return employers.find((employer) => employer.id === id);
}

function formatDuration(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}m ${seconds.toString().padStart(2, "0")}s`;
}

const presenceStyles = {
  Online: "bg-success",
  "In a meeting": "bg-warning",
  "Available in 10 min": "bg-gold-500",
  Offline: "bg-ink-400",
} satisfies Record<PresenceState, string>;

export function LiveBoothClient({ student }: { student: Student }) {
  const {
    live,
    presence,
    requests,
    meetings,
    slots,
    setLive,
    setPresence,
    acceptRequest,
    declineRequest,
    updateMeetingNotes,
    toggleSlot,
  } = useStudentLiveBoothStore();
  const [tick, setTick] = useState(0);
  const boothUrl = `nexhibit.com/booth/${student.id}`;

  useEffect(() => {
    const id = window.setInterval(() => setTick((current) => current + 1), 1000);
    return () => window.clearInterval(id);
  }, []);

  const sortedMeetings = useMemo(() => [...meetings].sort((a, b) => a.time.localeCompare(b.time)), [meetings]);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-700">Student live booth</p>
        <h1 className="mt-2 text-3xl font-black text-ink-900">Run your reverse career fair booth</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-600">
          Manage simulated employer traffic, meeting slots, and follow-ups while your demo profile is visible.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[340px_minmax(0,1fr)] lg:items-start">
        <aside className="min-w-0 space-y-4 lg:sticky lg:top-[152px]">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <Radio className="size-4 text-gold-600" aria-hidden="true" />
                Booth control panel
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center gap-4">
                <span className={cn("size-16 rounded-full shadow-inner ring-4 ring-ink-100", presenceStyles[presence])} aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-ink-900">{live ? "Event day live" : "Event day ended"}</p>
                  <p className="text-xs text-ink-500">{presence}</p>
                </div>
              </div>
              <div className="grid gap-2">
                {(["Online", "In a meeting", "Available in 10 min", "Offline"] as PresenceState[]).map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setPresence(status)}
                    className={cn(
                      "flex min-h-10 items-center justify-between rounded-md border px-3 text-sm font-semibold transition",
                      presence === status ? "border-gold-500 bg-gold-50 text-ink-900" : "border-ink-200 bg-surface-0 text-ink-600 hover:border-gold-300",
                    )}
                  >
                    {status}
                    <span className={cn("size-2 rounded-full", presenceStyles[status])} aria-hidden="true" />
                  </button>
                ))}
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-ink-700">Profile completion</p>
                  <p className="text-2xl font-black tabular-nums text-ink-900">{student.profileStrength}%</p>
                </div>
                <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-ink-100">
                  <div className="h-full rounded-full bg-gold-500" style={{ width: `${student.profileStrength}%` }} />
                </div>
              </div>

              <Button variant="primary" className="w-full" onClick={() => setLive(false)}>
                End event day
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Share my booth</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border border-ink-200 bg-ink-50 px-3 py-2">
                <p className="break-all text-sm font-semibold text-ink-900">{boothUrl}</p>
              </div>
              <div className="overflow-hidden rounded-lg border border-ink-200 bg-surface-0 p-4 text-center">
                <QRCodeSVG value={`https://${boothUrl}`} size={144} className="mx-auto block max-w-full" />
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  navigator.clipboard.writeText(`https://${boothUrl}`);
                  toast.success("Booth URL copied.");
                }}
              >
                <Copy className="size-4" aria-hidden="true" />
                Copy booth link
              </Button>
            </CardContent>
          </Card>
        </aside>

        <div className="min-w-0 space-y-6">
          <PrototypeNotice
            variant="subtle"
            message="Live booth activity, meeting requests, and QR sharing are simulated for the prototype. No real employer data is sent."
          />

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Visitors right now</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 md:grid-cols-2">
              {boothVisitors.map((visitor) => {
                const employer = getEmployer(visitor.employerId);
                return (
                  <div key={visitor.id} className="rounded-lg border border-ink-200 bg-surface-0 p-4">
                    <div className="flex items-start gap-3">
                      {employer ? <EmployerLogo employer={employer} /> : <span className="size-10 rounded-lg bg-ink-100" />}
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-ink-900">{visitor.employerName}</p>
                        <p className="mt-0.5 text-xs text-ink-500">{visitor.activity}</p>
                        <p className="mt-2 text-xs font-semibold tabular-nums text-gold-700">
                          On your page for {formatDuration(visitor.startedSecondsAgo + tick)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Meeting requests</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {requests.length ? requests.map((request) => {
                const employer = getEmployer(request.employerId);
                return (
                  <div key={request.id} className="flex flex-col gap-3 rounded-lg border border-ink-200 bg-surface-0 p-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-start gap-3">
                      {employer ? <EmployerLogo employer={employer} /> : <span className="size-10 rounded-lg bg-ink-100" />}
                      <div>
                        <p className="text-sm font-semibold text-ink-900">{request.contactName} · {request.employerName}</p>
                        <p className="text-xs text-ink-500">{format(new Date(request.requestedTime), "HH:mm")} · {request.roleFocus}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/student/companies/${request.employerId}`}>
                          <SquareArrowOutUpRight className="size-3.5" aria-hidden="true" />
                          View profile
                        </Link>
                      </Button>
                      <Button variant="primary" size="sm" onClick={() => acceptRequest(request)}>Accept</Button>
                      <Button variant="ghost" size="sm" onClick={() => declineRequest(request.id)}>Decline</Button>
                    </div>
                  </div>
                );
              }) : (
                <p className="rounded-lg border border-dashed border-ink-200 p-4 text-sm text-ink-500">No pending requests right now.</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Today&apos;s meetings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {sortedMeetings.map((meeting) => (
                <div key={meeting.id} className="grid gap-3 rounded-lg border border-ink-200 bg-surface-0 p-4 lg:grid-cols-[84px_1fr_auto] lg:items-start">
                  <div className="text-sm font-black tabular-nums text-ink-900">{format(new Date(meeting.time), "HH:mm")}</div>
                  <div>
                    <p className="text-sm font-semibold text-ink-900">{meeting.employerName}</p>
                    <p className="text-xs text-ink-500">{meeting.roleFocus}</p>
                    <Textarea
                      value={meeting.notes ?? ""}
                      onChange={(event) => updateMeetingNotes(meeting.id, event.target.value)}
                      className="mt-2 min-h-20"
                      aria-label={`Notes for ${meeting.employerName}`}
                      placeholder="Auto-saved notes for this meeting"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 lg:justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => toast.success(`Joined ${meeting.employerName} meeting in simulated booth mode.`)}
                    >
                      Join demo
                    </Button>
                    <ThankYouDialog employerName={meeting.employerName} roleFocus={meeting.roleFocus} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Open meeting slots</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto pb-2">
                <div className="grid min-w-[760px] grid-cols-8 gap-2">
                  {slots.map((slot) => (
                    <button
                      key={slot.id}
                      type="button"
                      disabled={slot.state === "booked"}
                      onClick={() => toggleSlot(slot.id)}
                      className={cn(
                        "min-h-16 rounded-lg border px-2 py-2 text-left text-xs font-semibold transition",
                        slot.state === "empty" && "border-gold-500 bg-surface-0 text-ink-900 hover:bg-gold-50",
                        slot.state === "published" && "border-gold-500 bg-gold-500 text-ink-900",
                        slot.state === "booked" && "cursor-not-allowed border-ink-900 bg-ink-900 text-surface-0",
                      )}
                    >
                      <span className="block tabular-nums">{slot.time}</span>
                      <span className="mt-1 block font-medium">{slot.state === "booked" ? slot.employerName : slot.state}</span>
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function ThankYouDialog({ employerName, roleFocus }: { employerName: string; roleFocus: string }) {
  const draft = `Hi ${employerName} team,\n\nThank you for visiting my NEXHIBIT booth today. I enjoyed discussing the ${roleFocus.toLowerCase()} opportunity and how my project work could support your team.\n\nI am happy to share any additional portfolio evidence or availability details.`;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <MessageSquareText className="size-3.5" aria-hidden="true" />
          Send thank-you
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Suggested thank-you note</DialogTitle>
          <DialogDescription>Mock template only. No message is sent from this prototype.</DialogDescription>
        </DialogHeader>
        <Textarea readOnly value={draft} className="min-h-40" aria-label="Suggested thank-you draft" />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
          <Button
            variant="primary"
            onClick={() => {
              navigator.clipboard.writeText(draft);
              toast.success("Thank-you draft copied.");
            }}
          >
            <Send className="size-4" aria-hidden="true" />
            Copy draft
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
