import Link from "next/link";

import { BillingHistoryTable } from "@/components/billing/BillingHistoryTable";
import { InvoiceCard } from "@/components/billing/InvoiceCard";
import { PaymentMethodList } from "@/components/billing/PaymentMethodList";
import { SubscriptionCard } from "@/components/billing/SubscriptionCard";
import { UsageMeter } from "@/components/billing/UsageMeter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  mockCurrentEmployerSubscription,
  mockEmployerInvoices,
  mockEmployerPaymentMethods,
  mockEmployerTransactions,
  mockEmployerUsage,
} from "@/lib/billing/mock-billing-data";

export default function EmployerBillingPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="aurora-panel neon-border rounded-lg p-6 sm:p-7">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-300">01 · BILLING</p>
        <h1 className="mt-3 text-3xl font-black text-surface-0 sm:text-4xl">Subscription & Billing</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-300">
          Track hiring plan spend, team seats, payment methods, and fapiao requests in demo mode.
        </p>
      </section>

      <div className="mt-8 space-y-6">
        <SubscriptionCard subscription={mockCurrentEmployerSubscription} upgradeHref="/employer/upgrade" />
        <div className="grid gap-5 lg:grid-cols-[1fr_0.85fr]">
          <Card className="rounded-lg bg-surface-0 p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-gold-700">Usage this month</p>
            <div className="mt-5 grid gap-5">
              <UsageMeter label="Messages sent" current={mockEmployerUsage.messagesSent} limit={-1} />
              <UsageMeter label="Profiles viewed" current={mockEmployerUsage.profilesViewed} limit={-1} />
              <UsageMeter label="Shortlisted students" current={mockEmployerUsage.shortlistedStudents} limit={100} />
              <UsageMeter label="Events attended" current={mockEmployerUsage.eventsAttended} limit={2} />
            </div>
          </Card>
          <Card className="rounded-lg bg-surface-0 p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-gold-700">Team seats</p>
            <h2 className="mt-3 text-2xl font-black text-ink-900">You&apos;re using 3 of 5 seats.</h2>
            <p className="mt-3 text-sm leading-6 text-ink-500">Add seats visually in this prototype. No billing change is sent.</p>
            <Button className="mt-5" asChild>
              <Link href="/employer/upgrade">Add seat in plan demo</Link>
            </Button>
          </Card>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          <Card className="rounded-lg bg-surface-0 p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-black text-ink-900">Recent invoices</h2>
              <Button asChild variant="ghost" size="sm"><Link href="/employer/billing/invoices">View all</Link></Button>
            </div>
            <div className="mt-5 grid gap-3">
              {mockEmployerInvoices.slice(0, 2).map((invoice) => (
                <InvoiceCard key={invoice.id} invoice={invoice} b2b />
              ))}
            </div>
          </Card>
          <Card className="rounded-lg bg-surface-0 p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-black text-ink-900">Payment methods</h2>
              <Button asChild variant="ghost" size="sm"><Link href="/employer/billing/payment-methods">Manage</Link></Button>
            </div>
            <div className="mt-5">
              <PaymentMethodList methods={mockEmployerPaymentMethods.slice(0, 2)} userType="employer" />
            </div>
          </Card>
        </div>
        <BillingHistoryTable transactions={mockEmployerTransactions} invoices={mockEmployerInvoices} />
      </div>
    </div>
  );
}
