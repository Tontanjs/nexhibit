import { Badge } from "@/components/ui/badge";

export type PipelineStage =
  | "Shortlisted"
  | "Messaged"
  | "Interview-ready"
  | "Interview scheduled"
  | "Offer potential";

const stageVariant: Record<PipelineStage, "secondary" | "gold" | "success" | "outline"> = {
  Shortlisted: "secondary",
  Messaged: "gold",
  "Interview-ready": "gold",
  "Interview scheduled": "success",
  "Offer potential": "success",
};

export function PipelineBadge({ stage }: { stage: PipelineStage }) {
  return (
    <Badge variant={stageVariant[stage]} className="text-[10px]">
      {stage}
    </Badge>
  );
}
