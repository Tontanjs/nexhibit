"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { copy } from "@/lib/copy";
import { events } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const p = copy.pages.admin.events;

const statusVariant: Record<string, "gold" | "success" | "secondary"> = {
  upcoming: "gold",
  ongoing: "success",
  past: "secondary",
};

export default function AdminEventsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-ink-900">{p.heading}</h1>
        <Button variant="primary" size="sm">{p.createButton}</Button>
      </div>

      {/* Event cards */}
      <div className="space-y-4">
        {events.map((event) => {
          const fillPct = Math.round((event.bookedSlots / event.totalSlots) * 100);
          return (
            <div
              key={event.id}
              className="rounded-xl border border-ink-200 bg-surface-0 p-5"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
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
                  <div className="mt-3 flex flex-wrap gap-2">
                    {event.categories.map((cat) => (
                      <div key={cat.name} className="text-[11px] text-ink-500">
                        <span className="font-medium text-ink-700">{cat.name}:</span> {cat.slotsBooked}/{cat.slotsTotal}
                      </div>
                    ))}
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
                    <Button variant="outline" size="sm" className="h-7 text-xs">{p.viewAction}</Button>
                    <Button variant="primary" size="sm" className="h-7 text-xs">{p.manageAction}</Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
