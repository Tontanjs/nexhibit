"use client";

import * as React from "react";
import { ChevronDown, LogOut, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { clearDemoSession, getDemoRoleLabel, type DemoRole } from "@/lib/demo-session";
import { cn } from "@/lib/utils";

type DemoUserMenuProps = {
  role: DemoRole;
  name: string;
  detail?: string;
  avatar?: React.ReactNode;
  align?: "start" | "center" | "end";
  className?: string;
  triggerClassName?: string;
};

function useDemoLogout() {
  const router = useRouter();

  return React.useCallback(() => {
    clearDemoSession();
    toast.success("Logged out of demo session.");
    router.replace("/login");
  }, [router]);
}

export function DemoLogoutButton({
  className,
  label = "Log out demo session",
}: {
  className?: string;
  label?: string;
}) {
  const logout = useDemoLogout();

  return (
    <Button type="button" variant="outline" className={className} onClick={logout}>
      <LogOut className="size-4" aria-hidden="true" />
      {label}
    </Button>
  );
}

export function DemoUserMenu({
  role,
  name,
  detail,
  avatar,
  align = "end",
  className,
  triggerClassName,
}: DemoUserMenuProps) {
  const logout = useDemoLogout();
  const roleLabel = getDemoRoleLabel(role);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={`${roleLabel} user menu`}
          className={cn(
            "inline-flex min-h-11 items-center gap-2 rounded-md px-2 py-1.5 text-sm font-semibold transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400",
            triggerClassName,
          )}
        >
          {avatar ?? (
            <span className="flex size-8 items-center justify-center rounded-full bg-gold-500 text-ink-900">
              <UserRound className="size-4" aria-hidden="true" />
            </span>
          )}
          <span className="min-w-0 text-left">
            <span className="block max-w-[150px] truncate text-current">{name}</span>
            <span className="block max-w-[150px] truncate text-[11px] font-medium text-ink-400">
              {roleLabel}
            </span>
          </span>
          <ChevronDown className="size-3.5 text-ink-300" aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className={cn("w-72", className)}>
        <DropdownMenuLabel>
          <span className="block text-sm font-bold text-foreground">{name}</span>
          <span className="mt-0.5 block text-xs font-medium text-muted-foreground">{detail ?? roleLabel}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="px-2 py-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Current role</p>
          <p className="mt-1 text-sm text-foreground">{roleLabel}</p>
        </div>
        <DropdownMenuSeparator />
        <div className="px-2 py-2">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-medium text-foreground">Theme</span>
            <ThemeToggle compact align="start" />
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onSelect={(event) => {
            event.preventDefault();
            logout();
          }}
        >
          <LogOut className="size-4" aria-hidden="true" />
          Log out demo session
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
