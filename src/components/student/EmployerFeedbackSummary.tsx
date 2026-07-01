"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  CircleDot,
  FileText,
  Lightbulb,
  MessageSquare,
  NotebookPen,
  Quote,
  Reply,
  Sparkles,
  Star,
  Target,
  Users,
} from "lucide-react";
import { toast } from "sonner";

import { EmployerLogo } from "@/components/brand/EmployerLogo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { copy } from "@/lib/copy";
import type { EmployerFeedback } from "@/lib/extended-data/types";
import { employers } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const feedbackFilters = [
  "All",
  "Strong follow-up",
  "Interview-ready",
  "Technical",
  "Communication",
  "Needs improvement",
  "This event",
] as const;

type FeedbackFilter = (typeof feedbackFilters)[number];

type EmployerFeedbackSummaryProps = {
  feedback: EmployerFeedback[];
};

const sentimentStyles: Record<EmployerFeedback["sentiment"], string> = {
  "Very positive": "border-success/25 bg-success/10 text-success dark:text-success",
  Positive: "border-success/20 bg-success/10 text-success dark:text-success",
  Constructive: "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  "Needs follow-up": "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300",
};

const interestStyles: Record<EmployerFeedback["interestLevel"], string> = {
  "Strong follow-up": "border-gold-500/45 bg-gold-50 text-ink-900",
  "Interview-ready": "border-success/25 bg-success/10 text-success dark:text-success",
  "Worth monitoring": "border-aurora-cyan/25 bg-aurora-cyan/10 text-aurora-cyan dark:text-aurora-cyan",
  "Needs improvement": "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300",
};

const insightActions = [
  {
    id: "pin-chatbot",
    title: "Pin the multilingual chatbot as the first portfolio project",
    helper: "Lead with the evidence recruiters mentioned most often.",
  },
  {
    id: "technical-walkthrough",
    title: "Prepare a 5-minute technical walkthrough",
    helper: "Cover the fallback logic, testing method, and one product tradeoff.",
  },
  {
    id: "bilingual-support",
    title: "Add one example of bilingual user support",
    helper: "Show how language risk is identified, handled, and escalated.",
  },
];

function matchesFilter(item: EmployerFeedback, filter: FeedbackFilter) {
  if (filter === "All") return true;
  if (filter === "Strong follow-up") return item.interestLevel === filter;
  if (filter === "Interview-ready") return item.interestLevel === filter;
  if (filter === "Technical") return item.tags.includes("Technical");
  if (filter === "Communication") return item.tags.includes("Communication");
  if (filter === "Needs improvement") {
    return Boolean(item.improvementFocus?.length) || item.interestLevel === "Needs improvement";
  }
  return item.tags.includes("This event");
}

function ratingLabel(rating: number) {
  if (rating >= 4.8) return "Excellent";
  if (rating >= 4.5) return "Strong";
  if (rating >= 4) return "Positive";
  return "Developing";
}

