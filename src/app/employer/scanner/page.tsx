"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Bookmark,
  BookmarkCheck,
  CalendarClock,
  CheckCircle2,
  MessageSquare,
  RefreshCw,
  Search,
  StickyNote,
  UserPlus,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScannerOverlay } from "@/components/icons";
import { StudentAvatar } from "@/components/brand/StudentAvatar";
import { VerifiedBadge } from "@/components/brand/VerifiedBadge";
import { copy } from "@/lib/copy";
import { currentEmployer } from "@/lib/current-employer";
import { boothReadiness, getCandidateSignal, scannerQueue } from "@/lib/employer-workspace";
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
  const [scanState, setScanState] = useState<"ready" | "scanning" | "found" | "not-found">("ready");
  const [note, setNote] = useState("");
  const [shortlisted, setShortlisted] = useState<Set<string>>(SEEDED_SHORTLIST);

  function lookup(idToFind: string) {
    setScanState("scanning");
    const found = students.find(
      (s) => s.id === idToFind.trim() || s.name.toLowerCase().includes(idToFind.trim().toLowerCase()),
    );
    if (found) {
      setScanned(found);
      setNotFound(false);
      setScanState("found");
      toast.success(`${found.name} scanned successfully.`);
    } else {
      setScanned(null);
      setNotFound(true);
      setScanState("not-found");
    }
  }

  function reset() {
    setScanned(null);
    setNotFound(false);
    setManualId("");
    setScanState("ready");
    setNote("");
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
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 overflow-hidden rounded-xl border border-ink-900 bg-ink-900 p-5 text-surface-0 shadow-2xl shadow-ink-900/10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">
              <span className="size-2 rounded-full bg-success" />
              Recruiter checked in
            </div>
            <h1 className="text-2xl font-bold text-surface-0">{p.heading}</h1>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-ink-300">{p.subheading}</p>
          </div>
          <div className="grid gap-2 text-sm sm:grid-cols-2 lg:w-[420px]">
            {[
              ["Event", boothReadiness.eventName],
              ["Booth", boothReadiness.boothNumber],
              ["Slot", boothReadiness.currentSlot],
              ["QR status", boothReadiness.qrStatus],
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg border border-surface-0/10 bg-surface-0/5 px-3 py-2">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink-400">{label}</p>
                <p className="mt-1 font-semibold text-surface-0">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div>
        {!scanned ? (
          <>
            <Card className="overflow-hidden">
              <CardContent className="pt-5">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-400">
                      Scanner state
                    </p>
                    <h2 className="mt-1 text-base font-semibold text-ink-900">
                      {scanState === "not-found" ? "Student not found" : scanState === "scanning" ? "Scanning badge" : "Ready to scan"}
                    </h2>
                  </div>
                  <Badge variant={scanState === "not-found" ? "destructive" : "gold"}>
                    {scanState}
                  </Badge>
                </div>
                <div className="flex justify-center">
                  <ScannerOverlay
                    scanning={scanState !== "not-found"}
                    instruction={copy.accessibility.scanQr}
                    width={280}
                    height={280}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Manual lookup */}
            <div className="mt-5 rounded-xl border border-ink-200 bg-surface-0 p-5">
              <p className="mb-3 text-center text-xs font-medium text-ink-500">{p.orEnterManually}</p>
              <div className="flex flex-col gap-2 sm:flex-row">
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
              {students.slice(0, 6).map((s) => (
                <button
                  key={s.id}
                  onClick={() => lookup(s.id)}
                  className="rounded-full bg-ink-100 px-3 py-1 text-xs font-medium text-ink-600 transition hover:bg-ink-200"
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

            <div className="rounded-lg border border-gold-200 bg-gold-50/70 p-3">
              <p className="text-xs font-semibold text-gold-700">Recruiter signal</p>
              <p className="mt-1 text-sm leading-5 text-ink-700">{getCandidateSignal(scanned.id).note}</p>
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
            <div className="grid gap-2 sm:grid-cols-2">
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
              <Button variant="outline" size="sm" onClick={() => toast.success("Follow-up message queued.")}>
                <MessageSquare className="mr-1.5 size-3.5" />
                Send follow-up
              </Button>
              <Button variant="outline" size="sm" onClick={() => toast.success("Interview invitation prepared.")}>
                <UserPlus className="mr-1.5 size-3.5" />
                Invite interview
              </Button>
            </div>

            <div className="rounded-lg border border-ink-200 p-3">
              <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-ink-700">
                <StickyNote className="size-3.5" aria-hidden="true" />
                Quick recruiter note
              </div>
              <Textarea
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="Record a short booth impression for the team..."
                className="min-h-24"
              />
              <Button
                variant="outline"
                size="sm"
                className="mt-2 w-full"
                disabled={!note.trim()}
                onClick={() => {
                  toast.success("Booth note saved locally for this demo.");
                  setNote("");
                }}
              >
                Save note
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

        <aside className="space-y-4">
          <Card>
            <CardContent className="pt-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-400">Booth queue</p>
                  <h2 className="mt-1 text-base font-semibold text-ink-900">Live event flow</h2>
                </div>
                <CalendarClock className="size-5 text-gold-600" aria-hidden="true" />
              </div>
              <div className="space-y-2">
                {scannerQueue.map((item) => {
                  const student = students.find((entry) => entry.id === item.studentId);
                  if (!student) return null;
                  return (
                    <div key={item.id} className="flex items-center justify-between gap-3 rounded-lg border border-ink-200 p-3">
                      <div className="flex items-center gap-2">
                        <StudentAvatar student={student} className="size-8" />
                        <div>
                          <p className="text-sm font-semibold text-ink-900">{student.name}</p>
                          <p className="text-xs text-ink-400">{item.time}</p>
                        </div>
                      </div>
                      <Badge
                        variant={
                          item.status === "Checked in" || item.status === "Completed"
                            ? "success"
                            : item.status === "No-show"
                              ? "destructive"
                              : "gold"
                        }
                        className="text-[10px]"
                      >
                        {item.status}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-5">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink-900">
                <CheckCircle2 className="size-4 text-success" aria-hidden="true" />
                Scanner states covered
              </div>
              <div className="flex flex-wrap gap-1.5">
                {["ready", "scanning", "student found", "not found", "already scanned", "no camera permission"].map((state) => (
                  <Badge key={state} variant="outline" className="text-[10px]">
                    {state}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
