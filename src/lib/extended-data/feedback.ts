import type { EmployerFeedback } from "./types";

export const employerFeedback: EmployerFeedback[] = [
  {
    id: "fb-001",
    studentId: "stu-001",
    employerId: "emp-001",
    employerName: "Alibaba Cloud",
    recruiterTeam: "International Solutions Recruiting",
    eventName: "Spring Career Fair 2026",
    eventDate: "29 May 2026",
    createdAt: "2026-05-29T19:00:00+08:00",
    createdLabel: "2 hours ago",
    rating: 4.9,
    sentiment: "Very positive",
    interestLevel: "Strong follow-up",
    feedbackQuote:
      "The multilingual chatbot demonstrates practical cross-cultural product thinking. The fallback flow for unclear Mandarin-English repair requests was especially well considered.",
    recruiterSummary:
      "The portfolio connects technical delivery with a credible international-student problem. The team would like to hear a concise walkthrough of the decision logic and testing approach.",
    keyStrengths: ["Technical portfolio", "Cross-cultural UX", "Product thinking"],
    evidenceMentioned: [
      "Multilingual chatbot",
      "Fallback flow",
      "Mandarin-English repair workflow",
    ],
    relatedProject: "Multilingual campus support chatbot",
    recommendedNextStep:
      "Prepare a 5-minute technical walkthrough and reply to the recruiter within 24 hours.",
    suggestedReply:
      "Thank you for reviewing the chatbot workflow. I can share a five-minute walkthrough covering the fallback logic, testing approach, and the product decisions made for multilingual repair requests.",
    tags: ["Technical", "Cross-cultural UX", "This event"],
    status: "new",
    visibleToStudent: true,
  },
  {
    id: "fb-002",
    studentId: "stu-001",
    employerId: "emp-004",
    employerName: "Bosch China",
    recruiterTeam: "Digital Engineering Campus Team",
    eventName: "Spring Career Fair 2026",
    eventDate: "29 May 2026",
    createdAt: "2026-05-28T15:45:00+08:00",
    createdLabel: "1 day ago",
    rating: 4.8,
    sentiment: "Very positive",
    interestLevel: "Interview-ready",
    feedbackQuote:
      "The explanation of TypeScript and React tradeoffs was clear and grounded in the needs of international students rather than code alone.",
    recruiterSummary:
      "The campus navigator showed user-centered engineering judgment and a strong ability to explain technical decisions. More quantified outcomes would make the evidence stronger.",
    keyStrengths: [
      "User-centered engineering",
      "Communication clarity",
      "Frontend architecture",
    ],
    improvementFocus: ["Quantify technical decisions and user impact"],
    evidenceMentioned: [
      "Campus navigator",
      "TypeScript tradeoffs",
      "React component architecture",
    ],
    relatedProject: "International student campus navigator",
    recommendedNextStep:
      "Add one measurable project outcome and prepare an architecture explanation for an interview.",
    suggestedReply:
      "Thank you for the specific feedback. I am adding a measurable usability outcome to the campus navigator case study and can explain the architecture and tradeoffs in a short interview walkthrough.",
    tags: ["Technical", "Communication", "Needs improvement", "This event"],
    status: "reviewed",
    visibleToStudent: true,
  },
  {
    id: "fb-003",
    studentId: "stu-001",
    employerId: "emp-005",
    employerName: "Siemens China",
    recruiterTeam: "Smart Infrastructure Early Careers",
    eventName: "Spring Career Fair 2026",
    eventDate: "29 May 2026",
    createdAt: "2026-05-27T14:30:00+08:00",
    createdLabel: "2 days ago",
    rating: 4.7,
    sentiment: "Positive",
    interestLevel: "Strong follow-up",
    feedbackQuote:
      "The scholarship tracker shows a disciplined service-design approach: complex notices become clear actions students can complete with confidence.",
    recruiterSummary:
      "The candidate communicates structured problem solving well and can translate administrative complexity into a usable service experience.",
    keyStrengths: [
      "Service design",
      "Communication clarity",
      "Structured problem solving",
    ],
    evidenceMentioned: [
      "Scholarship tracker",
      "Notice-to-action workflow",
      "Student task prioritization",
    ],
    relatedProject: "Scholarship deadline tracker",
    recommendedNextStep:
      "Prepare a short service-design explanation that connects the workflow to stakeholder and student needs.",
    suggestedReply:
      "Thank you for highlighting the service-design work. I would be glad to share how I mapped university notices into student tasks and balanced stakeholder requirements with clarity for international students.",
    tags: ["Communication", "Service design", "This event"],
    status: "reviewed",
    visibleToStudent: true,
  },
  {
    id: "fb-004",
    studentId: "stu-001",
    employerId: "emp-007",
    employerName: "Geek+ Robotics",
    recruiterTeam: "Product Quality and Deployment",
    eventName: "Spring Career Fair 2026",
    eventDate: "29 May 2026",
    createdAt: "2026-05-26T16:10:00+08:00",
    createdLabel: "3 days ago",
    rating: 4.1,
    sentiment: "Constructive",
    interestLevel: "Worth monitoring",
    feedbackQuote:
      "The testing mindset is relevant to deployment work, although Mandarin confidence is not yet sufficient for unsupervised client calls.",
    recruiterSummary:
      "The candidate identifies multilingual support failure cases carefully and shows good QA instincts. A practical language-support plan would reduce client-facing delivery risk.",
    keyStrengths: ["QA mindset", "Product testing", "Risk identification"],
    improvementFocus: [
      "Mandarin client-call confidence",
      "Bilingual testing examples",
    ],
    evidenceMentioned: [
      "Escalation test cases",
      "Language-tone checks",
      "Support handoff workflow",
    ],
    relatedProject: "Multilingual support quality plan",
    recommendedNextStep:
      "Prepare two bilingual testing examples and explain how Mandarin support would be escalated during client calls.",
    suggestedReply:
      "Thank you for the constructive assessment. I am preparing bilingual testing examples and a clear escalation plan for situations that require advanced Mandarin support.",
    tags: ["Technical", "Communication", "Needs improvement", "This event"],
    status: "new",
    visibleToStudent: true,
  },
  {
    id: "fb-005",
    studentId: "stu-001",
    employerId: "emp-006",
    employerName: "SenseTime",
    recruiterTeam: "AI Product Evaluation",
    eventName: "Portfolio Review Week 2026",
    eventDate: "23 May 2026",
    createdAt: "2026-05-23T13:40:00+08:00",
    createdLabel: "6 days ago",
    rating: 4.8,
    sentiment: "Very positive",
    interestLevel: "Worth monitoring",
    feedbackQuote:
      "The prompt-testing notes cover language tone, escalation, and user trust with unusual practical depth for a student prototype.",
    recruiterSummary:
      "The evaluation work demonstrates disciplined edge-case analysis and a mature view of responsible product behavior.",
    keyStrengths: ["QA mindset", "AI evaluation", "Product judgment"],
    improvementFocus: ["Add a concise evaluation scorecard"],
    evidenceMentioned: [
      "Prompt-testing notes",
      "Tone edge cases",
      "Escalation criteria",
    ],
    relatedProject: "AI support prompt evaluation",
    recommendedNextStep:
      "Convert the test notes into a one-page evaluation scorecard before the next conversation.",
    suggestedReply:
      "Thank you for reviewing the evaluation notes. I am consolidating the edge cases into a concise scorecard and can present the criteria used for tone, escalation, and user trust.",
    tags: ["Technical", "Needs improvement"],
    status: "reviewed",
    visibleToStudent: true,
  },
  {
    id: "fb-006",
    studentId: "stu-001",
    employerId: "emp-008",
    employerName: "Tencent Global",
    recruiterTeam: "International Product Experience",
    eventName: "Portfolio Review Week 2026",
    eventDate: "22 May 2026",
    createdAt: "2026-05-22T16:15:00+08:00",
    createdLabel: "1 week ago",
    rating: 4.7,
    sentiment: "Positive",
    interestLevel: "Worth monitoring",
    feedbackQuote:
      "The profile demonstrates strong frontend fundamentals and thoughtful interaction quality across both desktop and mobile states.",
    recruiterSummary:
      "The work has credible product polish and a consistent international-user perspective. A clear impact metric would strengthen the hiring signal.",
    keyStrengths: ["Frontend quality", "Product polish", "Cross-cultural UX"],
    improvementFocus: ["Add one quantified portfolio outcome"],
    evidenceMentioned: [
      "Responsive profile flow",
      "Accessible interaction states",
      "Mobile navigation",
    ],
    relatedProject: "NEXHIBIT student profile",
    recommendedNextStep:
      "Add one quantified outcome and document the accessibility decisions behind the interaction system.",
    suggestedReply:
      "Thank you for the detailed review. I am adding a quantified outcome and a short accessibility rationale to the profile case study.",
    tags: ["Technical", "Communication", "Needs improvement"],
    status: "reviewed",
    visibleToStudent: true,
  },
];
