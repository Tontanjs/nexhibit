"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, GraduationCap, Building2, LayoutDashboard, ArrowRight } from "lucide-react";

const STORAGE_KEY = "nexhibit_demo_banner_dismissed";

const portals = [
  {
    role: "Student",
    icon: GraduationCap,
    description: "Browse employers, book a booth, get discovered",
    href: "/student/dashboard",
    color: "text-aurora-blue",
    bg: "bg-aurora-blue/10 hover:bg-aurora-blue/20",
    border: "border-aurora-blue/20 hover:border-aurora-blue/40",
  },
  {
    role: "Employer",
    icon: Building2,
    description: "Browse student profiles, scan QR, build shortlist",
    href: "/employer/dashboard",
    color: "text-gold-600",
    bg: "bg-gold-500/10 hover:bg-gold-500/20",
    border: "border-gold-500/20 hover:border-gold-500/40",
  },
  {
    role: "Admin",
    icon: LayoutDashboard,
    description: "Manage events, verify employers, view analytics",
    href: "/admin",
    color: "text-aurora-violet",
    bg: "bg-aurora-violet/10 hover:bg-aurora-violet/20",
    border: "border-aurora-violet/20 hover:border-aurora-violet/40",
  },
] as const;

export function DemoBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem(STORAGE_KEY);
      if (!dismissed) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function dismiss() {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {}
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Demo navigation guide"
      className="relative z-50 border-b border-gold-500/20 bg-ink-900/95 backdrop-blur-sm"
    >
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Left label */}
          <div className="flex shrink-0 items-center gap-2.5">
            <span className="flex size-2 rounded-full bg-gold-400">
              <span className="absolute inline-flex size-2 animate-ping rounded-full bg-gold-400 opacity-75" />
            </span>
            <p className="text-sm font-semibold text-surface-0">
              <span className="text-gold-400">Prototype demo</span>
              <span className="mx-2 text-ink-500">·</span>
              <span className="hidden text-ink-300 sm:inline">เลือก portal เพื่อเริ่ม →</span>
              <span className="text-ink-300 sm:hidden">Choose a portal</span>
            </p>
          </div>

          {/* Portal buttons */}
          <div className="flex flex-wrap gap-2">
            {portals.map(({ role, icon: Icon, description, href, color, bg, border }) => (
              <Link
                key={role}
                href={href}
                onClick={dismiss}
                className={`group inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm font-medium transition-all duration-200 ${bg} ${border}`}
                title={description}
              >
                <Icon className={`size-3.5 ${color}`} aria-hidden="true" />
                <span className={color}>{role}</span>
                <ArrowRight className={`size-3 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100 ${color}`} aria-hidden="true" />
              </Link>
            ))}
          </div>

          {/* Dismiss */}
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss demo guide"
            className="absolute right-4 top-3 flex size-7 shrink-0 items-center justify-center rounded-md text-ink-400 transition hover:bg-surface-0/10 hover:text-surface-0 sm:relative sm:right-auto sm:top-auto"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
