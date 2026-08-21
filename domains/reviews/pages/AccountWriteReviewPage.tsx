"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RiArrowLeftLine } from "react-icons/ri";

import { usePendingReviews, useSubmitReview } from "../hooks/useReviews";
import {
  reviewSchema,
  type ReviewInput,
} from "../schemas/review.schema";
import type { PendingReviewItem } from "../types/review.types";
import { ReviewItemHeader } from "../components/write-review/ReviewItemHeader";
import { StarRatingInput } from "../components/write-review/StarRatingInput";
import { ReviewImagesUpload } from "../components/write-review/ReviewImagesUpload";
import CustomButton from "@/shared/components/custom-button/custom-button";

export default function AccountWriteReviewPage({
  orderItemId,
}: {
  orderItemId: string;
}) {
  const router = useRouter();
  const [images, setImages] = useState<File[]>([]);

  const { data: response, isLoading } = usePendingReviews();
  const { mutateAsync: submitReviewAsync, isPending: isSubmitting } =
    useSubmitReview();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ReviewInput>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { rating: 0 },
  });

  const currentRating = watch("rating");

  if (isLoading)
    return (
      <div className="py-32 text-center text-zinc-500 font-medium flex-1">
        Loading...
      </div>
    );

  // Find the exact item they clicked on
  const itemToReview = response?.data?.find(
    (item: PendingReviewItem) => item._id === orderItemId,
  );

  if (!itemToReview) {
    return (
      <div className="py-20 text-center text-zinc-500 font-medium flex-1">
        Item not found or already reviewed.
        <br />
        <Link
          href="/account/reviews/pending"
          className="text-amber-600 underline mt-2 block"
        >
          Go back
        </Link>
      </div>
    );
  }

  const handleAddFiles = (files: File[]) => {
    setImages((prev) => [...prev, ...files]);
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: ReviewInput) => {
    const formData = new FormData();
    formData.append("orderItemId", orderItemId);
    formData.append("rating", data.rating.toString());
    formData.append("comment", data.comment);

    // Append array of files
    images.forEach((img) => formData.append("images", img));

    toast.promise(submitReviewAsync(formData), {
      loading: "Submitting your review...",
      success: () => {
        router.push("/account/reviews/pending");
        return "Review submitted successfully! Thank you.";
      },
      error: (err: any) =>
        err?.response?.data?.message || "Failed to submit review.",
    });
  };

  return (
    <div className="flex-1 font-sans animate-fadeIn pb-12 max-w-3xl">
      <Link
        href="/account/reviews/pending"
        className="mb-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-400 transition-colors hover:text-amber-600"
      >
        <RiArrowLeftLine size={18} /> Cancel Review
      </Link>

      <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden">
        {/* Item Context Header */}
        <ReviewItemHeader item={itemToReview} />

        {/* Review Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 md:p-8 space-y-8"
        >
          {/* 1. Star Rating */}
          <StarRatingInput
            value={currentRating}
            onChange={(rating) =>
              setValue("rating", rating, { shouldValidate: true })
            }
            error={errors.rating?.message}
          />

          {/* 2. Written Comment */}
          <div>
            <label className="block text-sm font-black text-zinc-900 mb-3 uppercase tracking-wider">
              Your Review *
            </label>
            <textarea
              {...register("comment")}
              rows={5}
              placeholder="What did you like or dislike? How did it fit?"
              className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 font-medium placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all resize-none"
            />
            {errors.comment && (
              <p className="text-red-500 text-xs font-bold mt-2">
                {errors.comment.message}
              </p>
            )}
          </div>

          {/* 3. Image Upload (Max 5) */}
          <ReviewImagesUpload
            images={images}
            onAddFiles={handleAddFiles}
            onRemoveImage={handleRemoveImage}
          />

          <div className="pt-6 border-t border-zinc-100">
            <CustomButton
              type="submit"
              variant="solid"
              theme="primary"
              fullWidth
              disabled={isSubmitting}
              className="h-14 text-lg font-black rounded-xl shadow-md"
            >
              {isSubmitting ? "Publishing Review..." : "Publish Review"}
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
}
