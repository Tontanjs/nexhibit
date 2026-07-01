"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { copy } from "@/lib/copy";
import { formatCny } from "@/lib/billing/utils";

type Props = {
  amountCny: number;
  processingSeconds?: number;
  onSuccess: () => void;
  onFailure?: () => void;
  forceFail?: boolean;
};

function luhnCheck(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.length < 12) return false;
  let sum = 0;
  let doubleDigit = false;
  for (let index = digits.length - 1; index >= 0; index -= 1) {
    let digit = Number(digits[index]);
    if (doubleDigit) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    doubleDigit = !doubleDigit;
  }
  return sum % 10 === 0;
}

function formatCard(value: string) {
  return value.replace(/\D/g, "").slice(0, 19).replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export function CreditCardForm({ amountCny, processingSeconds = 4, onSuccess, onFailure, forceFail }: Props) {
  const [number, setNumber] = React.useState("");
  const [expiry, setExpiry] = React.useState("");
  const [cvv, setCvv] = React.useState("");
  const [name, setName] = React.useState("");
  const [saveCard, setSaveCard] = React.useState(true);
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const validCard = luhnCheck(number);
  const validExpiry = /^\d{2}\/\d{2}$/.test(expiry);
  const validCvv = /^\d{3,4}$/.test(cvv);
  const canSubmit = validCard && validExpiry && validCvv && name.trim().length > 2;

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    if (!canSubmit) return;
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      if (forceFail) {
        onFailure?.();
      } else {
        onSuccess();
      }
    }, processingSeconds * 1000);
  }

  return (
    <form onSubmit={submit} className="rounded-xl border border-ink-200 bg-surface-0 p-6 shadow-lg">
      <div className="flex flex-wrap gap-2">
        {["Visa", "Mastercard", "Amex", "UnionPay"].map((brand) => (
          <span key={brand} className="rounded-md border border-ink-200 bg-ink-50 px-2.5 py-1 text-xs font-bold text-ink-700">
            {brand}
          </span>
        ))}
      </div>
      <div className="mt-6 grid gap-4">
        <div>
          <Label htmlFor="card-number">{copy.payment.card.number}</Label>
          <Input
            id="card-number"
            inputMode="numeric"
            value={number}
            onChange={(event) => setNumber(formatCard(event.target.value))}
            placeholder="4242 4242 4242 4242"
            aria-invalid={submitted && !validCard}
          />
          {submitted && !validCard && <p className="mt-1 text-xs text-destructive">Enter a valid demo card number.</p>}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="card-expiry">{copy.payment.card.expiry}</Label>
            <Input
              id="card-expiry"
              inputMode="numeric"
              value={expiry}
              onChange={(event) => setExpiry(formatExpiry(event.target.value))}
              placeholder="MM/YY"
              aria-invalid={submitted && !validExpiry}
            />
          </div>
          <div>
            <Label htmlFor="card-cvv">{copy.payment.card.cvv}</Label>
            <Input
              id="card-cvv"
              inputMode="numeric"
              value={cvv}
              onChange={(event) => setCvv(event.target.value.replace(/\D/g, "").slice(0, 4))}
              placeholder="123"
              aria-invalid={submitted && !validCvv}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="card-name">{copy.payment.card.cardholderName}</Label>
          <Input id="card-name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Nattapong Saetang" />
        </div>
        <label className="flex items-center gap-2 text-sm text-ink-600">
          <Checkbox checked={saveCard} onCheckedChange={(checked) => setSaveCard(checked === true)} />
          {copy.payment.card.saveCard}
        </label>
      </div>
      <Button type="submit" className="mt-6 w-full" disabled={loading}>
        {loading ? copy.payment.states.processing : `Pay ${formatCny(amountCny)}`}
      </Button>
    </form>
  );
}
