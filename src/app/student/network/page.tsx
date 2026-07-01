import Link from "next/link";
import { ArrowRight, Users, FileText, Building2, MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { NetworkTrustFooter } from "@/components/network/NetworkTrustFooter";

const sections = [
  {
    href: "/student/network/mentors",
    icon: Users,
    title: "Alumni Mentors",
    description: "Connect with ZJUT graduates at companies across China and beyond",
    stat: "12 mentors",
  },
  {
    href: "/student/network/reviews",
    icon: FileText,
    title: "Peer Resume Review",
    description: "Exchange honest feedback with fellow students on your resume",
    stat: "47 reviews this month",
  },
  {
    href: "/student/network/companies",
    icon: Building2,
    title: "Company Insights",
    description: "Alumni-contributed ratings, interview tips, and salary signals",
    stat: "20 companies",
  },
  {
    href: "/student/network/qa",
    icon: MessageSquare,
    title: "Community Q&A",
    description: "Ask and answer questions about careers, visas, and life in China",
    stat: "15 active questions",
  },
];

const stats = [
  { label: "Alumni mentors", value: "12" },
  { label: "Reviews given this month", value: "47" },
  { label: "Companies covered", value: "20" },
  { label: "Active questions", value: "15" },
];

export default function NetworkHubPage() {
  return (
    <div className="min-h-screen bg-surface-0">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-700 mb-3">
            Peer Network Hub
          </p>
          <h1 className="text-3xl font-bold text-ink-900 sm:text-4xl mb-4">
            You are not alone. Connect with the ZJUT international community.
          </h1>
          <p className="text-base text-ink-600 max-w-2xl">
            Hundreds of international students and alumni have walked this path before you. Get mentorship, give and receive resume feedback, discover company insights, and find answers to the questions that matter most.
          </p>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-10">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-ink-200 bg-surface-0 px-5 py-4 text-center"
            >
              <p className="text-2xl font-bold text-ink-900">{stat.value}</p>
              <p className="text-xs text-ink-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Section cards */}
        <div className="grid gap-4 sm:grid-cols-2 mb-10">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Link key={section.href} href={section.href}>
                <Card className="h-full transition-shadow hover:shadow-md cursor-pointer border-ink-200">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-ink-50 p-2.5 shrink-0">
                        <Icon className="h-5 w-5 text-ink-900" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h2 className="font-semibold text-ink-900">{section.title}</h2>
                          <ArrowRight className="h-4 w-4 text-ink-400 shrink-0" />
                        </div>
                        <p className="text-sm text-ink-600 mb-3">{section.description}</p>
                        <p className="text-xs font-semibold text-gold-700">{section.stat}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Secondary link to original peer connections view */}
        <div className="mb-10 text-center">
          <Link
            href="/student/network/peers"
            className="text-sm text-ink-600 underline underline-offset-4 hover:text-ink-900 transition-colors"
          >
            See peer connections (classmates, mentors, and alumni tabs)
          </Link>
        </div>

        <NetworkTrustFooter />
      </div>
    </div>
  );
}
