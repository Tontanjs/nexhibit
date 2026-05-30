import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

import { QRBadge, ScannerOverlay } from "@/components/icons";
import { StudentAvatar } from "@/components/brand/StudentAvatar";
import { VerifiedBadge } from "@/components/brand/VerifiedBadge";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { students } from "@/lib/mock-data";
import { copy } from "@/lib/copy";
import { cn } from "@/lib/utils";

const cardRotations = ["-3deg", "2deg", "-1deg"];

export function Hero() {
  const featuredStudents = students.slice(0, 3);

  return (
    <section className="bg-dark relative overflow-hidden" id="students">
      <div className="absolute inset-0 subtle-grid opacity-20" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink-900 to-transparent" aria-hidden="true" />
      <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1fr_0.9fr] md:items-center md:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center md:mx-0 md:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-gold-500 px-4 py-2 text-xs font-bold uppercase tracking-wide text-ink-900 shadow-lg shadow-gold-500/10">
            <Sparkles className="size-4" aria-hidden="true" />
            {copy.marketing.hero.caption}
          </div>
          <h1 className="mt-8 text-5xl font-extrabold leading-[1.02] tracking-normal text-surface-0 sm:text-6xl 2xl:text-7xl">
            {copy.marketing.hero.headline}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-300 md:mx-0">
            {copy.marketing.hero.subheadline}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
            <Link className={cn(buttonVariants({ variant: "primary", size: "lg" }))} href="/signup">
              {copy.marketing.hero.ctaPrimary}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link className={cn(buttonVariants({ variant: "inverse", size: "lg" }))} href="/signup">
              {copy.marketing.hero.ctaSecondary}
            </Link>
          </div>
          <p className="mt-6 text-sm font-medium text-ink-400">{copy.marketing.hero.trustLine}</p>

          <div className="mt-8 grid gap-3 sm:hidden">
            {featuredStudents.map((student) => (
              <article
                key={student.id}
                className="rounded-lg border border-surface-0/10 bg-surface-0/[0.08] p-3 text-left shadow-xl backdrop-blur"
              >
                <div className="flex items-center gap-3">
                  <StudentAvatar student={student} className="size-11" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-surface-0">
                      {student.name} <span aria-hidden="true">{student.nationalityFlag}</span>
                    </p>
                    <p className="truncate text-xs text-ink-300">{student.headline}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="relative hidden min-h-[500px] md:block">
          <ScannerOverlay
            scanning
            instruction={copy.accessibility.scanQr}
            className="absolute right-0 top-4 h-44 w-44 rounded-lg opacity-90 shadow-2xl"
          />
          <QRBadge
            studentId={featuredStudents[0]?.id}
            boothNumber="B-23"
            verifiedCaption={copy.status.verified}
            className="absolute bottom-8 right-4 h-52 w-40 rotate-6 drop-shadow-2xl"
          />
          <div className="absolute left-0 top-10 grid w-[420px] gap-4">
            {featuredStudents.map((student, index) => (
              <article
                key={student.id}
                className={cn(
                  "float-card rounded-lg border border-surface-0/20 bg-surface-0 p-5 text-ink-900 shadow-2xl shadow-ink-900/30",
                  index === 1 && "ml-8",
                  index === 2 && "ml-3",
                )}
                style={{ "--card-rotate": cardRotations[index] } as CSSProperties}
              >
                <div className="flex items-start gap-4">
                  <StudentAvatar student={student} className="size-14" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h2 className="truncate text-lg font-bold">{student.name}</h2>
                      <span aria-label={student.nationality}>{student.nationalityFlag}</span>
                    </div>
                    <p className="text-sm text-ink-600">{student.major}</p>
                    <VerifiedBadge className="mt-3" />
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {student.skills.slice(0, 3).map((skill) => (
                    <Badge key={skill} variant="gold">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
