import { CheckCircle2, XCircle } from "lucide-react";

import { Card } from "@/components/ui/card";
import { copy } from "@/lib/copy";

export function ComparisonSection() {
  return (
    <section className="bg-surface-0 py-20 md:py-24" id="comparison">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="mx-auto max-w-3xl text-center text-3xl font-bold tracking-normal text-ink-900 md:text-4xl">
          {copy.marketing.comparisonDetails.heading}
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2 md:items-stretch">
          <Card className="bg-ink-100 p-8 shadow-none">
            <p className="text-xs font-medium uppercase tracking-wide text-ink-500">{copy.marketing.comparison.traditionalCaption}</p>
            <h3 className="mt-4 text-2xl font-semibold text-ink-900">{copy.marketing.comparison.traditionalTitle}</h3>
            <ul className="mt-8 grid gap-4">
              {copy.marketing.comparisonDetails.traditionalItems.map((item) => (
                <li key={item} className="flex gap-3 text-base leading-relaxed text-ink-700">
                  <XCircle className="mt-1 size-5 shrink-0 text-error" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="border-ink-900 bg-ink-900 p-8 text-surface-0 shadow-2xl shadow-ink-900/25 md:scale-[1.03]">
            <p className="text-xs font-medium uppercase tracking-wide text-gold-400">{copy.marketing.comparison.reverseCaption}</p>
            <h3 className="mt-4 text-2xl font-semibold text-surface-0">{copy.marketing.comparison.reverseTitle}</h3>
            <ul className="mt-8 grid gap-4">
              {copy.marketing.comparisonDetails.reverseItems.map((item) => (
                <li key={item} className="flex gap-3 text-base leading-relaxed text-ink-100">
                  <CheckCircle2 className="mt-1 size-5 shrink-0 text-gold-500" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </section>
  );
}
