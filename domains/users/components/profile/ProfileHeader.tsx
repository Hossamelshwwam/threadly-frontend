"use client";

import React, { useRef } from "react";
import { toast } from "sonner";
import { RiEdit2Line, RiEditLine } from "react-icons/ri";
import CustomAvatar from "@/shared/components/custom-avatar/CustomAvatar";
import CustomButton from "@/shared/components/custom-button/custom-button";
import { useUploadAvatar } from "../../hooks/useUser";

export default function ProfileHeader({ user, isEditing, onEditClick }: any) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutateAsync: uploadAvatarAsync, isPending: isUploading } =
    useUploadAvatar();

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be smaller than 2MB");
      return;
    }

    toast.promise(uploadAvatarAsync(file), {
      loading: "Uploading new avatar...",
      success: "Avatar updated successfully!",
      error: "Failed to upload avatar",
    });
  };

  return (
    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 border-b border-zinc-100 pb-8">
      <div className="flex items-center gap-6">
        <div
          className="relative group cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <CustomAvatar
            img={user.data.avatar}
            fallback={user.data.name.split(" ")[0][0]}
            className="h-24 w-24"
            fallbackClassName="bg-zinc-400 border-zinc-200"
          />
          <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <RiEdit2Line className="text-white text-2xl" />
          </div>
          {isUploading && (
            <div className="absolute inset-0 bg-white/60 rounded-full flex items-center justify-center backdrop-blur-sm">
              <span className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></span>
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleAvatarChange}
          />
        </div>

        <div>
          <h1 className="text-2xl font-black text-zinc-900 tracking-tight">
            {user.data.name}
          </h1>
          <span className="inline-block px-2.5 py-1 bg-zinc-100 text-zinc-600 text-xs font-bold uppercase tracking-wider rounded-md mt-2">
            {user.data.role} Account
          </span>
        </div>
      </div>

      {!isEditing && (
        <CustomButton
          variant="outline"
          theme="neutral"
          leftIcon={<RiEditLine />}
          onClick={onEditClick}
          className="w-full md:w-auto font-bold rounded-xl"
        >
          Edit Profile
        </CustomButton>
      )}
    </div>
  );
}
