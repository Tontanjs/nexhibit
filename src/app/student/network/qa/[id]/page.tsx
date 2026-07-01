import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { communityQuestions } from "@/lib/mock-data/network";
import { QuestionDetail } from "@/components/network/QuestionDetail";
import { NetworkTrustFooter } from "@/components/network/NetworkTrustFooter";

export function generateStaticParams() {
  return communityQuestions.map((q) => ({ id: q.id }));
}

interface Props {
  params: Promise<{ id: string }>;
}

export default async function QuestionDetailPage({ params }: Props) {
  const { id } = await params;
  const question = communityQuestions.find((q) => q.id === id);
  if (!question) notFound();

  return (
    <div className="min-h-screen bg-surface-0">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href="/student/network/qa"
          className="inline-flex items-center gap-1.5 text-sm text-ink-600 hover:text-ink-900 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Community Q&amp;A
        </Link>

        <QuestionDetail question={question} />

        <div className="mt-10">
          <NetworkTrustFooter />
        </div>
      </div>
    </div>
  );
}
