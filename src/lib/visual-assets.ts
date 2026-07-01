type StudentPortraitInput =
  | string
  | {
      id: string;
      photoUrl?: string;
      photoStatus?: "pending" | "approved" | "rejected";
    };

const demoStudentPortraits: Record<string, string> = {
  "stu-001": "set-a-001",
  "stu-002": "set-a-002",
  "stu-003": "set-a-010",
  "stu-004": "set-a-003",
  "stu-005": "set-a-006",
  "stu-006": "set-b-005",
  "stu-007": "set-a-007",
  "stu-008": "set-a-019",
  "stu-009": "set-b-001",
  "stu-010": "set-b-010",
  "stu-011": "set-a-011",
  "stu-012": "set-a-018",
  "stu-013": "set-b-009",
  "stu-014": "set-a-014",
  "stu-015": "set-b-012",
  "stu-016": "set-a-015",
  "stu-017": "set-a-005",
  "stu-018": "set-b-011",
  "stu-019": "set-a-016",
  "stu-020": "set-a-025",
  "stu-021": "set-a-020",
  "stu-022": "set-b-008",
  "stu-023": "set-a-027",
  "stu-024": "set-a-024",
  "stu-025": "set-a-021",
  "stu-026": "set-b-006",
  "stu-027": "set-b-007",
  "stu-028": "set-b-002",
  "stu-029": "set-b-003",
  "stu-030": "set-b-004",
};

export function getStudentIllustrationSrc(studentId: string) {
  return `/assets/students/${studentId}.svg`;
}

export function getStudentPortraitSrc(student: StudentPortraitInput) {
  const studentId = typeof student === "string" ? student : student.id;

  if (
    typeof student !== "string" &&
    student.photoUrl &&
    (student.photoStatus === "approved" || student.photoStatus == null)
  ) {
    return student.photoUrl;
  }

  const demoPortrait = demoStudentPortraits[studentId];
  return demoPortrait ? `/assets/students/photos/${demoPortrait}.webp` : getStudentIllustrationSrc(studentId);
}

export function getEmployerLogoSrc(employerId: string) {
  const logoSources: Record<string, string> = {
    "emp-001": "/assets/employers/emp-001.svg",
    "emp-002": "/assets/employers/emp-002.png",
    "emp-003": "/assets/employers/emp-003.svg",
    "emp-004": "/assets/employers/emp-004.svg",
    "emp-005": "/assets/employers/emp-005.svg",
    "emp-006": "/assets/employers/emp-006.webp",
    "emp-007": "/assets/employers/emp-007.webp",
    "emp-008": "/assets/employers/emp-008.webp",
  };

  return logoSources[employerId] ?? `/assets/employers/${employerId}.svg`;
}

export function getEventImageSrc(eventId: string) {
  return `/assets/events/${eventId}.png`;
}
