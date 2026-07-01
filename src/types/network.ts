export type MentorAvailability = "Available" | "Limited" | "Busy";
export type SessionFormat = "Video call" | "Async messages" | "Both";

export type AlumniMentor = {
  id: string;
  firstName: string;
  initials: string;
  nationality: string;
  nationalityFlag: string;
  graduationYear: number;
  major: string;
  currentCompany: string;
  currentPosition: string;
  location: string;
  languages: string[];
  specialties: string[];
  industry: string;
  companyType: "Chinese firm" | "MNC" | "Startup";
  availability: MentorAvailability;
  sessionFormat: SessionFormat;
  responseTime: string;
  bio: string[];
  careerTimeline: { year: number; role: string; company: string }[];
  helpAreas: string[];
  reviews: { quote: string; menteeLabel: string }[];
};

export type MentorshipRequest = {
  id: string;
  mentorId: string;
  purpose: string;
  preferredFormat: SessionFormat;
  availability: string;
  submittedAt: string;
};

export type ResumeFormat = "Chinese-style" | "Western-style" | "Asian-style";
export type CompanyTarget = "Chinese firm" | "MNC" | "Startup" | "Any";
export type ReviewFocusArea = "Content" | "Format" | "Language" | "Cultural fit";

export type ResumeReviewRequest = {
  id: string;
  filename: string;
  format: ResumeFormat;
  target: CompanyTarget;
  focusAreas: ReviewFocusArea[];
  submittedAt: string;
  status: "waiting" | "reviewed";
};

export type ResumeReviewFeedback = {
  id: string;
  requestId: string;
  reviewerLabel: string;
  content: string;
  format: string;
  language: string;
  culturalFit: string;
  overallRecommendation: "Strong" | "Good" | "Needs work";
  submittedAt: string;
};

export type CompanyInsight = {
  id: string;
  name: string;
  logoLetter: string;
  logoColor: string;
  industry: string;
  locations: string[];
  alumniCount: number;
  ratings: {
    internationalFriendliness: number;
    workLifeBalance: number;
    careerGrowth: number;
    compensationTransparency: number;
  };
  testimonials: { quote: string; authorLabel: string; context: string }[];
  applicationTips: string[];
  interviewQuestions: string[];
  languageExpectation: string;
  visaSponsorshipHistory: string;
  salaryRange: string;
  type: "Chinese firm" | "MNC" | "Startup";
};

export type QACategory =
  | "Application Process"
  | "Interview Prep"
  | "Visa & Legal"
  | "Cultural Adaptation"
  | "Salary Negotiation"
  | "General";

export type CommunityQuestion = {
  id: string;
  title: string;
  body: string;
  askerHandle: string;
  category: QACategory;
  language: string;
  tags: string[];
  upvotes: number;
  postedAt: string;
  answers: CommunityAnswer[];
};

export type CommunityAnswer = {
  id: string;
  questionId: string;
  body: string;
  authorHandle: string;
  upvotes: number;
  postedAt: string;
};
