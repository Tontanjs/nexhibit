import type { PlanTier, UserType } from "@/lib/billing/types";

const freeStudentFeatures = [
  "Basic profile (3 projects max)",
  "Browse all events",
  "Apply to 5 employers/month",
  "Basic match score",
  "1 booth booking per event",
];

const plusStudentFeatures = [
  ...freeStudentFeatures,
  "Unlimited projects",
  "Unlimited applications",
  "See who viewed your profile",
  "Profile boost 1x/week",
  "Advanced filters",
  "All 4 match factors visible",
  "Application analytics",
];

const proStudentFeatures = [
  ...plusStudentFeatures,
  "Priority booth booking (24h before public)",
  "Profile boost 3x/week",
  "Rule-based profile suggestions",
  "Direct message any employer",
  "Outreach templates in 5 languages",
  "Career path guide",
  "Resume export (PDF + Chinese translation)",
  "Custom URL",
];

const maxStudentFeatures = [
  ...proStudentFeatures,
  "1-on-1 career coaching session (1/month)",
  "Professional CV/portfolio review (monthly)",
  "Priority review workflow demo",
  "Early access to new features",
  "Premium booth at event (priority location)",
  "Direct calendar booking by employers",
  "Demo job match alerts",
  "Illustrative salary ranges",
];

const featureList = (labels: string[], highlights: string[] = []) =>
  labels.map((label) => ({
    label,
    included: true,
    highlight: highlights.includes(label),
  }));

export const STUDENT_PLANS: PlanTier[] = [
  {
    id: "student_free",
    name: "Free",
    tagline: "Start getting seen",
    userType: "student",
    level: 0,
    monthlyPriceCny: null,
    yearlyPriceCny: null,
    features: featureList(freeStudentFeatures),
    limits: { projects: 3, applications: 5, messages: 10, profileBoosts: 0 },
    cta: "Get started free",
  },
  {
    id: "student_plus",
    name: "Plus",
    tagline: "For active job-seekers",
    userType: "student",
    level: 1,
    monthlyPriceCny: 29,
    yearlyPriceCny: 249,
    yearlySavingsPercent: 28,
    features: featureList(plusStudentFeatures, plusStudentFeatures.slice(freeStudentFeatures.length)),
    limits: { projects: -1, applications: -1, messages: -1, profileBoosts: 4 },
    cta: "Upgrade to Plus",
  },
  {
    id: "student_pro",
    name: "Pro",
    tagline: "For serious hunters",
    userType: "student",
    level: 2,
    monthlyPriceCny: 69,
    yearlyPriceCny: 599,
    semesterPriceCny: 199,
    yearlySavingsPercent: 28,
    popular: true,
    features: featureList(proStudentFeatures, proStudentFeatures.slice(plusStudentFeatures.length)),
    limits: { projects: -1, applications: -1, messages: -1, profileBoosts: 12 },
    cta: "Go Pro",
  },
  {
    id: "student_max",
    name: "Max",
    tagline: "Maximum visibility",
    userType: "student",
    level: 3,
    monthlyPriceCny: 149,
    yearlyPriceCny: 1299,
    semesterPriceCny: 399,
    lifetimePriceCny: 899,
    yearlySavingsPercent: 27,
    features: featureList(maxStudentFeatures, maxStudentFeatures.slice(proStudentFeatures.length)),
    limits: { projects: -1, applications: -1, messages: -1, profileBoosts: -1 },
    cta: "Go Max",
  },
];

