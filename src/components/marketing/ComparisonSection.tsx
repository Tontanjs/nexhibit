"use client";

import { CheckCircle2, XCircle } from "lucide-react";
import { motion } from "framer-motion";

import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { useShouldReduceMotion } from "@/components/motion/motion-preference";
import { Card } from "@/components/ui/card";
import { copy } from "@/lib/copy";

export function ComparisonSection() {
  const reduceMotion = useShouldReduceMotion();

  return (
    <section className="relative overflow-hidden bg-surface-0 py-20 md:py-24" id="comparison">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <SplitText
          as="h2"
          text={copy.marketing.comparisonDetails.heading}
          highlight={["Reverse"]}
          className="mx-auto block max-w-3xl text-center text-3xl font-bold tracking-normal text-ink-900 md:text-4xl"
        />

        <div className="relative mt-12 grid gap-6 md:grid-cols-2 md:items-stretch">
          <motion.div
            className="absolute left-1/2 top-4 hidden h-[calc(100%-2rem)] w-px origin-top bg-gradient-to-b from-transparent via-gold-500/70 to-transparent md:block"
            initial={reduceMotion ? false : { scaleY: 0 }}
            whileInView={reduceMotion ? undefined : { scaleY: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden="true"
          />

          <Reveal direction="right">
            <Card className="min-h-full bg-ink-100 p-8 shadow-none transition hover:-translate-y-0.5 hover:shadow-lg">
              <p className="text-xs font-medium uppercase tracking-wide text-ink-500">{copy.marketing.comparison.traditionalCaption}</p>
              <h3 className="mt-4 text-2xl font-semibold text-ink-900">{copy.marketing.comparison.traditionalTitle}</h3>
              <ul className="mt-8 grid gap-4">
                {copy.marketing.comparisonDetails.traditionalItems.map((item, index) => (
                  <motion.li
                    key={item}
                    className="flex gap-3 text-base leading-relaxed text-ink-700"
                    initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                    whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.42, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <motion.span
                      initial={reduceMotion ? false : { scale: 0 }}
                      whileInView={reduceMotion ? undefined : { scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.32, delay: index * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
                    >
                      <XCircle className="mt-1 size-5 shrink-0 text-error" aria-hidden="true" />
                    </motion.span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </Card>
          </Reveal>

          <Reveal direction="left">
            <Card className="min-h-full border-ink-900 bg-ink-900 p-8 text-surface-0 shadow-2xl shadow-ink-900/25 transition hover:-translate-y-1 hover:border-gold-500/70 hover:shadow-gold-500/10 md:scale-[1.03]">
              <p className="text-xs font-medium uppercase tracking-wide text-gold-400">{copy.marketing.comparison.reverseCaption}</p>
              <h3 className="mt-4 text-2xl font-semibold text-surface-0">{copy.marketing.comparison.reverseTitle}</h3>
              <ul className="mt-8 grid gap-4">
                {copy.marketing.comparisonDetails.reverseItems.map((item, index) => (
                  <motion.li
                    key={item}
                    className="flex gap-3 text-base leading-relaxed text-ink-100"
                    initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                    whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.42, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <motion.span
                      initial={reduceMotion ? false : { scale: 0 }}
                      whileInView={reduceMotion ? undefined : { scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.32, delay: index * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
                    >
                      <CheckCircle2 className="mt-1 size-5 shrink-0 text-gold-500" aria-hidden="true" />
                    </motion.span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
