import { QRBadge } from "@/components/icons";
import { cn } from "@/lib/utils";

type EventPassCardProps = {
  studentName: string;
  studentId: string;
  boothNumber: string;
  slotTime: string;
  verifiedCaption: string;
  className?: string;
};

export function EventPassCard({
  studentName,
  studentId,
  boothNumber,
  slotTime,
  verifiedCaption,
  className,
}: EventPassCardProps) {
  return (
    <div className={cn("glass-card neon-border overflow-hidden rounded-lg p-5 text-center", className)}>
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold-300">Event pass</p>
      <div className="mx-auto mt-4 h-52 w-40 drop-shadow-[0_20px_42px_rgba(250,204,21,0.18)]">
        <QRBadge
          studentId={studentId}
          boothNumber={boothNumber}
          verifiedCaption={verifiedCaption}
          className="h-full w-full"
        />
      </div>
      <p className="mt-4 text-sm font-bold text-surface-0">{studentName}</p>
      <p className="mt-1 text-xs text-ink-300">Booth {boothNumber} · {slotTime}</p>
      <p className="mt-3 rounded-md border border-white/10 bg-white/[0.07] px-3 py-2 text-xs leading-5 text-ink-300">
        Visible profile fields follow the current prototype privacy settings.
      </p>
    </div>
  );
}
