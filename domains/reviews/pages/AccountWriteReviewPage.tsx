"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  RiStarFill,
  RiImageAddLine,
  RiCloseCircleFill,
  RiArrowLeftLine,
} from "react-icons/ri";

import { usePendingReviews, useSubmitReview } from "../hooks/useReviews";
import CustomButton from "@/shared/components/custom-button/custom-button";

// Schema matching API Docs
const reviewSchema = z.object({
  rating: z.number().min(1, "Please select a rating").max(5),
  comment: z
    .string()
    .min(5, "Comment must be at least 5 characters")
    .max(2000, "Comment is too long"),
});
type ReviewInput = z.infer<typeof reviewSchema>;

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
    (item: any) => item._id === orderItemId,
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (images.length + files.length > 5) {
      toast.error("You can only upload up to 5 images.");
      return;
    }
    setImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index: number) => {
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
        <div className="p-6 border-b border-zinc-100 bg-zinc-50/50 flex items-center gap-4">
          <div className="h-16 w-16 relative bg-white border border-zinc-200 rounded-lg overflow-hidden shrink-0">
            <Image
              src={itemToReview.productId?.images?.[0] || "/placeholder.jpg"}
              alt="Product"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="font-black text-zinc-900 text-lg leading-tight">
              {itemToReview.productId?.name}
            </h2>
            <p className="text-xs font-bold text-zinc-500 mt-1">
              Purchased from {itemToReview.sellerId?.storeName || "Threadly"}
            </p>
          </div>
        </div>

        {/* Review Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 md:p-8 space-y-8"
        >
          {/* 1. Star Rating */}
          <div>
            <label className="block text-sm font-black text-zinc-900 mb-3 uppercase tracking-wider">
              Overall Rating *
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() =>
                    setValue("rating", star, { shouldValidate: true })
                  }
                  className="transition-transform hover:scale-110 focus:outline-none"
                >
                  <RiStarFill
                    size={36}
                    className={
                      star <= currentRating ? "text-amber-400" : "text-zinc-200"
                    }
                  />
                </button>
              ))}
            </div>
            {errors.rating && (
              <p className="text-red-500 text-xs font-bold mt-2">
                {errors.rating.message}
              </p>
            )}
          </div>

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
          <div>
            <label className="block text-sm font-black text-zinc-900 mb-1 uppercase tracking-wider">
              Add Photos
            </label>
            <p className="text-xs font-semibold text-zinc-500 mb-3">
              Upload up to 5 images (Optional)
            </p>

            <div className="flex flex-wrap gap-4">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className="relative w-24 h-24 rounded-xl overflow-hidden border border-zinc-200 group"
                >
                  <Image
                    src={URL.createObjectURL(img)}
                    alt={`Upload ${idx}`}
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-1 right-1 text-white bg-black/50 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <RiCloseCircleFill size={20} />
                  </button>
                </div>
              ))}

              {images.length < 5 && (
                <label className="w-24 h-24 rounded-xl border-2 border-dashed border-zinc-300 bg-zinc-50 flex flex-col items-center justify-center text-zinc-400 hover:text-amber-500 hover:border-amber-400 hover:bg-amber-50 cursor-pointer transition-colors">
                  <RiImageAddLine size={28} />
                  <span className="text-[10px] font-bold mt-1">Add Photo</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              )}
            </div>
          </div>

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
