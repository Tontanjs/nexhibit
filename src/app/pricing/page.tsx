import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { PricingTable } from "@/components/billing/PricingTable";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { copy } from "@/lib/copy";

const matrix = [
  { category: "Profile", free: "3 projects", plus: "Unlimited projects", pro: "Smart suggestions", max: "Monthly review" },
  { category: "Visibility", free: "Basic match", plus: "Viewer insights", pro: "Priority booking", max: "Premium booth" },
  { category: "Communication", free: "10 messages", plus: "Unlimited", pro: "Direct outreach", max: "Calendar booking" },
  { category: "Events", free: "1 booth", plus: "Standard booking", pro: "24h early access", max: "Priority location" },
  { category: "Support", free: "Help center", plus: "Email support", pro: "Career mentor", max: "1-on-1 coaching" },
];

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="bg-background">
        <section className="relative overflow-hidden bg-hero-background px-4 py-20 text-surface-0 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-bold uppercase tracking-wider text-gold-400">01 · {copy.pricing.hero.eyebrow}</p>
            <h1 className="mt-5 max-w-3xl text-5xl font-black leading-tight tracking-normal sm:text-6xl">
              {copy.pricing.hero.headline}
            </h1>
            <div className="mt-6 h-px w-16 bg-gold-500" aria-hidden="true" />
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-300">{copy.pricing.hero.subheadline}</p>
          </div>
        </section>

        <PricingTable initialUserType="student" />

        <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-wider text-gold-700">03 · COMPARISON</p>
            <h2 className="mt-3 text-3xl font-black text-ink-900">{copy.pricing.comparison.title}</h2>
            <p className="mt-2 text-sm text-ink-500">{copy.pricing.comparison.subtitle}</p>
          </div>
          <div className="overflow-x-auto rounded-lg border border-ink-200 bg-surface-0">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="sticky top-0 bg-surface-0 text-xs uppercase tracking-wider text-ink-400">
                <tr>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Free</th>
                  <th className="px-4 py-3">Plus</th>
                  <th className="px-4 py-3">Pro</th>
                  <th className="px-4 py-3">Max</th>
                </tr>
              </thead>
              <tbody>
                {matrix.map((row) => (
                  <tr key={row.category} className="border-t border-ink-100">
                    <td className="px-4 py-4 font-bold text-ink-900">{row.category}</td>
                    <td className="px-4 py-4 text-ink-600">{row.free}</td>
                    <td className="px-4 py-4 text-ink-600">{row.plus}</td>
                    <td className="px-4 py-4 text-ink-900"><Check className="mr-2 inline size-4 text-gold-600" />{row.pro}</td>
                    <td className="px-4 py-4 text-ink-900"><Check className="mr-2 inline size-4 text-gold-600" />{row.max}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-ink-900 px-4 py-16 text-surface-0 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="max-w-2xl text-3xl font-black tracking-normal">{copy.pricing.ctaSection.headline}</h2>
            <Button asChild>
              <Link href="/about">
                {copy.pricing.ctaSection.button}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
