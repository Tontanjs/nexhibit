import type { Employer } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { getEmployerLogoSrc } from "@/lib/visual-assets";

type EmployerLogoProps = {
  employer: Pick<Employer, "id" | "name" | "logoColor" | "logoLetter">;
  className?: string;
};

export function EmployerLogo({ employer, className }: EmployerLogoProps) {
  return (
    <span
      role="img"
      aria-label={`${employer.name} logo`}
      className={cn(
        "block size-10 shrink-0 rounded-lg border border-ink-200 bg-cover bg-center shadow-sm",
        className,
      )}
      style={{
        backgroundColor: employer.logoColor,
        backgroundImage: `url("${getEmployerLogoSrc(employer.id)}")`,
      }}
    >
      <span className="sr-only">{employer.logoLetter}</span>
    </span>
  );
}
