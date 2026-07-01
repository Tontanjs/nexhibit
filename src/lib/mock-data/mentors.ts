export type Mentor = {
  id: string;
  name: string;
  initials: string;
  role: string;
  company: string;
  yearsOut: number;
  focus: string[];
};

export const mentors: Mentor[] = [
  { id: "mentor-001", name: "Linh Tran", initials: "LT", role: "Data Analyst", company: "Alibaba Cloud", yearsOut: 2, focus: ["Analytics", "China-Vietnam roles", "Interview prep"] },
  { id: "mentor-002", name: "Sofia Martinez", initials: "SM", role: "Product Operations Lead", company: "SHEIN Global", yearsOut: 4, focus: ["Operations", "Localization", "First job search"] },
  { id: "mentor-003", name: "Ahmed Hassan", initials: "AH", role: "Automation Engineer", company: "Bosch China", yearsOut: 3, focus: ["Engineering", "Factory context", "Technical interviews"] },
  { id: "mentor-004", name: "Priya Raman", initials: "PR", role: "UX Researcher", company: "Tencent Global", yearsOut: 5, focus: ["Research", "Portfolio critique", "Cross-cultural teams"] },
  { id: "mentor-005", name: "Ng Wei Ming", initials: "NW", role: "AI Solutions Associate", company: "SenseTime", yearsOut: 1, focus: ["AI products", "Enterprise demos", "Mandarin at work"] },
  { id: "mentor-006", name: "Hana Kim", initials: "HK", role: "Robotics PM", company: "Geek+ Robotics", yearsOut: 6, focus: ["Hardware", "Product management", "Relocation"] },
];
