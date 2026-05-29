import { useId } from "react";

export type LoadingDotsProps = {
  size?: number;
  color?: string;
};

export function LoadingDots({ size = 48, color = "#475569" }: LoadingDotsProps) {
  const titleId = `${useId()}-loading-title`.replace(/:/g, "");
  const descId = `${useId()}-loading-desc`.replace(/:/g, "");

  return (
    <svg width={size} height={size} viewBox="0 0 48 48" role="img" aria-labelledby={`${titleId} ${descId}`} xmlns="http://www.w3.org/2000/svg">
      <title id={titleId}>Loading</title>
      <desc id={descId}>Three animated dots indicating loading.</desc>
      <style>
        {`
          @keyframes nexhibitDotBounce {
            0%, 80%, 100% { transform: translateY(0); opacity: 0.45; }
            40% { transform: translateY(-7px); opacity: 1; }
          }
          .nexhibit-loading-dot { animation: nexhibitDotBounce 1.1s infinite ease-in-out; transform-origin: center; }
          .nexhibit-loading-dot:nth-of-type(2) { animation-delay: 120ms; }
          .nexhibit-loading-dot:nth-of-type(3) { animation-delay: 240ms; }
          @media (prefers-reduced-motion: reduce) {
            .nexhibit-loading-dot { animation: none; opacity: 1; }
          }
        `}
      </style>
      <circle className="nexhibit-loading-dot" cx="13" cy="24" r="5" fill={color} />
      <circle className="nexhibit-loading-dot" cx="24" cy="24" r="5" fill={color} />
      <circle className="nexhibit-loading-dot" cx="35" cy="24" r="5" fill={color} />
    </svg>
  );
}
