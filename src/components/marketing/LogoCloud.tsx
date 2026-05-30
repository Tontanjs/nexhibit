import { EmployerLogo } from "@/components/brand/EmployerLogo";
import { Marquee } from "@/components/motion/Marquee";
import { Reveal } from "@/components/motion/Reveal";
import { employers } from "@/lib/mock-data";
import type { Employer } from "@/lib/mock-data/types";
import { copy } from "@/lib/copy";

const extraEmployers: Employer[] = [
  {
    ...employers[0],
    id: "emp-001",
    name: "NetEase Global",
    logoLetter: "NE",
    logoColor: "#E60012",
  },
  {
    ...employers[1],
    id: "emp-002",
    name: "Geely Mobility",
    logoLetter: "GE",
    logoColor: "#0F4C81",
  },
  {
    ...employers[2],
    id: "emp-003",
    name: "Hikvision",
    logoLetter: "HK",
    logoColor: "#C8102E",
  },
  {
    ...employers[3],
    id: "emp-004",
    name: "Dahua Technology",
    logoLetter: "DH",
    logoColor: "#1455D9",
  },
];

export function LogoCloud() {
  const logos = [...employers, ...extraEmployers];

  return (
    <section className="bg-surface-0 py-10">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="mb-6 text-center text-xs font-bold uppercase tracking-[0.22em] text-ink-400">
            {copy.marketing.logoCloud.heading}
          </p>
        </Reveal>
      </div>
      <Marquee speed="60s" className="[mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]" contentClassName="gap-10 px-5">
        {logos.map((employer) => (
          <div
            key={`${employer.id}-${employer.name}`}
            className="group flex min-w-[220px] items-center justify-center gap-3 rounded-lg border border-ink-100 bg-surface-0 px-5 py-4 text-ink-400 grayscale transition hover:border-gold-500/40 hover:text-ink-900 hover:grayscale-0"
          >
            <EmployerLogo employer={employer} className="size-9 opacity-60 transition group-hover:opacity-100" />
            <span className="text-sm font-bold">{employer.name}</span>
          </div>
        ))}
      </Marquee>
    </section>
  );
}
