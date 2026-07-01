"use client";

import { use } from "react";
import Link from "next/link";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  mockEmployerInvoices,
  mockEmployerTransactions,
  mockStudentInvoices,
  mockStudentTransactions,
} from "@/lib/billing/mock-billing-data";
import { formatCny, formatDate } from "@/lib/billing/utils";

export default function ReceiptPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const transactions = [...mockStudentTransactions, ...mockEmployerTransactions];
  const invoices = [...mockStudentInvoices, ...mockEmployerInvoices];
  const transaction = transactions.find((item) => item.id === id) ?? transactions[0];
  const invoice = invoices.find((item) => item.transactionId === transaction.id);
  const tax = invoice?.taxCny ?? Math.round(transaction.amountCny * 0.06);

  return (
    <main className="min-h-screen bg-surface-0 px-6 py-10 text-ink-900">
      <div className="mx-auto max-w-3xl">
        <header className="mb-8 flex items-center justify-between gap-4 print:hidden">
          <Link href="/" className="text-sm font-bold text-ink-900">NEXHIBIT prototype</Link>
          <ThemeToggle compact />
        </header>
        <div className="mb-6 rounded-lg border border-gold-200 bg-gold-50 px-4 py-3">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-gold-700">
            Prototype billing · No real payment is processed.
          </p>
        </div>
        <div className="flex items-start justify-between gap-6 border-b border-ink-200 pb-6">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-gold-700">NEXHIBIT class prototype</p>
            <h1 className="mt-2 text-3xl font-black">Simulated receipt</h1>
            <p className="mt-2 text-sm text-ink-500">Mock billing record for product demonstration only.</p>
          </div>
          <div className="text-right">
            <p className="font-bold">{invoice?.invoiceNumber ?? `REC-${transaction.id}`}</p>
            <p className="text-sm text-ink-500">{formatDate(invoice?.issuedAt ?? transaction.createdAt)}</p>
          </div>
        </div>
        <table className="mt-8 w-full text-left text-sm">
          <tbody>
            <tr className="border-b border-ink-200">
              <th className="py-3">Description</th>
              <td className="py-3">{transaction.description}</td>
            </tr>
            <tr className="border-b border-ink-200">
              <th className="py-3">Transaction</th>
              <td className="py-3 font-mono text-xs">{transaction.id}</td>
            </tr>
            <tr className="border-b border-ink-200">
              <th className="py-3">Subtotal</th>
              <td className="py-3">{formatCny(transaction.amountCny)}</td>
            </tr>
            <tr className="border-b border-ink-200">
              <th className="py-3">VAT 6%</th>
              <td className="py-3">{formatCny(tax)}</td>
            </tr>
            <tr>
              <th className="py-5 text-xl">Total</th>
              <td className="py-5 text-xl font-black">{formatCny(transaction.amountCny + tax)}</td>
            </tr>
          </tbody>
        </table>
        <div className="mt-8 flex gap-3 print:hidden">
          <Button type="button" onClick={() => window.print()}>Print</Button>
          <Button asChild variant="outline"><Link href="/">Back home</Link></Button>
        </div>
        <p className="mt-10 text-xs text-ink-400">This simulated receipt is not a tax document, invoice, or proof of payment.</p>
      </div>
    </main>
  );
}
