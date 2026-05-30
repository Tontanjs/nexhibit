export type MatchFactors = {
  categoryMatch: number;
  skillOverlap: number;
  languageFit: number;
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
  return (hash % 7) - 3;
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
}): { score: number; factors: MatchFactors } {
  const hiringCategories = new Set(input.employerHiringCategories.map(normalize));
  const categoryMatch = hiringCategories.has(normalize(input.studentCategory)) ? 25 : 0;
  const employerSkills = new Set(input.employerHiringSkills.map(normalize));
  const overlapCount = input.studentSkills.reduce((count, skill) => {
    return employerSkills.has(normalize(skill)) ? count + 1 : count;
  }, 0);
  const skillOverlap = Math.min(overlapCount, 6) * 4;
  const englishFit = input.studentEnglishLevel === "Native" || input.studentEnglishLevel === "Fluent" ? 6 : 0;
  const mandarinFit = input.studentHSK !== null && input.studentHSK >= 5 ? 8 : 0;
  const languageFit = englishFit + mandarinFit;
  const other = deterministicOffset(input.studentId, input.employerId);
  const score = clamp(50 + categoryMatch + skillOverlap + languageFit + other, 65, 95);
  return { score, factors: { categoryMatch, skillOverlap, languageFit, other } };
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
    explanations.push("Your English level supports international team communication.");
  } else {
    explanations.push("Language fit is modest; highlight projects that reduce communication risk.");
  }
  if (factors.other > 0) {
    explanations.push("Recent activity and profile signals slightly improve this match.");
  }
  return explanations;
}

export function getMatchTier(score: number): "Strong" | "Good" | "Possible" {
  if (score >= 88) return "Strong";
  if (score >= 75) return "Good";
  return "Possible";
}

export function getMatchColor(score: number): "success" | "warning" | "ink-400" {
  if (score >= 88) return "success";
  if (score >= 75) return "warning";
  return "ink-400";
}
