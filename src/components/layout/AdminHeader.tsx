"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CreditCard, ShieldCheck } from "lucide-react";

import { Logo } from "@/components/brand/Logo";
import { DemoUserMenu } from "@/components/auth/DemoUserMenu";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { copy } from "@/lib/copy";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: copy.navigation.admin.overview, href: "/admin" },
  { label: copy.navigation.admin.employers, href: "/admin/employers" },
  { label: copy.navigation.admin.events, href: "/admin/events" },
  { label: copy.navigation.admin.billing, href: "/admin/billing", icon: CreditCard },
];

export function AdminHeader() {
  const pathname = usePathname();

  return (
    <header className="aurora-nav sticky top-0 z-40">
      <div className="flex h-14 items-center justify-between gap-3 overflow-hidden px-4 sm:gap-4 sm:px-6">
        <div className="flex items-center gap-3">
          <Link href="/" aria-label={copy.brand.name}>
            <Logo size="sm" showTagline={false} variant="auto" className="theme-logo" />
          </Link>
          <Badge variant="secondary" className="hidden text-xs sm:inline-flex">{copy.pages.admin.portal}</Badge>
        </div>
        <div className="flex items-center gap-1 text-surface-0">
          <ThemeToggle compact />
          <DemoUserMenu
            role="admin"
            name={copy.pages.admin.serviceLabel}
            detail={copy.pages.admin.portal}
            avatar={
              <span className="flex size-8 items-center justify-center rounded-full bg-gold-500/15 text-gold-300 ring-1 ring-gold-400/30">
                <ShieldCheck className="size-4" aria-hidden="true" />
              </span>
            }
            triggerClassName="text-surface-0"
          />
        </div>
      </div>
      <div className="aurora-subnav flex overflow-x-auto border-b px-4 scrollbar-hide sm:px-6">
        {navLinks.map((link) => {
          const isActive = link.href === "/admin" ? pathname === link.href : pathname === link.href || pathname.startsWith(`${link.href}/`);
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "border-b-2 px-3 py-2.5 text-xs font-medium whitespace-nowrap transition-colors",
                isActive
                  ? "border-gold-500 text-surface-0"
                  : "border-transparent text-ink-400 hover:text-ink-200",
              )}
            >
              {Icon && <Icon className="mr-1.5 size-4" aria-hidden="true" />}
              {link.label}
            </Link>
          );
        })}
      </div>
    </header>
  );
}
