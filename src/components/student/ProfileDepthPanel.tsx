"use client";

import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Check, ChevronDown, ClipboardCopy, FileUp, Lock, Mic, Pause, Play, RotateCcw, Settings, Video } from "lucide-react";
import { toast } from "sonner";

import { VerifiedBadge } from "@/components/brand/VerifiedBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  defaultStudentProfileDraft,
  type FieldVisibility,
  type ProfileMode,
  useStudentProfileStore,
} from "@/stores/student-profile-store";
import { cn } from "@/lib/utils";

const workRegions = [
  "Thailand (citizen)",
  "China (student visa)",
  "China (post-grad permit)",
  "Remote — global",
  "Open to relocate",
];

const openToLabels = {
  internship: "Internship",
  fullTime: "Full-time",
  partTime: "Part-time",
  remote: "Remote",
  freelance: "Freelance",
} satisfies Record<keyof typeof defaultStudentProfileDraft.openTo, string>;

const visibilityLabels = {
  public: "Public",
  employerOnly: "Employer demo only",
  hidden: "Hidden",
} satisfies Record<FieldVisibility, string>;

export function VisibilityControl({ field, compact = false }: { field: string; compact?: boolean }) {
  const { draft, setFieldVisibility } = useStudentProfileStore();
  const value = draft.fieldVisibility[field] ?? "public";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size={compact ? "icon-xs" : "icon-sm"}
          aria-label={`Visibility for ${field}: ${visibilityLabels[value]}`}
          title={`Visibility: ${visibilityLabels[value]}`}
        >
          <Settings className="size-3.5" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {(["public", "employerOnly", "hidden"] as FieldVisibility[]).map((option) => (
          <DropdownMenuItem key={option} onSelect={() => setFieldVisibility(field, option)}>
            <span className={cn("size-2 rounded-full", option === value ? "bg-gold-500" : "bg-ink-200")} />
            {visibilityLabels[option]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function ProfileModeControl() {
  const { draft, updateDraft } = useStudentProfileStore();

  return (
    <div className="mt-4 rounded-lg border border-ink-200 bg-surface-0 p-3 text-left">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ink-500">Profile mode</p>
      <div className="mt-2 grid grid-cols-3 gap-1 rounded-lg bg-ink-100 p-1">
        {(["public", "employerOnly", "hidden"] as ProfileMode[]).map((mode) => (
          <button
            key={mode}
            type="button"
            onClick={() => updateDraft({ profileMode: mode })}
            className={cn(
              "min-h-9 rounded-md px-2 text-xs font-semibold transition",
              draft.profileMode === mode ? "bg-surface-0 text-ink-900 shadow-sm" : "text-ink-500 hover:text-ink-900",
            )}
          >
            {mode === "public" ? "Public" : mode === "employerOnly" ? "Employer-only" : "Hidden"}
          </button>
        ))}
      </div>
    </div>
  );
}

export function EmployerPreviewBanner() {
  return (
    <div className="mb-4 flex items-start gap-2 rounded-lg border border-gold-200 bg-gold-50 px-3 py-2 text-sm text-ink-800">
      <Lock className="mt-0.5 size-4 shrink-0 text-gold-700" aria-hidden="true" />
      <span>Employer demo preview. Fields marked hidden stay hidden in this simulated view.</span>
    </div>
  );
}

export function EmployerPreviewField({
  field,
  label,
  value,
}: {
  field: string;
  label: string;
  value: string;
}) {
  const { draft } = useStudentProfileStore();
  const visibility = draft.fieldVisibility[field] ?? "public";
  const hidden = visibility === "hidden";

  return (
    <div className={cn("flex justify-between gap-3", hidden && "text-ink-400 line-through")}>
      <span className="inline-flex items-center gap-1 text-ink-500">
        {hidden ? <Lock className="size-3.5" aria-hidden="true" /> : null}
        {label}
      </span>
      <span className="text-right font-medium text-ink-900">{hidden ? "Hidden" : value}</span>
    </div>
  );
}

export function PitchAndVerifyTab() {
  const { draft, updateDraft, updateLanguage, toggleOpenTo, toggleWorkRegion } = useStudentProfileStore();

  return (
    <div className="space-y-6">
      <DemoPitchBuilder />
      <VideoPitchRecorder value={draft.videoPitchUrl} onSave={(videoPitchUrl) => updateDraft({ videoPitchUrl })} />
      <div className="grid gap-4 lg:grid-cols-2">
        <AudioRecorder
          title="Voice intro"
          description="A short spoken intro employers can play before the booth meeting."
          value={draft.voiceIntroUrl}
          onSave={(voiceIntroUrl) => updateDraft({ voiceIntroUrl })}
        />
        <AudioRecorder
          title="Name pronunciation"
          description="Help recruiters say your name correctly in the first conversation."
          value={draft.namePronunciationUrl}
          onSave={(namePronunciationUrl) => updateDraft({ namePronunciationUrl })}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Work authorization</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {workRegions.map((region) => {
              const selected = draft.workAuth.regions.includes(region);
              return (
                <button
                  key={region}
                  type="button"
                  onClick={() => toggleWorkRegion(region)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs font-semibold transition",
                    selected ? "border-gold-500 bg-gold-50 text-ink-900" : "border-ink-200 bg-surface-0 text-ink-600 hover:border-gold-300",
                  )}
                >
                  {region}
                </button>
              );
            })}
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="work-auth-notes">Notes for employers (optional)</Label>
            <Textarea
              id="work-auth-notes"
              maxLength={200}
              value={draft.workAuth.notes}
              onChange={(event) => updateDraft({ workAuth: { ...draft.workAuth, notes: event.target.value } })}
              placeholder="Example: Available for remote internships while completing coursework."
            />
            <p className="text-right text-xs text-ink-400">{200 - draft.workAuth.notes.length} characters left</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Languages with proof</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {draft.languages.map((language, index) => (
            <div key={`${language.name}-${index}`} className="grid gap-2 rounded-lg border border-ink-200 bg-surface-0 p-3 lg:grid-cols-[1fr_120px_140px_110px_auto] lg:items-center">
              <Input value={language.name} onChange={(event) => updateLanguage(index, { name: event.target.value })} aria-label="Language name" />
              <Select value={language.cefr ?? ""} onValueChange={(cefr) => updateLanguage(index, { cefr: cefr as typeof language.cefr })}>
                <SelectTrigger aria-label={`${language.name} CEFR level`}>
                  <SelectValue placeholder="CEFR" />
                </SelectTrigger>
                <SelectContent>
                  {["A1", "A2", "B1", "B2", "C1", "C2"].map((level) => (
                    <SelectItem key={level} value={level}>{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={language.test ?? ""} onValueChange={(test) => updateLanguage(index, { test: test as typeof language.test })}>
                <SelectTrigger aria-label={`${language.name} test name`}>
                  <SelectValue placeholder="Test" />
                </SelectTrigger>
                <SelectContent>
                  {["HSK", "IELTS", "TOEFL", "TOPIK", "Other"].map((test) => (
                    <SelectItem key={test} value={test}>{test}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input value={language.score ?? ""} onChange={(event) => updateLanguage(index, { score: event.target.value })} placeholder="Score" aria-label={`${language.name} score`} />
              <div className="flex items-center gap-2">
                <label className="inline-flex min-h-10 cursor-pointer items-center gap-1.5 rounded-md border border-ink-200 bg-surface-0 px-3 text-xs font-semibold text-ink-700 hover:bg-ink-50">
                  <FileUp className="size-3.5" aria-hidden="true" />
                  Upload proof
                  <input
                    type="file"
                    className="sr-only"
                    accept=".pdf,.jpg,.jpeg"
                    onChange={(event) => updateLanguage(index, { proofFile: event.target.files?.[0]?.name })}
                  />
                </label>
                {language.proofFile ? <VerifiedBadge /> : null}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Open to</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-ink-500">These flags appear at the top of your employer-facing profile.</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {(Object.keys(openToLabels) as Array<keyof typeof openToLabels>).map((key) => (
              <label key={key} className="flex items-center justify-between gap-3 rounded-lg border border-ink-200 bg-surface-0 px-3 py-2">
                <span className="text-sm font-semibold text-ink-800">{openToLabels[key]}</span>
                <Switch checked={draft.openTo[key]} onCheckedChange={() => toggleOpenTo(key)} aria-label={`Open to ${openToLabels[key]}`} />
              </label>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const pitchTemplates = [
  {
    id: "30-second",
    label: "30-second pitch",
    text: "I’m Nattapong, a software engineering student building practical tools for international students. My strongest project is a bilingual campus navigator that turns confusing location tasks into clear mobile routes. I’m looking for a frontend or product-engineering internship where cross-cultural user needs matter.",
  },
  {
    id: "2-minute",
    label: "2-minute pitch",
    text: "I’m Nattapong, a third-year software engineering student focused on cross-cultural student products. I noticed that new international students often lose time when campus directions, notices, and service requests are hard to understand across languages. I built three prototypes around that problem: a bilingual campus navigator, a scholarship deadline tracker, and a Mandarin-English maintenance assistant. My role covered user research, interaction design, and frontend implementation. The project I would most like to show you is the maintenance assistant because it demonstrates how I handle uncertainty: the flow captures missing details, explains what it cannot resolve, and prepares a structured human handoff. I’m looking for an internship where I can combine TypeScript engineering with practical product judgment.",
  },
  {
    id: "walkthrough",
    label: "Project walkthrough",
    text: "The problem was incomplete bilingual maintenance reports. I mapped the minimum details staff need, prototyped a guided Mandarin-English conversation, and added a rule-based escalation step for ambiguous requests. I owned the interaction flow, Python prototype, and failure-case testing. The evidence I would show is the handoff format and three edge cases that changed the design. The biggest lesson was that trust comes from making uncertainty visible, not pretending the system always understands.",
  },
] as const;

function DemoPitchBuilder() {
  const [activeId, setActiveId] = useState<(typeof pitchTemplates)[number]["id"]>("30-second");
  const activeTemplate = pitchTemplates.find((template) => template.id === activeId) ?? pitchTemplates[0];
  const [draft, setDraft] = useState<string>(activeTemplate.text);
  const [saved, setSaved] = useState(false);

  function chooseTemplate(id: (typeof pitchTemplates)[number]["id"]) {
    const template = pitchTemplates.find((item) => item.id === id) ?? pitchTemplates[0];
    setActiveId(id);
    setDraft(template.text);
    setSaved(false);
  }

  async function copyPitch() {
    try {
      await navigator.clipboard.writeText(draft);
      toast.success("Suggested pitch copied.");
    } catch {
      toast.info("Copy is unavailable here. The pitch remains selected for manual copy.");
    }
  }

  return (
    <Card className="overflow-hidden border-gold-200">
      <CardHeader className="bg-gold-50/70">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold-700">Demo pitch builder</p>
            <CardTitle className="mt-1 text-base">Suggested pitch</CardTitle>
          </div>
          <span className="rounded-full border border-gold-300 bg-surface-0 px-2.5 py-1 text-[11px] font-semibold text-ink-600">
            Rule-based writing template
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pt-5">
        <div className="flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Pitch length">
          {pitchTemplates.map((template) => (
            <button
              key={template.id}
              type="button"
              aria-pressed={activeId === template.id}
              onClick={() => chooseTemplate(template.id)}
              className={cn(
                "min-h-10 shrink-0 rounded-full border px-4 text-xs font-semibold transition",
                activeId === template.id
                  ? "border-ink-900 bg-ink-900 text-surface-0"
                  : "border-ink-200 bg-surface-0 text-ink-600 hover:border-gold-400",
              )}
            >
              {template.label}
            </button>
          ))}
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="suggested-pitch">Edit this suggested pitch</Label>
          <Textarea
            id="suggested-pitch"
            value={draft}
            rows={7}
            onChange={(event) => {
              setDraft(event.target.value);
              setSaved(false);
            }}
          />
          <p className="text-xs text-ink-400">{draft.length} characters · Saved only in this open prototype view.</p>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg border border-ink-200 bg-ink-50 p-3">
            <p className="text-xs font-bold text-ink-800">What to say about Mandarin level</p>
            <p className="mt-1 text-xs leading-5 text-ink-600">
              “I use HSK 4 Mandarin for everyday coordination, prepare technical terms before meetings, and confirm complex decisions in writing.”
            </p>
          </div>
          <div className="rounded-lg border border-ink-200 bg-ink-50 p-3">
            <p className="text-xs font-bold text-ink-800">What to say about work style</p>
            <p className="mt-1 text-xs leading-5 text-ink-600">
              “I work in small testable steps, document tradeoffs, and ask for feedback early when language or context could create risk.”
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button type="button" variant="outline" onClick={copyPitch}>
            <ClipboardCopy className="size-4" aria-hidden="true" />
            Copy pitch
          </Button>
          <Button
            type="button"
            variant="primary"
            onClick={() => {
              setSaved(true);
              toast.success("Saved for this prototype session.");
            }}
          >
            {saved ? <Check className="size-4" aria-hidden="true" /> : null}
            {saved ? "Pitch saved" : "Save demo pitch"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function VideoPitchRecorder({ value, onSave }: { value?: string; onSave: (value?: string) => void }) {
  const webcamRef = useRef<Webcam>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [tipsOpen, setTipsOpen] = useState(false);

  useEffect(() => {
    if (!recording) return undefined;
    const id = window.setInterval(() => setSeconds((current) => current + 1), 1000);
    return () => window.clearInterval(id);
  }, [recording]);

  useEffect(() => {
    if (seconds >= 60 && recording) stopRecording();
  }, [recording, seconds]);

  function startRecording() {
    const stream = webcamRef.current?.stream;
    if (!stream) {
      toast.info("Camera is still warming up. Try again in a moment.");
      return;
    }
    chunksRef.current = [];
    const recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) chunksRef.current.push(event.data);
    };
    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "video/webm" });
      const reader = new FileReader();
      reader.onloadend = () => onSave(reader.result?.toString());
      reader.readAsDataURL(blob);
    };
    recorderRef.current = recorder;
    setSeconds(0);
    setRecording(true);
    recorder.start();
  }

  function stopRecording() {
    recorderRef.current?.stop();
    setRecording(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm">
          <Video className="size-4 text-gold-600" aria-hidden="true" />
          Video elevator pitch
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="overflow-hidden rounded-lg border border-ink-200 bg-ink-900">
          {value && !recording ? (
            <video controls src={value} className="aspect-video w-full bg-ink-900" />
          ) : (
            <Webcam ref={webcamRef} audio muted className="aspect-video w-full object-cover" videoConstraints={{ facingMode: "user" }} />
          )}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm text-ink-500">
            {recording ? (
              <span className="inline-flex items-center gap-2 font-semibold text-error">
                <span className="size-2 rounded-full bg-error motion-safe:animate-pulse" />
                Recording {seconds}s
              </span>
            ) : value ? "Saved pitch preview" : "Record a 30–60 second pitch."}
            {recording && seconds >= 50 ? <span className="ml-2 font-semibold text-gold-700">Auto-stops at 60s</span> : null}
          </div>
          <div className="flex gap-2">
            {recording ? (
              <Button type="button" variant="primary" onClick={stopRecording} aria-label="Stop video recording">
                Stop
              </Button>
            ) : (
              <Button type="button" variant={value ? "outline" : "primary"} onClick={startRecording} aria-label={value ? "Re-record video pitch" : "Start video recording"}>
                {value ? <RotateCcw className="size-4" aria-hidden="true" /> : null}
                {value ? "Re-record" : "Record pitch"}
              </Button>
            )}
          </div>
        </div>
        <div className="rounded-lg border border-ink-200 bg-surface-0">
          <button type="button" onClick={() => setTipsOpen((open) => !open)} className="flex w-full items-center justify-between px-4 py-3 text-left">
            <span className="text-sm font-semibold text-ink-900">Tips for a strong pitch</span>
            <ChevronDown className={cn("size-4 text-ink-400 transition", tipsOpen && "rotate-180")} aria-hidden="true" />
          </button>
          {tipsOpen ? (
            <ul className="space-y-2 border-t border-ink-200 px-4 py-3 text-sm text-ink-600">
              <li>Open with the role you want and one project that proves fit.</li>
              <li>Use one measurable result or concrete user outcome.</li>
              <li>Name the cross-cultural context you handled.</li>
              <li>End with what kind of conversation you want at the booth.</li>
            </ul>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}

function AudioRecorder({
  title,
  description,
  value,
  onSave,
}: {
  title: string;
  description: string;
  value?: string;
  onSave: (value?: string) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!recording) return undefined;
    const timer = window.setInterval(() => setSeconds((current) => current + 1), 1000);
    const draw = window.setInterval(() => {
      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d");
      if (!canvas || !context) return;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "currentColor";
      Array.from({ length: 36 }).forEach((_, index) => {
        const height = 6 + Math.abs(Math.sin((Date.now() / 160) + index)) * 34;
        context.globalAlpha = 0.25 + (index % 5) / 10;
        context.fillRect(index * 7, (canvas.height - height) / 2, 3, height);
      });
      context.globalAlpha = 1;
    }, 80);
    return () => {
      window.clearInterval(timer);
      window.clearInterval(draw);
    };
  }, [recording]);

  useEffect(() => {
    if (recording && seconds >= 15) stopRecording();
  }, [recording, seconds]);

  async function startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    chunksRef.current = [];
    const recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) chunksRef.current.push(event.data);
    };
    recorder.onstop = () => {
      stream.getTracks().forEach((track) => track.stop());
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      const reader = new FileReader();
      reader.onloadend = () => onSave(reader.result?.toString());
      reader.readAsDataURL(blob);
    };
    recorderRef.current = recorder;
    setSeconds(0);
    setRecording(true);
    recorder.start();
  }

  function stopRecording() {
    recorderRef.current?.stop();
    setRecording(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm">
          <Mic className="size-4 text-gold-600" aria-hidden="true" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-ink-500">{description}</p>
        <canvas ref={canvasRef} width={252} height={56} className="h-14 w-full rounded-lg border border-ink-200 bg-ink-50 text-gold-600" aria-hidden="true" />
        {value ? <audio controls src={value} className="w-full" /> : null}
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-semibold text-ink-500">{recording ? `${seconds}s / 15s` : value ? "Saved audio" : "Max 15 seconds"}</span>
          {recording ? (
            <Button type="button" variant="primary" onClick={stopRecording} aria-label={`Stop ${title} recording`}>
              <Pause className="size-4" aria-hidden="true" />
              Stop
            </Button>
          ) : (
            <Button type="button" variant={value ? "outline" : "primary"} onClick={startRecording} aria-label={`Record ${title}`}>
              <Play className="size-4" aria-hidden="true" />
              {value ? "Re-record" : "Record"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
