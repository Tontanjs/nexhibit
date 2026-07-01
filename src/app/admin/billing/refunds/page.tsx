"use client";

import * as React from "react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockPendingRefunds } from "@/lib/billing/mock-billing-data";
import { formatCny, formatDate } from "@/lib/billing/utils";

type RefundState = "pending" | "approved" | "rejected";

export default function AdminRefundsPage() {
  const [statuses, setStatuses] = React.useState<Record<string, RefundState>>(
    Object.fromEntries(mockPendingRefunds.map((refund) => [refund.id, "pending"])),
  );

  function update(id: string, status: RefundState) {
    setStatuses((current) => ({ ...current, [id]: status }));
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Button asChild variant="ghost" className="mb-5 text-ink-300">
        <Link href="/admin/billing">Back to billing</Link>
      </Button>
      <section className="aurora-panel neon-border rounded-lg p-6">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-300">01 · REFUNDS</p>
        <h1 className="mt-3 text-3xl font-black text-surface-0">Refund request queue</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-300">
          Prototype billing · No real payment is processed. Approve/reject actions update mock refund rows only.
        </p>
      </section>
      <div className="mt-6 grid gap-4">
        {mockPendingRefunds.map((refund) => {
          const status = statuses[refund.id] ?? "pending";
          return (
            <div key={refund.id} className="flex flex-col gap-4 rounded-lg border border-ink-200 bg-surface-0 p-5 shadow-sm lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-bold text-ink-900">{refund.customer}</h2>
                  <Badge variant={status === "pending" ? "gold" : status === "approved" ? "success" : "outline"}>{status}</Badge>
                </div>
                <p className="mt-1 text-sm text-ink-500">{refund.reason}</p>
                <p className="mt-1 text-xs text-ink-400">Requested {formatDate(refund.requestedAt)}</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <p className="text-xl font-black text-ink-900 tabular-nums">{formatCny(refund.amountCny)}</p>
                <Button type="button" size="sm" disabled={status !== "pending"} onClick={() => update(refund.id, "approved")}>Approve</Button>
                <Button type="button" size="sm" variant="outline" disabled={status !== "pending"} onClick={() => update(refund.id, "rejected")}>Reject</Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
