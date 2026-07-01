"use client";

import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { copy } from "@/lib/copy";
import type { BillingPeriod, UserType } from "@/lib/billing/types";

type Props = {
  userType: UserType;
  billingPeriod: Extract<BillingPeriod, "monthly" | "yearly">;
  onUserTypeChange: (userType: UserType) => void;
  onBillingPeriodChange: (period: Extract<BillingPeriod, "monthly" | "yearly">) => void;
};

export function PricingToggle({
  userType,
  billingPeriod,
  onUserTypeChange,
  onBillingPeriodChange,
}: Props) {
  const yearly = billingPeriod === "yearly";

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-5">
      <Tabs value={userType} onValueChange={(value) => onUserTypeChange(value as UserType)} className="w-full max-w-2xl">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="student">{copy.pricing.toggle.students}</TabsTrigger>
          <TabsTrigger value="employer">{copy.pricing.toggle.employers}</TabsTrigger>
          <TabsTrigger value="university">{copy.pricing.toggle.university}</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex items-center gap-3 rounded-lg border border-ink-200 bg-surface-0 px-4 py-3 shadow-sm">
        <Label htmlFor="billing-period" className="text-sm font-semibold text-ink-700">
          {copy.pricing.toggle.monthly}
        </Label>
        <Switch
          id="billing-period"
          checked={yearly}
          onCheckedChange={(checked) => onBillingPeriodChange(checked ? "yearly" : "monthly")}
          aria-label="Toggle yearly billing"
        />
        <Label htmlFor="billing-period" className="text-sm font-semibold text-ink-900">
          {copy.pricing.toggle.yearly}
        </Label>
        <Badge variant="gold" className="hidden sm:inline-flex">
          {copy.pricing.toggle.savings}
        </Badge>
      </div>
    </div>
  );
}
