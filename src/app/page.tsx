import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ComparisonSection } from "@/components/marketing/ComparisonSection";
import { CTASection } from "@/components/marketing/CTASection";
import { DemoAccess } from "@/components/marketing/DemoAccess";
import { Hero } from "@/components/marketing/Hero";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { StatsStrip } from "@/components/marketing/StatsStrip";
import { TestimonialGrid } from "@/components/marketing/TestimonialGrid";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <DemoAccess />
        <HowItWorks />
        <ComparisonSection />
        <StatsStrip />
        <TestimonialGrid />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
