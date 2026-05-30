"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight, MapPin, ShieldCheck } from "lucide-react";

import { EmployerLogo } from "@/components/brand/EmployerLogo";
import { CountUp } from "@/components/motion/CountUp";
import { Marquee } from "@/components/motion/Marquee";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { TiltCard } from "@/components/motion/TiltCard";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { employers } from "@/lib/mock-data";
import type { Employer } from "@/lib/mock-data/types";
import { copy } from "@/lib/copy";
import { cn } from "@/lib/utils";

const d = copy.marketing.employerShowcase;

const columns = [
  employers,
  [...employers.slice(3), ...employers.slice(0, 3)],
  [...employers.slice(5), ...employers.slice(0, 5)],
];

function EmployerShowcaseCard({ employer, active }: { employer: Employer; active?: boolean }) {
  return (
    <TiltCard max={4} className="mb-4">
      <article className="group relative min-h-[210px] overflow-hidden rounded-lg border border-surface-0/12 bg-surface-0/[0.07] p-4 text-surface-0 shadow-2xl shadow-ink-950/30 backdrop-blur-xl transition hover:border-gold-500/50 hover:bg-surface-0/[0.11]">
        <div
          className={cn("absolute inset-x-0 top-0 h-1 opacity-90", active && "animated-gradient-edge")}
          style={{ "--edge-color": employer.logoColor } as CSSProperties}
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
          {employer.hiringCategories.slice(0, 3).map((category, index) => (
            <span
              key={category}
              className="rounded-full border border-surface-0/10 bg-surface-0/10 px-2 py-1 text-[11px] font-semibold text-ink-100 opacity-0 animate-[fade-in_0.4s_var(--ease-out-expo)_forwards]"
              style={{ animationDelay: `${index * 40}ms` }}
            >
              {category}
            </span>
          ))}
        </div>

        <div className="mt-4 rounded-md border border-surface-0/10 bg-ink-900/35 p-3">
          <div className="mb-2 flex items-center justify-between gap-2 text-[10px] font-semibold uppercase tracking-wide text-ink-400">
            <span>{d.skillsLabel}</span>
            <span className="inline-flex items-center gap-1 text-gold-400">
              <span className="relative inline-flex">
                <MapPin className="size-3" aria-hidden="true" />
                <span className="absolute inset-0 animate-ping rounded-full bg-gold-500/30" aria-hidden="true" />
              </span>
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
    </TiltCard>
  );
}

export function EmployerMarquee() {
  return (
    <section id="employers" className="overflow-hidden bg-ink-900 py-16 text-surface-0 sm:py-20">
      <div className="relative">
        <div className="absolute inset-0 subtle-grid opacity-25" aria-hidden="true" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" aria-hidden="true" />
        <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.74fr_1.26fr] lg:items-center lg:px-8">
          <div className="max-w-xl">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-red-400/20 bg-red-500/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-red-200">
                <span className="pulse-dot size-1.5 rounded-full bg-red-400" aria-hidden="true" />
                {d.liveBadge}
              </div>
            </Reveal>
            <SplitText
              as="h2"
              text={d.heading}
              highlight={["moving"]}
              className="mt-5 block text-3xl font-extrabold leading-tight tracking-normal text-surface-0 sm:text-4xl 2xl:text-5xl"
            />
            <Reveal delay={0.18}>
              <p className="mt-5 text-base leading-relaxed text-ink-300">{d.body}</p>
            </Reveal>
            <div className="mt-6 grid gap-2 text-sm text-ink-200 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {d.stats.map((stat, index) => (
                <Reveal key={stat.label} delay={index * 0.08}>
                  <div className="rounded-lg border border-surface-0/10 bg-surface-0/[0.06] px-3 py-3 font-semibold">
                    <div className="text-2xl font-black text-gold-400">
                      <CountUp value={stat.value} suffix={"suffix" in stat ? stat.suffix : ""} />
                    </div>
                    <div className="mt-1 text-xs text-ink-400">{stat.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.32}>
              <MagneticButton className="mt-7 w-full sm:w-auto">
                <Link
                  href="/employer/browse"
                  className={cn(buttonVariants({ variant: "inverse", size: "lg" }), "group w-full sm:w-auto")}
                >
                  {d.cta}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </MagneticButton>
            </Reveal>
          </div>

          <div className="relative h-[560px] overflow-hidden rounded-lg border border-surface-0/10 bg-surface-0/[0.03] p-3 shadow-2xl shadow-black/20 sm:h-[720px]">
            <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-20 bg-gradient-to-b from-ink-900 to-transparent" aria-hidden="true" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-20 bg-gradient-to-t from-ink-900 to-transparent" aria-hidden="true" />
            <div className="grid h-full gap-4 md:grid-cols-3">
              {columns.map((column, columnIndex) => (
                <Marquee
                  key={columnIndex}
                  orientation="vertical"
                  direction={columnIndex === 1 ? "up" : "down"}
                  speed={columnIndex === 0 ? "50s" : columnIndex === 1 ? "60s" : "45s"}
                  className="h-full"
                  contentClassName="gap-0"
                >
                  {column.map((employer, index) => (
                    <EmployerShowcaseCard
                      key={`${columnIndex}-${employer.id}`}
                      employer={employer}
                      active={index === 0}
                    />
                  ))}
                </Marquee>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
