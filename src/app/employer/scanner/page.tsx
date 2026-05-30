"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, RefreshCw, Bookmark, BookmarkCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScannerOverlay } from "@/components/icons";
import { StudentAvatar } from "@/components/brand/StudentAvatar";
import { VerifiedBadge } from "@/components/brand/VerifiedBadge";
import { copy } from "@/lib/copy";
import { currentEmployer } from "@/lib/current-employer";
import { students } from "@/lib/mock-data";
import { calculateMatchScore, getMatchTier } from "@/lib/utils-lib/matching";
import { getCategoryColors } from "@/lib/utils-lib/colors";
import { cn } from "@/lib/utils";
import type { Student } from "@/lib/mock-data/types";

const p = copy.pages.employer.scanner;

const SEEDED_SHORTLIST = new Set(["stu-001", "stu-003", "stu-006"]);

export default function ScannerPage() {
  const [manualId, setManualId] = useState("");
  const [scanned, setScanned] = useState<Student | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [shortlisted, setShortlisted] = useState<Set<string>>(SEEDED_SHORTLIST);

  function lookup(idToFind: string) {
    const found = students.find(
      (s) => s.id === idToFind.trim() || s.name.toLowerCase().includes(idToFind.trim().toLowerCase()),
    );
    if (found) {
      setScanned(found);
      setNotFound(false);
    } else {
      setScanned(null);
      setNotFound(true);
    }
  }

  function reset() {
    setScanned(null);
    setNotFound(false);
    setManualId("");
  }

  const score = scanned
    ? calculateMatchScore({
        studentCategory: scanned.category,
        studentSkills: [...scanned.skills],
        studentEnglishLevel: scanned.englishLevel,
        studentHSK: scanned.hsk,
        employerHiringCategories: [...currentEmployer.hiringCategories],
        employerHiringSkills: [...currentEmployer.hiringSkills],
        studentId: scanned.id,
        employerId: currentEmployer.id,
      }).score
    : 0;

  const tier = scanned ? getMatchTier(score) : null;
  const catColors = scanned ? getCategoryColors(scanned.category) : null;
  const tierColor =
    tier === "Strong" ? "text-success" : tier === "Good" ? "text-warning" : "text-ink-400";

  return (
    <div className="mx-auto max-w-xl px-4 py-8 sm:px-6">
      <div className="mb-6 text-center">
        <h1 className="text-xl font-bold text-ink-900">{p.heading}</h1>
        <p className="mt-1 text-sm text-ink-500">{p.subheading}</p>
      </div>

      {!scanned ? (
        <>
          {/* Scanner visual */}
          <div className="flex justify-center mb-6">
            <ScannerOverlay
              scanning={true}
              instruction={copy.accessibility.scanQr}
              width={280}
              height={280}
            />
          </div>

          {/* Manual lookup */}
          <div className="rounded-xl border border-ink-200 bg-surface-0 p-5">
            <p className="mb-3 text-center text-xs font-medium text-ink-500">{p.orEnterManually}</p>
            <div className="flex gap-2">
              <Input
                value={manualId}
                onChange={(e) => setManualId(e.target.value)}
                placeholder={p.studentIdPlaceholder}
                onKeyDown={(e) => {
                  if (e.key === "Enter") lookup(manualId);
                }}
              />
              <Button
                variant="primary"
                size="sm"
                disabled={!manualId.trim()}
                onClick={() => lookup(manualId)}
              >
                <Search className="size-4" />
                {p.lookupButton}
              </Button>
            </div>
            {notFound && (
              <p className="mt-2 text-center text-xs text-error">{p.notFound}</p>
            )}
          </div>

          {/* Quick-tap sample IDs for demo */}
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {students.slice(0, 4).map((s) => (
              <button
                key={s.id}
                onClick={() => lookup(s.id)}
                className="rounded-full bg-ink-100 px-3 py-1 text-xs font-medium text-ink-600 hover:bg-ink-200"
              >
                {s.id}
              </button>
            ))}
          </div>
        </>
      ) : (
        <Card>
          <CardContent className="pt-5 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">{p.scannedHeading}</p>

            {/* Student info */}
            <div className="flex items-center gap-4">
              <StudentAvatar student={scanned} className="size-14" />
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-lg font-bold text-ink-900">{scanned.name}</p>
                  <VerifiedBadge />
                </div>
                <p className="text-sm text-ink-500">{scanned.headline}</p>
                <p className="text-xs text-ink-400">
                  {scanned.nationalityFlag} {scanned.nationality} · Year {scanned.year} · {scanned.major}
                </p>
              </div>
            </div>

            {/* Match score */}
            <div className="flex items-center gap-3 rounded-lg bg-ink-50 px-4 py-3">
              <div>
                <p className="text-[11px] text-ink-400">{copy.pages.employer.studentDetail.matchScore}</p>
                <p className={cn("text-2xl font-black", tierColor)}>{score}%</p>
              </div>
              <div className="flex-1">
                <Badge
                  variant={tier === "Strong" ? "success" : tier === "Good" ? "gold" : "secondary"}
                  className="text-xs"
                >
                  {tier} match
                </Badge>
                {catColors && (
                  <span className={cn("ml-2 rounded px-1.5 py-0.5 text-[10px] font-medium", catColors.bg, catColors.text)}>
                    {scanned.category}
                  </span>
                )}
              </div>
            </div>

            {/* Skills preview */}
            <div className="flex flex-wrap gap-1">
              {scanned.skills.slice(0, 4).map((skill) => (
                <span key={skill} className="rounded-full bg-ink-100 px-2 py-0.5 text-[10px] font-medium text-ink-600">
                  {skill}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button variant="primary" size="sm" className="flex-1" asChild>
                <Link href={`/employer/student/${scanned.id}`}>{p.viewProfile}</Link>
              </Button>
              <Button
                variant={shortlisted.has(scanned.id) ? "secondary" : "outline"}
                size="sm"
                className="flex-1"
                onClick={() => {
                  setShortlisted((prev) => {
                    const next = new Set(prev);
                    if (next.has(scanned.id)) next.delete(scanned.id);
                    else next.add(scanned.id);
                    return next;
                  });
                }}
              >
                {shortlisted.has(scanned.id) ? (
                  <BookmarkCheck className="mr-1.5 size-3.5 text-gold-500" />
                ) : (
                  <Bookmark className="mr-1.5 size-3.5" />
                )}
                {shortlisted.has(scanned.id) ? copy.pages.employer.browse.shortlisted : p.shortlist}
              </Button>
            </div>

            <Button variant="ghost" size="sm" className="w-full" onClick={reset}>
              <RefreshCw className="mr-1.5 size-3.5" />
              {p.scanAnother}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
