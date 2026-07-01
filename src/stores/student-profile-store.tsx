"use client";

import { useCallback, useEffect, useState } from "react";

import type { StudentLanguage } from "@/lib/mock-data/types";

export type FieldVisibility = "public" | "employerOnly" | "hidden";
export type ProfileMode = "public" | "employerOnly" | "hidden";

export type StudentProfileDraft = {
  videoPitchUrl?: string;
  voiceIntroUrl?: string;
  namePronunciationUrl?: string;
  elevatorPitch?: string;
  workAuth: {
    regions: string[];
    notes: string;
  };
  languages: StudentLanguage[];
  openTo: {
    internship: boolean;
    fullTime: boolean;
    partTime: boolean;
    remote: boolean;
    freelance: boolean;
  };
  fieldVisibility: Record<string, FieldVisibility>;
  profileMode: ProfileMode;
};

const storageKey = "nexhibit-student-profile-v2";

export const defaultStudentProfileDraft: StudentProfileDraft = {
  workAuth: {
    regions: ["Thailand (citizen)", "China (student visa)", "Remote — global"],
    notes: "",
  },
  languages: [
    { name: "English", cefr: "C1", test: "IELTS", score: "7.5" },
    { name: "Mandarin", cefr: "B2", test: "HSK", score: "4" },
    { name: "Thai", cefr: "C2", test: "Other", score: "Native" },
  ],
  openTo: {
    internship: true,
    fullTime: false,
    partTime: true,
    remote: true,
    freelance: false,
  },
  fieldVisibility: {
    headline: "public",
    bio: "public",
    gpa: "employerOnly",
    passport: "hidden",
    phone: "hidden",
    languages: "public",
    workAuth: "employerOnly",
  },
  profileMode: "employerOnly",
};

function readDraft(): StudentProfileDraft {
  if (typeof window === "undefined") return defaultStudentProfileDraft;

  try {
    const stored = window.localStorage.getItem(storageKey);
    if (!stored) return defaultStudentProfileDraft;
    return {
      ...defaultStudentProfileDraft,
      ...JSON.parse(stored),
    };
  } catch {
    return defaultStudentProfileDraft;
  }
}

function persistDraft(next: StudentProfileDraft) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(storageKey, JSON.stringify(next));
}

export function useStudentProfileStore() {
  const [draft, setDraft] = useState<StudentProfileDraft>(defaultStudentProfileDraft);

  useEffect(() => {
    setDraft(readDraft());
  }, []);

  const updateDraft = useCallback((patch: Partial<StudentProfileDraft>) => {
    setDraft((current) => {
      const next = { ...current, ...patch };
      persistDraft(next);
      return next;
    });
  }, []);

  const setFieldVisibility = useCallback((field: string, visibility: FieldVisibility) => {
    setDraft((current) => {
      const next = {
        ...current,
        fieldVisibility: {
          ...current.fieldVisibility,
          [field]: visibility,
        },
      };
      persistDraft(next);
      return next;
    });
  }, []);

  const updateLanguage = useCallback((index: number, patch: Partial<StudentLanguage>) => {
    setDraft((current) => {
      const languages = current.languages.map((language, languageIndex) =>
        languageIndex === index ? { ...language, ...patch } : language,
      );
      const next = { ...current, languages };
      persistDraft(next);
      return next;
    });
  }, []);

  const toggleOpenTo = useCallback((key: keyof StudentProfileDraft["openTo"]) => {
    setDraft((current) => {
      const next = {
        ...current,
        openTo: {
          ...current.openTo,
          [key]: !current.openTo[key],
        },
      };
      persistDraft(next);
      return next;
    });
  }, []);

  const toggleWorkRegion = useCallback((region: string) => {
    setDraft((current) => {
      const selected = current.workAuth.regions.includes(region);
      const next = {
        ...current,
        workAuth: {
          ...current.workAuth,
          regions: selected
            ? current.workAuth.regions.filter((item) => item !== region)
            : [...current.workAuth.regions, region],
        },
      };
      persistDraft(next);
      return next;
    });
  }, []);

  return {
    draft,
    updateDraft,
    setFieldVisibility,
    updateLanguage,
    toggleOpenTo,
    toggleWorkRegion,
  };
}
