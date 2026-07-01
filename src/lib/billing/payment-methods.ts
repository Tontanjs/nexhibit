import type { PaymentMethodType, UserType } from "@/lib/billing/types";

export type PaymentMethodConfig = {
  type: PaymentMethodType;
  name: string;
  nameZh: string;
  description: string;
  brandColor: string;
  iconName: "QrCode" | "CreditCard" | "Smartphone" | "Building2";
  available: boolean;
  recommended?: boolean;
  supportedUserTypes: UserType[];
  processingTimeSeconds: number;
};

export const PAYMENT_METHODS: PaymentMethodConfig[] = [
  {
    type: "alipay",
    name: "Alipay",
    nameZh: "支付宝",
    description: "Scan with Alipay app",
    brandColor: "#1677FF",
    iconName: "QrCode",
    available: true,
    recommended: true,
    supportedUserTypes: ["student", "employer", "university"],
    processingTimeSeconds: 3,
  },
  {
    type: "wechat_pay",
    name: "WeChat Pay",
    nameZh: "微信支付",
    description: "Scan with WeChat app",
    brandColor: "#07C160",
    iconName: "QrCode",
    available: true,
    recommended: true,
    supportedUserTypes: ["student", "employer", "university"],
    processingTimeSeconds: 3,
  },
  {
    type: "unionpay",
    name: "UnionPay",
    nameZh: "银联",
    description: "China bank cards",
    brandColor: "#E60012",
    iconName: "CreditCard",
    available: true,
    supportedUserTypes: ["student", "employer", "university"],
    processingTimeSeconds: 4,
  },
  {
    type: "credit_card",
    name: "Credit Card",
    nameZh: "信用卡",
    description: "Visa, Mastercard, Amex",
    brandColor: "#1A1F71",
    iconName: "CreditCard",
    available: true,
    supportedUserTypes: ["student", "employer", "university"],
    processingTimeSeconds: 4,
  },
  {
    type: "apple_pay",
    name: "Apple Pay",
    nameZh: "Apple Pay",
    description: "Pay with Touch ID or Face ID",
    brandColor: "#000000",
    iconName: "Smartphone",
    available: true,
    supportedUserTypes: ["student", "employer"],
    processingTimeSeconds: 2,
  },
  {
    type: "bank_transfer",
    name: "Bank Transfer",
    nameZh: "银行转账",
    description: "Wire transfer (3-5 business days)",
    brandColor: "#475569",
    iconName: "Building2",
    available: true,
    supportedUserTypes: ["employer", "university"],
    processingTimeSeconds: 0,
  },
];

export function getPaymentMethodConfig(type: PaymentMethodType) {
  return PAYMENT_METHODS.find((method) => method.type === type);
}
