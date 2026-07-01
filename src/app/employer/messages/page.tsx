"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Archive,
  BriefcaseBusiness,
  CalendarClock,
  Flag,
  MapPin,
  MoreHorizontal,
  Paperclip,
  Search,
  Send,
  Sparkles,
  Star,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmployerLogo } from "@/components/brand/EmployerLogo";
import { StudentAvatar } from "@/components/brand/StudentAvatar";
import { EmptyInbox } from "@/components/illustrations/EmptyInbox";
import { copy } from "@/lib/copy";
import { currentEmployer } from "@/lib/current-employer";
import { employerRoles, getCandidateSignal, getRoleFit } from "@/lib/employer-workspace";
import { students } from "@/lib/mock-data";
import { conversations } from "@/lib/extended-data/conversations";
import { calculateMatchScore, getMatchTier } from "@/lib/utils-lib/matching";
import { cn } from "@/lib/utils";

const p = copy.pages.employer.messages;

type ConvFilter = "All" | "Unread" | "Archived";

function getStudent(id: string) {
  return students.find((s) => s.id === id);
}

function formatTime(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diffDays = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24),
  );
  if (diffDays === 0)
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

const employerConversations = conversations.filter(
  (c) => c.participantEmployerId === currentEmployer.id,
);

const quickReplies = [
  {
    label: "Invite to 15-min interview",
    text: "Are you available for a 15-minute interview during the Spring Career Fair booth session?",
  },
  {
    label: "Ask for project walkthrough",
    text: "Could you send a short project walkthrough and explain your role in the architecture decisions?",
  },
  {
    label: "Request resume",
    text: "Could you share your latest resume and portfolio link for our hiring team review?",
  },
  {
    label: "Share booth location",
    text: "We would like to invite you to our booth. Please bring one project demo or architecture diagram.",
  },
  {
    label: "Send role brief",
    text: "I am sharing a role brief so you can decide whether this opportunity fits your goals and availability.",
  },
  {
    label: "Follow up after event",
    text: "Thank you for speaking with us at the event. We will review your profile with the hiring team and follow up soon.",
  },
];

const recruiterActions = [
  { label: "Attach role brief", icon: BriefcaseBusiness },
  { label: "Send interview request", icon: CalendarClock },
  { label: "Share booth location", icon: MapPin },
  { label: "Mark priority", icon: Star },
  { label: "Archive", icon: Archive },
];

function getScore(studentId: string) {
  const student = students.find((s) => s.id === studentId);
  if (!student) return 0;
  return calculateMatchScore({
    studentCategory: student.category,
    studentSkills: [...student.skills],
    studentEnglishLevel: student.englishLevel,
    studentHSK: student.hsk,
    employerHiringCategories: [...currentEmployer.hiringCategories],
    employerHiringSkills: [...currentEmployer.hiringSkills],
    studentId: student.id,
    employerId: currentEmployer.id,
    studentGpa: student.gpa,
    studentPreferredLocations: student.preferredLocations,
    employerLocation: currentEmployer.location,
  }).score;
}

