import { useId } from "react";

export type SuccessCheckProps = {
  size?: number;
  animated?: boolean;
  message?: string;
};

export function SuccessCheck({ size = 96, animated = false, message }: SuccessCheckProps) {
  const titleId = `${useId()}-success-title`.replace(/:/g, "");
  const descId = `${useId()}-success-desc`.replace(/:/g, "");
  const height = message ? Math.round(size * 1.32) : size;

  return (
    <svg width={size} height={height} viewBox={`0 0 96 ${message ? 126 : 96}`} role="img" aria-labelledby={`${titleId} ${descId}`} xmlns="http://www.w3.org/2000/svg">
      <title id={titleId}>Success</title>
      <desc id={descId}>A green success checkmark animation.</desc>
      {animated ? (
        <style>
          {`
            @keyframes nexhibitCheckPop {
              0% { transform: scale(0.86); opacity: 0.35; }
              60% { transform: scale(1.05); opacity: 1; }
              100% { transform: scale(1); opacity: 1; }
            }
            .nexhibit-success-mark { animation: nexhibitCheckPop 520ms ease-out both; transform-origin: 48px 48px; }
            @media (prefers-reduced-motion: reduce) {
              .nexhibit-success-mark { animation: none; }
            }
          `}
        </style>
      ) : null}
      <g className={animated ? "nexhibit-success-mark" : undefined}>
        <circle cx="48" cy="48" r="40" fill="#DCFCE7" />
        <circle cx="48" cy="48" r="31" fill="#22C55E" />
        <path d="M32 48L43 59L66 35" fill="none" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      {message ? (
        <text x="48" y="116" textAnchor="middle" fill="#0A0E1A" fontFamily="Inter, Arial, sans-serif" fontSize="12" fontWeight="700">
          {message}
        </text>
      ) : null}
    </svg>
  );
}
