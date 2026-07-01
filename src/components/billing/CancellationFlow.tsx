"use client";

import * as React from "react";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { copy } from "@/lib/copy";
import { cn } from "@/lib/utils";

type Props = {
  onCancel: () => void;
  onKeep?: () => void;
};

const losses = [
  "Profile boosts and premium visibility stop at period end.",
  "Advanced analytics and who-viewed-you insights pause.",
  "Priority event booking returns to standard access.",
];

export function CancellationFlow({ onCancel, onKeep }: Props) {
  const [step, setStep] = React.useState(1);
  const [reason, setReason] = React.useState<string>(copy.billing.cancel.reasons[0]);
  const [done, setDone] = React.useState(false);
  const percent = done ? 100 : (step / 4) * 100;

  function confirmCancel() {
    onCancel();
    setDone(true);
    setStep(4);
  }

  if (done) {
    return (
      <Card className="mx-auto max-w-2xl rounded-xl bg-surface-0 p-8 text-center">
        <CheckCircle2 className="mx-auto size-14 text-gold-600" aria-hidden="true" />
        <h1 className="mt-4 text-3xl font-black text-ink-900">Subscription scheduled to cancel.</h1>
        <p className="mt-3 text-sm leading-6 text-ink-500">You can resubscribe anytime. Access stays available until the current period ends.</p>
        <Button type="button" className="mt-6" onClick={onKeep}>
          Resubscribe anytime
        </Button>
      </Card>
    );
  }

  return (
    <Card className="mx-auto max-w-2xl rounded-xl bg-surface-0 p-8">
      <div className="h-1 rounded-full bg-ink-100">
        <div className="h-1 rounded-full bg-gold-500 transition-all" style={{ width: `${percent}%` }} />
      </div>
      {step === 1 && (
        <div className="mt-8">
          <p className="text-xs font-bold uppercase tracking-wider text-gold-700">01 · Cancellation</p>
          <h1 className="mt-3 text-3xl font-black text-ink-900">We&apos;re sad to see you go.</h1>
          <p className="mt-3 text-sm leading-6 text-ink-500">Here is what you will lose when the subscription ends.</p>
          <ul className="mt-6 grid gap-3">
            {losses.map((item) => (
              <li key={item} className="rounded-lg border border-ink-200 bg-ink-50 p-3 text-sm text-ink-700">
                {item}
              </li>
            ))}
          </ul>
          <Button type="button" className="mt-6 w-full" onClick={() => setStep(2)}>
            Continue
          </Button>
        </div>
      )}
      {step === 2 && (
        <div className="mt-8">
          <p className="text-xs font-bold uppercase tracking-wider text-gold-700">02 · Reason</p>
          <h1 className="mt-3 text-3xl font-black text-ink-900">What changed?</h1>
          <div className="mt-6 grid gap-2">
            {copy.billing.cancel.reasons.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setReason(item)}
                className={cn(
                  "rounded-lg border px-4 py-3 text-left text-sm font-semibold",
                  reason === item ? "border-gold-500 bg-gold-50 text-ink-900" : "border-ink-200 text-ink-600 hover:bg-ink-50",
                )}
              >
                {item}
              </button>
            ))}
          </div>
          <Button type="button" className="mt-6 w-full" onClick={() => setStep(3)}>
            Continue
          </Button>
        </div>
      )}
      {step === 3 && (
        <div className="mt-8">
          <p className="text-xs font-bold uppercase tracking-wider text-gold-700">03 · Offer</p>
          <h1 className="mt-3 text-3xl font-black text-ink-900">Stay visible for less.</h1>
          <p className="mt-3 rounded-lg border border-gold-500/25 bg-gold-50 p-4 text-sm font-semibold text-ink-800">
            {copy.billing.cancel.retentionOffer}
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Button type="button" onClick={onKeep}>
              {copy.billing.cancel.keepSubscription}
            </Button>
            <Button type="button" variant="outline" onClick={() => setStep(4)}>
              {copy.billing.cancel.confirmCancel}
            </Button>
          </div>
        </div>
      )}
      {step === 4 && (
        <div className="mt-8">
          <p className="text-xs font-bold uppercase tracking-wider text-gold-700">04 · Confirm</p>
          <h1 className="mt-3 text-3xl font-black text-ink-900">Confirm cancellation</h1>
          <p className="mt-3 text-sm leading-6 text-ink-500">
            Reason selected: <span className="font-semibold text-ink-900">{reason}</span>
          </p>
          <Button type="button" variant="destructive" className="mt-6 w-full" onClick={confirmCancel}>
            Confirm cancellation
          </Button>
        </div>
      )}
    </Card>
  );
}
