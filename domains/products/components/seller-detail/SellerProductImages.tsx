// domains/products/components/seller-detail/SellerProductImages.tsx
"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import {
  RiUploadCloud2Fill,
  RiCloseCircleFill,
  RiLoader4Line,
} from "react-icons/ri";
import { toast } from "sonner";

import {
  useUploadProductImages,
  useDeleteProductImage,
} from "../../hooks/useProducts";
import { ConfirmationDialog } from "@/shared/components/confirmation-dialog/ConfirmationDialog";

interface Props {
  productId: string;
  images: string[];
}

export function SellerProductImages({ productId, images = [] }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutateAsync: uploadImagesAsync, isPending: isUploading } =
    useUploadProductImages();
  const { mutateAsync: deleteImageAsync, isPending: isDeleting } =
    useDeleteProductImage();

  const handleFiles = (filesList: FileList | null) => {
    if (!filesList || filesList.length === 0) return;
    const incomingFiles = Array.from(filesList);

    if (images.length + incomingFiles.length > 8) {
      toast.error("You can only upload up to 8 images per product.");
      return;
    }

    toast.promise(uploadImagesAsync({ id: productId, files: incomingFiles }), {
      loading: "Uploading images...",
      success: "Images added to your gallery.",
      error: "Failed to upload images.",
    });
  };

  const handleDelete = (url: string) => {
    toast.promise(deleteImageAsync({ id: productId, imageUrl: url }), {
      loading: "Removing image...",
      success: "Image removed successfully.",
      error: "Failed to remove image.",
    });
  };

  const mainImage = images[0];
  const thumbnails = images.slice(1);

  return (
    <div className="space-y-4">
      {/* Featured Cover Image */}
      {mainImage ? (
        <div className="w-full aspect-[16/9] md:aspect-[21/9] relative rounded-xl overflow-hidden border border-zinc-100 group shadow-sm bg-zinc-50">
          <Image src={mainImage} alt="Cover" fill className="object-contain" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
            <ConfirmationDialog
              onConfirm={() => handleDelete(mainImage)}
              title="Remove Cover Image"
              description="Remove this cover image? The next image will become the cover."
              confirmText="Delete"
              variant="danger"
            >
              <button className="bg-white/90 text-error px-4 py-2 rounded-lg font-bold text-sm shadow-xl flex items-center gap-2 hover:bg-white transition-colors cursor-pointer disabled:opacity-50">
                <RiCloseCircleFill size={18} /> Remove Cover
              </button>
            </ConfirmationDialog>
          </div>
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-zinc-800 shadow-sm">
            Cover Image
          </div>
        </div>
      ) : (
        <div className="w-full aspect-[16/9] md:aspect-[21/9] rounded-xl border-2 border-dashed border-zinc-200 bg-zinc-50 flex flex-col items-center justify-center text-zinc-400">
          <RiUploadCloud2Fill size={40} className="text-zinc-300 mb-2" />
          <p className="text-sm font-medium">No cover image uploaded</p>
        </div>
      )}

      {/* Thumbnails & Upload Button */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide items-center">
        {thumbnails.map((img, i) => (
          <div
            key={i}
            className="min-w-[100px] w-[100px] aspect-square relative rounded-lg overflow-hidden border border-zinc-200 group flex-shrink-0"
          >
            <Image
              src={img}
              alt={`Thumbnail ${i}`}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <ConfirmationDialog
                onConfirm={() => handleDelete(img)}
                title="Delete Image"
                description="Remove this image?"
                confirmText="Delete"
                variant="danger"
              >
                <button
                  className="text-white hover:text-error transition-colors cursor-pointer"
                  title="Delete"
                >
                  <RiCloseCircleFill size={28} />
                </button>
              </ConfirmationDialog>
            </div>
          </div>
        ))}

        {/* Upload Trigger */}
        {images.length < 8 && (
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading || isDeleting}
            className="min-w-[100px] w-[100px] aspect-square rounded-lg border-2 border-dashed border-zinc-300 bg-zinc-50 hover:bg-amber-50 hover:border-amber-300 transition-colors flex flex-col items-center justify-center gap-1 text-zinc-500 hover:text-amber-600 disabled:opacity-50 flex-shrink-0 cursor-pointer"
          >
            {isUploading ? (
              <RiLoader4Line className="animate-spin text-2xl" />
            ) : (
              <RiUploadCloud2Fill className="text-2xl" />
            )}
            <span className="text-[10px] font-bold uppercase tracking-wider">
              {isUploading ? "Uploading" : "Add Image"}
            </span>
          </button>
        )}

        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => handleFiles(e.target.files)}
          accept="image/*"
          multiple
          className="hidden"
          disabled={isUploading || isDeleting}
        />
      </div>
    </div>
  );
}
