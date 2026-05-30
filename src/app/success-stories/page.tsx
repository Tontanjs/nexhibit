import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EmployerLogo } from "@/components/brand/EmployerLogo";
import { StudentAvatar } from "@/components/brand/StudentAvatar";
import { copy } from "@/lib/copy";
import { employers, students } from "@/lib/mock-data";

const p = copy.pages.successStories;

const stories = [
  {
    id: "story-001",
    studentId: "stu-001",
    employerId: "emp-001",
    name: "Nattapong Saetang",
    nationality: "🇹🇭 Thailand",
    major: "Software Engineering",
    year: "Year 3",
    employer: "Alibaba Cloud",
    role: "Cloud Engineering Intern",
    quote:
      "At a traditional fair I would have queued for 40 minutes to hand over a resume. At NEXHIBIT, the recruiter had already seen my chatbot demo before she walked in. Our first conversation was about the actual code.",
    outcome: "6-month internship, converting to full-time after graduation",
    event: "Spring Career Fair 2026",
  },
  {
    id: "story-002",
    studentId: "stu-003",
    employerId: "emp-002",
    name: "Ayesha Siddiqui",
    nationality: "🇵🇰 Pakistan",
    major: "Mechatronics Engineering",
    year: "Year 4",
    employer: "BYD International",
    role: "EV Technical Documentation Intern",
    quote:
      "My SolidWorks assembly was in my portfolio. The hiring manager at BYD said it was the first time she could evaluate someone before speaking to them. The interview felt like a continuation of a conversation we had already started.",
    outcome: "Joined BYD International in Shenzhen, August 2026",
    event: "Spring Career Fair 2026",
  },
  {
    id: "story-003",
    studentId: "stu-008",
    employerId: "emp-006",
    name: "Bolor-Erdene Ganbold",
    nationality: "🇲🇳 Mongolia",
    major: "Applied Linguistics",
    year: "Year 3",
    employer: "Lingxi AI",
    role: "Localization QA Specialist",
    quote:
      "I was not sure a startup would be interested in a linguistics student. But Lingxi AI read my interpreter guide and asked specific questions about the terminology decisions I made for Central Asian business contexts. That felt completely different from a job board.",
    outcome: "Part-time QA trial converting to full Localization Specialist",
    event: "Fall Career Fair 2025",
  },
  {
    id: "story-004",
    studentId: "stu-020",
    employerId: "emp-003",
    name: "Ama Nkrumah",
    nationality: "🇬🇭 Ghana",
    major: "International Business",
    year: "Year 4",
    employer: "SHEIN Global",
    role: "Southeast Asia Campaign Operations Intern",
    quote:
      "SHEIN reached out after they saw my market research project on West African consumer trust in cross-border fashion. They were hiring for Southeast Asia but said the methodology transferred. I never expected that connection to happen.",
    outcome: "Campaign Operations Intern, remote-hybrid from Guangzhou",
    event: "Fall Career Fair 2025",
  },
];

export default function SuccessStoriesPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-ink-900 px-4 py-16 text-center sm:px-6">
          <Badge variant="gold" className="mb-4 text-xs">Real outcomes</Badge>
          <h1 className="text-3xl font-black text-surface-0 sm:text-4xl">{p.heading}</h1>
          <p className="mx-auto mt-3 max-w-xl text-base text-ink-300">{p.subheading}</p>
        </section>

        {/* Stories */}
        <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 space-y-8">
          {stories.map((story) => {
            const student = students.find((s) => s.id === story.studentId) ?? students[0];
            const employer = employers.find((e) => e.id === story.employerId) ?? employers[0];

            return (
            <Card key={story.id} className="overflow-hidden">
              <CardContent className="pt-5">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                  {/* Student info */}
                  <div className="flex shrink-0 flex-row items-center gap-3 sm:flex-col sm:items-center sm:text-center sm:w-32">
                    <StudentAvatar student={student} className="size-14" />
                    <div>
                      <p className="text-sm font-semibold text-ink-900">{story.name}</p>
                      <p className="text-xs text-ink-400">{story.nationality}</p>
                      <p className="text-xs text-ink-400">{story.major}</p>
                      <p className="text-xs text-ink-400">{story.year}</p>
                    </div>
                  </div>

                  {/* Story content */}
                  <div className="min-w-0 flex-1">
                    {/* Role + employer */}
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <EmployerLogo employer={employer} className="size-7 rounded-md" />
                      <div>
                        <span className="text-xs font-medium text-ink-500">{p.roleAtLabel} </span>
                        <span className="text-sm font-semibold text-ink-900">{story.role}</span>
                        <span className="text-xs text-ink-500"> at {story.employer}</span>
                      </div>
                    </div>

                    {/* Quote */}
                    <blockquote className="border-l-2 border-gold-400 pl-3">
                      <p className="text-sm italic leading-relaxed text-ink-700">&ldquo;{story.quote}&rdquo;</p>
                    </blockquote>

                    {/* Outcome */}
                    <div className="mt-3 flex flex-wrap gap-2 text-xs text-ink-500">
                      <Badge variant="success" className="text-[10px]">{story.outcome}</Badge>
                      <span className="text-ink-400">via {story.event}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            );
          })}
        </section>

        {/* CTA */}
        <section className="bg-gold-50 px-4 py-14 text-center sm:px-6">
          <h2 className="text-2xl font-black text-ink-900">{p.ctaHeading}</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-ink-600">{p.ctaBody}</p>
          <Button variant="primary" size="lg" className="mt-6" asChild>
            <Link href="/student/onboarding">{p.ctaButton}</Link>
          </Button>
        </section>
      </main>
      <Footer />
    </>
  );
}
