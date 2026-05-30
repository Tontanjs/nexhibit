import { copy } from "../src/lib/copy/strings";
import { employers, events, platformStats, quotes, students } from "../src/lib/mock-data";
import type { StudentCategory } from "../src/lib/mock-data";

declare const process: {
  exitCode?: number;
};

const failures: string[] = [];

function assert(condition: boolean, message: string) {
  if (!condition) {
    failures.push(message);
  }
}

function assertUnique(values: string[], label: string) {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const value of values) {
    if (seen.has(value)) {
      duplicates.add(value);
    }

    seen.add(value);
  }

  assert(duplicates.size === 0, `${label} must be unique. Duplicates: ${Array.from(duplicates).join(", ")}`);
}

function wordCount(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

const expectedStudentCategories: Record<StudentCategory, number> = {
  Business: 8,
  Engineering: 10,
  Health: 5,
  Language: 5,
  Other: 2,
};

const categoryCounts: Record<StudentCategory, number> = {
  Business: 0,
  Engineering: 0,
  Health: 0,
  Language: 0,
  Other: 0,
};

const requiredNationalities = [
  "Thailand",
  "Vietnam",
  "Pakistan",
  "Indonesia",
  "Kazakhstan",
  "Mongolia",
  "Russia",
  "Egypt",
  "Ethiopia",
  "Nigeria",
  "Cambodia",
  "India",
  "Malaysia",
  "Bangladesh",
  "Nepal",
  "Sri Lanka",
  "Laos",
  "Turkey",
  "Myanmar",
  "Ghana",
  "Kenya",
  "Uzbekistan",
  "Brazil",
  "Morocco",
  "South Africa",
  "Tajikistan",
  "Kyrgyzstan",
  "Ukraine",
  "Mexico",
  "Peru",
];

assert(students.length === 30, "Expected exactly 30 students.");
assertUnique(students.map((student) => student.id), "Student IDs");
assertUnique(students.map((student) => student.nationality), "Student nationalities");

for (const student of students) {
  categoryCounts[student.category] += 1;
  assert(student.initials.length === 2, `${student.id} initials must be exactly 2 characters.`);
  assert(student.gpa >= 3.2 && student.gpa <= 3.9, `${student.id} GPA must be between 3.2 and 3.9.`);
  assert(student.skills.length >= 4 && student.skills.length <= 7, `${student.id} must have 4-7 skills.`);
  assert(student.projects.length >= 2 && student.projects.length <= 3, `${student.id} must have 2-3 projects.`);
  assert(student.awards.length >= 1 && student.awards.length <= 3, `${student.id} must have 1-3 awards.`);
  assert(student.profileStrength >= 60 && student.profileStrength <= 95, `${student.id} profileStrength must be 60-95.`);
  assert(student.verified === true, `${student.id} must be verified.`);
}

for (const nationality of requiredNationalities) {
  assert(
    students.some((student) => student.nationality === nationality),
    `Missing required nationality: ${nationality}.`,
  );
}

for (const [category, expectedCount] of Object.entries(expectedStudentCategories)) {
  assert(
    categoryCounts[category as StudentCategory] === expectedCount,
    `Expected ${expectedCount} ${category} students, found ${categoryCounts[category as StudentCategory]}.`,
  );
}

assert(employers.length === 8, "Expected exactly 8 employers.");
assertUnique(employers.map((employer) => employer.id), "Employer IDs");

for (const employer of employers) {
  assert(employer.logoLetter.length >= 1 && employer.logoLetter.length <= 2, `${employer.id} logoLetter must be 1-2 chars.`);
  assert(employer.hiringSkills.length >= 4 && employer.hiringSkills.length <= 6, `${employer.id} must have 4-6 hiring skills.`);
  assert(employer.hiringCategories.length >= 1, `${employer.id} must include at least one hiring category.`);
  assert(employer.verified === true, `${employer.id} must be verified.`);
}

assert(events.length === 4, "Expected exactly 4 events.");
assertUnique(events.map((event) => event.id), "Event IDs");
assertUnique(events.map((event) => event.slug), "Event slugs");

for (const event of events) {
  const slotsTotal = event.categories.reduce((sum, category) => sum + category.slotsTotal, 0);
  const slotsBooked = event.categories.reduce((sum, category) => sum + category.slotsBooked, 0);

  assert(event.categories.length === 5, `${event.id} must have 5 category subdivisions.`);
  assert(event.totalSlots === 80, `${event.id} totalSlots must be 80.`);
  assert(slotsTotal === event.totalSlots, `${event.id} category slotsTotal must sum to totalSlots.`);
  assert(slotsBooked === event.bookedSlots, `${event.id} category slotsBooked must sum to bookedSlots.`);

  if (event.status === "past") {
    assert(event.satisfactionScore >= 0 && event.satisfactionScore <= 5, `${event.id} satisfactionScore must be 0-5.`);
    assert(event.matchesGenerated > 0, `${event.id} matchesGenerated must be positive.`);
  }
}

assert(quotes.length === 5, "Expected exactly 5 quotes.");
assert(quotes.filter((quote) => quote.mood === "frustrated").length === 3, "Expected 3 frustrated quotes.");
assert(quotes.filter((quote) => quote.mood === "hopeful").length === 2, "Expected 2 hopeful quotes.");

for (const quote of quotes) {
  assert(wordCount(quote.text) <= 15, `${quote.id} must be 15 words or fewer.`);
}

assert(platformStats.verificationRate === 100, "Platform verificationRate should remain 100.");
assert(platformStats.eventsPerYear === 2, "Platform eventsPerYear should remain 2.");
assert(copy.brand.name === "NEXHIBIT", "copy.brand.name should remain NEXHIBIT.");
assert(copy.brand.tagline === "Where students get seen.", "copy.brand.tagline changed unexpectedly.");

if (failures.length > 0) {
  console.error(`NEXHIBIT prep validation failed with ${failures.length} issue(s):`);

  for (const failure of failures) {
    console.error(`- ${failure}`);
  }

  process.exitCode = 1;
} else {
  console.log("NEXHIBIT prep validation passed.");
}
