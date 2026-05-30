"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck } from "lucide-react";

import { Logo } from "@/components/brand/Logo";
import { Badge } from "@/components/ui/badge";
import { copy } from "@/lib/copy";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Dashboard", href: "/admin" },
  { label: copy.navigation.admin.employers, href: "/admin/employers" },
  { label: copy.navigation.admin.events, href: "/admin/events" },
];

export function AdminHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 bg-ink-900 shadow-sm">
      <div className="flex h-14 items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <Logo size="sm" showTagline={false} variant="light" />
          <Badge variant="secondary" className="text-xs">{copy.pages.admin.portal}</Badge>
        </div>
        <div className="flex items-center gap-1 text-surface-0">
          <ShieldCheck className="size-3.5 text-gold-400" />
          <span className="text-xs font-medium text-ink-300">ZJUT Career Services</span>
        </div>
      </div>
      <div className="flex border-b border-ink-700 bg-ink-900 px-4 sm:px-6">
        {navLinks.map(({ label, href }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "border-b-2 px-3 py-2.5 text-xs font-medium whitespace-nowrap transition-colors",
                isActive
                  ? "border-gold-500 text-surface-0"
                  : "border-transparent text-ink-400 hover:text-ink-200",
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