export default function EmployerMessagesPage() {
  const [filter, setFilter] = useState<ConvFilter>("All");
  const [activeConvId, setActiveConvId] = useState(
    employerConversations[0]?.id ?? "",
  );
  const [search, setSearch] = useState("");
  const [draft, setDraft] = useState("");

  const filtered = employerConversations
    .filter((c) => {
      if (filter === "Unread") return c.unreadCount > 0;
      if (filter === "Archived") return c.archived;
      return !c.archived;
    })
    .filter((c) => {
      if (!search) return true;
      const student = getStudent(c.participantStudentId);
      return student?.name.toLowerCase().includes(search.toLowerCase());
    });

  const activeConv =
    employerConversations.find((c) => c.id === activeConvId) ??
    employerConversations[0];
  const activeStudent = getStudent(activeConv?.participantStudentId ?? "");
  const activeSignal = activeStudent ? getCandidateSignal(activeStudent.id) : null;
  const activeScore = activeStudent ? getScore(activeStudent.id) : 0;
  const activeTier = getMatchTier(activeScore);
  const activeRoleFit = activeStudent ? getRoleFit(activeStudent, employerRoles[0]) : null;

  return (
    <div className="flex h-[calc(100vh-145px)] overflow-hidden">
      <h1 className="sr-only">{p.heading}</h1>
      {/* Left panel */}
      <aside
        className={cn(
          "flex flex-col border-r border-ink-200 bg-surface-0 w-full sm:w-[320px] sm:shrink-0",
          activeConvId ? "hidden sm:flex" : "flex",
        )}
      >
        <div className="border-b border-ink-200 px-4 py-3">
          <p className="mb-3 text-base font-bold text-ink-900">{p.heading}</p>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search students"
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
                  {employerConversations.filter((c) => c.unreadCount > 0).length}
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
              const student = getStudent(conv.participantStudentId);
              if (!student) return null;
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
                  <StudentAvatar student={student} className="size-10" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <p
                        className={cn(
                          "truncate text-sm font-semibold",
                          conv.unreadCount > 0 ? "text-ink-900" : "text-ink-700",
                        )}
                      >
                        {student.name}
                      </p>
                      <span className="shrink-0 text-[11px] text-ink-400">
                        {formatTime(conv.lastMessageAt)}
                      </span>
                    </div>
                    <p className="mt-0.5 line-clamp-1 text-xs text-ink-400">
                      {lastMsg?.text}
                    </p>
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

      {/* Right panel — thread */}
      <div className={cn("flex flex-1 flex-col", !activeConvId ? "hidden sm:flex" : "flex")}>
        {activeConv && activeStudent ? (
          <>
            {/* Thread header */}
            <div className="flex items-center justify-between border-b border-ink-200 px-4 py-3">
              <div className="flex items-center gap-3">
                <button
                  className="text-xs text-ink-400 sm:hidden"
                  onClick={() => setActiveConvId("")}
                >
                  ← Back
                </button>
                <StudentAvatar student={activeStudent} className="size-9" />
                <div>
                  <p className="text-sm font-semibold text-ink-900">{activeStudent.name}</p>
                <Link href={`/employer/student/${activeStudent.id}`} className="text-xs text-gold-600 hover:underline">
                  {p.viewStudentProfile}
                </Link>
              </div>
              </div>
              <button
                type="button"
                className="flex size-8 items-center justify-center rounded-md text-ink-400 hover:bg-ink-100"
                aria-label="Open conversation actions"
                onClick={() => toast.info("Conversation tools opened in demo mode.")}
              >
                <MoreHorizontal className="size-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
              {activeConv.messages.map((msg) => {
                const isEmployer = msg.senderType === "employer";
                return (
                  <div
                    key={msg.id}
                    className={cn("flex", isEmployer ? "justify-end" : "justify-start")}
                  >
                    {!isEmployer && (
                      <StudentAvatar student={activeStudent} className="mr-2 size-7 self-end" />
                    )}
                    <div
                      className={cn(
                        "max-w-[75%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                        isEmployer
                          ? "rounded-br-sm bg-ink-900 text-surface-0"
                          : "rounded-bl-sm bg-ink-100 text-ink-900",
                      )}
                    >
                      {msg.text}
                    </div>
                    {isEmployer && (
                      <EmployerLogo employer={currentEmployer} className="ml-2 size-7 self-end rounded-full" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Input bar */}
            <div className="border-t border-ink-200 px-4 py-3">
              <div className="mb-3 flex flex-wrap gap-2">
                {recruiterActions.map(({ label, icon: Icon }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => {
                      if (label === "Archive") toast.success("Conversation archived in this mock workspace.");
                      else setDraft(`${label}: `);
                    }}
                    className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-surface-0 px-3 py-1.5 text-xs font-semibold text-ink-600 transition hover:border-gold-300 hover:bg-gold-50 hover:text-ink-900"
                  >
                    <Icon className="size-3.5" aria-hidden="true" />
                    {label}
                  </button>
                ))}
              </div>
              <div className="mb-3 rounded-lg border border-gold-200 bg-gold-50/70 p-3">
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.16em] text-gold-700">
                    <Sparkles className="size-3.5" aria-hidden="true" />
                    Recruiter quick replies
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setDraft(
                        `Hi ${activeStudent.name.split(" ")[0]}, thanks for the detailed update. Based on your ${activeSignal?.roleFit ?? "role"} fit, could you share one short example of a tradeoff you made while building the project?`,
                      )
                    }
                    className="rounded-full bg-ink-900 px-3 py-1 text-xs font-semibold text-surface-0 transition hover:bg-ink-800"
                  >
                    Draft suggested reply
                  </button>
                </div>
                <p className="mb-2 text-[11px] text-ink-500">Prototype suggestion only; no external generation service is called.</p>
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply) => (
                    <button
                      key={reply.label}
                      type="button"
                      onClick={() => setDraft(reply.text)}
                      className="rounded-full bg-surface-0 px-3 py-1.5 text-xs font-medium text-ink-700 shadow-sm ring-1 ring-ink-100 transition hover:-translate-y-0.5 hover:text-ink-900 hover:ring-gold-200"
                    >
                      {reply.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="flex size-9 shrink-0 items-center justify-center rounded-md text-ink-400 hover:bg-ink-100"
                  aria-label="Attach file in demo"
                  onClick={() => toast.info("Attachment picker is a prototype action.")}
                >
                  <Paperclip className="size-4" />
                </button>
                <Input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  aria-label="Type a message"
                  placeholder={p.messagePlaceholder}
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      setDraft("");
                    }
                  }}
                />
                <Button
                  variant="primary"
                  size="icon-sm"
                  disabled={!draft.trim()}
                  onClick={() => {
                    setDraft("");
                    toast.success("Demo message sent for this prototype session.");
                  }}
                  aria-label="Send message"
                >
                  <Send className="size-4" />
                </Button>
              </div>
              <p className="mt-1.5 text-xs text-ink-400">{copy.messaging.employerReplyHint}</p>
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

      {activeStudent && activeSignal && activeRoleFit && (
        <aside className="hidden w-[320px] shrink-0 border-l border-ink-200 bg-ink-50/80 p-4 lg:block">
          <div className="rounded-xl border border-ink-200 bg-surface-0 p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <StudentAvatar student={activeStudent} className="size-12" />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-ink-900">{activeStudent.name}</p>
                <p className="truncate text-xs text-ink-400">{activeStudent.major}</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="rounded-lg bg-ink-50 p-3">
                <p className="text-[10px] uppercase tracking-[0.16em] text-ink-400">Match</p>
                <p className="mt-1 text-lg font-bold text-gold-700">{activeScore}%</p>
                <p className="text-[11px] text-ink-400">{activeTier} match</p>
              </div>
              <div className="rounded-lg bg-ink-50 p-3">
                <p className="text-[10px] uppercase tracking-[0.16em] text-ink-400">Stage</p>
                <p className="mt-1 text-sm font-bold text-ink-900">{activeSignal.stage}</p>
                <p className="text-[11px] text-ink-400">{activeSignal.status}</p>
              </div>
            </div>
            <div className="mt-4 space-y-3">
              {[
                ["Role fit", activeSignal.roleFit],
                ["Availability", activeStudent.availableFrom],
                ["Response", activeSignal.responseSpeed],
                ["Last activity", activeSignal.lastActivity],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-400">{label}</p>
                  <p className="mt-0.5 text-sm text-ink-800">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {activeStudent.skills.slice(0, 5).map((skill) => (
                <span key={skill} className="rounded-full bg-ink-100 px-2 py-0.5 text-[10px] font-medium text-ink-600">
                  {skill}
                </span>
              ))}
            </div>
            <div className="mt-4 rounded-lg border border-gold-200 bg-gold-50/70 p-3">
              <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-gold-700">
                <Flag className="size-3.5" aria-hidden="true" />
                Recruiter note
              </div>
              <p className="text-xs leading-5 text-ink-600">{activeSignal.note}</p>
            </div>
            <Button variant="primary" size="sm" className="mt-4 w-full" asChild>
              <Link href={`/employer/student/${activeStudent.id}`}>Open full dossier</Link>
            </Button>
          </div>
        </aside>
      )}
    </div>
  );
}
