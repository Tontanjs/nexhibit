export type MeetingRequest = {
  id: string;
  employerId: string;
  employerName: string;
  contactName: string;
  requestedTime: string;
  roleFocus: string;
};

export type BoothMeeting = {
  id: string;
  employerId: string;
  employerName: string;
  contactName: string;
  time: string;
  roleFocus: string;
  notes?: string;
};

export const meetingRequests: MeetingRequest[] = [
  {
    id: "request-001",
    employerId: "emp-001",
    employerName: "Alibaba Cloud",
    contactName: "Li Wen",
    requestedTime: "2026-06-30T10:30:00+08:00",
    roleFocus: "Multilingual support tooling intern",
  },
  {
    id: "request-002",
    employerId: "emp-004",
    employerName: "Bosch China",
    contactName: "Maya Chen",
    requestedTime: "2026-06-30T13:15:00+08:00",
    roleFocus: "Automation documentation assistant",
  },
  {
    id: "request-003",
    employerId: "emp-008",
    employerName: "Tencent Global",
    contactName: "Alex Zhou",
    requestedTime: "2026-06-30T15:00:00+08:00",
    roleFocus: "Cross-cultural product research intern",
  },
];

export const todaysMeetings: BoothMeeting[] = [
  {
    id: "meeting-001",
    employerId: "emp-005",
    employerName: "Siemens China",
    contactName: "Grace Lin",
    time: "2026-06-30T09:45:00+08:00",
    roleFocus: "Product documentation assistant",
    notes: "Ask about bilingual documentation examples.",
  },
];
