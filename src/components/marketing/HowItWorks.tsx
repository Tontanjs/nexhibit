import { Calendar, ShieldCheck, Sparkles } from "lucide-react";

import { Card } from "@/components/ui/card";
import { copy } from "@/lib/copy";

const icons = [ShieldCheck, Calendar, Sparkles];

export function HowItWorks() {
  return (
    <section className="bg-surface-50 py-20 md:py-24" id="how-it-works">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-gold-600">{copy.marketing.howItWorks.caption}</p>
          <h2 className="mt-3 text-3xl font-bold tracking-normal text-ink-900 md:text-4xl">
            {copy.marketing.howItWorks.heading}
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {copy.marketing.howItWorks.steps.map((step, index) => {
            const Icon = icons[index];

            return (
              <Card key={step.title} className="p-8 shadow-sm">
                <div className="flex size-12 items-center justify-center rounded-full bg-gold-50 text-gold-600">
                  <Icon className="size-6" aria-hidden="true" />
                </div>
                <h3 className="mt-6 text-2xl font-semibold text-ink-900">{step.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-ink-600">{step.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
