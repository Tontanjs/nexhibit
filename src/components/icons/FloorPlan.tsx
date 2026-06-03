import { useId } from "react";

export type FloorPlanProps = {
  highlightedBooth?: string;
  numbering?: "global" | "category";
  className?: string;
  width?: number | string;
  height?: number | string;
  preserveAspectRatio?: string;
};

type Section = {
  name: string;
  prefix: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  booths: number;
  columns: number;
  startNumber: number;
  categoryPrefix: string;
};

const sections: Section[] = [
  { name: "Business", prefix: "B", x: 40, y: 40, width: 330, height: 170, fill: "#EAF4FF", booths: 24, columns: 6, startNumber: 1, categoryPrefix: "B" },
  { name: "Engineering", prefix: "B", x: 430, y: 40, width: 330, height: 170, fill: "#F2EEFF", booths: 24, columns: 6, startNumber: 25, categoryPrefix: "E" },
  { name: "Health", prefix: "B", x: 40, y: 260, width: 220, height: 170, fill: "#EAF8EF", booths: 18, columns: 6, startNumber: 49, categoryPrefix: "H" },
  { name: "Language", prefix: "B", x: 290, y: 260, width: 220, height: 170, fill: "#FFF8D9", booths: 20, columns: 5, startNumber: 67, categoryPrefix: "L" },
  { name: "Other", prefix: "B", x: 540, y: 260, width: 220, height: 170, fill: "#FCEAF2", booths: 16, columns: 4, startNumber: 87, categoryPrefix: "O" },
];

function getBooths(section: Section, numbering: "global" | "category") {
  const gap = 10;
  const labelHeight = 34;
  const boothWidth = (section.width - gap * (section.columns + 1)) / section.columns;
  const rows = Math.ceil(section.booths / section.columns);
  const boothHeight = Math.min(24, (section.height - labelHeight - gap * (rows + 1)) / rows);

  return Array.from({ length: section.booths }, (_, index) => {
    const column = index % section.columns;
    const row = Math.floor(index / section.columns);

    const label = numbering === "category" ? `${section.categoryPrefix}-${index + 1}` : `${section.prefix}-${section.startNumber + index}`;

    return {
      id: label,
      x: section.x + gap + column * (boothWidth + gap),
      y: section.y + labelHeight + gap + row * (boothHeight + gap),
      width: boothWidth,
      height: boothHeight,
    };
  });
}

export function FloorPlan({
  highlightedBooth,
  numbering = "global",
  className,
  width = 800,
  height = 500,
  preserveAspectRatio = "xMidYMid meet",
}: FloorPlanProps) {
  const normalizedHighlight = highlightedBooth?.trim().toUpperCase();
  const titleId = `${useId()}-floor-plan-title`.replace(/:/g, "");
  const descId = `${useId()}-floor-plan-desc`.replace(/:/g, "");

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 800 500"
      role="img"
      aria-labelledby={`${titleId} ${descId}`}
      className={className}
      preserveAspectRatio={preserveAspectRatio}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id={titleId}>NEXHIBIT event hall floor plan</title>
      <desc id={descId}>
        {highlightedBooth
          ? `Five-section event hall floor plan with booth ${highlightedBooth} highlighted.`
          : "Five-section event hall floor plan for Business, Engineering, Health, Language, and Other student booths."}
      </desc>
      <style>
        {`
          @keyframes nexhibitBoothPulse {
            0%, 100% { opacity: 0.48; stroke-width: 2; }
            50% { opacity: 1; stroke-width: 6; }
          }

          .nexhibit-highlight-ring {
            animation: nexhibitBoothPulse 1.6s ease-in-out infinite;
          }

          @media (prefers-reduced-motion: reduce) {
            html:not([data-motion="force"]) .nexhibit-highlight-ring {
              animation: none;
              opacity: 1;
            }
          }
        `}
      </style>

      <rect width="800" height="500" rx="24" fill="#F8FAFC" />
      <path d="M400 236V236" stroke="#CBD5E1" />
      <path d="M40 236H760" stroke="#CBD5E1" strokeDasharray="8 10" />

      {sections.map((section) => {
        const booths = getBooths(section, numbering);

        return (
          <g key={section.name}>
            <rect
              x={section.x}
              y={section.y}
              width={section.width}
              height={section.height}
              rx="14"
              fill={section.fill}
              stroke="#CBD5E1"
            />
            <text
              x={section.x + 16}
              y={section.y + 24}
              fill="#0A0E1A"
              fontFamily="Inter, Arial, sans-serif"
              fontSize="15"
              fontWeight="800"
            >
              {section.name}
            </text>

            {booths.map((booth) => {
              const isHighlighted = booth.id.toUpperCase() === normalizedHighlight;

              return (
                <g key={booth.id}>
                  {isHighlighted ? (
                    <rect
                      className="nexhibit-highlight-ring"
                      x={booth.x - 4}
                      y={booth.y - 4}
                      width={booth.width + 8}
                      height={booth.height + 8}
                      rx="8"
                      fill="none"
                      stroke="#F5C518"
                    />
                  ) : null}
                  <rect
                    x={booth.x}
                    y={booth.y}
                    width={booth.width}
                    height={booth.height}
                    rx="5"
                    fill={isHighlighted ? "#F5C518" : "#FFFFFF"}
                    stroke={isHighlighted ? "#0A0E1A" : "#CBD5E1"}
                    strokeWidth={isHighlighted ? "2" : "1"}
                  />
                  <text
                    x={booth.x + booth.width / 2}
                    y={booth.y + booth.height / 2 + 3}
                    textAnchor="middle"
                    fill="#0A0E1A"
                    fontFamily="Inter, Arial, sans-serif"
                    fontSize="8"
                    fontWeight={isHighlighted ? "800" : "700"}
                  >
                    {booth.id}
                  </text>
                </g>
              );
            })}
          </g>
        );
      })}

      <g aria-label="Entrance" role="img">
        <path d="M400 474L378 446H392V418H408V446H422L400 474Z" fill="#0A0E1A" />
        <text
          x="400"
          y="492"
          textAnchor="middle"
          fill="#0A0E1A"
          fontFamily="Inter, Arial, sans-serif"
          fontSize="12"
          fontWeight="800"
          letterSpacing="1.2"
        >
          ENTRANCE
        </text>
      </g>
    </svg>
  );
}
