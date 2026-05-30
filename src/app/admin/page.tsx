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
} from "recharts";
import { Users, Building2, TrendingUp, CalendarCheck } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { copy } from "@/lib/copy";
import { platformStats } from "@/lib/mock-data";
import {
  studentRegistrationsOverTime,
  employerGrowthOverTime,
  studentsByCategory,
  matchSuccessByCategory,
} from "@/lib/extended-data/chart-data";
import { cn } from "@/lib/utils";

const p = copy.pages.admin.dashboard;

const CATEGORY_FILL: Record<string, string> = {
  Engineering: "#7C3AED",
  Business: "#3B82F6",
  Language: "#F59E0B",
  Health: "#10B981",
  Other: "#EC4899",
};

export default function AdminDashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      <h1 className="text-xl font-bold text-ink-900">{p.heading}</h1>

      {/* KPI row */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          {
            icon: Users,
            label: p.studentsLabel,
            value: platformStats.studentsRegistered,
            color: "text-ink-700",
          },
          {
            icon: Building2,
            label: p.employersLabel,
            value: platformStats.employersOnboarded,
            color: "text-ink-700",
          },
          {
            icon: TrendingUp,
            label: p.matchesLabel,
            value: platformStats.successfulMatches,
            color: "text-success",
          },
          {
            icon: CalendarCheck,
            label: p.eventsLabel,
            value: platformStats.eventsPerYear * 2,
            color: "text-gold-600",
          },
        ].map(({ icon: Icon, label, value, color }) => (
          <Card key={label}>
            <CardContent className="pt-5">
              <Icon className={cn("size-5 mb-2", color)} />
              <p className="text-2xl font-bold text-ink-900">{value.toLocaleString()}</p>
              <p className="text-xs text-ink-500">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts row 1 — registrations + employer growth */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">{p.registrationsTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={studentRegistrationsOverTime} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="regGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0A0E1A" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#0A0E1A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#94A3B8" }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} tickLine={false} axisLine={false} width={36} />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #E2E8F0" }}
                  labelStyle={{ fontWeight: 600 }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#0A0E1A"
                  strokeWidth={2}
                  fill="url(#regGrad)"
                  dot={{ r: 3, fill: "#0A0E1A" }}
                  name="Students"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">{p.employerGrowthTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={employerGrowthOverTime} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="empGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F5C518" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#F5C518" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#94A3B8" }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} tickLine={false} axisLine={false} width={36} />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #E2E8F0" }}
                  labelStyle={{ fontWeight: 600 }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#F5C518"
                  strokeWidth={2}
                  fill="url(#empGrad)"
                  dot={{ r: 3, fill: "#D4A613" }}
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
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={studentsByCategory} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#94A3B8" }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} tickLine={false} axisLine={false} width={36} />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #E2E8F0" }}
                  cursor={{ fill: "#F8FAFC" }}
                />
                <Bar dataKey="value" name="Students" radius={[4, 4, 0, 0]}>
                  {studentsByCategory.map((entry) => (
                    <Cell key={entry.label} fill={CATEGORY_FILL[entry.label] ?? "#94A3B8"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">{p.matchSuccessTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart
                data={matchSuccessByCategory}
                layout="vertical"
                margin={{ top: 4, right: 8, bottom: 0, left: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: "#94A3B8" }} tickLine={false} axisLine={false} />
                <YAxis
                  type="category"
                  dataKey="label"
                  tick={{ fontSize: 11, fill: "#64748B" }}
                  tickLine={false}
                  axisLine={false}
                  width={58}
                />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #E2E8F0" }}
                  cursor={{ fill: "#F8FAFC" }}
                />
                <Bar dataKey="value" name="Matches" fill="#10B981" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
