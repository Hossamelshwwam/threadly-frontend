"use client";
import { cn } from "@/shared/lib";
import { type ChangeEvent, useState, forwardRef } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import type { IconType } from "react-icons";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface Props {
  name: string;
  type: string;
  label?: string;
  placeholder?: string;
  half?: boolean;
  disabled?: boolean;
  InputClassName?: string;
  labalClassName?: string;
  IconClassName?: string;
  className?: string;
  error?: string;
  min?: number;
  max?: number;
  Icon?: IconType;
  registerProps?: UseFormRegisterReturn;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
}

const CustomInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      name,
      label,
      type,
      placeholder,
      className,
      InputClassName,
      labalClassName,
      IconClassName,
      half,
      max,
      error,
      disabled,
      registerProps,
      Icon,
      value,
      onChange,
      autoFocus,
    },
    ref,
  ) => {
    const [show, setShow] = useState(false);

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
              labalClassName,
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <Icon
              className={cn(
                "absolute top-1/2 -translate-y-1/2 inset-s-4 text-xl text-on-surface-muted pointer-events-none",
                IconClassName,
              )}
            />
          )}

          <input
            id={name}
            name={name}
            type={type === "password" && show ? "text" : type}
            placeholder={placeholder}
            maxLength={max}
            disabled={disabled}
            value={value}
            onChange={onChange}
            ref={ref}
            autoFocus={autoFocus}
            {...registerProps}
            className={cn(
              "w-full h-12 px-4 border rounded bg-surface-mid transition-all outline-none text-base text-on-surface placeholder:text-on-surface-muted",
              error
                ? "border-error focus:ring-2 focus:ring-error/20 focus:border-error"
                : "border-border focus:ring-2 focus:ring-border-focus focus:border-border-focus",
              Icon && "ps-11",
              type === "password" && "pe-11",
              disabled && "opacity-60 cursor-not-allowed",
              InputClassName,
            )}
          />

          {type === "password" && (
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute top-1/2 -translate-y-1/2 inset-e-4 text-xl text-on-surface-muted hover:text-on-surface transition-colors focus:outline-none"
              aria-label={show ? "Hide password" : "Show password"}
            >
              {show ? <FaEyeSlash /> : <FaEye />}
            </button>
          )}
        </div>

        {error && (
          <p className="text-error text-xs font-medium mt-1.5">{error}</p>
        )}
      </div>
    );
  },
);

CustomInput.displayName = "CustomInput";

export default CustomInput;
