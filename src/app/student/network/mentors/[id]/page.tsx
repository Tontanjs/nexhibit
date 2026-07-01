import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Clock, MessageSquare, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { networkMentors } from "@/lib/mock-data/network";
import { MentorRequestModal } from "@/components/network/MentorRequestModal";
import { NetworkTrustFooter } from "@/components/network/NetworkTrustFooter";

export function generateStaticParams() {
  return networkMentors.map((m) => ({ id: m.id }));
}

interface Props {
  params: Promise<{ id: string }>;
}

export default async function MentorDetailPage({ params }: Props) {
  const { id } = await params;
  const mentor = networkMentors.find((m) => m.id === id);
  if (!mentor) notFound();

  const availabilityVariant =
    mentor.availability === "Available"
      ? "success"
      : mentor.availability === "Limited"
      ? "secondary"
      : "destructive";

  return (
    <div className="min-h-screen bg-surface-0">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Back */}
        <Link
          href="/student/network/mentors"
          className="inline-flex items-center gap-1.5 text-sm text-ink-600 hover:text-ink-900 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Alumni Mentors
        </Link>

        {/* Header */}
        <div className="border border-ink-200 rounded-2xl p-6 mb-6 bg-surface-0">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-ink-900 text-surface-0 text-lg font-bold">
              {mentor.initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-xl font-bold text-ink-900">{mentor.firstName}</h1>
                <span className="text-lg" aria-label={mentor.nationality}>{mentor.nationalityFlag}</span>
                <Badge variant={availabilityVariant}>{mentor.availability}</Badge>
              </div>
              <p className="text-sm text-ink-600 mb-1">
                {mentor.currentPosition} at {mentor.currentCompany}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-ink-400">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {mentor.location}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {mentor.responseTime}
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquare className="h-3 w-3" />
                  {mentor.sessionFormat}
                </span>
              </div>
            </div>
          </div>

          {/* Languages and specialties */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {mentor.languages.map((lang) => (
              <Badge key={lang} variant="outline" className="text-xs">
                {lang}
              </Badge>
            ))}
            {mentor.specialties.map((s) => (
              <Badge key={s} variant="secondary" className="text-xs">
                {s}
              </Badge>
            ))}
          </div>
        </div>

        {/* Bio */}
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-ink-900 uppercase tracking-wide mb-3">About</h2>
          <div className="space-y-3">
            {mentor.bio.map((paragraph, i) => (
              <p key={i} className="text-sm text-ink-600 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* Career timeline */}
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-ink-900 uppercase tracking-wide mb-3">Career Timeline</h2>
          <ol className="space-y-3">
            {mentor.careerTimeline.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-xs font-mono text-ink-400 mt-0.5 w-10 shrink-0">{item.year}</span>
                <div>
                  <p className="text-sm font-medium text-ink-900">{item.role}</p>
                  <p className="text-xs text-ink-400">{item.company}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Help areas */}
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-ink-900 uppercase tracking-wide mb-3">How I Can Help</h2>
          <ul className="space-y-2">
            {mentor.helpAreas.map((area) => (
              <li key={area} className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                <span className="text-sm text-ink-600">{area}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Reviews */}
        {mentor.reviews.length > 0 && (
          <section className="mb-8">
            <h2 className="text-sm font-semibold text-ink-900 uppercase tracking-wide mb-3">Past Mentee Reviews</h2>
            <div className="space-y-3">
              {mentor.reviews.map((review, i) => (
                <blockquote
                  key={i}
                  className="border-l-2 border-ink-200 pl-4"
                >
                  <p className="text-sm text-ink-600 italic mb-1">&ldquo;{review.quote}&rdquo;</p>
                  <p className="text-xs text-ink-400">{review.menteeLabel}</p>
                </blockquote>
              ))}
            </div>
          </section>
        )}

        {/* Request mentorship CTA */}
        <MentorRequestModal mentor={mentor} />

        <div className="mt-10">
          <NetworkTrustFooter />
        </div>
      </div>
    </div>
  );
}
