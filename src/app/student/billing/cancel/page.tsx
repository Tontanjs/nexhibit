"use client";

import { useRouter } from "next/navigation";

import { BillingProvider, useBilling } from "@/components/billing/BillingProvider";
import { CancellationFlow } from "@/components/billing/CancellationFlow";

function CancelPageContent() {
  const router = useRouter();
  const { cancelSubscription, resubscribe } = useBilling();

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8">
      <p className="mx-auto mb-5 max-w-3xl rounded-lg border border-gold-500/25 bg-gold-50/80 px-4 py-3 text-sm font-semibold text-ink-700">
        Prototype billing · No real payment is processed. Cancellation changes only the simulated subscription state.
      </p>
      <CancellationFlow
        onCancel={() => {
          cancelSubscription("student");
          window.setTimeout(() => router.push("/student/billing"), 900);
        }}
        onKeep={() => {
          resubscribe("student");
          router.push("/student/billing");
        }}
      />
    </div>
  );
}

export default function StudentCancelPage() {
  return (
    <BillingProvider>
      <CancelPageContent />
    </BillingProvider>
  );
}
