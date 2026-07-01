"use client";

import * as React from "react";

import { PaymentMethodCard } from "@/components/billing/PaymentMethodCard";
import { PAYMENT_METHODS } from "@/lib/billing/payment-methods";
import type { PaymentMethodType, UserType } from "@/lib/billing/types";

type Props = {
  userType: UserType;
  value?: PaymentMethodType;
  onChange: (method: PaymentMethodType) => void;
};

export function PaymentMethodSelector({ userType, value, onChange }: Props) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {PAYMENT_METHODS.map((method) => {
        const disabled = !method.supportedUserTypes.includes(userType) || !method.available;
        return (
          <PaymentMethodCard
            key={method.type}
            method={method}
            selected={value === method.type}
            disabled={disabled}
            onSelect={() => onChange(method.type)}
          />
        );
      })}
    </div>
  );
}
