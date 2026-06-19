import React from "react";

export function StorefrontSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-pulse font-sans">
      {/* Header Skeleton */}
      <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm mb-10">
        <div className="h-48 md:h-64 w-full bg-zinc-200" />
        <div className="px-6 md:px-10 pb-8 relative">
          <div className="flex flex-col md:flex-row gap-5 -mt-12">
            <div className="h-24 w-24 md:h-32 md:w-32 rounded-2xl bg-zinc-300 border-4 border-white shrink-0" />
            <div className="mt-14 md:mt-16 w-full">
              <div className="h-8 w-64 bg-zinc-200 rounded-lg mb-3" />
              <div className="h-4 w-40 bg-zinc-100 rounded-md" />
            </div>
          </div>
          <div className="h-4 w-full max-w-2xl bg-zinc-100 rounded-md mt-6" />
          <div className="h-4 w-3/4 max-w-xl bg-zinc-100 rounded-md mt-2" />
        </div>
      </div>

      {/* Products Grid Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="flex flex-col gap-3">
            <div className="w-full aspect-[3/4] bg-zinc-200 rounded-2xl" />
            <div className="h-5 w-3/4 bg-zinc-200 rounded-md" />
            <div className="h-5 w-1/3 bg-zinc-200 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
}
