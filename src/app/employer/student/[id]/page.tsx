"use client";

import { use, useState } from "react";
import Link from "next/link";
import {
  Activity,
  Bookmark,
  BriefcaseBusiness,
  Calendar,
  Check,
  Clock,
  Download,
  GraduationCap,
  MapPin,
  MessageSquare,
  Send,
  Star,
  StickyNote,
  UserPlus,
} from "lucide-react";
import { motion } from "framer-motion";
import { Drawer } from "vaul";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ConsentSummary } from "@/components/product/consent-summary";
import { MatchExplanation } from "@/components/product/match-explanation";
import { PrototypeNotice } from "@/components/brand/prototype-notice";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StudentAvatar } from "@/components/brand/StudentAvatar";
import { VerifiedBadge } from "@/components/brand/VerifiedBadge";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { Textarea } from "@/components/ui/textarea";
import { copy } from "@/lib/copy";
import { currentEmployer } from "@/lib/current-employer";
import { employerRoles, getCandidateSignal, getRoleFit, recruiterActivity } from "@/lib/employer-workspace";
import { students } from "@/lib/mock-data";
import { calculateMatchScore, getMatchTier } from "@/lib/utils-lib/matching";
import { getCategoryColors } from "@/lib/utils-lib/colors";
import { cn } from "@/lib/utils";

const p = copy.pages.employer.studentDetail;

const SEEDED_SHORTLIST = new Set(["stu-001", "stu-003", "stu-006"]);

const PROJECT_GRADIENTS = [
  "from-aurora-blue to-aurora-violet",
  "from-gold-400 to-gold-600",
  "from-success to-aurora-cyan",
];

