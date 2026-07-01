import Link from "next/link";
import { Check, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getPlanPeriodLabel, getPlanPrice, getPlanPriceLabel } from "@/lib/billing/utils";
import type { BillingPeriod, PlanTier } from "@/lib/billing/types";
import { cn } from "@/lib/utils";

type Props = {
  plan: PlanTier;
  billingPeriod: BillingPeriod;
  popular?: boolean;
  highlighted?: boolean;
};

function ctaHref(plan: PlanTier, billingPeriod: BillingPeriod) {
  if (plan.level === 4 || plan.yearlyPriceCny === null) {
    return plan.userType === "university" ? "/pricing/university#demo" : "/signup";
  }
  if (plan.userType === "student") {
    return `/student/upgrade?plan=${plan.id}&period=${billingPeriod}`;
  }
  if (plan.userType === "employer") {
    return `/employer/upgrade?plan=${plan.id}&period=${billingPeriod}`;
  }
  return "/pricing/university#demo";
}

export function TierCard({ plan, billingPeriod, popular = plan.popular, highlighted }: Props) {
  const price = getPlanPrice(plan, billingPeriod);
  const isFree = plan.level === 0;
  const isEnterprise = plan.level === 4 && price === null;
  const periodLabel = getPlanPeriodLabel(billingPeriod);
  const yearlyMonthlyEquivalent =
    billingPeriod === "yearly" && price !== null && plan.monthlyPriceCny !== null
      ? Math.round(price / 12)
      : null;

  return (
    <Card
      className={cn(
        "relative gap-0 rounded-lg bg-surface-0 p-8 transition-shadow hover:shadow-[0_18px_42px_rgba(10,14,26,0.10)]",
        popular && "ring-2 ring-gold-500",
        highlighted && "border-ink-900",
      )}
    >
      {popular && (
        <Badge variant="gold" className="absolute right-5 top-5 uppercase tracking-wider">
          Popular
        </Badge>
      )}
      <div className="pr-16">
        <h3 className="text-2xl font-bold tracking-normal text-ink-900">{plan.name}</h3>
        <p className="mt-2 min-h-10 text-sm leading-5 text-ink-500">{plan.tagline}</p>
      </div>

      <div className="mt-8">
        <div className="flex items-end gap-2">
          <span className="text-5xl font-black tracking-normal text-ink-900 tabular-nums">
            {getPlanPriceLabel(plan, billingPeriod)}
          </span>
          {!isFree && !isEnterprise && (
            <span className="pb-2 text-sm font-medium text-ink-500">/{periodLabel}</span>
          )}
        </div>
        {yearlyMonthlyEquivalent !== null && (
          <p className="mt-2 text-sm text-ink-400">
            {`¥${yearlyMonthlyEquivalent}/mo billed yearly`}
          </p>
        )}
        {billingPeriod === "yearly" && plan.yearlySavingsPercent && (
          <p className="mt-1 text-xs font-bold uppercase tracking-wider text-gold-700">
            Save {plan.yearlySavingsPercent}%
          </p>
        )}
      </div>

      <Button
        asChild
        variant={isFree ? "outline" : isEnterprise ? "default" : "primary"}
        className="mt-8 w-full"
      >
        <Link href={ctaHref(plan, billingPeriod)}>
          {plan.cta}
          {popular && <Sparkles className="size-4" aria-hidden="true" />}
        </Link>
      </Button>

      <ul className="mt-8 grid gap-3">
        {plan.features.map((feature) => (
          <li key={feature.label} className="flex gap-3 text-sm leading-5">
            <Check className="mt-0.5 size-4 shrink-0 text-gold-600" aria-hidden="true" />
            <span className={feature.highlight ? "font-semibold text-ink-900" : "text-ink-600"}>
              {feature.label}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
