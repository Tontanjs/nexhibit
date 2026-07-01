import Link from "next/link";
import { Menu } from "lucide-react";

import { Logo } from "@/components/brand/Logo";
import { DemoBanner } from "@/components/marketing/DemoBanner";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { copy } from "@/lib/copy";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: copy.navigation.marketing.howItWorks, href: "/#how-it-works" },
  { label: copy.navigation.marketing.students, href: "/#students" },
  { label: copy.navigation.marketing.employers, href: "/#employers" },
  { label: copy.navigation.marketing.about, href: "/about" },
  { label: copy.navigation.marketing.pricing, href: "/pricing" },
];

export function Navbar() {
  return (
    <header className="aurora-nav sticky top-0 z-40">
      <DemoBanner />
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between border-b px-4 sm:px-6 lg:h-[72px] lg:px-8">
        <Link className="flex shrink-0 items-center" href="/" aria-label={copy.brand.name}>
          <Logo size="sm" showTagline={false} variant="auto" className="theme-logo" />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              data-underline="true"
              className="text-sm font-semibold text-[var(--nav-muted)] transition hover:-translate-y-0.5 hover:text-[var(--nav-foreground)]"
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Link
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "border-[var(--nav-border)] bg-[var(--surface-elevated)] text-[var(--nav-foreground)] hover:bg-[var(--muted)]",
            )}
            href="/login"
          >
            {copy.buttons.primary.logIn}
          </Link>
          <Link className={cn(buttonVariants({ variant: "primary", size: "sm" }))} href="/signup">
            {copy.buttons.primary.signUp}
          </Link>
        </div>

        <Sheet>
          <SheetTrigger
            aria-label={copy.accessibility.openMenu}
            className="inline-flex size-11 items-center justify-center rounded-md text-[var(--nav-foreground)] transition hover:-translate-y-0.5 hover:bg-surface-0/10 md:hidden"
          >
            <Menu className="size-5" aria-hidden="true" />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>{copy.brand.name}</SheetTitle>
            </SheetHeader>
            <div className="mt-8 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link key={link.href} className="min-h-11 rounded-md px-2 py-2.5 text-base font-medium text-ink-800 hover:bg-ink-100" href={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between rounded-lg border border-border bg-muted px-3 py-2">
              <span className="text-sm font-semibold text-foreground">Theme</span>
              <ThemeToggle compact />
            </div>
            <div className="mt-8 grid gap-3">
              <Link className={cn(buttonVariants({ variant: "outline" }))} href="/login">
                {copy.buttons.primary.logIn}
              </Link>
              <Link className={cn(buttonVariants({ variant: "primary" }))} href="/signup">
                {copy.buttons.primary.signUp}
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
