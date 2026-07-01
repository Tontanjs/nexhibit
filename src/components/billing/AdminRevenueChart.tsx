"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { formatCny } from "@/lib/billing/utils";

type RevenuePoint = {
  month: string;
  students: number;
  employers: number;
  university: number;
  total: number;
};

type Props = {
  data: RevenuePoint[];
};

export function AdminRevenueChart({ data }: Props) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-[320px] w-full min-w-[680px] rounded-lg bg-ink-50" aria-label="Revenue chart loading" />
    );
  }

  return (
    <div className="h-[320px] w-full min-w-[680px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid stroke="#F1F5F9" />
          <XAxis dataKey="month" tick={{ fill: "#64748B", fontSize: 12 }} tickLine={false} axisLine={false} />
          <YAxis tickFormatter={(value) => `¥${Math.round(Number(value) / 1000)}K`} tick={{ fill: "#64748B", fontSize: 12 }} tickLine={false} axisLine={false} />
          <Tooltip
            formatter={(value) => formatCny(Number(value))}
            contentStyle={{
              borderRadius: 8,
              borderColor: "#E2E8F0",
              color: "#0A0E1A",
            }}
          />
          <Area type="monotone" dataKey="students" stackId="1" stroke="#F5C518" fill="#F5C518" fillOpacity={0.72} />
          <Area type="monotone" dataKey="employers" stackId="1" stroke="#0A0E1A" fill="#0A0E1A" fillOpacity={0.82} />
          <Area type="monotone" dataKey="university" stackId="1" stroke="#94A3B8" fill="#94A3B8" fillOpacity={0.74} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
