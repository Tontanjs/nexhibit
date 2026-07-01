import type { ComponentType, ReactNode } from "react";

import { cn } from "@/lib/utils";

type GlowCardTone = "gold" | "violet" | "cyan" | "blue" | "success";

const toneClass: Record<GlowCardTone, string> = {
  gold: "after:bg-gold-500/70",
  violet: "after:bg-aurora-violet/70",
  cyan: "after:bg-aurora-cyan/70",
  blue: "after:bg-aurora-blue/70",
  success: "after:bg-success/70",
};

type GlowCardProps = {
  children?: ReactNode;
  className?: string;
  tone?: GlowCardTone;
  icon?: ComponentType<{ className?: string }>;
  label?: string;
  title?: string;
  body?: string;
};

export function GlowCard({
  children,
  className,
  tone = "gold",
  icon: Icon,
  label,
  title,
  body,
}: GlowCardProps) {
  return (
    <div
      className={cn(
        "glow-card motion-safe-hover relative overflow-hidden rounded-lg p-5 after:absolute after:inset-x-5 after:top-0 after:h-px",
        toneClass[tone],
        className,
      )}
    >
      {Icon ? (
        <span className="mb-4 flex size-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.08] text-gold-300 shadow-lg shadow-black/20">
          <Icon className="size-5" aria-hidden="true" />
        </span>
      ) : null}
      {label ? <p className="text-xs font-bold uppercase tracking-[0.18em] text-aurora-cyan">{label}</p> : null}
      {title ? <h3 className="mt-2 text-base font-semibold text-surface-0">{title}</h3> : null}
      {body ? <p className="mt-2 text-sm leading-6 text-ink-300">{body}</p> : null}
      {children}
    </div>
  );
}
