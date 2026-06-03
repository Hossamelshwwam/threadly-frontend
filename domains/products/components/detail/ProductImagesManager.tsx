"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import {
  RiUploadCloud2Line,
  RiDeleteBin6Line,
  RiImageLine,
  RiLoader4Line,
} from "react-icons/ri";
import { toast } from "sonner";

import {
  useUploadProductImages,
  useDeleteProductImage,
} from "../../hooks/useProductImages";
import { ConfirmationDialog } from "@/shared/components/confirmation-dialog/ConfirmationDialog";

interface ProductImagesManagerProps {
  productId: string;
  images: string[];
}

export function ProductImagesManager({
  productId,
  images = [],
}: ProductImagesManagerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDropping, setIsDropping] = useState(false);

  const { mutateAsync: uploadImagesAsync, isPending: isUploading } =
    useUploadProductImages();
  const { mutateAsync: deleteImageAsync, isPending: isDeleting } =
    useDeleteProductImage();

  const handleFiles = (filesList: FileList | null) => {
    if (!filesList || filesList.length === 0) return;

    const incomingFiles = Array.from(filesList);

    // Safety check against backend threshold criteria
    if (images.length + incomingFiles.length > 8) {
      toast.error(
        `Platform limit exceeded. A single product is capped at 8 assets total.`,
      );
      return;
    }

    toast.promise(uploadImagesAsync({ id: productId, files: incomingFiles }), {
      loading: "Uploading product media assets to cloud storage...",
      success: "Images uploaded and synchronized successfully.",
      error: (err: any) =>
        err?.response?.data?.message || "Failed to process image files upload.",
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const handleDelete = (url: string) => {
    toast.promise(deleteImageAsync({ id: productId, imageUrl: url }), {
      loading: "Removing product media record...",
      success: "Image successfully deleted from listing assets.",
      error: (err: any) =>
        err?.response?.data?.message || "Failed to drop image selection.",
    });
  };

  return (
    <div className="bg-white border border-zinc-200 rounded-lg p-5 space-y-4 shadow-xs font-sans">
      <div>
        <h2 className="text-sm font-bold text-zinc-900">
          Asset Media Gallery Management
        </h2>
        <p className="text-xs text-on-surface-muted mt-0.5">
          Upload product showcases or variant previews. Maximum of 8 images
          allowed.
        </p>
      </div>

      {/* Grid Canvas Gallery View Wrapper */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {images.map((img, i) => (
          <div
            key={i}
            className="aspect-square border border-zinc-200 rounded-lg relative overflow-hidden bg-zinc-50 shadow-xs group"
          >
            <Image
              src={img}
              alt={`Product asset visual slot ${i + 1}`}
              fill
              className="object-cover"
            />

            {/* Delete Hover Overlay Frame Button */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <ConfirmationDialog
                onConfirm={() => handleDelete(img)}
                title="Confirm Image Deletion"
                description="Are you sure you want to permanently delete this image from the product's media gallery? This action cannot be undone."
                confirmText="Yes, Delete"
                cancelText="Cancel"
                variant="danger"
              >
                <button
                  type="button"
                  disabled={isDeleting || isUploading}
                  className="p-2 bg-white text-error rounded-full hover:bg-error-bg shadow-md transition-all scale-90 group-hover:scale-100 cursor-pointer disabled:opacity-50"
                  title="Permanently remove image file asset"
                >
                  <RiDeleteBin6Line size={18} />
                </button>
              </ConfirmationDialog>
            </div>
          </div>
        ))}

        {/* Dynamic Placeholder Blocks up to limit */}
        {images.length === 0 && (
          <div className="col-span-2 sm:col-span-4 border border-dashed border-zinc-200 rounded-lg h-36 flex flex-col items-center justify-center bg-zinc-50/50 text-zinc-400 gap-1.5">
            <RiImageLine size={28} className="text-zinc-300" />
            <p className="text-xs font-medium">
              No graphic files mapped to this inventory profile yet.
            </p>
          </div>
        )}
      </div>

      {/* Interactive Drag & Drop Active Dropzone Container Layer */}
      {images.length < 8 ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDropping(true);
          }}
          onDragLeave={() => setIsDropping(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDropping(false);
            handleFiles(e.dataTransfer.files);
          }}
          className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${
            isDropping
              ? "border-amber-400 bg-amber-50/30"
              : "border-zinc-200 bg-zinc-50/50 hover:bg-zinc-50 hover:border-zinc-300"
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            multiple
            className="hidden"
            disabled={isUploading || isDeleting}
          />

          {isUploading ? (
            <div className="text-center space-y-1.5 py-2">
              <RiLoader4Line
                size={28}
                className="text-amber-500 animate-spin mx-auto"
              />
              <p className="text-xs font-semibold text-zinc-500">
                Uploading new visual resources...
              </p>
            </div>
          ) : (
            <div className="text-center space-y-1 text-zinc-500">
              <RiUploadCloud2Line
                size={32}
                className="text-amber-400 mx-auto mb-1"
              />
              <p className="text-sm font-semibold text-zinc-800">
                Click to browse or drop asset files here
              </p>
              <p className="text-[11px] text-on-surface-muted">
                Supports PNG, JPEG, or WEBP layouts. Remaining space:{" "}
                {8 - images.length} files.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="p-3.5 bg-warning-bg border border-warning/20 rounded-md text-center">
          <p className="text-xs font-semibold text-warning">
            Maximum gallery threshold achieved. Delete existing items to add new
            images.
          </p>
        </div>
      )}
    </div>
  );
}
