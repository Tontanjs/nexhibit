import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CountUp } from "@/components/motion/CountUp";
import { GradientMesh } from "@/components/motion/GradientMesh";
import { GridBackground } from "@/components/motion/GridBackground";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { buttonVariants } from "@/components/ui/button";
import { copy } from "@/lib/copy";
import { cn } from "@/lib/utils";

const d = copy.marketing.finalMotionCta;

export function FinalMotionCTA() {
  return (
    <section className="relative overflow-hidden bg-ink-900 py-24 text-surface-0">
      <GradientMesh className="opacity-35" />
      <GridBackground className="motion-safe:animate-[nexhibit-marquee-left_120s_linear_infinite]" />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <SplitText
          as="h2"
          text={d.heading}
          highlight={["seen"]}
          className="block text-5xl font-extrabold leading-tight tracking-normal sm:text-6xl"
        />
        <Reveal delay={0.2}>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink-300">{d.body}</p>
        </Reveal>
        <Reveal delay={0.32}>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <MagneticButton className="w-full sm:w-auto">
              <Link className={cn(buttonVariants({ variant: "primary", size: "lg" }), "group w-full sm:w-auto")} href="/signup">
                {copy.marketing.finalCta.studentButton}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </MagneticButton>
            <MagneticButton className="w-full sm:w-auto">
              <Link className={cn(buttonVariants({ variant: "inverse", size: "lg" }), "w-full sm:w-auto")} href="/signup">
                {copy.marketing.finalCta.employerButton}
              </Link>
            </MagneticButton>
          </div>
        </Reveal>
        <Reveal delay={0.42}>
          <p className="mt-7 inline-flex items-center gap-2 rounded-full border border-gold-500/20 bg-surface-0/[0.06] px-4 py-2 text-sm text-ink-300">
            <span className="pulse-dot size-1.5 rounded-full bg-gold-500" aria-hidden="true" />
            <CountUp value={47} className="font-bold text-surface-0" />
            <span>{d.liveCounterLabel}</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
