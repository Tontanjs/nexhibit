import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type PremiumHeroPanelProps = {
  eyebrow?: string;
  title: string;
  body?: string;
  children?: ReactNode;
  className?: string;
  actions?: ReactNode;
};

export function PremiumHeroPanel({ eyebrow, title, body, children, className, actions }: PremiumHeroPanelProps) {
  return (
    <section className={cn("aurora-panel neon-border overflow-hidden rounded-lg p-6 sm:p-7", className)}>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          {eyebrow ? <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-300">{eyebrow}</p> : null}
          <h1 className="mt-3 text-3xl font-black leading-tight tracking-normal text-surface-0 sm:text-4xl">{title}</h1>
          {body ? <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-300 sm:text-base">{body}</p> : null}
        </div>
        {actions ? <div className="flex shrink-0 flex-wrap gap-2">{actions}</div> : null}
      </div>
      {children ? <div className="mt-6">{children}</div> : null}
    </section>
  );
}
