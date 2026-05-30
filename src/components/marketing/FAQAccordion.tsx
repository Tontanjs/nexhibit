"use client";

import { motion } from "framer-motion";

import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { copy } from "@/lib/copy";

const d = copy.marketing.faq;

export function FAQAccordion() {
  return (
    <section className="bg-surface-0 py-20 md:py-24">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.55fr_1fr] lg:px-8">
        <div>
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-wide text-gold-600">{d.caption}</p>
          </Reveal>
          <SplitText
            as="h2"
            text={d.heading}
            highlight={["rules"]}
            className="mt-3 block text-3xl font-bold tracking-normal text-ink-900 md:text-4xl"
          />
        </div>

        <Reveal delay={0.15}>
          <Accordion type="single" collapsible className="w-full">
            {d.items.map((item, index) => (
              <AccordionItem key={item.question} value={`item-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {item.answer}
                  </motion.p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
