import { Star } from "lucide-react";
import { ratingColor } from "@/lib/format";

export function RatingBadge({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "text-xs px-1.5 py-0.5",
    md: "text-sm px-2 py-1",
    lg: "text-base px-2.5 py-1.5",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md bg-ink-800 font-semibold ${sizes[size]} ${ratingColor(rating)}`}
      aria-label={`Rating ${rating} out of 10`}
    >
      <Star className="h-3 w-3 fill-current" aria-hidden="true" />
      {rating.toFixed(1)}
    </span>
  );
}
