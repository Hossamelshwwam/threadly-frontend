import React from "react";
import Image from "next/image";
import { RiStore2Line, RiCalendarCheckLine } from "react-icons/ri";
import { SellerProfile } from "../../types/seller.types";

export function StoreHeader({ store }: { store: SellerProfile }) {
  return (
    <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm animate-fadeIn">
      {/* Banner Section */}
      <div className="h-48 md:h-64 w-full relative bg-amber-50 border-b border-zinc-200 overflow-hidden">
        {store.banner ? (
          <Image
            src={store.banner}
            alt={`${store.storeName} Banner`}
            fill
            priority // Critical for LCP
            className="object-cover"
          />
        ) : (
          // Decorative fallback if no banner
          <div className="absolute inset-0 bg-linear-to-r from-amber-100 to-amber-50 flex items-center justify-center">
            <RiStore2Line className="text-amber-200/50 text-9xl" />
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="px-6 md:px-10 pb-8 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          {/* Logo & Name */}
          <div className="flex flex-col md:flex-row md:items-end gap-5 -mt-12 relative z-10">
            <div className="h-24 w-24 md:h-32 md:w-32 rounded-2xl bg-white border-4 border-white shadow-md overflow-hidden relative shrink-0">
              {store.logo ? (
                <Image
                  src={store.logo}
                  alt={store.storeName}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-zinc-100 flex items-center justify-center">
                  <RiStore2Line className="text-4xl text-zinc-400" />
                </div>
              )}
            </div>

            <div className="mb-2">
              <h1 className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight">
                {store.storeName}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-zinc-500 mt-2">
                <span className="flex items-center gap-1.5">
                  <RiCalendarCheckLine size={14} /> Joined{" "}
                  {new Date(store.createdAt).getFullYear()}
                </span>
              </div>
            </div>
          </div>

          {/* Action / Rating Area (Optional) */}
          <div className="mb-2 flex items-center gap-2">
            <span className="bg-amber-50 text-amber-700 border border-amber-200 px-4 py-2 rounded-xl text-sm font-black shadow-sm">
              Official Threadly Partner
            </span>
          </div>
        </div>

        {/* Description */}
        {store.description && (
          <p className="mt-6 text-zinc-600 text-sm font-medium leading-relaxed max-w-3xl">
            {store.description}
          </p>
        )}
      </div>
    </div>
  );
}
