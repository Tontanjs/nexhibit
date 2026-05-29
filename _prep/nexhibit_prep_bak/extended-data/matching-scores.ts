import type { MatchScore } from "./types";

type EmployerId =
  | "emp-001"
  | "emp-002"
  | "emp-003"
  | "emp-004"
  | "emp-005"
  | "emp-006"
  | "emp-007"
  | "emp-008";

type StudentId =
  | "stu-001"
  | "stu-002"
  | "stu-003"
  | "stu-004"
  | "stu-005"
  | "stu-006"
  | "stu-007"
  | "stu-008"
  | "stu-009"
  | "stu-010"
  | "stu-011"
  | "stu-012";

type ScoreValue = 67 | 70 | 76 | 80 | 83 | 86 | 88 | 92;
type FactorTuple = readonly [categoryMatch: 0 | 25, skillOverlap: number, languageFit: number, other: -3 | -2 | -1 | 0 | 1 | 2 | 3];
type EmployerScorePlan = readonly [EmployerId, ScoreValue];
type StudentScorePlan = {
  studentId: StudentId;
  scores: readonly [
    EmployerScorePlan,
    EmployerScorePlan,
    EmployerScorePlan,
    EmployerScorePlan,
    EmployerScorePlan,
    EmployerScorePlan,
    EmployerScorePlan,
    EmployerScorePlan,
  ];
};

const factorsByScore: Record<ScoreValue, FactorTuple> = {
  67: [0, 10, 6, 1],
  70: [0, 12, 8, 0],
  76: [25, 1, 1, -1],
  80: [25, 3, 2, 0],
  83: [25, 5, 3, 0],
  86: [25, 6, 5, 0],
  88: [25, 8, 6, -1],
  92: [25, 12, 8, -3],
};

const scorePlans: StudentScorePlan[] = [
  {
    studentId: "stu-001",
    scores: [
      ["emp-001", 92],
      ["emp-002", 86],
      ["emp-003", 70],
      ["emp-004", 83],
      ["emp-005", 80],
      ["emp-006", 76],
      ["emp-007", 88],
      ["emp-008", 67],
    ],
  },
  {
    studentId: "stu-002",
    scores: [
      ["emp-001", 92],
      ["emp-002", 83],
      ["emp-003", 70],
      ["emp-004", 76],
      ["emp-005", 86],
      ["emp-006", 88],
      ["emp-007", 80],
      ["emp-008", 67],
    ],
  },
  {
    studentId: "stu-003",
    scores: [
      ["emp-001", 80],
      ["emp-002", 92],
      ["emp-003", 67],
      ["emp-004", 86],
      ["emp-005", 76],
      ["emp-006", 83],
      ["emp-007", 70],
      ["emp-008", 88],
    ],
  },
  {
    studentId: "stu-004",
    scores: [
      ["emp-001", 83],
      ["emp-002", 88],
      ["emp-003", 67],
      ["emp-004", 92],
      ["emp-005", 86],
      ["emp-006", 80],
      ["emp-007", 76],
      ["emp-008", 70],
    ],
  },
  {
    studentId: "stu-005",
    scores: [
      ["emp-001", 80],
      ["emp-002", 83],
      ["emp-003", 92],
      ["emp-004", 67],
      ["emp-005", 76],
      ["emp-006", 88],
      ["emp-007", 86],
      ["emp-008", 70],
    ],
  },
  {
    studentId: "stu-006",
    scores: [
      ["emp-001", 83],
      ["emp-002", 76],
      ["emp-003", 86],
      ["emp-004", 67],
      ["emp-005", 70],
      ["emp-006", 92],
      ["emp-007", 88],
      ["emp-008", 80],
    ],
  },
  {
    studentId: "stu-007",
    scores: [
      ["emp-001", 76],
      ["emp-002", 92],
      ["emp-003", 83],
      ["emp-004", 88],
      ["emp-005", 70],
      ["emp-006", 86],
      ["emp-007", 67],
      ["emp-008", 80],
    ],
  },
  {
    studentId: "stu-008",
    scores: [
      ["emp-001", 86],
      ["emp-002", 80],
      ["emp-003", 83],
      ["emp-004", 67],
      ["emp-005", 70],
      ["emp-006", 88],
      ["emp-007", 92],
      ["emp-008", 76],
    ],
  },
  {
    studentId: "stu-009",
    scores: [
      ["emp-001", 80],
      ["emp-002", 76],
      ["emp-003", 92],
      ["emp-004", 67],
      ["emp-005", 70],
      ["emp-006", 88],
      ["emp-007", 86],
      ["emp-008", 83],
    ],
  },
  {
    studentId: "stu-010",
    scores: [
      ["emp-001", 70],
      ["emp-002", 67],
      ["emp-003", 76],
      ["emp-004", 80],
      ["emp-005", 92],
      ["emp-006", 83],
      ["emp-007", 86],
      ["emp-008", 88],
    ],
  },
  {
    studentId: "stu-011",
    scores: [
      ["emp-001", 67],
      ["emp-002", 70],
      ["emp-003", 76],
      ["emp-004", 80],
      ["emp-005", 92],
      ["emp-006", 86],
      ["emp-007", 83],
      ["emp-008", 88],
    ],
  },
  {
    studentId: "stu-012",
    scores: [
      ["emp-001", 70],
      ["emp-002", 67],
      ["emp-003", 92],
      ["emp-004", 76],
      ["emp-005", 80],
      ["emp-006", 88],
      ["emp-007", 83],
      ["emp-008", 86],
    ],
  },
];

export const matchingScores: MatchScore[] = scorePlans.flatMap((plan) =>
  plan.scores.map(([employerId, score]) => {
    const [categoryMatch, skillOverlap, languageFit, other] = factorsByScore[score];

    return {
      studentId: plan.studentId,
      employerId,
      score,
      factors: {
        categoryMatch,
        skillOverlap,
        languageFit,
        other,
      },
    };
  }),
);