export const EMPLOYER_PLANS: PlanTier[] = [
  {
    id: "employer_free",
    name: "Free",
    tagline: "Try the talent floor",
    userType: "employer",
    level: 0,
    monthlyPriceCny: null,
    yearlyPriceCny: null,
    features: featureList([
      "Browse 30 profiles/month",
      "1 event/year",
      "5 messages/month",
      "Basic match score",
    ]),
    limits: { profiles: 30, events: 1, messages: 5, shortlist: 10, seats: 1 },
    cta: "Start free",
  },
  {
    id: "employer_starter",
    name: "Starter",
    tagline: "Structured campus hiring",
    userType: "employer",
    level: 1,
    monthlyPriceCny: null,
    yearlyPriceCny: 3999,
    features: featureList([
      "Unlimited browse",
      "All events",
      "50 messages/month",
      "100 shortlist slots",
      "1 team user",
    ], ["Unlimited browse", "All events"]),
    limits: { profiles: -1, events: -1, messages: 50, shortlist: 100, seats: 1 },
    cta: "Start hiring",
  },
  {
    id: "employer_growth",
    name: "Growth",
    tagline: "For active hiring teams",
    userType: "employer",
    level: 2,
    monthlyPriceCny: null,
    yearlyPriceCny: 12999,
    popular: true,
    features: featureList([
      "Unlimited messages",
      "Smart Match Pro",
      "QR scanner",
      "Advanced analytics",
      "5 team users",
      "Branded employer page",
      "CSV export",
    ], ["Smart Match Pro", "QR scanner", "Advanced analytics"]),
    limits: { profiles: -1, events: -1, messages: -1, shortlist: -1, seats: 5 },
    cta: "Grow your team",
  },
  {
    id: "employer_scale",
    name: "Scale",
    tagline: "Premium fair presence",
    userType: "employer",
    level: 3,
    monthlyPriceCny: null,
    yearlyPriceCny: 35999,
    features: featureList([
      "Premium branded booth",
      "Featured employer placement",
      "Dedicated account manager",
      "Talent pipeline reports",
      "API access",
      "Unlimited team users",
      "Priority support 1h SLA",
    ], ["Premium branded booth", "Featured employer placement", "Dedicated account manager"]),
    limits: { profiles: -1, events: -1, messages: -1, shortlist: -1, seats: -1 },
    cta: "Scale up",
  },
  {
    id: "employer_enterprise",
    name: "Enterprise",
    tagline: "Custom campus partnership",
    userType: "employer",
    level: 4,
    monthlyPriceCny: null,
    yearlyPriceCny: null,
    features: featureList([
      "Custom integration",
      "White-label experience",
      "Multi-region hiring",
      "Strategic partnership",
      "Compliance package",
      "Dedicated success manager",
      "Quarterly business reviews",
    ], ["Custom integration", "Compliance package", "Dedicated success manager"]),
    limits: { profiles: -1, events: -1, messages: -1, shortlist: -1, seats: -1 },
    cta: "Contact sales",
  },
];

export const UNIVERSITY_PLANS: PlanTier[] = [
  {
    id: "uni_pilot",
    name: "Pilot",
    tagline: "Launch one focused fair",
    userType: "university",
    level: 1,
    monthlyPriceCny: null,
    yearlyPriceCny: 150000,
    features: featureList([
      "1 event/year",
      "Up to 500 students",
      "Basic admin workspace",
      "Email support",
    ]),
    limits: { events: 1, students: 500, admins: 3 },
    cta: "Start pilot",
  },
  {
    id: "uni_standard",
    name: "Standard",
    tagline: "Run the international talent program",
    userType: "university",
    level: 2,
    monthlyPriceCny: null,
    yearlyPriceCny: 300000,
    popular: true,
    features: featureList([
      "2 events/year",
      "Unlimited students",
      "Full admin and analytics",
      "Verification integration concept",
      "Phone support",
      "Quarterly review",
    ], ["Unlimited students", "Verification integration concept", "Quarterly review"]),
    limits: { events: 2, students: -1, admins: 10 },
    cta: "Get standard",
  },
  {
    id: "uni_enterprise",
    name: "Enterprise",
    tagline: "Multi-campus career ecosystem",
    userType: "university",
    level: 4,
    monthlyPriceCny: null,
    yearlyPriceCny: null,
    features: featureList([
      "Custom price from ¥500K+",
      "Unlimited events",
      "Multi-campus deployment",
      "Custom branding",
      "Dedicated success manager",
      "API access",
      "Annual strategy session",
    ], ["Multi-campus deployment", "Custom branding", "Dedicated success manager"]),
    limits: { events: -1, students: -1, admins: -1 },
    cta: "Contact sales",
  },
];

export const ALL_PLANS: PlanTier[] = [
  ...STUDENT_PLANS,
  ...EMPLOYER_PLANS,
  ...UNIVERSITY_PLANS,
];

export function getPlanById(id: string) {
  return ALL_PLANS.find((plan) => plan.id === id);
}

export function getPlansByUserType(type: UserType) {
  return ALL_PLANS.filter((plan) => plan.userType === type);
}

export function getPopularPlan(type: UserType) {
  return getPlansByUserType(type).find((plan) => plan.popular) ?? getPlansByUserType(type)[0];
}
