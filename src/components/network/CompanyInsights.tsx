"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { companyInsights } from "@/lib/mock-data/network";
import { NetworkTrustFooter } from "@/components/network/NetworkTrustFooter";
import { cn } from "@/lib/utils";

const ALL = "All";

const industries = [ALL, ...Array.from(new Set(companyInsights.map((c) => c.industry)))];
const types = [ALL, "Chinese firm", "MNC", "Startup"];

function StarRating({ value }: { value: number }) {
  return (
    <span className="text-gold-500 text-sm">
      {"★".repeat(Math.floor(value))}{"☆".repeat(5 - Math.floor(value))}
    </span>
  );
}

export function CompanyInsightsDirectory() {
  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState(ALL);
  const [type, setType] = useState(ALL);
  const [minFriendliness, setMinFriendliness] = useState(ALL);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return companyInsights.filter((c) => {
      if (industry !== ALL && c.industry !== industry) return false;
      if (type !== ALL && c.type !== type) return false;
      if (minFriendliness !== ALL && c.ratings.internationalFriendliness < parseInt(minFriendliness)) return false;
      if (q) {
        const hay = [c.name, c.industry, c.type, ...c.locations].join(" ").toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [search, industry, type, minFriendliness]);

  return (
    <div className="min-h-screen bg-surface-0">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-700 mb-3">
            Peer Network Hub
          </p>
          <h1 className="text-3xl font-bold text-ink-900 mb-3">Company Insights</h1>
          <p className="text-sm text-ink-600 max-w-xl">
            Alumni-contributed ratings, interview tips, and salary signals for companies hiring international graduates.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
            <Input
              placeholder="Search company name or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
              aria-label="Search companies"
            />
          </div>
          <Select value={industry} onValueChange={setIndustry}>
            <SelectTrigger className="w-full sm:w-52" aria-label="Filter by industry">
              <SelectValue placeholder="Industry" />
            </SelectTrigger>
            <SelectContent>
              {industries.map((i) => (
                <SelectItem key={i} value={i}>{i === ALL ? "All industries" : i}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="w-full sm:w-36" aria-label="Filter by company type">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              {types.map((t) => (
                <SelectItem key={t} value={t}>{t === ALL ? "All types" : t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={minFriendliness} onValueChange={setMinFriendliness}>
            <SelectTrigger className="w-full sm:w-48" aria-label="Filter by international friendliness">
              <SelectValue placeholder="Int. friendliness" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>Any friendliness</SelectItem>
              <SelectItem value="3">3+ stars</SelectItem>
              <SelectItem value="4">4+ stars</SelectItem>
              <SelectItem value="5">5 stars only</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <p className="text-xs text-ink-400 mb-4">{filtered.length} compan{filtered.length !== 1 ? "ies" : "y"} found</p>

        {filtered.length === 0 ? (
          <p className="py-12 text-center text-sm text-ink-400">No companies match your filters.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((company) => (
              <Link key={company.id} href={`/student/network/companies/${company.id}`}>
                <Card className="h-full hover:shadow-md transition-shadow border-ink-200 cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-base font-bold", company.logoColor)}>
                        {company.logoLetter}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-ink-900 truncate">{company.name}</p>
                        <p className="text-xs text-ink-400 truncate">{company.industry}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 mb-3">
                      <Badge variant="outline" className="text-xs">{company.type}</Badge>
                      <span className="flex items-center gap-1 text-xs text-ink-400">
                        <Users className="h-3 w-3" />
                        {company.alumniCount} alumni
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-ink-400">International</span>
                        <StarRating value={company.ratings.internationalFriendliness} />
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-ink-400">Work-life</span>
                        <StarRating value={company.ratings.workLifeBalance} />
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-ink-400">Growth</span>
                        <StarRating value={company.ratings.careerGrowth} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-12">
          <NetworkTrustFooter />
        </div>
      </div>
    </div>
  );
}
