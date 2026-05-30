"use client";

import { useState } from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmployerLogo } from "@/components/brand/EmployerLogo";
import { copy } from "@/lib/copy";
import { employers } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const p = copy.pages.admin.employers;

type Tab = "All" | "Verified" | "Pending";

export default function AdminEmployersPage() {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<Tab>("All");

  const filtered = employers.filter((e) => {
    const matchesSearch =
      !search ||
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.industry.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-bold text-ink-900">{p.heading}</h1>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-400" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={p.searchPlaceholder}
            className="pl-9"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-5 flex gap-1">
        {(["All", "Verified", "Pending"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium transition-colors",
              tab === t
                ? "bg-ink-900 text-surface-0"
                : "bg-ink-100 text-ink-600 hover:bg-ink-200",
            )}
          >
            {t === "All" ? p.tabAll : t === "Verified" ? p.tabVerified : p.tabPending}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-ink-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ink-200 bg-ink-50 text-left">
              <th className="px-4 py-3 text-xs font-semibold text-ink-500">Employer</th>
              <th className="hidden px-4 py-3 text-xs font-semibold text-ink-500 md:table-cell">{p.industryLabel}</th>
              <th className="hidden px-4 py-3 text-xs font-semibold text-ink-500 lg:table-cell">{p.typeLabel}</th>
              <th className="hidden px-4 py-3 text-xs font-semibold text-ink-500 sm:table-cell">{p.sizeLabel}</th>
              <th className="px-4 py-3 text-xs font-semibold text-ink-500">{p.hiringLabel}</th>
              <th className="hidden px-4 py-3 text-xs font-semibold text-ink-500 sm:table-cell">{p.activeSinceLabel}</th>
              <th className="px-4 py-3 text-xs font-semibold text-ink-500">Status</th>
              <th className="px-4 py-3 text-xs font-semibold text-ink-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((emp, i) => (
              <tr
                key={emp.id}
                className={cn(
                  "transition-colors hover:bg-ink-50",
                  i < filtered.length - 1 && "border-b border-ink-100",
                )}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <EmployerLogo employer={emp} className="size-8 rounded-md" />
                    <div>
                      <p className="font-medium text-ink-900">{emp.name}</p>
                      <p className="text-[11px] text-ink-400">{emp.location}</p>
                    </div>
                  </div>
                </td>
                <td className="hidden px-4 py-3 text-xs text-ink-600 md:table-cell">
                  <span className="line-clamp-1 max-w-[160px]">{emp.industry}</span>
                </td>
                <td className="hidden px-4 py-3 lg:table-cell">
                  <Badge variant="secondary" className="text-[10px]">{emp.type}</Badge>
                </td>
                <td className="hidden px-4 py-3 text-xs text-ink-600 sm:table-cell">
                  {emp.size.split(" ")[0]}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {emp.hiringCategories.slice(0, 2).map((cat) => (
                      <span key={cat} className="rounded-full bg-ink-100 px-1.5 py-0.5 text-[10px] text-ink-600">
                        {cat}
                      </span>
                    ))}
                    {emp.hiringCategories.length > 2 && (
                      <span className="rounded-full bg-ink-100 px-1.5 py-0.5 text-[10px] text-ink-400">
                        +{emp.hiringCategories.length - 2}
                      </span>
                    )}
                  </div>
                </td>
                <td className="hidden px-4 py-3 text-xs text-ink-400 sm:table-cell">{emp.activeSince}</td>
                <td className="px-4 py-3">
                  <Badge variant="success" className="text-[10px]">Verified</Badge>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" className="h-6 px-2 text-[10px]">
                      {p.viewAction}
                    </Button>
                    <Button variant="ghost" size="sm" className="h-6 px-2 text-[10px] text-error hover:text-error">
                      {p.suspendAction}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
