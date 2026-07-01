"use client";

import * as React from "react";
import Link from "next/link";
import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { mockRecentTransactions } from "@/lib/billing/mock-billing-data";
import type { PaymentMethodType, TransactionStatus, UserType } from "@/lib/billing/types";
import { formatCny, formatDate, statusLabel } from "@/lib/billing/utils";

type StatusFilter = TransactionStatus | "all";
type UserFilter = UserType | "all";
type MethodFilter = PaymentMethodType | "all";

function statusBadge(status: TransactionStatus) {
  if (status === "succeeded") return "success";
  if (status === "pending") return "gold";
  if (status === "failed") return "destructive";
  return "outline";
}

export default function AdminTransactionsPage() {
  const [query, setQuery] = React.useState("");
  const [status, setStatus] = React.useState<StatusFilter>("all");
  const [userType, setUserType] = React.useState<UserFilter>("all");
  const [method, setMethod] = React.useState<MethodFilter>("all");

  const rows = mockRecentTransactions.filter((transaction) => {
    const matchesQuery = `${transaction.id} ${transaction.customerName}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery
      && (status === "all" || transaction.status === status)
      && (userType === "all" || transaction.userType === userType)
      && (method === "all" || transaction.paymentMethod === method);
  });

  function exportCsv() {
    const header = "id,customer,userType,method,status,amount\n";
    const body = rows.map((row) => `${row.id},${row.customerName},${row.userType},${row.paymentMethod},${row.status},${row.amountCny}`).join("\n");
    const blob = new Blob([header + body], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "nexhibit-demo-transactions.csv";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Button asChild variant="ghost" className="mb-5 text-ink-300">
        <Link href="/admin/billing">Back to billing</Link>
      </Button>
      <section className="aurora-panel neon-border rounded-lg p-6">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-300">01 · TRANSACTIONS</p>
        <h1 className="mt-3 text-3xl font-black text-surface-0">All simulated transactions</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-300">
          Prototype billing · No real payment is processed. Filters and CSV export use mock transaction rows.
        </p>
      </section>
      <div className="mt-6 grid gap-3 rounded-lg border border-ink-200 bg-surface-0 p-4 lg:grid-cols-[1fr_repeat(3,180px)_auto]">
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label="Search transaction or customer"
          placeholder="Search transaction or customer"
        />
        <Select value={status} onValueChange={(value) => setStatus(value as StatusFilter)}>
          <SelectTrigger aria-label="Filter transactions by status"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="succeeded">Succeeded</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
            <SelectItem value="refunded">Refunded</SelectItem>
          </SelectContent>
        </Select>
        <Select value={userType} onValueChange={(value) => setUserType(value as UserFilter)}>
          <SelectTrigger aria-label="Filter transactions by user type"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All users</SelectItem>
            <SelectItem value="student">Students</SelectItem>
            <SelectItem value="employer">Employers</SelectItem>
            <SelectItem value="university">University</SelectItem>
          </SelectContent>
        </Select>
        <Select value={method} onValueChange={(value) => setMethod(value as MethodFilter)}>
          <SelectTrigger aria-label="Filter transactions by payment method"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All methods</SelectItem>
            <SelectItem value="alipay">Alipay</SelectItem>
            <SelectItem value="wechat_pay">WeChat Pay</SelectItem>
            <SelectItem value="unionpay">UnionPay</SelectItem>
            <SelectItem value="credit_card">Card</SelectItem>
            <SelectItem value="bank_transfer">Bank</SelectItem>
            <SelectItem value="apple_pay">Apple Pay</SelectItem>
          </SelectContent>
        </Select>
        <Button type="button" onClick={exportCsv}><Download className="size-4" />Export CSV</Button>
      </div>
      <div className="mt-6 overflow-x-auto rounded-lg border border-ink-200 bg-surface-0">
        <table className="w-full min-w-[920px] text-left text-sm">
          <thead className="text-xs uppercase tracking-wider text-ink-400">
            <tr>
              <th className="px-4 py-3">Transaction</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">User type</th>
              <th className="px-4 py-3">Payment</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-ink-100">
                <td className="px-4 py-4 font-mono text-xs text-ink-700">{row.id}</td>
                <td className="px-4 py-4 font-semibold text-ink-900">{row.customerName}</td>
                <td className="px-4 py-4 text-ink-600">{row.userType}</td>
                <td className="px-4 py-4 text-ink-600">{row.paymentMethod.replace("_", " ")}</td>
                <td className="px-4 py-4 text-ink-500">{formatDate(row.createdAt)}</td>
                <td className="px-4 py-4"><Badge variant={statusBadge(row.status)}>{statusLabel(row.status)}</Badge></td>
                <td className="px-4 py-4 text-right font-bold text-ink-900 tabular-nums">{formatCny(row.amountCny)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
