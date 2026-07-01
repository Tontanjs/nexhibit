import { Building2, Check, CreditCard, QrCode, Smartphone } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { copy } from "@/lib/copy";
import type { PaymentMethodConfig } from "@/lib/billing/payment-methods";
import { cn } from "@/lib/utils";

type Props = {
  method: PaymentMethodConfig;
  selected?: boolean;
  disabled?: boolean;
  onSelect?: () => void;
};

const icons = {
  QrCode,
  CreditCard,
  Smartphone,
  Building2,
};

export function PaymentMethodCard({ method, selected, disabled, onSelect }: Props) {
  const Icon = icons[method.iconName];

  return (
    <button
      type="button"
      aria-label={`${selected ? "Selected" : "Select"} ${method.name} demo payment method`}
      aria-pressed={selected}
      disabled={disabled}
      onClick={onSelect}
      className={cn(
        "relative flex min-h-[116px] w-full items-start gap-4 rounded-md border border-ink-200 bg-surface-0 p-5 text-left shadow-sm transition hover:border-ink-300 disabled:cursor-not-allowed disabled:opacity-45",
        selected && "ring-2 ring-gold-500",
      )}
    >
      <span
        className="absolute inset-y-0 left-0 w-1 rounded-l-md"
        style={{ backgroundColor: method.brandColor }}
        aria-hidden="true"
      />
      <span
        className="flex size-10 shrink-0 items-center justify-center rounded-full"
        style={{ color: method.brandColor, backgroundColor: `${method.brandColor}1A` }}
        aria-hidden="true"
      >
        <Icon className="size-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-2">
          <span className="font-bold text-ink-900">{method.name}</span>
          <span className="text-sm text-ink-400">{method.nameZh}</span>
          {method.recommended && <Badge variant="gold">{copy.payment.methods.recommended}</Badge>}
        </span>
        <span className="mt-1 block text-sm leading-5 text-ink-500">{method.description}</span>
      </span>
      {selected && <Check className="absolute right-4 top-4 size-5 text-gold-600" aria-hidden="true" />}
    </button>
  );
}
