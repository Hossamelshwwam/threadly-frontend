"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

export function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="aspect-[3/4] bg-zinc-100 rounded-xl flex items-center justify-center">
        <span className="text-zinc-400 text-sm">No image available</span>
      </div>
    );
  }

  return (
    <div className="sm:flex gap-4">
      {/* Desktop thumbnails (side column) */}
      <div className="hidden sm:flex flex-col gap-2 w-20 shrink-0 max-h-[600px] overflow-y-auto scrollbar-thin">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            aria-label={`View image ${i + 1}`}
            className={`relative aspect-[3/4] rounded-lg overflow-hidden border-2 transition-all ${
              i === activeIndex
                ? "border-amber-500 opacity-100"
                : "border-transparent opacity-60 hover:opacity-100"
            }`}
          >
            <Image
              src={img}
              alt={`${productName} ${i + 1}`}
              fill
              className="object-cover"
              sizes="80px"
            />
          </button>
        ))}
      </div>

      {/* Main image + mobile thumbnails below */}
      <div className="flex-1 flex flex-col gap-3 min-w-0">
        <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-zinc-50">
          <Image
            src={images[activeIndex]}
            alt={productName}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        {/* Mobile thumbnails */}
        <div className="sm:hidden flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`View image ${i + 1}`}
              className={`relative w-16 aspect-[3/4] shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                i === activeIndex
                  ? "border-amber-500"
                  : "border-transparent opacity-60"
              }`}
            >
              <Image
                src={img}
                alt={`${productName} ${i + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
