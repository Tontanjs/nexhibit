"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  Camera,
  CheckCircle2,
  Download,
  Edit2,
  ExternalLink,
  Eye,
  FileText,
  ImageUp,
  Link2,
  LockKeyhole,
  Plus,
  ShieldCheck,
  Trophy,
  Video,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";

import { StudentAvatar } from "@/components/brand/StudentAvatar";
import { VerifiedBadge } from "@/components/brand/VerifiedBadge";
import { ReadinessChecklist } from "@/components/product/readiness-checklist";
import {
  EmployerPreviewBanner,
  EmployerPreviewField,
  PitchAndVerifyTab,
  ProfileModeControl,
  VisibilityControl,
} from "@/components/student/ProfileDepthPanel";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { copy } from "@/lib/copy";
import { currentStudent } from "@/lib/current-user";
import { cn } from "@/lib/utils";
import { formatGPA, formatHSK } from "@/lib/utils-lib/formatters";

const p = copy.pages.student.profile;

const tabs = [
  { value: "personal", label: p.tabPersonal },
  { value: "pitch", label: "Pitch & Verify" },
  { value: "academic", label: p.tabAcademic },
  { value: "portfolio", label: p.tabPortfolio },
] as const;

type ProfileTab = (typeof tabs)[number]["value"];

const mockCourses = [
  "Software Engineering Principles",
  "Database Systems and Design",
  "Human-Computer Interaction",
  "Algorithms and Complexity",
  "Cross-Cultural Product Design",
];

const mockFiles = [
  { icon: FileText, name: "Resume.pdf", meta: "Uploaded May 2026", actions: ["Download", "Replace"] },
  { icon: Video, name: "Demo video", meta: "YouTube link", actions: ["Open", "Remove"] },
  { icon: Link2, name: "Personal portfolio", meta: "yourdomain.com", actions: ["Open", "Remove"] },
];

const gradients = [
  "from-aurora-blue to-aurora-violet",
  "from-aurora-purple to-aurora-violet",
  "from-success to-aurora-cyan",
];

