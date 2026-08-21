"use client";

import React from "react";
import Image from "next/image";
import { toast } from "sonner";
import { RiCloseCircleFill, RiImageAddLine } from "react-icons/ri";

const MAX_IMAGES = 5;

interface Props {
  images: File[];
  onAddFiles: (files: File[]) => void;
  onRemoveImage: (index: number) => void;
}

export function ReviewImagesUpload({
  images,
  onAddFiles,
  onRemoveImage,
}: Props) {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (images.length + files.length > MAX_IMAGES) {
      toast.error(`You can only upload up to ${MAX_IMAGES} images.`);
      return;
    }
    onAddFiles(files);
  };

  return (
    <div>
      <label className="block text-sm font-black text-zinc-900 mb-1 uppercase tracking-wider">
        Add Photos
      </label>
      <p className="text-xs font-semibold text-zinc-500 mb-3">
        Upload up to {MAX_IMAGES} images (Optional)
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
              onClick={() => onRemoveImage(idx)}
              className="absolute top-1 right-1 text-white bg-black/50 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <RiCloseCircleFill size={20} />
            </button>
          </div>
        ))}

        {images.length < MAX_IMAGES && (
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
  );
}
