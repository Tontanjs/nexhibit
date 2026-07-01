"use client";

import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import ReactMarkdown from "react-markdown";
import { MessageSquare, Search, UserPlus } from "lucide-react";
import { toast } from "sonner";

import { StudentAvatar } from "@/components/brand/StudentAvatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { currentStudent } from "@/lib/current-user";
import { alumniStories } from "@/lib/mock-data/alumni-stories";
import { mentors } from "@/lib/mock-data/mentors";
import { students } from "@/lib/mock-data/students";
import { useStudentNetworkStore } from "@/stores/student-network-store";
import { cn } from "@/lib/utils";

export function NetworkClient() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-700">Student network</p>
        <h1 className="mt-2 text-3xl font-black text-ink-900">Find peers, mentors, and alumni signal</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-600">
          Build a lightweight support network around the fair without leaving the prototype.
        </p>
      </div>

      <Tabs defaultValue="peers" className="rounded-lg border border-ink-200 bg-surface-0 p-4">
        <div>
          <TabsList className="flex-wrap">
            <TabsTrigger value="peers">Peers</TabsTrigger>
            <TabsTrigger value="mentors">Mentors</TabsTrigger>
            <TabsTrigger value="alumni">Alumni</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="peers">
          <Peers />
        </TabsContent>
        <TabsContent value="mentors">
          <Mentors />
        </TabsContent>
        <TabsContent value="alumni">
          <AlumniStories />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Peers() {
  const peers = students.filter((student) => student.id !== currentStudent.id);
  const [search, setSearch] = useState("");
  const [major, setMajor] = useState("All");
  const [year, setYear] = useState("All");
  const [skill, setSkill] = useState("All");
  const [connectedIds, setConnectedIds] = useState<string[]>([]);
  const majors = ["All", ...Array.from(new Set(peers.map((student) => student.major)))];
  const years = ["All", ...Array.from(new Set(peers.map((student) => `Year ${student.year}`)))];
  const skills = ["All", ...Array.from(new Set(peers.flatMap((student) => student.skills.slice(0, 4))))].slice(0, 14);

  const fuse = useMemo(() => new Fuse(peers, { keys: ["name", "major", "skills"], threshold: 0.35 }), [peers]);
  const searched = search ? fuse.search(search).map((result) => result.item) : peers;
  const filtered = searched.filter((student) => {
    if (major !== "All" && student.major !== major) return false;
    if (year !== "All" && `Year ${student.year}` !== year) return false;
    if (skill !== "All" && !student.skills.includes(skill as never)) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      <div className="grid gap-3 rounded-lg border border-ink-200 bg-ink-50 p-3 lg:grid-cols-[1fr_auto_auto_auto] lg:items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-400" aria-hidden="true" />
          <Input value={search} onChange={(event) => setSearch(event.target.value)} className="pl-9" placeholder="Search name, major, or skill" aria-label="Search peers" />
        </div>
        <ChipFilter label="Major" value={major} values={majors} onChange={setMajor} />
        <ChipFilter label="Year" value={year} values={years} onChange={setYear} />
        <ChipFilter label="Skill" value={skill} values={skills} onChange={setSkill} />
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((student) => (
          <Card key={student.id}>
            <CardContent className="pt-5">
              <div className="flex items-start gap-3">
                <StudentAvatar student={student} className="size-12" />
                <div className="min-w-0">
                  <p className="font-semibold text-ink-900">{student.name}</p>
                  <p className="text-sm text-ink-500">{student.major} · Year {student.year}</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {student.skills.slice(0, 3).map((item) => <Badge key={item} variant="secondary">{item}</Badge>)}
              </div>
              <div className="mt-4 flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => toast.success(`Prototype message thread opened with ${student.name}.`)}
                >
                  <MessageSquare className="size-3.5" aria-hidden="true" />
                  Message
                </Button>
                <Button
                  type="button"
                  variant={connectedIds.includes(student.id) ? "outline" : "primary"}
                  size="sm"
                  disabled={connectedIds.includes(student.id)}
                  onClick={() => {
                    setConnectedIds((ids) => [...ids, student.id]);
                    toast.success(`Connection request saved for ${student.name} in this demo session.`);
                  }}
                >
                  <UserPlus className="size-3.5" aria-hidden="true" />
                  {connectedIds.includes(student.id) ? "Requested" : "Connect"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ChipFilter({ label, value, values, onChange }: { label: string; value: string; values: string[]; onChange: (value: string) => void }) {
  return (
    <div>
      <p className="mb-1 text-xs font-bold uppercase tracking-[0.12em] text-ink-400">{label}</p>
      <div className="flex max-w-xs gap-1 overflow-x-auto">
        {values.slice(0, 8).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onChange(item)}
            className={cn(
              "shrink-0 rounded-full border px-2.5 py-1 text-xs font-semibold",
              value === item ? "border-gold-500 bg-gold-50 text-ink-900" : "border-ink-200 bg-surface-0 text-ink-600",
            )}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

function Mentors() {
  const { sentMentorRequests, markMentorRequested } = useStudentNetworkStore();

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {mentors.map((mentor) => (
        <Card key={mentor.id}>
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-ink-900 text-sm font-black text-gold-500">{mentor.initials}</span>
              <div>
                <p className="font-semibold text-ink-900">{mentor.name}</p>
                <p className="text-sm text-ink-500">{mentor.role} · {mentor.company}</p>
                <p className="text-xs text-ink-400">{mentor.yearsOut} years out</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {mentor.focus.map((item) => <Badge key={item} variant="secondary">{item}</Badge>)}
            </div>
            <MentorRequestDialog
              mentorName={mentor.name}
              requested={sentMentorRequests.includes(mentor.id)}
              onSubmit={() => {
                markMentorRequested(mentor.id);
                toast.success("Request sent");
              }}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function MentorRequestDialog({ mentorName, requested, onSubmit }: { mentorName: string; requested: boolean; onSubmit: () => void }) {
  const [message, setMessage] = useState(`Hi ${mentorName}, I would appreciate quick advice on preparing for cross-cultural employer conversations.`);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={requested ? "outline" : "primary"} size="sm" className="mt-4 w-full" disabled={requested}>
          {requested ? "Request sent" : "Request mentorship"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Request mentorship</DialogTitle>
          <DialogDescription>Send a short mock request to {mentorName}. This prototype does not contact anyone.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-1.5">
          <Label htmlFor="mentor-message">Message</Label>
          <Textarea id="mentor-message" maxLength={500} value={message} onChange={(event) => setMessage(event.target.value)} className="min-h-36" />
          <p className="text-right text-xs text-ink-400">{500 - message.length} characters left</p>
        </div>
        <DialogFooter>
          <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
          <DialogClose asChild><Button variant="primary" onClick={onSubmit}>Send request</Button></DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function AlumniStories() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {alumniStories.map((story) => (
        <Card key={story.id}>
          <CardContent className="pt-5">
            <div className="flex items-start gap-3">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-gold-50 text-sm font-black text-ink-900 ring-1 ring-gold-200">{story.initials}</span>
              <div>
                <p className="text-sm font-semibold text-ink-900">{story.title}</p>
                <p className="mt-1 line-clamp-2 text-sm text-ink-500">{story.summary}</p>
              </div>
            </div>
            <StoryDialog story={story} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function StoryDialog({ story }: { story: (typeof alumniStories)[number] }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="mt-4">Read story</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{story.title}</DialogTitle>
          <DialogDescription>{story.author}</DialogDescription>
        </DialogHeader>
        <div className="prose prose-sm max-h-[60vh] overflow-y-auto text-ink-700">
          <ReactMarkdown>{story.markdown}</ReactMarkdown>
        </div>
      </DialogContent>
    </Dialog>
  );
}
