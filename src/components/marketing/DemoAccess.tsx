import Link from "next/link";
import { Building2, GraduationCap, LayoutDashboard } from "lucide-react";

import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { copy } from "@/lib/copy";
import { cn } from "@/lib/utils";

const d = copy.marketing.demo;

const portals = [
  {
    icon: GraduationCap,
    ...d.student,
    href: "/student/profile",
  },
  {
    icon: Building2,
    ...d.employer,
    href: "/employer/dashboard",
  },
  {
    icon: LayoutDashboard,
    ...d.admin,
    href: "/admin",
  },
] as const;

export function DemoAccess() {
  return (
    <section className="border-b border-ink-200 bg-surface-0 py-12 md:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col items-center gap-2 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-50 px-3 py-1">
            <span className="size-1.5 rounded-full bg-gold-500" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-wide text-ink-700">{d.eyebrow}</span>
          </div>
          <p className="max-w-2xl text-sm leading-relaxed text-ink-500">{d.subheading}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {portals.map(({ icon: Icon, label, description, cta, href }) => (
            <Card
              key={label}
              className="group flex flex-col gap-4 overflow-hidden p-5 transition-all hover:-translate-y-1 hover:border-gold-500/40 hover:shadow-lg"
            >
              <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-md border border-ink-200 bg-ink-900 text-gold-400 shadow-sm transition-colors group-hover:border-gold-500/40">
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-ink-900">{label}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-ink-500">{description}</p>
                </div>
              </div>
              <Link
                href={href}
                className={cn(buttonVariants({ variant: "outline", size: "sm" }), "mt-auto w-full")}
              >
                {cta}
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
