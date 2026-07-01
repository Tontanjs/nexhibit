"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Brain, ClipboardList, CreditCard, FileOutput, Menu, Radio, Users } from "lucide-react";

import { Logo } from "@/components/brand/Logo";
import { StudentAvatar } from "@/components/brand/StudentAvatar";
import { DemoLogoutButton, DemoUserMenu } from "@/components/auth/DemoUserMenu";
import { NotificationDropdown } from "@/components/layout/NotificationDropdown";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { TrackerReminderBadge } from "@/components/tracker/TrackerReminderBadge";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { copy } from "@/lib/copy";
import { cn } from "@/lib/utils";
import type { Student } from "@/lib/mock-data/types";

const secondaryNavLinks = [
  { label: copy.navigation.student.profile, href: "/student/profile" },
  { label: "Resume Formats", href: "/resume-adapter", icon: FileOutput },
  { label: "My Applications", href: "/tracker", icon: ClipboardList },
  { label: copy.navigation.student.events, href: "/student/events" },
  { label: copy.navigation.student.eventDay, href: "/student/event-day" },
  { label: "Live Booth", href: "/student/live-booth", icon: Radio },
  { label: "Coach", href: "/student/coach", icon: Brain },
  { label: "Network", href: "/student/network", icon: Users },
  { label: copy.navigation.student.dashboard, href: "/student/dashboard" },
  { label: copy.navigation.student.messages, href: "/student/messages" },
  { label: copy.navigation.student.billing, href: "/student/billing", icon: CreditCard },
];

export function StudentHeader({ user }: { user: Student }) {
  const pathname = usePathname();

  return (
    <div className="sticky top-0 z-40">
      {/* Main navbar */}
      <header className="aurora-nav border-b">
        <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link className="flex shrink-0 items-center" href="/" aria-label={copy.brand.name}>
            <Logo size="sm" showTagline={false} variant="auto" className="theme-logo" />
          </Link>

          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle compact />
            <NotificationDropdown recipientType="student" recipientId={user.id} />
            <Badge variant="secondary" className="text-xs font-semibold">
              {copy.pages.student.portal}
            </Badge>
            <DemoUserMenu
              role="student"
              name={user.name}
              detail={user.major}
              avatar={<StudentAvatar student={user} className="size-8" />}
              triggerClassName="text-ink-800"
            />
          </div>

          <Sheet>
            <SheetTrigger
              type="button"
              aria-label={copy.accessibility.openMenu}
              className="inline-flex size-11 items-center justify-center rounded-md text-surface-0 hover:bg-white/10 md:hidden"
            >
              <Menu className="size-5" aria-hidden="true" />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>{copy.pages.student.portal}</SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex items-center gap-3 rounded-lg border border-ink-200 p-3">
                <StudentAvatar student={user} className="size-10" />
                <div>
                  <p className="text-sm font-semibold text-ink-900">{user.name}</p>
                  <p className="text-xs text-ink-500">{user.major}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between rounded-lg border border-gold-200 bg-gold-50/70 px-3 py-2">
                <span className="text-xs font-semibold text-ink-700">Demo notifications</span>
                <NotificationDropdown recipientType="student" recipientId={user.id} />
              </div>
              <div className="mt-4 flex items-center justify-between rounded-lg border border-border bg-muted px-3 py-2">
                <span className="text-xs font-semibold text-foreground">Theme</span>
                <ThemeToggle compact />
              </div>
              <DemoLogoutButton className="mt-4 w-full justify-center" />
              <div className="mt-6 flex flex-col gap-1">
                {secondaryNavLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex min-h-11 items-center gap-2 rounded-md px-3 py-2.5 text-base font-medium transition-colors hover:bg-ink-100",
                      pathname.startsWith(link.href)
                        ? "bg-gold-50 text-ink-900 font-semibold"
                        : "text-ink-700",
                    )}
                  >
                    {Icon && <Icon className="size-4" aria-hidden="true" />}
                    {link.label}
                    {link.href === "/tracker" && <TrackerReminderBadge />}
                  </Link>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </header>

      {/* Secondary nav */}
      <div className="aurora-subnav border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto scrollbar-hide">
            {secondaryNavLinks.map((link) => {
              const isActive = pathname.startsWith(link.href);
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex shrink-0 items-center border-b-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors",
                    isActive
                      ? "border-gold-500 text-gold-300"
                      : "border-transparent text-ink-400 hover:border-ink-300 hover:text-surface-0",
                  )}
                >
                  {Icon && <Icon className="mr-1.5 size-4" aria-hidden="true" />}
                  {link.label}
                  {link.href === "/tracker" && <TrackerReminderBadge />}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
