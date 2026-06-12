"use client";

import React from "react";

export function SellerReviewListSkeleton() {
  return (
    <div className="divide-y divide-zinc-100">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="p-5 animate-pulse">
          <div className="flex gap-4">
            <div className="w-16 h-16 rounded-lg bg-zinc-200 shrink-0" />
            <div className="flex-1 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-40 rounded bg-zinc-200" />
                  <div className="h-3 w-24 rounded bg-zinc-100" />
                </div>
                <div className="h-3 w-20 rounded bg-zinc-100 shrink-0" />
              </div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <div key={s} className="w-3.5 h-3.5 rounded bg-zinc-200" />
                ))}
              </div>
              <div className="space-y-2">
                <div className="h-3 w-full rounded bg-zinc-100" />
                <div className="h-3 w-3/4 rounded bg-zinc-100" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
