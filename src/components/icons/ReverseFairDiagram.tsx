import { useId } from "react";

export type ReverseFairDiagramProps = {
  className?: string;
  width?: number | string;
  height?: number | string;
  preserveAspectRatio?: string;
};

const ink900 = "#0A0E1A";
const ink400 = "#94A3B8";
const ink300 = "#CBD5E1";
const gold500 = "#F5C518";

function StudentFigure({ x, y, muted = false }: { x: number; y: number; muted?: boolean }) {
  const fill = muted ? ink400 : ink900;

  return (
    <g>
      <circle cx={x} cy={y} r="18" fill={fill} />
      <rect x={x - 22} y={y + 24} width="44" height="58" rx="14" fill={fill} />
      <path d={`M${x - 38} ${y + 42}H${x + 38}`} stroke={fill} strokeWidth="10" strokeLinecap="round" />
    </g>
  );
}

function EmployerBooth({ x, y, muted = true }: { x: number; y: number; muted?: boolean }) {
  const stroke = muted ? ink400 : ink900;
  const fill = muted ? "#F1F5F9" : "#FFFFFF";

  return (
    <g>
      <path d={`M${x} ${y}H${x + 92}L${x + 78} ${y + 28}H${x + 14}Z`} fill={fill} stroke={stroke} strokeWidth="3" />
      <rect x={x + 12} y={y + 28} width="68" height="62" rx="6" fill={fill} stroke={stroke} strokeWidth="3" />
      <path d={`M${x + 12} ${y + 52}H${x + 80}`} stroke={stroke} strokeWidth="3" />
      <circle cx={x + 34} cy={y + 72} r="8" fill={stroke} opacity="0.75" />
      <circle cx={x + 58} cy={y + 72} r="8" fill={stroke} opacity="0.75" />
    </g>
  );
}

function StudentBooth({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x} y={y + 50} width="154" height="66" rx="10" fill="#FFFFFF" stroke={ink900} strokeWidth="4" />
      <path d={`M${x - 8} ${y + 50}H${x + 162}L${x + 142} ${y + 18}H${x + 12}Z`} fill="#FFF8D9" stroke={ink900} strokeWidth="4" />
      <text
        x={x + 77}
        y={y + 88}
        textAnchor="middle"
        fill={ink900}
        fontFamily="Inter, Arial, sans-serif"
        fontSize="15"
        fontWeight="800"
      >
        STUDENT
      </text>
      <rect x={x + 112} y={y + 64} width="24" height="24" rx="4" fill="#FFFFFF" stroke={gold500} strokeWidth="3" />
      <path d={`M${x + 118} ${y + 70}H${x + 124}V${y + 76}H${x + 118}Z`} fill={ink900} />
      <path d={`M${x + 128} ${y + 70}H${x + 134}V${y + 76}H${x + 128}Z`} fill={ink900} />
      <path d={`M${x + 118} ${y + 80}H${x + 124}V${y + 86}H${x + 118}Z`} fill={ink900} />
      <circle cx={x + 132} cy={y + 83} r="3" fill={gold500} />
      <StudentFigure x={x + 77} y={y + 4} />
    </g>
  );
}

function WalkingEmployer({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r="18" fill={ink900} />
      <rect x={x - 20} y={y + 24} width="40" height="52" rx="13" fill={ink900} />
      <path d={`M${x - 18} ${y + 78}L${x - 45} ${y + 118}`} stroke={ink900} strokeWidth="10" strokeLinecap="round" />
      <path d={`M${x + 16} ${y + 78}L${x + 48} ${y + 111}`} stroke={ink900} strokeWidth="10" strokeLinecap="round" />
      <path d={`M${x - 20} ${y + 44}L${x - 56} ${y + 58}`} stroke={ink900} strokeWidth="9" strokeLinecap="round" />
      <rect x={x + 30} y={y + 36} width="44" height="32" rx="6" fill="#FFFFFF" stroke={gold500} strokeWidth="4" />
    </g>
  );
}

export function ReverseFairDiagram({
  className,
  width = 900,
  height = 500,
  preserveAspectRatio = "xMidYMid meet",
}: ReverseFairDiagramProps = {}) {
  const idPrefix = useId().replace(/:/g, "");
  const mutedArrowId = `${idPrefix}-arrow-muted`;
  const goldArrowId = `${idPrefix}-arrow-gold`;
  const titleId = `${idPrefix}-reverse-fair-title`;
  const descId = `${idPrefix}-reverse-fair-desc`;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 900 500"
      role="img"
      aria-labelledby={`${titleId} ${descId}`}
      className={className}
      preserveAspectRatio={preserveAspectRatio}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id={titleId}>Traditional fair versus NEXHIBIT flow</title>
      <desc id={descId}>
        Diagram comparing a traditional career fair where students chase employers with NEXHIBIT, where employers come to students.
      </desc>
      <defs>
        <marker id={mutedArrowId} markerWidth="14" markerHeight="14" refX="12" refY="7" orient="auto" markerUnits="strokeWidth">
          <path d="M2 2L12 7L2 12Z" fill={ink400} />
        </marker>
        <marker id={goldArrowId} markerWidth="14" markerHeight="14" refX="12" refY="7" orient="auto" markerUnits="strokeWidth">
          <path d="M2 2L12 7L2 12Z" fill={gold500} />
        </marker>
      </defs>

      <rect width="900" height="500" rx="26" fill="#FFFFFF" />
      <path d="M48 250H852" stroke={ink300} strokeDasharray="10 12" />

      <text x="56" y="48" fill={ink400} fontFamily="Inter, Arial, sans-serif" fontSize="20" fontWeight="900" letterSpacing="1.6">
        TRADITIONAL FAIR
      </text>
      <StudentFigure x={142} y={106} muted />
      <path d="M230 138H434" stroke={ink400} strokeWidth="8" strokeLinecap="round" markerEnd={`url(#${mutedArrowId})`} />
      <EmployerBooth x={500} y={82} />
      <EmployerBooth x={622} y={82} />
      <EmployerBooth x={744} y={82} />
      <text x="450" y="224" textAnchor="middle" fill={ink400} fontFamily="Inter, Arial, sans-serif" fontSize="18" fontWeight="700">
        Student chases employers
      </text>

      <text x="56" y="298" fill={gold500} fontFamily="Inter, Arial, sans-serif" fontSize="22" fontWeight="900" letterSpacing="1.6">
        NEXHIBIT
      </text>
      <StudentBooth x={88} y={340} />
      <path d="M690 382H334" stroke={gold500} strokeWidth="8" strokeLinecap="round" markerEnd={`url(#${goldArrowId})`} />
      <WalkingEmployer x={740} y={340} />
      <text x="450" y="466" textAnchor="middle" fill={ink900} fontFamily="Inter, Arial, sans-serif" fontSize="19" fontWeight="800">
        Employers come to you
      </text>
    </svg>
  );
}
