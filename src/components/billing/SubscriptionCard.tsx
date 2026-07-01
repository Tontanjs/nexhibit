import Link from "next/link";
import { CalendarDays, CreditCard, Settings } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getPlanById } from "@/lib/billing/plans";
import type { Subscription } from "@/lib/billing/types";
import { daysUntil, formatCny, formatDate, getPlanPrice } from "@/lib/billing/utils";
import { cn } from "@/lib/utils";

type Props = {
  subscription: Subscription;
  upgradeHref: string;
  onCancel?: () => void;
};

export function SubscriptionCard({ subscription, upgradeHref, onCancel }: Props) {
  const plan = getPlanById(subscription.planId);
  const price = plan ? getPlanPrice(plan, subscription.billingPeriod) : null;
  const active = subscription.status === "active";

  return (
    <Card className="rounded-lg bg-surface-0 p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className={cn("size-2 rounded-full", active ? "bg-success" : "bg-warning")} aria-hidden="true" />
            <Badge variant={active ? "success" : "gold"}>{subscription.status.replace("_", " ")}</Badge>
            {plan?.popular && <Badge variant="gold">Popular plan</Badge>}
          </div>
          <h2 className="mt-3 text-2xl font-black text-ink-900">{plan?.name ?? "Unknown plan"}</h2>
          <p className="mt-1 text-sm text-ink-500">{plan?.tagline}</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[420px]">
          <div className="rounded-lg border border-ink-200 bg-ink-50 p-4">
            <CreditCard className="size-4 text-gold-600" aria-hidden="true" />
            <p className="mt-2 text-xs font-bold uppercase tracking-wider text-ink-400">Price</p>
            <p className="font-bold text-ink-900">{price === null ? "Custom" : formatCny(price)}</p>
          </div>
          <div className="rounded-lg border border-ink-200 bg-ink-50 p-4">
            <CalendarDays className="size-4 text-gold-600" aria-hidden="true" />
            <p className="mt-2 text-xs font-bold uppercase tracking-wider text-ink-400">Next billing</p>
            <p className="font-bold text-ink-900">{formatDate(subscription.currentPeriodEnd)}</p>
            <p className="text-xs text-ink-500">Renews in {daysUntil(subscription.currentPeriodEnd)} days</p>
          </div>
        </div>
      </div>
      {subscription.cancelAtPeriodEnd && (
        <p className="mt-5 rounded-lg border border-warning/20 bg-warning/10 p-3 text-sm font-medium text-ink-700">
          Subscription will end on {formatDate(subscription.currentPeriodEnd)}.
        </p>
      )}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button asChild>
          <Link href={upgradeHref}>
            <Settings className="size-4" />
            Manage
          </Link>
        </Button>
        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel} className="text-ink-500">
            Cancel
          </Button>
        )}
      </div>
    </Card>
  );
}
