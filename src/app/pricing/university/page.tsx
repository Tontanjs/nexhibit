import { PricingTable } from "@/components/billing/PricingTable";
import { UniversityDemoForm } from "@/components/billing/UniversityDemoForm";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export default function UniversityPricingPage() {
  return (
    <>
      <Navbar />
      <main className="bg-background">
        <section className="bg-hero-background px-4 py-16 text-surface-0 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_420px] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gold-400">01 · UNIVERSITY PARTNERSHIP</p>
              <h1 className="mt-4 max-w-3xl text-5xl font-black tracking-normal">A career-services layer for ZJUT international talent.</h1>
              <div className="mt-6 h-px w-16 bg-gold-500" />
              <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-300">
                Explore reverse career fairs, student verification concepts, mock employer analytics, and international talent reporting in one polished prototype workspace.
              </p>
            </div>
            <div className="rounded-xl border border-surface-0/10 bg-surface-0/10 p-5 backdrop-blur">
              <p className="text-xs font-bold uppercase tracking-wider text-gold-400">Case study mockup</p>
              <h2 className="mt-3 text-2xl font-black">ZJUT pilot concept</h2>
              <p className="mt-3 text-sm leading-6 text-ink-300">
                500 students, 50 employer teams, two focused event cycles, and a clearer path from profile evidence to employer conversations.
              </p>
            </div>
          </div>
        </section>
        <PricingTable initialUserType="university" />
        <section id="demo" className="mx-auto grid max-w-7xl gap-8 px-4 pb-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-gold-700">03 · SCHEDULE</p>
            <h2 className="mt-3 text-3xl font-black text-ink-900">Talk through a campus rollout.</h2>
            <p className="mt-3 text-sm leading-6 text-ink-500">
              This form submits to a mock endpoint so the product journey feels complete without sending data externally.
            </p>
          </div>
          <UniversityDemoForm />
        </section>
      </main>
      <Footer />
    </>
  );
}
