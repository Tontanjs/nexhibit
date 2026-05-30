"use client";

import { use, useState } from "react";
import Link from "next/link";
import { MessageSquare, Bookmark, BookmarkCheck, Star, GraduationCap, MapPin, Clock, Calendar } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { StudentAvatar } from "@/components/brand/StudentAvatar";
import { VerifiedBadge } from "@/components/brand/VerifiedBadge";
import { copy } from "@/lib/copy";
import { currentEmployer } from "@/lib/current-employer";
import { students } from "@/lib/mock-data";
import { calculateMatchScore, getMatchTier, getMatchExplanation } from "@/lib/utils-lib/matching";
import { getCategoryColors } from "@/lib/utils-lib/colors";
import { cn } from "@/lib/utils";

const p = copy.pages.employer.studentDetail;

const SEEDED_SHORTLIST = new Set(["stu-001", "stu-003", "stu-006"]);

const PROJECT_GRADIENTS = [
  "from-blue-500 to-purple-600",
  "from-gold-400 to-orange-500",
  "from-green-500 to-teal-600",
];

export default function StudentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const student = students.find((s) => s.id === id) ?? students[0];
  const [shortlisted, setShortlisted] = useState(SEEDED_SHORTLIST.has(student.id));

  const { score, factors } = calculateMatchScore({
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
  const explanations = getMatchExplanation(factors);
  const catColors = getCategoryColors(student.category);
  const tierColor =
    tier === "Strong" ? "text-success" : tier === "Good" ? "text-warning" : "text-ink-400";

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
                <Button variant="primary" size="sm" asChild>
                  <Link href="/employer/messages">
                    <MessageSquare className="mr-1.5 size-3.5" />
                    {p.sendMessage}
                  </Link>
                </Button>
                <Button
                  variant={shortlisted ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => setShortlisted(!shortlisted)}
                >
                  {shortlisted ? (
                    <BookmarkCheck className="mr-1.5 size-3.5 text-gold-500" />
                  ) : (
                    <Bookmark className="mr-1.5 size-3.5" />
                  )}
                  {shortlisted ? p.removeFromShortlist : p.addToShortlist}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="overview" className="mt-5">
            <TabsList>
              <TabsTrigger value="overview">{p.tabOverview}</TabsTrigger>
              <TabsTrigger value="portfolio">{p.tabPortfolio}</TabsTrigger>
              <TabsTrigger value="academic">{p.tabAcademic}</TabsTrigger>
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
                    {student.skills.map((skill) => {
                      const isMatch = currentEmployer.hiringSkills
                        .map((s) => s.toLowerCase())
                        .includes(skill.toLowerCase());
                      return (
                        <span
                          key={skill}
                          className={cn(
                            "rounded-full px-2.5 py-0.5 text-xs font-medium",
                            isMatch
                              ? "bg-gold-50 text-gold-700 ring-1 ring-gold-400"
                              : "bg-ink-100 text-ink-600",
                          )}
                        >
                          {skill}
                        </span>
                      );
                    })}
                  </div>
                  <p className="mt-2 text-[11px] text-ink-400">Gold = matches your hiring skills</p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Portfolio */}
            <TabsContent value="portfolio" className="mt-4">
              <div className="grid gap-4 sm:grid-cols-2">
                {student.projects.map((proj, i) => (
                  <Card key={proj.title} className="overflow-hidden">
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
          </Tabs>
        </div>

        {/* Sidebar */}
        <aside className="w-full shrink-0 space-y-4 lg:sticky lg:top-[145px] lg:w-[260px]">
          {/* Match score card */}
          <Card className="border-2 border-gold-400">
            <CardContent className="pt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">{p.matchScore}</p>
              <p className={cn("mt-1 text-4xl font-black", tierColor)}>{score}%</p>
              <Badge
                variant={tier === "Strong" ? "success" : tier === "Good" ? "gold" : "secondary"}
                className="mt-1 text-xs"
              >
                {tier} match
              </Badge>
              <div className="mt-3 space-y-1.5">
                <p className="text-xs font-semibold text-ink-700">{p.matchExplanationTitle}</p>
                {explanations.map((exp, i) => (
                  <p key={i} className="text-xs text-ink-500 leading-relaxed">
                    · {exp}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick info */}
          <Card>
            <CardContent className="pt-4 space-y-3">
              {[
                { icon: Calendar, label: p.availableFrom, value: student.availableFrom },
                { icon: GraduationCap, label: p.lookingFor, value: student.lookingFor },
                { icon: Clock, label: p.responseTime, value: student.responseTime },
                { icon: MapPin, label: p.preferredLocations, value: student.preferredLocations.join(", ") },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-2">
                  <Icon className="mt-0.5 size-3.5 shrink-0 text-ink-400" />
                  <div>
                    <p className="text-[11px] text-ink-400">{label}</p>
                    <p className="text-xs font-medium text-ink-800">{value}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
