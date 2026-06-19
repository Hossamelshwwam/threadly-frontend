import React from "react";

export default function AddressesSkeleton() {
  return (
    <div className="font-sans animate-pulse flex-1">
      {/* Header Skeleton */}
      <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          {/* Title Placeholder */}
          <div className="h-7 w-48 bg-zinc-200 rounded-lg mb-2.5" />
          {/* Subtitle Placeholder */}
          <div className="h-4 w-64 bg-zinc-100 rounded-md" />
        </div>
        {/* Add Button Placeholder */}
        <div className="h-11 w-full sm:w-44 bg-zinc-200 rounded-xl" />
      </div>

      {/* Grid of Address Card Skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="border-2 border-zinc-100 rounded-2xl p-5 bg-white flex flex-col justify-between min-h-[250px]"
          >
            <div>
              {/* Card Header (Icon + Label) */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-5 h-5 bg-zinc-200 rounded-full" />
                <div className="h-5 w-24 bg-zinc-200 rounded-md" />
              </div>

              {/* Address Lines Skeleton */}
              <div className="space-y-3">
                <div className="h-4 w-32 bg-zinc-200 rounded-md" /> {/* Name */}
                <div className="h-4 w-3/4 bg-zinc-100 rounded-md" />{" "}
                {/* Street */}
                <div className="h-4 w-2/3 bg-zinc-100 rounded-md" />{" "}
                {/* City/State */}
                <div className="h-4 w-1/4 bg-zinc-100 rounded-md" />{" "}
                {/* Country */}
                <div className="h-4 w-40 bg-zinc-200 rounded-md mt-4" />{" "}
                {/* Phone */}
              </div>
            </div>

            {/* Actions Skeleton (Edit / Remove / Set Default) */}
            <div className="flex items-center gap-4 pt-5 mt-5 border-t border-zinc-50">
              <div className="h-4 w-12 bg-zinc-200 rounded-md" />
              <div className="h-4 w-16 bg-zinc-200 rounded-md" />
              <div className="h-4 w-24 bg-zinc-100 rounded-md ml-auto" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
