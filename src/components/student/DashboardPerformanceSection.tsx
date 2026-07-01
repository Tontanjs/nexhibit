"use client";

import Link from "next/link";
import { ArrowRight, BarChart3, Eye, Search, Target, TrendingUp } from "lucide-react";
import { Line, LineChart, ResponsiveContainer } from "recharts";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useStudentDashboardStore } from "@/stores/student-dashboard-store";

const sparklineData = [12, 16, 11, 21, 28, 24, 34].map((value, index) => ({ day: index, value }));
const funnel = [
  { stage: "Views", value: 184 },
  { stage: "Saves", value: 47 },
  { stage: "Contacts", value: 18 },
  { stage: "Meetings", value: 8 },
  { stage: "Offers", value: 2 },
];

const heatDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function heatValue(day: number, hour: number) {
  return ((day + 2) * (hour + 3)) % 14;
}

export function DashboardPerformanceSection() {
  const { variantA, variantB, ctrA, ctrB, setVariantA, setVariantB } = useStudentDashboardStore();
  const max = funnel[0].value;

  return (
    <section className="space-y-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-700">Performance</p>
          <h2 className="mt-1 text-xl font-black text-ink-900">Profile analytics upgrade</h2>
        </div>
        <Button variant="outline" asChild>
          <Link href="/student/global">
            Cross-border toolkit
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Eye} label="Profile views this week" value="34" detail="7-day sparkline">
          <ResponsiveContainer width="100%" height={42}>
            <LineChart data={sparklineData}>
              <Line type="monotone" dataKey="value" stroke="var(--accent)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </StatCard>
        <StatCard icon={Search} label="Search appearances" value="112" detail="+18% vs last week" />
        <StatCard icon={Target} label="Skill-match score" value="86%" detail="Based on mock employer demand">
          <div className="mt-3 h-2 rounded-full bg-ink-100"><div className="h-full w-[86%] rounded-full bg-gold-500" /></div>
        </StatCard>
        <StatCard icon={TrendingUp} label="Funnel score" value="74" detail="0–100 composite" />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Funnel chart</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {funnel.map((row, index) => {
              const next = funnel[index + 1];
              const conversion = next ? Math.round((next.value / row.value) * 100) : null;
              return (
                <div key={row.stage}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="font-semibold text-ink-700">{row.stage}</span>
                    <span className="tabular-nums text-ink-500">{row.value}{conversion ? ` · ${conversion}% to next` : ""}</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-ink-100">
                    <div className="h-full rounded-full bg-gold-500" style={{ width: `${(row.value / max) * 100}%` }} />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Headline A/B test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid gap-1.5">
              <label className="text-xs font-semibold text-ink-500" htmlFor="headline-a">Variant A</label>
              <Input id="headline-a" value={variantA} onChange={(event) => setVariantA(event.target.value)} />
              <p className="text-xs font-semibold tabular-nums text-ink-500">Mock CTR {ctrA.toFixed(1)}%</p>
            </div>
            <div className="grid gap-1.5">
              <label className="text-xs font-semibold text-ink-500" htmlFor="headline-b">Variant B</label>
              <Input id="headline-b" value={variantB} onChange={(event) => setVariantB(event.target.value)} />
              <p className="text-xs font-semibold tabular-nums text-ink-500">Mock CTR {ctrB.toFixed(1)}%</p>
            </div>
            <Button
              type="button"
              variant="primary"
              className="w-full"
              onClick={() => {
                const winner = ctrA >= ctrB ? "Variant A" : "Variant B";
                toast.success(`${winner} promoted for this prototype session.`);
              }}
            >
              Promote winner
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <BarChart3 className="size-4 text-gold-600" aria-hidden="true" />
            Engagement heatmap
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="grid min-w-[760px] grid-cols-[48px_repeat(24,1fr)] gap-1">
              <span />
              {Array.from({ length: 24 }, (_, hour) => <span key={hour} className="text-center text-[10px] tabular-nums text-ink-400">{hour}</span>)}
              {heatDays.map((day, dayIndex) => (
                <div key={day} className="contents">
                  <span className="pr-2 text-xs font-semibold text-ink-500">{day}</span>
                  {Array.from({ length: 24 }, (_, hour) => {
                    const views = heatValue(dayIndex, hour);
                    return (
                      <span
                        key={`${day}-${hour}`}
                        title={`${day} ${hour}:00 — ${views} views`}
                        className="h-5 rounded-sm bg-gold-500"
                        style={{ opacity: 0.12 + views / 18 }}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-gold-200 bg-gold-50/70">
        <CardContent className="flex flex-col gap-4 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-700">Cross-border toolkit</p>
            <h3 className="mt-1 text-base font-semibold text-ink-900">Work permits, salary ranges, and interview culture</h3>
            <p className="mt-1 text-sm text-ink-600">Mock reference content for international student career planning.</p>
          </div>
          <Button variant="primary" asChild>
            <Link href="/student/global">
              Open toolkit
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  detail,
  children,
}: {
  icon: typeof Eye;
  label: string;
  value: string;
  detail: string;
  children?: React.ReactNode;
}) {
  return (
    <Card>
      <CardContent className="pt-5">
        <Icon className="mb-3 size-5 text-gold-700" aria-hidden="true" />
        <p className="text-3xl font-black tabular-nums text-ink-900">{value}</p>
        <p className="text-xs font-semibold text-ink-500">{label}</p>
        <p className="mt-1 text-xs text-ink-400">{detail}</p>
        {children}
      </CardContent>
    </Card>
  );
}
