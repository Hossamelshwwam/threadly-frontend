"use client";

import React from "react";
import Link from "next/link";
import { RiStarFill } from "react-icons/ri";
import type { SellerReview } from "../../types/review.types";
import Image from "next/image";

interface Props {
  review: SellerReview;
}

export function SellerReviewCard({ review }: Props) {
  const productImage = review.productId.images?.[0];

  return (
    <div className="p-5 transition-colors hover:bg-zinc-50/50 border-b border-zinc-100 last:border-b-0 bg-white rounded-lg">
      <div className="flex gap-4">
        {/* Product Image */}
        <Link
          href={`/seller/products/${review.productId._id}`}
          className="shrink-0"
        >
          <div className="w-16 h-16 rounded-lg bg-zinc-100 border border-zinc-200 overflow-hidden">
            {productImage ? (
              <Image
                src={productImage}
                alt={review.productId.name}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-lg font-bold text-zinc-300">
                {review.productId.name.charAt(0)}
              </div>
            )}
          </div>
        </Link>

        <div className="flex-1 min-w-0">
          {/* Product Name & Date */}
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <Link
              href={`/seller/products/${review.productId._id}`}
              className="text-sm font-bold text-main hover:text-main-warm hover:underline truncate"
            >
              {review.productId.name}
            </Link>
            <p className="text-[11px] text-zinc-400 whitespace-nowrap shrink-0 pt-0.5">
              {new Date(review.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>

          {/* Buyer Info */}
          <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-5 rounded-full bg-zinc-200 flex items-center justify-center text-[9px] font-bold text-zinc-600 uppercase">
              {review.buyerId?.name?.charAt(0) || "U"}
            </div>
            <span className="text-xs font-medium text-zinc-600">
              {review.buyerId?.name || "Anonymous"}
            </span>
          </div>

          {/* Stars */}
          <div className="flex items-center gap-0.5 mb-2.5">
            {[...Array(5)].map((_, i) => (
              <RiStarFill
                key={i}
                size={14}
                className={
                  i < review.rating ? "text-amber-400" : "text-zinc-200"
                }
              />
            ))}
          </div>

          {/* Comment */}
          <p className="text-sm text-zinc-700 leading-relaxed">
            {review.comment}
          </p>

          {/* Images */}
          {review.images && review.images.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {review.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Review image ${i + 1}`}
                  className="w-14 h-14 object-cover rounded-lg border border-zinc-200"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
