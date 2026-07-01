import { Info, LockKeyhole } from "lucide-react";

import { cn } from "@/lib/utils";

type PrototypeNoticeVariant = "subtle" | "card" | "dark" | "inline";

type PrototypeNoticeProps = {
  variant?: PrototypeNoticeVariant;
  message?: string;
  title?: string;
  className?: string;
};

export const DEFAULT_PROTOTYPE_NOTICE =
  "Prototype demo · Mock data · No real student or employer data processed.";

const variantClasses: Record<PrototypeNoticeVariant, string> = {
  subtle: "border-ink-200 bg-surface-0/80 text-ink-600",
  card: "border-gold-500/35 bg-gold-50/90 text-[#1A1F2E] shadow-inner",
  dark: "border-surface-0/15 bg-surface-0/[0.06] text-ink-300",
  inline: "border-transparent bg-transparent px-0 py-0 text-ink-500",
};

export function PrototypeNotice({
  variant = "subtle",
  message = DEFAULT_PROTOTYPE_NOTICE,
  title,
  className,
}: PrototypeNoticeProps) {
  const isInline = variant === "inline";
  const Icon = variant === "card" || variant === "dark" ? LockKeyhole : Info;

  return (
    <div
      className={cn(
        "rounded-lg border px-3 py-2 text-sm",
        variantClasses[variant],
        isInline ? "inline-flex items-center gap-2" : "flex gap-3",
        className,
      )}
      role="note"
    >
      <span
        className={cn(
          "mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md",
          variant === "dark" ? "bg-gold-500/15 text-gold-400" : "bg-gold-50 text-gold-700",
          isInline && "mt-0 size-5 bg-transparent",
        )}
        aria-hidden="true"
      >
        <Icon className={cn(isInline ? "size-3.5" : "size-4")} />
      </span>
      <span className="min-w-0">
        {title ? (
          <span
            className={cn(
              "block text-xs font-bold uppercase tracking-[0.14em]",
              variant === "dark" ? "text-gold-400" : variant === "card" ? "text-[#0A0E1A]" : "text-ink-900",
            )}
          >
            {title}
          </span>
        ) : null}
        <span className={cn("leading-relaxed", title && "mt-1 block")}>{message}</span>
      </span>
    </div>
  );
}

export function CompanyMockDisclaimer({ className }: { className?: string }) {
  return (
    <PrototypeNotice
      variant="inline"
      message="Company names are used as prototype mock data for demonstration only."
      className={className}
    />
  );
}
