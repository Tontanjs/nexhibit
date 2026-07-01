import Link from "next/link";

import { PaymentMethodList } from "@/components/billing/PaymentMethodList";
import { Button } from "@/components/ui/button";
import { mockEmployerPaymentMethods } from "@/lib/billing/mock-billing-data";

export default function EmployerPaymentMethodsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Button asChild variant="ghost" className="mb-5 text-ink-300">
        <Link href="/employer/billing">Back to billing</Link>
      </Button>
      <section className="aurora-panel neon-border mb-6 rounded-lg p-6">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-300">01 · PAYMENT METHODS</p>
        <h1 className="mt-3 text-3xl font-black text-surface-0">Employer payment methods</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-300">
          Prototype billing · No real payment is processed, and no cards or bank accounts are saved.
        </p>
      </section>
      <PaymentMethodList methods={mockEmployerPaymentMethods} userType="employer" />
    </div>
  );
}
