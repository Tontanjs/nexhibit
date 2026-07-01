"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { copy } from "@/lib/copy";
import { formatCny } from "@/lib/billing/utils";

type Props = {
  amountCny: number;
  orderId: string;
  onPending: () => void;
};

const details = [
  { label: "Bank Name", value: copy.payment.bankTransfer.bankName },
  { label: "Account Name", value: copy.payment.bankTransfer.accountName },
  { label: "Account Number", value: copy.payment.bankTransfer.accountNumber },
  { label: "SWIFT/BIC", value: copy.payment.bankTransfer.swiftCode },
];

export function BankTransferDetails({ amountCny, orderId, onPending }: Props) {
  const [copied, setCopied] = React.useState<string | null>(null);
  const [pending, setPending] = React.useState(false);

  function copyValue(label: string, value: string) {
    void navigator.clipboard.writeText(value);
    setCopied(label);
    window.setTimeout(() => setCopied(null), 1200);
  }

  function markAsPaid() {
    setPending(true);
    onPending();
  }

  return (
    <div className="rounded-xl border border-ink-200 bg-surface-0 p-6 shadow-lg">
      <h2 className="text-lg font-bold text-ink-900">{copy.payment.methods.bankDetails}</h2>
      <p className="mt-2 text-sm leading-6 text-ink-500">{copy.payment.bankTransfer.instructions}</p>
      <div className="mt-6 grid gap-3">
        {[...details, { label: copy.payment.bankTransfer.reference, value: `NEX-${orderId}` }, { label: "Amount", value: formatCny(amountCny) }].map((item) => (
          <div key={item.label} className="flex items-center justify-between gap-3 rounded-lg border border-ink-200 bg-ink-50 px-3 py-2">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-wider text-ink-400">{item.label}</p>
              <p className="truncate text-sm font-semibold text-ink-900">{item.value}</p>
            </div>
            <button type="button" onClick={() => copyValue(item.label, item.value)} className="inline-flex size-9 shrink-0 items-center justify-center rounded-md hover:bg-surface-0">
              {copied === item.label ? <Check className="size-4 text-success" /> : <Copy className="size-4 text-ink-500" />}
              <span className="sr-only">Copy {item.label}</span>
            </button>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm font-medium text-warning">Bank transfer takes 3-5 business days to process.</p>
      <Button type="button" onClick={markAsPaid} disabled={pending} className="mt-5 w-full">
        {pending ? "Pending verification - confirmation email simulated" : copy.payment.bankTransfer.markAsPaid}
      </Button>
    </div>
  );
}