const projectEvidenceByTitle: Record<string, {
  problem: string;
  solution: string;
  role: string;
  evidence: string;
  outcome: string;
  learning: string;
  talkingPoint: string;
}> = {
  "ZJUT Campus Navigator": {
    problem: "New international students lose time and confidence when campus locations are difficult to identify across languages.",
    solution: "A bilingual, mobile-first route finder for classrooms, canteens, and campus transit gates.",
    role: "Product engineer · research, interaction design, and React Native implementation",
    evidence: "Task-flow prototype, bilingual labels, route usability notes, and component architecture",
    outcome: "Reduced the demo’s common location task from six steps to three.",
    learning: "Translation is not enough; landmarks and recovery states matter just as much as labels.",
    talkingPoint: "Explain how one usability observation changed the navigation hierarchy.",
  },
  "Scholarship Deadline Tracker": {
    problem: "Important scholarship notices arrive across several channels with inconsistent deadlines and document requirements.",
    solution: "A priority dashboard that turns notices into dated actions, requirements, and reminders.",
    role: "Frontend lead · information architecture, Next.js UI, and reminder-flow prototyping",
    evidence: "Notice-to-action mapping, responsive dashboard, and edge-case checklist",
    outcome: "Consolidated five mock notice formats into one consistent task model.",
    learning: "The most useful automation is transparent about source, deadline, and required proof.",
    talkingPoint: "Show how the dashboard prevents a student from missing one required document.",
  },
  "Dorm Maintenance Chatbot": {
    problem: "Students struggle to describe repair issues in Mandarin and staff receive incomplete handoff details.",
    solution: "A Mandarin-English reporting assistant with structured issue capture and human escalation.",
    role: "Product engineer · conversation design, Python prototype, and failure-case testing",
    evidence: "Fallback flow, escalation test cases, prompt notes, and bilingual handoff examples",
    outcome: "Produced a complete mock maintenance handoff in under two minutes.",
    learning: "A trustworthy assistant must make uncertainty and escalation visible.",
    talkingPoint: "Walk through one ambiguous request and the rule that triggers a human handoff.",
  },
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<ProfileTab>("personal");
  const [headline, setHeadline] = useState(currentStudent.headline);
  const [bio, setBio] = useState(currentStudent.bio);
  const [previewMode, setPreviewMode] = useState(false);
  const [saveState, setSaveState] = useState<"saved" | "saving">("saved");
  const firstEdit = useRef(true);

  const headlineMax = 100;
  const bioMax = 280;
  const languages = useMemo(
    () =>
      [
        `English (${currentStudent.englishLevel})`,
        currentStudent.hsk ? `Mandarin (HSK ${currentStudent.hsk})` : null,
        ...currentStudent.otherLanguages,
      ].filter(Boolean) as string[],
    [],
  );

  useEffect(() => {
    if (firstEdit.current) {
      firstEdit.current = false;
      return undefined;
    }

    setSaveState("saving");
    const id = window.setTimeout(() => {
      setSaveState("saved");
      toast.success(copy.toasts.profileSaved);
    }, 650);

    return () => window.clearTimeout(id);
  }, [bio, headline]);

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8">
      <Reveal>
        <div className="mb-6 overflow-hidden rounded-lg border border-ink-200 bg-ink-900 p-5 text-surface-0 shadow-2xl shadow-ink-900/10">
          <p className="text-xs font-semibold uppercase tracking-wide text-gold-400">{copy.status.profileLive}</p>
          <h1 className="mt-2 text-2xl font-bold text-surface-0">{p.heading}</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-300">{copy.helperText.portfolioUpload}</p>
        </div>
      </Reveal>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        <aside className="w-full shrink-0 lg:sticky lg:top-[145px] lg:w-[280px]">
          <Card className="overflow-hidden">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="group relative">
                  <span className="absolute -inset-2 rounded-full border border-dashed border-gold-500/70 opacity-0 transition group-hover:opacity-100 motion-safe:group-hover:animate-spin" />
                  <StudentAvatar student={currentStudent} className="relative size-20" />
                </div>
                <h2 className="mt-4 text-base font-bold text-ink-900">{currentStudent.name}</h2>
                <p className="text-sm text-ink-500">{currentStudent.major}</p>
                <VerifiedBadge className="mt-2" />
              </div>
              <ProfileModeControl />

              <Separator className="my-5" />

              <div className="flex flex-wrap justify-center gap-1.5">
                {currentStudent.skills.slice(0, 4).map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.32, delay: index * 0.04 }}
                  >
                    <Badge variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  </motion.span>
                ))}
              </div>

              <Separator className="my-5" />

              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-ink-700">{p.sidebarStrengthLabel}</span>
                  <span className="text-2xl font-black text-ink-900">
                    <CountUp value={currentStudent.profileStrength} suffix="%" />
                  </span>
                </div>
                <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-ink-200">
                  <motion.div
                    className="h-full rounded-full bg-[linear-gradient(90deg,#F5C518,#F8D547,#F5C518)] bg-[length:220%_100%]"
                    initial={{ width: 0, backgroundPosition: "0% 50%" }}
                    animate={{ width: `${currentStudent.profileStrength}%`, backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                    transition={{
                      width: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
                      backgroundPosition: { duration: 4, repeat: Infinity, ease: "linear" },
                    }}
                  />
                </div>
                <motion.p
                  className="mt-2 text-sm text-ink-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1 }}
                >
                  {currentStudent.profileStrength >= 90 ? "Excellent profile" : currentStudent.profileStrength >= 70 ? "Good profile" : "Keep building"}
                </motion.p>
              </div>
            </CardContent>
          </Card>
          <ReadinessChecklist
            title="Profile strength checklist"
            className="mt-4"
            items={[
              { label: "Add demo profile photo", complete: true },
              { label: "Add 2 portfolio projects", complete: currentStudent.projects.length >= 2 },
              { label: "Confirm privacy settings", complete: true },
              { label: "Add preferred locations", complete: currentStudent.preferredLocations.length > 0 },
              { label: "Preview as employer", complete: previewMode },
              { label: "Generate QR badge", complete: true },
              { label: "Prepare event pitch", complete: false },
            ]}
          />
          <div className="mt-4 rounded-xl border border-gold-200 bg-gold-50/70 p-4">
            <p className="text-sm font-semibold text-ink-900">Employer preview quality</p>
            <div className="mt-3 space-y-2 text-xs leading-5 text-ink-700">
              <p><span className="font-semibold">First signal:</span> {currentStudent.headline}</p>
              <p><span className="font-semibold">Strongest project:</span> {currentStudent.projects[0]?.title}</p>
              <p><span className="font-semibold">Suggested improvement:</span> Add a 2-minute event pitch summary.</p>
            </div>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="mb-6 flex w-full gap-1 overflow-x-auto rounded-lg bg-ink-100 p-1">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                type="button"
                className={cn(
                  "relative min-h-10 flex-1 whitespace-nowrap rounded-md px-3 py-2 text-sm font-semibold transition",
                  activeTab === tab.value ? "text-ink-900" : "text-ink-500 hover:text-ink-900",
                )}
                onClick={() => setActiveTab(tab.value)}
              >
                {activeTab === tab.value ? (
                  <motion.span
                    layoutId="profile-tab-underline"
                    className="absolute inset-0 rounded-md bg-surface-0 shadow-sm"
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  />
                ) : null}
                <span className="relative">{tab.label}</span>
              </button>
            ))}
            <button
              type="button"
              className="relative min-h-10 flex-1 whitespace-nowrap rounded-md px-3 py-2 text-sm font-semibold text-ink-500 transition hover:text-ink-900"
              onClick={() => setPreviewMode(true)}
            >
              <span className="relative inline-flex items-center gap-1.5">
                <Eye className="size-3.5" />
                {p.tabPreview}
              </span>
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "personal" ? (
              <motion.div key="personal" className="space-y-6" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                <PersonalTab
                  headline={headline}
                  setHeadline={setHeadline}
                  headlineMax={headlineMax}
                  bio={bio}
                  setBio={setBio}
                  bioMax={bioMax}
                  languages={languages}
                  saveState={saveState}
                />
              </motion.div>
            ) : null}
            {activeTab === "academic" ? (
              <motion.div key="academic" className="space-y-4" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                <AcademicTab />
              </motion.div>
            ) : null}
            {activeTab === "pitch" ? (
              <motion.div key="pitch" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                <PitchAndVerifyTab />
              </motion.div>
            ) : null}
            {activeTab === "portfolio" ? (
              <motion.div key="portfolio" className="space-y-6" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                <PortfolioTab />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {previewMode ? <EmployerPreviewModal onBack={() => setPreviewMode(false)} /> : null}
      </AnimatePresence>
    </div>
  );
}

