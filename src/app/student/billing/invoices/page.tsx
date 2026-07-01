import Link from "next/link";

import { InvoiceCard } from "@/components/billing/InvoiceCard";
import { Button } from "@/components/ui/button";
import { mockStudentInvoices } from "@/lib/billing/mock-billing-data";

export default function StudentInvoicesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Button asChild variant="ghost" className="mb-5 text-ink-300">
        <Link href="/student/billing">Back to billing</Link>
      </Button>
      <section className="aurora-panel neon-border rounded-lg p-6">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-300">01 · INVOICES</p>
        <h1 className="mt-3 text-3xl font-black text-surface-0">Student receipts</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-300">
          Prototype billing · No real payment is processed. These receipts are mock records for the demo.
        </p>
      </section>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {mockStudentInvoices.map((invoice) => (
          <InvoiceCard key={invoice.id} invoice={invoice} />
        ))}
      </div>
    </div>
  );
}
