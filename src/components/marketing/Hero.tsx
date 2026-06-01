"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";

import { QRBadge, ScannerOverlay } from "@/components/icons";
import { CountUp } from "@/components/motion/CountUp";
import { GradientMesh } from "@/components/motion/GradientMesh";
import { GridBackground } from "@/components/motion/GridBackground";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { SpotlightCursor } from "@/components/motion/SpotlightCursor";
import { StudentAvatar } from "@/components/brand/StudentAvatar";
import { VerifiedBadge } from "@/components/brand/VerifiedBadge";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { students } from "@/lib/mock-data";
import { copy } from "@/lib/copy";
import { cn } from "@/lib/utils";

const cardPositions = [
  { top: "3.8rem", left: "0.2rem", rotate: -4, z: 30, delay: 0 },
  { top: "11rem", left: "4.8rem", rotate: 2.5, z: 40, delay: 0.35 },
  { top: "19rem", left: "1.4rem", rotate: -1.8, z: 35, delay: 0.7 },
  { top: "27rem", left: "5.8rem", rotate: 2, z: 25, delay: 1.05 },
];

export function Hero() {
  const featuredStudents = students.slice(0, 4);
  const reduceMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateY = useTransform(mouseX, [-1, 1], [-4, 4]);
  const rotateX = useTransform(mouseY, [-1, 1], [4, -4]);

  return (
    <section className="bg-dark relative min-h-[calc(100vh-96px)] overflow-hidden" id="students">
      <GradientMesh className="opacity-40" />
      <GridBackground className="text-ink-100/10" />
      <SpotlightCursor />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-ink-900 to-transparent" aria-hidden="true" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-[minmax(0,1fr)] gap-12 px-4 py-16 sm:px-6 md:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] md:items-center md:py-20 lg:px-8">
        <div className="mx-auto w-full min-w-0 max-w-3xl text-center md:mx-0 md:text-left">
          <motion.div
            className="inline-flex origin-left items-center gap-2 overflow-hidden rounded-full border border-gold-400/40 bg-gold-500 px-4 py-2 text-xs font-bold uppercase tracking-wide text-ink-900 shadow-lg shadow-gold-500/10"
            initial={reduceMotion ? false : { width: 0, opacity: 0 }}
            animate={reduceMotion ? undefined : { width: "auto", opacity: 1 }}
            transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="pulse-dot size-1.5 shrink-0 rounded-full bg-ink-900" aria-hidden="true" />
            <Sparkles className="size-4 shrink-0" aria-hidden="true" />
            <span className="whitespace-nowrap">{copy.marketing.hero.caption}</span>
          </motion.div>

          <SplitText
            as="h1"
            text={copy.marketing.hero.headline}
            highlight={["seen"]}
            className="mx-auto mt-8 block max-w-[22rem] text-[clamp(2.65rem,12vw,3.5rem)] font-extrabold leading-[1.02] tracking-normal text-surface-0 sm:max-w-3xl sm:text-6xl md:mx-0 2xl:text-7xl"
          />
          <motion.div
            className="mx-auto mt-6 h-px w-12 origin-left bg-gold-500 md:mx-0"
            initial={reduceMotion ? false : { scaleX: 0 }}
            whileInView={reduceMotion ? undefined : { scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden="true"
          />
          <Reveal delay={0.28}>
            <p className="mx-auto mt-6 max-w-[22rem] text-base leading-relaxed text-ink-300 sm:max-w-2xl sm:text-lg md:mx-0">
              {copy.marketing.hero.subheadline}
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="mx-auto mt-8 flex w-full max-w-[22rem] flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center md:mx-0 md:justify-start">
              <MagneticButton className="w-full min-w-0 sm:w-auto">
                <Link className={cn(buttonVariants({ variant: "primary", size: "lg" }), "group w-full max-w-full sm:w-auto")} href="/signup">
                  {copy.marketing.hero.ctaPrimary}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </MagneticButton>
              <MagneticButton className="w-full min-w-0 sm:w-auto">
                <Link className={cn(buttonVariants({ variant: "inverse", size: "lg" }), "w-full max-w-full sm:w-auto")} href="/signup">
                  {copy.marketing.hero.ctaSecondary}
                </Link>
              </MagneticButton>
            </div>
          </Reveal>

          <Reveal delay={0.5}>
            <div className="mx-auto mt-6 flex max-w-[22rem] flex-col gap-2 text-center text-sm font-medium text-ink-400 md:mx-0 md:max-w-none md:flex-row md:flex-wrap md:items-baseline md:justify-start md:gap-x-3 md:gap-y-2 md:text-left">
              {copy.marketing.hero.trustStats.map((stat, index) => (
                <span key={stat.label} className="inline-flex justify-center gap-1 md:items-baseline md:justify-start">
                  <CountUp value={stat.value} suffix={stat.suffix} className="font-bold text-ink-200" />
                  <span>{stat.label}</span>
                  {index < copy.marketing.hero.trustStats.length - 1 ? <span className="ml-2 hidden text-ink-600 md:inline">|</span> : null}
                </span>
              ))}
            </div>
          </Reveal>

          <div className="mx-auto mt-8 grid w-full max-w-[22rem] grid-cols-[minmax(0,1fr)] gap-3 sm:hidden">
            {featuredStudents.slice(0, 3).map((student) => (
              <article
                key={student.id}
                className="min-w-0 rounded-lg border border-surface-0/10 bg-surface-0/[0.08] p-3 text-left shadow-xl backdrop-blur"
              >
                <div className="flex min-w-0 items-center gap-3">
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

        <motion.div
          className="relative hidden min-h-[620px] md:block"
          onMouseMove={(event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            mouseX.set(((event.clientX - rect.left) / rect.width - 0.5) * 2);
            mouseY.set(((event.clientY - rect.top) / rect.height - 0.5) * 2);
          }}
          onMouseLeave={() => {
            mouseX.set(0);
            mouseY.set(0);
          }}
          style={reduceMotion ? undefined : { rotateX, rotateY, transformPerspective: 1100 }}
        >
          <ScannerOverlay
            scanning
            instruction={copy.accessibility.scanQr}
            className="absolute right-0 top-3 h-44 w-44 rounded-lg opacity-90 shadow-2xl"
          />
          <motion.div
            className="absolute bottom-14 right-3 h-56 w-44 rotate-6 drop-shadow-2xl"
            initial={reduceMotion ? false : { opacity: 0, y: 28, rotate: 10 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0, rotate: 6 }}
            transition={{ duration: 0.72, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <QRBadge
              studentId={featuredStudents[0]?.id}
              boothNumber="B-23"
              verifiedCaption={copy.status.verified}
              className="h-full w-full"
            />
            <div className="qr-scan-line absolute left-4 right-4 top-10 h-px bg-gold-500/80 shadow-[0_0_18px_rgba(245,197,24,0.75)]" />
          </motion.div>

          <div className="absolute inset-0">
            {featuredStudents.map((student, index) => {
              const position = cardPositions[index];

              return (
                <motion.article
                  key={student.id}
                  className="group absolute w-[460px] overflow-hidden rounded-lg border border-surface-0/20 bg-surface-0 p-5 text-ink-900 shadow-2xl shadow-ink-900/30"
                  style={
                    {
                      top: position.top,
                      left: position.left,
                      rotate: `${position.rotate}deg`,
                      zIndex: position.z,
                      "--edge-color": student.category === "Engineering" ? "#F5C518" : student.category === "Business" ? "#6D5DFB" : "#10B981",
                    } as CSSProperties
                  }
                  initial={reduceMotion ? false : { opacity: 0, y: 32, rotate: position.rotate - 4 }}
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          opacity: 1,
                          y: [0, -8, 0],
                          rotate: position.rotate,
                        }
                  }
                  transition={
                    reduceMotion
                      ? undefined
                      : {
                          opacity: { duration: 0.56, delay: position.delay, ease: [0.16, 1, 0.3, 1] },
                          y: { duration: 6 + index * 0.4, delay: index * 0.35, repeat: Infinity, ease: "easeInOut" },
                          rotate: { duration: 0.56, delay: position.delay, ease: [0.16, 1, 0.3, 1] },
                        }
                  }
                >
                  <div className="animated-gradient-edge absolute inset-x-0 top-0 h-0.5" aria-hidden="true" />
                  <div className="flex items-start gap-4">
                    <StudentAvatar student={student} className="size-14" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h2 className="truncate text-lg font-bold">{student.name}</h2>
                        <span aria-label={student.nationality}>{student.nationalityFlag}</span>
                      </div>
                      <p className="text-sm text-ink-600">{student.major}</p>
                      <div className="relative mt-3 inline-flex">
                        <span className="absolute inset-0 rounded-full bg-success/20 opacity-0 group-hover:animate-ping group-hover:opacity-100" aria-hidden="true" />
                        <VerifiedBadge />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {student.skills.slice(0, 3).map((skill, chipIndex) => (
                      <motion.span
                        key={skill}
                        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                        transition={{ duration: 0.36, delay: position.delay + chipIndex * 0.06 }}
                      >
                        <Badge variant="gold">{skill}</Badge>
                      </motion.span>
                    ))}
                  </div>
                </motion.article>
              );
            })}
          </div>

          {[["12%", "78%"], ["78%", "18%"], ["88%", "58%"]].map(([left, top], index) => (
            <span
              key={`${left}-${top}`}
              className="absolute size-2 rounded-full bg-gold-500"
              style={{ left, top }}
              aria-hidden="true"
            >
              <span className="absolute inset-0 animate-ping rounded-full bg-gold-500/60" style={{ animationDelay: `${index * 0.8}s` }} />
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
