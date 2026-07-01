export type StudentCategory = "Business" | "Engineering" | "Health" | "Language" | "Other";
export type StudentPhotoStatus = "pending" | "approved" | "rejected";
export type StudentPhotoSource = "studentUpload" | "adminUpload" | "demoGenerated";
export type StudentPhotoVisibility = "public" | "verifiedEmployers" | "private";

export type OneToThree<T> = [T] | [T, T] | [T, T, T];
export type TwoToThree<T> = [T, T] | [T, T, T];
export type FourToSix<T> = [T, T, T, T] | [T, T, T, T, T] | [T, T, T, T, T, T];
export type FourToSeven<T> =
  | [T, T, T, T]
  | [T, T, T, T, T]
  | [T, T, T, T, T, T]
  | [T, T, T, T, T, T, T];
export type NonEmptyList<T> = [T, ...T[]];

export type Student = {
  id: string;
  name: string;
  initials: string;
  nationality: string;
  nationalityFlag: string;
  year: 1 | 2 | 3 | 4;
  major: string;
  category: StudentCategory;
  gpa: number;
  classRanking: string;
  hsk: 1 | 2 | 3 | 4 | 5 | 6 | null;
  englishLevel: "Native" | "Fluent" | "Proficient" | "Intermediate";
  otherLanguages: string[];
  skills: FourToSeven<string>;
  projects: TwoToThree<Project>;
  bio: string;
  headline: string;
  photoUrl?: string;
  photoStatus?: StudentPhotoStatus;
  photoSource?: StudentPhotoSource;
  photoVisibility?: StudentPhotoVisibility;
  photoConsentAt?: string;
  photoConsentVersion?: string;
  verified: true;
  lookingFor: "Internship" | "Full-time" | "Both";
  availableFrom: string;
  preferredLocations: string[];
  activities: string[];
  awards: OneToThree<Award>;
  coursesCompleted: number;
  responseTime: string;
  lastActive: string;
  profileStrength: number;
  videoPitchUrl?: string;
  voiceIntroUrl?: string;
  namePronunciationUrl?: string;
  workAuth?: {
    regions: string[];
    notes?: string;
  };
  languages?: StudentLanguage[];
  openTo?: {
    internship: boolean;
    fullTime: boolean;
    partTime: boolean;
    remote: boolean;
    freelance: boolean;
  };
  fieldVisibility?: Record<string, "public" | "employerOnly" | "hidden">;
  profileMode?: "public" | "employerOnly" | "hidden";
};

export type StudentLanguage = {
  name: string;
  cefr?: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  test?: "HSK" | "IELTS" | "TOEFL" | "TOPIK" | "Other";
  score?: string;
  proofFile?: string;
};

export type Project = {
  title: string;
  description: string;
  tags: string[];
  link?: string;
};

export type Award = {
  title: string;
  year: number;
  description: string;
};

export type Employer = {
  id: string;
  name: string;
  logoLetter: string;
  logoColor: string;
  industry: string;
  size: "Startup (1-50)" | "Mid-size (51-500)" | "Large (501-5000)" | "Enterprise (5000+)";
  location: string;
  description: string;
  hiringCategories: NonEmptyList<StudentCategory>;
  hiringSkills: FourToSix<string>;
  verified: true;
  type: "Chinese" | "Multinational" | "Startup";
  yearFounded: number;
  website: string;
  activeSince: string;
};

export type EventCategorySlot = {
  name: StudentCategory;
  slotsTotal: number;
  slotsBooked: number;
};

export type EventCategorySlots = [
  EventCategorySlot,
  EventCategorySlot,
  EventCategorySlot,
  EventCategorySlot,
  EventCategorySlot,
];

type EventBase = {
  id: string;
  slug: string;
  title: string;
  cycle: "Spring" | "Fall";
  year: number;
  date: string;
  isoDate: string;
  location: string;
  description: string;
  categories: EventCategorySlots;
  totalSlots: number;
  bookedSlots: number;
  registeredEmployers: number;
};

export type Event =
  | (EventBase & {
      status: "upcoming" | "ongoing";
      satisfactionScore?: never;
      matchesGenerated?: never;
    })
  | (EventBase & {
      status: "past";
      satisfactionScore: number;
      matchesGenerated: number;
    });

export type Quote = {
  id: string;
  text: string;
  authorCode: string;
  authorContext: string;
  mood: "frustrated" | "hopeful";
};

export type PlatformStats = {
  studentsRegistered: number;
  employersOnboarded: number;
  successfulMatches: number;
  eventsPerYear: number;
  countriesRepresented: number;
  verificationRate: number;
  averageResponseTime: string;
  averageDaysToOffer: number;
};
