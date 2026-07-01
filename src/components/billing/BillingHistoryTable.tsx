"use client";

import * as React from "react";
import { ArrowDownUp, Download } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Invoice, Transaction, TransactionStatus } from "@/lib/billing/types";
import { formatCny, formatDate, printableReceiptHtml, statusLabel } from "@/lib/billing/utils";

type Props = {
  transactions: Transaction[];
  invoices?: Invoice[];
  showFilters?: boolean;
};

const statuses: Array<TransactionStatus | "all"> = ["all", "succeeded", "pending", "failed", "refunded"];

function badgeVariant(status: TransactionStatus) {
  if (status === "succeeded") return "success";
  if (status === "pending") return "gold";
  if (status === "failed") return "destructive";
  return "outline";
}

export function BillingHistoryTable({ transactions, invoices = [], showFilters = false }: Props) {
  const [status, setStatus] = React.useState<TransactionStatus | "all">("all");
  const [ascending, setAscending] = React.useState(false);
  const filtered = React.useMemo(() => {
    return transactions
      .filter((transaction) => status === "all" || transaction.status === status)
      .sort((a, b) => {
        const left = new Date(a.createdAt).getTime();
        const right = new Date(b.createdAt).getTime();
        return ascending ? left - right : right - left;
      });
  }, [ascending, status, transactions]);

  function openReceipt(transaction: Transaction) {
    const invoice = invoices.find((item) => item.transactionId === transaction.id);
    const html = printableReceiptHtml({
      invoiceNumber: invoice?.invoiceNumber ?? `REC-${transaction.id}`,
      description: transaction.description,
      amountCny: transaction.amountCny,
      taxCny: invoice?.taxCny ?? Math.round(transaction.amountCny * 0.06),
      transactionId: transaction.id,
      issuedAt: invoice?.issuedAt ?? transaction.createdAt,
    });
    const receiptWindow = window.open("", "_blank", "noopener,noreferrer");
    receiptWindow?.document.write(html);
    receiptWindow?.document.close();
  }

  return (
    <div className="rounded-lg border border-ink-200 bg-surface-0">
      {showFilters && (
        <div className="flex flex-col gap-3 border-b border-ink-200 p-4 sm:flex-row sm:items-center sm:justify-between">
          <Select value={status} onValueChange={(value) => setStatus(value as TransactionStatus | "all")}>
            <SelectTrigger className="w-full sm:w-[200px]" aria-label="Filter billing history by status">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((item) => (
                <SelectItem key={item} value={item}>
                  {item === "all" ? "All statuses" : statusLabel(item)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-ink-400">Date range filter is visual in this demo.</p>
        </div>
      )}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase tracking-wider text-ink-400">
            <tr>
              <th className="px-4 py-3">
                <button
                  type="button"
                  aria-label={`Sort billing history by date ${ascending ? "descending" : "ascending"}`}
                  onClick={() => setAscending((value) => !value)}
                  className="inline-flex items-center gap-2"
                >
                  Date
                  <ArrowDownUp className="size-3" />
                </button>
              </th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Receipt</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((transaction) => (
              <tr key={transaction.id} className="border-t border-ink-100">
                <td className="px-4 py-4 text-ink-500">{formatDate(transaction.createdAt)}</td>
                <td className="px-4 py-4 font-medium text-ink-900">{transaction.description}</td>
                <td className="px-4 py-4 font-semibold tabular-nums text-ink-900">{formatCny(transaction.amountCny)}</td>
                <td className="px-4 py-4">
                  <Badge variant={badgeVariant(transaction.status)}>{statusLabel(transaction.status)}</Badge>
                </td>
                <td className="px-4 py-4 text-right">
                  <Button type="button" variant="ghost" size="sm" onClick={() => openReceipt(transaction)}>
                    <Download className="size-4" />
                    Download
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid gap-3 p-4 md:hidden">
        {filtered.map((transaction) => (
          <div key={transaction.id} className="rounded-lg border border-ink-200 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-ink-900">{transaction.description}</p>
                <p className="text-xs text-ink-500">{formatDate(transaction.createdAt)}</p>
              </div>
              <Badge variant={badgeVariant(transaction.status)}>{statusLabel(transaction.status)}</Badge>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="font-bold text-ink-900">{formatCny(transaction.amountCny)}</span>
              <Button type="button" variant="outline" size="sm" onClick={() => openReceipt(transaction)}>
                Download
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
