"use client";

import React, { useRef } from "react";
import Image from "next/image";
import {
  RiUploadCloud2Fill,
  RiCloseCircleFill,
  RiLoader4Line,
  RiDeleteBinLine,
} from "react-icons/ri";
import { toast } from "sonner";

import {
  useUploadProductImages,
  useDeleteProductImage,
} from "../../hooks/useProducts";
import { ConfirmationDialog } from "@/shared/components/confirmation-dialog/ConfirmationDialog";
import { cn } from "@/shared/lib";

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

    // Clear the input so the same files can be selected again if needed
    if (fileInputRef.current) fileInputRef.current.value = "";
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
        <div className="w-full aspect-square sm:aspect-video md:aspect-[21/9] relative rounded-xl overflow-hidden border border-zinc-200 group shadow-sm bg-zinc-50">
          <Image
            src={mainImage}
            alt="Cover"
            className="object-contain sm:object-cover"
            fill
            loading="eager"
            sizes="(max-width: 768px) 100vw, 50vw"
          />

          {/* Desktop Hover Overlay */}
          <div className="hidden sm:flex absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity items-center justify-center backdrop-blur-sm z-10">
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

          {/* Mobile Delete Button (Always visible on mobile, hidden on desktop) */}
          <div className="absolute bottom-3 right-3 sm:hidden z-20">
            <ConfirmationDialog
              onConfirm={() => handleDelete(mainImage)}
              title="Remove Cover Image"
              description="Remove this cover image? The next image will become the cover."
              confirmText="Delete"
              variant="danger"
            >
              <button className="bg-white text-error p-2.5 rounded-full shadow-lg flex items-center justify-center border border-zinc-100">
                <RiDeleteBinLine size={20} />
              </button>
            </ConfirmationDialog>
          </div>

          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-zinc-800 shadow-sm z-20">
            Cover Image
          </div>
        </div>
      ) : (
        <div className="w-full aspect-square sm:aspect-video md:aspect-[21/9] rounded-xl border-2 border-dashed border-zinc-300 bg-zinc-50 flex flex-col items-center justify-center text-zinc-400">
          <RiUploadCloud2Fill size={40} className="text-zinc-300 mb-2" />
          <p className="text-sm font-medium">No cover image uploaded</p>
        </div>
      )}

      {/* Thumbnails & Upload Button */}
      {/* Scrollbar-hide keeps it clean on mobile while allowing native swiping */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide items-center">
        {thumbnails.map((img, i) => (
          <div
            key={i}
            className="min-w-24 w-24 sm:min-w-28 sm:w-28 aspect-square relative rounded-lg overflow-hidden border border-zinc-200 group shrink-0 bg-white shadow-sm"
          >
            <Image
              src={img}
              alt={`Thumbnail ${i + 1}`}
              fill
              sizes="(max-width: 640px) 96px, 112px"
              className="object-cover"
            />

            {/* Delete Action (Top right corner - visible on mobile, hover on desktop) */}
            <div className="absolute top-1.5 right-1.5 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity z-10">
              <ConfirmationDialog
                onConfirm={() => handleDelete(img)}
                title="Delete Image"
                description="Remove this image?"
                confirmText="Delete"
                variant="danger"
              >
                <button
                  className="bg-white/90 backdrop-blur text-error p-1.5 rounded-full shadow-sm hover:bg-white hover:text-red-600 transition-colors cursor-pointer"
                  title="Delete"
                >
                  <RiDeleteBinLine size={16} />
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
            className={cn(
              "min-w-24 w-24 sm:min-w-28 sm:w-28 aspect-square rounded-lg border-2 border-dashed border-zinc-300 bg-zinc-50 flex flex-col items-center justify-center gap-1.5 text-zinc-500 flex-shrink-0 transition-colors",
              isUploading || isDeleting
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-amber-50 hover:border-amber-300 hover:text-amber-600 cursor-pointer",
            )}
          >
            {isUploading ? (
              <RiLoader4Line className="animate-spin text-2xl" />
            ) : (
              <RiUploadCloud2Fill className="text-2xl" />
            )}
            <span className="text-[10px] font-bold uppercase tracking-wider text-center px-1">
              {isUploading ? "Uploading..." : "Add Image"}
            </span>
          </button>
        )}

        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => handleFiles(e.target.files)}
          accept="image/png, image/jpeg, image/webp"
          multiple
          className="hidden"
          disabled={isUploading || isDeleting}
        />
      </div>
    </div>
  );
}
