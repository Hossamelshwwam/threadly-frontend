"use client";

import { useMemo } from "react";
import Image from "next/image";
import { Stars } from "../../../storefront/components/shared/Stars";
import { RiPencilLine, RiDoubleQuotesL } from "react-icons/ri";
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
    <div className="flex items-center gap-4 text-sm mb-2.5 last:mb-0">
      <span className="font-bold text-zinc-700 w-14">{label} Stars</span>
      <div className="flex-1 h-2 bg-amber-200/50 rounded-full overflow-hidden">
        <div
          className="h-full bg-amber-500 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="font-medium text-zinc-500 w-8 text-right">{count}</span>
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
      <section className="pt-12">
        <div className="flex flex-col items-center justify-center p-16 text-center bg-zinc-50 border border-zinc-100 rounded-[2rem]">
          <h2 className="mb-3 text-2xl font-black text-zinc-950">
            No Reviews Yet
          </h2>
          <p className=" text-zinc-500 font-medium">
            Have you purchased this? Be the first to share your thoughts!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-12">
      {/* 1. Horizontal Dashboard Summary */}
      <div className="mb-12 flex flex-col lg:flex-row items-center justify-between gap-10 rounded-[2rem] bg-amber-50 p-8 sm:p-10 border border-amber-100/50">
        {/* Score Block */}
        <div className="flex flex-col items-center lg:items-start shrink-0 text-center lg:text-left">
          <h2 className="text-xs font-black uppercase tracking-widest text-amber-700 mb-6">
            Customer Feedback
          </h2>
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-6">
            <span className="text-7xl sm:text-8xl font-black text-zinc-950 leading-none tracking-tighter">
              {averageRating.toFixed(1)}
            </span>
            <div className="flex flex-col gap-1.5 pb-2">
              <Stars rating={averageRating} size={22} />
              <span className="text-sm font-bold text-zinc-500">
                Based on {totalReviews} reviews
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden lg:block w-px h-32 bg-amber-200/50 mx-4" />

        {/* Progress Bars */}
        <div className="flex-1 w-full max-w-md">
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

      {/* 2. Review Testimonial Grid */}
      <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
        {reviews.slice(0, 6).map((review) => (
          <div
            key={review._id}
            className="group relative flex flex-col rounded-3xl bg-white p-8 border border-zinc-100 shadow-sm transition-all hover:shadow-md hover:border-amber-200"
          >
            {/* Decorative Quote Mark */}
            <div className="absolute top-6 right-8 text-zinc-50 transition-colors group-hover:text-amber-50">
              <RiDoubleQuotesL size={64} />
            </div>

            {/* Reviewer Info */}
            <div className="relative flex items-center gap-4 mb-6 z-10">
              <div className="size-10 rounded-full bg-main text-white flex items-center justify-center font-black text-lg shadow-sm">
                {review.buyerId.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold text-zinc-950">
                  {review.buyerId.name}
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <Stars rating={review.rating} size={14} />
                  <span className="text-xs font-bold text-zinc-400">
                    •{" "}
                    {new Date(review.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Review Text */}
            <p className="relative z-10 text-zinc-600 leading-relaxed text-pretty flex-1">
              {review.comment}
            </p>

            {/* Uploaded Images */}
            {review.images && review.images.length > 0 && (
              <div className="relative z-10 flex flex-wrap gap-3 mt-6 pt-6 border-t border-zinc-50">
                {review.images.map((img, i) => (
                  <div
                    key={i}
                    className="relative w-16 h-16 rounded-xl overflow-hidden bg-zinc-100 border border-zinc-200"
                  >
                    <Image
                      src={img}
                      alt={`Review attached image ${i + 1}`}
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
      </div>

      {/* 3. See More */}
      {reviews.length > 6 && (
        <div className="mt-10 flex justify-center">
          <button className="rounded-full border-2 border-zinc-200 bg-white px-8 py-3 text-sm font-bold text-zinc-600 transition-all hover:border-amber-500 hover:text-amber-600">
            Load More Reviews
          </button>
        </div>
      )}
    </section>
  );
}
