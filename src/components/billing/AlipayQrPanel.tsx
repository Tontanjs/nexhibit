"use client";

import * as React from "react";
import { QRCodeSVG } from "qrcode.react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { copy } from "@/lib/copy";
import { formatCny } from "@/lib/billing/utils";

type Props = {
  amountCny: number;
  orderId: string;
  onSuccess: () => void;
  onFailure?: () => void;
  onSwitchMethod?: () => void;
  forceFail?: boolean;
};

export function AlipayQrPanel({ amountCny, orderId, onSuccess, onFailure, onSwitchMethod, forceFail }: Props) {
  const [secondsLeft, setSecondsLeft] = React.useState(15 * 60);
  const [waiting, setWaiting] = React.useState(true);

  React.useEffect(() => {
    const interval = window.setInterval(() => {
      setSecondsLeft((value) => Math.max(0, value - 1));
    }, 1000);
    const successTimer = window.setTimeout(() => {
      setWaiting(false);
      if (forceFail) {
        onFailure?.();
      } else {
        onSuccess();
      }
    }, 3000);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(successTimer);
    };
  }, [forceFail, onFailure, onSuccess]);

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  return (
    <div className="mx-auto max-w-[400px] rounded-xl border border-ink-200 bg-surface-0 p-6 text-center shadow-lg">
      <div className="flex items-center justify-center gap-3">
        <span className="size-3 rounded-full" style={{ backgroundColor: "#1677FF" }} aria-hidden="true" />
        <h2 className="text-lg font-bold text-ink-900">Pay with Alipay</h2>
      </div>
      <p className="mt-2 text-sm text-ink-500">{copy.payment.alipay.instructions}</p>
      <div className="relative mx-auto mt-6 w-fit rounded-lg bg-ink-50 p-4">
        <span className="absolute left-2 top-2 size-2 border-l-2 border-t-2 border-gold-500" aria-hidden="true" />
        <span className="absolute right-2 top-2 size-2 border-r-2 border-t-2 border-gold-500" aria-hidden="true" />
        <span className="absolute bottom-2 left-2 size-2 border-b-2 border-l-2 border-gold-500" aria-hidden="true" />
        <span className="absolute bottom-2 right-2 size-2 border-b-2 border-r-2 border-gold-500" aria-hidden="true" />
        <div className="rounded-md bg-surface-0 p-3">
          <QRCodeSVG value={`alipay://nexhibit/pay/${orderId}`} size={240} marginSize={2} />
        </div>
      </div>
      <p className="mt-6 text-3xl font-black text-ink-900 tabular-nums">{formatCny(amountCny)}</p>
      <p className="mt-1 font-mono text-xs text-ink-400">{orderId}</p>
      <p className="mt-4 font-mono text-sm text-ink-600">
        {copy.payment.methods.qrExpires} {minutes}:{seconds}
      </p>
      <p className="mt-2 text-sm text-ink-500">{waiting ? copy.payment.alipay.qrPrompt : copy.payment.states.processing}</p>
      <Button
        type="button"
        className="mt-5 w-full"
        style={{ backgroundColor: "#1677FF", color: "#FFFFFF" }}
        onClick={() => toast.info("Mock checkout only. No external payment app is opened.")}
      >
        {copy.payment.alipay.openApp}
      </Button>
      {onSwitchMethod && (
        <button type="button" onClick={onSwitchMethod} className="mt-5 border-t border-gold-500/30 pt-4 text-sm font-semibold text-ink-600 hover:text-ink-900">
          Switch payment method
        </button>
      )}
    </div>
  );
}
