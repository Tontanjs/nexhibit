"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { copy } from "@/lib/copy";
import { events } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { getEventImageSrc } from "@/lib/visual-assets";
import type { Event } from "@/lib/mock-data/types";

type Filter = "Upcoming" | "Past" | "All";

const p = copy.pages.student.events;

function statusVariant(status: Event["status"]): "gold" | "success" | "secondary" {
  if (status === "upcoming") return "gold";
  if (status === "ongoing") return "success";
  return "secondary";
}

function statusLabel(status: Event["status"]): string {
  if (status === "upcoming") return copy.status.upcoming;
  if (status === "ongoing") return copy.status.ongoing;
  return copy.status.past;
}

export default function EventsPage() {
  const [filter, setFilter] = useState<Filter>("Upcoming");

  const filtered = events.filter((e) => {
    if (filter === "All") return true;
    if (filter === "Upcoming") return e.status === "upcoming" || e.status === "ongoing";
    return e.status === "past";
  });

  const tabs: Filter[] = ["Upcoming", "Past", "All"];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 overflow-hidden rounded-lg border border-ink-200 bg-ink-900 p-6 text-surface-0 shadow-2xl shadow-ink-900/10">
        <h1 className="text-2xl font-bold text-surface-0">{p.heading}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-300">{p.subheading}</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {[
            { label: p.tabUpcoming, value: events.filter((e) => e.status !== "past").length },
            { label: p.tabPast, value: events.filter((e) => e.status === "past").length },
            { label: p.employersLabel, value: events.reduce((sum, e) => sum + e.registeredEmployers, 0) },
          ].map((item) => (
            <div key={item.label} className="rounded-lg border border-surface-0/10 bg-surface-0/[0.06] px-4 py-3">
              <p className="text-2xl font-bold text-gold-400">{item.value}</p>
              <p className="text-xs font-semibold text-ink-300">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filter tabs */}
      <div className="mb-6 flex gap-1 border-b border-ink-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={cn(
              "px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px",
              filter === tab
                ? "border-gold-500 text-ink-900"
                : "border-transparent text-ink-500 hover:text-ink-700 hover:border-ink-300",
            )}
          >
            {tab === "Upcoming" ? p.tabUpcoming : tab === "Past" ? p.tabPast : p.tabAll}
            <span className="ml-1.5 text-xs text-ink-400">
              ({tab === "All" ? events.length : events.filter((e) => (tab === "Upcoming" ? e.status !== "past" : e.status === "past")).length})
            </span>
          </button>
        ))}
      </div>

      {/* Cards grid */}
      {filtered.length === 0 ? (
        <p className="py-12 text-center text-ink-400">{copy.emptyStates.noEvents}</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((event, i) => (
            <EventCard key={event.id} event={event} featured={i === 0} />
          ))}
        </div>
      )}
    </div>
  );
}

function EventCard({ event, featured }: { event: Event; featured: boolean }) {
  const booked = event.bookedSlots;
  const total = event.totalSlots;
  const fillPct = Math.round((booked / total) * 100);
  const p = copy.pages.student.events;

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow flex flex-col">
      {/* Cover banner */}
      <div className={cn("relative h-44 overflow-hidden", featured && "sm:h-52")}>
        <Image
          src={getEventImageSrc(event.id)}
          alt={`${event.title} event photo`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/20 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-start justify-end p-4">
          <Badge variant={statusVariant(event.status)} className="text-xs">
            {statusLabel(event.status)}
          </Badge>
          <p className="mt-1 text-lg font-bold text-white drop-shadow">{event.date}</p>
        </div>
      </div>

      <CardContent className="flex flex-1 flex-col pt-4">
        <h3 className="text-base font-bold text-ink-900">{event.title}</h3>

        <div className="mt-2 space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-ink-500">
            <Calendar className="size-3.5 shrink-0" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-ink-500">
            <MapPin className="size-3.5 shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
        </div>

        <p className="mt-3 line-clamp-2 text-xs text-ink-500 flex-1">{event.description}</p>

        {/* Stats row */}
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-xs text-ink-500">
            <span>
              {booked} / {total} {p.slotsLabel}
            </span>
            <div className="flex items-center gap-1">
              <Users className="size-3" />
              <span>{event.registeredEmployers} {p.employersLabel}</span>
            </div>
          </div>
          <div className="h-1.5 w-full rounded-full bg-ink-200">
            <div
              className={cn("h-full rounded-full", fillPct >= 90 ? "bg-error" : fillPct >= 70 ? "bg-warning" : "bg-success")}
              style={{ width: `${fillPct}%` }}
            />
          </div>
        </div>

        {/* CTA */}
        <div className="mt-4">
          {event.status === "past" ? (
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href={`/student/events/${event.id}`}>{p.viewResults}</Link>
            </Button>
          ) : event.status === "ongoing" ? (
            <Button variant="default" size="sm" className="w-full" asChild>
              <Link href={`/student/events/${event.id}`}>{p.enterEvent}</Link>
            </Button>
          ) : (
            <Button variant="primary" size="sm" className="w-full" asChild>
              <Link href={`/student/events/${event.id}`}>
                {p.viewAndBook}
                <ArrowRight className="size-3.5" />
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
