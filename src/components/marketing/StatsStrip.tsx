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
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 text-center sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {stats.map((stat) => (
          <div key={stat.label}>
            <div className="text-5xl font-extrabold tracking-normal text-gold-500 md:text-6xl">{stat.value}</div>
            <div className="mt-3 text-sm font-medium uppercase tracking-wide text-ink-400">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
