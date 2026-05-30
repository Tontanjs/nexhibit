"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

import { Logo } from "@/components/brand/Logo";
import { GradientMesh } from "@/components/motion/GradientMesh";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { SpotlightCursor } from "@/components/motion/SpotlightCursor";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import { copy } from "@/lib/copy";
import { cn } from "@/lib/utils";

type LoginMode = "student" | "employer";

function FloatingField({
  id,
  label,
  placeholder,
  type = "text",
}: {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
}) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const floated = focused || value.length > 0;

  return (
    <label className="relative block">
      <motion.span
        className="pointer-events-none absolute left-3 z-10 rounded bg-surface-0 px-1 text-sm font-medium text-ink-500"
        animate={{ y: floated ? -10 : 12, scale: floated ? 0.84 : 1, color: focused ? "#D4A613" : "#64748B" }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {label}
      </motion.span>
      <Input
        id={id}
        value={value}
        type={type}
        placeholder={focused ? placeholder : ""}
        onChange={(event) => setValue(event.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="h-12 pt-4 transition focus-visible:border-gold-500 focus-visible:ring-gold-500/20"
      />
    </label>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<LoginMode>("student");
  const [loading, setLoading] = useState(false);
  const loginCopy = copy.pages.login;

  const submit = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    toast.success(copy.toasts.loginSuccess);
    window.setTimeout(() => {
      router.push(activeTab === "student" ? "/student/onboarding" : "/employer/dashboard");
    }, 650);
  };

  return (
    <main
      className="relative min-h-screen overflow-hidden bg-ink-900 px-4 py-6 sm:px-6"
      onKeyDown={(event) => {
        if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
          submit();
        }
      }}
    >
      <GradientMesh className="opacity-40" />
      <SpotlightCursor />
      <div className="absolute inset-0 subtle-grid opacity-20" aria-hidden="true" />
      <div className="relative z-10">
        <Link className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-ink-200 hover:text-surface-0" href="/">
          <ArrowLeft className="size-4" aria-hidden="true" />
          {copy.navigation.marketing.backHome}
        </Link>
      </div>

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-96px)] w-full max-w-6xl items-center gap-8 py-10 md:grid-cols-[0.95fr_1fr]">
        <section className="hidden text-surface-0 md:block">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/25 bg-gold-500/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-gold-400">
              <span className="pulse-dot size-1.5 rounded-full bg-gold-500" aria-hidden="true" />
              {loginCopy.motionPill}
            </div>
          </Reveal>
          <SplitText
            as="h1"
            text={loginCopy.motionHeadline}
            highlight={["discovered"]}
            className="mt-8 block text-4xl font-extrabold leading-tight text-surface-0 lg:text-5xl"
          />
          <div className="mt-8 grid gap-3 text-sm text-ink-200">
            {[copy.helperText.zjutVerification, copy.helperText.privacyDefault, copy.helperText.messageEtiquette].map((item, index) => (
              <Reveal key={item} delay={index * 0.08}>
                <div className="flex gap-3 rounded-lg border border-surface-0/10 bg-surface-0/[0.05] p-3 backdrop-blur">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0 text-gold-400 motion-safe:animate-pulse" aria-hidden="true" />
                  <span>{item}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <motion.div
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
        >
          <Card className="w-full p-6 shadow-2xl sm:p-8">
            <motion.div className="flex justify-center" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <Logo size="md" showTagline={false} />
            </motion.div>
            <h1 className="mt-8 text-center text-3xl font-bold tracking-normal text-ink-900">{loginCopy.heading}</h1>

            <div className="relative mt-8 grid grid-cols-2 rounded-lg bg-ink-100 p-1">
              {(["student", "employer"] as LoginMode[]).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  className={cn("relative z-10 h-10 rounded-md text-sm font-semibold transition", activeTab === tab ? "text-ink-900" : "text-ink-500")}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === "student" ? loginCopy.studentTab : loginCopy.employerTab}
                  {activeTab === tab ? (
                    <motion.span
                      layoutId="login-tab-underline"
                      className="absolute inset-0 -z-10 rounded-md bg-surface-0 shadow-sm"
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    />
                  ) : null}
                </button>
              ))}
            </div>

            <div className="mt-8 grid gap-4">
              {activeTab === "student" ? (
                <>
                  <FloatingField id="student-id" label={copy.forms.labels.studentId} placeholder={loginCopy.studentIdPlaceholder} />
                  <FloatingField id="passport" label={copy.forms.labels.passportNumber} placeholder={loginCopy.passportPlaceholder} type="password" />
                  <p className="text-sm leading-relaxed text-ink-500">{copy.helperText.zjutVerification}</p>
                </>
              ) : (
                <>
                  <FloatingField id="work-email" label={copy.forms.labels.email} placeholder={loginCopy.employerEmailPlaceholder} type="email" />
                  <FloatingField id="password" label={copy.forms.labels.password} placeholder={loginCopy.passwordPlaceholder} type="password" />
                  <Link className="text-sm font-semibold text-ink-700 hover:text-ink-900" href="#">
                    {copy.auth.forgotPassword}
                  </Link>
                </>
              )}

              <MagneticButton className="w-full">
                <button
                  type="button"
                  className={cn(buttonVariants({ variant: "primary" }), "w-full")}
                  onClick={submit}
                  disabled={loading}
                >
                  {loading ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
                  {activeTab === "student" ? loginCopy.studentButton : loginCopy.employerButton}
                </button>
              </MagneticButton>
            </div>

            <p className="mt-4 text-center text-xs font-medium text-ink-400">{loginCopy.keyboardHint}</p>
            <p className="mt-8 text-center text-sm text-ink-600">
              {loginCopy.footerPrefix}{" "}
              <Link className="font-semibold text-ink-900 hover:underline" href="/signup">
                {loginCopy.footerLink}
              </Link>
            </p>
          </Card>
        </motion.div>
      </div>
    </main>
  );
}
