"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Building2, CreditCard } from "lucide-react";

import { Logo } from "@/components/brand/Logo";
import { EmployerLogo } from "@/components/brand/EmployerLogo";
import { DemoLogoutButton, DemoUserMenu } from "@/components/auth/DemoUserMenu";
import { NotificationDropdown } from "@/components/layout/NotificationDropdown";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { copy } from "@/lib/copy";
import { cn } from "@/lib/utils";
import type { Employer } from "@/lib/mock-data/types";

type Props = { employer: Employer };

const secondaryNavLinks = [
  { label: copy.navigation.employer.dashboard, href: "/employer/dashboard" },
  { label: copy.navigation.employer.browse, href: "/employer/browse" },
  { label: copy.navigation.employer.scanner, href: "/employer/scanner" },
  { label: copy.navigation.employer.shortlist, href: "/employer/shortlist" },
  { label: copy.navigation.employer.messages, href: "/employer/messages" },
  { label: copy.navigation.employer.billing, href: "/employer/billing", icon: CreditCard },
];

export function EmployerHeader({ employer }: Props) {
  const pathname = usePathname();

  return (
    <header className="aurora-nav sticky top-0 z-40 border-b">
      {/* Primary bar */}
      <div className="flex h-16 items-center justify-between gap-4 border-b border-white/10 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <Link href="/" aria-label={copy.brand.name}>
            <Logo size="sm" showTagline={false} variant="auto" className="theme-logo" />
          </Link>
          <Badge variant="secondary" className="hidden text-xs sm:inline-flex">
            {copy.pages.employer.portal}
          </Badge>
        </div>

        {/* Desktop: employer identity */}
        <div className="hidden sm:flex items-center gap-2">
          <ThemeToggle compact />
          <NotificationDropdown recipientType="employer" recipientId={employer.id} />
          <DemoUserMenu
            role="employer"
            name={employer.name}
            detail="Recruiting workspace"
            avatar={<EmployerLogo employer={employer} className="size-8 rounded-md" />}
            triggerClassName="text-surface-0"
          />
        </div>

        {/* Mobile: hamburger */}
        <Sheet>
          <SheetTrigger type="button" className="flex size-9 items-center justify-center rounded-md text-surface-0 hover:bg-white/10 sm:hidden">
            <Menu className="size-5" />
            <span className="sr-only">{copy.accessibility.openMenu}</span>
          </SheetTrigger>
          <SheetContent side="right" className="w-64 bg-surface-0 p-0">
            <SheetHeader className="border-b border-ink-200 px-5 py-4">
              <SheetTitle className="flex items-center gap-2 text-sm font-semibold text-ink-900">
                <Building2 className="size-4" />
                {employer.name}
              </SheetTitle>
            </SheetHeader>
            <div className="mx-4 mt-4 flex items-center justify-between rounded-lg border border-gold-200 bg-gold-50/70 px-3 py-2">
              <span className="text-xs font-semibold text-ink-700">Demo notifications</span>
              <NotificationDropdown recipientType="employer" recipientId={employer.id} />
            </div>
            <div className="mx-4 mt-3 flex items-center justify-between rounded-lg border border-border bg-muted px-3 py-2">
              <span className="text-xs font-semibold text-foreground">Theme</span>
              <ThemeToggle compact align="start" />
            </div>
            <div className="mx-4 mt-3">
              <DemoLogoutButton className="w-full justify-center" />
            </div>
            <nav className="flex flex-col gap-1 p-4">
              {secondaryNavLinks.map((link) => {
                const Icon = link.icon;
                const isActive =
                  pathname === link.href ||
                  (link.href === "/employer/browse" && pathname.startsWith("/employer/student")) ||
                  (link.href === "/employer/billing" && pathname.startsWith("/employer/billing"));

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-ink-900 text-surface-0"
                        : "text-ink-600 hover:bg-ink-100 hover:text-ink-900",
                    )}
                  >
                    {Icon && <Icon className="size-4" aria-hidden="true" />}
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Secondary nav */}
      <div className="aurora-subnav flex overflow-x-auto border-b px-4 sm:px-6">
        {secondaryNavLinks.map((link) => {
          const isActive =
            pathname === link.href ||
            (link.href === "/employer/browse" && pathname.startsWith("/employer/student")) ||
            (link.href === "/employer/billing" && pathname.startsWith("/employer/billing"));
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "shrink-0 border-b-2 px-3 py-2.5 text-xs font-medium transition-colors whitespace-nowrap",
                isActive
                  ? "border-gold-500 text-gold-300"
                  : "border-transparent text-ink-400 hover:text-surface-0",
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
