import { useId } from "react";

export type ScannerOverlayProps = {
  scanning?: boolean;
  instruction?: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  preserveAspectRatio?: string;
};

export function ScannerOverlay({
  scanning = false,
  instruction = "Align QR code within frame",
  className,
  width = 320,
  height = 320,
  preserveAspectRatio = "xMidYMid meet",
}: ScannerOverlayProps) {
  const gradientId = `${useId()}-scanner-line-gradient`.replace(/:/g, "");
  const titleId = `${useId()}-scanner-title`.replace(/:/g, "");
  const descId = `${useId()}-scanner-desc`.replace(/:/g, "");

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 320 320"
      role="img"
      aria-labelledby={`${titleId} ${descId}`}
      className={className}
      preserveAspectRatio={preserveAspectRatio}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id={titleId}>{scanning ? "Active QR scanner overlay" : "QR scanner overlay"}</title>
      <desc id={descId}>
        {scanning
          ? "Gold viewfinder frame with an animated scan line for aligning a profile QR code."
          : "Gold viewfinder frame for aligning a profile QR code."}
      </desc>
      {scanning ? (
        <style>
          {`
            @keyframes nexhibitScannerSweep {
              0% { transform: translateY(58px); opacity: 0.35; }
              50% { transform: translateY(258px); opacity: 1; }
              100% { transform: translateY(58px); opacity: 0.35; }
            }

            .nexhibit-scanner-line {
              animation: nexhibitScannerSweep 2s ease-in-out infinite;
              transform-box: fill-box;
              transform-origin: center;
            }

            @media (prefers-reduced-motion: reduce) {
              html:not([data-motion="force"]) .nexhibit-scanner-line {
                animation: none;
                transform: translateY(158px);
              }
            }
          `}
        </style>
      ) : null}

      <defs>
        <linearGradient id={gradientId} x1="44" y1="0" x2="276" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#F5C518" stopOpacity="0" />
          <stop offset="0.18" stopColor="#F5C518" stopOpacity="0.7" />
          <stop offset="0.5" stopColor="#FFF3A3" stopOpacity="1" />
          <stop offset="0.82" stopColor="#F5C518" stopOpacity="0.7" />
          <stop offset="1" stopColor="#F5C518" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="320" height="320" rx="18" fill="#05070D" />
      <rect x="42" y="42" width="236" height="236" rx="12" fill="none" stroke="#1F2937" strokeWidth="1" />

      <g fill="none" stroke="#F5C518" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M82 42H42V82" />
        <path d="M238 42H278V82" />
        <path d="M42 238V278H82" />
        <path d="M278 238V278H238" />
      </g>

      {scanning ? (
        <g className="nexhibit-scanner-line">
          <rect x="44" y="0" width="232" height="3" rx="1.5" fill={`url(#${gradientId})`} />
          <rect x="70" y="-12" width="180" height="27" rx="13.5" fill="#F5C518" opacity="0.12" />
        </g>
      ) : null}

      <rect x="69" y="149" width="182" height="28" rx="14" fill="#05070D" opacity="0.92" />
      <text
        x="160"
        y="166"
        textAnchor="middle"
        fill="#F5C518"
        fontFamily="Inter, Arial, sans-serif"
        fontSize="13"
        fontWeight="700"
      >
        {instruction}
      </text>
    </svg>
  );
}
