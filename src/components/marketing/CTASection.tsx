import Link from "next/link";

import { FloorPlan } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { copy } from "@/lib/copy";
import { cn } from "@/lib/utils";

export function CTASection() {
  return (
    <section className="overflow-hidden bg-gold-500 py-20">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-[1fr_0.9fr] md:items-center lg:px-8">
        <div className="text-center md:text-left">
          <h2 className="text-4xl font-bold leading-tight tracking-normal text-ink-900 md:text-5xl">
            {copy.marketing.finalCta.heading}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink-800 md:mx-0">{copy.marketing.finalCta.body}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
            <Link className={cn(buttonVariants({ variant: "default", size: "lg" }))} href="/signup">
              {copy.marketing.finalCta.studentButton}
            </Link>
            <Link className={cn(buttonVariants({ variant: "secondary", size: "lg" }))} href="/signup">
              {copy.marketing.finalCta.employerButton}
            </Link>
          </div>
        </div>
        <FloorPlan
          highlightedBooth="B-23"
          className="hidden h-auto w-full max-w-xl rounded-lg border border-ink-900/10 shadow-2xl shadow-ink-900/25 md:block"
          numbering="global"
        />
      </div>
    </section>
  );
}
