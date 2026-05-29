export type HSKLevel = {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  label: string;
  proficiency: string;
  description: string;
  vocabularySize: string;
};

export const HSK_LEVELS: HSKLevel[] = [
  {
    level: 1,
    label: "HSK 1",
    proficiency: "Beginner",
    description: "Can understand and use simple Mandarin phrases for familiar campus situations.",
    vocabularySize: "150 words",
  },
  {
    level: 2,
    label: "HSK 2",
    proficiency: "Elementary",
    description: "Can communicate in simple routine tasks and understand common daily expressions.",
    vocabularySize: "300 words",
  },
  {
    level: 3,
    label: "HSK 3",
    proficiency: "Conversational",
    description: "Can handle basic study, life, and internship conversations with preparation.",
    vocabularySize: "600 words",
  },
  {
    level: 4,
    label: "HSK 4",
    proficiency: "Intermediate",
    description: "Can communicate on familiar work topics and read practical notices or instructions.",
    vocabularySize: "1,200 words",
  },
  {
    level: 5,
    label: "HSK 5",
    proficiency: "Advanced",
    description: "Can read longer workplace materials and discuss professional topics with confidence.",
    vocabularySize: "2,500 words",
  },
  {
    level: 6,
    label: "HSK 6",
    proficiency: "Near-native",
    description: "Can understand complex Mandarin and express nuanced ideas in academic or business settings.",
    vocabularySize: "5,000+ words",
  },
];

export type EnglishLevel = {
  id: "Native" | "Fluent" | "Proficient" | "Intermediate";
  label: string;
  description: string;
};

export const ENGLISH_LEVELS: EnglishLevel[] = [
  {
    id: "Native",
    label: "Native",
    description: "Comfortable using English for interviews, documentation, presentations, and team communication.",
  },
  {
    id: "Fluent",
    label: "Fluent",
    description: "Can work confidently in English across meetings, writing, and technical or business discussions.",
  },
  {
    id: "Proficient",
    label: "Proficient",
    description: "Can communicate clearly in most professional settings with occasional support for nuance.",
  },
  {
    id: "Intermediate",
    label: "Intermediate",
    description: "Can handle routine communication and should prepare carefully for complex interviews.",
  },
];
