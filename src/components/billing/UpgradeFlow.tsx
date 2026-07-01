"use client";

import * as React from "react";
import Link from "next/link";
import { CheckCircle2, Loader2 } from "lucide-react";

import { AlipayQrPanel } from "@/components/billing/AlipayQrPanel";
import { ApplePayButton } from "@/components/billing/ApplePayButton";
import { BankTransferDetails } from "@/components/billing/BankTransferDetails";
import { CheckoutSummary } from "@/components/billing/CheckoutSummary";
import { CreditCardForm } from "@/components/billing/CreditCardForm";
import { PaymentMethodSelector } from "@/components/billing/PaymentMethodSelector";
import { UnionPayForm } from "@/components/billing/UnionPayForm";
import { WeChatPayQrPanel } from "@/components/billing/WeChatPayQrPanel";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getPaymentMethodConfig } from "@/lib/billing/payment-methods";
import { getPlanById, getPlansByUserType } from "@/lib/billing/plans";
import type { BillingPeriod, PaymentMethodType, PlanTier, UserType } from "@/lib/billing/types";
import { formatCny, getPlanPrice, getPlanPriceLabel, makeOrderId, printableReceiptHtml, vatFor } from "@/lib/billing/utils";
import { copy } from "@/lib/copy";
import { cn } from "@/lib/utils";

type Step = "plan" | "period" | "method" | "details" | "processing" | "success" | "failed" | "pending";

type Props = {
  userType: Extract<UserType, "student" | "employer">;
  initialPlanId: string;
  initialPeriod: BillingPeriod;
  forceFail?: boolean;
};

function availablePeriods(plan: PlanTier): BillingPeriod[] {
  const periods: BillingPeriod[] = [];
  if (plan.monthlyPriceCny !== null) periods.push("monthly");
  if (plan.yearlyPriceCny !== null) periods.push("yearly");
  if (plan.semesterPriceCny) periods.push("semester");
  if (plan.lifetimePriceCny) periods.push("lifetime");
  return periods.length ? periods : ["yearly"];
}

