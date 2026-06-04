"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Bell,
  Bookmark,
  CalendarClock,
  CheckCircle2,
  Eye,
  MessageSquare,
  Sparkles,
  Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { notifications } from "@/lib/extended-data/notifications";
import type { Notification } from "@/lib/extended-data/types";
import { cn } from "@/lib/utils";

type NotificationDropdownProps = {
  recipientType: "student" | "employer";
  recipientId: string;
  className?: string;
};

const notificationMeta: Record<
  Notification["type"],
  { label: string; icon: typeof Bell; tone: string }
> = {
  profile_view: {
    label: "Profile view",
    icon: Eye,
    tone: "bg-sky-50 text-sky-700 ring-sky-100",
  },
  shortlist: {
    label: "Shortlist",
    icon: Bookmark,
    tone: "bg-gold-50 text-gold-700 ring-gold-100",
  },
  message: {
    label: "Message",
    icon: MessageSquare,
    tone: "bg-indigo-50 text-indigo-700 ring-indigo-100",
  },
  feedback: {
    label: "Feedback",
    icon: Star,
    tone: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  },
  event_reminder: {
    label: "Event",
    icon: CalendarClock,
    tone: "bg-orange-50 text-orange-700 ring-orange-100",
  },
  system: {
    label: "System",
    icon: Sparkles,
    tone: "bg-ink-100 text-ink-700 ring-ink-200",
  },
};

export function NotificationDropdown({
  recipientType,
  recipientId,
  className,
}: NotificationDropdownProps) {
  const [readIds, setReadIds] = useState<Set<string>>(() => new Set());
  const [clearedIds, setClearedIds] = useState<Set<string>>(() => new Set());

  const items = useMemo(
    () =>
      notifications
        .filter(
          (notification) =>
            notification.recipientType === recipientType &&
            notification.recipientId === recipientId &&
            !clearedIds.has(notification.id),
        )
        .sort(
          (a, b) =>
            new Date(b.isoTimestamp).getTime() - new Date(a.isoTimestamp).getTime(),
        ),
    [clearedIds, recipientId, recipientType],
  );

  const unreadCount = items.filter(
    (notification) => !notification.read && !readIds.has(notification.id),
  ).length;

  const markAllRead = () => {
    setReadIds(new Set(items.map((notification) => notification.id)));
  };

  const clearAll = () => {
    setClearedIds(new Set(items.map((notification) => notification.id)));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ""}`}
          className={cn(
            "relative inline-flex size-9 items-center justify-center rounded-full border border-ink-200 bg-surface-0 text-ink-600 shadow-sm transition hover:-translate-y-0.5 hover:border-gold-300 hover:text-ink-900 hover:shadow-md",
            className,
          )}
        >
          <Bell className="size-4" aria-hidden="true" />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex min-w-4 items-center justify-center rounded-full bg-gold-500 px-1 text-[10px] font-bold leading-4 text-ink-900 ring-2 ring-surface-0">
              {unreadCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="w-[min(92vw,390px)] overflow-hidden rounded-xl border-ink-200 bg-surface-0 p-0 shadow-2xl shadow-ink-900/15"
      >
        <div className="flex items-start justify-between gap-4 border-b border-ink-100 px-4 py-3">
          <div>
            <p className="text-sm font-semibold text-ink-900">Notifications</p>
            <p className="text-xs text-ink-500">
              Live demo signals from the NEXHIBIT floor
            </p>
          </div>
          {items.length > 0 && (
            <Button
              type="button"
              variant="ghost"
              size="xs"
              className="h-7 text-xs"
              onClick={markAllRead}
            >
              Mark read
            </Button>
          )}
        </div>

        <div className="max-h-[380px] overflow-y-auto p-2">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 px-5 py-10 text-center">
              <span className="flex size-10 items-center justify-center rounded-full bg-gold-50 text-gold-700">
                <CheckCircle2 className="size-5" aria-hidden="true" />
              </span>
              <p className="text-sm font-semibold text-ink-900">All clear</p>
              <p className="text-xs leading-5 text-ink-500">
                New views, messages, and event reminders will appear here during
                the demo.
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {items.map((notification) => {
                const meta = notificationMeta[notification.type];
                const Icon = meta.icon;
                const isUnread = !notification.read && !readIds.has(notification.id);
                const content = (
                  <div
                    className={cn(
                      "group flex w-full gap-3 rounded-lg px-3 py-2.5 text-left transition hover:bg-ink-50",
                      isUnread && "bg-gold-50/60",
                    )}
                    onClick={() =>
                      setReadIds((current) => new Set(current).add(notification.id))
                    }
                  >
                    <span
                      className={cn(
                        "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full ring-1",
                        meta.tone,
                      )}
                    >
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink-400">
                          {meta.label}
                        </span>
                        {isUnread && (
                          <span className="size-1.5 rounded-full bg-gold-500" />
                        )}
                      </span>
                      <span className="mt-1 block text-sm leading-5 text-ink-800">
                        {notification.text}
                      </span>
                      <span className="mt-1 block text-xs text-ink-400">
                        {notification.timestamp}
                      </span>
                    </span>
                  </div>
                );

                return notification.link ? (
                  <Link key={notification.id} href={notification.link}>
                    {content}
                  </Link>
                ) : (
                  <button key={notification.id} type="button" className="w-full">
                    {content}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-ink-100 bg-ink-50/70 px-4 py-2">
            <button
              type="button"
              className="text-xs font-semibold text-ink-500 transition hover:text-ink-900"
              onClick={clearAll}
            >
              Clear demo notifications
            </button>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
