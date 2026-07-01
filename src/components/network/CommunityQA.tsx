"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { MessageSquare, ThumbsUp, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { communityQuestions } from "@/lib/mock-data/network";
import { NetworkTrustFooter } from "@/components/network/NetworkTrustFooter";
import type { CommunityQuestion, QACategory } from "@/types/network";

const STORAGE_KEY = "nexhibit_network_qa";

function loadQA(): { questions: CommunityQuestion[] } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { questions: [] };
}

const categories: (QACategory | "All")[] = [
  "All",
  "Application Process",
  "Interview Prep",
  "Visa & Legal",
  "Cultural Adaptation",
  "Salary Negotiation",
  "General",
];

export function CommunityQAHub() {
  const [activeCategory, setActiveCategory] = useState<QACategory | "All">("All");
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState<QACategory>("General");
  const [language, setLanguage] = useState("English");
  const [localQuestions, setLocalQuestions] = useState<CommunityQuestion[]>([]);

  function handleAskSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    const newQ: CommunityQuestion = {
      id: `qa-local-${Date.now()}`,
      title: title.trim(),
      body: body.trim(),
      askerHandle: "You (anonymous)",
      category,
      language,
      tags: [],
      upvotes: 0,
      postedAt: new Date().toISOString().slice(0, 10),
      answers: [],
    };

    const stored = loadQA();
    stored.questions.push(newQ);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    } catch {}
    setLocalQuestions((prev) => [...prev, newQ]);

    toast.success("Question posted", {
      description: "Your question is now visible to the community.",
    });

    setTitle("");
    setBody("");
    setOpen(false);
  }

  const allQuestions = [...communityQuestions, ...localQuestions];
  const filtered =
    activeCategory === "All"
      ? allQuestions
      : allQuestions.filter((q) => q.category === activeCategory);

  return (
    <div className="min-h-screen bg-surface-0">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-700 mb-3">
              Peer Network Hub
            </p>
            <h1 className="text-3xl font-bold text-ink-900 mb-2">Community Q&amp;A</h1>
            <p className="text-sm text-ink-600">
              Ask and answer questions about careers, visas, and life in China.
            </p>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="shrink-0 flex items-center gap-1.5">
                <Plus className="h-4 w-4" />
                Ask a Question
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Ask the Community</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAskSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="q-title">Question title</Label>
                  <Input
                    id="q-title"
                    placeholder="Summarize your question in one sentence"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="q-body">Details</Label>
                  <Textarea
                    id="q-body"
                    placeholder="Provide context — the more specific, the better answers you will get"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    rows={4}
                    required
                  />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="q-category">Category</Label>
                    <Select value={category} onValueChange={(v) => setCategory(v as QACategory)}>
                      <SelectTrigger id="q-category">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.filter((c) => c !== "All").map((c) => (
                          <SelectItem key={c} value={c}>{c}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="q-language">Language</Label>
                    <Input
                      id="q-language"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      placeholder="English"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button type="button" variant="outline" className="flex-1" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1">Post Question</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors border ${
                activeCategory === cat
                  ? "bg-ink-900 text-surface-0 border-ink-900"
                  : "border-ink-200 text-ink-600 hover:border-ink-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Questions list */}
        {filtered.length === 0 ? (
          <p className="py-12 text-center text-sm text-ink-400">No questions in this category yet. Be the first to ask.</p>
        ) : (
          <div className="space-y-3">
            {filtered.map((q) => (
              <Link key={q.id} href={`/student/network/qa/${q.id}`}>
                <Card className="hover:shadow-md transition-shadow border-ink-200 cursor-pointer">
                  <CardContent className="p-4">
                    <h2 className="font-medium text-sm text-ink-900 mb-1 leading-snug">{q.title}</h2>
                    <p className="text-xs text-ink-400 mb-3 line-clamp-2">{q.body}</p>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="secondary" className="text-xs">{q.category}</Badge>
                      <span className="text-xs text-ink-400">{q.language}</span>
                      <span className="text-xs text-ink-400 ml-auto flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        {q.answers.length}
                        <ThumbsUp className="h-3 w-3 ml-1" />
                        {q.upvotes}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-10">
          <NetworkTrustFooter />
        </div>
      </div>
    </div>
  );
}
