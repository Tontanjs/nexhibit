"use client";

import { useState } from "react";
import { CheckCircle2, Lock, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { copy } from "@/lib/copy";
import { currentStudent } from "@/lib/current-user";
import { cn } from "@/lib/utils";

const steps = [
  copy.pages.student.onboarding.stepVerify,
  copy.pages.student.onboarding.stepCustomize,
  copy.pages.student.onboarding.stepDone,
];

type PrivacyState = {
  gpa: boolean;
  courses: boolean;
  awards: boolean;
  ranking: boolean;
  disciplinary: boolean;
  activities: boolean;
  volunteer: boolean;
  attendance: boolean;
};

export default function OnboardingPage() {
  const [privacy, setPrivacy] = useState<PrivacyState>({
    gpa: true,
    courses: true,
    awards: true,
    ranking: true,
    disciplinary: false,
    activities: true,
    volunteer: true,
    attendance: false,
  });

  function toggle(key: keyof PrivacyState) {
    setPrivacy((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  const p = copy.pages.student.onboarding;

  return (
    <div className="min-h-screen bg-surface-50 py-12 px-4">
      <div className="mx-auto max-w-[720px]">
        {/* Progress bar */}
        <div className="mb-10">
          <div className="flex items-center justify-between gap-2">
            {steps.map((step, i) => (
              <div key={step} className="flex flex-1 flex-col items-center gap-1.5">
                <div
                  className={cn(
                    "flex size-8 items-center justify-center rounded-full text-xs font-bold",
                    i === 0
                      ? "bg-success text-surface-0"
                      : i === 1
                        ? "bg-gold-500 text-ink-900"
                        : "bg-ink-200 text-ink-500",
                  )}
                >
                  {i === 0 ? <CheckCircle2 className="size-4" /> : i + 1}
                </div>
                <span
                  className={cn(
                    "text-xs font-medium",
                    i === 1 ? "text-ink-900" : "text-ink-400",
                  )}
                >
                  {step}
                </span>
              </div>
            ))}
          </div>
          <div className="relative mt-3 h-1.5 rounded-full bg-ink-200">
            <div className="absolute left-0 top-0 h-full w-1/2 rounded-full bg-gold-500" />
          </div>
        </div>

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-success/10">
            <CheckCircle2 className="size-8 text-success" />
          </div>
          <h1 className="text-2xl font-bold text-ink-900">{p.heading}</h1>
          <p className="mt-2 text-ink-600">{p.subheading}</p>
        </div>

        {/* Section 1: Personal Information */}
        <Card className="mb-4">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">{p.section1Title}</CardTitle>
              <span className="flex items-center gap-1.5 text-xs font-medium text-ink-500">
                <Lock className="size-3" />
                {p.section1Caption}
              </span>
            </div>
            <CardDescription className="text-xs">{p.section1AlwaysVisible}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {["Name", "Nationality", "Year", "Major", "Profile Photo"].map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-md bg-ink-50 px-3 py-2">
                  <div className="size-1.5 rounded-full bg-success" />
                  <span className="text-xs font-medium text-ink-700">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Academic Data */}
        <Card className="mb-4">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">{p.section2Title}</CardTitle>
            <CardDescription className="text-xs">Auto-imported from ZJUT</CardDescription>
          </CardHeader>
          <CardContent className="space-y-0">
            {[
              {
                key: "gpa" as const,
                label: p.gpaLabel,
                value: `${currentStudent.gpa.toFixed(1)} / 4.0`,
                helper: p.gpaHelper,
              },
              {
                key: "courses" as const,
                label: p.coursesLabel,
                value: `${currentStudent.coursesCompleted} courses`,
                helper: p.coursesHelper,
              },
              {
                key: "awards" as const,
                label: p.awardsLabel,
                value: `${currentStudent.awards.length} awards`,
                helper: p.awardsHelper,
              },
              {
                key: "ranking" as const,
                label: p.rankingLabel,
                value: currentStudent.classRanking,
                helper: p.rankingHelper,
              },
              {
                key: "disciplinary" as const,
                label: p.disciplinaryLabel,
                value: "Clean",
                helper: p.disciplinaryHelper,
              },
            ].map((row, i, arr) => (
              <div key={row.key}>
                <PrivacyRow
                  label={row.label}
                  value={row.value}
                  helper={row.helper}
                  checked={privacy[row.key]}
                  onToggle={() => toggle(row.key)}
                />
                {i < arr.length - 1 && <Separator />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Section 3: Behavioral Data */}
        <Card className="mb-8">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">{p.section3Title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-0">
            {[
              {
                key: "activities" as const,
                label: p.activitiesLabel,
                value: `${currentStudent.activities.length} activities`,
                helper: p.activitiesHelper,
              },
              {
                key: "volunteer" as const,
                label: p.volunteerLabel,
                value: "3 records",
                helper: p.volunteerHelper,
              },
              {
                key: "attendance" as const,
                label: p.attendanceLabel,
                value: "94%",
                helper: p.attendanceHelper,
              },
            ].map((row, i, arr) => (
              <div key={row.key}>
                <PrivacyRow
                  label={row.label}
                  value={row.value}
                  helper={row.helper}
                  checked={privacy[row.key]}
                  onToggle={() => toggle(row.key)}
                />
                {i < arr.length - 1 && <Separator />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="mb-6 text-center text-sm text-ink-500">{p.privacyNote}</p>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button variant="secondary" asChild>
            <a href="/student/dashboard">{p.skipButton}</a>
          </Button>
          <Button variant="primary" asChild>
            <a href="/student/dashboard">
              {p.saveButton}
              <ArrowRight className="size-4" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

function PrivacyRow({
  label,
  value,
  helper,
  checked,
  onToggle,
}: {
  label: string;
  value: string;
  helper: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 hover:bg-ink-50 rounded-md px-2 -mx-2 transition-colors">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-ink-900">{label}</span>
          <span className="text-sm text-ink-500">{value}</span>
          <span
            className={cn(
              "size-1.5 shrink-0 rounded-full",
              checked ? "bg-success" : "bg-ink-300",
            )}
          />
        </div>
        <p className="mt-0.5 text-xs text-ink-400">{helper}</p>
      </div>
      <Switch
        checked={checked}
        onCheckedChange={onToggle}
        aria-label={`Toggle ${label}`}
        className="mt-0.5 shrink-0"
      />
    </div>
  );
}
