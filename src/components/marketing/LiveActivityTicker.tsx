import { Marquee } from "@/components/motion/Marquee";
import { copy } from "@/lib/copy";

export function LiveActivityTicker() {
  return (
    <section className="border-y border-gold-500/20 bg-ink-900 py-2 text-ink-300">
      <Marquee speed="80s" className="h-10" contentClassName="gap-0">
        {copy.marketing.liveActivity.map((item) => (
          <div key={item} className="mx-8 inline-flex h-10 items-center gap-3 text-sm font-medium">
            <span className="size-1.5 rounded-full bg-gold-500" aria-hidden="true" />
            <span>{item}</span>
          </div>
        ))}
      </Marquee>
    </section>
  );
}
