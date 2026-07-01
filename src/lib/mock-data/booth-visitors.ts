export type BoothVisitor = {
  id: string;
  employerId: string;
  employerName: string;
  activity: "Viewing your profile" | "Reviewing projects" | "Checking availability";
  startedSecondsAgo: number;
};

export const boothVisitors: BoothVisitor[] = [
  { id: "visitor-001", employerId: "emp-001", employerName: "Alibaba Cloud", activity: "Viewing your profile", startedSecondsAgo: 134 },
  { id: "visitor-002", employerId: "emp-004", employerName: "Bosch China", activity: "Reviewing projects", startedSecondsAgo: 221 },
  { id: "visitor-003", employerId: "emp-006", employerName: "SenseTime", activity: "Checking availability", startedSecondsAgo: 74 },
  { id: "visitor-004", employerId: "emp-008", employerName: "Tencent Global", activity: "Viewing your profile", startedSecondsAgo: 309 },
  { id: "visitor-005", employerId: "emp-007", employerName: "Geek+ Robotics", activity: "Reviewing projects", startedSecondsAgo: 188 },
];
