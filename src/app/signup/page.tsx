import Link from "next/link";
import { ArrowLeft, Building2, GraduationCap, LockKeyhole, ShieldCheck } from "lucide-react";

import { Logo } from "@/components/brand/Logo";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { copy } from "@/lib/copy";
import { cn } from "@/lib/utils";

function PrototypeNotice() {
  return (
    <div className="rounded-lg border border-gold-500/25 bg-gold-50/70 p-4 shadow-inner">
      <div className="flex gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-gold-500 text-ink-900">
          <LockKeyhole className="size-4" aria-hidden="true" />
        </span>
        <div>
          <p className="text-sm font-bold text-ink-900">{copy.pages.signup.demoNoticeTitle}</p>
          <p className="mt-1 text-sm leading-relaxed text-ink-600">{copy.pages.signup.demoNoticeBody}</p>
        </div>
      </div>
    </div>
  );
}

function LockedInput({
  id,
  placeholder,
  type = "text",
}: {
  id: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div className="relative">
      <Input
        id={id}
        placeholder={placeholder}
        type={type}
        disabled
        aria-disabled="true"
        className="h-12 border-dashed border-ink-200 bg-ink-50/80 pr-3 text-ink-500 shadow-inner disabled:opacity-100 sm:pr-32"
      />
      <span className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full border border-ink-200 bg-surface-0 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-ink-400 sm:inline-flex">
        {copy.pages.signup.demoFieldBadge}
      </span>
    </div>
  );
}

export default function SignupPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-ink-900 px-4 py-6 sm:px-6">
      <div className="absolute inset-0 subtle-grid opacity-25" aria-hidden="true" />
      <div className="relative">
        <Link className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-ink-200 hover:text-surface-0" href="/">
          <ArrowLeft className="size-4" aria-hidden="true" />
          {copy.navigation.marketing.backHome}
        </Link>
      </div>

      <div className="relative mx-auto grid min-h-[calc(100vh-96px)] w-full max-w-5xl items-center gap-8 py-10 md:grid-cols-[0.95fr_1fr]">
        <section className="hidden rounded-lg border border-surface-0/10 bg-surface-0/[0.06] p-8 text-surface-0 shadow-2xl backdrop-blur md:block">
          <div className="flex size-12 items-center justify-center rounded-lg bg-gold-500 text-ink-900">
            <ShieldCheck className="size-6" aria-hidden="true" />
          </div>
          <h2 className="mt-8 text-4xl font-extrabold leading-tight">{copy.marketing.finalCta.heading}</h2>
          <div className="mt-8 grid gap-3 text-sm text-ink-200">
            <div className="flex gap-3 rounded-lg border border-surface-0/10 bg-surface-0/[0.05] p-3">
              <GraduationCap className="mt-0.5 size-4 shrink-0 text-gold-400" aria-hidden="true" />
              <span>{copy.buttons.primary.signUpStudent}</span>
            </div>
            <div className="flex gap-3 rounded-lg border border-surface-0/10 bg-surface-0/[0.05] p-3">
              <Building2 className="mt-0.5 size-4 shrink-0 text-gold-400" aria-hidden="true" />
              <span>{copy.buttons.primary.signUpEmployer}</span>
            </div>
          </div>
        </section>

        <Card className="w-full p-6 shadow-2xl sm:p-8">
          <div className="flex justify-center">
            <Logo size="md" showTagline={false} />
          </div>
          <h1 className="mt-8 text-center text-3xl font-bold tracking-normal text-ink-900">{copy.pages.signup.heading}</h1>

          <Tabs defaultValue="student" className="mt-8">
            <TabsList>
              <TabsTrigger value="student">{copy.pages.signup.studentTab}</TabsTrigger>
              <TabsTrigger value="employer">{copy.pages.signup.employerTab}</TabsTrigger>
            </TabsList>

            <TabsContent value="student">
              <div className="grid gap-4">
                <PrototypeNotice />
                <div className="grid gap-2">
                  <Label htmlFor="student-id">{copy.forms.labels.studentId}</Label>
                  <LockedInput id="student-id" placeholder={copy.pages.login.studentIdPlaceholder} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="passport">{copy.forms.labels.passportNumber}</Label>
                  <LockedInput id="passport" placeholder={copy.pages.login.passportPlaceholder} type="password" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">{copy.forms.labels.email}</Label>
                  <LockedInput id="email" placeholder={copy.pages.signup.emailPlaceholder} type="email" />
                </div>
                <Link className={cn(buttonVariants({ variant: "primary" }), "w-full")} href="/student/onboarding">
                  {copy.pages.signup.studentDemoButton}
                </Link>
              </div>
            </TabsContent>

            <TabsContent value="employer">
              <div className="grid gap-4">
                <PrototypeNotice />
                <div className="grid gap-2">
                  <Label htmlFor="company-name">{copy.forms.labels.companyName}</Label>
                  <LockedInput id="company-name" placeholder={copy.pages.signup.companyNamePlaceholder} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="work-email">{copy.forms.labels.email}</Label>
                  <LockedInput id="work-email" placeholder={copy.pages.login.employerEmailPlaceholder} type="email" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="company-website">{copy.forms.labels.companyWebsite}</Label>
                  <LockedInput id="company-website" placeholder={copy.pages.signup.companyWebsitePlaceholder} />
                </div>
                <p className="text-sm leading-relaxed text-ink-500">{copy.pages.signup.employerHelper}</p>
                <Link className={cn(buttonVariants({ variant: "primary" }), "w-full")} href="/employer/dashboard">
                  {copy.pages.signup.employerDemoButton}
                </Link>
              </div>
            </TabsContent>
          </Tabs>

          <p className="mt-8 text-center text-sm text-ink-600">
            {copy.pages.signup.footerPrefix}{" "}
            <Link className="font-semibold text-ink-900 hover:underline" href="/login">
              {copy.pages.signup.footerLink}
            </Link>
          </p>
        </Card>
      </div>
    </main>
  );
}
