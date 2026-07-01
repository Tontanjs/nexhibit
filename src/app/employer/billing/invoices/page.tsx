import Link from "next/link";

import { InvoiceCard } from "@/components/billing/InvoiceCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockEmployerInvoices } from "@/lib/billing/mock-billing-data";

export default function EmployerInvoicesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Button asChild variant="ghost" className="mb-5 text-ink-300">
        <Link href="/employer/billing">Back to billing</Link>
      </Button>
      <section className="aurora-panel neon-border rounded-lg p-6">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-300">01 · INVOICES</p>
        <h1 className="mt-3 text-3xl font-black text-surface-0">Employer invoices & fapiao</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-300">
          Prototype billing · No real payment is processed. Invoice and fapiao records are simulated.
        </p>
      </section>
      <div className="mt-6 flex flex-col gap-3 rounded-lg border border-ink-200 bg-surface-0 p-4 sm:flex-row">
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-[180px]" aria-label="Filter invoices by status"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="issued">Issued</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-[180px]" aria-label="Filter invoices by type"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All types</SelectItem>
            <SelectItem value="invoice">Invoice</SelectItem>
            <SelectItem value="fapiao">Fapiao</SelectItem>
          </SelectContent>
        </Select>
        <p className="self-center text-xs text-ink-400">Filters are visual for this mock invoice view.</p>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {mockEmployerInvoices.map((invoice) => (
          <InvoiceCard key={invoice.id} invoice={invoice} b2b />
        ))}
      </div>
    </div>
  );
}
