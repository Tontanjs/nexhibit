"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { Button } from "@/components/ui/button";
import { copy } from "@/lib/copy";
import { cn } from "@/lib/utils";

const d = copy.marketing.testimonialCarousel;

export function TestimonialCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const quote = d.quotes[active];

  useEffect(() => {
    if (paused) {
      return undefined;
    }

    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % d.quotes.length);
    }, 6000);

    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <section className="bg-surface-50 py-20 md:py-24">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-wide text-gold-600">{d.caption}</p>
          </Reveal>
          <SplitText
            as="h2"
            text={d.heading}
            highlight={["changed"]}
            className="mt-3 block text-3xl font-bold tracking-normal text-ink-900 md:text-4xl"
          />
        </div>

        <div
          className="group relative mt-10 overflow-hidden rounded-lg border border-ink-200 bg-surface-0 p-6 shadow-xl shadow-ink-900/5 sm:p-10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          data-cursor="view"
        >
          <AnimatePresence mode="wait">
            <motion.article
              key={quote.name}
              initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-3">
                <div className="grid size-12 place-items-center rounded-full bg-ink-900 text-sm font-black text-gold-400">
                  {quote.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div>
                  <p className="font-bold text-ink-900">
                    {quote.name} <span aria-hidden="true">{quote.flag}</span>
                  </p>
                  <p className="text-sm text-ink-500">{quote.program}</p>
                </div>
              </div>
              <blockquote className="mt-8 text-2xl font-semibold leading-snug text-ink-900 sm:text-3xl">
                “{quote.quote}”
              </blockquote>
            </motion.article>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-between gap-4">
            <div className="flex gap-2">
              {d.quotes.map((item, index) => (
                <button
                  key={item.name}
                  className={cn("h-1.5 rounded-full transition-all", index === active ? "w-8 bg-gold-500" : "w-1.5 bg-ink-200")}
                  onClick={() => setActive(index)}
                  aria-label={`Show quote ${index + 1}`}
                />
              ))}
            </div>
            <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
              <Button
                variant="outline"
                size="icon-sm"
                aria-label="Show previous quote"
                onClick={() => setActive((active - 1 + d.quotes.length) % d.quotes.length)}
              >
                <ArrowLeft className="size-4" />
              </Button>
              <Button
                variant="outline"
                size="icon-sm"
                aria-label="Show next quote"
                onClick={() => setActive((active + 1) % d.quotes.length)}
              >
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
