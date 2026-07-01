"use client";

import { CreditCardForm } from "@/components/billing/CreditCardForm";

type Props = {
  amountCny: number;
  processingSeconds?: number;
  onSuccess: () => void;
  onFailure?: () => void;
  forceFail?: boolean;
};

export function UnionPayForm(props: Props) {
  return (
    <div className="rounded-xl border border-ink-200 bg-surface-0 p-1 shadow-lg">
      <div className="rounded-t-lg px-5 py-3" style={{ borderTop: "4px solid #E60012" }}>
        <h2 className="text-lg font-bold text-ink-900">China Bank Card (UnionPay)</h2>
        <p className="text-sm text-ink-500">Use a China bank card in this simulated checkout.</p>
      </div>
      <CreditCardForm {...props} />
    </div>
  );
}
