"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, MapPin } from "lucide-react";
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
import { networkMentors } from "@/lib/mock-data/network";
import { NetworkTrustFooter } from "@/components/network/NetworkTrustFooter";
import type { MentorAvailability } from "@/types/network";

const ALL = "All";

const industries = [ALL, ...Array.from(new Set(networkMentors.map((m) => m.industry)))];
const companyTypes = [ALL, "Chinese firm", "MNC", "Startup"];
const availabilities: (MentorAvailability | typeof ALL)[] = [ALL, "Available", "Limited", "Busy"];

function availabilityVariant(a: MentorAvailability) {
  if (a === "Available") return "success" as const;
  if (a === "Limited") return "secondary" as const;
  return "destructive" as const;
}

export function MentorDirectory() {
  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState(ALL);
  const [companyType, setCompanyType] = useState(ALL);
  const [availability, setAvailability] = useState<MentorAvailability | typeof ALL>(ALL);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return networkMentors.filter((m) => {
      if (industry !== ALL && m.industry !== industry) return false;
      if (companyType !== ALL && m.companyType !== companyType) return false;
      if (availability !== ALL && m.availability !== availability) return false;
      if (q) {
        const hay = [m.firstName, m.currentCompany, m.currentPosition, m.location, ...m.languages, ...m.specialties]
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [search, industry, companyType, availability]);

  return (
    <div className="min-h-screen bg-surface-0">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-700 mb-3">
            Peer Network Hub
          </p>
          <h1 className="text-3xl font-bold text-ink-900 mb-3">Alumni Mentors</h1>
          <p className="text-sm text-ink-600 max-w-xl">
            Connect with ZJUT graduates working across China and beyond. Filter by industry, company type, and availability.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
            <Input
              placeholder="Search name, company, language..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
              aria-label="Search mentors"
            />
          </div>
          <Select value={industry} onValueChange={setIndustry}>
            <SelectTrigger className="w-full sm:w-44" aria-label="Filter by industry">
              <SelectValue placeholder="Industry" />
            </SelectTrigger>
            <SelectContent>
              {industries.map((i) => (
                <SelectItem key={i} value={i}>{i === ALL ? "All industries" : i}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={companyType} onValueChange={setCompanyType}>
            <SelectTrigger className="w-full sm:w-40" aria-label="Filter by company type">
              <SelectValue placeholder="Company type" />
            </SelectTrigger>
            <SelectContent>
              {companyTypes.map((t) => (
                <SelectItem key={t} value={t}>{t === ALL ? "All types" : t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={availability} onValueChange={(v) => setAvailability(v as MentorAvailability | typeof ALL)}>
            <SelectTrigger className="w-full sm:w-36" aria-label="Filter by availability">
              <SelectValue placeholder="Availability" />
            </SelectTrigger>
            <SelectContent>
              {availabilities.map((a) => (
                <SelectItem key={a} value={a}>{a === ALL ? "Any status" : a}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Results count */}
        <p className="text-xs text-ink-400 mb-4">{filtered.length} mentor{filtered.length !== 1 ? "s" : ""} found</p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <p className="py-12 text-center text-sm text-ink-400">No mentors match your filters. Try broadening your search.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((mentor) => (
              <Link key={mentor.id} href={`/student/network/mentors/${mentor.id}`}>
                <Card className="h-full hover:shadow-md transition-shadow border-ink-200 cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink-900 text-surface-0 text-sm font-bold">
                        {mentor.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="font-semibold text-sm text-ink-900 truncate">{mentor.firstName}</span>
                          <span aria-label={mentor.nationality}>{mentor.nationalityFlag}</span>
                        </div>
                        <p className="text-xs text-ink-600 truncate">{mentor.currentPosition}</p>
                        <p className="text-xs text-ink-400 truncate">{mentor.currentCompany}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-ink-400 mb-3">
                      <MapPin className="h-3 w-3 shrink-0" />
                      <span className="truncate">{mentor.location}</span>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {mentor.languages.slice(0, 2).map((lang) => (
                        <Badge key={lang} variant="outline" className="text-xs">{lang}</Badge>
                      ))}
                      {mentor.languages.length > 2 && (
                        <Badge variant="outline" className="text-xs">+{mentor.languages.length - 2}</Badge>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {mentor.specialties.slice(0, 2).map((s) => (
                        <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
                      ))}
                    </div>

                    <Badge variant={availabilityVariant(mentor.availability)}>{mentor.availability}</Badge>
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
