import { PricingTable } from "@/components/billing/PricingTable";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export default function StudentPricingPage() {
  return (
    <>
      <Navbar />
      <main className="bg-background">
        <section className="bg-hero-background px-4 py-16 text-surface-0 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-bold uppercase tracking-wider text-gold-400">01 · STUDENT PRICING</p>
            <h1 className="mt-4 max-w-3xl text-5xl font-black tracking-normal">Visibility plans for every student path.</h1>
            <div className="mt-6 h-px w-16 bg-gold-500" />
          </div>
        </section>
        <PricingTable initialUserType="student" />
      </main>
      <Footer />
    </>
  );
}
