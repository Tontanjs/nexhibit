import { CountUp } from "@/components/motion/CountUp";
import { GradientMesh } from "@/components/motion/GradientMesh";
import { Reveal } from "@/components/motion/Reveal";
import { platformStats } from "@/lib/mock-data";
import { copy } from "@/lib/copy";

const d = copy.marketing.motionStats;

const stats = [
  { value: 500, suffix: "+", label: d.students },
  { value: 50, suffix: "+", label: d.employers },
  { value: platformStats.eventsPerYear, suffix: "", label: d.events },
  { value: platformStats.verificationRate, suffix: "%", label: d.verified },
];

export function MotionStatsBand() {
  return (
    <section className="relative overflow-hidden bg-ink-900 py-16 text-surface-0">
      <GradientMesh className="opacity-25" />
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="mx-auto mb-10 max-w-2xl text-center text-sm font-semibold uppercase tracking-wide text-gold-400">
            {d.heading}
          </p>
        </Reveal>
        <div className="grid gap-y-8 text-center sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.08}>
              <div className="relative px-5 py-4 lg:after:absolute lg:after:right-0 lg:after:top-6 lg:after:h-16 lg:after:w-px lg:after:bg-gold-500/20 lg:last:after:hidden">
                <div className="text-5xl font-extrabold tracking-normal text-surface-0 md:text-6xl">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-3 text-sm font-medium uppercase tracking-wide text-ink-400">{stat.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
