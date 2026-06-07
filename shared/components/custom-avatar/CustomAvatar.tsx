import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";

export default function CustomAvatar({
  fallback,
  img,
  loading,
}: {
  fallback?: string;
  img?: string;
  loading?: boolean;
}) {
  return (
    <Avatar>
      <AvatarImage src={img} alt={fallback} />
      <AvatarFallback
        className={cn(
          "bg-main text-white border-2 border-main-warm",
          loading && "animate-spin",
        )}
      >
        {loading ? (
          <span className="w-4 h-4 rounded-full border-2 border-main-subtle/30 border-t-main-subtle animate-spin"></span>
        ) : (
          (fallback ?? "U")
        )}
      </AvatarFallback>
    </Avatar>
  );
}
