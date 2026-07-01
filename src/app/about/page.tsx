import { ReverseFairDiagram } from "@/components/icons";
import { PrototypeNotice } from "@/components/brand/prototype-notice";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Card } from "@/components/ui/card";
import { copy } from "@/lib/copy";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="aurora-bg py-20 md:py-28">
          <div className="mx-auto w-full max-w-5xl px-4 text-center sm:px-6 lg:px-8">
            <p className="text-xs font-medium uppercase tracking-wide text-gold-300">{copy.pages.about.heroCaption}</p>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-normal text-surface-0 sm:text-5xl md:text-7xl">
              {copy.pages.about.heroHeading}
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-ink-300">{copy.pages.about.heroBody}</p>
            <PrototypeNotice
              variant="dark"
              message="Class-project prototype · Research and platform data are presented as demo context, not production evidence."
              className="mx-auto mt-6 max-w-2xl text-left"
            />
          </div>
        </section>

        <section className="bg-surface-0 py-20 md:py-24">
          <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-[1fr_0.8fr] md:items-center lg:px-8">
            <div>
              <h2 className="text-3xl font-bold tracking-normal text-ink-900 md:text-4xl">{copy.pages.about.problemHeading}</h2>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-600">{copy.pages.about.problemBody}</p>
            </div>
            <div className="grid gap-4">
              {copy.pages.about.problemStats.map((stat) => (
                <Card key={stat} className="p-6 transition-all hover:-translate-y-1 hover:border-gold-500/35 hover:shadow-lg">
                  <p className="text-xl font-semibold leading-snug text-ink-900">{stat}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="aurora-bg py-20 md:py-24">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 md:grid-cols-[0.95fr_1.05fr] md:items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-normal text-surface-0 md:text-4xl">{copy.pages.about.solutionHeading}</h2>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-300">{copy.pages.about.solutionBody}</p>
              </div>
              <ReverseFairDiagram className="h-auto w-full rounded-lg shadow-2xl" />
            </div>
          </div>
        </section>

        <section className="bg-surface-50 py-20 md:py-24">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl font-bold tracking-normal text-ink-900 md:text-4xl">{copy.pages.about.teamHeading}</h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {copy.pages.about.teamMembers.map((member) => (
                <Card key={member.name} className="p-6 text-center transition-all hover:-translate-y-1 hover:border-gold-500/35 hover:shadow-lg">
                  <div className="mx-auto flex size-16 items-center justify-center rounded-lg bg-ink-900 text-xl font-extrabold text-gold-400 shadow-lg shadow-ink-900/15">
                    {member.initials}
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-ink-900">{member.name}</h3>
                  <p className="mt-2 text-sm text-ink-600">{member.role}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface-0 py-16">
          <div className="mx-auto w-full max-w-5xl px-4 text-center sm:px-6 lg:px-8">
            <p className="text-xs font-medium uppercase tracking-wide text-gold-600">{copy.pages.about.builtWithHeading}</p>
            <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-ink-700">{copy.pages.about.builtWithBody}</p>
            <div className="mt-8 inline-flex items-center gap-4 rounded-lg border border-ink-200 bg-surface-50 px-5 py-4">
              <span className="flex size-12 items-center justify-center rounded-md bg-ink-900 text-sm font-extrabold text-gold-500">
                {copy.pages.about.zjutLogo}
              </span>
              <span className="text-sm font-semibold text-ink-700">{copy.pages.about.facultyAdvisor}</span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