function counterClass(remaining: number) {
  return remaining <= 0 ? "text-error" : remaining <= 20 ? "text-gold-600" : "text-ink-400";
}

function PersonalTab({
  headline,
  setHeadline,
  headlineMax,
  bio,
  setBio,
  bioMax,
  languages,
  saveState,
}: {
  headline: string;
  setHeadline: (value: string) => void;
  headlineMax: number;
  bio: string;
  setBio: (value: string) => void;
  bioMax: number;
  languages: string[];
  saveState: "saved" | "saving";
}) {
  const [photoFileName, setPhotoFileName] = useState<string | null>(null);
  const [photoConsent, setPhotoConsent] = useState(true);

  return (
    <>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold">
            <Camera className="size-4 text-gold-600" aria-hidden="true" />
            Profile photo
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-5 lg:grid-cols-[auto,1fr] lg:items-start">
          <div className="flex items-center gap-4 lg:block lg:text-center">
            <StudentAvatar student={currentStudent} className="size-20 border-2 border-gold-400" />
            <div className="lg:mt-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-2.5 py-1 text-xs font-bold text-success">
                <CheckCircle2 className="size-3.5" aria-hidden="true" />
                Photo ready
              </span>
              <p className="mt-1 text-xs text-ink-400">512px WebP demo asset</p>
            </div>
          </div>

          <div className="min-w-0 space-y-4">
            <div className="rounded-lg border border-ink-200 bg-ink-50 p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-ink-900">Use a profile-ready student headshot</p>
                  <p className="mt-1 text-xs leading-5 text-ink-500">
                    Square JPG, PNG, or WebP. Clear face, neutral background, no group photos, up to 5MB.
                  </p>
                </div>
                <input
                  id="profile-photo-upload"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="sr-only"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (!file) return;

                    setPhotoFileName(file.name);
                    toast.success("Photo selected for this demo preview.");
                  }}
                />
                <label
                  htmlFor="profile-photo-upload"
                  className="inline-flex min-h-10 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md bg-gold-500 px-4 py-2 text-sm font-semibold text-ink-900 shadow-sm shadow-gold-500/25 transition hover:-translate-y-0.5 hover:bg-gold-600 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/30"
                >
                  <ImageUp className="size-4" aria-hidden="true" />
                  Upload photo
                </label>
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                {[
                  ["Review concept", "A live deployment could add staff review"],
                  ["Protected", "Visible in the employer demo only"],
                  ["Replaceable", "Students can update or remove it"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-md border border-ink-200 bg-surface-0 p-3">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-ink-400">{label}</p>
                    <p className="mt-1 text-xs leading-5 text-ink-600">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-gold-200 bg-gold-50/80 p-3">
              <input
                type="checkbox"
                checked={photoConsent}
                onChange={(event) => setPhotoConsent(event.target.checked)}
                className="mt-1 accent-gold-500"
              />
              <span className="text-xs leading-5 text-ink-700">
                I consent to show this profile photo in the NEXHIBIT demo and understand it can be replaced or removed before employer preview.
              </span>
            </label>

            <div className="flex flex-col gap-2 rounded-lg border border-ink-200 bg-surface-0 p-3 text-xs text-ink-500 sm:flex-row sm:items-center sm:justify-between">
              <span className="inline-flex min-w-0 items-center gap-2">
                <LockKeyhole className="size-3.5 shrink-0 text-ink-400" aria-hidden="true" />
                <span className="truncate">
                  {photoFileName ? `${photoFileName} · selected locally` : "Current mock photo is used for prototype display"}
                </span>
              </span>
              <span className={cn("font-semibold", photoConsent ? "text-success" : "text-error")}>
                {photoConsent ? "Consent recorded" : "Consent required"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-1.5">
        <div className="flex items-center justify-between gap-2">
          <Label htmlFor="display-name">{copy.forms.labels.fullName}</Label>
          <VisibilityControl field="name" compact />
        </div>
        <Input id="display-name" defaultValue={currentStudent.name} className="focus-visible:border-gold-500 focus-visible:ring-gold-500/20" />
      </div>

      <div className="grid gap-1.5">
        <div className="flex items-center justify-between gap-2">
          <Label htmlFor="headline">{copy.forms.labels.headline}</Label>
          <VisibilityControl field="headline" compact />
        </div>
        <Input
          id="headline"
          value={headline}
          maxLength={headlineMax}
          onChange={(event) => setHeadline(event.target.value)}
          placeholder={copy.forms.placeholders.headline}
          className="focus-visible:border-gold-500 focus-visible:ring-gold-500/20"
        />
        <p className={cn("text-right text-xs", counterClass(headlineMax - headline.length))}>
          {headlineMax - headline.length} {p.headlineCounter}
        </p>
      </div>

      <div className="grid gap-1.5">
        <div className="flex items-center justify-between gap-2">
          <Label htmlFor="bio">{copy.forms.labels.bio}</Label>
          <VisibilityControl field="bio" compact />
        </div>
        <Textarea
          id="bio"
          rows={4}
          value={bio}
          maxLength={bioMax}
          onChange={(event) => setBio(event.target.value)}
          placeholder={copy.forms.placeholders.bio}
          className="focus-visible:border-gold-500 focus-visible:ring-gold-500/20"
        />
        <p className={cn("text-right text-xs", counterClass(bioMax - bio.length))}>
          {bioMax - bio.length} {p.bioCounter}
        </p>
      </div>

      <div className="grid gap-2">
        <div className="flex items-center justify-between gap-2">
          <Label>Languages</Label>
          <VisibilityControl field="languages" compact />
        </div>
        <div className="flex flex-wrap gap-2">
          {languages.map((lang) => (
            <motion.span key={lang} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
              <Badge variant="secondary" className="gap-1.5 pr-1.5 text-sm">
                {lang}
                <button
                  type="button"
                  className="ml-1 rounded-full p-0.5 hover:bg-ink-200"
                  aria-label={`Remove ${lang}`}
                  onClick={() => toast.success(`${lang} removed for this prototype session.`)}
                >
                  <X className="size-3" />
                </button>
              </Badge>
            </motion.span>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-7 text-xs"
            onClick={() => toast.info("Language editor opened in demo mode.")}
          >
            <Plus className="size-3" />
            {p.addLanguage}
          </Button>
        </div>
      </div>

      <div className="grid gap-2">
        <Label>{p.contactPreferenceLabel}</Label>
        <div className="flex flex-col gap-2">
          {[p.contactInApp, p.contactInAppEmail, p.contactAll].map((opt) => (
            <label key={opt} className="flex cursor-pointer items-center gap-2.5">
              <input type="radio" name="contact" className="accent-gold-500" defaultChecked={opt === p.contactInApp} />
              <span className="text-sm text-ink-800">{opt}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-end gap-3 sm:flex-row sm:justify-between">
        <span className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-surface-0 px-3 py-1 text-xs font-semibold text-ink-500">
          <span className={cn("size-1.5 rounded-full", saveState === "saving" ? "animate-pulse bg-gold-500" : "bg-success")} />
          {saveState === "saving" ? "Saving..." : "Saved 2s ago"}
        </span>
        <Button variant="primary" onClick={() => toast.success(copy.toasts.profileSaved)}>
          {p.saveSection}
        </Button>
      </div>
    </>
  );
}

function AcademicTab() {
  return (
    <>
      <div className="flex items-center gap-2 rounded-lg border border-gold-200 bg-gold-50 px-3 py-2">
        <ShieldCheck className="size-4 shrink-0 text-gold-600" />
        <span className="text-sm text-ink-700">{p.syncedLabel} — read-only. Toggle visibility in Privacy settings.</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">{copy.forms.labels.gpa}</p>
            <p className="mt-1 text-3xl font-bold text-ink-900">
              <CountUp value={Number(formatGPA(currentStudent.gpa))} format={{ minimumFractionDigits: 1, maximumFractionDigits: 1 }} />
            </p>
            <p className="text-sm text-ink-500">out of 4.0</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Courses completed</p>
            <p className="mt-1 text-3xl font-bold text-ink-900">
              <CountUp value={currentStudent.coursesCompleted} />
            </p>
            <p className="text-sm text-ink-500">mock academic record fields</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Courses completed ({currentStudent.coursesCompleted})</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {mockCourses.map((course, index) => (
              <motion.li
                key={course}
                className="flex items-center gap-2 text-sm text-ink-700"
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <span className="size-1.5 shrink-0 rounded-full bg-ink-300" />
                {course}
              </motion.li>
            ))}
            <li className="text-xs text-ink-400">+{currentStudent.coursesCompleted - mockCourses.length} more courses</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Awards & Recognition</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentStudent.awards.map((award) => (
            <div key={award.title} className="group flex gap-3">
              <Trophy className="mt-0.5 size-4 shrink-0 text-gold-500 transition-transform duration-500 group-hover:rotate-[360deg]" />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-ink-900">{award.title}</p>
                  <Badge variant="gold" className="shrink-0 text-xs">
                    {award.year}
                  </Badge>
                </div>
                <p className="mt-1 text-xs text-ink-500">{award.description}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Class ranking</p>
              <p className="mt-1 text-xl font-bold text-ink-900">{currentStudent.classRanking}</p>
            </div>
            <Badge variant="secondary" className="text-sm">
              {formatHSK(currentStudent.hsk)}
            </Badge>
          </div>
          <div className="mt-4 h-2 w-full rounded-full bg-ink-100">
            <motion.div className="h-full rounded-full bg-gold-500" initial={{ width: 0 }} whileInView={{ width: "85%" }} viewport={{ once: true }} transition={{ duration: 1 }} />
          </div>
          <p className="mt-2 text-xs text-ink-500">
            Top <CountUp value={15} suffix="%" /> of class cohort
          </p>
        </CardContent>
      </Card>
    </>
  );
}

function PortfolioTab() {
  const [projects, setProjects] = useState<Array<(typeof currentStudent.projects)[number]>>(
    () => [...currentStudent.projects],
  );
  const [skills, setSkills] = useState<string[]>(() => [...currentStudent.skills]);
  const [pinnedTitle, setPinnedTitle] = useState(currentStudent.projects[0]?.title ?? "");

  function removeProject(project: (typeof currentStudent.projects)[number]) {
    setProjects((items) => items.filter((item) => item.title !== project.title));
    toast.success(`${project.title} removed for this prototype session.`, {
      action: {
        label: "Undo",
        onClick: () => setProjects((items) => [...items, project]),
      },
    });
  }

  function removeSkill(skill: string) {
    setSkills((items) => items.filter((item) => item !== skill));
    toast.success(`${skill} removed for this prototype session.`, {
      action: {
        label: "Undo",
        onClick: () => setSkills((items) => [...items, skill]),
      },
    });
  }

  return (
    <>
      <div>
        <div className="mb-3">
          <h3 className="text-sm font-semibold text-ink-900">Portfolio evidence builder</h3>
          <p className="mt-1 text-xs leading-5 text-ink-500">
            Structure each project around the problem, your decisions, evidence, and recruiter talking points.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              colorIndex={index}
              pinned={project.title === pinnedTitle}
              onPin={() => {
                setPinnedTitle(project.title);
                toast.success(`${project.title} pinned as the first portfolio project.`);
              }}
              onEdit={() => toast.info(`${project.title} editor opened in demo mode.`)}
              onRemove={() => removeProject(project)}
            />
          ))}
          <button
            type="button"
            className="group flex min-h-[170px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-ink-300 text-ink-400 transition hover:border-gold-400 hover:bg-gold-50 hover:text-ink-700"
            onClick={() => toast.info("Blank project evidence template opened in demo mode.")}
          >
            <Plus className="mb-1 size-6 transition-transform group-hover:rotate-90" />
            <span className="text-sm font-medium">{p.addProject}</span>
          </button>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="mb-3 text-sm font-semibold text-ink-900">Files & Links</h3>
        <div className="space-y-2">
          {mockFiles.map(({ icon: Icon, name, meta, actions }) => (
            <div key={name} className="group flex items-center justify-between gap-3 overflow-hidden rounded-lg border border-ink-200 px-4 py-3 transition hover:bg-gold-50">
              <div className="flex items-center gap-3">
                <Icon className="size-4 shrink-0 text-ink-400" />
                <div>
                  <p className="text-sm font-medium text-ink-900">{name}</p>
                  <p className="text-xs text-ink-400">{meta}</p>
                </div>
              </div>
              <div className="flex gap-2 transition sm:translate-x-6 sm:opacity-0 sm:group-hover:translate-x-0 sm:group-hover:opacity-100 sm:group-focus-within:translate-x-0 sm:group-focus-within:opacity-100">
                {actions.map((action) => (
                  <Button
                    key={action}
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => toast.success(`${action} prepared for ${name} in demo mode.`)}
                  >
                    {action === "Download" ? <Download className="size-3" /> : null}
                    {action}
                  </Button>
                ))}
              </div>
            </div>
          ))}
          <div className="flex gap-2 pt-1">
            <Button type="button" variant="outline" size="sm" onClick={() => toast.info("Link editor opened in demo mode.")}>
              <Plus className="size-3.5" />
              {p.addLink}
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={() => toast.info("File picker opened in demo mode.")}>
              <Plus className="size-3.5" />
              {p.uploadFile}
            </Button>
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="mb-3 text-sm font-semibold text-ink-900">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <motion.span key={skill} initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
              <Badge variant="secondary" className="cursor-pointer gap-1.5 pr-1.5 text-sm hover:bg-gold-50">
                {skill}
                <button
                  type="button"
                  className="ml-1 rounded-full p-0.5 hover:bg-ink-200"
                  aria-label={`Remove ${skill}`}
                  onClick={() => removeSkill(skill)}
                >
                  <X className="size-3" />
                </button>
              </Badge>
            </motion.span>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-7 text-xs"
            onClick={() => toast.info("Skill picker opened in demo mode.")}
          >
            <Plus className="size-3" />
            Add skill
          </Button>
        </div>
      </div>
    </>
  );
}

function ProjectCard({
  project,
  colorIndex,
  pinned,
  onPin,
  onEdit,
  onRemove,
}: {
  project: { title: string; description: string; tags: string[]; link?: string };
  colorIndex: number;
  pinned: boolean;
  onPin: () => void;
  onEdit: () => void;
  onRemove: () => void;
}) {
  const evidence = projectEvidenceByTitle[project.title] ?? {
    problem: project.description,
    solution: "A focused prototype that demonstrates the proposed workflow.",
    role: "Student project owner",
    evidence: "Prototype screens, process notes, and project files",
    outcome: "Demonstrates a concrete response to the stated problem.",
    learning: "Document the decisions that changed after testing.",
    talkingPoint: "Explain one tradeoff, one test, and one next improvement.",
  };

  return (
    <div className="group relative overflow-hidden rounded-lg border border-ink-200 bg-surface-0 transition-shadow hover:shadow-lg">
      <div className={cn("flex h-24 items-center justify-center bg-gradient-to-br", gradients[colorIndex % gradients.length])}>
        <span className="text-3xl font-black text-white/80">{project.title.charAt(0)}</span>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-sm font-semibold text-ink-900">{project.title}</h4>
          {pinned ? <Badge variant="gold" className="shrink-0 text-[10px]">Pinned first</Badge> : null}
        </div>
        <p className="mt-1 text-xs leading-5 text-ink-500">{project.description}</p>
        <div className="mt-2 flex flex-wrap gap-1">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="px-1.5 py-0 text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <dl className="mt-4 space-y-2 rounded-lg border border-ink-200 bg-ink-50 p-3">
          {[
            ["Problem", evidence.problem],
            ["Solution", evidence.solution],
            ["My role", evidence.role],
            ["Tools used", project.tags.join(", ")],
            ["Evidence", evidence.evidence],
            ["Outcome", evidence.outcome],
            ["What I learned", evidence.learning],
            ["Recruiter talking point", evidence.talkingPoint],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink-400">{label}</dt>
              <dd className="mt-0.5 text-xs leading-5 text-ink-700">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button type="button" variant={pinned ? "ghost" : "outline"} size="sm" disabled={pinned} onClick={onPin}>
            {pinned ? "Pinned first" : "Pin as first project"}
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={onEdit}>Edit evidence</Button>
        </div>
      </div>
      <div className="absolute right-2 top-2 flex gap-1">
        <button
          type="button"
          className="flex size-9 items-center justify-center rounded-md bg-white shadow hover:bg-ink-50"
          aria-label={`Edit ${project.title}`}
          onClick={onEdit}
        >
          <Edit2 className="size-3.5 text-ink-600" />
        </button>
        <button
          type="button"
          className="flex size-9 items-center justify-center rounded-md bg-white shadow hover:bg-red-50"
          aria-label={`Remove ${project.title}`}
          onClick={onRemove}
        >
          <X className="size-3.5 text-error" />
        </button>
      </div>
    </div>
  );
}

function EmployerPreviewModal({ onBack }: { onBack: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-ink-900/70 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onBack}
      role="dialog"
      aria-modal="true"
      aria-labelledby="employer-preview-title"
    >
      <motion.div
        className="mx-auto max-h-[92vh] max-w-5xl overflow-auto rounded-lg bg-surface-0 p-6 shadow-2xl"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between rounded-lg bg-ink-900 px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-surface-0">
            <Eye className="size-4" />
            <span>{p.previewBanner}</span>
          </div>
          <Button variant="inverse" size="sm" onClick={onBack}>
            <ArrowLeft className="size-3.5" />
            {p.backToEdit}
          </Button>
        </div>
        <EmployerPreviewBanner />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <StudentAvatar student={currentStudent} className="size-20" />
            <div>
              <h2 id="employer-preview-title" className="text-xl font-bold text-ink-900">{currentStudent.name}</h2>
              <p className="text-ink-600">{currentStudent.headline}</p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <VerifiedBadge />
                <span className="text-sm text-ink-500">
                  {currentStudent.nationalityFlag} {currentStudent.nationality}
                </span>
                <Badge variant="secondary">{currentStudent.major}</Badge>
                <Badge variant="secondary">Year {currentStudent.year}</Badge>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={() => toast.success("Added to shortlist for this demo session.")}
            >
              {copy.buttons.primary.addToShortlist}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => toast.success("Prototype message composer opened.")}
            >
              {copy.buttons.primary.sendMessage}
            </Button>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
          <div className="space-y-6">
            <div>
              <h3 className="mb-2 text-sm font-semibold text-ink-900">About</h3>
              <p className="text-sm leading-relaxed text-ink-600">{currentStudent.bio}</p>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-semibold text-ink-900">Skills</h3>
              <div className="flex flex-wrap gap-1.5">
                {currentStudent.skills.map((skill) => (
                  <Badge key={skill} variant="gold">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-ink-900">Projects</h3>
              <div className="space-y-3">
                {currentStudent.projects.map((project, index) => (
                  <Reveal key={project.title} delay={index * 0.08}>
                    <div className="rounded-lg border border-ink-200 p-4">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-semibold text-ink-900">{project.title}</h4>
                        {project.link ? <ExternalLink className="size-3.5 shrink-0 text-ink-400" /> : null}
                      </div>
                      <p className="mt-1 text-xs text-ink-500">{project.description}</p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
          <Card>
            <CardContent className="space-y-2 pt-4 text-sm">
              {[
                ["lookingFor", "Looking for", currentStudent.lookingFor],
                ["availableFrom", "Available from", currentStudent.availableFrom],
                ["gpa", "GPA", `${formatGPA(currentStudent.gpa)} / 4.0`],
                ["passport", "Passport number", "Hidden field"],
                ["responseTime", "Response time", currentStudent.responseTime],
              ].map(([field, label, value], index) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <EmployerPreviewField field={field} label={label} value={value} />
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </motion.div>
  );
}
