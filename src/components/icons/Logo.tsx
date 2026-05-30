import { useId } from "react";

export type LogoProps = {
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark";
  /** Shows the product tagline below the wordmark; added to support the requested tagline option. */
  showTagline?: boolean;
  tagline?: string;
  className?: string;
};

const sizeMap = {
  sm: { width: 132, height: 44, wordmarkSize: 31, dotX: 124, dotR: 3.5, taglineSize: 8.5 },
  md: { width: 190, height: 64, wordmarkSize: 45, dotX: 178, dotR: 5, taglineSize: 12 },
  lg: { width: 280, height: 92, wordmarkSize: 66, dotX: 263, dotR: 7, taglineSize: 17 },
} as const;

export function Logo({
  size = "md",
  variant = "light",
  showTagline = true,
  tagline = "Where students get seen.",
  className,
}: LogoProps) {
  const config = sizeMap[size];
  const textFill = variant === "dark" ? "#FFFFFF" : "#0A0E1A";
  const taglineFill = variant === "dark" ? "#D1D5DB" : "#64748B";
  const viewBoxHeight = showTagline ? config.height : Math.round(config.height * 0.72);
  const baselineY = Math.round(config.wordmarkSize * 0.9);
  const dotY = Math.round(config.wordmarkSize * 0.69);
  const titleId = `${useId()}-logo-title`.replace(/:/g, "");
  const descId = `${useId()}-logo-desc`.replace(/:/g, "");

  return (
    <svg
      width={config.width}
      height={viewBoxHeight}
      viewBox={`0 0 ${config.width} ${viewBoxHeight}`}
      role="img"
      aria-labelledby={`${titleId} ${descId}`}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id={titleId}>Nexhibit logo</title>
      <desc id={descId}>{showTagline ? `Nexhibit wordmark with tagline: ${tagline}` : "Nexhibit wordmark."}</desc>
      <text
        x="0"
        y={baselineY}
        fill={textFill}
        fontFamily="Inter, Arial, sans-serif"
        fontSize={config.wordmarkSize}
        fontWeight="800"
      >
        Nexhibit
      </text>
      <circle className="logo-dot-pulse" cx={config.dotX} cy={dotY} r={config.dotR} fill="#F5C518" />

      {showTagline ? (
        <text
          x="2"
          y={config.height - 7}
          fill={taglineFill}
          fontFamily="Inter, Arial, sans-serif"
          fontSize={config.taglineSize}
          fontWeight="500"
        >
          {tagline}
        </text>
      ) : null}
    </svg>
  );
}
