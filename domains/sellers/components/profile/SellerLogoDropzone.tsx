"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { RiImageAddLine } from "react-icons/ri";
import { FaSpinner } from "react-icons/fa";
import { useUploadBranding } from "../../hooks/useUploadBranding";

export function SellerLogoDropzone({ currentLogo }: { currentLogo?: string }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutateAsync: uploadBranding, isPending } = useUploadBranding();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (e.g., max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Logo must be less than 2MB");
      return;
    }

    // Upload to server using Sonner toast
    toast.promise(uploadBranding({ type: "logo", file }), {
      loading: "Uploading logo...",
      success: "Store logo updated successfully!",
      error: "Failed to upload logo. Please try again.",
    });
  };

  const displayImage = currentLogo;

  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-sm font-bold text-zinc-900">Store Logo</h4>

      <div className="flex items-center gap-6">
        {/* Avatar Circle */}
        <div
          onClick={() => !isPending && fileInputRef.current?.click()}
          className={`relative w-24 h-24 rounded-full border-2 border-dashed border-zinc-200 bg-zinc-50 flex shrink-0 items-center justify-center overflow-hidden cursor-pointer hover:border-amber-400 hover:bg-amber-50 transition-colors group ${isPending ? "opacity-50 pointer-events-none" : ""}`}
        >
          {isPending ? (
            <FaSpinner className="text-amber-500 animate-spin text-xl" />
          ) : displayImage ? (
            <>
              <Image
                src={displayImage}
                alt="Store Logo"
                width={52}
                height={52}
                className="object-contain h-auto w-auto"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <RiImageAddLine className="text-white text-xl" />
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center text-zinc-400 group-hover:text-amber-500">
              <RiImageAddLine className="text-2xl mb-1" />
            </div>
          )}
        </div>

        {/* Info Text */}
        <div className="text-xs text-zinc-500 space-y-1">
          <p>
            We recommend an image of at least{" "}
            <span className="font-semibold text-zinc-700">300x300px</span>.
          </p>
          <p>
            Accepted formats:{" "}
            <span className="font-semibold text-zinc-700">JPG, PNG</span>.
          </p>
          <button
            type="button"
            onClick={() => !isPending && fileInputRef.current?.click()}
            className="text-main font-bold mt-2 hover:underline disabled:opacity-50"
            disabled={isPending}
          >
            Choose new logo
          </button>
        </div>
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
