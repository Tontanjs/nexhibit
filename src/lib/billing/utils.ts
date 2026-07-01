import type { BillingPeriod, PlanTier, TransactionStatus } from "@/lib/billing/types";

export function formatCny(amount: number) {
  return new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency: "CNY",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function getPlanPrice(plan: PlanTier, billingPeriod: BillingPeriod) {
  if (billingPeriod === "monthly") return plan.monthlyPriceCny;
  if (billingPeriod === "yearly") return plan.yearlyPriceCny;
  if (billingPeriod === "semester") return plan.semesterPriceCny ?? null;
  return plan.lifetimePriceCny ?? null;
}

export function getPlanPeriodLabel(period: BillingPeriod) {
  if (period === "monthly") return "month";
  if (period === "yearly") return "year";
  if (period === "semester") return "semester";
  return "lifetime";
}

export function getPlanPriceLabel(plan: PlanTier, billingPeriod: BillingPeriod) {
  const price = getPlanPrice(plan, billingPeriod);
  if (plan.level === 0) return "¥0";
  if (price === null) return "Custom";
  return formatCny(price);
}

export function vatFor(amount: number) {
  return Math.round(amount * 0.06);
}

export function statusLabel(status: TransactionStatus) {
  const labels: Record<TransactionStatus, string> = {
    pending: "Pending",
    succeeded: "Paid",
    failed: "Failed",
    refunded: "Refunded",
  };
  return labels[status];
}

export function daysUntil(date: string) {
  const diff = new Date(date).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export function makeOrderId(prefix = "ord") {
  const random = typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID().slice(0, 8)
    : Math.random().toString(16).slice(2, 10);
  return `${prefix}_${random}`;
}

export function printableReceiptHtml(input: {
  invoiceNumber: string;
  description: string;
  amountCny: number;
  taxCny: number;
  transactionId: string;
  issuedAt: string;
}) {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>${input.invoiceNumber}</title>
    <style>
      body { font-family: Inter, Arial, sans-serif; margin: 48px; color: #0A0E1A; }
      .header { display: flex; justify-content: space-between; align-items: start; border-bottom: 1px solid #E2E8F0; padding-bottom: 24px; }
      .logo { font-size: 28px; font-weight: 800; }
      .dot { color: #F5C518; }
      table { width: 100%; border-collapse: collapse; margin-top: 32px; }
      td, th { border-bottom: 1px solid #E2E8F0; padding: 12px 0; text-align: left; }
      .total { font-size: 24px; font-weight: 800; }
      .footer { margin-top: 48px; color: #64748B; font-size: 12px; }
      .button { margin-top: 32px; border: 0; background: #F5C518; padding: 12px 18px; border-radius: 6px; font-weight: 700; cursor: pointer; }
    </style>
  </head>
  <body>
    <div class="header">
      <div>
        <div class="logo">Nexhibit<span class="dot">.</span></div>
        <p>NEXHIBIT Technology (Hangzhou) Co., Ltd.</p>
      </div>
      <div>
        <strong>${input.invoiceNumber}</strong><br />
        Issued ${formatDate(input.issuedAt)}
      </div>
    </div>
    <table>
      <tr><th>Description</th><th>Transaction</th><th>Amount</th></tr>
      <tr><td>${input.description}</td><td>${input.transactionId}</td><td>${formatCny(input.amountCny)}</td></tr>
      <tr><td colspan="2">VAT 6%</td><td>${formatCny(input.taxCny)}</td></tr>
      <tr><td colspan="2" class="total">Total</td><td class="total">${formatCny(input.amountCny + input.taxCny)}</td></tr>
    </table>
    <button class="button" onclick="window.print()">Print receipt</button>
    <p class="footer">This is a simulated receipt for demonstration. No real charge was made.</p>
  </body>
</html>`;
}
