"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ChevronDown, Building2 } from "lucide-react";

import { Logo } from "@/components/brand/Logo";
import { EmployerLogo } from "@/components/brand/EmployerLogo";
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
];

export function EmployerHeader({ employer }: Props) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-ink-200/70 bg-surface-0/95 shadow-sm backdrop-blur">
      {/* Primary bar */}
      <div className="flex h-16 items-center justify-between gap-4 border-b border-ink-200 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <Link href="/" aria-label={copy.brand.name}>
            <Logo size="sm" showTagline={false} />
          </Link>
          <Badge variant="secondary" className="hidden text-xs sm:inline-flex">
            {copy.pages.employer.portal}
          </Badge>
        </div>

        {/* Desktop: employer identity */}
        <div className="hidden sm:flex items-center gap-2">
          <EmployerLogo employer={employer} className="size-8 rounded-md" />
          <span className="text-sm font-semibold text-ink-900">{employer.name}</span>
          <ChevronDown className="size-4 text-ink-400" />
        </div>

        {/* Mobile: hamburger */}
        <Sheet>
          <SheetTrigger className="flex size-9 items-center justify-center rounded-md text-ink-600 hover:bg-ink-100 sm:hidden">
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
            <nav className="flex flex-col gap-1 p-4">
              {secondaryNavLinks.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    pathname === href ||
                    (href === "/employer/browse" && pathname.startsWith("/employer/student"))
                      ? "bg-ink-900 text-surface-0"
                      : "text-ink-600 hover:bg-ink-100 hover:text-ink-900",
                  )}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Secondary nav */}
      <div className="flex overflow-x-auto border-b border-ink-100 bg-surface-0/95 px-4 sm:px-6">
        {secondaryNavLinks.map(({ label, href }) => {
          const isActive =
            pathname === href ||
            (href === "/employer/browse" && pathname.startsWith("/employer/student"));
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "shrink-0 border-b-2 px-3 py-2.5 text-xs font-medium transition-colors whitespace-nowrap",
                isActive
                  ? "border-gold-500 text-ink-900"
                  : "border-transparent text-ink-500 hover:text-ink-800",
              )}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </header>
  );
}
