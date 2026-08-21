"use client";

import React from "react";
import { RiStarFill } from "react-icons/ri";

interface Props {
  value: number;
  onChange: (rating: number) => void;
  error?: string;
}

export function StarRatingInput({ value, onChange, error }: Props) {
  return (
    <div>
      <label className="block text-sm font-black text-zinc-900 mb-3 uppercase tracking-wider">
        Overall Rating *
      </label>
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            aria-label={`Rate ${star} ${star === 1 ? "star" : "stars"}`}
            onClick={() => onChange(star)}
            className="transition-transform hover:scale-110 focus:outline-none"
          >
            <RiStarFill
              size={36}
              className={star <= value ? "text-amber-400" : "text-zinc-200"}
            />
          </button>
        ))}
      </div>
      {error && (
        <p className="text-red-500 text-xs font-bold mt-2">{error}</p>
      )}
    </div>
  );
}
