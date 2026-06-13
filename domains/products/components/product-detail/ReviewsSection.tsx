"use client";

import { useMemo } from "react";
import Image from "next/image";
import { Stars } from "../../../storefront/components/shared/Stars";
import type {
  Review,
  ReviewRatingBreakdown,
} from "@/domains/reviews/types/review.types";

interface ReviewsSectionProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  ratingBreakdown?: ReviewRatingBreakdown;
}

function RatingBar({
  label,
  count,
  total,
}: {
  label: string;
  count: number;
  total: number;
}) {
  const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-zinc-500 w-8 shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-zinc-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-amber-400 rounded-full transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs text-zinc-400 w-6 text-right">{count}</span>
    </div>
  );
}

export function ReviewsSection({
  reviews,
  averageRating,
  totalReviews,
  ratingBreakdown,
}: ReviewsSectionProps) {
  const breakdown = useMemo(() => {
    if (ratingBreakdown) return ratingBreakdown;
    const b: ReviewRatingBreakdown = { "5": 0, "4": 0, "3": 0, "2": 0, "1": 0 };
    for (const r of reviews) {
      const key = String(r.rating) as keyof ReviewRatingBreakdown;
      if (key in b) b[key]++;
    }
    return b;
  }, [reviews, ratingBreakdown]);

  const maxCount = Math.max(...Object.values(breakdown), 1);

  if (totalReviews === 0) {
    return (
      <section className="border-t border-zinc-100 pt-12 mt-12">
        <h2 className="text-xl font-bold text-zinc-900 mb-6">Reviews</h2>
        <div className="text-center py-12 bg-zinc-50 rounded-xl">
          <p className="text-zinc-400 text-sm">No reviews yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="border-t border-zinc-100 pt-12 mt-12">
      <h2 className="text-xl font-bold text-zinc-900 mb-8">Customer Reviews</h2>

      <div className="grid md:grid-cols-3 gap-10 mb-12">
        <div className="space-y-4">
          <div className="flex items-baseline gap-3">
            <span className="text-5xl font-black text-zinc-900">
              {averageRating.toFixed(1)}
            </span>
            <div className="space-y-0.5">
              <Stars rating={averageRating} size={18} />
              <p className="text-xs text-zinc-400">{totalReviews} reviews</p>
            </div>
          </div>

          <div className="space-y-1.5">
            {(["5", "4", "3", "2", "1"] as const).map((star) => (
              <RatingBar
                key={star}
                label={star}
                count={breakdown[star]}
                total={maxCount}
              />
            ))}
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          {reviews.slice(0, 5).map((review) => (
            <div
              key={review._id}
              className="pb-6 border-b border-zinc-100 last:border-0"
            >
              <div className="flex items-start gap-3 mb-2.5">
                <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center text-sm font-semibold text-amber-700 shrink-0">
                  {review.buyerId.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-zinc-800 truncate">
                      {review.buyerId.name}
                    </p>
                    <span className="text-[11px] text-zinc-400 shrink-0">
                      {new Date(review.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <Stars rating={review.rating} size={14} />
                </div>
              </div>
              <p className="text-sm text-zinc-600 leading-relaxed">
                {review.comment}
              </p>
              {review.images && review.images.length > 0 && (
                <div className="flex gap-2 mt-3">
                  {review.images.map((img, i) => (
                    <div
                      key={i}
                      className="relative w-16 h-16 rounded-lg overflow-hidden bg-zinc-100"
                    >
                      <Image
                        src={img}
                        alt={`Review image ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {reviews.length > 5 && (
            <p className="text-center text-sm text-zinc-400 pt-2">
              Showing 5 of {totalReviews} reviews
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
