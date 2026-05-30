import { Card } from "@/components/ui/card";
import { quotes } from "@/lib/mock-data";
import { copy } from "@/lib/copy";

const selectedQuotes = [
  ...quotes.filter((quote) => quote.mood === "hopeful"),
  ...quotes.filter((quote) => quote.mood === "frustrated"),
].slice(0, 3);

export function TestimonialGrid() {
  return (
    <section className="bg-surface-50 py-20 md:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-gold-600">{copy.marketing.testimonials.caption}</p>
          <h2 className="mt-3 text-3xl font-bold tracking-normal text-ink-900 md:text-4xl">
            {copy.marketing.testimonials.heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-600">{copy.marketing.testimonials.intro}</p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {selectedQuotes.map((quote) => (
            <Card key={quote.id} className="p-8 transition-all hover:-translate-y-1 hover:border-gold-500/35 hover:shadow-lg">
              <div className="text-6xl font-extrabold leading-none text-gold-500">&ldquo;</div>
              <blockquote className="mt-2 text-lg italic leading-relaxed text-ink-800">{quote.text}</blockquote>
              <p className="mt-6 text-sm font-semibold text-ink-900">{quote.authorCode}</p>
              <p className="mt-1 text-sm text-ink-500">{quote.authorContext}</p>
            </Card>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm italic text-ink-500">{copy.marketing.testimonials.note}</p>
      </div>
    </section>
  );
}
