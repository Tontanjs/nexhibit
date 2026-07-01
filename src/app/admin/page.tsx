"use client";

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  AlertTriangle,
  Building2,
  CalendarCheck,
  ClipboardCheck,
  Lightbulb,
  TrendingUp,
  Users,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CompanyMockDisclaimer, PrototypeNotice } from "@/components/brand/prototype-notice";
import { InsightCard } from "@/components/product/insight-card";
import { ReadinessChecklist } from "@/components/product/readiness-checklist";
import { MetricGlowCard, PremiumHeroPanel } from "@/components/aurora";
import { copy } from "@/lib/copy";
import { platformStats } from "@/lib/mock-data";
import {
  studentRegistrationsOverTime,
  employerGrowthOverTime,
  studentsByCategory,
  matchSuccessByCategory,
} from "@/lib/extended-data/chart-data";

const p = copy.pages.admin.dashboard;

const CATEGORY_FILL: Record<string, string> = {
  Engineering: "var(--chart-violet)",
  Business: "var(--chart-gold)",
  Language: "var(--chart-cyan)",
  Health: "var(--chart-success)",
  Other: "var(--chart-tick)",
};

const chartGrid = "var(--chart-grid)";
const chartTick = "var(--chart-tick)";
const tooltipStyle = {
  background: "var(--chart-tooltip-background)",
  border: "1px solid var(--chart-tooltip-border)",
  borderRadius: 8,
  color: "var(--chart-tooltip-foreground)",
  fontSize: 12,
};

const demandSupplyData = [
  { category: "Engineering", employerDemand: 42, studentSupply: 34 },
  { category: "Business", employerDemand: 31, studentSupply: 27 },
  { category: "Language", employerDemand: 20, studentSupply: 24 },
  { category: "Health", employerDemand: 13, studentSupply: 15 },
  { category: "Other", employerDemand: 11, studentSupply: 17 },
];

const outcomeFunnelData = [
  { stage: "Viewed", value: 312 },
  { stage: "Shortlisted", value: 146 },
  { stage: "Messaged", value: 84 },
  { stage: "Interview", value: 42 },
  { stage: "Offer potential", value: 18 },
];

const readinessItems = [
  { label: "Employer verification queue reviewed", complete: true },
  { label: "Booth categories configured", complete: true },
  { label: "QR badges generated", complete: true, detail: "Demo badges use mock student IDs." },
  { label: "Student consent preferences confirmed", complete: true },
  { label: "Event schedule published", complete: false },
  { label: "Post-event feedback form ready", complete: false },
];

const recentActivity = [
  "Alibaba Cloud marked reviewed for Spring Career Fair 2026.",
  "12 students completed profile visibility settings.",
  "Engineering category reached 75% booth fill.",
  "QR badge batch generated for checked-in demo students.",
];

