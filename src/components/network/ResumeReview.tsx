"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { reviewQueue as seedQueue } from "@/lib/mock-data/network";
import { NetworkTrustFooter } from "@/components/network/NetworkTrustFooter";
import type {
  ResumeReviewRequest,
  ResumeReviewFeedback,
  ResumeFormat,
  CompanyTarget,
  ReviewFocusArea,
} from "@/types/network";

const STORAGE_KEY = "nexhibit_network_reviews";

function loadStorage(): { requests: ResumeReviewRequest[]; feedback: ResumeReviewFeedback[] } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { requests: [], feedback: [] };
}

function saveStorage(data: { requests: ResumeReviewRequest[]; feedback: ResumeReviewFeedback[] }) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

const focusOptions: ReviewFocusArea[] = ["Content", "Format", "Language", "Cultural fit"];

export function ResumeReviewHub() {
  const [filename, setFilename] = useState("");
  const [format, setFormat] = useState<ResumeFormat>("Western-style");
  const [target, setTarget] = useState<CompanyTarget>("Any");
  const [focusAreas, setFocusAreas] = useState<ReviewFocusArea[]>([]);
  const [localRequests, setLocalRequests] = useState<ResumeReviewRequest[]>([]);

  // Review form state keyed by request id
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [reviewContent, setReviewContent] = useState("");
  const [reviewFormat, setReviewFormat] = useState("");
  const [reviewLanguage, setReviewLanguage] = useState("");
  const [reviewCultural, setReviewCultural] = useState("");
  const [reviewRec, setReviewRec] = useState<"Strong" | "Good" | "Needs work">("Good");

  useEffect(() => {
    const stored = loadStorage();
    setLocalRequests(stored.requests);
  }, []);

  function handleRequestSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!filename.trim()) return;

    const newRequest: ResumeReviewRequest = {
      id: `rr-local-${Date.now()}`,
      filename: filename.trim(),
      format,
      target,
      focusAreas,
      submittedAt: new Date().toISOString().slice(0, 10),
      status: "waiting",
    };

    const stored = loadStorage();
    stored.requests.push(newRequest);
    saveStorage(stored);
    setLocalRequests(stored.requests);

    toast.success("Resume submitted for review", {
      description: "Other students can now see and review your resume.",
    });

    setFilename("");
    setFocusAreas([]);
  }

  function handleFeedbackSubmit(e: React.FormEvent, requestId: string) {
    e.preventDefault();

    const feedback: ResumeReviewFeedback = {
      id: `fb-${Date.now()}`,
      requestId,
      reviewerLabel: "Anonymous peer",
      content: reviewContent,
      format: reviewFormat,
      language: reviewLanguage,
      culturalFit: reviewCultural,
      overallRecommendation: reviewRec,
      submittedAt: new Date().toISOString().slice(0, 10),
    };

    const stored = loadStorage();
    stored.feedback.push(feedback);
    saveStorage(stored);

    toast.success("Feedback submitted", {
      description: "Thank you for helping a fellow student.",
    });

    setExpandedId(null);
    setReviewContent("");
    setReviewFormat("");
    setReviewLanguage("");
    setReviewCultural("");
    setReviewRec("Good");
  }

  const allQueue = [...seedQueue, ...localRequests];

  return (
    <div className="min-h-screen bg-surface-0">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-700 mb-3">
            Peer Network Hub
          </p>
          <h1 className="text-3xl font-bold text-ink-900 mb-3">Peer Resume Review</h1>
          <p className="text-sm text-ink-600">
            Submit your resume for feedback or help a fellow student by reviewing theirs.
          </p>
        </div>

        <Tabs defaultValue="request">
          <TabsList className="mb-6">
            <TabsTrigger value="request">Request Review</TabsTrigger>
            <TabsTrigger value="give">Give Review</TabsTrigger>
          </TabsList>

          {/* Request tab */}
          <TabsContent value="request">
            <Card className="border-ink-200">
              <CardContent className="p-6">
                <form onSubmit={handleRequestSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="filename">Resume filename</Label>
                    <Input
                      id="filename"
                      placeholder="e.g. YourName_Resume_2024.pdf"
                      value={filename}
                      onChange={(e) => setFilename(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="format-select">Resume format</Label>
                      <Select value={format} onValueChange={(v) => setFormat(v as ResumeFormat)}>
                        <SelectTrigger id="format-select">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Chinese-style">Chinese-style</SelectItem>
                          <SelectItem value="Western-style">Western-style</SelectItem>
                          <SelectItem value="Asian-style">Asian-style</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="target-select">Target company type</Label>
                      <Select value={target} onValueChange={(v) => setTarget(v as CompanyTarget)}>
                        <SelectTrigger id="target-select">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Any">Any</SelectItem>
                          <SelectItem value="Chinese firm">Chinese firm</SelectItem>
                          <SelectItem value="MNC">MNC</SelectItem>
                          <SelectItem value="Startup">Startup</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Focus areas (select all that apply)</Label>
                    <div className="flex flex-wrap gap-3">
                      {focusOptions.map((area) => (
                        <label key={area} className="flex items-center gap-2 cursor-pointer">
                          <Checkbox
                            checked={focusAreas.includes(area)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setFocusAreas((prev) => [...prev, area]);
                              } else {
                                setFocusAreas((prev) => prev.filter((a) => a !== area));
                              }
                            }}
                          />
                          <span className="text-sm text-ink-600">{area}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <Button type="submit" className="w-full">Submit for Review</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Give review tab */}
          <TabsContent value="give">
            {allQueue.length === 0 ? (
              <p className="py-12 text-center text-sm text-ink-400">No resumes waiting for review right now.</p>
            ) : (
              <div className="space-y-4">
                {allQueue.map((req) => (
                  <Card key={req.id} className="border-ink-200">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div>
                          <p className="font-medium text-sm text-ink-900">{req.filename}</p>
                          <p className="text-xs text-ink-400 mt-0.5">Submitted {req.submittedAt}</p>
                        </div>
                        <Badge variant={req.status === "reviewed" ? "success" : "secondary"}>
                          {req.status === "reviewed" ? "Reviewed" : "Waiting"}
                        </Badge>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-3">
                        <Badge variant="outline" className="text-xs">{req.format}</Badge>
                        <Badge variant="outline" className="text-xs">{req.target}</Badge>
                        {req.focusAreas.map((area) => (
                          <Badge key={area} variant="secondary" className="text-xs">{area}</Badge>
                        ))}
                      </div>

                      {expandedId === req.id ? (
                        <form onSubmit={(e) => handleFeedbackSubmit(e, req.id)} className="space-y-3 mt-4 border-t border-ink-200 pt-4">
                          <div className="space-y-1.5">
                            <Label htmlFor={`content-${req.id}`}>Content feedback</Label>
                            <Textarea
                              id={`content-${req.id}`}
                              placeholder="Thoughts on the content — achievements, relevance, clarity..."
                              value={reviewContent}
                              onChange={(e) => setReviewContent(e.target.value)}
                              rows={2}
                            />
                          </div>
                          <div className="space-y-1.5">
                            <Label htmlFor={`fmt-${req.id}`}>Format feedback</Label>
                            <Textarea
                              id={`fmt-${req.id}`}
                              placeholder="Layout, readability, length..."
                              value={reviewFormat}
                              onChange={(e) => setReviewFormat(e.target.value)}
                              rows={2}
                            />
                          </div>
                          <div className="space-y-1.5">
                            <Label htmlFor={`lang-${req.id}`}>Language feedback</Label>
                            <Textarea
                              id={`lang-${req.id}`}
                              placeholder="Grammar, word choice, tone..."
                              value={reviewLanguage}
                              onChange={(e) => setReviewLanguage(e.target.value)}
                              rows={2}
                            />
                          </div>
                          <div className="space-y-1.5">
                            <Label htmlFor={`cultural-${req.id}`}>Cultural fit feedback</Label>
                            <Textarea
                              id={`cultural-${req.id}`}
                              placeholder="How well does this fit the target company culture?"
                              value={reviewCultural}
                              onChange={(e) => setReviewCultural(e.target.value)}
                              rows={2}
                            />
                          </div>
                          <div className="space-y-1.5">
                            <Label htmlFor={`rec-${req.id}`}>Overall recommendation</Label>
                            <Select value={reviewRec} onValueChange={(v) => setReviewRec(v as "Strong" | "Good" | "Needs work")}>
                              <SelectTrigger id={`rec-${req.id}`}>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Strong">Strong</SelectItem>
                                <SelectItem value="Good">Good</SelectItem>
                                <SelectItem value="Needs work">Needs work</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex gap-2">
                            <Button type="button" variant="outline" size="sm" onClick={() => setExpandedId(null)}>
                              Cancel
                            </Button>
                            <Button type="submit" size="sm">Submit Feedback</Button>
                          </div>
                        </form>
                      ) : (
                        req.status === "waiting" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setExpandedId(req.id)}
                          >
                            Write Review
                          </Button>
                        )
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="mt-10">
          <NetworkTrustFooter />
        </div>
      </div>
    </div>
  );
}
