"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Bar, BarChart, PolarAngleAxis, RadialBar, RadialBarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Clipboard, Sparkles, Video } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { currentStudent } from "@/lib/current-user";
import { learningResources, skillDemand } from "@/lib/mock-data/skill-demand";
import { useStudentCoachStore } from "@/stores/student-coach-store";
import { useStudentProfileStore } from "@/stores/student-profile-store";
import { cn } from "@/lib/utils";

const auditDimensions = [
  { label: "Specificity", score: 82 },
  { label: "Action verbs", score: 76 },
  { label: "Quantified impact", score: 64 },
  { label: "Portfolio depth", score: 88 },
  { label: "Cross-cultural signal", score: 91 },
];

const interviewQuestions = [
  "Tell me about a project where language or culture changed your design decision.",
  "How would you explain your strongest technical project to a non-technical manager?",
  "Describe a time you had to learn a tool quickly.",
  "What tradeoff did you make in your campus navigator project?",
  "How do you test whether a multilingual workflow is working?",
  "Why are you interested in this role now?",
  "How do you handle feedback when it conflicts with your original idea?",
  "What would you improve in your profile before meeting employers?",
  "How do you prioritize tasks during a live event day?",
  "What does a good cross-cultural teammate do differently?",
  "How would you measure the success of your chatbot prototype?",
  "Tell me about a time you helped someone navigate uncertainty.",
];