export default function StudentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const student = students.find((s) => s.id === id) ?? students[0];
  const [shortlisted, setShortlisted] = useState(SEEDED_SHORTLIST.has(student.id));
  const [messageOpen, setMessageOpen] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState(employerRoles[0].id);
  const [privateNote, setPrivateNote] = useState("");
  const signal = getCandidateSignal(student.id);
  const selectedRole = employerRoles.find((role) => role.id === selectedRoleId) ?? employerRoles[0];
  const roleFit = getRoleFit(student, selectedRole);

  const { score } = calculateMatchScore({
    studentCategory: student.category,
    studentSkills: [...student.skills],
    studentEnglishLevel: student.englishLevel,
    studentHSK: student.hsk,
    employerHiringCategories: [...currentEmployer.hiringCategories],
    employerHiringSkills: [...currentEmployer.hiringSkills],
    studentId: student.id,
    employerId: currentEmployer.id,
  });

  const tier = getMatchTier(score);
  const catColors = getCategoryColors(student.category);
  const tierColor =
    tier === "Strong" ? "text-success" : tier === "Good" ? "text-warning" : "text-ink-400";

  const toggleShortlist = async () => {
    const next = !shortlisted;
    setShortlisted(next);

    if (next) {
      toast.success(copy.toasts.studentShortlisted);
      const confetti = (await import("canvas-confetti")).default;
      confetti({
        particleCount: 30,
        spread: 42,
        startVelocity: 26,
        scalar: 0.8,
        ticks: 80,
        colors: ["#F5C518", "#F8D547", "#FFFFFF"],
        origin: { x: 0.62, y: 0.28 },
      });
    } else {
      toast(copy.toasts.studentRemoved);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Back link */}
      <Link
        href="/employer/browse"
        className="mb-4 inline-block text-xs text-ink-400 hover:text-ink-700"
      >
        {p.backToBrowse}
      </Link>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        {/* Main content */}
        <div className="min-w-0 flex-1">
          {/* Profile header card */}
          <Reveal>
          <Card>
            <CardContent className="pt-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <StudentAvatar student={student} className="size-16" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-xl font-bold text-ink-900">{student.name}</h1>
                    <VerifiedBadge />
                  </div>
                  <p className="mt-0.5 text-sm text-ink-500">{student.headline}</p>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs text-ink-400">
                    <span>{student.nationalityFlag} {student.nationality}</span>
                    <span>·</span>
                    <span>Year {student.year}</span>
                    <span>·</span>
                    <span>{student.major}</span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    <span className={cn("rounded px-1.5 py-0.5 text-[10px] font-medium", catColors.bg, catColors.text)}>
                      {student.category}
                    </span>
                    <Badge variant="secondary" className="text-[10px]">
                      {student.lookingFor}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Button variant="primary" size="sm" onClick={() => setMessageOpen(true)}>
                  <MessageSquare className="mr-1.5 size-3.5" />
                  {p.sendMessage}
                </Button>
                <Button
                  variant={shortlisted ? "secondary" : "outline"}
                  size="sm"
                  onClick={toggleShortlist}
                  className={cn(shortlisted && "bg-gold-500 text-ink-900 hover:bg-gold-500")}
                >
                  {shortlisted ? (
                    <motion.span initial={{ scale: 0.7 }} animate={{ scale: 1 }} transition={{ ease: [0.34, 1.56, 0.64, 1] }}>
                      <Check className="mr-1.5 size-3.5" />
                    </motion.span>
                  ) : (
                    <Bookmark className="mr-1.5 size-3.5" />
                  )}
                  {shortlisted ? p.shortlisted : p.addToShortlist}
                </Button>
                <Button variant="outline" size="sm" onClick={() => toast.success("Booth invitation prepared.")}>
                  <UserPlus className="mr-1.5 size-3.5" />
                  Invite to booth
                </Button>
                <Button variant="outline" size="sm" onClick={() => toast.success("Interview invite prepared.")}>
                  <Calendar className="mr-1.5 size-3.5" />
                  Invite interview
                </Button>
                <Button variant="ghost" size="sm" onClick={() => toast.success("Candidate profile export prepared.")}>
                  <Download className="mr-1.5 size-3.5" />
                  Download profile
                </Button>
              </div>
            </CardContent>
          </Card>
          </Reveal>

          {/* Tabs */}
          <Tabs defaultValue="overview" className="mt-5">
            <TabsList>
              <TabsTrigger value="overview">{p.tabOverview}</TabsTrigger>
              <TabsTrigger value="portfolio">{p.tabPortfolio}</TabsTrigger>
              <TabsTrigger value="academic">{p.tabAcademic}</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            {/* Overview */}
            <TabsContent value="overview" className="mt-4 space-y-4">
              <Card>
                <CardContent className="pt-4">
                  <p className="text-sm leading-relaxed text-ink-700">{student.bio}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-400">Skills</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {student.skills.map((skill, index) => {
                      const isMatch = currentEmployer.hiringSkills
                        .map((s) => s.toLowerCase())
                        .includes(skill.toLowerCase());
                      return (
                        <motion.span
                          key={skill}
                          className={cn(
                            "rounded-full px-2.5 py-0.5 text-xs font-medium",
                            isMatch
                              ? "bg-gold-50 text-gold-700 ring-1 ring-gold-400"
                              : "bg-ink-100 text-ink-600",
                          )}
                          initial={{ opacity: 0, y: 8 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.04 }}
                        >
                          {skill}
                        </motion.span>
                      );
                    })}
                  </div>
                  <p className="mt-2 text-[11px] text-ink-400">Gold = matches your hiring skills</p>
                </CardContent>
              </Card>
              <Card className="border-gold-200 bg-gold-50/60">
                <CardContent className="pt-4">
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gold-700">
                    Recruiter summary
                  </h3>
                  <p className="text-sm leading-relaxed text-ink-700">{signal.note}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {signal.tags.map((tag) => (
                      <Badge key={tag} variant="gold" className="text-[10px]">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <ConsentSummary student={student} />
              <Card>
                <CardContent className="pt-4">
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-400">
                    Recommended recruiter questions
                  </h3>
                  <div className="space-y-2">
                    {[
                      "Ask the student to explain the project architecture.",
                      "Ask how they handled bilingual users or documentation.",
                      "Ask what support they need in a Chinese workplace.",
                    ].map((question) => (
                      <div key={question} className="rounded-lg bg-ink-50 px-3 py-2 text-sm leading-6 text-ink-700">
                        {question}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Portfolio */}
            <TabsContent value="portfolio" className="mt-4">
              <div className="grid gap-4 sm:grid-cols-2">
                {student.projects.map((proj, i) => (
                  <TiltCard key={proj.title} glare max={5}>
                    <Card className="overflow-hidden">
                      <div className={cn("h-24 bg-gradient-to-br", PROJECT_GRADIENTS[i % PROJECT_GRADIENTS.length])} />
                      <CardContent className="pt-3">
                        <p className="text-sm font-semibold text-ink-900">{proj.title}</p>
                        <p className="mt-1 text-xs leading-relaxed text-ink-500">{proj.description}</p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {proj.tags.map((tag) => (
                            <span key={tag} className="rounded bg-ink-100 px-1.5 py-0.5 text-[10px] text-ink-600">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TiltCard>
                ))}
              </div>
            </TabsContent>

            {/* Academic */}
            <TabsContent value="academic" className="mt-4 space-y-4">
              <Card>
                <CardContent className="pt-4">
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {[
                      { label: "GPA", value: student.gpa.toFixed(2) },
                      { label: "Class ranking", value: student.classRanking },
                      { label: "Courses completed", value: String(student.coursesCompleted) },
                      { label: "HSK level", value: student.hsk ? `HSK ${student.hsk}` : "N/A" },
                      { label: "English", value: student.englishLevel },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <p className="text-[11px] text-ink-400">{label}</p>
                        <p className="mt-0.5 text-sm font-semibold text-ink-900">{value}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              {student.awards.length > 0 && (
                <Card>
                  <CardContent className="pt-4">
                    <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-400">Awards</h3>
                    <div className="space-y-2">
                      {student.awards.map((award) => (
                        <div key={award.title} className="flex items-start gap-2">
                          <Star className="mt-0.5 size-3.5 shrink-0 fill-gold-500 text-gold-500" />
                          <div>
                            <p className="text-sm font-medium text-ink-900">{award.title}</p>
                            <p className="text-xs text-ink-400">{award.year} · {award.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="notes" className="mt-4 space-y-4">
              <Card>
                <CardContent className="pt-4">
                  <div className="mb-3 flex items-center gap-2">
                    <StickyNote className="size-4 text-gold-600" aria-hidden="true" />
                    <h3 className="text-sm font-semibold text-ink-900">Private recruiter note</h3>
                  </div>
                  <Textarea
                    value={privateNote}
                    onChange={(event) => setPrivateNote(event.target.value)}
                    placeholder={signal.note}
                    className="min-h-36"
                  />
                  <div className="mt-3 flex justify-end">
                    <Button
                      variant="primary"
                      size="sm"
                      disabled={!privateNote.trim()}
                      onClick={() => {
                        toast.success("Private note saved locally for this demo.");
                        setPrivateNote("");
                      }}
                    >
                      Save note
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="mt-4 space-y-4">
              <Card>
                <CardContent className="pt-4">
                  <div className="mb-4 flex items-center gap-2">
                    <Activity className="size-4 text-gold-600" aria-hidden="true" />
                    <h3 className="text-sm font-semibold text-ink-900">Recruiter activity timeline</h3>
                  </div>
                  <div className="space-y-3">
                    {[
                      { type: "Profile viewed", text: `${currentEmployer.name} opened this candidate dossier.`, timestamp: "Today" },
                      { type: signal.stage, text: signal.lastActivity, timestamp: "Latest" },
                      ...recruiterActivity.slice(0, 3),
                    ].map((item, index) => (
                      <div key={`${item.type}-${index}`} className="relative pl-6">
                        <span className="absolute left-0 top-1.5 size-2.5 rounded-full bg-gold-500 ring-4 ring-gold-100" />
                        <p className="text-sm font-semibold text-ink-900">{item.type}</p>
                        <p className="mt-0.5 text-xs leading-5 text-ink-500">{item.text}</p>
                        <p className="mt-0.5 text-[11px] text-ink-400">{item.timestamp}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <aside className="w-full shrink-0 space-y-4 lg:sticky lg:top-[145px] lg:w-[260px]">
          {/* Match score card */}
          <Card className="border-2 border-gold-400">
            <CardContent className="pt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">{p.matchScore}</p>
              <div className="mt-3">
                <Select value={selectedRoleId} onValueChange={setSelectedRoleId}>
                  <SelectTrigger className="h-9 w-full text-xs">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {employerRoles.map((role) => (
                      <SelectItem key={role.id} value={role.id}>
                        {role.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <p className={cn("mt-1 text-4xl font-black", tierColor)}>
                <CountUp value={score} suffix="%" />
              </p>
              <Badge
                variant={tier === "Strong" ? "success" : tier === "Good" ? "gold" : "secondary"}
                className="mt-1 text-xs"
              >
                {tier} match
              </Badge>
              <MatchExplanation
                score={score}
                student={student}
                employer={currentEmployer}
                roleTitle={selectedRole.title}
                compact
                surface="inline"
                className="mt-3"
              />
              <div className="mt-4 rounded-lg border border-gold-200 bg-gold-50/70 p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold text-gold-700">{roleFit.label}</p>
                  <span className="text-sm font-bold text-ink-900">{roleFit.score}%</span>
                </div>
                <div className="mt-2 space-y-1">
                  {roleFit.reasons.map((reason) => (
                    <p key={reason} className="text-[11px] leading-4 text-ink-600">· {reason}</p>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <PrototypeNotice message="This employer dossier uses mock profile data and local recruiter notes for the prototype demo." />

          {/* Quick info */}
          <Card>
            <CardContent className="pt-4 space-y-3">
              {[
                { icon: Calendar, label: p.availableFrom, value: student.availableFrom },
                { icon: GraduationCap, label: p.lookingFor, value: student.lookingFor },
                { icon: Clock, label: p.responseTime, value: student.responseTime },
                { icon: MapPin, label: p.preferredLocations, value: student.preferredLocations.join(", ") },
                { icon: BriefcaseBusiness, label: "Pipeline stage", value: signal.stage },
              ].map(({ icon: Icon, label, value }, index) => (
                <motion.div
                  key={label}
                  className="flex items-start gap-2"
                  initial={{ opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Icon className="mt-0.5 size-3.5 shrink-0 text-ink-400" />
                  <div>
                    <p className="text-[11px] text-ink-400">{label}</p>
                    <p className="text-xs font-medium text-ink-800">{value}</p>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </aside>
      </div>
      <MessageDrawer open={messageOpen} onOpenChange={setMessageOpen} studentName={student.name} />
    </div>
  );
}

function MessageDrawer({
  open,
  onOpenChange,
  studentName,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  studentName: string;
}) {
  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange} direction="right">
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-40 bg-ink-900/45 backdrop-blur-sm" />
        <Drawer.Content className="fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-md flex-col border-l border-ink-200 bg-surface-0 p-6 shadow-2xl">
          <Drawer.Title className="text-lg font-bold text-ink-900">{copy.buttons.primary.sendMessage}</Drawer.Title>
          <Drawer.Description className="mt-1 text-sm text-ink-500">
            {studentName}
          </Drawer.Description>
          <Textarea
            className="mt-6 min-h-40 focus-visible:border-gold-500 focus-visible:ring-gold-500/20"
            defaultValue={`Hi ${studentName.split(" ")[0]}, your project caught our attention. Could we schedule a short conversation during the next event?`}
          />
          <div className="mt-auto flex justify-end gap-2 pt-6">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                toast.success(copy.toasts.messageSent);
                onOpenChange(false);
              }}
            >
              <Send className="size-4" />
              {copy.buttons.primary.sendMessage}
            </Button>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
