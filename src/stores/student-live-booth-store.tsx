"use client";

import { useMemo, useState } from "react";

import { meetingRequests, todaysMeetings, type BoothMeeting, type MeetingRequest } from "@/lib/mock-data/meeting-requests";

export type PresenceState = "Online" | "In a meeting" | "Available in 10 min" | "Offline";
export type SlotState = "empty" | "published" | "booked";

export type BoothSlot = {
  id: string;
  time: string;
  state: SlotState;
  employerName?: string;
};

function buildSlots(): BoothSlot[] {
  const slots: BoothSlot[] = [];
  for (let hour = 9; hour < 17; hour += 1) {
    for (const minute of [0, 15, 30, 45]) {
      const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
      const index = slots.length;
      slots.push({
        id: `booth-slot-${time}`,
        time,
        state: index === 6 || index === 18 ? "booked" : index % 4 === 0 ? "published" : "empty",
        ...(index === 6 ? { employerName: "Alibaba Cloud" } : {}),
        ...(index === 18 ? { employerName: "Bosch China" } : {}),
      });
    }
  }
  return slots;
}

export function useStudentLiveBoothStore() {
  const initialSlots = useMemo(() => buildSlots(), []);
  const [presence, setPresence] = useState<PresenceState>("Online");
  const [live, setLive] = useState(true);
  const [requests, setRequests] = useState<MeetingRequest[]>(meetingRequests);
  const [meetings, setMeetings] = useState<BoothMeeting[]>(todaysMeetings);
  const [slots, setSlots] = useState<BoothSlot[]>(initialSlots);

  function acceptRequest(request: MeetingRequest) {
    setRequests((current) => current.filter((item) => item.id !== request.id));
    setMeetings((current) =>
      [...current, {
        id: request.id.replace("request", "meeting"),
        employerId: request.employerId,
        employerName: request.employerName,
        contactName: request.contactName,
        time: request.requestedTime,
        roleFocus: request.roleFocus,
      }].sort((a, b) => a.time.localeCompare(b.time)),
    );
  }

  function declineRequest(id: string) {
    setRequests((current) => current.filter((item) => item.id !== id));
  }

  function updateMeetingNotes(id: string, notes: string) {
    setMeetings((current) => current.map((item) => (item.id === id ? { ...item, notes } : item)));
  }

  function toggleSlot(id: string) {
    setSlots((current) =>
      current.map((slot) => {
        if (slot.id !== id || slot.state === "booked") return slot;
        return { ...slot, state: slot.state === "published" ? "empty" : "published" };
      }),
    );
  }

  return {
    live,
    presence,
    requests,
    meetings,
    slots,
    setLive,
    setPresence,
    acceptRequest,
    declineRequest,
    updateMeetingNotes,
    toggleSlot,
  };
}
