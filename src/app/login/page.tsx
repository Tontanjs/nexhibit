import Link from "next/link";
import { ArrowLeft, ShieldCheck, Sparkles } from "lucide-react";

import { Logo } from "@/components/brand/Logo";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { copy } from "@/lib/copy";
import { cn } from "@/lib/utils";

export default function LoginPage() {
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
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/25 bg-gold-500/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-gold-400">
            <Sparkles className="size-4" aria-hidden="true" />
            {copy.brand.tagline}
          </div>
          <h2 className="mt-8 text-4xl font-extrabold leading-tight">{copy.auth.studentWelcome}</h2>
          <div className="mt-8 grid gap-3 text-sm text-ink-200">
            {[copy.helperText.zjutVerification, copy.helperText.privacyDefault, copy.helperText.messageEtiquette].map((item) => (
              <div key={item} className="flex gap-3 rounded-lg border border-surface-0/10 bg-surface-0/[0.05] p-3">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-gold-400" aria-hidden="true" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <Card className="w-full p-6 shadow-2xl sm:p-8">
          <div className="flex justify-center">
            <Logo size="md" showTagline={false} />
          </div>
          <h1 className="mt-8 text-center text-3xl font-bold tracking-normal text-ink-900">{copy.pages.login.heading}</h1>

          <Tabs defaultValue="student" className="mt-8">
            <TabsList>
              <TabsTrigger value="student">{copy.pages.login.studentTab}</TabsTrigger>
              <TabsTrigger value="employer">{copy.pages.login.employerTab}</TabsTrigger>
            </TabsList>

            <TabsContent value="student">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="student-id">{copy.forms.labels.studentId}</Label>
                  <Input id="student-id" placeholder={copy.pages.login.studentIdPlaceholder} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="passport">{copy.forms.labels.passportNumber}</Label>
                  <Input id="passport" placeholder={copy.pages.login.passportPlaceholder} type="password" />
                </div>
                <p className="text-sm leading-relaxed text-ink-500">{copy.helperText.zjutVerification}</p>
                <Link className={cn(buttonVariants({ variant: "primary" }), "w-full")} href="/student/onboarding">
                  {copy.pages.login.studentButton}
                </Link>
              </div>
            </TabsContent>

            <TabsContent value="employer">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="work-email">{copy.forms.labels.email}</Label>
                  <Input id="work-email" placeholder={copy.pages.login.employerEmailPlaceholder} type="email" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">{copy.forms.labels.password}</Label>
                  <Input id="password" placeholder={copy.pages.login.passwordPlaceholder} type="password" />
                </div>
                <Link className="text-sm font-semibold text-ink-700 hover:text-ink-900" href="#">
                  {copy.auth.forgotPassword}
                </Link>
                <Link className={cn(buttonVariants({ variant: "primary" }), "w-full")} href="/employer/dashboard">
                  {copy.pages.login.employerButton}
                </Link>
              </div>
            </TabsContent>
          </Tabs>

          <p className="mt-8 text-center text-sm text-ink-600">
            {copy.pages.login.footerPrefix}{" "}
            <Link className="font-semibold text-ink-900 hover:underline" href="/signup">
              {copy.pages.login.footerLink}
            </Link>
          </p>
        </Card>
      </div>
    </main>
  );
}
