"use client";

import * as React from "react";
import { Smartphone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { copy } from "@/lib/copy";
import { formatCny } from "@/lib/billing/utils";

type Props = {
  amountCny: number;
  onSuccess: () => void;
  onFailure?: () => void;
  forceFail?: boolean;
};

export function ApplePayButton({ amountCny, onSuccess, onFailure, forceFail }: Props) {
  const [loading, setLoading] = React.useState(false);

  function authenticate() {
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      if (forceFail) {
        onFailure?.();
      } else {
        onSuccess();
      }
    }, 2000);
  }

  return (
    <div className="rounded-xl border border-ink-200 bg-surface-0 p-6 text-center shadow-lg">
      <p className="text-sm text-ink-500">{copy.payment.applePay.instructions}</p>
      <Button type="button" onClick={authenticate} disabled={loading} className="mt-5 h-14 w-full bg-black text-white hover:bg-black/90">
        <Smartphone className="size-5" aria-hidden="true" />
        {loading ? copy.payment.applePay.useFaceId : `Apple Pay ${formatCny(amountCny)}`}
      </Button>
    </div>
  );
}
