"use client";

import React from "react";
import Image from "next/image";
import {
  RiEditBoxLine,
  RiBankLine,
  RiStore2Line,
  RiImage2Line,
} from "react-icons/ri";
import CustomButton from "@/shared/components/custom-button/custom-button";

interface StoreProfilePreviewProps {
  store: any; // Replace with your exact Seller/Store type
  onEdit: () => void;
}

export function StoreProfilePreview({
  store,
  onEdit,
}: StoreProfilePreviewProps) {
  const maskAccountNumber = (accountNumber?: string) => {
    if (!accountNumber) return "Not provided";
    if (accountNumber.length < 8) return accountNumber;
    return `**** **** **** ${accountNumber.slice(-4)}`;
  };

  const storeInitial = store?.storeName?.charAt(0)?.toUpperCase() || "S";

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm font-sans flex flex-col">
      {/* Header Area */}
      <div className="px-6 sm:px-8 py-6 border-b border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-50/50 rounded-t-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center text-amber-500 border border-amber-100">
            <RiStore2Line size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-zinc-900 leading-none">
              Store Information
            </h3>
            <p className="text-xs text-zinc-500 mt-1">
              Review your public profile and payout configuration.
            </p>
          </div>
        </div>
        <CustomButton
          variant="outline"
          theme="neutral"
          size="sm"
          leftIcon={<RiEditBoxLine />}
          onClick={onEdit}
        >
          Edit Profile
        </CustomButton>
      </div>

      {/* Main Content Grid */}
      <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        {/* Left Column: Text & Financials */}
        <div className="md:col-span-7 space-y-8">
          {/* Text Info */}
          <div className="space-y-5">
            <div>
              <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                Store Name
              </p>
              <p className="text-base font-semibold text-zinc-900">
                {store?.storeName || "Unnamed Store"}
              </p>
            </div>

            <div>
              <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                Store Description
              </p>
              <p className="text-sm text-zinc-700 leading-relaxed max-w-lg whitespace-pre-wrap">
                {store?.description || (
                  <span className="italic text-zinc-400">
                    No description provided.
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Bank Info Card */}
          <div className="bg-zinc-50 rounded-xl p-5 border border-zinc-200">
            <div className="flex items-center gap-2 mb-4 border-b border-zinc-200 pb-3">
              <RiBankLine className="text-zinc-500" size={18} />
              <h4 className="text-sm font-bold text-zinc-900">
                Payout Destination
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
              <div>
                <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                  Bank Name
                </p>
                <p className="text-sm font-medium text-zinc-900">
                  {store?.bankDetails?.bankName || "Not configured"}
                </p>
              </div>
              <div>
                <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                  Account Holder
                </p>
                <p className="text-sm font-medium text-zinc-900">
                  {store?.bankDetails?.accountName || "Not configured"}
                </p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                  Account Number / IBAN
                </p>
                <p className="text-sm font-mono font-medium text-zinc-700">
                  {maskAccountNumber(store?.bankDetails?.accountNumber)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Media Previews */}
        <div className="md:col-span-5 space-y-6 md:border-l md:border-zinc-100 md:pl-8">
          <div className="flex items-center gap-2 mb-2">
            <RiImage2Line className="text-zinc-400" />
            <h4 className="text-sm font-bold text-zinc-900">Branding Assets</h4>
          </div>

          {/* Logo Preview */}
          <div>
            <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2">
              Store Logo
            </p>
            <div className="relative w-20 h-20 rounded-full border border-zinc-200 shadow-sm overflow-hidden bg-zinc-50 flex items-center justify-center shrink-0">
              {store?.logo ? (
                <Image
                  src={store.logo}
                  alt="Logo"
                  width={40}
                  height={40}
                  className="object-contain w-auto h-auto"
                />
              ) : (
                <span className="text-2xl  font-black text-zinc-300">
                  {storeInitial}
                </span>
              )}
            </div>
          </div>

          {/* Banner Preview */}
          <div>
            <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2">
              Store Banner
            </p>
            <div className="relative w-full h-32 rounded-xl border border-zinc-200 shadow-sm overflow-hidden bg-zinc-50 flex items-center justify-center">
              {store?.banner ? (
                <Image
                  src={store.banner}
                  alt="Banner"
                  width={500}
                  height={132}
                  loading="eager"
                  className="object-cover"
                />
              ) : (
                <span className="text-xs font-medium text-zinc-400">
                  No banner uploaded
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
