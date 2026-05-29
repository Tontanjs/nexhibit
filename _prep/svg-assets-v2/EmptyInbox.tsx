import { useId } from "react";

export type EmptyInboxProps = {
  size?: number;
  className?: string;
};

export function EmptyInbox({ size = 200, className }: EmptyInboxProps) {
  const titleId = `${useId()}-empty-inbox-title`.replace(/:/g, "");
  const descId = `${useId()}-empty-inbox-desc`.replace(/:/g, "");

  return (
    <svg width={size} height={size} viewBox="0 0 200 200" role="img" aria-labelledby={`${titleId} ${descId}`} className={className} xmlns="http://www.w3.org/2000/svg">
      <title id={titleId}>Empty inbox</title>
      <desc id={descId}>A friendly envelope illustration for an empty messages state.</desc>
      <circle cx="100" cy="100" r="78" fill="#F8FAFC" />
      <path d="M50 72H150C156 72 161 77 161 83V136C161 142 156 147 150 147H50C44 147 39 142 39 136V83C39 77 44 72 50 72Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="4" />
      <path d="M43 81L96 116C99 118 102 118 105 116L157 81" fill="none" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M45 141L81 108" stroke="#E2E8F0" strokeWidth="4" strokeLinecap="round" />
      <path d="M155 141L119 108" stroke="#E2E8F0" strokeWidth="4" strokeLinecap="round" />
      <circle cx="156" cy="55" r="8" fill="#F5C518" />
      <circle cx="43" cy="55" r="4" fill="#94A3B8" />
      <path d="M74 45L78 53L87 54L80 60L82 69L74 64L66 69L68 60L61 54L70 53Z" fill="#F5C518" opacity="0.75" />
    </svg>
  );
}
