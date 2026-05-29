import { useId } from "react";

export type VerificationPendingProps = {
  size?: number;
  className?: string;
};

export function VerificationPending({ size = 220, className }: VerificationPendingProps) {
  const titleId = `${useId()}-verification-title`.replace(/:/g, "");
  const descId = `${useId()}-verification-desc`.replace(/:/g, "");

  return (
    <svg width={size} height={size} viewBox="0 0 220 220" role="img" aria-labelledby={`${titleId} ${descId}`} className={className} xmlns="http://www.w3.org/2000/svg">
      <title id={titleId}>Verification pending</title>
      <desc id={descId}>An hourglass illustration for employer verification waiting state.</desc>
      <circle cx="110" cy="110" r="86" fill="#F8FAFC" />
      <path d="M75 49H145" stroke="#0A0E1A" strokeWidth="7" strokeLinecap="round" />
      <path d="M75 171H145" stroke="#0A0E1A" strokeWidth="7" strokeLinecap="round" />
      <path d="M85 56C85 82 102 92 110 110C118 92 135 82 135 56H85Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="5" strokeLinejoin="round" />
      <path d="M85 164C85 138 102 128 110 110C118 128 135 138 135 164H85Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="5" strokeLinejoin="round" />
      <path d="M98 73H122C120 84 115 91 110 101C105 91 100 84 98 73Z" fill="#F5C518" />
      <path d="M110 119C116 133 124 144 126 155H94C96 144 104 133 110 119Z" fill="#F5C518" />
      <circle cx="159" cy="74" r="5" fill="#94A3B8" />
      <circle cx="61" cy="142" r="5" fill="#F5C518" />
    </svg>
  );
}
