"use client";

import React, { useState } from "react";
import { useGetMe } from "../hooks/useUser"; // Adjust import path
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileDisplay from "../components/profile/ProfileDisplay";
import ProfileForm from "../components/profile/ProfileForm";

export default function AccountProfilePage() {
  const { data: user, isLoading } = useGetMe();
  const [isEditing, setIsEditing] = useState(false);

  if (isLoading) {
    return (
      <div className="py-20 text-center text-zinc-500 font-medium">
        Loading profile...
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-6 md:p-8 shadow-sm font-sans flex-1">
      <ProfileHeader
        user={user}
        isEditing={isEditing}
        onEditClick={() => setIsEditing(true)}
      />

      {isEditing ? (
        <ProfileForm user={user} onCancel={() => setIsEditing(false)} />
      ) : (
        <ProfileDisplay user={user} />
      )}
    </div>
  );
}
