"use client";

import { useState } from "react";
import Image from "next/image";
import { RiImageLine, RiZoomInLine } from "react-icons/ri";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

export function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="flex aspect-[4/5] w-full flex-col items-center justify-center rounded-3xl border border-zinc-200 bg-zinc-100 text-zinc-400">
        <RiImageLine size={48} className="mb-4 opacity-50" />
        <span className="text-sm font-medium">No image available</span>
      </div>
    );
  }

  // Use Fancybox programmatic API to open the gallery
  const openGallery = (startIndex = activeIndex) => {
    Fancybox.show(
      images.map((src) => ({
        src,
        type: "image",
      })),
      {
        startIndex: startIndex,
        Carousel: {
          infinite: false,
        },
      },
    );
  };

  // Logic for the 5-column thumbnail grid
  const MAX_THUMBNAILS = 5;
  const remainingCount = images.length - MAX_THUMBNAILS;
  const visibleThumbnails = images.slice(0, MAX_THUMBNAILS);

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image Container */}
      <div
        onClick={() => openGallery()}
        className="group relative w-full aspect-[4/5] cursor-zoom-in overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-100"
      >
        <Image
          src={images[activeIndex]}
          alt={productName}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />

        {/* Hover Hint Icon */}
        <div className="absolute bottom-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-zinc-900 opacity-0 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:opacity-100">
          <RiZoomInLine size={24} />
        </div>
      </div>

      {/* Thumbnails (5 Columns) */}
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-3">
          {visibleThumbnails.map((img, i) => {
            const isLastAndMore =
              i === MAX_THUMBNAILS - 1 && remainingCount > 0;

            return (
              <button
                key={i}
                onClick={() => {
                  if (isLastAndMore) {
                    // Open Fancybox starting at the first hidden image
                    openGallery(MAX_THUMBNAILS - 1);
                  } else {
                    setActiveIndex(i);
                  }
                }}
                aria-label={
                  isLastAndMore
                    ? `View ${remainingCount} more images`
                    : `View image ${i + 1}`
                }
                className={`relative aspect-[3/4] w-full overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                  i === activeIndex && !isLastAndMore
                    ? "border-amber-500 opacity-100 shadow-md ring-2 ring-amber-500/20"
                    : "border-transparent opacity-60 hover:border-zinc-300 hover:opacity-100"
                }`}
              >
                <Image
                  src={img}
                  alt={`${productName} thumbnail ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 20vw, 100px"
                />

                {/* Dark Overlay for +X Remaining Images */}
                {isLastAndMore && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-zinc-950/60 text-lg font-black text-white backdrop-blur-sm transition-colors hover:bg-zinc-950/70">
                    +{remainingCount}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
