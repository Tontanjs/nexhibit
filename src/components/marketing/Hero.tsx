import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { QRBadge, ScannerOverlay } from "@/components/icons";
import { StudentAvatar } from "@/components/brand/StudentAvatar";
import { VerifiedBadge } from "@/components/brand/VerifiedBadge";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { students } from "@/lib/mock-data";
import { copy } from "@/lib/copy";
import { cn } from "@/lib/utils";

const cardStyles = [
  "rotate-[-3deg] translate-x-0",
  "rotate-[2deg] translate-x-8",
  "rotate-[-1deg] translate-x-3",
];

export function Hero() {
  const featuredStudents = students.slice(0, 3);

  return (
    <section className="bg-dark overflow-hidden">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 py-24 sm:px-6 md:grid-cols-[1fr_0.9fr] md:items-center md:py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-center md:mx-0 md:text-left">
          <div className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-4 py-2 text-xs font-bold uppercase tracking-wide text-ink-900">
            <Sparkles className="size-4" aria-hidden="true" />
            {copy.marketing.hero.caption}
          </div>
          <h1 className="mt-8 text-5xl font-extrabold leading-[1.05] tracking-normal text-surface-0 sm:text-6xl md:text-7xl">
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
        </div>

        <div className="relative hidden min-h-[560px] md:block" id="students">
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
          <div className="absolute left-0 top-20 grid w-[420px] gap-5">
            {featuredStudents.map((student, index) => (
              <article
                key={student.id}
                className={cn(
                  "rounded-lg border border-surface-0/10 bg-surface-0 p-5 text-ink-900 shadow-2xl",
                  cardStyles[index],
                )}
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
