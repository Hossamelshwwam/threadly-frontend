"use client";
import { cn } from "@/shared/lib";
import { type ChangeEvent, forwardRef } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import type { IconType } from "react-icons";

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  half?: boolean;
  disabled?: boolean;
  TextareaClassName?: string;
  labelClassName?: string;
  IconClassName?: string;
  className?: string;
  error?: string;
  maxLength?: number;
  rows?: number;
  Icon?: IconType;
  registerProps?: UseFormRegisterReturn;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  autoFocus?: boolean;
  resize?: "none" | "both" | "horizontal" | "vertical";
}

const CustomTextarea = forwardRef<HTMLTextAreaElement, Props>(
  (
    {
      name,
      label,
      placeholder,
      className,
      TextareaClassName,
      labelClassName,
      IconClassName,
      half,
      maxLength,
      error,
      disabled,
      registerProps,
      Icon,
      rows = 4,
      value,
      onChange,
      autoFocus,
      resize = "none",
    },
    ref,
  ) => {
    return (
      <div
        className={cn(
          "relative flex-1 font-sans",
          half ? "col-span-2 lg:col-span-1" : "col-span-2",
          className,
        )}
      >
        {label && (
          <label
            htmlFor={name}
            className={cn(
              "block text-xs font-medium text-on-surface-muted uppercase tracking-wider mb-1.5",
              labelClassName,
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <Icon
              className={cn(
                "absolute top-4 inset-s-4 text-xl text-on-surface-muted pointer-events-none",
                IconClassName,
              )}
            />
          )}

          <textarea
            id={name}
            name={name}
            placeholder={placeholder}
            maxLength={maxLength}
            disabled={disabled}
            value={value}
            onChange={onChange}
            ref={ref}
            rows={rows}
            autoFocus={autoFocus}
            {...registerProps}
            className={cn(
              "w-full py-3 px-4 border rounded bg-zinc-50 transition-all outline-none text-base text-on-surface placeholder:text-on-surface-muted",
              error
                ? "border-error focus:ring-2 focus:ring-error/20 focus:border-error"
                : "border-border focus:ring-2 focus:ring-border-focus focus:border-border-focus",
              Icon && "ps-11",
              disabled && "opacity-60 cursor-not-allowed",
              resize === "none" && "resize-none",
              resize === "both" && "resize",
              resize === "horizontal" && "resize-x",
              resize === "vertical" && "resize-y",
              TextareaClassName,
            )}
          />
        </div>

        {error && (
          <p className="text-error text-xs font-medium mt-1.5">{error}</p>
        )}
      </div>
    );
  },
);

CustomTextarea.displayName = "CustomTextarea";

export default CustomTextarea;
