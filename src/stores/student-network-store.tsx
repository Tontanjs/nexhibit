"use client";

import { useState } from "react";

export function useStudentNetworkStore() {
  const [sentMentorRequests, setSentMentorRequests] = useState<string[]>([]);

  function markMentorRequested(id: string) {
    setSentMentorRequests((current) => (current.includes(id) ? current : [...current, id]));
  }

  return {
    sentMentorRequests,
    markMentorRequested,
  };
}
