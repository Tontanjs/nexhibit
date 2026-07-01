"use client";

import * as React from "react";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function UniversityDemoForm() {
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    await fetch("/api/contact", { method: "POST", body: new FormData(event.currentTarget) });
    setLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-lg border border-success/20 bg-success/10 p-6 text-center">
        <CheckCircle2 className="mx-auto size-10 text-success" aria-hidden="true" />
        <p className="mt-3 font-bold text-ink-900">Demo request received.</p>
        <p className="mt-1 text-sm text-ink-500">This is a mock endpoint. No email was sent.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-4 rounded-lg border border-ink-200 bg-surface-0 p-6 shadow-sm">
      <div>
        <Label htmlFor="university-name">University</Label>
        <Input id="university-name" name="university" placeholder="Zhejiang University of Technology" required />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="contact-name">Contact name</Label>
          <Input id="contact-name" name="name" placeholder="Career Services lead" required />
        </div>
        <div>
          <Label htmlFor="contact-email">Email</Label>
          <Input id="contact-email" name="email" type="email" placeholder="career@example.edu" required />
        </div>
      </div>
      <div>
        <Label htmlFor="demo-notes">Program goals</Label>
        <Textarea id="demo-notes" name="notes" placeholder="Tell us about your international student career program." />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Schedule a demo"}
      </Button>
    </form>
  );
}
