import { platformStats } from "@/lib/mock-data";
import { copy } from "@/lib/copy";

const stats = [
  { value: `${platformStats.studentsRegistered}+`, label: copy.marketing.statsLabels.students },
  { value: String(platformStats.employersOnboarded), label: copy.marketing.statsLabels.employers },
  { value: String(platformStats.countriesRepresented), label: copy.marketing.statsLabels.countries },
  { value: `${platformStats.verificationRate}%`, label: copy.marketing.statsLabels.verified },
];

export function StatsStrip() {
  return (
    <section className="bg-dark py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mx-auto mb-10 max-w-2xl text-center text-sm font-semibold uppercase tracking-wide text-gold-400">
          {copy.marketing.stats.heading}
        </p>
        <div className="grid gap-4 text-center sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-lg border border-surface-0/10 bg-surface-0/[0.04] px-5 py-6">
              <div className="text-5xl font-extrabold tracking-normal text-gold-500 md:text-6xl">{stat.value}</div>
              <div className="mt-3 text-sm font-medium uppercase tracking-wide text-ink-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
