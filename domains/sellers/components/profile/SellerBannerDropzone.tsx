"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { RiImageAddLine } from "react-icons/ri";
import { FaSpinner } from "react-icons/fa";
import { useUploadBranding } from "../../hooks/useUploadBranding";

export function SellerBannerDropzone({
  currentBanner,
}: {
  currentBanner?: string;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { mutateAsync: uploadBranding, isPending } = useUploadBranding();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Banner must be less than 5MB");
      return;
    }

    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);

    toast.promise(uploadBranding({ type: "banner", file }), {
      loading: "Uploading store banner...",
      success: "Banner updated successfully!",
      error: "Failed to upload banner. Please try again.",
    });
  };

  const displayImage = preview || currentBanner;

  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-sm font-bold text-zinc-900">Store Banner</h4>
      <p className="text-xs text-zinc-500 mb-2">
        This image will appear at the top of your public storefront.
      </p>

      <div
        onClick={() => !isPending && fileInputRef.current?.click()}
        className={`relative w-full h-40 sm:h-48 rounded-xl border-2 border-dashed border-zinc-200 bg-zinc-50 flex flex-col items-center justify-center overflow-hidden cursor-pointer hover:border-amber-400 transition-colors group ${isPending ? "opacity-50 pointer-events-none" : ""}`}
      >
        {isPending ? (
          <div className="flex flex-col items-center gap-2 text-amber-500">
            <FaSpinner className="animate-spin text-2xl" />
            <span className="text-xs font-semibold">Uploading...</span>
          </div>
        ) : displayImage ? (
          <>
            <Image
              src={displayImage}
              alt="Store Banner"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white text-sm font-bold flex items-center gap-2">
                <RiImageAddLine className="text-lg" /> Change Banner
              </span>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center text-zinc-400 group-hover:text-amber-500 transition-colors">
            <RiImageAddLine className="text-3xl mb-2" />
            <span className="text-sm font-bold text-zinc-600">
              Click to upload banner
            </span>
            <span className="text-xs mt-1">
              1200 x 300px recommended (Max 5MB)
            </span>
          </div>
        )}
      </div>

      <input
        type="file"
        accept="image/png, image/jpeg, image/jpg, image/webp"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </div>
  );
}
