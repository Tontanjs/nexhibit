import { CheckCircle2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { copy } from "@/lib/copy";

type VerifiedBadgeProps = {
  label?: string;
  className?: string;
};

export function VerifiedBadge({ label = copy.status.verified, className }: VerifiedBadgeProps) {
  return (
    <Badge className={className} variant="success">
      <CheckCircle2 className="mr-1.5 size-3.5" aria-hidden="true" />
      {label}
    </Badge>
  );
}
