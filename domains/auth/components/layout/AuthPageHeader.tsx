import type { ReactNode } from "react";

interface AuthPageHeaderProps {
  title: string;
  subtitle: string;
  icon?: ReactNode;
}

export function AuthPageHeader({ title, subtitle, icon }: AuthPageHeaderProps) {
  return (
    <div className="mb-8 w-full text-center">
      {icon && (
        <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto mb-5">
          {icon}
        </div>
      )}
      <h1 className="text-3xl font-bold text-zinc-900 mb-2">{title}</h1>
      <p className="text-base text-zinc-500">{subtitle}</p>
    </div>
  );
}
