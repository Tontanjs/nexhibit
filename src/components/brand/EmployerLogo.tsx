import Image from "next/image";

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
        "relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-ink-200 bg-white shadow-sm ring-1 ring-white/70",
        className,
      )}
    >
      <Image
        src={getEmployerLogoSrc(employer.id)}
        alt=""
        aria-hidden="true"
        fill
        sizes="48px"
        className="object-contain p-1.5"
      />
    </span>
  );
}
