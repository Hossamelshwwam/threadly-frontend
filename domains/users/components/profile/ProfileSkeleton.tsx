import React from "react";

export default function ProfileSkeleton() {
  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-6 md:p-8 shadow-sm font-sans flex-1 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 border-b border-zinc-100 pb-8">
        <div className="flex items-center gap-6">
          {/* Avatar Skeleton */}
          <div className="h-24 w-24 rounded-full bg-zinc-200 shrink-0" />

          {/* Name and Badge Skeleton */}
          <div>
            <div className="h-8 w-48 bg-zinc-200 rounded-lg mb-3" />
            <div className="h-6 w-24 bg-zinc-200 rounded-md" />
          </div>
        </div>

        {/* Edit Button Skeleton */}
        <div className="h-11 w-full md:w-32 bg-zinc-200 rounded-xl" />
      </div>

      {/* Body Cards Skeleton */}
      <div className="max-w-2xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name Card Skeleton */}
          <div className="bg-zinc-50 border border-zinc-100 rounded-xl p-5">
            <div className="h-4 w-24 bg-zinc-200 rounded-md mb-3" />
            <div className="h-6 w-3/4 bg-zinc-200 rounded-md" />
          </div>

          {/* Email Card Skeleton */}
          <div className="bg-zinc-50 border border-zinc-100 rounded-xl p-5">
            <div className="h-4 w-28 bg-zinc-200 rounded-md mb-3" />
            <div className="h-6 w-5/6 bg-zinc-200 rounded-md" />
          </div>

          {/* Phone Card Skeleton */}
          <div className="bg-zinc-50 border border-zinc-100 rounded-xl p-5 md:col-span-2">
            <div className="h-4 w-32 bg-zinc-200 rounded-md mb-3" />
            <div className="h-6 w-1/3 bg-zinc-200 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
