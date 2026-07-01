import { useId } from "react";

export type QRBadgeProps = {
  size?: number;
  studentId?: string;
  boothNumber?: string;
  verifiedCaption?: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  preserveAspectRatio?: string;
};

const GRID_SIZE = 21;
const FINDER_SIZE = 7;
const QR_VIEWBOX_WIDTH = 240;
const QR_VIEWBOX_HEIGHT = 300;

function hashString(value: string) {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

function isFinderArea(x: number, y: number) {
  const inTopLeft = x < FINDER_SIZE && y < FINDER_SIZE;
  const inTopRight = x >= GRID_SIZE - FINDER_SIZE && y < FINDER_SIZE;
  const inBottomLeft = x < FINDER_SIZE && y >= GRID_SIZE - FINDER_SIZE;

  return inTopLeft || inTopRight || inBottomLeft;
}

function isFinderPixel(x: number, y: number) {
  const localX = x >= GRID_SIZE - FINDER_SIZE ? x - (GRID_SIZE - FINDER_SIZE) : x;
  const localY = y >= GRID_SIZE - FINDER_SIZE ? y - (GRID_SIZE - FINDER_SIZE) : y;
  const outerRing = localX === 0 || localX === 6 || localY === 0 || localY === 6;
  const innerBlock = localX >= 2 && localX <= 4 && localY >= 2 && localY <= 4;

  return outerRing || innerBlock;
}

function isDataPixel(x: number, y: number, seed: number) {
  if (isFinderArea(x, y)) {
    return isFinderPixel(x, y);
  }

  if (x === 6 || y === 6) {
    return (x + y) % 2 === 0;
  }

  const mixed = Math.imul(x + 17, 73856093) ^ Math.imul(y + 31, 19349663) ^ seed;
  const value = Math.abs(Math.sin(mixed) * 10000);
  const fractional = value - Math.floor(value);

  return fractional > 0.58 || ((x * 3 + y * 5 + seed) % 11 === 0 && x % 2 === 0);
}

export function QRBadge({
  size = 240,
  studentId,
  boothNumber,
  verifiedCaption = "ZJUT verification demo",
  className,
  width,
  height,
  preserveAspectRatio = "xMidYMid meet",
}: QRBadgeProps) {
  const titleId = `${useId()}-qr-badge-title`.replace(/:/g, "");
  const descId = `${useId()}-qr-badge-desc`.replace(/:/g, "");
  const computedHeight = Math.round((size / QR_VIEWBOX_WIDTH) * QR_VIEWBOX_HEIGHT);
  const seed = hashString(`${studentId ?? "nexhibit-student"}:${boothNumber ?? "open-booth"}`);
  const qrSize = 168;
  const cellSize = qrSize / GRID_SIZE;
  const qrX = 36;
  const qrY = boothNumber ? 64 : 50;
  const captionY = studentId ? 274 : 266;
  const cells = Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, index) => {
    const x = index % GRID_SIZE;
    const y = Math.floor(index / GRID_SIZE);

    return { x, y, filled: isDataPixel(x, y, seed) };
  }).filter((cell) => cell.filled);

  return (
    <svg
      width={width ?? size}
      height={height ?? computedHeight}
      viewBox={`0 0 ${QR_VIEWBOX_WIDTH} ${QR_VIEWBOX_HEIGHT}`}
      role="img"
      aria-labelledby={`${titleId} ${descId}`}
      className={className}
      preserveAspectRatio={preserveAspectRatio}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id={titleId}>NEXHIBIT QR badge</title>
      <desc id={descId}>
        {`Stylized QR badge${boothNumber ? ` for booth ${boothNumber}` : ""}${
          studentId ? `, student ${studentId}` : ""
        }, marked as ${verifiedCaption}.`}
      </desc>
      <rect x="2" y="2" width="236" height="296" rx="20" fill="#FFFFFF" stroke="#F5C518" strokeWidth="4" />

      {boothNumber ? (
        <text
          x="120"
          y="36"
          textAnchor="middle"
          fill="#0A0E1A"
          fontFamily="Inter, Arial, sans-serif"
          fontSize="18"
          fontWeight="800"
          letterSpacing="1.4"
        >
          BOOTH {boothNumber}
        </text>
      ) : null}

      <rect x={qrX - 10} y={qrY - 10} width={qrSize + 20} height={qrSize + 20} rx="12" fill="#FFFFFF" />
      <rect x={qrX - 8} y={qrY - 8} width={qrSize + 16} height={qrSize + 16} rx="10" fill="#F8FAFC" />
      <g shapeRendering="crispEdges">
        {cells.map((cell) => (
          <rect
            key={`${cell.x}-${cell.y}`}
            x={qrX + cell.x * cellSize}
            y={qrY + cell.y * cellSize}
            width={cellSize * 0.92}
            height={cellSize * 0.92}
            rx="0.6"
            fill="#0A0E1A"
          />
        ))}
      </g>

      <rect x={qrX + 70} y={qrY + 70} width="28" height="28" rx="6" fill="#FFFFFF" />
      <circle cx={qrX + 84} cy={qrY + 84} r="8" fill="#F5C518" />

      {studentId ? (
        <text
          x="120"
          y="254"
          textAnchor="middle"
          fill="#0A0E1A"
          fontFamily="Inter, Arial, sans-serif"
          fontSize="13"
          fontWeight="700"
        >
          {studentId}
        </text>
      ) : null}

      <text
        x="120"
        y={captionY}
        textAnchor="middle"
        fill="#475569"
        fontFamily="Inter, Arial, sans-serif"
        fontSize="12"
        fontWeight="600"
      >
        {verifiedCaption}
      </text>
    </svg>
  );
}
