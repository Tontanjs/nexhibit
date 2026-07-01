import Link from "next/link";

import { BillingHistoryTable } from "@/components/billing/BillingHistoryTable";
import { Button } from "@/components/ui/button";
import { mockStudentInvoices, mockStudentTransactions } from "@/lib/billing/mock-billing-data";

export default function StudentBillingHistoryPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Button asChild variant="ghost" className="mb-5 text-ink-300">
        <Link href="/student/billing">Back to billing</Link>
      </Button>
      <section className="aurora-panel neon-border rounded-lg p-6">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-300">01 · HISTORY</p>
        <h1 className="mt-3 text-3xl font-black text-surface-0">Billing history</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-300">
          Prototype billing · No real payment is processed. These transactions and receipts are mock records.
        </p>
      </section>
      <div className="mt-8">
        <BillingHistoryTable transactions={mockStudentTransactions} invoices={mockStudentInvoices} showFilters />
      </div>
    </div>
  );
}
