export type SkillTaxonomy = {
  category: "technical" | "language" | "soft" | "domain";
  group: string;
  skills: string[];
};

export const SKILL_TAXONOMY: SkillTaxonomy[] = [
  {
    category: "technical",
    group: "Programming",
    skills: ["TypeScript", "React", "Python", "Java", "SQL", "Embedded C", "API Integration"],
  },
  {
    category: "technical",
    group: "Data",
    skills: ["Data Visualization", "Machine Learning", "Pandas", "Tableau", "Excel Modeling", "Survey Analysis"],
  },
  {
    category: "technical",
    group: "Design",
    skills: ["Figma", "UX Writing", "Motion Graphics", "Brand Systems", "Service Design", "Adobe Illustrator"],
  },
  {
    category: "language",
    group: "Languages",
    skills: ["Mandarin", "English", "Russian", "Arabic", "Thai", "Vietnamese", "Indonesian", "Mongolian"],
  },
  {
    category: "soft",
    group: "Communication",
    skills: ["Technical Presentations", "Public Speaking", "Customer Interviews", "Workshop Facilitation", "Business Writing"],
  },
  {
    category: "domain",
    group: "Business",
    skills: ["Market Research", "E-commerce Operations", "CRM Segmentation", "Supplier Coordination", "Social Commerce"],
  },
  {
    category: "domain",
    group: "Engineering",
    skills: ["SolidWorks", "Arduino", "PLC Basics", "Circuit Simulation", "Robotics", "Quality Analysis"],
  },
  {
    category: "domain",
    group: "Healthcare",
    skills: ["Pharmacology", "Public Health", "Clinical Research Basics", "Regulatory Research", "Lab Documentation"],
  },
  {
    category: "domain",
    group: "Research",
    skills: ["Literature Review", "Field Research", "Interviewing", "Terminology Management", "Evidence Review"],
  },
];

export function getAllSkills(): string[] {
  return Array.from(new Set(SKILL_TAXONOMY.flatMap((group) => group.skills))).sort((a, b) => a.localeCompare(b));
}

export const COMMON_EMPLOYER_SKILLS: string[] = [
  "Mandarin",
  "English",
  "Python",
  "Market Research",
  "Data Analysis",
  "React",
  "E-commerce Operations",
  "Technical Documentation",
  "Localization",
  "Supplier Coordination",
  "Figma",
  "SQL",
];
