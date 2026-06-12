import type { ReactNode } from "react";

interface AuthCardProps {
  children: ReactNode;
}

export function AuthCard({ children }: AuthCardProps) {
  return (
    <div className="w-full bg-white border border-zinc-200 p-8 rounded-lg shadow-sm">
      {children}
    </div>
  );
}