export function UpgradeFlow({ userType, initialPlanId, initialPeriod, forceFail }: Props) {
  const fallbackPlan = getPlansByUserType(userType).find((plan) => plan.level > 0) ?? getPlansByUserType(userType)[0];
  const [step, setStep] = React.useState<Step>("plan");
  const [selectedPlan, setSelectedPlan] = React.useState<PlanTier>(getPlanById(initialPlanId) ?? fallbackPlan);
  const [period, setPeriod] = React.useState<BillingPeriod>(initialPeriod);
  const [method, setMethod] = React.useState<PaymentMethodType>(userType === "student" ? "alipay" : "bank_transfer");
  const [transactionId, setTransactionId] = React.useState<string | null>(null);
  const orderId = React.useMemo(() => makeOrderId("ord"), []);
  const subtotal = getPlanPrice(selectedPlan, period) ?? selectedPlan.yearlyPriceCny ?? 0;
  const total = subtotal + vatFor(subtotal);
  const methodConfig = getPaymentMethodConfig(method);

  function succeed() {
    setStep("processing");
    window.setTimeout(() => {
      const id = typeof crypto !== "undefined" && "randomUUID" in crypto
        ? `txn_${crypto.randomUUID()}`
        : makeOrderId("txn");
      setTransactionId(id);
      setStep("success");
    }, Math.max(600, (methodConfig?.processingTimeSeconds ?? 2) * 450));
  }

  function fail() {
    setStep("failed");
  }

  function pending() {
    setTransactionId(makeOrderId("txn"));
    setStep("pending");
  }

  function openReceipt() {
    const html = printableReceiptHtml({
      invoiceNumber: `INV-DEMO-${orderId.slice(-6).toUpperCase()}`,
      description: `${selectedPlan.name} ${period}`,
      amountCny: subtotal,
      taxCny: vatFor(subtotal),
      transactionId: transactionId ?? orderId,
      issuedAt: new Date().toISOString(),
    });
    const receiptWindow = window.open("", "_blank", "noopener,noreferrer");
    receiptWindow?.document.write(html);
    receiptWindow?.document.close();
  }

  const periods = availablePeriods(selectedPlan);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-wider text-gold-700">Prototype billing · No real payment is processed.</p>
        <h1 className="mt-2 text-3xl font-black text-surface-0 sm:text-4xl">
          {userType === "student" ? "Upgrade your visibility" : "Upgrade employer hiring"}
        </h1>
      </div>
      <div className="mb-8 grid grid-cols-5 gap-2">
        {["Plan", "Period", "Method", "Details", "Success"].map((label, index) => (
          <div key={label} className="flex items-center gap-2">
            <span className={cn("flex size-8 items-center justify-center rounded-full text-xs font-bold", index <= ["plan", "period", "method", "details", "processing", "success", "pending"].indexOf(step) ? "bg-gold-500 text-ink-900" : "bg-surface-0/10 text-ink-300")}>
              {index + 1}
            </span>
            <span className="hidden text-xs font-semibold text-ink-300 sm:inline">{label}</span>
          </div>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div>
          {step === "plan" && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {getPlansByUserType(userType).map((plan) => {
                const selected = selectedPlan.id === plan.id;
                return (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => setSelectedPlan(plan)}
                    className={cn(
                      "rounded-lg border bg-surface-0 p-5 text-left shadow-sm transition hover:border-ink-300 hover:shadow-md",
                      selected ? "border-gold-500 ring-2 ring-gold-500" : "border-ink-200",
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h2 className="text-xl font-black text-ink-900">{plan.name}</h2>
                        <p className="mt-1 text-sm text-ink-500">{plan.tagline}</p>
                      </div>
                      {selected && <span className="rounded-full bg-gold-500 px-2 py-0.5 text-xs font-bold text-ink-900">Selected</span>}
                    </div>
                    <p className="mt-6 text-3xl font-black text-ink-900">{getPlanPriceLabel(plan, period)}</p>
                    <ul className="mt-5 grid gap-2 text-sm text-ink-600">
                      {plan.features.slice(0, 4).map((feature) => (
                        <li key={feature.label}>{feature.label}</li>
                      ))}
                    </ul>
                  </button>
                );
              })}
              <Button type="button" className="sm:col-span-2 lg:col-span-3" onClick={() => setStep("period")}>
                Continue with {selectedPlan.name}
              </Button>
            </div>
          )}
          {step === "period" && (
            <Card className="rounded-xl bg-surface-0 p-6">
              <h2 className="text-2xl font-black text-ink-900">Choose billing period</h2>
              <p className="mt-2 text-sm text-ink-500">Available periods change by plan.</p>
              <Select value={period} onValueChange={(value) => setPeriod(value as BillingPeriod)}>
                <SelectTrigger className="mt-6 w-full sm:w-[260px]" aria-label="Choose billing period">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {periods.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item} - {formatCny(getPlanPrice(selectedPlan, item) ?? 0)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button type="button" className="mt-6" onClick={() => setStep("method")}>
                Continue
              </Button>
            </Card>
          )}
          {step === "method" && (
            <Card className="rounded-xl bg-surface-0 p-6">
              <h2 className="text-2xl font-black text-ink-900">{copy.payment.methods.choosePayment}</h2>
              <p className="mt-2 text-sm text-ink-500">Select a simulated payment method.</p>
              <div className="mt-6">
                <PaymentMethodSelector userType={userType} value={method} onChange={setMethod} />
              </div>
              <Button type="button" className="mt-6" onClick={() => setStep("details")}>
                Continue
              </Button>
            </Card>
          )}
          {step === "details" && (
            <div>
              {method === "alipay" && <AlipayQrPanel amountCny={total} orderId={orderId} onSuccess={succeed} onFailure={fail} onSwitchMethod={() => setStep("method")} forceFail={forceFail} />}
              {method === "wechat_pay" && <WeChatPayQrPanel amountCny={total} orderId={orderId} onSuccess={succeed} onFailure={fail} onSwitchMethod={() => setStep("method")} forceFail={forceFail} />}
              {method === "credit_card" && <CreditCardForm amountCny={total} processingSeconds={methodConfig?.processingTimeSeconds} onSuccess={succeed} onFailure={fail} forceFail={forceFail} />}
              {method === "unionpay" && <UnionPayForm amountCny={total} processingSeconds={methodConfig?.processingTimeSeconds} onSuccess={succeed} onFailure={fail} forceFail={forceFail} />}
              {method === "apple_pay" && <ApplePayButton amountCny={total} onSuccess={succeed} onFailure={fail} forceFail={forceFail} />}
              {method === "bank_transfer" && <BankTransferDetails amountCny={total} orderId={orderId} onPending={pending} />}
            </div>
          )}
          {step === "processing" && (
            <Card className="rounded-xl bg-surface-0 p-10 text-center">
              <Loader2 className="mx-auto size-10 animate-spin text-gold-600" aria-hidden="true" />
              <h2 className="mt-4 text-2xl font-black text-ink-900">{copy.payment.states.processing}</h2>
              <p className="mt-2 text-sm text-ink-500">Generating simulated transaction and receipt.</p>
            </Card>
          )}
          {step === "failed" && (
            <Card className="rounded-xl bg-surface-0 p-10 text-center">
              <h2 className="text-2xl font-black text-ink-900">{copy.payment.states.failed}</h2>
              <p className="mt-2 text-sm text-ink-500">{copy.payment.states.retryPrompt}</p>
              <Button type="button" className="mt-6" onClick={() => setStep("method")}>
                Retry
              </Button>
            </Card>
          )}
          {(step === "success" || step === "pending") && (
            <Card className="relative overflow-hidden rounded-xl bg-surface-0 p-10 text-center">
              <div className="pointer-events-none absolute inset-x-0 top-4 flex justify-center gap-4 text-xl opacity-40" aria-hidden="true">
                <span>🎉</span><span>🎉</span><span>🎉</span>
              </div>
              <CheckCircle2 className="mx-auto size-20 text-gold-600" aria-hidden="true" />
              <h2 className="mt-5 text-3xl font-black text-ink-900">
                {step === "pending" ? "Transfer pending verification" : `Welcome to NEXHIBIT ${selectedPlan.name}`}
              </h2>
              <p className="mt-2 text-sm text-ink-500">{copy.payment.receipt.emailedTo}</p>
              <div className="mx-auto mt-6 max-w-md rounded-lg border border-ink-200 bg-ink-50 p-4 text-left text-sm">
                <div className="flex justify-between"><span>Plan</span><strong>{selectedPlan.name}</strong></div>
                <div className="mt-2 flex justify-between"><span>Total</span><strong>{formatCny(total)}</strong></div>
                <div className="mt-2 flex justify-between"><span>Transaction</span><strong className="font-mono text-xs">{transactionId ?? orderId}</strong></div>
              </div>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <Button asChild>
                  <Link href={userType === "student" ? "/student/dashboard" : "/employer/dashboard"}>View dashboard</Link>
                </Button>
                <Button type="button" variant="outline" onClick={openReceipt}>
                  {copy.payment.receipt.viewReceipt}
                </Button>
              </div>
            </Card>
          )}
        </div>
        <CheckoutSummary plan={selectedPlan} billingPeriod={period} onEdit={() => setStep("plan")} />
      </div>
    </div>
  );
}
