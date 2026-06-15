import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";

// Defining the props in an interface makes it cleaner when adding more
interface CustomAvatarProps {
  fallback?: string;
  img?: string;
  loading?: boolean;
  className?: string; // Allows you to pass Tailwind classes for size, margins, etc.
  fallbackClassName?: string; // Optional: to override fallback specific styles
}

export default function CustomAvatar({
  fallback,
  img,
  loading,
  className,
  fallbackClassName,
}: CustomAvatarProps) {
  return (
    <Avatar className={className}>
      <AvatarImage src={img} alt={fallback} />
      <AvatarFallback
        className={cn(
          "bg-main text-white border-2 border-main-warm",
          loading && "animate-spin",
          fallbackClassName,
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
