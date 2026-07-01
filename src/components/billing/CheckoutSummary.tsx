import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { copy } from "@/lib/copy";
import type { BillingPeriod, PlanTier } from "@/lib/billing/types";
import { formatCny, getPlanPeriodLabel, getPlanPrice, vatFor } from "@/lib/billing/utils";

type Props = {
  plan: PlanTier;
  billingPeriod: BillingPeriod;
  onEdit?: () => void;
};

export function CheckoutSummary({ plan, billingPeriod, onEdit }: Props) {
  const subtotal = getPlanPrice(plan, billingPeriod) ?? 0;
  const tax = vatFor(subtotal);
  const total = subtotal + tax;

  return (
    <Card className="sticky top-28 rounded-lg bg-surface-0 p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-gold-700">{copy.payment.checkout.summary}</p>
          <h2 className="mt-2 text-xl font-black text-ink-900">{plan.name}</h2>
          <p className="text-sm text-ink-500">{plan.tagline}</p>
        </div>
        {onEdit && (
          <Button type="button" variant="ghost" size="sm" onClick={onEdit}>
            <ArrowLeft className="size-4" />
            Edit
          </Button>
        )}
      </div>
      <div className="mt-6 grid gap-3 text-sm">
        <div className="flex justify-between">
          <span className="text-ink-500">Billing period</span>
          <span className="font-semibold text-ink-900">{getPlanPeriodLabel(billingPeriod)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-ink-500">Subtotal</span>
          <span className="font-semibold text-ink-900">{formatCny(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-ink-500">VAT 6%</span>
          <span className="font-semibold text-ink-900">{formatCny(tax)}</span>
        </div>
        <div className="border-t border-ink-200 pt-3">
          <div className="flex justify-between text-lg font-black text-ink-900">
            <span>{copy.payment.checkout.total}</span>
            <span>{formatCny(total)}</span>
          </div>
        </div>
      </div>
      <p className="mt-5 rounded-lg bg-ink-50 p-3 text-xs leading-5 text-ink-500">
        Prototype billing · No real payment is processed. {copy.payment.checkout.securityNote}
      </p>
    </Card>
  );
}
