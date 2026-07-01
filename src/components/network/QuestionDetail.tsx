"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { CommunityQuestion, CommunityAnswer } from "@/types/network";

const QA_KEY = "nexhibit_network_qa";
const UPVOTE_KEY = "nexhibit_network_upvotes";

interface Props {
  question: CommunityQuestion;
}

function loadUpvotes(): { questionIds: string[]; answerIds: string[] } {
  try {
    const raw = localStorage.getItem(UPVOTE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { questionIds: [], answerIds: [] };
}

function saveUpvotes(data: { questionIds: string[]; answerIds: string[] }) {
  try {
    localStorage.setItem(UPVOTE_KEY, JSON.stringify(data));
  } catch {}
}

export function QuestionDetail({ question }: Props) {
  const [answers, setAnswers] = useState<CommunityAnswer[]>([...question.answers]);
  const [upvotedAnswers, setUpvotedAnswers] = useState<string[]>([]);
  const [answerBody, setAnswerBody] = useState("");

  useEffect(() => {
    const stored = loadUpvotes();
    setUpvotedAnswers(stored.answerIds);
  }, []);

  const sortedAnswers = [...answers].sort((a, b) => b.upvotes - a.upvotes);

  function handleUpvote(answerId: string) {
    const stored = loadUpvotes();
    if (stored.answerIds.includes(answerId)) return;
    stored.answerIds.push(answerId);
    saveUpvotes(stored);
    setUpvotedAnswers((prev) => [...prev, answerId]);
    setAnswers((prev) =>
      prev.map((a) => (a.id === answerId ? { ...a, upvotes: a.upvotes + 1 } : a))
    );
    toast.success("Upvoted");
  }

  function handleAddAnswer(e: React.FormEvent) {
    e.preventDefault();
    if (!answerBody.trim()) return;

    const newAnswer: CommunityAnswer = {
      id: `ans-local-${Date.now()}`,
      questionId: question.id,
      body: answerBody.trim(),
      authorHandle: "You (anonymous)",
      upvotes: 0,
      postedAt: new Date().toISOString().slice(0, 10),
    };

    try {
      const raw = localStorage.getItem(QA_KEY);
      const stored: { questions: CommunityQuestion[]; answers: CommunityAnswer[] } = raw
        ? JSON.parse(raw)
        : { questions: [], answers: [] };
      if (!stored.answers) stored.answers = [];
      stored.answers.push(newAnswer);
      localStorage.setItem(QA_KEY, JSON.stringify(stored));
    } catch {}

    setAnswers((prev) => [...prev, newAnswer]);
    setAnswerBody("");

    toast.success("Answer posted", {
      description: "Thank you for contributing to the community.",
    });
  }

  return (
    <div>
      {/* Question */}
      <div className="border border-ink-200 rounded-2xl p-6 mb-6">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge variant="secondary">{question.category}</Badge>
          <span className="text-xs text-ink-400">{question.language}</span>
          <span className="text-xs text-ink-400">{question.postedAt}</span>
        </div>
        <h1 className="text-xl font-bold text-ink-900 mb-3">{question.title}</h1>
        <p className="text-sm text-ink-600 leading-relaxed mb-4">{question.body}</p>
        <div className="flex flex-wrap gap-1.5">
          {question.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
          ))}
        </div>
        <p className="text-xs text-ink-400 mt-3">Asked by {question.askerHandle}</p>
      </div>

      {/* Answers */}
      <div className="mb-6">
        <h2 className="text-sm font-semibold text-ink-900 uppercase tracking-wide mb-4">
          {sortedAnswers.length} Answer{sortedAnswers.length !== 1 ? "s" : ""}
        </h2>

        {sortedAnswers.length === 0 ? (
          <p className="py-8 text-center text-sm text-ink-400">No answers yet. Be the first to help.</p>
        ) : (
          <div className="space-y-4">
            {sortedAnswers.map((answer) => {
              const upvoted = upvotedAnswers.includes(answer.id);
              return (
                <div key={answer.id} className="border border-ink-200 rounded-xl p-4">
                  <p className="text-sm text-ink-600 leading-relaxed mb-3">{answer.body}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-ink-400">{answer.authorHandle} &middot; {answer.postedAt}</p>
                    <button
                      type="button"
                      aria-label={`Upvote answer by ${answer.authorHandle}`}
                      onClick={() => handleUpvote(answer.id)}
                      className={`flex items-center gap-1.5 text-xs rounded-full px-2.5 py-1 border transition-colors ${
                        upvoted
                          ? "border-success text-success bg-success/5"
                          : "border-ink-200 text-ink-400 hover:border-ink-400"
                      }`}
                    >
                      <ThumbsUp className="h-3 w-3" />
                      {answer.upvotes}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add answer */}
      <div className="border border-ink-200 rounded-2xl p-6">
        <h2 className="text-sm font-semibold text-ink-900 uppercase tracking-wide mb-4">Your Answer</h2>
        <form onSubmit={handleAddAnswer} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="answer-body" className="sr-only">Write your answer</Label>
            <Textarea
              id="answer-body"
              placeholder="Share what you know — your experience as an international student at ZJUT or in the China job market is valuable."
              value={answerBody}
              onChange={(e) => setAnswerBody(e.target.value)}
              rows={4}
              required
            />
          </div>
          <Button type="submit" disabled={!answerBody.trim()}>
            Post Answer
          </Button>
        </form>
      </div>
    </div>
  );
}
