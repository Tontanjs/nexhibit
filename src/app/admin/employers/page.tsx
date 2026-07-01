"use client";

import { useState } from "react";
import { Building2, CheckCircle2, Search, XCircle } from "lucide-react";
import { toast } from "sonner";

import { CompanyMockDisclaimer, PrototypeNotice } from "@/components/brand/prototype-notice";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { EmployerLogo } from "@/components/brand/EmployerLogo";
import { copy } from "@/lib/copy";
import { employers } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import type { Employer } from "@/lib/mock-data/types";

const p = copy.pages.admin.employers;

type Tab = "All" | "Reviewed" | "Pending";
type VerificationStatus = "Reviewed" | "Pending" | "Needs review";

function getDemoStatus(employer: Employer): VerificationStatus {
  if (employer.id === "emp-006") return "Pending";
  if (employer.id === "emp-007") return "Needs review";
  return "Reviewed";
}

function statusBadge(status: VerificationStatus) {
  if (status === "Reviewed") return "success";
  if (status === "Pending") return "gold";
  return "outline";
}

export default function AdminEmployersPage() {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<Tab>("All");
  const [selectedEmployer, setSelectedEmployer] = useState<Employer | null>(null);

  const filtered = employers.filter((e) => {
    const matchesSearch =
      !search ||
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.industry.toLowerCase().includes(search.toLowerCase());
    const status = getDemoStatus(e);
    const matchesTab = tab === "All" || (tab === "Reviewed" ? status === "Reviewed" : status !== "Reviewed");
    return matchesSearch && matchesTab;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-ink-900">{p.heading}</h1>
          <CompanyMockDisclaimer className="mt-1 text-xs" />
        </div>
        <div className="relative w-full sm:w-72">
          <Label htmlFor="employer-search" className="sr-only">Search employers</Label>
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-400" />
          <Input
            id="employer-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={p.searchPlaceholder}
            className="pl-9"
          />
        </div>
      </div>

      <PrototypeNotice
        variant="card"
        title="Verification workflow demo"
        message="Employer status, approval, rejection, and suspension actions are prototype UI behavior only."
        className="mb-5"
      />

      {/* Tabs */}
      <div className="mb-5 flex gap-1">
        {(["All", "Reviewed", "Pending"] as Tab[]).map((t) => (
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
            {t === "All" ? p.tabAll : t === "Reviewed" ? "Reviewed demo" : p.tabPending}
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
                  <Badge variant={statusBadge(getDemoStatus(emp))} className="text-[10px]">{getDemoStatus(emp)}</Badge>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" className="h-6 px-2 text-[10px]" onClick={() => setSelectedEmployer(emp)}>
                      {p.viewAction}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 px-2 text-[10px] text-error hover:text-error"
                      onClick={() => toast.warning(`${emp.name} suspension is a demo action only.`)}
                    >
                      {p.suspendAction}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-5 rounded-xl border border-dashed border-ink-300 bg-surface-0 px-6 py-12 text-center">
          <Building2 className="mx-auto size-8 text-ink-300" aria-hidden="true" />
          <p className="mt-3 text-sm font-semibold text-ink-800">No employer reviews match this view.</p>
          <p className="mt-1 text-sm text-ink-500">Try clearing search or switching to all employer accounts.</p>
        </div>
      ) : null}

      <Dialog open={Boolean(selectedEmployer)} onOpenChange={(open) => !open && setSelectedEmployer(null)}>
        {selectedEmployer ? <VerificationReviewPanel employer={selectedEmployer} /> : null}
      </Dialog>
    </div>
  );
}

function VerificationReviewPanel({ employer }: { employer: Employer }) {
  const status = getDemoStatus(employer);
  const checklist = [
    "Business profile reviewed",
    "Hiring category aligned",
    "Contact verified",
    "Event participation approved",
  ];

  return (
    <DialogContent className="sm:max-w-2xl">
      <DialogHeader>
        <DialogTitle>Employer verification review</DialogTitle>
        <DialogDescription>
          Prototype panel for reviewing employer access. Actions show toast feedback and do not persist to a backend.
        </DialogDescription>
      </DialogHeader>
      <div className="rounded-xl border border-ink-200 bg-surface-0 p-4">
        <div className="flex items-start gap-3">
          <EmployerLogo employer={employer} className="size-12 rounded-xl" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-base font-semibold text-ink-900">{employer.name}</h2>
              <Badge variant={statusBadge(status)} className="text-[10px]">{status}</Badge>
            </div>
            <p className="mt-1 text-sm text-ink-500">{employer.location} · {employer.industry}</p>
            <p className="mt-2 text-sm leading-6 text-ink-600">{employer.description}</p>
          </div>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            ["Company size", employer.size],
            ["Hiring categories", employer.hiringCategories.join(", ")],
            ["Active since", employer.activeSince],
            ["Company type", employer.type],
          ].map(([label, value]) => (
            <div key={label} className="rounded-lg bg-ink-50 px-3 py-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-400">{label}</p>
              <p className="mt-1 text-sm font-medium text-ink-800">{value}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {checklist.map((item, index) => (
          <div key={item} className="flex items-center gap-2 rounded-lg border border-ink-200 bg-ink-50 px-3 py-2">
            <CheckCircle2 className={cn("size-4", index < 3 || status === "Reviewed" ? "text-success" : "text-ink-300")} />
            <span className="text-sm text-ink-700">{item}</span>
          </div>
        ))}
      </div>
      <PrototypeNotice message="Approval and rejection are demo actions. A real version needs audit logs, role-based access, and verified company contacts." />
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button
          variant="outline"
          onClick={() => toast.error(`${employer.name} rejection recorded as prototype feedback only.`)}
        >
          <XCircle className="size-4" />
          Reject demo
        </Button>
        <Button
          variant="primary"
          onClick={() => toast.success(`${employer.name} approved for this prototype session.`)}
        >
          <CheckCircle2 className="size-4" />
          Approve demo
        </Button>
      </div>
    </DialogContent>
  );
}
