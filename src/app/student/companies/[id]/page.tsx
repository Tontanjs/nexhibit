import Link from "next/link";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import {
  ArrowLeft,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  ExternalLink,
  Globe2,
  MapPin,
  UsersRound,
  WalletCards,
} from "lucide-react";

import { EmployerLogo } from "@/components/brand/EmployerLogo";
import { CompanyMockDisclaimer, PrototypeNotice } from "@/components/brand/prototype-notice";
import { MatchExplanation } from "@/components/product/match-explanation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { companyProfiles } from "@/lib/company-profiles";
import { currentStudent } from "@/lib/current-user";
import { employers } from "@/lib/mock-data";
import { calculateMatchScore } from "@/lib/utils-lib/matching";

export function generateStaticParams() {
  return employers.map((employer) => ({ id: employer.id }));
}

export default async function CompanyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const employer = employers.find((item) => item.id === id);

  if (!employer) {
    notFound();
  }

  const profile = companyProfiles[employer.id];
  const matchScore = calculateMatchScore({
    studentCategory: currentStudent.category,
    studentSkills: [...currentStudent.skills],
    studentEnglishLevel: currentStudent.englishLevel,
    studentHSK: currentStudent.hsk,
    employerHiringCategories: [...employer.hiringCategories],
    employerHiringSkills: [...employer.hiringSkills],
    studentId: currentStudent.id,
    employerId: employer.id,
  }).score;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/student/events/evt-001" className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-ink-500 hover:text-ink-900">
        <ArrowLeft className="size-4" />
        Back to event employers
      </Link>

      <section className="overflow-hidden rounded-xl border border-ink-200 bg-ink-900 text-surface-0 shadow-2xl shadow-ink-900/15">
        <div className="grid gap-0 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)]">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <EmployerLogo employer={employer} className="size-16 rounded-xl border-surface-0/15" />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-3xl font-black tracking-normal text-surface-0">{employer.name}</h1>
                  <Badge variant="gold" className="text-xs">
                    Employer review demo
                  </Badge>
                </div>
                <p className="mt-2 max-w-3xl text-base leading-relaxed text-ink-300">{employer.description}</p>
                <CompanyMockDisclaimer className="mt-3 text-xs text-ink-300" />
                <div className="mt-4 flex flex-wrap gap-2">
                  {employer.hiringCategories.map((category) => (
                    <Badge key={category} variant="secondary" className="bg-surface-0/10 text-surface-0">
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-surface-0/10 bg-surface-0/[0.04] p-6 lg:border-l lg:border-t-0">
            <div className="grid gap-4 text-sm">
              <CompanyFact icon={Building2} label="Company type" value={employer.type} />
              <CompanyFact icon={MapPin} label="Main China location" value={employer.location} />
              <CompanyFact icon={CalendarDays} label="Founded" value={String(employer.yearFounded)} />
              <CompanyFact icon={UsersRound} label="Company size" value={employer.size} />
            </div>
            <Button variant="inverse" className="mt-6 w-full" asChild>
              <a href={employer.website} target="_blank" rel="noreferrer">
                Visit company website
                <ExternalLink className="size-4" />
              </a>
            </Button>
            <div className="mt-3 grid gap-2">
              <Button variant="inverse" asChild>
                <Link href="/student/messages">Message employer</Link>
              </Button>
              <Button variant="inverse" disabled>Save company demo</Button>
            </div>
          </div>
        </div>
      </section>

      <PrototypeNotice
        variant="card"
        title="Company profile prototype"
        message="Company profile details, roles, salary signals, and hiring process are mock data for demonstration only."
        className="mt-5"
      />

      <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-5">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Globe2 className="size-4 text-gold-600" />
                Where the company comes from
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-ink-600">{profile.origin}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <BriefcaseBusiness className="size-4 text-gold-600" />
                Roles open for international students
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 sm:grid-cols-2">
                {profile.openRoles.map((role) => (
                  <div key={role} className="rounded-lg border border-ink-200 bg-ink-50 px-3 py-2 text-sm font-medium text-ink-800">
                    {role}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <UsersRound className="size-4 text-gold-600" />
                What kind of students they want
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-3 sm:grid-cols-2">
                {profile.idealCandidates.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-ink-700">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <aside className="space-y-5">
          <MatchExplanation
            score={matchScore}
            student={currentStudent}
            employer={employer}
            roleTitle={profile.openRoles[0]}
          />

          <Card className="border-gold-200 bg-gold-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <WalletCards className="size-4 text-gold-700" />
                Salary signal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-ink-800">{profile.salaryRange}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Benefits and learning</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {profile.benefits.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-ink-700">
                    <span className="mt-1.5 size-1.5 rounded-full bg-gold-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Hiring process</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3">
                {profile.hiringProcess.map((step, index) => (
                  <li key={step} className="flex gap-3 text-sm text-ink-700">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-ink-900 text-xs font-bold text-surface-0">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-4 rounded-lg bg-ink-50 px-3 py-2 text-xs leading-relaxed text-ink-500">
                {profile.contactWindow}
              </p>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}

function CompanyFact({
  icon: Icon,
  label,
  value,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-surface-0/10 text-gold-400">
        <Icon className="size-4" />
      </span>
      <span>
        <span className="block text-xs font-semibold uppercase tracking-wide text-ink-400">{label}</span>
        <span className="block font-semibold text-surface-0">{value}</span>
      </span>
    </div>
  );
}
