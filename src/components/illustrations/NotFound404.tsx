"use client";

import { useId } from "react";

export type NotFound404Props = {
  size?: number;
  className?: string;
};

export function NotFound404({ size = 260, className }: NotFound404Props) {
  const titleId = `${useId()}-not-found-title`.replace(/:/g, "");
  const descId = `${useId()}-not-found-desc`.replace(/:/g, "");

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 260 260"
      role="img"
      aria-labelledby={`${titleId} ${descId}`}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id={titleId}>Page not found</title>
      <desc id={descId}>An empty NEXHIBIT booth with a question mark for a 404 page.</desc>
      <circle cx="130" cy="130" r="104" fill="#F8FAFC" />
      <path d="M67 143H193V198H67Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="5" strokeLinejoin="round" />
      <path d="M56 142H204L185 101H75Z" fill="#FFF8D9" stroke="#0A0E1A" strokeWidth="5" strokeLinejoin="round" />
      <rect x="94" y="158" width="72" height="20" rx="6" fill="#E2E8F0" />
      <rect x="107" y="73" width="46" height="46" rx="12" fill="#FFFFFF" stroke="#F5C518" strokeWidth="5" />
      <text x="130" y="106" textAnchor="middle" fill="#0A0E1A" fontFamily="Inter, Arial, sans-serif" fontSize="36" fontWeight="800">
        ?
      </text>
      <text x="130" y="231" textAnchor="middle" fill="#94A3B8" fontFamily="Inter, Arial, sans-serif" fontSize="28" fontWeight="900">
        404
      </text>
    </svg>
  );
}
