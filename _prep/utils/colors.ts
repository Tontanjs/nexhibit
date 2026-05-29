export const CATEGORY_COLORS: Record<
  string,
  {
    bg: string;
    text: string;
    border: string;
    dot: string;
  }
> = {
  Business: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", dot: "bg-blue-500" },
  Engineering: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200", dot: "bg-purple-500" },
  Health: { bg: "bg-green-50", text: "text-green-700", border: "border-green-200", dot: "bg-green-500" },
  Language: { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200", dot: "bg-yellow-500" },
  Other: { bg: "bg-pink-50", text: "text-pink-700", border: "border-pink-200", dot: "bg-pink-500" },
};

export const STATUS_COLORS: Record<
  string,
  {
    bg: string;
    text: string;
  }
> = {
  upcoming: { bg: "bg-gold-50", text: "text-gold-700" },
  ongoing: { bg: "bg-green-50", text: "text-green-700" },
  past: { bg: "bg-ink-100", text: "text-ink-600" },
  profile_viewed: { bg: "bg-ink-100", text: "text-ink-600" },
  shortlisted: { bg: "bg-blue-50", text: "text-blue-700" },
  messaged: { bg: "bg-purple-50", text: "text-purple-700" },
  interview_scheduled: { bg: "bg-gold-50", text: "text-gold-700" },
  offer: { bg: "bg-green-50", text: "text-green-700" },
  declined: { bg: "bg-red-50", text: "text-red-700" },
};

export function getCategoryColors(category: string): (typeof CATEGORY_COLORS)[string] {
  return CATEGORY_COLORS[category] ?? CATEGORY_COLORS.Other;
}

export function getStatusColors(status: string): (typeof STATUS_COLORS)[string] {
  return STATUS_COLORS[status] ?? STATUS_COLORS.past;
}
