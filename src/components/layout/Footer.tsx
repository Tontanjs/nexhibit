import Link from "next/link";

import { Logo } from "@/components/brand/Logo";
import { copy } from "@/lib/copy";

const footerRoutes: Record<string, string> = {
  Features: "/#how-it-works",
  "How it works": "/#how-it-works",
  Pricing: "/signup",
  "For Employers": "/#employers",
  About: "/about",
  Team: "/about",
  Contact: "/about",
  Careers: "/success-stories",
  "Help Center": "/student/settings",
  "Success Stories": "/success-stories",
  Blog: "/success-stories",
  Press: "/about",
  "Privacy Policy": "/student/settings",
  Terms: "/student/settings",
  "PIPL considerations": "/student/settings",
  "Cookie Policy": "/student/settings",
};

export function Footer({ compact = false }: { compact?: boolean }) {
  return (
    <footer className="bg-dark">
      {!compact ? (
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
          {copy.layout.footer.groups.map((group) => (
            <div key={group.title}>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-surface-0">{group.title}</h2>
              <ul className="mt-4 grid gap-3">
                {group.links.map((link) => (
                  <li key={link}>
                    <Link data-underline="true" className="text-sm text-ink-300 transition-colors hover:text-surface-0" href={footerRoutes[link] ?? "/"}>
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : null}
      <div className="border-t border-surface-0/10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-5 text-sm text-ink-300 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <Logo size="sm" variant="auto" showTagline={false} className="theme-logo" />
          <p className="footer-typewriter">{copy.layout.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
