"use client";

import React, { useState } from "react";
import { FaSpinner } from "react-icons/fa";

import { useGetMyStore } from "../hooks/useGetMyStore";
import { SellerLogoDropzone } from "../components/profile/SellerLogoDropzone";
import { SellerBannerDropzone } from "../components/profile/SellerBannerDropzone";
import { StoreProfilePreview } from "../components/profile/StoreProfilePreview";
import { StoreProfileForm } from "../components/profile/StoreProfileForm";

export default function SellerProfilePage() {
  const { data, isLoading } = useGetMyStore();
  const [isEditing, setIsEditing] = useState(false);

  const store = data?.data;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <FaSpinner className="text-4xl text-amber-500 animate-spin mb-4" />
        <p className="text-sm font-medium text-zinc-500">
          Loading store settings...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-black text-zinc-900">Store Settings</h1>
        <p className="text-sm text-zinc-500 mt-1">
          Manage your public store profile, branding, and payout details.
        </p>
      </div>

      {/* Dynamic Render based on Edit State */}
      {!isEditing ? (
        // --- PREVIEW MODE (Full Width) ---
        <div className="w-full animate-in fade-in zoom-in-95 duration-200">
          <StoreProfilePreview
            store={store}
            onEdit={() => setIsEditing(true)}
          />
        </div>
      ) : (
        // --- EDIT MODE (Split Grid) ---
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Left Column: Text Forms */}
          <div className="lg:col-span-8">
            <StoreProfileForm
              store={store}
              onCancel={() => setIsEditing(false)}
            />
          </div>

          {/* Right Column: Image Dropzones */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
              <SellerLogoDropzone currentLogo={store?.logo} />
            </div>

            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
              <SellerBannerDropzone currentBanner={store?.banner} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
