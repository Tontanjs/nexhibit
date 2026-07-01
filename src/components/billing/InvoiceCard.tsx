"use client";

import { FileText } from "lucide-react";

import { FapiaoRequestDialog } from "@/components/billing/FapiaoRequestDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Invoice } from "@/lib/billing/types";
import { formatCny, formatDate, printableReceiptHtml } from "@/lib/billing/utils";

type Props = {
  invoice: Invoice;
  b2b?: boolean;
};

export function InvoiceCard({ invoice, b2b }: Props) {
  function openInvoice() {
    const html = printableReceiptHtml({
      invoiceNumber: invoice.invoiceNumber,
      description: `${invoice.type.toUpperCase()} ${invoice.invoiceNumber}`,
      amountCny: invoice.amountCny,
      taxCny: invoice.taxCny,
      transactionId: invoice.transactionId,
      issuedAt: invoice.issuedAt,
    });
    const invoiceWindow = window.open("", "_blank", "noopener,noreferrer");
    invoiceWindow?.document.write(html);
    invoiceWindow?.document.close();
  }

  return (
    <div className="rounded-lg border border-ink-200 bg-surface-0 p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-3">
          <span className="flex size-10 items-center justify-center rounded-md bg-gold-50 text-gold-700">
            <FileText className="size-5" aria-hidden="true" />
          </span>
          <div>
            <h3 className="font-bold text-ink-900">{invoice.invoiceNumber}</h3>
            <p className="text-sm text-ink-500">{formatDate(invoice.issuedAt)}</p>
          </div>
        </div>
        <Badge variant={invoice.status === "paid" ? "success" : "gold"}>{invoice.status}</Badge>
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-ink-400">{invoice.type}</p>
          <p className="text-xl font-black text-ink-900">{formatCny(invoice.amountCny + invoice.taxCny)}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="outline" size="sm" onClick={openInvoice}>
            View
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={openInvoice}>
            Download PDF
          </Button>
          {b2b && <FapiaoRequestDialog trigger={<Button type="button" size="sm">Request Fapiao</Button>} />}
        </div>
      </div>
    </div>
  );
}
