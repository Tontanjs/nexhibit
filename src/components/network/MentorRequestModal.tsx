"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { AlumniMentor, MentorshipRequest, SessionFormat } from "@/types/network";

interface Props {
  mentor: AlumniMentor;
}

export function MentorRequestModal({ mentor }: Props) {
  const [open, setOpen] = useState(false);
  const [purpose, setPurpose] = useState("");
  const [format, setFormat] = useState<SessionFormat>("Both");
  const [availability, setAvailability] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!purpose.trim() || !availability.trim()) return;
    setSubmitting(true);

    const request: MentorshipRequest = {
      id: `mr-${Date.now()}`,
      mentorId: mentor.id,
      purpose: purpose.trim(),
      preferredFormat: format,
      availability: availability.trim(),
      submittedAt: new Date().toISOString(),
    };

    try {
      const raw = localStorage.getItem("nexhibit_network_mentorship_requests");
      const existing: MentorshipRequest[] = raw ? JSON.parse(raw) : [];
      existing.push(request);
      localStorage.setItem("nexhibit_network_mentorship_requests", JSON.stringify(existing));
    } catch {
      // ignore storage errors
    }

    toast.success("Mentorship request sent", {
      description: `${mentor.firstName} will be notified. ${mentor.responseTime}.`,
    });

    setPurpose("");
    setAvailability("");
    setFormat("Both");
    setSubmitting(false);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">Request Mentorship from {mentor.firstName}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Request Mentorship</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="purpose">What do you want help with?</Label>
            <Textarea
              id="purpose"
              placeholder="Describe what you are looking for — resume review, interview prep, career advice..."
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              rows={3}
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="format">Preferred session format</Label>
            <Select value={format} onValueChange={(v) => setFormat(v as SessionFormat)}>
              <SelectTrigger id="format">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Video call">Video call</SelectItem>
                <SelectItem value="Async messages">Async messages</SelectItem>
                <SelectItem value="Both">Either works</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="availability">Your availability</Label>
            <Textarea
              id="availability"
              placeholder="e.g. Weekday evenings (UTC+8), or weekends anytime"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              rows={2}
              required
            />
          </div>

          <div className="flex gap-3 pt-1">
            <Button type="button" variant="outline" className="flex-1" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={submitting}>
              {submitting ? "Sending..." : "Send Request"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
