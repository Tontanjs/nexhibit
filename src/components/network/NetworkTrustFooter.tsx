"use client";

import { useState } from "react";

export function NetworkTrustFooter() {
  const [reported, setReported] = useState(false);

  return (
    <footer className="border-t border-ink-200 pt-4">
      <p className="text-xs text-ink-400">
        NEXHIBIT Network is a community feature. Content is contributed by users and does not constitute professional advice. Verify information independently before making career decisions.{" "}
        <button
          type="button"
          className="underline hover:text-ink-600 transition-colors"
          onClick={() => setReported(true)}
        >
          {reported ? "Reported — thank you" : "Report content"}
        </button>
      </p>
    </footer>
  );
}
