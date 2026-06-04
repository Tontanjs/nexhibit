import type { Student, StudentCategory } from "@/lib/mock-data/types";

export type EmployerRole = {
  id: string;
  title: string;
  type: "Internship" | "Full-time" | "Part-time";
  department: string;
  location: string;
  duration: string;
  preferredMajors: string[];
  requiredSkills: string[];
  preferredLanguages: string[];
  availabilityWindow: string;
  salaryRange: string;
  description: string;
};

export type CandidateSignal = {
  studentId: string;
  stage: "New" | "Viewed" | "Shortlisted" | "Contacted" | "Interview" | "Offer";
  status: "Strong match" | "Interview-ready" | "Needs review" | "Waiting reply";
  responseSpeed: string;
  lastActivity: string;
  roleFit: string;
  eventStatus: "Booked booth" | "Checked in" | "Waiting" | "Not booked";
  note: string;
  matchReasons: string[];
  tags: string[];
};

export type PipelineStage = {
  id: string;
  label: string;
  description: string;
  candidateIds: string[];
};

export const employerRoles: EmployerRole[] = [
  {
    id: "role-support-tooling",
    title: "Multilingual Customer Support Tooling Intern",
    type: "Internship",
    department: "Cloud Solutions · International Support",
    location: "Hangzhou / Hybrid",
    duration: "12 weeks, summer 2026",
    preferredMajors: ["Software Engineering", "Data Science", "Language Technology"],
    requiredSkills: ["TypeScript", "Python", "Localization", "Data Analytics", "Mandarin"],
    preferredLanguages: ["English", "Mandarin", "Thai", "Vietnamese"],
    availabilityWindow: "June 2026 onward",
    salaryRange: "RMB 180-260 / day",
    description:
      "Support a bilingual tooling team that turns messy customer support signals into structured product workflows.",
  },
  {
    id: "role-cloud-solutions",
    title: "Cloud Solutions Intern",
    type: "Internship",
    department: "Alibaba Cloud · Solution Consulting",
    location: "Hangzhou",
    duration: "3-6 months",
    preferredMajors: ["Software Engineering", "Computer Science", "Information Systems"],
    requiredSkills: ["Cloud Computing", "Python", "Solution Consulting", "Technical Presentations"],
    preferredLanguages: ["English", "Mandarin"],
    availabilityWindow: "July 2026 onward",
    salaryRange: "RMB 220-300 / day",
    description:
      "Work with solution architects on customer demos, documentation, and technical validation for international accounts.",
  },
  {
    id: "role-product-ops",
    title: "Product Operations Intern",
    type: "Internship",
    department: "International Product Operations",
    location: "Hangzhou / Remote-friendly",
    duration: "10-16 weeks",
    preferredMajors: ["Business", "International Trade", "Digital Product Management"],
    requiredSkills: ["Customer Research", "Excel", "Data Analytics", "Copywriting"],
    preferredLanguages: ["English", "Mandarin", "Indonesian", "Russian"],
    availabilityWindow: "June-August 2026",
    salaryRange: "RMB 160-230 / day",
    description:
      "Help product teams understand regional customer behavior, write handoff notes, and convert student research into operating insight.",
  },
  {
    id: "role-data-analyst",
    title: "Data Analyst Intern",
    type: "Internship",
    department: "Data Intelligence",
    location: "Hangzhou",
    duration: "12 weeks",
    preferredMajors: ["Data Science", "Statistics", "Software Engineering"],
    requiredSkills: ["Python", "SQL", "Data Visualization", "Data Analytics"],
    preferredLanguages: ["English", "Mandarin"],
    availabilityWindow: "Immediately after Spring Fair",
    salaryRange: "RMB 200-280 / day",
    description:
      "Analyze event, support, and product data to find patterns that help international teams prioritize follow-up.",
  },
];

export const boothReadiness = {
  eventName: "Spring Career Fair 2026",
  boothNumber: "A-14",
  hall: "ZJUT International College Hall",
  currentSlot: "13:00-13:20",
  recruiters: ["Liu Wen", "Maya Chen", "Daniel Zhou"],
  bookedSlots: 18,
  totalSlots: 24,
  checkedIn: 9,
  followUpsQueued: 6,
  qrStatus: "Ready",
};

