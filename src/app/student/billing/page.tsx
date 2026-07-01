"use client";

import * as React from "react";
import Link from "next/link";

import { BillingHistoryTable } from "@/components/billing/BillingHistoryTable";
import { BillingProvider, useBilling } from "@/components/billing/BillingProvider";
import { CancellationFlow } from "@/components/billing/CancellationFlow";
import { InvoiceCard } from "@/components/billing/InvoiceCard";
import { PaymentMethodList } from "@/components/billing/PaymentMethodList";
import { SubscriptionCard } from "@/components/billing/SubscriptionCard";
import { UsageMeter } from "@/components/billing/UsageMeter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  mockStudentInvoices,
  mockStudentPaymentMethods,
  mockStudentTransactions,
  mockStudentUsage,
} from "@/lib/billing/mock-billing-data";
import { copy } from "@/lib/copy";

function StudentBillingContent() {
  const [cancelOpen, setCancelOpen] = React.useState(false);
  const { studentSubscription, cancelSubscription, resubscribe } = useBilling();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="aurora-panel neon-border rounded-lg p-6 sm:p-7">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-300">01 · BILLING</p>
        <h1 className="mt-3 text-3xl font-black text-surface-0 sm:text-4xl">Billing & Subscription</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-300">
          Manage your simulated NEXHIBIT subscription, receipts, payment methods, and usage.
        </p>
      </section>

      <Tabs defaultValue="overview" className="mt-8">
        <TabsList className="grid grid-cols-4 overflow-x-auto">
          <TabsTrigger value="overview">{copy.billing.sidebar.overview}</TabsTrigger>
          <TabsTrigger value="history">{copy.billing.sidebar.history}</TabsTrigger>
          <TabsTrigger value="methods">{copy.billing.sidebar.paymentMethods}</TabsTrigger>
          <TabsTrigger value="invoices">{copy.billing.sidebar.invoices}</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-6">
          <SubscriptionCard subscription={studentSubscription} upgradeHref="/student/upgrade" onCancel={() => setCancelOpen(true)} />
          <div className="grid gap-5 lg:grid-cols-[1fr_0.85fr]">
            <Card className="rounded-lg bg-surface-0 p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-gold-700">{copy.billing.overview.usageThisMonth}</p>
              <div className="mt-5 grid gap-5">
                <UsageMeter label={copy.billing.usage.applications} current={mockStudentUsage.applicationsThisMonth} limit={-1} />
                <UsageMeter label={copy.billing.usage.messages} current={mockStudentUsage.messagesThisMonth} limit={-1} />
                <UsageMeter label={copy.billing.usage.profileViews} current={mockStudentUsage.profileViewsThisMonth} limit={250} />
                <UsageMeter label={copy.billing.usage.boosts} current={mockStudentUsage.profileBoostsUsed} limit={12} />
              </div>
            </Card>
            <Card className="rounded-lg bg-surface-0 p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-gold-700">{copy.billing.overview.nextBilling}</p>
              <h2 className="mt-3 text-2xl font-black text-ink-900">Annual renewal prepared</h2>
              <p className="mt-3 text-sm leading-6 text-ink-500">
                Your next simulated charge will use the default Alipay method. No real payment will be made.
              </p>
              <Button asChild className="mt-5">
                <Link href="/student/upgrade">Change plan</Link>
              </Button>
              <button type="button" onClick={() => setCancelOpen(true)} className="mt-4 block text-sm font-semibold text-ink-500 hover:text-ink-900">
                Cancel subscription
              </button>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="history">
          <BillingHistoryTable transactions={mockStudentTransactions} invoices={mockStudentInvoices} showFilters />
        </TabsContent>
        <TabsContent value="methods">
          <PaymentMethodList methods={mockStudentPaymentMethods} userType="student" />
        </TabsContent>
        <TabsContent value="invoices">
          <div className="grid gap-4 md:grid-cols-2">
            {mockStudentInvoices.map((invoice) => (
              <InvoiceCard key={invoice.id} invoice={invoice} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={cancelOpen} onOpenChange={setCancelOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>{copy.billing.cancel.title}</DialogTitle>
          </DialogHeader>
          <CancellationFlow
            onCancel={() => cancelSubscription("student")}
            onKeep={() => {
              resubscribe("student");
              setCancelOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function StudentBillingPage() {
  return (
    <BillingProvider>
      <StudentBillingContent />
    </BillingProvider>
  );
}
