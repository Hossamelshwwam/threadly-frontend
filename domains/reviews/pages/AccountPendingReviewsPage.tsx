"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { RiStarSmileLine, RiArrowRightSLine, RiTimeLine } from "react-icons/ri";
import { usePendingReviews } from "../hooks/useReviews";

export default function AccountPendingReviewsPage() {
  const { data: response, isLoading } = usePendingReviews();
  const pendingItems = response?.data || [];

  if (isLoading) {
    return (
      <div className="py-32 flex flex-col items-center justify-center text-amber-600 font-medium animate-pulse flex-1">
        <div className="w-10 h-10 border-4 border-amber-100 border-t-amber-500 rounded-full animate-spin mb-4" />
        Finding your pending reviews...
      </div>
    );
  }

  return (
    <div className="flex-1 font-sans animate-fadeIn space-y-6 pb-12">
      {/* VIBRANT HEADER */}
      <div className="bg-white border border-zinc-200 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400 opacity-10 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-1">
            <div className="bg-white p-2 rounded-lg shadow-sm text-amber-600">
              <RiStarSmileLine size={24} />
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight">
              Pending Reviews
            </h1>
          </div>
          <p className="text-sm font-semibold text-amber-800/80 mt-2">
            Share your thoughts on these recently delivered items to help other
            shoppers!
          </p>
        </div>

        <div className="relative z-10 text-center hidden sm:block">
          <p className="text-xs font-black text-amber-500 uppercase tracking-widest mb-1">
            Awaiting
          </p>
          <p className="text-3xl font-black text-zinc-900">
            {pendingItems.length}
          </p>
        </div>
      </div>

      {/* ITEMS LIST */}
      {pendingItems.length === 0 ? (
        <div className="bg-white border border-zinc-200 rounded-2xl p-12 text-center flex flex-col items-center">
          <div className="h-20 w-20 bg-zinc-50 rounded-full flex items-center justify-center mb-4 border border-zinc-100">
            <RiStarSmileLine className="text-4xl text-zinc-300" />
          </div>
          <h3 className="text-xl font-black text-zinc-900">
            You&apos;re all caught up!
          </h3>
          <p className="text-zinc-500 font-medium mt-2 mb-6 max-w-sm">
            You don&apos;t have any pending reviews right now. Once your next
            order is delivered, it will appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {pendingItems.map((item: any) => (
            <div
              key={item._id}
              className="bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden flex flex-col hover:border-amber-300 transition-colors"
            >
              <div className="p-5 flex gap-5">
                <div className="h-24 w-24 relative bg-zinc-100 rounded-xl shrink-0 overflow-hidden border border-zinc-200">
                  <Image
                    src={item.productId?.images?.[0] || "/placeholder.jpg"}
                    alt={item.productId?.name || "Product"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-zinc-900 text-lg leading-tight line-clamp-2">
                      {item.productId?.name}
                    </h3>
                    <p className="text-xs font-bold text-zinc-500 mt-2 flex items-center gap-1.5">
                      <RiTimeLine /> Delivered recently
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-zinc-50 p-4 border-t border-zinc-100">
                <Link
                  href={`/account/reviews/write/${item._id}`}
                  className="w-full flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white font-bold py-3 rounded-xl transition-colors shadow-sm"
                >
                  Write a Review <RiArrowRightSLine size={18} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
