"use client";

import React, { useState } from "react";
import Image from "next/image";
import { RiStarFill, RiDeleteBinLine, RiMessage2Line } from "react-icons/ri";

import { useProductReviews } from "../../hooks/useProductReviews";
import { useAdminDeleteReview } from "../../hooks/useAdminDeleteReview";
import CustomButton from "@/shared/components/custom-button/custom-button";
import { ConfirmationDialog } from "@/shared/components/confirmation-dialog/ConfirmationDialog";
import type { GetProductReviewsParams } from "../../types/review.types";
import { toast } from "sonner";

export function ProductReviewsPanel({ productId }: { productId: string }) {
  const [params, setParams] = useState<GetProductReviewsParams>({
    page: 1,
    limit: 5,
    sort: "newest",
  });

  // Keep track of which review is currently being deleted so we can show a targeted loading spinner
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { data: response, isLoading } = useProductReviews(productId, params);
  const { mutateAsync: deleteReview, isPending: isDeleting } =
    useAdminDeleteReview(productId);

  const reviews = response?.data?.reviews || [];
  const pagination = response?.pagination;
  const totalReviews = response?.data?.totalReviews || 0;
  const averageRating = response?.data?.averageRating || 0;

  const handleDelete = (reviewId: string) => {
    setDeletingId(reviewId);
    toast.promise(deleteReview(reviewId), {
      loading: "Deleting review...",
      success: () => {
        setDeletingId(null);
        return "Review deleted successfully!";
      },
      error: "Failed to delete review",
    });
  };

  return (
    <div className="bg-white rounded-xl border border-zinc-200 shadow-sm font-sans flex flex-col overflow-hidden">
      {/* Header & Summary */}
      <div className="p-6 border-b border-zinc-100 bg-zinc-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
            <RiMessage2Line className="text-zinc-400" />
            Customer Reviews
          </h3>
          <p className="text-xs text-zinc-500 mt-1">
            Monitor and moderate feedback for this product.
          </p>
        </div>

        {totalReviews > 0 && (
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg border border-zinc-200 shadow-xs">
            <div className="flex items-center gap-1 text-amber-400">
              <RiStarFill size={18} />
              <span className="text-lg font-black text-zinc-900 leading-none">
                {averageRating.toFixed(1)}
              </span>
            </div>
            <div className="w-px h-6 bg-zinc-200"></div>
            <span className="text-xs font-semibold text-zinc-500">
              {totalReviews} Reviews
            </span>
          </div>
        )}
      </div>

      {/* Reviews List */}
      <div className="divide-y divide-zinc-100">
        {isLoading ? (
          <div className="p-8 text-center text-zinc-400 text-sm animate-pulse">
            Loading reviews...
          </div>
        ) : reviews.length === 0 ? (
          <div className="p-8 text-center text-zinc-500 text-sm">
            No reviews have been submitted for this product yet.
          </div>
        ) : (
          reviews.map((review) => {
            const isThisRowDeleting = isDeleting && deletingId === review._id;

            return (
              <div
                key={review._id}
                className="p-6 transition-colors hover:bg-zinc-50/50"
              >
                <div className="flex justify-between items-start gap-4">
                  {/* User Info & Rating */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center text-xs font-bold text-zinc-600 uppercase">
                        {review.buyerId?.name?.charAt(0) || "U"}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-zinc-900">
                          {review.buyerId?.name || "Anonymous User"}
                        </p>
                        <p className="text-[10px] text-zinc-400">
                          {new Date(review.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            },
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Stars */}
                    <div className="flex items-center gap-0.5 mb-3 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <RiStarFill
                          key={i}
                          className={
                            i < review.rating
                              ? "text-amber-400"
                              : "text-zinc-200"
                          }
                          size={14}
                        />
                      ))}
                    </div>

                    {/* Comment */}
                    <p className="text-sm text-zinc-700 leading-relaxed max-w-3xl">
                      {review.comment}
                    </p>

                    {/* Attached Images */}
                    {review.images && review.images.length > 0 && (
                      <div className="flex items-center gap-2 mt-4">
                        {review.images.map((img, idx) => (
                          <div
                            key={idx}
                            className="relative w-16 h-16 rounded-md overflow-hidden border border-zinc-200"
                          >
                            <Image
                              src={img}
                              alt="Review attachment"
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Admin Delete Action — Properly mapped to your components! */}
                  <ConfirmationDialog
                    title="Delete Review"
                    description="Are you sure you want to permanently delete this customer review? This action cannot be undone."
                    confirmText="Delete Review"
                    variant="danger"
                    onConfirm={() => handleDelete(review._id)}
                  >
                    <CustomButton
                      variant="soft" // or "outline"
                      theme="danger" // Automatically maps to text-error / bg-error-bg!
                      size="sm"
                      className="shrink-0"
                      leftIcon={<RiDeleteBinLine />}
                      loading={isThisRowDeleting}
                    >
                      Remove
                    </CustomButton>
                  </ConfirmationDialog>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination Controls */}
      {pagination && pagination.pages > 1 && (
        <div className="p-4 border-t border-zinc-100 flex items-center justify-between bg-zinc-50">
          <p className="text-xs text-zinc-500 font-medium">
            Page {pagination.page} of {pagination.pages}
          </p>
          <div className="flex gap-2">
            <CustomButton
              variant="outline"
              theme="neutral"
              size="sm"
              disabled={pagination.page === 1}
              onClick={() => setParams((p) => ({ ...p, page: p.page! - 1 }))}
            >
              Previous
            </CustomButton>
            <CustomButton
              variant="outline"
              theme="neutral"
              size="sm"
              disabled={pagination.page === pagination.pages}
              onClick={() => setParams((p) => ({ ...p, page: p.page! + 1 }))}
            >
              Next
            </CustomButton>
          </div>
        </div>
      )}
    </div>
  );
}
