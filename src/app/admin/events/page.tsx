"use client";

import { useState } from "react";
import Image from "next/image";
import { CalendarClock, Download, MapPinned, QrCode, UsersRound } from "lucide-react";
import { toast } from "sonner";

import { PrototypeNotice } from "@/components/brand/prototype-notice";
import { ReadinessChecklist } from "@/components/product/readiness-checklist";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { copy } from "@/lib/copy";
import { events } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { getEventImageSrc } from "@/lib/visual-assets";
import type { Event } from "@/lib/mock-data/types";

const p = copy.pages.admin.events;

const statusVariant: Record<string, "gold" | "success" | "secondary"> = {
  upcoming: "gold",
  ongoing: "success",
  past: "secondary",
};

export default function AdminEventsPage() {
  const [createOpen, setCreateOpen] = useState(false);
  const [managedEvent, setManagedEvent] = useState<Event | null>(null);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-ink-900">{p.heading}</h1>
          <p className="mt-1 text-sm text-ink-500">Plan booth capacity, QR badge readiness, and employer check-in for the prototype dataset.</p>
        </div>
        <Button variant="primary" size="sm" onClick={() => setCreateOpen(true)}>{p.createButton}</Button>
      </div>

      <PrototypeNotice
        variant="card"
        title="Event management prototype"
        message="Create, manage, export, and QR actions are demo/local behavior in this class-project prototype."
        className="mb-6"
      />

      {/* Event cards */}
      <div className="space-y-4">
        {events.map((event) => {
          const fillPct = Math.round((event.bookedSlots / event.totalSlots) * 100);
          const readiness = Math.min(96, Math.round((fillPct + event.registeredEmployers * 2) / 2));
          return (
            <div
              key={event.id}
              className="rounded-xl border border-ink-200 bg-surface-0 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="relative h-32 overflow-hidden rounded-lg bg-ink-100 sm:w-48">
                  <Image
                    src={getEventImageSrc(event.id)}
                    alt={`${event.title} event photo`}
                    fill
                    sizes="192px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900/45 to-transparent" />
                </div>
                {/* Left: event info */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-base font-semibold text-ink-900">{event.title}</h2>
                    <Badge variant={statusVariant[event.status] ?? "secondary"} className="text-[10px] capitalize">
                      {event.status}
                    </Badge>
                  </div>
                  <p className="mt-1 text-xs text-ink-400">{event.date} · {event.location}</p>
                  <p className="mt-2 line-clamp-2 text-sm text-ink-600">{event.description}</p>

                  {/* Category slots */}
                  <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
                    {event.categories.map((cat) => (
                      <div key={cat.name} className="rounded-lg border border-ink-100 bg-ink-50 px-2.5 py-2 text-[11px] text-ink-500">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-medium text-ink-700">{cat.name}</span>
                          <span>{cat.slotsBooked}/{cat.slotsTotal}</span>
                        </div>
                        <div className="mt-1.5 h-1 rounded-full bg-ink-200">
                          <div
                            className="h-full rounded-full bg-gold-500"
                            style={{ width: `${Math.round((cat.slotsBooked / cat.slotsTotal) * 100)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs text-ink-500">
                    <span className="inline-flex items-center gap-1 rounded-full bg-ink-50 px-2.5 py-1">
                      <CalendarClock className="size-3.5" />
                      Timeline drafted
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-ink-50 px-2.5 py-1">
                      <QrCode className="size-3.5" />
                      QR badge batch {event.status === "past" ? "archived" : "ready"}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-ink-50 px-2.5 py-1">
                      <MapPinned className="size-3.5" />
                      Category map assigned
                    </span>
                  </div>
                </div>

                {/* Right: stats + actions */}
                <div className="flex shrink-0 flex-col items-end gap-3 sm:min-w-[160px]">
                  {/* Slot fill bar */}
                  <div className="w-full sm:w-40">
                    <div className="flex justify-between text-[11px] text-ink-400 mb-1">
                      <span>{p.slotsLabel}</span>
                      <span>{fillPct}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-ink-100">
                      <div
                        className={cn("h-1.5 rounded-full", fillPct >= 80 ? "bg-success" : "bg-gold-500")}
                        style={{ width: `${fillPct}%` }}
                      />
                    </div>
                  </div>
                  <div className="w-full sm:w-40">
                    <div className="flex justify-between text-[11px] text-ink-400 mb-1">
                      <span>Readiness</span>
                      <span>{readiness}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-ink-100">
                      <div className="h-1.5 rounded-full bg-ink-900" style={{ width: `${readiness}%` }} />
                    </div>
                  </div>

                  {/* Stat pills */}
                  <div className="flex flex-wrap gap-2 text-right">
                    <div className="rounded-lg bg-ink-50 px-3 py-1.5 text-center">
                      <p className="text-base font-bold text-ink-900">{event.registeredEmployers}</p>
                      <p className="text-[10px] text-ink-400">{p.employersLabel}</p>
                    </div>
                    <div className="rounded-lg bg-ink-50 px-3 py-1.5 text-center">
                      <p className="text-base font-bold text-ink-900">{event.bookedSlots}</p>
                      <p className="text-[10px] text-ink-400">{p.registrationsLabel}</p>
                    </div>
                    {event.status === "past" && (
                      <>
                        <div className="rounded-lg bg-ink-50 px-3 py-1.5 text-center">
                          <p className="text-base font-bold text-ink-900">{event.matchesGenerated}</p>
                          <p className="text-[10px] text-ink-400">{p.matchesLabel}</p>
                        </div>
                        <div className="rounded-lg bg-ink-50 px-3 py-1.5 text-center">
                          <p className="text-base font-bold text-ink-900">{event.satisfactionScore}</p>
                          <p className="text-[10px] text-ink-400">{p.satisfactionLabel}</p>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => setManagedEvent(event)}>{p.viewAction}</Button>
                    <Button variant="primary" size="sm" className="h-7 text-xs" onClick={() => setManagedEvent(event)}>{p.manageAction}</Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create event demo</DialogTitle>
            <DialogDescription>
              This modal demonstrates a future event creation flow. Saving only shows local prototype feedback.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["event-name", "Event name", "Spring Career Fair 2027"],
              ["event-date", "Date", "June 2027"],
              ["event-location", "Location", "ZJUT International College Hall"],
              ["event-categories", "Categories", "Engineering, Business, Health"],
              ["event-capacity", "Capacity", "80 booths"],
              ["event-employer-target", "Employer target", "28 companies"],
            ].map(([id, label, placeholder]) => (
              <div key={id} className="grid gap-1.5">
                <Label htmlFor={id}>{label}</Label>
                <Input id={id} placeholder={placeholder} />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateOpen(false)}>Cancel</Button>
            <Button
              variant="primary"
              onClick={() => {
                toast.success("Demo event saved for this prototype session.");
                setCreateOpen(false);
              }}
            >
              Save demo event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(managedEvent)} onOpenChange={(open) => !open && setManagedEvent(null)}>
        {managedEvent ? <ManageEventPanel event={managedEvent} /> : null}
      </Dialog>
    </div>
  );
}

function ManageEventPanel({ event }: { event: Event }) {
  const fillPct = Math.round((event.bookedSlots / event.totalSlots) * 100);
  const readinessItems = [
    { label: "Employer verification queue reviewed", complete: true },
    { label: "Student check-in roster prepared", complete: event.bookedSlots > 50 },
    { label: "QR badge generation status ready", complete: true },
    { label: "Booth map assigned by category", complete: true },
    { label: "Issue checklist cleared", complete: event.status === "past" },
  ];

  return (
    <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-4xl">
      <DialogHeader>
        <DialogTitle>{event.title}</DialogTitle>
        <DialogDescription>
          Manage Event panel using mock capacity, check-in, and QR readiness data.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ["Slots booked", `${event.bookedSlots}/${event.totalSlots}`],
              ["Employers", String(event.registeredEmployers)],
              ["Fill rate", `${fillPct}%`],
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg border border-ink-200 bg-ink-50 p-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-400">{label}</p>
                <p className="mt-1 text-xl font-black text-ink-900">{value}</p>
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-ink-200 bg-surface-0 p-4">
            <h3 className="text-sm font-semibold text-ink-900">Category capacity breakdown</h3>
            <div className="mt-3 space-y-3">
              {event.categories.map((cat) => {
                const pct = Math.round((cat.slotsBooked / cat.slotsTotal) * 100);
                return (
                  <div key={cat.name}>
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="font-medium text-ink-700">{cat.name}</span>
                      <span className="text-ink-500">{cat.slotsBooked}/{cat.slotsTotal}</span>
                    </div>
                    <div className="h-2 rounded-full bg-ink-100">
                      <div className="h-full rounded-full bg-gold-500" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="rounded-xl border border-ink-200 bg-surface-0 p-4">
            <h3 className="text-sm font-semibold text-ink-900">Event timeline</h3>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {["08:30 Staff check-in", "09:00 Student booth setup", "10:00 Employer floor walk", "13:00 Follow-up session"].map((item) => (
                <div key={item} className="rounded-lg bg-ink-50 px-3 py-2 text-xs font-medium text-ink-700">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <PrototypeNotice message="Exports, check-ins, and badge generation are prototype actions only." />
        </div>
        <aside className="space-y-4">
          <ReadinessChecklist title="Readiness score" items={readinessItems} />
          <div className="rounded-xl border border-gold-200 bg-gold-50/80 p-4">
            <h3 className="text-sm font-semibold text-ink-900">Operations snapshot</h3>
            <div className="mt-3 space-y-2 text-xs text-ink-700">
              <p className="flex items-center gap-2"><UsersRound className="size-3.5" /> Employer check-in: {event.registeredEmployers - 2}/{event.registeredEmployers}</p>
              <p className="flex items-center gap-2"><UsersRound className="size-3.5" /> Student check-in: {event.bookedSlots - 6}/{event.bookedSlots}</p>
              <p className="flex items-center gap-2"><QrCode className="size-3.5" /> QR badges: generated</p>
            </div>
            <Button
              variant="primary"
              size="sm"
              className="mt-4 w-full"
              onClick={() => toast.success("Demo event report prepared from mock data.")}
            >
              <Download className="size-3.5" />
              Export report demo
            </Button>
          </div>
        </aside>
      </div>
    </DialogContent>
  );
}
