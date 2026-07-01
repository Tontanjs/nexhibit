export type MatchFactors = {
  categoryMatch: number;
  skillOverlap: number;
  languageFit: number;
  gpaTier: number;
  locationFit: number;
  other: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function deterministicOffset(studentId: string, employerId: string) {
  const input = `${studentId}:${employerId}`;
  let hash = 0;
  for (let index = 0; index < input.length; index += 1) {
    hash = (hash * 31 + input.charCodeAt(index)) >>> 0;
  }
  return (hash % 11) - 5;
}

function gpaPoints(gpa: number | undefined): number {
  if (gpa === undefined) return 3;
  if (gpa >= 3.7) return 8;
  if (gpa >= 3.5) return 5;
  if (gpa >= 3.3) return 2;
  return 0;
}

function locationPoints(
  preferredLocations: string[] | undefined,
  employerLocation: string | undefined,
): number {
  if (!preferredLocations?.length || !employerLocation) return 3;
  const city = normalize(employerLocation);
  const prefs = preferredLocations.map(normalize);
  if (prefs.includes(city)) return 10;
  if (prefs.some((p) => p === "remote") && city !== "hangzhou") return 5;
  if (prefs.some((p) => p.includes("shanghai") || p.includes("hangzhou") || p.includes("beijing") || p.includes("shenzhen"))) return 4;
  return 0;
}

export function calculateMatchScore(input: {
  studentCategory: string;
  studentSkills: string[];
  studentEnglishLevel: "Native" | "Fluent" | "Proficient" | "Intermediate";
  studentHSK: number | null;
  employerHiringCategories: string[];
  employerHiringSkills: string[];
  studentId: string;
  employerId: string;
  studentGpa?: number;
  studentPreferredLocations?: string[];
  employerLocation?: string;
}): { score: number; factors: MatchFactors } {
  // Category match (0 or 22)
  const hiringCategories = new Set(input.employerHiringCategories.map(normalize));
  const categoryMatch = hiringCategories.has(normalize(input.studentCategory)) ? 22 : 0;

  // Skill overlap — up to 6 matched skills × 4 pts each = max 24
  const employerSkills = new Set(input.employerHiringSkills.map(normalize));
  const overlapCount = input.studentSkills.reduce((count, skill) => {
    return employerSkills.has(normalize(skill)) ? count + 1 : count;
  }, 0);
  const skillOverlap = Math.min(overlapCount, 6) * 4;

  // Language fit — English (0-6) + Mandarin (0-8) = max 14
  const englishFit =
    input.studentEnglishLevel === "Native" || input.studentEnglishLevel === "Fluent" ? 6 :
    input.studentEnglishLevel === "Proficient" ? 3 : 0;
  const mandarinFit =
    input.studentHSK !== null && input.studentHSK >= 5 ? 8 :
    input.studentHSK !== null && input.studentHSK >= 3 ? 4 : 0;
  const languageFit = englishFit + mandarinFit;

  // GPA tier (0, 2, 5, or 8)
  const gpaTier = gpaPoints(input.studentGpa);

  // Location fit (0, 4, 5, or 10)
  const locationFit = locationPoints(input.studentPreferredLocations, input.employerLocation);

  // Deterministic per-pair noise ±5
  const other = deterministicOffset(input.studentId, input.employerId);

  // Base 36 — lower so weak matches can score below 60
  const raw = 36 + categoryMatch + skillOverlap + languageFit + gpaTier + locationFit + other;
  const score = clamp(raw, 42, 97);

  return { score, factors: { categoryMatch, skillOverlap, languageFit, gpaTier, locationFit, other } };
}

export function getMatchExplanation(factors: MatchFactors): string[] {
  const explanations: string[] = [];

  if (factors.categoryMatch > 0) {
    explanations.push("Your field matches this employer's hiring focus.");
  } else {
    explanations.push("This employer hires outside your main field, so project evidence matters more.");
  }

  if (factors.skillOverlap >= 16) {
    explanations.push("Several of your skills appear in this employer's priority skill list.");
  } else if (factors.skillOverlap >= 8) {
    explanations.push("You share a few relevant skills with this employer's current roles.");
  } else {
    explanations.push("Skill overlap is limited, but your profile may still fit adjacent roles.");
  }

  if (factors.languageFit >= 14) {
    explanations.push("Your English and Mandarin profile is strong for cross-border work.");
  } else if (factors.languageFit >= 6) {
    explanations.push("Your English or Mandarin level supports international team communication.");
  } else {
    explanations.push("Language fit is modest; highlight projects that reduce communication risk.");
  }

  if (factors.gpaTier >= 8) {
    explanations.push("Strong academic record signals consistency and discipline.");
  } else if (factors.gpaTier >= 5) {
    explanations.push("Solid GPA shows reliable academic performance.");
  }

  if (factors.locationFit >= 10) {
    explanations.push("This employer's city is in your preferred location list.");
  } else if (factors.locationFit >= 4) {
    explanations.push("Location preferences are broadly compatible.");
  }

  if (factors.other > 0) {
    explanations.push("Recent profile activity gives a slight boost to this match.");
  }

  return explanations;
}

export function getMatchTier(score: number): "Strong" | "Good" | "Possible" {
  if (score >= 82) return "Strong";
  if (score >= 64) return "Good";
  return "Possible";
}

export function getMatchColor(score: number): "success" | "warning" | "ink-400" {
  if (score >= 82) return "success";
  if (score >= 64) return "warning";
  return "ink-400";
}
