export type CategoryConfig = {
  id: string;
  name: string;
  iconName: string;
  shortDescription: string;
  longDescription: string;
  exampleMajors: string[];
  exampleEmployerTypes: string[];
  slotsPerEvent: number;
};

export const CATEGORIES: CategoryConfig[] = [
  {
    id: "business",
    name: "Business",
    iconName: "Briefcase",
    shortDescription: "Commerce, operations, marketing, and market-entry roles.",
    longDescription:
      "For students who translate customer insight, regional knowledge, and operational detail into better cross-border business decisions.",
    exampleMajors: ["International Business", "Marketing", "E-commerce", "Logistics", "Finance"],
    exampleEmployerTypes: ["Cross-border marketplaces", "Consumer brands", "Trade companies", "Supply chain teams"],
    slotsPerEvent: 20,
  },
  {
    id: "engineering",
    name: "Engineering",
    iconName: "Wrench",
    shortDescription: "Software, data, automation, hardware, and systems roles.",
    longDescription:
      "For builders who can show working prototypes, technical judgment, and the ability to explain engineering choices across teams.",
    exampleMajors: ["Software Engineering", "Data Science", "Mechatronics", "Electrical Engineering", "Automation"],
    exampleEmployerTypes: ["Cloud platforms", "EV manufacturers", "Robotics teams", "Industrial automation companies"],
    slotsPerEvent: 24,
  },
  {
    id: "health",
    name: "Health",
    iconName: "HeartPulse",
    shortDescription: "Public health, pharmacy, clinical documentation, and health-tech support.",
    longDescription:
      "For students who combine health knowledge with clear communication, careful research, and patient-centered thinking.",
    exampleMajors: ["Public Health", "Pharmaceutical Sciences", "Biomedical Engineering", "Health Management", "Nutrition"],
    exampleEmployerTypes: ["Healthcare technology teams", "Pharmaceutical companies", "Medical device offices", "Research groups"],
    slotsPerEvent: 12,
  },
  {
    id: "language",
    name: "Language",
    iconName: "Languages",
    shortDescription: "Translation, localization, interpretation, and intercultural communication.",
    longDescription:
      "For students who make products, documents, and employer conversations work across Mandarin, English, and regional languages.",
    exampleMajors: ["Chinese Language", "Translation", "Intercultural Communication", "Applied Linguistics", "International Chinese Studies"],
    exampleEmployerTypes: ["Localization teams", "AI language startups", "Export support teams", "Global customer operations"],
    slotsPerEvent: 14,
  },
  {
    id: "other",
    name: "Other",
    iconName: "Sparkles",
    shortDescription: "Design, media, education, research, and emerging interdisciplinary roles.",
    longDescription:
      "For profiles that do not fit one department cleanly but show valuable work, strong judgment, and clear portfolio evidence.",
    exampleMajors: ["Digital Media Design", "Education Technology", "Industrial Design", "Environmental Studies", "Applied Research"],
    exampleEmployerTypes: ["Design studios", "Campus service teams", "Education startups", "Innovation labs"],
    slotsPerEvent: 10,
  },
];

export function getCategoryConfig(name: string): CategoryConfig | undefined {
  const normalized = name.trim().toLowerCase();
  return CATEGORIES.find((category) => category.name.toLowerCase() === normalized || category.id === normalized);
}