export const candidateSignals: Record<string, CandidateSignal> = {
  "stu-001": {
    studentId: "stu-001",
    stage: "Interview",
    status: "Interview-ready",
    responseSpeed: "Replies within 2 hours",
    lastActivity: "Confirmed Friday 15:30",
    roleFit: "Multilingual Customer Support Tooling Intern",
    eventStatus: "Booked booth",
    note: "Strong product explanation. Ask about bilingual failure cases and support dashboard tradeoffs.",
    matchReasons: ["TypeScript + Python overlap", "Cross-language chatbot evidence", "Fast response"],
    tags: ["Interview", "Product thinking", "Support tooling"],
  },
  "stu-003": {
    studentId: "stu-003",
    stage: "Shortlisted",
    status: "Strong match",
    responseSpeed: "Same-day reply",
    lastActivity: "Shared robotics build log",
    roleFit: "Cloud Solutions Intern",
    eventStatus: "Waiting",
    note: "Good technical documentation habits. Better fit for solution demo documentation than pure cloud infra.",
    matchReasons: ["Structured engineering notes", "Technical English", "Demo-ready project"],
    tags: ["Technical documentation", "Engineering", "Demo evidence"],
  },
  "stu-006": {
    studentId: "stu-006",
    stage: "Contacted",
    status: "Waiting reply",
    responseSpeed: "Usually within 1 day",
    lastActivity: "Tencent Global message sent",
    roleFit: "Product Operations Intern",
    eventStatus: "Booked booth",
    note: "Useful regional market research. Follow up on dashboard accuracy and Russian-language insight.",
    matchReasons: ["Market research", "Regional localization", "Business category"],
    tags: ["Central Asia", "Product ops", "Research"],
  },
  "stu-008": {
    studentId: "stu-008",
    stage: "Viewed",
    status: "Needs review",
    responseSpeed: "Replies within 4 hours",
    lastActivity: "Localization QA task opened",
    roleFit: "Multilingual Customer Support Tooling Intern",
    eventStatus: "Not booked",
    note: "Great language QA instincts. Needs more technical evidence before interview.",
    matchReasons: ["Localization QA", "Mandarin-English review", "Customer support context"],
    tags: ["Language QA", "Prompt testing", "Support"],
  },
  "stu-010": {
    studentId: "stu-010",
    stage: "New",
    status: "Needs review",
    responseSpeed: "Replies within 1 day",
    lastActivity: "Profile updated today",
    roleFit: "Product Operations Intern",
    eventStatus: "Waiting",
    note: "Healthcare content and research background could support regulated documentation workflows.",
    matchReasons: ["Regulatory research", "Customer education", "Documentation"],
    tags: ["Health", "Documentation", "Research"],
  },
};

export const employerPipeline: PipelineStage[] = [
  {
    id: "new",
    label: "New",
    description: "Recommended by match signals",
    candidateIds: ["stu-010", "stu-012", "stu-015"],
  },
  {
    id: "viewed",
    label: "Viewed",
    description: "Profile opened by recruiter",
    candidateIds: ["stu-008", "stu-004"],
  },
  {
    id: "shortlisted",
    label: "Shortlisted",
    description: "Saved for team review",
    candidateIds: ["stu-003", "stu-006"],
  },
  {
    id: "contacted",
    label: "Contacted",
    description: "Message or booth invite sent",
    candidateIds: ["stu-005", "stu-007"],
  },
  {
    id: "interview",
    label: "Interview",
    description: "Interview or task scheduled",
    candidateIds: ["stu-001"],
  },
  {
    id: "offer",
    label: "Offer",
    description: "Offer discussion active",
    candidateIds: ["stu-011"],
  },
];

export const recruiterActivity = [
  {
    id: "act-001",
    type: "Message sent",
    text: "Sent debugging exercise details to Nattapong Saetang.",
    timestamp: "12 minutes ago",
  },
  {
    id: "act-002",
    type: "Note added",
    text: "Added private note on chatbot failure-case testing.",
    timestamp: "31 minutes ago",
  },
  {
    id: "act-003",
    type: "Shortlist",
    text: "Saved Ayesha Khan for technical documentation review.",
    timestamp: "1 hour ago",
  },
  {
    id: "act-004",
    type: "Scanner",
    text: "Booth scanner checked in 9 students for Spring Career Fair 2026.",
    timestamp: "2 hours ago",
  },
];

export const scannerQueue = [
  { id: "queue-001", studentId: "stu-001", status: "Checked in", time: "13:04" },
  { id: "queue-002", studentId: "stu-003", status: "Waiting", time: "13:08" },
  { id: "queue-003", studentId: "stu-008", status: "Completed", time: "13:12" },
  { id: "queue-004", studentId: "stu-010", status: "No-show", time: "13:16" },
];

export function getCandidateSignal(studentId: string): CandidateSignal {
  return (
    candidateSignals[studentId] ?? {
      studentId,
      stage: "New",
      status: "Needs review",
      responseSpeed: "Response time not yet measured",
      lastActivity: "Recently visible in talent pool",
      roleFit: employerRoles[0].title,
      eventStatus: "Waiting",
      note: "Review project evidence and language fit before outreach.",
      matchReasons: ["Verified profile", "Portfolio evidence", "International student"],
      tags: ["Review", "Verified", "Portfolio"],
    }
  );
}

export function getRoleFit(student: Student, role: EmployerRole) {
  const roleSkills = new Set(role.requiredSkills.map((skill) => skill.toLowerCase()));
  const skillMatches = student.skills.filter((skill) => roleSkills.has(skill.toLowerCase()));
  const languageBoost =
    student.englishLevel === "Native" || student.englishLevel === "Fluent" ? 8 : 4;
  const mandarinBoost = student.hsk && student.hsk >= 5 ? 8 : 0;
  const majorBoost = role.preferredMajors.some((major) =>
    student.major.toLowerCase().includes(major.toLowerCase().split(" ")[0]),
  )
    ? 10
    : 0;
  const score = Math.min(96, 68 + skillMatches.length * 5 + languageBoost + mandarinBoost + majorBoost);
  return {
    score,
    label: score >= 88 ? "Best role fit" : score >= 78 ? "Good role fit" : "Adjacent role fit",
    reasons: [
      skillMatches.length > 0
        ? `${skillMatches.length} required skill${skillMatches.length > 1 ? "s" : ""} already evidenced`
        : "Skill evidence should be reviewed manually",
      languageBoost >= 8 ? "Strong English communication fit" : "Basic communication fit",
      mandarinBoost > 0 ? "Advanced Mandarin signal" : "Mandarin depth should be checked",
    ],
  };
}

export function getCategoryRoleCount(category: StudentCategory) {
  return employerRoles.filter((role) =>
    role.preferredMajors.some((major) => major.toLowerCase().includes(category.toLowerCase())),
  ).length;
}
