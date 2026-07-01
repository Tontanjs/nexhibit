"use client";

import * as React from "react";
import { Check, HelpCircle } from "lucide-react";

import { TierCard } from "@/components/billing/TierCard";
import { PricingToggle } from "@/components/billing/PricingToggle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { copy } from "@/lib/copy";
import { getPlansByUserType } from "@/lib/billing/plans";
import type { BillingPeriod, UserType } from "@/lib/billing/types";
import { cn } from "@/lib/utils";

type Props = {
  initialUserType?: UserType;
};

export function PricingTable({ initialUserType = "student" }: Props) {
  const [userType, setUserType] = React.useState<UserType>(initialUserType);
  const [billingPeriod, setBillingPeriod] = React.useState<Extract<BillingPeriod, "monthly" | "yearly">>("monthly");
  const plans = getPlansByUserType(userType);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <PricingToggle
        userType={userType}
        billingPeriod={billingPeriod}
        onUserTypeChange={setUserType}
        onBillingPeriodChange={setBillingPeriod}
      />
      <p className="mx-auto mt-4 max-w-2xl rounded-lg border border-gold-500/25 bg-gold-50/70 px-4 py-3 text-center text-sm font-semibold text-ink-700">
        Prototype billing · No real payment is processed. Prices and checkout flows are mock data for the demo.
      </p>

      <div
        className={cn(
          "mt-10 grid gap-5",
          userType === "student" && "lg:grid-cols-4",
          userType === "employer" && "lg:grid-cols-5",
          userType === "university" && "lg:grid-cols-3",
          "sm:grid-cols-2",
        )}
      >
        {plans.map((plan) => (
          <TierCard key={plan.id} plan={plan} billingPeriod={billingPeriod} />
        ))}
      </div>

      {userType === "student" && (
        <div className="mt-8 flex flex-col gap-3 rounded-lg border border-gold-500/25 bg-gold-50/80 p-5 text-ink-900 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Badge variant="gold">{copy.pricing.studentDiscount.badge}</Badge>
            <p className="mt-2 text-sm leading-6 text-ink-700">{copy.pricing.studentDiscount.description}</p>
          </div>
          <Check className="size-8 text-gold-600" aria-hidden="true" />
        </div>
      )}

      <div className="mt-14 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-gold-700">02 · FAQ</p>
          <h2 className="mt-3 text-3xl font-black tracking-normal text-ink-900">Clear answers before checkout.</h2>
          <p className="mt-3 text-sm leading-6 text-ink-500">
            Pricing, refunds, payment methods, and cancellation are all represented as client-side simulation.
          </p>
        </div>
        <Accordion type="single" collapsible className="rounded-lg border border-ink-200 bg-surface-0 p-2">
          {copy.pricing.faq.map((item) => (
            <AccordionItem key={item.question} value={item.question}>
              <AccordionTrigger className="text-left">
                <span className="flex items-center gap-2">
                  <HelpCircle className="size-4 text-gold-600" aria-hidden="true" />
                  {item.question}
                </span>
              </AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
