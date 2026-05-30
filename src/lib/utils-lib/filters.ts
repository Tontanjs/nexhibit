export type StudentFilterCriteria = {
  searchQuery?: string;
  categories?: string[];
  skills?: string[];
  years?: (1 | 2 | 3 | 4)[];
  englishLevels?: string[];
  hskMin?: number;
  gpaMin?: number;
  gpaMax?: number;
  lookingFor?: ("Internship" | "Full-time" | "Both")[];
};

export type SortBy = "match_desc" | "match_asc" | "name_asc" | "newest" | "gpa_desc" | "year_desc";

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function includesNormalized(values: string[] | undefined, candidate: string) {
  if (!values || values.length === 0) return true;
  const normalizedValues = new Set(values.map(normalize));
  return normalizedValues.has(normalize(candidate));
}

export function filterStudents<
  T extends {
    name: string;
    major?: string;
    nationality?: string;
    category: string;
    skills: string[];
    year: number;
    englishLevel: string;
    hsk: number | null;
    gpa: number;
    lookingFor: string;
    bio?: string;
    headline?: string;
  },
>(students: T[], criteria: StudentFilterCriteria): T[] {
  const query = normalize(criteria.searchQuery ?? "");
  return students.filter((student) => {
    const searchableText = [
      student.name,
      student.major ?? "",
      student.nationality ?? "",
      student.headline ?? "",
      student.bio ?? "",
      ...student.skills,
    ]
      .join(" ")
      .toLowerCase();
    const skillMatches =
      !criteria.skills ||
      criteria.skills.length === 0 ||
      criteria.skills.some((skill) =>
        student.skills.some((s) => normalize(s) === normalize(skill)),
      );
    return (
      (query.length === 0 || searchableText.includes(query)) &&
      includesNormalized(criteria.categories, student.category) &&
      skillMatches &&
      (!criteria.years || criteria.years.length === 0 || criteria.years.includes(student.year as 1 | 2 | 3 | 4)) &&
      includesNormalized(criteria.englishLevels, student.englishLevel) &&
      (criteria.hskMin === undefined || (student.hsk !== null && student.hsk >= criteria.hskMin)) &&
      (criteria.gpaMin === undefined || student.gpa >= criteria.gpaMin) &&
      (criteria.gpaMax === undefined || student.gpa <= criteria.gpaMax) &&
      includesNormalized(criteria.lookingFor, student.lookingFor)
    );
  });
}

function recencyRank(lastActive?: string) {
  if (!lastActive) return Number.MAX_SAFE_INTEGER;
  const value = Number.parseInt(lastActive, 10);
  if (Number.isNaN(value)) return Number.MAX_SAFE_INTEGER - 1;
  if (lastActive.includes("minute")) return value;
  if (lastActive.includes("hour")) return value * 60;
  if (lastActive.includes("day")) return value * 60 * 24;
  return Number.MAX_SAFE_INTEGER - 1;
}

export function sortStudents<
  T extends {
    id?: string;
    name: string;
    gpa: number;
    year: number;
    lastActive?: string;
  },
>(students: T[], sortBy: SortBy, matchScoreMap?: Map<string, number>): T[] {
  const next = [...students];
  return next.sort((a, b) => {
    if (sortBy === "name_asc") return a.name.localeCompare(b.name);
    if (sortBy === "gpa_desc") return b.gpa - a.gpa;
    if (sortBy === "year_desc") return b.year - a.year;
    if (sortBy === "newest") return recencyRank(a.lastActive) - recencyRank(b.lastActive);
    if (sortBy === "match_desc" || sortBy === "match_asc") {
      const aScore = a.id ? matchScoreMap?.get(a.id) ?? 0 : 0;
      const bScore = b.id ? matchScoreMap?.get(b.id) ?? 0 : 0;
      return sortBy === "match_desc" ? bScore - aScore : aScore - bScore;
    }
    return 0;
  });
}
