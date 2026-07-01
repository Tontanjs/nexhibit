"use client";

import * as React from "react";
import { Building2, CreditCard, Plus, QrCode, Smartphone } from "lucide-react";

import { AddPaymentMethodDialog } from "@/components/billing/AddPaymentMethodDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { SavedPaymentMethod, UserType } from "@/lib/billing/types";
import { copy } from "@/lib/copy";

type Props = {
  methods: SavedPaymentMethod[];
  userType: UserType;
};

const iconByType = {
  alipay: QrCode,
  wechat_pay: QrCode,
  unionpay: CreditCard,
  credit_card: CreditCard,
  apple_pay: Smartphone,
  bank_transfer: Building2,
};

export function PaymentMethodList({ methods, userType }: Props) {
  const [items, setItems] = React.useState(methods);

  function setDefault(id: string) {
    setItems((current) => current.map((item) => ({ ...item, isDefault: item.id === id })));
  }

  function remove(id: string) {
    setItems((current) => current.filter((item) => item.id !== id));
  }

  function addMethod(method: SavedPaymentMethod) {
    setItems((current) => [...current, method]);
  }

  return (
    <div className="rounded-lg border border-ink-200 bg-surface-0 p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-gold-700">{copy.billing.paymentMethods.title}</p>
          <h2 className="mt-1 text-xl font-black text-ink-900">Saved ways to pay</h2>
        </div>
        <AddPaymentMethodDialog userType={userType} onAdd={addMethod} trigger={<Button type="button"><Plus className="size-4" />{copy.billing.paymentMethods.addNew}</Button>} />
      </div>
      <div className="mt-5 grid gap-3">
        {items.map((method) => {
          const Icon = iconByType[method.type];
          return (
            <div key={method.id} className="flex flex-col gap-4 rounded-lg border border-ink-200 bg-ink-50 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-md bg-surface-0 text-ink-700">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-semibold text-ink-900">{method.label}</p>
                  <p className="text-xs text-ink-500">
                    {method.expiresAt ? `${copy.billing.paymentMethods.expires} ${method.expiresAt}` : `Added ${method.addedAt.slice(0, 10)}`}
                  </p>
                </div>
                {method.isDefault && <Badge variant="gold">{copy.billing.paymentMethods.default}</Badge>}
              </div>
              <div className="flex flex-wrap gap-2">
                {!method.isDefault && (
                  <Button type="button" variant="outline" size="sm" onClick={() => setDefault(method.id)}>
                    Set default
                  </Button>
                )}
                <Button type="button" variant="ghost" size="sm" onClick={() => remove(method.id)}>
                  {copy.billing.paymentMethods.remove}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
