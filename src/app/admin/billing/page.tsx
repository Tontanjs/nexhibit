import Link from "next/link";
import { ArrowUpRight, CircleDollarSign, Users, TrendingDown, WalletCards } from "lucide-react";

import { AdminRevenueChart } from "@/components/billing/AdminRevenueChart";
import { BillingHistoryTable } from "@/components/billing/BillingHistoryTable";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  mockKpis,
  mockMonthlyRevenue,
  mockRecentTransactions,
  mockTopCustomers,
} from "@/lib/billing/mock-billing-data";
import { formatCny } from "@/lib/billing/utils";

const kpis = [
  { label: "MRR", value: formatCny(mockKpis.mrr), icon: CircleDollarSign, trend: "+14.2%" },
  { label: "ARR", value: formatCny(mockKpis.arr), icon: WalletCards, trend: "+18.9%" },
  { label: "Total Customers", value: String(mockKpis.totalCustomers), icon: Users, trend: "+32" },
  { label: "Churn Rate", value: `${mockKpis.churnRate}%`, icon: TrendingDown, trend: "-0.8%" },
];

export default function AdminBillingPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="aurora-panel neon-border rounded-lg p-6 sm:p-7">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-300">01 · BILLING OPS</p>
        <h1 className="mt-3 text-3xl font-black text-surface-0 sm:text-4xl">Revenue command center</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-300">
          Prototype billing · No real payment is processed. Simulated subscription revenue, payment health, customers, and refund operations.
        </p>
      </section>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.label} className="rounded-lg bg-surface-0 p-5">
              <div className="flex items-start justify-between">
                <Icon className="size-5 text-gold-600" aria-hidden="true" />
                <span className="inline-flex items-center gap-1 text-xs font-bold text-success">
                  <ArrowUpRight className="size-3" />
                  {item.trend}
                </span>
              </div>
              <p className="mt-4 text-xs font-bold uppercase tracking-wider text-ink-400">{item.label}</p>
              <p className="mt-1 text-3xl font-black text-ink-900 tabular-nums">{item.value}</p>
            </Card>
          );
        })}
      </div>

      <Card className="mt-6 rounded-lg bg-surface-0 p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-gold-700">02 · REVENUE</p>
            <h2 className="mt-2 text-2xl font-black text-ink-900">12-month revenue split</h2>
          </div>
          <p className="text-sm text-ink-500">Students, employers, and university licenses</p>
        </div>
        <div className="mt-6 overflow-x-auto">
          <AdminRevenueChart data={mockMonthlyRevenue} />
        </div>
      </Card>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="rounded-lg bg-surface-0 p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-black text-ink-900">Recent transactions</h2>
            <Button asChild variant="ghost" size="sm"><Link href="/admin/billing/transactions">View all</Link></Button>
          </div>
          <div className="mt-5">
            <BillingHistoryTable transactions={mockRecentTransactions.slice(0, 10)} />
          </div>
        </Card>
        <Card className="rounded-lg bg-surface-0 p-6">
          <h2 className="text-xl font-black text-ink-900">Top customers</h2>
          <div className="mt-5 grid gap-3">
            {mockTopCustomers.map((customer, index) => (
              <div key={customer.name} className="flex items-center justify-between gap-3 rounded-lg border border-ink-200 bg-ink-50 p-3">
                <div>
                  <p className="text-sm font-bold text-ink-900">{index + 1}. {customer.name}</p>
                  <p className="text-xs text-ink-500">{customer.plan}</p>
                </div>
                <p className="font-bold text-ink-900 tabular-nums">{formatCny(customer.totalSpent)}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button asChild><Link href="/admin/billing/transactions">View all transactions</Link></Button>
        <Button asChild variant="outline"><Link href="/admin/billing/refunds">View refunds</Link></Button>
      </div>
    </div>
  );
}
