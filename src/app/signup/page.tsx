import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Logo } from "@/components/brand/Logo";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { copy } from "@/lib/copy";
import { cn } from "@/lib/utils";

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-surface-50 px-4 py-6 sm:px-6">
      <Link className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-ink-700 hover:text-ink-900" href="/">
        <ArrowLeft className="size-4" aria-hidden="true" />
        {copy.navigation.marketing.backHome}
      </Link>

      <div className="mx-auto flex min-h-[calc(100vh-96px)] w-full max-w-md items-center justify-center py-10">
        <Card className="w-full p-6 shadow-sm sm:p-8">
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
                <div className="grid gap-2">
                  <Label htmlFor="student-id">{copy.forms.labels.studentId}</Label>
                  <Input id="student-id" placeholder={copy.pages.login.studentIdPlaceholder} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="passport">{copy.forms.labels.passportNumber}</Label>
                  <Input id="passport" placeholder={copy.pages.login.passportPlaceholder} type="password" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">{copy.forms.labels.email}</Label>
                  <Input id="email" placeholder={copy.pages.signup.emailPlaceholder} type="email" />
                </div>
                <Link className={cn(buttonVariants({ variant: "primary" }), "w-full")} href="/student/onboarding">
                  {copy.pages.signup.studentButton}
                </Link>
              </div>
            </TabsContent>

            <TabsContent value="employer">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="company-name">{copy.forms.labels.companyName}</Label>
                  <Input id="company-name" placeholder={copy.pages.signup.companyNamePlaceholder} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="work-email">{copy.forms.labels.email}</Label>
                  <Input id="work-email" placeholder={copy.pages.login.employerEmailPlaceholder} type="email" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="company-website">{copy.forms.labels.companyWebsite}</Label>
                  <Input id="company-website" placeholder={copy.pages.signup.companyWebsitePlaceholder} />
                </div>
                <p className="text-sm leading-relaxed text-ink-500">{copy.pages.signup.employerHelper}</p>
                <Link className={cn(buttonVariants({ variant: "primary" }), "w-full")} href="/employer/dashboard">
                  {copy.pages.signup.employerButton}
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
