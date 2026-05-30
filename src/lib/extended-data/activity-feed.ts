import type { ActivityEvent } from "./types";

export const activityFeed: ActivityEvent[] = [
  { id: "act-001", userId: "stu-001", userType: "student", type: "message_received", text: "Alibaba Cloud sent details for your product debugging exercise.", timestamp: "12 minutes ago", isoTimestamp: "2026-05-29T20:48:00+08:00" },
  { id: "act-002", userId: "stu-001", userType: "student", type: "profile_view", text: "Bosch China viewed your TypeScript and React portfolio.", timestamp: "45 minutes ago", isoTimestamp: "2026-05-29T20:15:00+08:00" },
  { id: "act-003", userId: "stu-001", userType: "student", type: "profile_save", text: "BYD International saved your profile to their shortlist.", timestamp: "5 hours ago", isoTimestamp: "2026-05-29T16:00:00+08:00" },
  { id: "act-004", userId: "stu-001", userType: "student", type: "feedback_received", text: "Siemens China left feedback on your multilingual support workflow.", timestamp: "2 days ago", isoTimestamp: "2026-05-27T14:30:00+08:00" },
  { id: "act-005", userId: "stu-001", userType: "student", type: "message_sent", text: "You replied to Alibaba Cloud with your chatbot testing methodology.", timestamp: "3 days ago", isoTimestamp: "2026-05-26T10:20:00+08:00" },
  { id: "act-006", userId: "stu-001", userType: "student", type: "profile_view", text: "SHEIN Global browsed your campus navigator project.", timestamp: "4 days ago", isoTimestamp: "2026-05-25T16:18:00+08:00" },
  { id: "act-007", userId: "stu-001", userType: "student", type: "slot_booked", text: "You booked a booth slot for Spring Career Fair 2026.", timestamp: "13 days ago", isoTimestamp: "2026-05-16T10:25:00+08:00" },
];
