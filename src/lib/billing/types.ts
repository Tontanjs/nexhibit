export type UserType = "student" | "employer" | "university";

export type BillingPeriod = "monthly" | "yearly" | "lifetime" | "semester";

export type PaymentMethodType =
  | "alipay"
  | "wechat_pay"
  | "unionpay"
  | "credit_card"
  | "apple_pay"
  | "bank_transfer";

export type SubscriptionStatus =
  | "active"
  | "trialing"
  | "past_due"
  | "canceled"
  | "expired";

export type TransactionStatus =
  | "pending"
  | "succeeded"
  | "failed"
  | "refunded";

export type PlanTier = {
  id: string;
  name: string;
  tagline: string;
  userType: UserType;
  level: 0 | 1 | 2 | 3 | 4;
  monthlyPriceCny: number | null;
  yearlyPriceCny: number | null;
  lifetimePriceCny?: number;
  semesterPriceCny?: number;
  yearlySavingsPercent?: number;
  popular?: boolean;
  features: PlanFeature[];
  limits: Record<string, number>;
  cta: string;
};

export type PlanFeature = {
  label: string;
  included: boolean;
  highlight?: boolean;
};

export type Subscription = {
  id: string;
  customerId: string;
  planId: string;
  status: SubscriptionStatus;
  billingPeriod: BillingPeriod;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  paymentMethodId: string;
  createdAt: string;
};

export type Transaction = {
  id: string;
  customerId: string;
  subscriptionId?: string;
  amountCny: number;
  status: TransactionStatus;
  paymentMethod: PaymentMethodType;
  description: string;
  createdAt: string;
  invoiceId?: string;
};

export type Invoice = {
  id: string;
  invoiceNumber: string;
  customerId: string;
  transactionId: string;
  amountCny: number;
  taxCny: number;
  type: "receipt" | "invoice" | "fapiao";
  status: "draft" | "issued" | "paid";
  issuedAt: string;
  companyName?: string;
  taxId?: string;
};

export type SavedPaymentMethod = {
  id: string;
  type: PaymentMethodType;
  label: string;
  last4?: string;
  brand?: string;
  isDefault: boolean;
  expiresAt?: string;
  addedAt: string;
};
