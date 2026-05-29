import type { TimeSlot } from "./types";

type SlotCategory = TimeSlot["category"];

type CategoryConfig = {
  category: SlotCategory;
  prefix: string;
  count: number;
};

const categories: CategoryConfig[] = [
  { category: "Business", prefix: "BUS", count: 30 },
  { category: "Engineering", prefix: "ENG", count: 30 },
  { category: "Health", prefix: "HLT", count: 10 },
  { category: "Language", prefix: "LNG", count: 10 },
  { category: "Other", prefix: "OTH", count: 10 },
];

const timeBlocks = [
  ["10:00", "10:20"],
  ["10:20", "10:40"],
  ["10:40", "11:00"],
  ["11:00", "11:20"],
  ["11:20", "11:40"],
  ["11:40", "12:00"],
  ["13:00", "13:20"],
  ["13:20", "13:40"],
  ["13:40", "14:00"],
  ["14:00", "14:20"],
  ["14:20", "14:40"],
  ["14:40", "15:00"],
  ["15:30", "15:50"],
  ["15:50", "16:10"],
  ["16:10", "16:30"],
  ["16:30", "16:50"],
] as const;

const studentIds = [
  "stu-001",
  "stu-002",
  "stu-003",
  "stu-004",
  "stu-005",
  "stu-006",
  "stu-007",
  "stu-008",
  "stu-009",
  "stu-010",
  "stu-011",
  "stu-012",
] as const;

function pad(value: number) {
  return value.toString().padStart(2, "0");
}

function isBooked(globalIndex: number) {
  return globalIndex % 5 === 0 || globalIndex % 5 === 1;
}

let globalSlotIndex = 0;

export const timeSlots: TimeSlot[] = categories.flatMap((config) =>
  Array.from({ length: config.count }, (_, index) => {
    const [startTime, endTime] = timeBlocks[index % timeBlocks.length];
    const slotNumber = globalSlotIndex + 1;
    const booked = isBooked(globalSlotIndex);
    const slot: TimeSlot = {
      id: `slot-${pad(slotNumber)}`,
      eventId: "evt-001",
      category: config.category,
      startTime,
      endTime,
      boothNumber: `${config.prefix}-${pad(index + 1)}`,
      available: !booked,
      ...(booked ? { bookedBy: studentIds[globalSlotIndex % studentIds.length] } : {}),
    };

    globalSlotIndex += 1;
    return slot;
  }),
);