export function CoachClient() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-700">Student coach</p>
        <h1 className="mt-2 text-3xl font-black text-ink-900">Practice before employers arrive</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-600">
          Mock coaching tools use deterministic prototype responses only. No profile data leaves this browser.
        </p>
      </div>

      <Tabs defaultValue="audit" className="rounded-lg border border-ink-200 bg-surface-0 p-4">
        <div>
          <TabsList className="flex-wrap">
            <TabsTrigger value="audit">Profile audit</TabsTrigger>
            <TabsTrigger value="pitch">Pitch generator</TabsTrigger>
            <TabsTrigger value="interview">Mock interview</TabsTrigger>
            <TabsTrigger value="skills">Skill gap</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="audit">
          <ProfileAudit />
        </TabsContent>
        <TabsContent value="pitch">
          <PitchGenerator />
        </TabsContent>
        <TabsContent value="interview">
          <MockInterview />
        </TabsContent>
        <TabsContent value="skills">
          <SkillGap />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ProfileAudit() {
  const { auditRan, setAuditRan } = useStudentCoachStore();
  const [loading, setLoading] = useState(false);
  const overall = Math.round(auditDimensions.reduce((sum, item) => sum + item.score, 0) / auditDimensions.length);

  function runAudit() {
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setAuditRan(true);
    }, 1500);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 rounded-lg border border-ink-200 bg-ink-50 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-ink-900">Audit {currentStudent.name.split(" ")[0]}&apos;s current profile</p>
          <p className="text-xs text-ink-500">Suggestions reference your headline, portfolio projects, and language signals.</p>
        </div>
        <Button variant="primary" onClick={runAudit}>
          <Sparkles className="size-4" aria-hidden="true" />
          Run audit
        </Button>
      </div>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-3">
          {[0, 1, 2].map((item) => (
            <div key={item} className="h-36 rounded-lg bg-ink-100 motion-safe:animate-pulse" />
          ))}
        </div>
      ) : auditRan ? (
        <div className="grid gap-4 lg:grid-cols-[260px_1fr]">
          <Card>
            <CardContent className="pt-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-ink-500">Overall score</p>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart innerRadius="70%" outerRadius="100%" data={[{ name: "Score", value: overall, fill: "var(--accent)" }]} startAngle={90} endAngle={-270}>
                    <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                    <RadialBar dataKey="value" cornerRadius={8} background />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-center text-4xl font-black tabular-nums text-ink-900">{overall}</p>
              <table className="sr-only">
                <tbody><tr><td>Overall profile audit score</td><td>{overall}</td></tr></tbody>
              </table>
            </CardContent>
          </Card>
          <div className="space-y-3">
            {auditDimensions.map((dimension) => (
              <details key={dimension.label} className="rounded-lg border border-ink-200 bg-surface-0 p-4">
                <summary className="cursor-pointer text-sm font-semibold text-ink-900">
                  <span className="mr-2 tabular-nums text-gold-700">{dimension.score}</span>
                  {dimension.label}
                </summary>
                <ul className="mt-3 space-y-1.5 text-sm text-ink-600">
                  <li>Reference your &ldquo;{currentStudent.projects[0]?.title}&rdquo; project with one measurable outcome.</li>
                  <li>Connect &ldquo;{currentStudent.headline}&rdquo; to a target role instead of leaving it broad.</li>
                  <li>Use your {currentStudent.nationality} background as context for cross-cultural product judgment.</li>
                </ul>
              </details>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function PitchGenerator() {
  const { updateDraft } = useStudentProfileStore();
  const [role, setRole] = useState("Frontend product intern");
  const [company, setCompany] = useState("Alibaba Cloud");
  const [length, setLength] = useState("45");
  const [output, setOutput] = useState("");
  const [streaming, setStreaming] = useState(false);

  function generate() {
    const text = `Hi, I am ${currentStudent.name}, a ${currentStudent.major} student building practical tools for international student workflows. For ${company}, I would position myself as a ${role} who can combine ${currentStudent.skills.slice(0, 2).join(" and ")} with cross-cultural product judgment. My strongest example is ${currentStudent.projects[0]?.title}, where I worked through language-heavy user needs and turned them into a usable prototype. In a ${length}-second booth conversation, I would like to discuss how this experience maps to your team.`;
    setOutput("");
    setStreaming(true);
    let index = 0;
    const id = window.setInterval(() => {
      setOutput(text.slice(0, index));
      index += 1;
      if (index > text.length) {
        window.clearInterval(id);
        setStreaming(false);
      }
    }, 20);
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
      <Card>
        <CardContent className="space-y-4 pt-5">
          <div className="grid gap-1.5">
            <Label htmlFor="target-role">Target role</Label>
            <Input id="target-role" value={role} onChange={(event) => setRole(event.target.value)} />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="target-company">Target company</Label>
            <Input id="target-company" value={company} onChange={(event) => setCompany(event.target.value)} />
          </div>
          <div className="grid gap-1.5">
            <Label>Pitch length</Label>
            <Select value={length} onValueChange={setLength}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 seconds</SelectItem>
                <SelectItem value="45">45 seconds</SelectItem>
                <SelectItem value="60">60 seconds</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="primary" className="w-full" onClick={generate} disabled={streaming}>
            Generate pitch
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Generated pitch</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea readOnly value={output} className="min-h-56" aria-label="Generated pitch text" />
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => navigator.clipboard.writeText(output)} disabled={!output}>
              <Clipboard className="size-4" aria-hidden="true" />
              Copy
            </Button>
            <Button variant="primary" onClick={() => {
              updateDraft({ elevatorPitch: output });
              toast.success("Saved as your elevator pitch.");
            }} disabled={!output || streaming}>
              Save as my elevator pitch
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function MockInterview() {
  const [role, setRole] = useState("Product engineering intern");
  const [started, setStarted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const questions = useMemo(() => interviewQuestions.slice(0, 3), []);
  const complete = answers.length >= 3;
  const answerLength = answers.join("").length;
  const scores = {
    clarity: 68 + (answerLength % 24),
    pace: 64 + (answerLength % 19),
    filler: 72 + (answerLength % 15),
    confidence: 70 + (answerLength % 21),
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
      <Card>
        <CardContent className="space-y-4 pt-5">
          <div className="grid gap-1.5">
            <Label htmlFor="interview-role">Role</Label>
            <Input id="interview-role" value={role} onChange={(event) => setRole(event.target.value)} />
          </div>
          <Button variant="primary" className="w-full" onClick={() => setStarted(true)}>
            Start 3-question session
          </Button>
          <p className="text-xs text-ink-500">Answers use your webcam locally. Feedback is a deterministic mock score.</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="space-y-4 pt-5">
          {!started ? (
            <p className="text-sm text-ink-500">Choose a role and start a mock interview.</p>
          ) : complete ? (
            <div className="space-y-4">
              <p className="text-sm font-semibold text-ink-900">Feedback for {role}</p>
              <div className="grid gap-3 sm:grid-cols-4">
                {Object.entries(scores).map(([label, score]) => (
                  <div key={label} className="rounded-lg border border-ink-200 p-3">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-ink-400">{label}</p>
                    <p className="mt-2 text-3xl font-black tabular-nums text-ink-900">{score}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-ink-600">Your strongest signal is role-aware storytelling. For {role}, tighten the opening answer and add one quantified project result.</p>
            </div>
          ) : (
            <>
              <Badge variant="gold">Question {questionIndex + 1} of 3</Badge>
              <p className="text-lg font-semibold text-ink-900">{questions[questionIndex]}</p>
              <WebcamAnswerRecorder
                questionIndex={questionIndex}
                onSaved={(token) => {
                  setAnswers((current) => [...current, token]);
                  setQuestionIndex((current) => Math.min(current + 1, 2));
                }}
              />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function WebcamAnswerRecorder({ questionIndex, onSaved }: { questionIndex: number; onSaved: (token: string) => void }) {
  const webcamRef = useRef<Webcam>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!recording) return undefined;
    const id = window.setInterval(() => setSeconds((current) => current + 1), 1000);
    return () => window.clearInterval(id);
  }, [recording]);

  useEffect(() => {
    if (recording && seconds >= 90) stop();
  }, [recording, seconds]);

  function start() {
    const stream = webcamRef.current?.stream;
    if (!stream) {
      toast.info("Camera is still warming up.");
      return;
    }
    chunksRef.current = [];
    const recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) chunksRef.current.push(event.data);
    };
    recorder.onstop = () => onSaved(`answer-${questionIndex}-${chunksRef.current.reduce((sum, item) => sum + item.size, 0)}`);
    recorderRef.current = recorder;
    setSeconds(0);
    setRecording(true);
    recorder.start();
  }

  function stop() {
    recorderRef.current?.stop();
    setRecording(false);
  }

  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-lg border border-ink-200 bg-ink-900">
        <Webcam ref={webcamRef} audio muted className="aspect-video w-full object-cover" videoConstraints={{ facingMode: "user" }} />
      </div>
      <div className="flex items-center justify-between gap-3">
        <span className={cn("text-xs font-semibold tabular-nums", recording ? "text-error" : "text-ink-500")}>{recording ? `${seconds}s / 90s` : "Ready to record"}</span>
        {recording ? (
          <Button variant="primary" onClick={stop} aria-label="Stop interview answer recording">Stop answer</Button>
        ) : (
          <Button variant="primary" onClick={start} aria-label="Record interview answer">
            <Video className="size-4" aria-hidden="true" />
            Record answer
          </Button>
        )}
      </div>
    </div>
  );
}

function SkillGap() {
  const data = skillDemand.map((item) => ({
    ...item,
    have: currentStudent.skills.some((skill) => skill.toLowerCase().includes(item.skill.toLowerCase().split(" ")[0])),
  }));

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Employer demand vs. your skills</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} layout="vertical" margin={{ left: 12, right: 24 }}>
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} />
                <YAxis type="category" dataKey="skill" width={120} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="demand" fill="var(--accent)" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <table className="sr-only">
            <thead><tr><th>Skill</th><th>Demand percent</th><th>You have it</th></tr></thead>
            <tbody>{data.map((item) => <tr key={item.skill}><td>{item.skill}</td><td>{item.demand}</td><td>{item.have ? "yes" : "no"}</td></tr>)}</tbody>
          </table>
          <div className="mt-3 flex flex-wrap gap-2">
            {data.map((item) => (
              <Badge key={item.skill} variant={item.have ? "gold" : "secondary"}>{item.skill}: {item.have ? "in profile" : "gap"}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Suggested learning resources</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {learningResources.map((resource) => (
            <div key={resource.id} className="rounded-lg border border-ink-200 p-3">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink-400">{resource.provider}</p>
              <p className="mt-1 text-sm font-semibold text-ink-900">{resource.title}</p>
              <p className="text-xs text-ink-500">{resource.focus}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
