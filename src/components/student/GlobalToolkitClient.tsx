"use client";

import { useState } from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const permitCards = [
  {
    country: "Thailand",
    facts: ["Reference only, not legal advice", "Citizenship can simplify local internship paperwork", "Cross-border remote work still needs employer policy review", "Keep passport and enrollment documents current", "Confirm tax and contract rules before accepting paid work"],
  },
  {
    country: "China",
    facts: ["Reference only, not legal advice", "Student visa work rules can vary by program and city", "Internships often require university and employer coordination", "Post-graduation routes require careful timing", "Ask employers to verify current local requirements"],
  },
  {
    country: "Singapore",
    facts: ["Reference only, not legal advice", "Entry-level roles may require employer sponsorship", "Internship eligibility depends on program and institution", "English-first interviews are common for regional teams", "Prepare salary and relocation questions early"],
  },
  {
    country: "Vietnam",
    facts: ["Reference only, not legal advice", "Local citizenship can help with domestic hiring", "China-Vietnam business roles value bilingual context", "Contracts and probation periods should be reviewed carefully", "Remote roles may require separate tax guidance"],
  },
];

const salaryByIndustry = {
  Tech: [
    { city: "Bangkok", low: 28, high: 48 },
    { city: "Shanghai", low: 12, high: 22 },
    { city: "Singapore", low: 4, high: 7 },
    { city: "Hanoi", low: 18, high: 34 },
    { city: "Hangzhou", low: 10, high: 19 },
  ],
  Finance: [
    { city: "Bangkok", low: 30, high: 52 },
    { city: "Shanghai", low: 13, high: 24 },
    { city: "Singapore", low: 4, high: 8 },
    { city: "Hanoi", low: 20, high: 36 },
    { city: "Hangzhou", low: 11, high: 20 },
  ],
  Logistics: [
    { city: "Bangkok", low: 24, high: 40 },
    { city: "Shanghai", low: 9, high: 17 },
    { city: "Singapore", low: 3, high: 6 },
    { city: "Hanoi", low: 16, high: 28 },
    { city: "Hangzhou", low: 8, high: 15 },
  ],
  Marketing: [
    { city: "Bangkok", low: 25, high: 42 },
    { city: "Shanghai", low: 10, high: 18 },
    { city: "Singapore", low: 3, high: 6 },
    { city: "Hanoi", low: 17, high: 30 },
    { city: "Hangzhou", low: 9, high: 16 },
  ],
};

const cultureColumns = [
  {
    title: "Chinese employers",
    points: ["Prepare a clear project walkthrough", "Show practical teamwork examples", "Be ready to discuss availability and paperwork", "Respect structured interview flow", "Follow up with concise written evidence"],
  },
  {
    title: "Thai employers",
    points: ["Use polite, relationship-aware communication", "Explain how you work in teams", "Connect technical work to business outcomes", "Prepare salary expectations carefully", "Keep follow-up warm and specific"],
  },
  {
    title: "Western employers",
    points: ["Use direct evidence and measurable impact", "Practice behavioral story structure", "Ask role-scope questions", "Clarify ownership and decision-making", "Send a concise thank-you note"],
  },
];

export function GlobalToolkitClient() {
  const [industry, setIndustry] = useState<keyof typeof salaryByIndustry>("Tech");
  const salaryData = salaryByIndustry[industry].map((item) => ({ ...item, range: item.high - item.low }));

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-700">Cross-border toolkit</p>
        <h1 className="mt-2 text-3xl font-black text-ink-900">International student moat</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-600">
          Mock reference content for cross-border career decisions. It is not legal, salary, or immigration advice.
        </p>
      </div>

      <Tabs defaultValue="permits" className="rounded-lg border border-ink-200 bg-surface-0 p-4">
        <div>
          <TabsList className="flex-wrap">
            <TabsTrigger value="permits">Work permits</TabsTrigger>
            <TabsTrigger value="salary">Salary insights</TabsTrigger>
            <TabsTrigger value="culture">Interview culture</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="permits">
          <div className="grid gap-4 md:grid-cols-2">
            {permitCards.map((card) => (
              <Card key={card.country}>
                <CardHeader>
                  <CardTitle className="text-sm">{card.country}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-ink-600">
                    {card.facts.map((fact) => <li key={fact}>• {fact}</li>)}
                  </ul>
                  <Badge variant="secondary" className="mt-4">Source link placeholder</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="salary">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {(Object.keys(salaryByIndustry) as Array<keyof typeof salaryByIndustry>).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setIndustry(item)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs font-semibold",
                    industry === item ? "border-gold-500 bg-gold-50 text-ink-900" : "border-ink-200 bg-surface-0 text-ink-600",
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Entry-level monthly salary ranges</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-3 text-xs text-ink-500">All numbers are mock and shown for product demonstration only.</p>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salaryData}>
                      <XAxis dataKey="city" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Bar dataKey="low" stackId="salary" fill="var(--muted)" />
                      <Bar dataKey="range" stackId="salary" fill="var(--accent)" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <table className="sr-only">
                  <tbody>
                    {salaryData.map((row) => <tr key={row.city}><td>{row.city}</td><td>{row.low}</td><td>{row.high}</td></tr>)}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="culture">
          <div className="grid gap-4 lg:grid-cols-3">
            {cultureColumns.map((column) => (
              <Card key={column.title}>
                <CardHeader>
                  <CardTitle className="text-sm">{column.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-ink-600">
                    {column.points.map((point) => <li key={point}>• {point}</li>)}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
