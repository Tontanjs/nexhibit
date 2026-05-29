export type FilterOption = {
  value: string;
  label: string;
  description?: string;
};

export const STUDENT_BROWSE_FILTERS: {
  categories: FilterOption[];
  years: FilterOption[];
  englishLevels: FilterOption[];
  hskRanges: FilterOption[];
  lookingFor: FilterOption[];
  sortOptions: FilterOption[];
} = {
  categories: [
    { value: "all", label: "All categories" },
    { value: "Business", label: "Business" },
    { value: "Engineering", label: "Engineering" },
    { value: "Health", label: "Health" },
    { value: "Language", label: "Language" },
    { value: "Other", label: "Other" },
  ],
  years: [
    { value: "1", label: "Year 1" },
    { value: "2", label: "Year 2" },
    { value: "3", label: "Year 3" },
    { value: "4", label: "Year 4" },
  ],
  englishLevels: [
    { value: "Native", label: "Native" },
    { value: "Fluent", label: "Fluent" },
    { value: "Proficient", label: "Proficient" },
    { value: "Intermediate", label: "Intermediate" },
  ],
  hskRanges: [
    { value: "none", label: "No HSK yet" },
    { value: "1-2", label: "HSK 1-2", description: "Beginner to elementary Mandarin" },
    { value: "3-4", label: "HSK 3-4", description: "Conversational to intermediate Mandarin" },
    { value: "5-6", label: "HSK 5-6", description: "Advanced Mandarin" },
  ],
  lookingFor: [
    { value: "Internship", label: "Internship" },
    { value: "Full-time", label: "Full-time" },
    { value: "Both", label: "Both" },
  ],
  sortOptions: [
    { value: "match_desc", label: "Best match first" },
    { value: "match_asc", label: "Lowest match first" },
    { value: "name_asc", label: "Name A-Z" },
    { value: "newest", label: "Recently active" },
    { value: "gpa_desc", label: "Highest GPA" },
    { value: "year_desc", label: "Most senior" },
  ],
};

export const EMPLOYER_BROWSE_FILTERS: {
  industries: FilterOption[];
  sizes: FilterOption[];
  types: FilterOption[];
  hiringFor: FilterOption[];
} = {
  industries: [
    { value: "Cloud Computing", label: "Cloud Computing" },
    { value: "Electric Vehicles", label: "Electric Vehicles" },
    { value: "Fashion E-commerce", label: "Fashion E-commerce" },
    { value: "Industrial Automation", label: "Industrial Automation" },
    { value: "AI Tools", label: "AI Tools" },
    { value: "Warehouse Robotics", label: "Warehouse Robotics" },
  ],
  sizes: [
    { value: "Startup (1-50)", label: "Startup" },
    { value: "Mid-size (51-500)", label: "Mid-size" },
    { value: "Large (501-5000)", label: "Large" },
    { value: "Enterprise (5000+)", label: "Enterprise" },
  ],
  types: [
    { value: "Chinese", label: "Chinese company" },
    { value: "Multinational", label: "Multinational" },
    { value: "Startup", label: "Startup" },
  ],
  hiringFor: [
    { value: "Business", label: "Business" },
    { value: "Engineering", label: "Engineering" },
    { value: "Health", label: "Health" },
    { value: "Language", label: "Language" },
    { value: "Other", label: "Other" },
  ],
};
