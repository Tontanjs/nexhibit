import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { TiltCard } from "@/components/motion/TiltCard";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { copy } from "@/lib/copy";
import { cn } from "@/lib/utils";

const d = copy.marketing.demo;

const portals = [
  {
    icon: "student",
    ...d.student,
    href: "/student/dashboard",
  },
  {
    icon: "employer",
    ...d.employer,
    href: "/employer/dashboard",
  },
  {
    icon: "admin",
    ...d.admin,
    href: "/admin",
  },
] as const;

function MotionIcon({ type }: { type: (typeof portals)[number]["icon"] }) {
  if (type === "student") {
    return (
      <div className="relative size-8">
        <div className="absolute left-1/2 top-2 h-3 w-7 -translate-x-1/2 rotate-[-8deg] rounded-sm bg-gold-500 transition-transform duration-300 group-hover:-translate-y-1" />
        <div className="absolute left-1/2 top-4 h-3 w-5 -translate-x-1/2 rounded-b-md bg-ink-900" />
        <div className="absolute right-1 top-4 h-3 w-px bg-gold-500 transition-transform duration-300 group-hover:rotate-12" />
      </div>
    );
  }

  if (type === "employer") {
    return (
      <div className="flex h-8 items-end gap-1.5">
        {[18, 26, 13].map((height, index) => (
          <span
            key={height}
            className="w-2 rounded-t bg-gold-500 transition-all duration-300 group-hover:h-8"
            style={{ height, transitionDelay: `${index * 60}ms` }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid size-8 grid-cols-2 gap-1">
      {[0, 1, 2, 3].map((index) => (
        <span
          key={index}
          className="rounded-sm bg-ink-800 transition-colors duration-300 group-hover:bg-gold-500"
          style={{ transitionDelay: `${index * 70}ms` }}
        />
      ))}
    </div>
  );
}

export function DemoAccess() {
  return (
    <section className="border-b border-ink-200 bg-surface-0 py-14 md:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col items-center gap-2 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-50 px-3 py-1">
              <span className="pulse-dot size-1.5 rounded-full bg-gold-500" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-wide text-ink-700">{d.eyebrow}</span>
            </div>
          </Reveal>
          <SplitText
            as="p"
            text={d.subheading}
            className="max-w-2xl text-sm leading-relaxed text-ink-500"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {portals.map(({ icon, label, description, cta, href }, index) => (
            <Reveal key={label} delay={index * 0.12}>
              <TiltCard glare max={6}>
                <Card className="glow-card group relative flex min-h-[220px] flex-col gap-5 overflow-hidden p-5 transition-all hover:-translate-y-1 hover:border-gold-500/40 hover:shadow-xl">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" aria-hidden="true" />
                  <div className="flex items-start gap-3">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-md border border-border bg-background text-gold-500 shadow-sm transition-colors group-hover:border-gold-500/40 group-hover:bg-gold-50">
                      <MotionIcon type={icon} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground">{label}</p>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{description}</p>
                    </div>
                  </div>
                  <Link
                    href={href}
                    className={cn(buttonVariants({ variant: "outline", size: "sm" }), "group/link mt-auto w-full overflow-hidden")}
                  >
                    <ArrowRight className="-ml-6 size-4 opacity-0 transition-all group-hover/link:ml-0 group-hover/link:opacity-100" aria-hidden="true" />
                    <span className="transition-transform group-hover/link:translate-x-1">{cta}</span>
                  </Link>
                </Card>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
