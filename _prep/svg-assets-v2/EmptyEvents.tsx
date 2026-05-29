import { useId } from "react";

export type EmptyEventsProps = {
  size?: number;
  className?: string;
};

export function EmptyEvents({ size = 200, className }: EmptyEventsProps) {
  const titleId = `${useId()}-empty-events-title`.replace(/:/g, "");
  const descId = `${useId()}-empty-events-desc`.replace(/:/g, "");

  return (
    <svg width={size} height={size} viewBox="0 0 200 200" role="img" aria-labelledby={`${titleId} ${descId}`} className={className} xmlns="http://www.w3.org/2000/svg">
      <title id={titleId}>No events yet</title>
      <desc id={descId}>A calendar with gold sparkles for an empty event list.</desc>
      <circle cx="100" cy="100" r="78" fill="#F8FAFC" />
      <rect x="46" y="55" width="108" height="104" rx="14" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="4" />
      <path d="M46 82H154" stroke="#CBD5E1" strokeWidth="4" />
      <path d="M72 45V65" stroke="#0A0E1A" strokeWidth="6" strokeLinecap="round" />
      <path d="M128 45V65" stroke="#0A0E1A" strokeWidth="6" strokeLinecap="round" />
      <rect x="65" y="100" width="18" height="18" rx="4" fill="#E2E8F0" />
      <rect x="91" y="100" width="18" height="18" rx="4" fill="#F5C518" />
      <rect x="117" y="100" width="18" height="18" rx="4" fill="#E2E8F0" />
      <rect x="65" y="128" width="18" height="18" rx="4" fill="#E2E8F0" />
      <rect x="91" y="128" width="18" height="18" rx="4" fill="#E2E8F0" />
      <path d="M160 47L164 56L174 58L166 64L168 74L160 69L152 74L154 64L146 58L156 56Z" fill="#F5C518" />
      <circle cx="38" cy="68" r="4" fill="#94A3B8" />
    </svg>
  );
}
