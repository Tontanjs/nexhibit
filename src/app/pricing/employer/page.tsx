import { PricingTable } from "@/components/billing/PricingTable";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { formatCny } from "@/lib/billing/utils";

const roiRows = [
  { tier: "Starter", annual: 3999, hires: 1 },
  { tier: "Growth", annual: 12999, hires: 4 },
  { tier: "Scale", annual: 35999, hires: 12 },
];

export default function EmployerPricingPage() {
  return (
    <>
      <Navbar />
      <main className="bg-background">
        <section className="bg-hero-background px-4 py-16 text-surface-0 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-bold uppercase tracking-wider text-gold-400">01 · EMPLOYER PRICING</p>
            <h1 className="mt-4 max-w-3xl text-5xl font-black tracking-normal">Hire international talent with clearer signal.</h1>
            <div className="mt-6 h-px w-16 bg-gold-500" />
          </div>
        </section>
        <PricingTable initialUserType="employer" />
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-ink-200 bg-surface-0 p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-gold-700">02 · ROI CALCULATOR</p>
            <h2 className="mt-2 text-2xl font-black text-ink-900">Estimated cost per hire</h2>
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {roiRows.map((row) => (
                <div key={row.tier} className="rounded-lg border border-ink-200 bg-ink-50 p-4">
                  <p className="font-bold text-ink-900">{row.tier}</p>
                  <p className="mt-2 text-3xl font-black text-ink-900">{formatCny(Math.round(row.annual / row.hires))}</p>
                  <p className="mt-1 text-sm text-ink-500">per hire if {row.hires} hire{row.hires > 1 ? "s" : ""} close annually</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
