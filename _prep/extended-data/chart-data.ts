import type { ChartDataPoint, TimeSeriesPoint } from "./types";

export const studentRegistrationsOverTime: TimeSeriesPoint[] = [
  { date: "Jan 2026", value: 128 },
  { date: "Feb 2026", value: 214 },
  { date: "Mar 2026", value: 319 },
  { date: "Apr 2026", value: 421 },
  { date: "May 2026", value: 487 },
];

export const employerGrowthOverTime: TimeSeriesPoint[] = [
  { date: "Jan 2026", value: 15 },
  { date: "Feb 2026", value: 24 },
  { date: "Mar 2026", value: 37 },
  { date: "Apr 2026", value: 52 },
  { date: "May 2026", value: 64 },
];

export const studentsByCategory: ChartDataPoint[] = [
  { label: "Engineering", value: 168 },
  { label: "Business", value: 124 },
  { label: "Language", value: 82 },
  { label: "Health", value: 61 },
  { label: "Other", value: 52 },
];

export const studentsByNationality: ChartDataPoint[] = [
  { label: "Vietnam", value: 54 },
  { label: "Thailand", value: 47 },
  { label: "Pakistan", value: 42 },
  { label: "Indonesia", value: 40 },
  { label: "Kazakhstan", value: 36 },
  { label: "Nigeria", value: 31 },
  { label: "India", value: 30 },
  { label: "Egypt", value: 28 },
  { label: "Russia", value: 26 },
  { label: "Ethiopia", value: 22 },
  { label: "Other", value: 131 },
];

export const matchSuccessByCategory: ChartDataPoint[] = [
  { label: "Engineering", value: 42 },
  { label: "Business", value: 36 },
  { label: "Language", value: 33 },
  { label: "Health", value: 28 },
  { label: "Other", value: 24 },
];

export const eventMetrics = {
  spring2026Past: {
    registrations: 312,
    actualAttendance: 287,
    matchesGenerated: 38,
    avgSatisfaction: 4.6,
    employersParticipated: 42,
  },
  fall2025: {
    registrations: 256,
    actualAttendance: 234,
    matchesGenerated: 31,
    avgSatisfaction: 4.4,
    employersParticipated: 36,
  },
};
