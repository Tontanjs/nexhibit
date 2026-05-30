"use client";

import { useState } from "react";
import { Eye, ShieldCheck, Plus, ExternalLink, FileText, Video, Link2, Edit2, Trash2, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { StudentAvatar } from "@/components/brand/StudentAvatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { VerifiedBadge } from "@/components/brand/VerifiedBadge";
import { copy } from "@/lib/copy";
import { currentStudent } from "@/lib/current-user";
import { formatGPA, formatHSK } from "@/lib/utils-lib/formatters";
import { cn } from "@/lib/utils";

const p = copy.pages.student.profile;

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

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("personal");
  const [headline, setHeadline] = useState(currentStudent.headline);
  const [bio, setBio] = useState(currentStudent.bio);
  const [previewMode, setPreviewMode] = useState(false);

  const headlineMax = 100;
  const bioMax = 280;

  if (previewMode) {
    return <EmployerPreview onBack={() => setPreviewMode(false)} />;
  }

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 overflow-hidden rounded-lg border border-ink-200 bg-ink-900 p-5 text-surface-0 shadow-2xl shadow-ink-900/10">
        <p className="text-xs font-semibold uppercase tracking-wide text-gold-400">{copy.status.profileLive}</p>
        <h1 className="mt-2 text-2xl font-bold text-surface-0">{p.heading}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-300">{copy.helperText.portfolioUpload}</p>
      </div>
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        {/* Sidebar */}
        <aside className="w-full shrink-0 lg:sticky lg:top-[145px] lg:w-[280px]">
          <Card>
            <CardContent className="pt-6">
              {/* Mini profile preview */}
              <div className="flex flex-col items-center text-center">
                <StudentAvatar student={currentStudent} className="size-16" />
                <h2 className="mt-3 text-sm font-bold text-ink-900">{currentStudent.name}</h2>
                <p className="text-xs text-ink-500">{currentStudent.major}</p>
                <VerifiedBadge className="mt-2" />
              </div>

              <Separator className="my-4" />

              <div className="flex flex-wrap justify-center gap-1.5">
                {currentStudent.skills.slice(0, 4).map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>

              <Separator className="my-4" />

              {/* Profile strength */}
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-ink-700">{p.sidebarStrengthLabel}</span>
                  <span className="text-sm font-bold text-ink-900">{currentStudent.profileStrength}%</span>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-ink-200">
                  <div
                    className="h-full rounded-full bg-gold-500 transition-all"
                    style={{ width: `${currentStudent.profileStrength}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-ink-400">
                  {currentStudent.profileStrength >= 90
                    ? "Excellent profile"
                    : currentStudent.profileStrength >= 70
                      ? "Good profile"
                      : "Keep building"}
                </p>
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* Main area */}
        <div className="min-w-0 flex-1">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6 w-full overflow-x-auto">
              <TabsTrigger value="personal">{p.tabPersonal}</TabsTrigger>
              <TabsTrigger value="academic">{p.tabAcademic}</TabsTrigger>
              <TabsTrigger value="portfolio">{p.tabPortfolio}</TabsTrigger>
              <TabsTrigger value="preview" onClick={() => setPreviewMode(true)}>
                <Eye className="size-3.5" />
                {p.tabPreview}
              </TabsTrigger>
            </TabsList>

            {/* Personal tab */}
            <TabsContent value="personal" className="space-y-6">
              {/* Avatar */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-semibold">Profile photo</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center gap-4">
                  <StudentAvatar student={currentStudent} className="size-16 border-2 border-gold-400" />
                  <div className="flex-1">
                    <div className="rounded-lg border-2 border-dashed border-ink-300 p-4 text-center hover:border-gold-400 transition-colors cursor-pointer">
                      <p className="text-sm text-ink-500">{p.uploadAreaHint}</p>
                      <p className="mt-1 text-xs text-ink-400">JPG, PNG up to 5MB</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Display name */}
              <div className="grid gap-1.5">
                <Label htmlFor="display-name">{copy.forms.labels.fullName}</Label>
                <Input id="display-name" defaultValue={currentStudent.name} />
              </div>

              {/* Headline */}
              <div className="grid gap-1.5">
                <Label htmlFor="headline">{copy.forms.labels.headline}</Label>
                <Input
                  id="headline"
                  value={headline}
                  maxLength={headlineMax}
                  onChange={(e) => setHeadline(e.target.value)}
                  placeholder={copy.forms.placeholders.headline}
                />
                <p className="text-xs text-ink-400 text-right">
                  {headlineMax - headline.length} {p.headlineCounter}
                </p>
              </div>

              {/* Bio */}
              <div className="grid gap-1.5">
                <Label htmlFor="bio">{copy.forms.labels.bio}</Label>
                <Textarea
                  id="bio"
                  rows={4}
                  value={bio}
                  maxLength={bioMax}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder={copy.forms.placeholders.bio}
                />
                <p className="text-xs text-ink-400 text-right">
                  {bioMax - bio.length} {p.bioCounter}
                </p>
              </div>

              {/* Languages */}
              <div className="grid gap-2">
                <Label>Languages</Label>
                <div className="flex flex-wrap gap-2">
                  {[
                    `English (${currentStudent.englishLevel})`,
                    currentStudent.hsk ? `Mandarin (HSK ${currentStudent.hsk})` : null,
                    ...currentStudent.otherLanguages,
                  ]
                    .filter(Boolean)
                    .map((lang) => (
                      <Badge key={lang!} variant="secondary" className="gap-1.5 pr-1.5 text-sm">
                        {lang}
                        <button className="ml-1 rounded-full hover:bg-ink-200 p-0.5" aria-label={`Remove ${lang}`}>
                          <span aria-hidden="true" className="block size-3 text-center leading-none">×</span>
                        </button>
                      </Badge>
                    ))}
                  <Button variant="outline" size="sm" className="h-7 text-xs">
                    <Plus className="size-3" />
                    {p.addLanguage}
                  </Button>
                </div>
              </div>

              {/* Contact preference */}
              <div className="grid gap-2">
                <Label>{p.contactPreferenceLabel}</Label>
                <div className="flex flex-col gap-2">
                  {[p.contactInApp, p.contactInAppEmail, p.contactAll].map((opt) => (
                    <label key={opt} className="flex items-center gap-2.5 cursor-pointer">
                      <input type="radio" name="contact" className="accent-gold-500" defaultChecked={opt === p.contactInApp} />
                      <span className="text-sm text-ink-800">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <Button variant="primary">{p.saveSection}</Button>
              </div>
            </TabsContent>

            {/* Academic tab */}
            <TabsContent value="academic" className="space-y-4">
              <div className="flex items-center gap-2 rounded-lg bg-gold-50 border border-gold-200 px-3 py-2">
                <ShieldCheck className="size-4 text-gold-600 shrink-0" />
                <span className="text-sm text-ink-700">{p.syncedLabel} — read-only. Toggle visibility in Privacy settings.</span>
              </div>

              {/* GPA */}
              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">{copy.forms.labels.gpa}</p>
                      <p className="mt-1 text-3xl font-bold text-ink-900">{formatGPA(currentStudent.gpa)}</p>
                      <p className="text-sm text-ink-500">out of 4.0</p>
                    </div>
                    <VerifiedBadge />
                  </div>
                </CardContent>
              </Card>

              {/* Courses */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Courses completed ({currentStudent.coursesCompleted})</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {mockCourses.map((course) => (
                      <li key={course} className="flex items-center gap-2 text-sm text-ink-700">
                        <span className="size-1.5 shrink-0 rounded-full bg-ink-300" />
                        {course}
                      </li>
                    ))}
                    <li className="text-xs text-ink-400">+{currentStudent.coursesCompleted - mockCourses.length} more courses</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Awards */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Awards & Recognition</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {currentStudent.awards.map((award) => (
                    <div key={award.title}>
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-semibold text-ink-900">{award.title}</p>
                        <Badge variant="gold" className="shrink-0 text-xs">{award.year}</Badge>
                      </div>
                      <p className="mt-1 text-xs text-ink-500">{award.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Class ranking */}
              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Class ranking</p>
                      <p className="mt-1 text-xl font-bold text-ink-900">{currentStudent.classRanking}</p>
                    </div>
                    <Badge variant="secondary" className="text-sm">{formatHSK(currentStudent.hsk)}</Badge>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Portfolio tab */}
            <TabsContent value="portfolio" className="space-y-6">
              {/* Projects */}
              <div>
                <h3 className="mb-3 text-sm font-semibold text-ink-900">Projects</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {currentStudent.projects.map((project, i) => (
                    <ProjectCard key={project.title} project={project} colorIndex={i} />
                  ))}
                  <button className="group flex min-h-[140px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-ink-300 text-ink-400 transition-colors hover:border-gold-400 hover:text-ink-700">
                    <Plus className="size-6 mb-1" />
                    <span className="text-sm font-medium">{p.addProject}</span>
                  </button>
                </div>
              </div>

              <Separator />

              {/* Files & Links */}
              <div>
                <h3 className="mb-3 text-sm font-semibold text-ink-900">Files & Links</h3>
                <div className="space-y-2">
                  {mockFiles.map(({ icon: Icon, name, meta, actions }) => (
                    <div
                      key={name}
                      className="flex items-center justify-between gap-3 rounded-lg border border-ink-200 px-4 py-3 hover:bg-ink-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="size-4 shrink-0 text-ink-400" />
                        <div>
                          <p className="text-sm font-medium text-ink-900">{name}</p>
                          <p className="text-xs text-ink-400">{meta}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {actions.map((action) => (
                          <Button key={action} variant="ghost" size="sm" className="h-7 text-xs">
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

              {/* Skills */}
              <div>
                <h3 className="mb-3 text-sm font-semibold text-ink-900">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {currentStudent.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="cursor-pointer gap-1.5 pr-1.5 text-sm hover:bg-gold-50">
                      {skill}
                      <button className="ml-1 rounded-full hover:bg-ink-200 p-0.5" aria-label={`Remove ${skill}`}>
                        <span aria-hidden="true" className="block size-3 text-center leading-none">×</span>
                      </button>
                    </Badge>
                  ))}
                  <Button variant="outline" size="sm" className="h-7 text-xs">
                    <Plus className="size-3" />
                    Add skill
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

const gradients = [
  "from-blue-500 to-indigo-600",
  "from-violet-500 to-purple-600",
  "from-emerald-500 to-teal-600",
];

function ProjectCard({
  project,
  colorIndex,
}: {
  project: { title: string; description: string; tags: string[]; link?: string };
  colorIndex: number;
}) {
  return (
    <div className="group relative rounded-lg border border-ink-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Thumbnail */}
      <div className={cn("h-20 bg-gradient-to-br", gradients[colorIndex % gradients.length], "flex items-center justify-center")}>
        <span className="text-2xl font-black text-white/80">{project.title.charAt(0)}</span>
      </div>
      {/* Content */}
      <div className="p-4">
        <h4 className="text-sm font-semibold text-ink-900 line-clamp-1">{project.title}</h4>
        <p className="mt-1 text-xs text-ink-500 line-clamp-2">{project.description}</p>
        <div className="mt-2 flex flex-wrap gap-1">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs px-1.5 py-0">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      {/* Hover actions */}
      <div className="absolute right-2 top-2 hidden gap-1 group-hover:flex">
        <button className="flex size-7 items-center justify-center rounded-md bg-white shadow hover:bg-ink-50">
          <Edit2 className="size-3.5 text-ink-600" />
        </button>
        <button className="flex size-7 items-center justify-center rounded-md bg-white shadow hover:bg-red-50">
          <Trash2 className="size-3.5 text-error" />
        </button>
      </div>
    </div>
  );
}

function EmployerPreview({ onBack }: { onBack: () => void }) {
  const p = copy.pages.student.profile;
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8">
      {/* Preview banner */}
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

      {/* Preview content */}
      <div className="rounded-lg border border-ink-200 bg-surface-0 p-6 shadow-sm">
        {/* Hero */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <StudentAvatar student={currentStudent} className="size-20" />
            <div>
              <h1 className="text-xl font-bold text-ink-900">{currentStudent.name}</h1>
              <p className="text-ink-600">{currentStudent.headline}</p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <VerifiedBadge />
                <span className="text-sm text-ink-500">{currentStudent.nationalityFlag} {currentStudent.nationality}</span>
                <Badge variant="secondary">{currentStudent.major}</Badge>
                <Badge variant="secondary">Year {currentStudent.year}</Badge>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="primary" size="sm">Save to shortlist</Button>
            <Button variant="outline" size="sm">Send message</Button>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
          <div className="space-y-6">
            <div>
              <h3 className="mb-2 text-sm font-semibold text-ink-900">About</h3>
              <p className="text-sm text-ink-600 leading-relaxed">{currentStudent.bio}</p>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-semibold text-ink-900">Skills</h3>
              <div className="flex flex-wrap gap-1.5">
                {currentStudent.skills.map((skill) => (
                  <Badge key={skill} variant="gold">{skill}</Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-ink-900">Projects</h3>
              <div className="space-y-3">
                {currentStudent.projects.map((project) => (
                  <div key={project.title} className="rounded-lg border border-ink-200 p-4">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-semibold text-ink-900">{project.title}</h4>
                      {project.link && <ExternalLink className="size-3.5 shrink-0 text-ink-400" />}
                    </div>
                    <p className="mt-1 text-xs text-ink-500">{project.description}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <Card>
              <CardContent className="pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-ink-500">Looking for</span>
                  <span className="font-medium text-ink-900">{currentStudent.lookingFor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-500">Available from</span>
                  <span className="font-medium text-ink-900">{currentStudent.availableFrom}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-500">GPA</span>
                  <span className="font-medium text-ink-900">{formatGPA(currentStudent.gpa)} / 4.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-500">Response time</span>
                  <span className="font-medium text-ink-900">{currentStudent.responseTime}</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-400 mb-2">Preferred locations</p>
                <div className="flex flex-wrap gap-1.5">
                  {currentStudent.preferredLocations.map((loc) => (
                    <Badge key={loc} variant="secondary" className="text-xs">{loc}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
