import type { ComponentType, ReactNode } from "react";

import { cn } from "@/lib/utils";

type EmptyStateProps = {
  icon?: ComponentType<{ className?: string }>;
  title: string;
  body: string;
  action?: ReactNode;
  className?: string;
};

export function EmptyState({ icon: Icon, title, body, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-dashed border-ink-300 bg-surface-0 px-6 py-14 text-center",
        className,
      )}
    >
      {Icon ? (
        <span className="mb-4 flex size-12 items-center justify-center rounded-lg bg-ink-100 text-ink-500">
          <Icon className="size-5" aria-hidden="true" />
        </span>
      ) : null}
      <p className="text-base font-semibold text-ink-800">{title}</p>
      <p className="mt-2 max-w-sm text-sm leading-6 text-ink-500">{body}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
