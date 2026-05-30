import Link from "next/link";
import { ArrowRight, MapPin, ShieldCheck, Sparkles } from "lucide-react";

import { EmployerLogo } from "@/components/brand/EmployerLogo";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { employers } from "@/lib/mock-data";
import type { Employer } from "@/lib/mock-data/types";
import { copy } from "@/lib/copy";
import { cn } from "@/lib/utils";

const d = copy.marketing.employerShowcase;
const marqueeRows = [employers, [...employers].reverse()];

function EmployerShowcaseCard({ employer, priority }: { employer: Employer; priority?: boolean }) {
  return (
    <article
      className={cn(
        "group relative h-[196px] w-[286px] shrink-0 overflow-hidden rounded-lg border border-surface-0/12 bg-surface-0/[0.07] p-4 text-surface-0 shadow-2xl backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-gold-500/50 hover:bg-surface-0/[0.11] sm:w-[340px]",
        priority && "ring-1 ring-gold-500/35",
      )}
    >
      <div
        className="absolute inset-x-0 top-0 h-1 opacity-80"
        style={{ backgroundColor: employer.logoColor }}
        aria-hidden="true"
      />
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <EmployerLogo
            employer={employer}
            className="size-12 rounded-lg border-surface-0/20 shadow-lg shadow-ink-900/30"
          />
          <div className="min-w-0">
            <p className="truncate text-base font-bold text-surface-0">{employer.name}</p>
            <p className="mt-1 line-clamp-1 text-xs text-ink-300">{employer.industry}</p>
          </div>
        </div>
        <Badge variant="gold" className="shrink-0 text-[10px]">
          {employer.type}
        </Badge>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {employer.hiringCategories.slice(0, 3).map((category) => (
          <span
            key={category}
            className="rounded-full border border-surface-0/10 bg-surface-0/10 px-2 py-1 text-[11px] font-semibold text-ink-100"
          >
            {category}
          </span>
        ))}
      </div>

      <div className="mt-4 rounded-md border border-surface-0/10 bg-ink-900/35 p-3">
        <div className="mb-2 flex items-center justify-between gap-2 text-[10px] font-semibold uppercase tracking-wide text-ink-400">
          <span>{d.skillsLabel}</span>
          <span className="inline-flex items-center gap-1 text-gold-400">
            <MapPin className="size-3" aria-hidden="true" />
            {employer.location}
          </span>
        </div>
        <p className="line-clamp-2 text-xs leading-relaxed text-ink-200">
          {employer.hiringSkills.slice(0, 4).join(" · ")}
        </p>
      </div>

      <div className="mt-3 flex items-center gap-1.5 text-[11px] font-medium text-success">
        <ShieldCheck className="size-3.5" aria-hidden="true" />
        <span>{d.cardLabel}</span>
      </div>
    </article>
  );
}

export function EmployerMarquee() {
  return (
    <section id="employers" className="overflow-hidden bg-ink-900 py-16 text-surface-0 sm:py-20">
      <div className="relative">
        <div className="absolute inset-0 subtle-grid opacity-30" aria-hidden="true" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" aria-hidden="true" />
        <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.74fr_1.26fr] lg:items-center lg:px-8">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/25 bg-gold-500/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-gold-400">
              <Sparkles className="size-4" aria-hidden="true" />
              {d.caption}
            </div>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-normal text-surface-0 sm:text-4xl 2xl:text-5xl">
              {d.heading}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-300">{d.body}</p>
            <div className="mt-6 grid gap-2 text-sm text-ink-200 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {[d.statOne, d.statTwo, d.statThree].map((stat) => (
                <div key={stat} className="rounded-lg border border-surface-0/10 bg-surface-0/[0.06] px-3 py-2 font-semibold">
                  {stat}
                </div>
              ))}
            </div>
            <Link
              href="/employer/browse"
              className={cn(buttonVariants({ variant: "inverse", size: "lg" }), "mt-7 w-full sm:w-auto")}
            >
              {d.cta}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="relative -mx-4 sm:-mx-6 lg:mx-0">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ink-900 to-transparent" aria-hidden="true" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ink-900 to-transparent" aria-hidden="true" />
            <div className="space-y-4 py-2">
              {marqueeRows.map((row, rowIndex) => {
                const duplicated = [...row, ...row];
                return (
                  <div
                    key={rowIndex === 0 ? "forward" : "reverse"}
                    className={cn(
                      "flex gap-4 px-4 sm:px-6 lg:px-0",
                      rowIndex === 0 ? "marquee-track" : "marquee-track-reverse",
                    )}
                  >
                    {duplicated.map((employer, index) => (
                      <EmployerShowcaseCard
                        key={`${rowIndex}-${employer.id}-${index}`}
                        employer={employer}
                        priority={rowIndex === 0 && index % employers.length === 0}
                      />
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
