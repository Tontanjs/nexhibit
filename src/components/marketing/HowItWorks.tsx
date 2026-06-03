"use client";

import { Calendar, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { useShouldReduceMotion } from "@/components/motion/motion-preference";
import { Card } from "@/components/ui/card";
import { copy } from "@/lib/copy";

const icons = [ShieldCheck, Calendar, Sparkles];

export function HowItWorks() {
  const reduceMotion = useShouldReduceMotion();

  return (
    <section className="relative overflow-hidden bg-surface-50 py-20 md:py-24" id="how-it-works">
      <div className="absolute inset-x-0 top-1/2 hidden h-px max-w-5xl translate-x-[18%] md:block" aria-hidden="true">
        <motion.svg
          viewBox="0 0 1000 80"
          className="h-20 w-full text-gold-500/45"
          initial={reduceMotion ? false : { strokeDashoffset: 1000 }}
          whileInView={reduceMotion ? undefined : { strokeDashoffset: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.path
            d="M10 40 C220 20 290 60 470 38 C650 16 710 62 990 34"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="8 10"
            strokeLinecap="round"
          />
        </motion.svg>
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-wide text-gold-600">{copy.marketing.howItWorks.caption}</p>
          </Reveal>
          <SplitText
            as="h2"
            text={copy.marketing.howItWorks.heading}
            highlight={["NEXHIBIT"]}
            className="mt-3 block text-3xl font-bold tracking-normal text-ink-900 md:text-4xl"
          />
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {copy.marketing.howItWorks.steps.map((step, index) => {
            const Icon = icons[index];

            return (
              <Reveal key={step.title} delay={index * 0.1}>
                <Card className="group relative min-h-[290px] overflow-hidden p-8 transition-all hover:-translate-y-1 hover:border-gold-500/35 hover:shadow-xl">
                  <motion.span
                    className="absolute right-6 top-4 text-6xl font-black leading-none text-ink-100 transition-colors group-hover:text-gold-50"
                    initial={reduceMotion ? false : { opacity: 0, scale: 1.2 }}
                    whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.56, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    0{index + 1}
                  </motion.span>
                  <motion.div
                    className="relative flex size-12 items-center justify-center rounded-lg border border-gold-500/20 bg-gold-50 text-gold-600"
                    whileInView={
                      reduceMotion
                        ? undefined
                        : index === 0
                          ? { rotate: 360 }
                          : index === 1
                            ? { rotateX: [0, 28, 0] }
                            : { scale: [1, 1.15, 1] }
                    }
                    viewport={{ once: true }}
                    transition={{ duration: 0.78, delay: 0.15 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Icon className="size-6" aria-hidden="true" />
                  </motion.div>
                  <h3 className="relative mt-6 text-2xl font-semibold text-ink-900">{step.title}</h3>
                  <p className="relative mt-3 text-base leading-relaxed text-ink-600">{step.description}</p>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
