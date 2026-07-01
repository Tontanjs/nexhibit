import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Users, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { companyInsights } from "@/lib/mock-data/network";
import { NetworkTrustFooter } from "@/components/network/NetworkTrustFooter";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return companyInsights.map((c) => ({ id: c.id }));
}

interface Props {
  params: Promise<{ id: string }>;
}

function StarRating({ value }: { value: number }) {
  const full = Math.floor(value);
  const empty = 5 - full;
  return (
    <span className="text-gold-500">
      {"★".repeat(full)}
      {"☆".repeat(empty)}
    </span>
  );
}

export default async function CompanyDetailPage({ params }: Props) {
  const { id } = await params;
  const company = companyInsights.find((c) => c.id === id);
  if (!company) notFound();

  const typeVariant =
    company.type === "MNC" ? "outline" : company.type === "Startup" ? "secondary" : "default";

  return (
    <div className="min-h-screen bg-surface-0">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Back */}
        <Link
          href="/student/network/companies"
          className="inline-flex items-center gap-1.5 text-sm text-ink-600 hover:text-ink-900 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Company Insights
        </Link>

        {/* Header */}
        <div className="border border-ink-200 rounded-2xl p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className={cn("flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-xl font-bold", company.logoColor)}>
              {company.logoLetter}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-xl font-bold text-ink-900">{company.name}</h1>
                <Badge variant={typeVariant}>{company.type}</Badge>
              </div>
              <p className="text-sm text-ink-600 mb-2">{company.industry}</p>
              <div className="flex flex-wrap gap-3 text-xs text-ink-400">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {company.locations.join(", ")}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {company.alumniCount} ZJUT alumni
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Ratings */}
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-ink-900 uppercase tracking-wide mb-3">Alumni Ratings</h2>
          <div className="border border-ink-200 rounded-xl overflow-hidden">
            {Object.entries({
              "International friendliness": company.ratings.internationalFriendliness,
              "Work-life balance": company.ratings.workLifeBalance,
              "Career growth": company.ratings.careerGrowth,
              "Compensation transparency": company.ratings.compensationTransparency,
            }).map(([label, value]) => (
              <div key={label} className="flex items-center justify-between px-4 py-3 border-b border-ink-200 last:border-b-0">
                <span className="text-sm text-ink-600">{label}</span>
                <div className="flex items-center gap-2">
                  <StarRating value={value} />
                  <span className="text-xs text-ink-400">{value}/5</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Key info */}
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-ink-900 uppercase tracking-wide mb-3">Key Information</h2>
          <div className="space-y-3">
            <div className="border border-ink-200 rounded-xl p-4">
              <p className="text-xs text-ink-400 uppercase tracking-wide mb-1">Language Expectation</p>
              <p className="text-sm text-ink-600">{company.languageExpectation}</p>
            </div>
            <div className="border border-ink-200 rounded-xl p-4">
              <p className="text-xs text-ink-400 uppercase tracking-wide mb-1">Visa Sponsorship History</p>
              <p className="text-sm text-ink-600">{company.visaSponsorshipHistory}</p>
            </div>
            <div className="border border-ink-200 rounded-xl p-4">
              <p className="text-xs text-ink-400 uppercase tracking-wide mb-1">Salary Range (Alumni-contributed)</p>
              <p className="text-sm text-ink-600">{company.salaryRange}</p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        {company.testimonials.length > 0 && (
          <section className="mb-6">
            <h2 className="text-sm font-semibold text-ink-900 uppercase tracking-wide mb-3">Alumni Testimonials</h2>
            <div className="space-y-3">
              {company.testimonials.map((t, i) => (
                <blockquote key={i} className="border border-ink-200 rounded-xl p-4">
                  <p className="text-sm text-ink-600 italic mb-2">&ldquo;{t.quote}&rdquo;</p>
                  <p className="text-xs text-ink-400">{t.authorLabel} &middot; {t.context}</p>
                </blockquote>
              ))}
            </div>
          </section>
        )}

        {/* Application tips */}
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-ink-900 uppercase tracking-wide mb-3">Application Tips</h2>
          <ul className="space-y-2">
            {company.applicationTips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                <span className="text-sm text-ink-600">{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Interview questions */}
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-ink-900 uppercase tracking-wide mb-3">Reported Interview Questions</h2>
          <ul className="space-y-2">
            {company.interviewQuestions.map((q, i) => (
              <li key={i} className="border border-ink-200 rounded-lg px-4 py-3 text-sm text-ink-600">
                {q}
              </li>
            ))}
          </ul>
        </section>

        <NetworkTrustFooter />
      </div>
    </div>
  );
}