export default function AdminDashboardPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <PremiumHeroPanel
        eyebrow={copy.pages.admin.serviceLabel}
        title={p.heading}
        body={p.summary}
        actions={
          <PrototypeNotice
            variant="dark"
            message="June 2026 prototype dataset · Mock students, employers, events, and outcome funnel."
            className="lg:max-w-sm"
          />
        }
      >
        <CompanyMockDisclaimer className="text-xs text-ink-300" />
      </PremiumHeroPanel>

      {/* KPI row */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          {
            icon: Users,
            label: p.studentsLabel,
            value: platformStats.studentsRegistered,
            detail: "Prototype cohort registered in the mock dataset.",
            trend: "+12% this month",
            tone: "violet" as const,
          },
          {
            icon: Building2,
            label: p.employersLabel,
            value: platformStats.employersOnboarded,
            detail: "Includes reviewed and pending demo employer records.",
            trend: "+8 employers reviewed",
            tone: "gold" as const,
          },
          {
            icon: TrendingUp,
            label: p.matchesLabel,
            value: platformStats.successfulMatches,
            detail: "Illustrative outcomes, not verified student results.",
            trend: "38 countries represented",
            tone: "success" as const,
          },
          {
            icon: CalendarCheck,
            label: p.eventsLabel,
            value: platformStats.eventsPerYear * 2,
            detail: "Two event cycles modeled across past and upcoming fairs.",
            trend: "2 per year model",
            tone: "cyan" as const,
          },
        ].map((metric) => (
          <MetricGlowCard key={metric.label} {...metric} />
        ))}
      </div>

      {/* Charts row 1 — registrations + employer growth */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">{p.registrationsTitle}</CardTitle>
            <p className="text-xs text-ink-500">Mock monthly registrations climb before the June 2026 presentation dataset.</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={studentRegistrationsOverTime} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="regGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--chart-violet)" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="var(--chart-violet)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={chartGrid} />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: chartTick }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 11, fill: chartTick }} tickLine={false} axisLine={false} width={36} />
                <Tooltip
                  contentStyle={tooltipStyle}
                  labelStyle={{ fontWeight: 600 }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="var(--chart-violet)"
                  strokeWidth={2}
                  fill="url(#regGrad)"
                  dot={{ r: 3, fill: "var(--chart-violet)" }}
                  name="Students"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">{p.employerGrowthTitle}</CardTitle>
            <p className="text-xs text-ink-500">Employer records grow as the prototype event model adds reviewed demo accounts.</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={employerGrowthOverTime} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="empGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--chart-gold)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--chart-gold)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={chartGrid} />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: chartTick }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 11, fill: chartTick }} tickLine={false} axisLine={false} width={36} />
                <Tooltip
                  contentStyle={tooltipStyle}
                  labelStyle={{ fontWeight: 600 }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="var(--chart-gold)"
                  strokeWidth={2}
                  fill="url(#empGrad)"
                  dot={{ r: 3, fill: "var(--chart-gold)" }}
                  name="Employers"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts row 2 — category breakdown + match success */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">{p.categoryTitle}</CardTitle>
            <p className="text-xs text-ink-500">Engineering and Business create the largest booth planning demand.</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={studentsByCategory} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartGrid} vertical={false} />
                <XAxis dataKey="label" tick={{ fontSize: 11, fill: chartTick }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 11, fill: chartTick }} tickLine={false} axisLine={false} width={36} />
                <Tooltip
                  contentStyle={tooltipStyle}
                  cursor={{ fill: "var(--chart-cursor)" }}
                />
                <Bar dataKey="value" name="Students" radius={[4, 4, 0, 0]}>
                  {studentsByCategory.map((entry) => (
                    <Cell key={entry.label} fill={CATEGORY_FILL[entry.label] ?? "var(--chart-tick)"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">{p.matchSuccessTitle}</CardTitle>
            <p className="text-xs text-ink-500">Illustrative matches generated by the prototype outcome story, not verified placements.</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart
                data={matchSuccessByCategory}
                layout="vertical"
                margin={{ top: 4, right: 8, bottom: 0, left: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={chartGrid} horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: chartTick }} tickLine={false} axisLine={false} />
                <YAxis
                  type="category"
                  dataKey="label"
                  tick={{ fontSize: 11, fill: chartTick }}
                  tickLine={false}
                  axisLine={false}
                  width={58}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  cursor={{ fill: "var(--chart-cursor)" }}
                />
                <Bar dataKey="value" name="Matches" fill="var(--chart-success)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Employer demand vs student supply</CardTitle>
            <p className="text-xs text-ink-500">Career Services can spot category imbalance before booth capacity is finalized.</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={demandSupplyData} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartGrid} vertical={false} />
                <XAxis dataKey="category" tick={{ fontSize: 11, fill: chartTick }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 11, fill: chartTick }} tickLine={false} axisLine={false} width={36} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ color: "var(--chart-tick)", fontSize: 12 }} />
                <Bar dataKey="employerDemand" name="Employer demand" fill="var(--chart-violet)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="studentSupply" name="Student booths" fill="var(--chart-gold)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Outcome funnel</CardTitle>
            <p className="text-xs text-ink-500">Mock funnel showing how profile views become structured follow-up.</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={outcomeFunnelData} layout="vertical" margin={{ top: 4, right: 16, bottom: 0, left: 76 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartGrid} horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: chartTick }} tickLine={false} axisLine={false} />
                <YAxis type="category" dataKey="stage" tick={{ fontSize: 11, fill: chartTick }} tickLine={false} axisLine={false} width={74} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="value" name="Mock students" fill="var(--chart-gold)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <ReadinessChecklist title="Event readiness checklist" items={readinessItems} />

        <div className="grid gap-4 md:grid-cols-2">
          <InsightCard
            icon={AlertTriangle}
            tone="warning"
            label="Capacity"
            title="Business employer demand exceeds booth supply"
            body="Consider moving unfilled Other booths into Business before the next schedule review."
          />
          <InsightCard
            icon={Lightbulb}
            tone="gold"
            label="Student readiness"
            title="Remind students with incomplete portfolios"
            body="Mock readiness data suggests portfolio depth is the strongest presentation signal."
          />
          <InsightCard
            icon={ClipboardCheck}
            tone="success"
            label="Verification"
            title="Review pending employer records"
            body="A production version would need auditable employer approval before event access."
          />
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Recent admin activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {recentActivity.map((activity) => (
                <div key={activity} className="rounded-lg border border-ink-100 bg-ink-50 px-3 py-2 text-xs leading-5 text-ink-600">
                  {activity}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
