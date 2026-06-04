"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BriefcaseBusiness,
  CalendarClock,
  FileText,
  MoreHorizontal,
  Paperclip,
  Search,
  Send,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmployerLogo } from "@/components/brand/EmployerLogo";
import { StudentAvatar } from "@/components/brand/StudentAvatar";
import { EmptyInbox } from "@/components/illustrations/EmptyInbox";
import { copy } from "@/lib/copy";
import { currentStudent } from "@/lib/current-user";
import { employers } from "@/lib/mock-data";
import { conversations } from "@/lib/extended-data/conversations";
import { cn } from "@/lib/utils";

const p = copy.pages.student.messages;

type ConvFilter = "All" | "Unread" | "Archived";

function getEmployer(id: string) {
  return employers.find((e) => e.id === id);
}

function formatTime(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date("2026-06-05T00:00:00+08:00");
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

const composerActions = [
  { label: "Share availability", icon: CalendarClock },
  { label: "Attach portfolio", icon: BriefcaseBusiness },
  { label: "Attach resume", icon: FileText },
];

const quickReplies = [
  "Thanks for reviewing my portfolio. I can share a short project note and demo video here.",
  "Friday afternoon works for me. I will prepare one example of a product decision changed after user feedback.",
  "I am interested in the role. Could you share the expected language mix and internship timeline?",
];

export default function MessagesPage() {
  const [filter, setFilter] = useState<ConvFilter>("All");
  const [activeConvId, setActiveConvId] = useState("conv-001");
  const [search, setSearch] = useState("");
  const [draft, setDraft] = useState("");

  const filtered = conversations.filter((c) => {
    if (filter === "Unread") return c.unreadCount > 0;
    if (filter === "Archived") return c.archived;
    return !c.archived;
  }).filter((c) => {
    if (!search) return true;
    const employer = getEmployer(c.participantEmployerId);
    return employer?.name.toLowerCase().includes(search.toLowerCase());
  });

  const activeConv = conversations.find((c) => c.id === activeConvId) ?? conversations[0];
  const activeEmployer = getEmployer(activeConv?.participantEmployerId ?? "");

  return (
    <div className="flex h-[calc(100vh-145px)] overflow-hidden">
      {/* Left panel — conversation list */}
      <aside className={cn("flex flex-col border-r border-ink-200 bg-surface-0 w-full sm:w-[320px] sm:shrink-0", activeConvId ? "hidden sm:flex" : "flex")}>
        {/* Header */}
        <div className="border-b border-ink-200 px-4 py-3">
          <h1 className="mb-3 text-base font-bold text-ink-900">{p.heading}</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={p.searchPlaceholder}
              className="pl-9"
            />
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex border-b border-ink-200">
          {(["All", "Unread", "Archived"] as ConvFilter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "flex-1 border-b-2 py-2 text-xs font-medium transition-colors",
                filter === f
                  ? "border-gold-500 text-ink-900"
                  : "border-transparent text-ink-400 hover:text-ink-700",
              )}
            >
              {f === "All" ? p.tabAll : f === "Unread" ? p.tabUnread : p.tabArchived}
              {f === "Unread" && (
                <span className="ml-1 rounded-full bg-gold-500 px-1.5 py-0.5 text-[10px] font-bold text-ink-900">
                  {conversations.filter((c) => c.unreadCount > 0).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Conversation list */}
        <div className="flex-1 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
              <EmptyInbox size={100} />
              <p className="text-sm text-ink-400">{p.emptyBody}</p>
            </div>
          ) : (
            filtered.map((conv) => {
              const employer = getEmployer(conv.participantEmployerId);
              if (!employer) return null;
              const lastMsg = conv.messages[conv.messages.length - 1];
              const isActive = conv.id === activeConvId;
              return (
                <button
                  key={conv.id}
                  onClick={() => setActiveConvId(conv.id)}
                  className={cn(
                    "flex w-full items-start gap-3 border-b border-ink-100 px-4 py-3 text-left transition-colors hover:bg-ink-50",
                    isActive && "bg-gold-50",
                  )}
                >
                  <EmployerLogo employer={employer} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <p className={cn("truncate text-sm font-semibold", conv.unreadCount > 0 ? "text-ink-900" : "text-ink-700")}>
                        {employer.name}
                      </p>
                      <span className="shrink-0 text-[11px] text-ink-400">{formatTime(conv.lastMessageAt)}</span>
                    </div>
                    <p className="mt-0.5 line-clamp-1 text-xs text-ink-400">{lastMsg?.text}</p>
                    {conv.unreadCount > 0 && (
                      <span className="mt-1 inline-flex size-4 items-center justify-center rounded-full bg-gold-500 text-[10px] font-bold text-ink-900">
                        {conv.unreadCount}
                      </span>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>
      </aside>

      {/* Right panel — active conversation */}
      <div className={cn("flex flex-1 flex-col", !activeConvId ? "hidden sm:flex" : "flex")}>
        {activeConv && activeEmployer ? (
          <>
            {/* Conversation header */}
            <div className="flex items-center justify-between border-b border-ink-200 px-4 py-3">
              <div className="flex items-center gap-3">
                <button className="text-xs text-ink-400 sm:hidden" onClick={() => setActiveConvId("")}>← Back</button>
                <EmployerLogo employer={activeEmployer} className="size-9" />
                <div>
                  <p className="text-sm font-semibold text-ink-900">{activeEmployer.name}</p>
                  <Link
                    href={`/student/companies/${activeEmployer.id}`}
                    className="text-xs font-semibold text-gold-600 hover:underline"
                  >
                    {p.viewCompanyProfile}
                  </Link>
                </div>
              </div>
              <button className="flex size-8 items-center justify-center rounded-md text-ink-400 hover:bg-ink-100">
                <MoreHorizontal className="size-4" />
              </button>
            </div>

            {/* Message thread */}
            <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
              {activeConv.messages.map((msg) => {
                const isStudent = msg.senderType === "student";
                return (
                  <div key={msg.id} className={cn("flex", isStudent ? "justify-end" : "justify-start")}>
                    {!isStudent && (
                      <EmployerLogo employer={activeEmployer} className="mr-2 size-7 self-end rounded-full" />
                    )}
                    <div
                      className={cn(
                        "max-w-[75%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                        isStudent
                          ? "rounded-br-sm bg-ink-900 text-surface-0"
                          : "rounded-bl-sm bg-ink-100 text-ink-900",
                      )}
                    >
                      {msg.text}
                    </div>
                    {isStudent && (
                      <StudentAvatar student={currentStudent} className="ml-2 size-7 self-end" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Input bar */}
            <div className="border-t border-ink-200 px-4 py-3">
              <div className="mb-3 flex flex-wrap gap-2">
                {composerActions.map(({ label, icon: Icon }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setDraft(`${label}: `)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-surface-0 px-3 py-1.5 text-xs font-semibold text-ink-600 transition hover:border-gold-300 hover:bg-gold-50 hover:text-ink-900"
                  >
                    <Icon className="size-3.5" aria-hidden="true" />
                    {label}
                  </button>
                ))}
              </div>
              <div className="mb-3 rounded-lg border border-gold-200 bg-gold-50/70 p-3">
                <div className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.16em] text-gold-700">
                  <Sparkles className="size-3.5" aria-hidden="true" />
                  Quick replies
                </div>
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply, index) => (
                    <button
                      key={reply}
                      type="button"
                      onClick={() => setDraft(reply)}
                      className="rounded-full bg-surface-0 px-3 py-1.5 text-xs font-medium text-ink-700 shadow-sm ring-1 ring-ink-100 transition hover:-translate-y-0.5 hover:text-ink-900 hover:ring-gold-200"
                    >
                      Option {index + 1}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex size-9 shrink-0 items-center justify-center rounded-md text-ink-400 hover:bg-ink-100">
                  <Paperclip className="size-4" />
                </button>
                <Input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder={p.messagePlaceholder}
                  className="flex-1"
                  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); setDraft(""); } }}
                />
                <Button
                  variant="primary"
                  size="icon-sm"
                  disabled={!draft.trim()}
                  onClick={() => setDraft("")}
                  aria-label="Send message"
                >
                  <Send className="size-4" />
                </Button>
              </div>
              <p className="mt-1.5 text-xs text-ink-400">{copy.messaging.composerHint}</p>
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
            <EmptyInbox size={120} />
            <p className="text-base font-semibold text-ink-700">{p.emptyHeading}</p>
            <p className="max-w-xs text-sm text-ink-400">{p.emptyBody}</p>
          </div>
        )}
      </div>
    </div>
  );
}