export function EmployerFeedbackSummary({
  feedback,
}: EmployerFeedbackSummaryProps) {
  const p = copy.pages.student.dashboard;
  const [selectedFilter, setSelectedFilter] = useState<FeedbackFilter>("All");
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [addressedIds, setAddressedIds] = useState<Set<string>>(
    new Set(feedback.filter((item) => item.status === "addressed").map((item) => item.id)),
  );
  const [preparedIds, setPreparedIds] = useState<Set<string>>(new Set());
  const [notedIds, setNotedIds] = useState<Set<string>>(new Set());
  const [completedInsights, setCompletedInsights] = useState<Set<string>>(new Set());
  const [showAllFeedback, setShowAllFeedback] = useState(false);

  const filteredFeedback = useMemo(
    () => feedback.filter((item) => matchesFilter(item, selectedFilter)),
    [feedback, selectedFilter],
  );
  const displayedFeedback = showAllFeedback ? filteredFeedback : filteredFeedback.slice(0, 3);

  const averageRating = feedback.length
    ? feedback.reduce((total, item) => total + item.rating, 0) / feedback.length
    : 0;
  const interviewSignals = feedback.filter(
    (item) =>
      item.interestLevel === "Strong follow-up" ||
      item.interestLevel === "Interview-ready",
  ).length;

  const metrics = [
    {
      icon: Star,
      value: `${averageRating.toFixed(1)} / 5`,
      label: "Average recruiter rating",
      helper: "Average prototype score",
      accent: "text-gold-600",
    },
    {
      icon: Users,
      value: String(feedback.length),
      label: "Employers responded",
      helper: "Recruiters left feedback",
      accent: "text-sky-600",
    },
    {
      icon: BriefcaseBusiness,
      value: String(interviewSignals),
      label: "Interview signals",
      helper: "Strong follow-up signals",
      accent: "text-success",
    },
    {
      icon: BarChart3,
      value: "Technical portfolio",
      label: "Main strength",
      helper: "Most repeated positive theme",
      accent: "text-aurora-violet",
    },
  ];

  function toggleExpanded(id: string) {
    setExpandedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function markPrepared(item: EmployerFeedback) {
    setPreparedIds((current) => new Set(current).add(item.id));
    setExpandedIds((current) => new Set(current).add(item.id));
    toast.success("Suggested reply prepared for this prototype session.");
  }

  function addToNotes(item: EmployerFeedback) {
    setNotedIds((current) => new Set(current).add(item.id));
    toast.success(`${item.employerName} insight added to profile notes for this demo session.`);
  }

  function markAddressed(item: EmployerFeedback) {
    setAddressedIds((current) => new Set(current).add(item.id));
    toast.success("Feedback marked as addressed.");
  }

  function completeInsight(id: string) {
    setCompletedInsights((current) => new Set(current).add(id));
    toast.success("Career action marked complete for this prototype session.");
  }

  return (
    <section aria-labelledby="employer-feedback-heading" className="space-y-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-700">
              Career intelligence
            </p>
            <Badge variant="outline" className="text-[11px]">
              Prototype data
            </Badge>
          </div>
          <h2
            id="employer-feedback-heading"
            className="text-xl font-bold text-ink-900 sm:text-2xl"
          >
            {p.feedbackTitle}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-600">
            {p.feedbackSubtitle}
          </p>
        </div>
        <div className="flex max-w-md items-start gap-2 rounded-md border border-ink-200 bg-ink-50 px-3 py-2 text-xs leading-5 text-ink-500">
          <CircleDot className="mt-0.5 size-3.5 shrink-0 text-gold-600" aria-hidden="true" />
          <span>{p.feedbackPrototypeNote}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {metrics.map(({ icon: Icon, value, label, helper, accent }) => (
          <div
            key={label}
            className="min-w-0 rounded-lg border border-ink-200/85 bg-card p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p
                  className={cn(
                    "break-words font-bold text-ink-900",
                    label === "Main strength" ? "text-base leading-5" : "text-xl sm:text-2xl",
                  )}
                >
                  {value}
                </p>
                <p className="mt-1 text-xs font-semibold text-ink-700">{label}</p>
              </div>
              <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-ink-50">
                <Icon className={cn("size-4", accent)} aria-hidden="true" />
              </span>
            </div>
            <p className="mt-2 text-[11px] leading-4 text-ink-400">{helper}</p>
          </div>
        ))}
      </div>

      <fieldset>
        <legend className="sr-only">Filter recruiter feedback</legend>
        <div
          className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2"
          aria-label="Feedback filters"
        >
          {feedbackFilters.map((filter) => {
            const isActive = selectedFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                aria-pressed={isActive}
                onClick={() => {
                  setSelectedFilter(filter);
                  setShowAllFeedback(false);
                }}
                className={cn(
                  "min-h-10 shrink-0 rounded-full border px-4 text-xs font-semibold outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:transition-none",
                  isActive
                    ? "border-ink-900 bg-ink-900 text-surface-0 shadow-sm"
                    : "border-ink-200 bg-card text-ink-600 hover:-translate-y-0.5 hover:border-gold-500/60 hover:text-ink-900 motion-reduce:hover:translate-y-0",
                )}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="space-y-4" aria-live="polite">
        {filteredFeedback.length === 0 ? (
          <div className="rounded-lg border border-dashed border-ink-300 bg-card px-6 py-10 text-center">
            <FileText className="mx-auto size-6 text-ink-400" aria-hidden="true" />
            <p className="mt-3 text-sm font-semibold text-ink-900">
              No matching recruiter evaluations
            </p>
            <p className="mt-1 text-sm text-ink-500">{p.feedbackEmpty}</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => {
                setSelectedFilter("All");
                setShowAllFeedback(false);
              }}
            >
              View all feedback
            </Button>
          </div>
        ) : (
          displayedFeedback.map((item, index) => {
            const employer = employers.find((entry) => entry.id === item.employerId);
            if (!employer) return null;

            const isExpanded = expandedIds.has(item.id);
            const isAddressed = addressedIds.has(item.id);
            const isPrepared = preparedIds.has(item.id);
            const isNoted = notedIds.has(item.id);
            const roundedRating = Math.round(item.rating);

            return (
              <article
                key={item.id}
                className={cn(
                  "group relative overflow-hidden rounded-lg border bg-card shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0",
                  index === 0
                    ? "border-gold-500/55 shadow-[0_12px_32px_rgba(212,166,19,0.12)]"
                    : "border-ink-200/90 hover:border-gold-500/35",
                )}
                style={{ transitionDelay: `${Math.min(index * 35, 140)}ms` }}
              >
                {index === 0 ? (
                  <div className="absolute inset-x-0 top-0 h-0.5 bg-gold-500" />
                ) : null}

                <div className="p-4 sm:p-5 lg:p-6">
                  <header className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex min-w-0 items-start gap-3">
                      <Link
                        href={`/student/companies/${employer.id}`}
                        aria-label={`View ${employer.name} company profile`}
                        className="shrink-0 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <EmployerLogo employer={employer} className="size-11" />
                      </Link>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <Link
                            href={`/student/companies/${employer.id}`}
                            className="font-semibold text-ink-900 outline-none hover:text-gold-700 focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            {item.employerName}
                          </Link>
                          {item.status === "new" && !isAddressed ? (
                            <Badge variant="gold">New</Badge>
                          ) : null}
                          {isAddressed ? (
                            <Badge variant="success">
                              <Check className="size-3" aria-hidden="true" />
                              Addressed
                            </Badge>
                          ) : null}
                        </div>
                        <p className="mt-1 text-sm text-ink-600">{item.recruiterTeam}</p>
                        <p className="mt-1 text-xs text-ink-400">
                          {item.eventName}
                          {item.eventDate ? ` · ${item.eventDate}` : ""}
                          {" · "}
                          <time dateTime={item.createdAt} className="whitespace-nowrap">
                            {item.createdLabel}
                          </time>
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-start gap-2 lg:items-end">
                      <div
                        className="flex items-center gap-3 rounded-md border border-gold-500/30 bg-gold-50 px-3 py-2"
                        aria-label={`Rating ${item.rating.toFixed(1)} out of 5, ${ratingLabel(item.rating)}`}
                      >
                        <div>
                          <p className="text-sm font-bold text-ink-900">
                            {item.rating.toFixed(1)}{" "}
                            <span className="font-semibold text-ink-600">
                              {ratingLabel(item.rating)}
                            </span>
                          </p>
                          <div className="mt-0.5 flex gap-0.5" aria-hidden="true">
                            {Array.from({ length: 5 }).map((_, starIndex) => (
                              <Star
                                key={starIndex}
                                className={cn(
                                  "size-3.5",
                                  starIndex < roundedRating
                                    ? "fill-gold-500 text-gold-600"
                                    : "fill-transparent text-ink-300",
                                )}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 lg:justify-end">
                        <Badge
                          variant="outline"
                          className={cn("border", sentimentStyles[item.sentiment])}
                        >
                          {item.sentiment}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={cn("border", interestStyles[item.interestLevel])}
                        >
                          {item.interestLevel}
                        </Badge>
                      </div>
                    </div>
                  </header>

                  <div className="mt-5 rounded-md border border-ink-200/80 border-l-2 border-l-gold-500 bg-muted p-4">
                    <Quote className="size-4 fill-gold-500/25 text-gold-600" aria-hidden="true" />
                    <blockquote className="mt-2 text-sm leading-6 text-ink-700">
                      {item.feedbackQuote}
                    </blockquote>
                  </div>

                  <div className="mt-5">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink-400">
                      Recruiter summary
                    </p>
                    <p className="mt-2 text-sm leading-6 text-ink-700">
                      {item.recruiterSummary}
                    </p>
                  </div>

                  <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    <div>
                      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-ink-500">
                        <Sparkles className="size-3.5 text-gold-600" aria-hidden="true" />
                        Key strengths
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {item.keyStrengths.map((strength) => (
                          <Badge key={strength} variant="secondary">
                            {strength}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-ink-500">
                        <FileText className="size-3.5 text-sky-600" aria-hidden="true" />
                        Evidence mentioned
                      </p>
                      <ul className="mt-2 space-y-1.5">
                        {item.evidenceMentioned.map((evidence) => (
                          <li
                            key={evidence}
                            className="flex gap-2 text-xs leading-5 text-ink-600"
                          >
                            <CircleDot
                              className="mt-1 size-3 shrink-0 text-gold-600"
                              aria-hidden="true"
                            />
                            {evidence}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-ink-500">
                        <Target className="size-3.5 text-amber-600" aria-hidden="true" />
                        Improvement focus
                      </p>
                      {item.improvementFocus?.length ? (
                        <ul className="mt-2 space-y-1.5">
                          {item.improvementFocus.map((focus) => (
                            <li
                              key={focus}
                              className="flex gap-2 text-xs leading-5 text-ink-600"
                            >
                              <ArrowRight
                                className="mt-1 size-3 shrink-0 text-amber-600"
                                aria-hidden="true"
                              />
                              {focus}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="mt-2 text-xs leading-5 text-ink-500">
                          No immediate concern noted.
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-5 rounded-md border border-gold-500/30 bg-accent p-4">
                    <div className="flex gap-3">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-gold-500 text-ink-900">
                        <Lightbulb className="size-4" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.12em] text-gold-700">
                          Recommended next step
                        </p>
                        <p className="mt-1 text-sm font-medium leading-6 text-ink-900">
                          {item.recommendedNextStep}
                        </p>
                      </div>
                    </div>
                  </div>

                  {isExpanded ? (
                    <div
                      id={`feedback-details-${item.id}`}
                      className="mt-5 grid gap-4 border-t border-ink-200 pt-5 md:grid-cols-2"
                    >
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.12em] text-ink-400">
                          Related project
                        </p>
                        <p className="mt-2 text-sm font-semibold text-ink-900">
                          {item.relatedProject ?? "Portfolio overview"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.12em] text-ink-400">
                          Suggested reply
                        </p>
                        <p className="mt-2 text-sm leading-6 text-ink-600">
                          {isPrepared
                            ? item.suggestedReply
                            : "Choose Prepare reply to reveal a tailored prototype response."}
                        </p>
                      </div>
                    </div>
                  ) : null}
                </div>

                <footer className="flex flex-col gap-3 border-t border-ink-200 bg-muted px-4 py-3 sm:px-5 lg:flex-row lg:items-center lg:justify-between lg:px-6">
                  <button
                    type="button"
                    onClick={() => toggleExpanded(item.id)}
                    aria-expanded={isExpanded}
                    aria-controls={`feedback-details-${item.id}`}
                    className="inline-flex min-h-10 items-center gap-2 self-start rounded-md px-2 text-xs font-semibold text-ink-600 outline-none hover:text-ink-900 focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {isExpanded ? (
                      <ChevronUp className="size-4" aria-hidden="true" />
                    ) : (
                      <ChevronDown className="size-4" aria-hidden="true" />
                    )}
                    {isExpanded ? "Hide details" : "View full evaluation"}
                  </button>
                  <div className="grid grid-cols-1 gap-2 sm:flex sm:flex-wrap lg:justify-end">
                    <Button variant="ghost" size="sm" asChild>
                      <Link
                        href="/student/messages"
                        onClick={() => toast.info("Opening related message thread.")}
                      >
                        <MessageSquare className="size-4" aria-hidden="true" />
                        View message
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => markPrepared(item)}
                    >
                      {isPrepared ? (
                        <Check className="size-4" aria-hidden="true" />
                      ) : (
                        <Reply className="size-4" aria-hidden="true" />
                      )}
                      {isPrepared ? "Reply prepared" : "Prepare reply"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addToNotes(item)}
                    >
                      {isNoted ? (
                        <Check className="size-4" aria-hidden="true" />
                      ) : (
                        <NotebookPen className="size-4" aria-hidden="true" />
                      )}
                      {isNoted ? "Added to notes" : "Add to profile notes"}
                    </Button>
                    <Button
                      variant={isAddressed ? "ghost" : "default"}
                      size="sm"
                      disabled={isAddressed}
                      onClick={() => markAddressed(item)}
                    >
                      <CheckCircle2 className="size-4" aria-hidden="true" />
                      {isAddressed ? "Addressed" : "Mark as addressed"}
                    </Button>
                  </div>
                </footer>
              </article>
            );
          })
        )}
        {filteredFeedback.length > displayedFeedback.length ? (
          <div className="flex justify-center pt-1">
            <Button type="button" variant="outline" onClick={() => setShowAllFeedback(true)}>
              Show {filteredFeedback.length - displayedFeedback.length} more evaluations
            </Button>
          </div>
        ) : showAllFeedback && filteredFeedback.length > 3 ? (
          <div className="flex justify-center pt-1">
            <Button type="button" variant="ghost" onClick={() => setShowAllFeedback(false)}>
              Show fewer evaluations
            </Button>
          </div>
        ) : null}
      </div>

      <div className="overflow-hidden rounded-lg border border-gold-500/35 bg-card shadow-[0_16px_42px_rgba(212,166,19,0.1)]">
        <div className="grid gap-6 p-5 lg:grid-cols-[0.9fr_1.1fr] lg:p-6">
          <div>
            <div className="flex size-10 items-center justify-center rounded-md bg-gold-500 text-ink-900">
              <Lightbulb className="size-5" aria-hidden="true" />
            </div>
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-gold-700">
              Career pattern
            </p>
            <h3 className="mt-1 text-lg font-bold text-ink-900">
              What this feedback means
            </h3>
            <p className="mt-3 text-sm leading-6 text-ink-600">
              Recruiters consistently noticed your technical portfolio and
              cross-cultural product thinking. Your strongest signal is practical
              problem-solving for multilingual student services. The main improvement
              area is Mandarin confidence in client-facing situations. Prioritize a
              short technical walkthrough and make the chatbot fallback flow easier to
              find in your portfolio.
            </p>
          </div>

          <div className="divide-y divide-ink-200 rounded-lg border border-ink-200">
            {insightActions.map((action, index) => {
              const isComplete = completedInsights.has(action.id);
              return (
                <div
                  key={action.id}
                  className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 gap-3">
                    <span
                      className={cn(
                        "flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                        isComplete
                          ? "bg-success text-white"
                          : "bg-gold-50 text-gold-700 ring-1 ring-gold-500/30",
                      )}
                    >
                      {isComplete ? (
                        <Check className="size-4" aria-hidden="true" />
                      ) : (
                        index + 1
                      )}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-ink-900">
                        {action.title}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-ink-500">
                        {action.helper}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant={isComplete ? "ghost" : "outline"}
                    size="sm"
                    disabled={isComplete}
                    onClick={() => completeInsight(action.id)}
                    className="sm:shrink-0"
                  >
                    {isComplete ? "Completed" : "Mark complete"}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
