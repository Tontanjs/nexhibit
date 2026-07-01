"use client";

import * as React from "react";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { copy } from "@/lib/copy";

type Props = {
  trigger?: React.ReactNode;
};

export function FapiaoRequestDialog({ trigger }: Props) {
  const [open, setOpen] = React.useState(false);
  const [companyName, setCompanyName] = React.useState("");
  const [taxId, setTaxId] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const validTaxId = /^[A-Za-z0-9]{18}$/.test(taxId);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!companyName || !validTaxId || !email.includes("@")) return;
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
    }, 2000);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger ?? <Button variant="outline">{copy.billing.invoices.requestFapiao}</Button>}</DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{copy.billing.invoices.requestFapiao}</DialogTitle>
          <DialogDescription>Submit company details for a simulated Chinese fapiao request.</DialogDescription>
        </DialogHeader>
        {success ? (
          <div className="rounded-lg border border-success/20 bg-success/10 p-5 text-center">
            <CheckCircle2 className="mx-auto size-10 text-success" aria-hidden="true" />
            <p className="mt-3 font-semibold text-ink-900">Fapiao request submitted.</p>
            <p className="mt-1 text-sm text-ink-500">A simulated confirmation email has been prepared.</p>
          </div>
        ) : (
          <form onSubmit={submit} className="grid gap-4">
            <div>
              <Label htmlFor="company-name">Company Name</Label>
              <Input id="company-name" value={companyName} onChange={(event) => setCompanyName(event.target.value)} />
            </div>
            <div>
              <Label htmlFor="tax-id">Tax ID (统一社会信用代码)</Label>
              <Input id="tax-id" value={taxId} onChange={(event) => setTaxId(event.target.value.toUpperCase())} maxLength={18} aria-invalid={taxId.length > 0 && !validTaxId} />
              {taxId.length > 0 && !validTaxId && <p className="mt-1 text-xs text-destructive">Tax ID must be 18 alphanumeric characters.</p>}
            </div>
            <div>
              <Label htmlFor="company-address">Address</Label>
              <Input id="company-address" value={address} onChange={(event) => setAddress(event.target.value)} />
            </div>
            <div>
              <Label htmlFor="fapiao-email">Email</Label>
              <Input id="fapiao-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={submitting}>
                {submitting ? "Processing..." : "Submit request"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
