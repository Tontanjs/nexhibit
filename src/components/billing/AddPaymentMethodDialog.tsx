"use client";

import * as React from "react";

import { ApplePayButton } from "@/components/billing/ApplePayButton";
import { BankTransferDetails } from "@/components/billing/BankTransferDetails";
import { CreditCardForm } from "@/components/billing/CreditCardForm";
import { PaymentMethodSelector } from "@/components/billing/PaymentMethodSelector";
import { UnionPayForm } from "@/components/billing/UnionPayForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { PaymentMethodType, SavedPaymentMethod, UserType } from "@/lib/billing/types";
import { makeOrderId } from "@/lib/billing/utils";

type Props = {
  userType: UserType;
  onAdd: (method: SavedPaymentMethod) => void;
  trigger?: React.ReactNode;
};

export function AddPaymentMethodDialog({ userType, onAdd, trigger }: Props) {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<PaymentMethodType>("alipay");
  const orderId = React.useMemo(() => makeOrderId("pm"), []);

  function finish(type: PaymentMethodType) {
    onAdd({
      id: `pm_${orderId}`,
      type,
      label: `${type.replace("_", " ")} demo method`,
      isDefault: false,
      addedAt: new Date().toISOString(),
    });
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger ?? <Button type="button">Add new method</Button>}</DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Add payment method</DialogTitle>
          <DialogDescription>Prototype billing · No real payment is processed, and no cards or accounts are saved.</DialogDescription>
        </DialogHeader>
        <PaymentMethodSelector userType={userType} value={selected} onChange={setSelected} />
        <div className="mt-4">
          {selected === "credit_card" && <CreditCardForm amountCny={0} onSuccess={() => finish("credit_card")} />}
          {selected === "unionpay" && <UnionPayForm amountCny={0} onSuccess={() => finish("unionpay")} />}
          {selected === "apple_pay" && <ApplePayButton amountCny={0} onSuccess={() => finish("apple_pay")} />}
          {selected === "bank_transfer" && <BankTransferDetails amountCny={0} orderId={orderId} onPending={() => finish("bank_transfer")} />}
          {(selected === "alipay" || selected === "wechat_pay") && (
            <Button type="button" className="w-full" onClick={() => finish(selected)}>
              Add {selected === "alipay" ? "Alipay" : "WeChat Pay"} method
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
