export type Conversation = {
  id: string;
  participantStudentId: string;
  participantEmployerId: string;
  lastMessageAt: string;
  unreadCount: number;
  archived: boolean;
  messages: Message[];
};

export type Message = {
  id: string;
  senderType: "student" | "employer";
  text: string;
  sentAt: string;
  read: boolean;
};

export type Notification = {
  id: string;
  type: "profile_view" | "shortlist" | "message" | "feedback" | "event_reminder" | "system";
  recipientType: "student" | "employer";
  recipientId: string;
  actorId?: string;
  text: string;
  timestamp: string;
  isoTimestamp: string;
  read: boolean;
  link?: string;
};

export type VisitorEvent = {
  id: string;
  studentId: string;
  employerId: string;
  visitedAt: string;
  isoTimestamp: string;
  status: "viewing" | "viewed" | "saved" | "left_feedback" | "messaged";
  duration?: number;
};

export type ActivityEvent = {
  id: string;
  userId: string;
  userType: "student" | "employer";
  type:
    | "profile_view"
    | "profile_save"
    | "message_sent"
    | "message_received"
    | "feedback_given"
    | "feedback_received"
    | "slot_booked"
    | "interview_scheduled";
  text: string;
  timestamp: string;
  isoTimestamp: string;
};

export type MatchScore = {
  studentId: string;
  employerId: string;
  score: number;
  factors: {
    categoryMatch: number;
    skillOverlap: number;
    languageFit: number;
    other: number;
  };
};

export type TimeSlot = {
  id: string;
  eventId: string;
  category: "Business" | "Engineering" | "Health" | "Language" | "Other";
  startTime: string;
  endTime: string;
  boothNumber: string;
  available: boolean;
  bookedBy?: string;
};

export type ChartDataPoint = {
  label: string;
  value: number;
};

export type TimeSeriesPoint = {
  date: string;
  value: number;
};

export type ApplicationStatus = {
  id: string;
  studentId: string;
  employerId: string;
  stage: "profile_viewed" | "shortlisted" | "messaged" | "interview_scheduled" | "offer" | "declined";
  lastUpdate: string;
  isoTimestamp: string;
  nextStep?: string;
};

export type EmployerFeedback = {
  id: string;
  studentId: string;
  employerId: string;
  employerName: string;
  recruiterTeam: string;
  eventName: string;
  eventDate?: string;
  createdAt: string;
  createdLabel: string;
  rating: number;
  sentiment: "Very positive" | "Positive" | "Constructive" | "Needs follow-up";
  interestLevel: "Strong follow-up" | "Interview-ready" | "Worth monitoring" | "Needs improvement";
  feedbackQuote: string;
  recruiterSummary: string;
  keyStrengths: string[];
  improvementFocus?: string[];
  evidenceMentioned: string[];
  relatedProject?: string;
  recommendedNextStep: string;
  suggestedReply?: string;
  tags: string[];
  status: "new" | "reviewed" | "addressed";
  visibleToStudent: boolean;
};
