"use client";

import { useState } from "react";

export function useStudentCoachStore() {
  const [savedPitch, setSavedPitch] = useState("");
  const [auditRan, setAuditRan] = useState(false);

  return {
    savedPitch,
    auditRan,
    setSavedPitch,
    setAuditRan,
  };
}
