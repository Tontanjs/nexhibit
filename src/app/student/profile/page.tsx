"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  Download,
  Edit2,
  ExternalLink,
  Eye,
  FileText,
  Link2,
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
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
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
  "from-blue-500 to-indigo-600",
  "from-violet-500 to-purple-600",
  "from-emerald-500 to-teal-600",
];

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
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold">Profile photo</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <StudentAvatar student={currentStudent} className="size-16 border-2 border-gold-400" />
          <div className="flex-1">
            <div className="group rounded-lg border-2 border-dashed border-ink-300 p-4 text-center transition hover:border-gold-400 hover:bg-gold-50">
              <p className="text-sm text-ink-500">{p.uploadAreaHint}</p>
              <p className="mt-1 text-xs text-ink-400">JPG, PNG up to 5MB</p>
              <span className="mx-auto mt-3 block size-5 rounded-full border border-gold-500 text-gold-600 opacity-0 transition group-hover:opacity-100">✓</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-1.5">
        <Label htmlFor="display-name">{copy.forms.labels.fullName}</Label>
        <Input id="display-name" defaultValue={currentStudent.name} className="focus-visible:border-gold-500 focus-visible:ring-gold-500/20" />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="headline">{copy.forms.labels.headline}</Label>
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
        <Label htmlFor="bio">{copy.forms.labels.bio}</Label>
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
        <Label>Languages</Label>
        <div className="flex flex-wrap gap-2">
          {languages.map((lang) => (
            <motion.span key={lang} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
              <Badge variant="secondary" className="gap-1.5 pr-1.5 text-sm">
                {lang}
                <button className="ml-1 rounded-full p-0.5 hover:bg-ink-200" aria-label={`Remove ${lang}`}>
                  <X className="size-3" />
                </button>
              </Badge>
            </motion.span>
          ))}
          <Button variant="outline" size="sm" className="h-7 text-xs">
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
            <p className="text-sm text-ink-500">verified academic records</p>
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
  return (
    <>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-ink-900">Projects</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {currentStudent.projects.map((project, index) => (
            <TiltCard key={project.title} glare max={6}>
              <ProjectCard project={project} colorIndex={index} />
            </TiltCard>
          ))}
          <button className="group flex min-h-[170px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-ink-300 text-ink-400 transition hover:border-gold-400 hover:bg-gold-50 hover:text-ink-700">
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
              <div className="flex translate-x-6 gap-2 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100">
                {actions.map((action) => (
                  <Button key={action} variant="ghost" size="sm" className="h-7 text-xs">
                    {action === "Download" ? <Download className="size-3" /> : null}
                    {action}
                  </Button>
                ))}
              </div>
            </div>
          ))}
          <div className="flex gap-2 pt-1">
            <Button variant="outline" size="sm">
              <Plus className="size-3.5" />
              {p.addLink}
            </Button>
            <Button variant="outline" size="sm">
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
          {currentStudent.skills.map((skill) => (
            <motion.span key={skill} initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
              <Badge variant="secondary" className="cursor-pointer gap-1.5 pr-1.5 text-sm hover:bg-gold-50">
                {skill}
                <button className="ml-1 rounded-full p-0.5 hover:bg-ink-200" aria-label={`Remove ${skill}`}>
                  <X className="size-3" />
                </button>
              </Badge>
            </motion.span>
          ))}
          <Button variant="outline" size="sm" className="h-7 text-xs">
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
}: {
  project: { title: string; description: string; tags: string[]; link?: string };
  colorIndex: number;
}) {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-ink-200 bg-surface-0 transition-shadow hover:shadow-lg">
      <div className={cn("flex h-24 items-center justify-center bg-gradient-to-br", gradients[colorIndex % gradients.length])}>
        <span className="text-3xl font-black text-white/80">{project.title.charAt(0)}</span>
      </div>
      <div className="p-4">
        <h4 className="line-clamp-1 text-sm font-semibold text-ink-900">{project.title}</h4>
        <p className="mt-1 line-clamp-2 text-xs text-ink-500">{project.description}</p>
        <div className="mt-2 flex flex-wrap gap-1">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="px-1.5 py-0 text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      <div className="absolute right-2 top-2 hidden gap-1 group-hover:flex">
        <button className="flex size-7 items-center justify-center rounded-md bg-white shadow hover:bg-ink-50">
          <Edit2 className="size-3.5 text-ink-600" />
        </button>
        <button className="flex size-7 items-center justify-center rounded-md bg-white shadow hover:bg-red-50">
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

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <StudentAvatar student={currentStudent} className="size-20" />
            <div>
              <h1 className="text-xl font-bold text-ink-900">{currentStudent.name}</h1>
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
            <Button variant="primary" size="sm">
              {copy.buttons.primary.addToShortlist}
            </Button>
            <Button variant="outline" size="sm">
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
                ["Looking for", currentStudent.lookingFor],
                ["Available from", currentStudent.availableFrom],
                ["GPA", `${formatGPA(currentStudent.gpa)} / 4.0`],
                ["Response time", currentStudent.responseTime],
              ].map(([label, value], index) => (
                <motion.div
                  key={label}
                  className="flex justify-between gap-3"
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="text-ink-500">{label}</span>
                  <span className="text-right font-medium text-ink-900">{value}</span>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </motion.div>
  );
}
