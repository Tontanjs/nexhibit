import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type NeonButtonVariant = "gold" | "violet" | "cyan" | "ghost";

const variantClass: Record<NeonButtonVariant, string> = {
  gold: "border-gold-300/60 bg-gold-500 text-aurora-black shadow-[0_16px_42px_rgba(245,197,24,0.24)] hover:bg-gold-400",
  violet: "border-violet-300/30 bg-aurora-violet text-white shadow-[0_16px_42px_rgba(168,85,247,0.24)] hover:bg-violet-500",
  cyan: "border-cyan-300/30 bg-aurora-cyan text-aurora-black shadow-[0_16px_42px_rgba(6,182,212,0.2)] hover:bg-cyan-300",
  ghost: "border-white/[0.15] bg-white/[0.07] text-surface-0 hover:border-gold-300/35 hover:bg-white/[0.12]",
};

type NeonButtonProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  variant?: NeonButtonVariant;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

export function NeonButton({
  children,
  className,
  href,
  variant = "gold",
  onClick,
  type = "button",
  disabled,
}: NeonButtonProps) {
  const classes = cn(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-md border px-5 py-2.5 text-sm font-bold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300/60 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
    variantClass[variant],
    className,
  );

  if (href) {
    return (
      <Link className={classes} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
