import { useId } from "react";

export type EmptyShortlistProps = {
  size?: number;
  className?: string;
};

export function EmptyShortlist({ size = 200, className }: EmptyShortlistProps) {
  const titleId = `${useId()}-empty-shortlist-title`.replace(/:/g, "");
  const descId = `${useId()}-empty-shortlist-desc`.replace(/:/g, "");

  return (
    <svg width={size} height={size} viewBox="0 0 200 200" role="img" aria-labelledby={`${titleId} ${descId}`} className={className} xmlns="http://www.w3.org/2000/svg">
      <title id={titleId}>Empty shortlist</title>
      <desc id={descId}>A bookmark and star illustration for an empty shortlist state.</desc>
      <circle cx="100" cy="100" r="78" fill="#F8FAFC" />
      <path d="M66 48H134C141 48 146 53 146 60V154L100 129L54 154V60C54 53 59 48 66 48Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="4" strokeLinejoin="round" />
      <path d="M100 72L109 91L130 94L115 109L119 130L100 120L81 130L85 109L70 94L91 91Z" fill="#F5C518" stroke="#0A0E1A" strokeWidth="3" strokeLinejoin="round" />
      <path d="M66 62H134" stroke="#E2E8F0" strokeWidth="4" strokeLinecap="round" />
      <circle cx="151" cy="66" r="5" fill="#94A3B8" />
      <circle cx="45" cy="82" r="4" fill="#F5C518" />
      <path d="M149 122C157 120 163 125 164 133" stroke="#F5C518" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}
