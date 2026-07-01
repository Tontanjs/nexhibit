"use client";

import { useEffect, useState } from "react";

const bannerKey = "nexhibit-calendar-banner-dismissed";

export function useStudentMessagesStore() {
  const [showTranslation, setShowTranslation] = useState(false);
  const [readReceipts, setReadReceipts] = useState(true);
  const [calendarBannerDismissed, setCalendarBannerDismissed] = useState(false);

  useEffect(() => {
    setCalendarBannerDismissed(window.localStorage.getItem(bannerKey) === "true");
  }, []);

  function dismissCalendarBanner() {
    setCalendarBannerDismissed(true);
    window.localStorage.setItem(bannerKey, "true");
  }

  return {
    showTranslation,
    readReceipts,
    calendarBannerDismissed,
    setShowTranslation,
    setReadReceipts,
    dismissCalendarBanner,
  };
}
