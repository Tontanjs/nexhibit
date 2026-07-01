import { UpgradeFlow } from "@/components/billing/UpgradeFlow";
import type { BillingPeriod } from "@/lib/billing/types";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function getString(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function getPeriod(value: string | undefined): BillingPeriod {
  if (value === "monthly" || value === "yearly" || value === "semester" || value === "lifetime") {
    return value;
  }
  return "yearly";
}

export default async function EmployerUpgradePage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  return (
    <UpgradeFlow
      userType="employer"
      initialPlanId={getString(params.plan) ?? "employer_growth"}
      initialPeriod={getPeriod(getString(params.period))}
      forceFail={getString(params.simulate) === "fail"}
    />
  );
}
