import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ComparisonSection } from "@/components/marketing/ComparisonSection";
import { DemoAccess } from "@/components/marketing/DemoAccess";
import { EmployerMarquee } from "@/components/marketing/EmployerMarquee";
import { FAQAccordion } from "@/components/marketing/FAQAccordion";
import { FinalMotionCTA } from "@/components/marketing/FinalMotionCTA";
import { Hero } from "@/components/marketing/Hero";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { LiveActivityTicker } from "@/components/marketing/LiveActivityTicker";
import { LogoCloud } from "@/components/marketing/LogoCloud";
import { MotionStatsBand } from "@/components/marketing/MotionStatsBand";
import { PostOfferCallout } from "@/components/marketing/PostOfferCallout";
import { TestimonialCarousel } from "@/components/marketing/TestimonialCarousel";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <LiveActivityTicker />
        <EmployerMarquee />
        <DemoAccess />
        <HowItWorks />
        <LogoCloud />
        <ComparisonSection />
        <MotionStatsBand />
        <TestimonialCarousel />
        <FAQAccordion />
        <PostOfferCallout />
        <FinalMotionCTA />
      </main>
      <Footer />
    </>
  );
}
