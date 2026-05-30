"use client";

import { use, useState } from "react";
import Link from "next/link";
import { Calendar, MapPin, CheckCircle2, Clock, BookOpen, ChevronRight, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { VerifiedBadge } from "@/components/brand/VerifiedBadge";
import { FloorPlan } from "@/components/icons";
import { copy } from "@/lib/copy";
import { events, employers } from "@/lib/mock-data";
import { currentStudent } from "@/lib/current-user";
import { timeSlots } from "@/lib/extended-data/time-slots";
import { cn } from "@/lib/utils";

const p = copy.pages.student;

const schedule = [
  { time: "9:00", label: "Opening ceremony & welcome" },
  { time: "10:00", label: "First booth session — A, B, C sections" },
  { time: "12:00", label: "Lunch break" },
  { time: "13:00", label: "Second booth session — all sections" },
  { time: "17:00", label: "Networking & closing remarks" },
];

const preparation = [
  "Bring a printed copy of your profile QR code",
  "Prepare a 2-minute project walk-through",
  "Know your top 3 skills and when you can start",
  "Dress professionally — employers notice presentation",
  "Have a notebook for employer contact details",
];

export default function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const event = events.find((e) => e.id === id) ?? events[0];

  const categorySlots = timeSlots.filter(
    (s) => s.eventId === "evt-001" && s.category === currentStudent.category,
  );
  const displaySlots = categorySlots.slice(0, 6);

  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isBooked, setIsBooked] = useState(false);
  const [bookedSlot, setBookedSlot] = useState<(typeof displaySlots)[0] | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  function handleConfirm() {
    const slot = displaySlots.find((s) => s.id === selectedSlot);
    if (slot) {
      setBookedSlot(slot);
      setIsBooked(true);
      setDialogOpen(true);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero banner */}
      <div className="relative mb-8 overflow-hidden rounded-xl bg-gradient-to-r from-ink-900 to-ink-700 px-6 py-8 text-surface-0 sm:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Badge variant="gold" className="mb-3 text-xs">{event.cycle} {event.year}</Badge>
            <h1 className="text-2xl font-bold sm:text-3xl">{event.title}</h1>
            <div className="mt-3 flex flex-wrap gap-4 text-sm text-ink-300">
              <span className="flex items-center gap-1.5">
                <Calendar className="size-4" />
                {event.date}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="size-4" />
                {event.location}
              </span>
            </div>
          </div>
          <VerifiedBadge className="shrink-0" />
        </div>
      </div>

      {/* 2-column body */}
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        {/* Main column */}
        <div className="min-w-0 flex-1">
          <Tabs defaultValue="overview" className="min-w-0">
            <TabsList className="mb-6 justify-start overflow-x-auto">
              <TabsTrigger value="overview" className="flex-none">
                Overview
              </TabsTrigger>
              <TabsTrigger value="employers" className="flex-none">
                Registered Employers
              </TabsTrigger>
              <TabsTrigger value="layout" className="flex-none">
                Booth Layout
              </TabsTrigger>
            </TabsList>

            {/* Overview tab */}
            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">About this event</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-ink-600 leading-relaxed">{event.description}</p>
                </CardContent>
              </Card>

              {/* Schedule */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Clock className="size-4" /> Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="relative border-l border-ink-200 space-y-5 ml-2">
                    {schedule.map(({ time, label }) => (
                      <li key={time} className="ml-4">
                        <div className="absolute -left-1.5 mt-0.5 size-3 rounded-full border border-surface-0 bg-gold-500" />
                        <time className="text-xs font-bold text-gold-600">{time}</time>
                        <p className="text-sm text-ink-700">{label}</p>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>

              {/* Preparation */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <BookOpen className="size-4" /> What to prepare
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {preparation.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-ink-700">
                        <CheckCircle2 className="size-4 shrink-0 text-success mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Category slots */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Categories & slots</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {event.categories.map((cat) => {
                      const fill = Math.round((cat.slotsBooked / cat.slotsTotal) * 100);
                      return (
                        <div key={cat.name}>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="font-medium text-ink-800">{cat.name}</span>
                            <span className="text-ink-500">{cat.slotsBooked} / {cat.slotsTotal} slots</span>
                          </div>
                          <div className="h-1.5 w-full rounded-full bg-ink-200">
                            <div
                              className="h-full rounded-full bg-gold-500"
                              style={{ width: `${fill}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Employers tab */}
            <TabsContent value="employers">
              <div className="grid gap-4 sm:grid-cols-2">
                {employers.map((employer) => (
                  <Card key={employer.id} className="hover:shadow-sm transition-shadow">
                    <CardContent className="pt-4">
                      <div className="flex items-start gap-3">
                        <div
                          className="flex size-10 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white"
                          style={{ backgroundColor: employer.logoColor }}
                        >
                          {employer.logoLetter}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="text-sm font-semibold text-ink-900 truncate">{employer.name}</h3>
                            <button aria-label="Save for follow-up">
                              <Star className="size-4 text-ink-300 hover:text-gold-500 transition-colors" />
                            </button>
                          </div>
                          <p className="text-xs text-ink-500">{employer.industry} · {employer.size}</p>
                          <div className="mt-2 flex flex-wrap gap-1">
                            {employer.hiringCategories.map((cat) => (
                              <Badge key={cat} variant="secondary" className="text-xs">{cat}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Booth Layout tab */}
            <TabsContent value="layout">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Floor plan — {event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto rounded-lg bg-ink-50 p-4">
                    <FloorPlan
                      highlightedBooth="B-23"
                      numbering="global"
                      className="w-full max-w-full"
                      preserveAspectRatio="xMidYMid meet"
                    />
                  </div>
                  <p className="mt-3 text-xs text-ink-400 text-center">
                    Gold-highlighted booth is your potential slot (B-23, Business section)
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar — Booking widget */}
        <aside className="w-full shrink-0 lg:sticky lg:top-[145px] lg:w-[300px]">
          <Card className="border-ink-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">
                {isBooked ? p.booking.alreadyBookedHeading : p.booking.widgetHeading}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isBooked && bookedSlot ? (
                <BookedState
                  event={event}
                  slot={bookedSlot}
                  onChangeSlot={() => { setIsBooked(false); setBookedSlot(null); setSelectedSlot(null); }}
                />
              ) : (
                <BookingForm
                  displaySlots={displaySlots}
                  selectedSlot={selectedSlot}
                  onSelectSlot={setSelectedSlot}
                  onConfirm={handleConfirm}
                  eventStatus={event.status}
                />
              )}
            </CardContent>
          </Card>
        </aside>
      </div>

      {/* Confirmation dialog */}
      {bookedSlot && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-success/10">
                <CheckCircle2 className="size-6 text-success" />
              </div>
              <DialogTitle className="text-center">{p.booking.dialogHeading}</DialogTitle>
              <DialogDescription className="sr-only">Booking confirmation details</DialogDescription>
            </DialogHeader>
            <div className="rounded-lg border border-ink-200 bg-surface-50 p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-ink-500">{p.booking.dialogEventLabel}</span>
                <span className="font-medium text-ink-900">{event.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-500">{p.booking.dialogDateLabel}</span>
                <span className="font-medium text-ink-900">{event.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-500">{p.booking.dialogSlotLabel}</span>
                <span className="font-medium text-ink-900">{bookedSlot.startTime} – {bookedSlot.endTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-500">{p.booking.dialogBoothLabel}</span>
                <span className="font-medium text-ink-900">{bookedSlot.boothNumber} ({bookedSlot.category} section)</span>
              </div>
            </div>
            <p className="text-center text-xs text-ink-500">{p.booking.dialogNote}</p>
            <DialogFooter>
              <Button variant="outline" asChild>
                <Link href="/student/profile">{p.booking.viewProfile}</Link>
              </Button>
              <Button variant="primary" onClick={() => setDialogOpen(false)}>{p.booking.done}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

function BookingForm({
  displaySlots,
  selectedSlot,
  onSelectSlot,
  onConfirm,
  eventStatus,
}: {
  displaySlots: ReturnType<typeof timeSlots.filter>;
  selectedSlot: string | null;
  onSelectSlot: (id: string) => void;
  onConfirm: () => void;
  eventStatus: string;
}) {
  const p = copy.pages.student.booking;
  const isPast = eventStatus === "past";

  return (
    <div className="space-y-4">
      {isPast ? (
        <div className="rounded-lg bg-ink-50 p-4 text-center">
          <p className="text-sm text-ink-500">This event has already taken place.</p>
          <Button variant="outline" size="sm" className="mt-3 w-full" asChild>
            <Link href="/student/events">Browse upcoming events</Link>
          </Button>
        </div>
      ) : (
        <>
          {/* Category (locked to student's category) */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-ink-700">{p.categoryLabel}</label>
            <Select defaultValue={currentStudent.category}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {["Business", "Engineering", "Health", "Language", "Other"].map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Time slot picker */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-ink-700">Time slot</label>
            <div className="space-y-2">
              {displaySlots.map((slot) => (
                <button
                  key={slot.id}
                  disabled={!slot.available}
                  onClick={() => slot.available && onSelectSlot(slot.id)}
                  className={cn(
                    "w-full flex items-center justify-between rounded-lg border px-3 py-2.5 text-left text-sm transition-all",
                    !slot.available
                      ? "border-ink-200 bg-ink-50 text-ink-400 cursor-not-allowed"
                      : selectedSlot === slot.id
                        ? "border-gold-500 bg-gold-50 text-ink-900 shadow-sm ring-1 ring-gold-400"
                        : "border-ink-200 bg-surface-0 text-ink-700 hover:border-gold-300 hover:bg-gold-50/50",
                  )}
                >
                  <span className="font-medium">{slot.startTime} – {slot.endTime}</span>
                  <span className={cn("text-xs", slot.available ? "text-success" : "text-error")}>
                    {slot.available ? "Available" : "Booked"}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <p className="text-xs text-ink-400">{p.boothNote}</p>

          <Button
            variant="primary"
            className="w-full"
            disabled={!selectedSlot}
            onClick={onConfirm}
          >
            {p.confirmButton}
            <ChevronRight className="size-4" />
          </Button>
        </>
      )}
    </div>
  );
}

function BookedState({
  event,
  slot,
  onChangeSlot,
}: {
  event: (typeof events)[0];
  slot: ReturnType<typeof timeSlots.filter>[0];
  onChangeSlot: () => void;
}) {
  const p = copy.pages.student.booking;
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 rounded-lg bg-success/10 px-3 py-2">
        <CheckCircle2 className="size-4 text-success shrink-0" />
        <span className="text-sm font-medium text-ink-900">Slot confirmed</span>
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-ink-500">Date</span>
          <span className="font-medium text-ink-900">{event.date}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-ink-500">Time</span>
          <span className="font-medium text-ink-900">{slot.startTime} – {slot.endTime}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-ink-500">Booth</span>
          <span className="font-medium text-ink-900">{slot.boothNumber}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-ink-500">Section</span>
          <span className="font-medium text-ink-900">{slot.category}</span>
        </div>
      </div>
      <Button variant="outline" size="sm" className="w-full" onClick={onChangeSlot}>
        {p.changeSlot}
      </Button>
    </div>
  );
}
