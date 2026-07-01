export type SkillDemand = {
  skill: string;
  demand: number;
};

export type LearningResource = {
  id: string;
  provider: "Coursera" | "edX" | "ZJUT" | "LinkedIn Learning";
  title: string;
  focus: string;
};

export const skillDemand: SkillDemand[] = [
  { skill: "TypeScript", demand: 87 },
  { skill: "Python", demand: 72 },
  { skill: "Figma", demand: 65 },
  { skill: "SQL", demand: 60 },
  { skill: "Mandarin C1+", demand: 78 },
  { skill: "Data Visualization", demand: 69 },
  { skill: "Product Research", demand: 58 },
];

export const learningResources: LearningResource[] = [
  { id: "resource-001", provider: "Coursera", title: "TypeScript for Product Engineers", focus: "Frontend confidence" },
  { id: "resource-002", provider: "edX", title: "SQL for Business Analytics", focus: "Data interviews" },
  { id: "resource-003", provider: "ZJUT", title: "Mandarin Workplace Presentations", focus: "Cross-cultural communication" },
  { id: "resource-004", provider: "LinkedIn Learning", title: "Portfolio Storytelling for Early Careers", focus: "Project evidence" },
  { id: "resource-005", provider: "Coursera", title: "Data Visualization with Python", focus: "Applied analytics" },
];
