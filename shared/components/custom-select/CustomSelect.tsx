"use client";
import { cn } from "@/shared/lib";
import { type ChangeEvent, forwardRef } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import type { IconType } from "react-icons";
import { FaChevronDown } from "react-icons/fa";

interface SelectOption {
  label: string;
  value: string;
}

interface Props {
  name: string;
  options: SelectOption[];
  label?: string;
  placeholder?: string;
  half?: boolean;
  disabled?: boolean;
  SelectClassName?: string;
  labelClassName?: string;
  IconClassName?: string;
  className?: string;
  error?: string;
  Icon?: IconType;
  registerProps?: UseFormRegisterReturn;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const CustomSelect = forwardRef<HTMLSelectElement, Props>(
  (
    {
      name,
      options,
      label,
      placeholder,
      className,
      SelectClassName,
      labelClassName,
      IconClassName,
      half,
      error,
      disabled,
      registerProps,
      Icon,
      value,
      onChange,
    },
    ref,
  ) => {
    return (
      <div
        className={cn(
          "relative font-sans",
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
                "absolute top-1/2 -translate-y-1/2 inset-s-4 text-xl text-on-surface-muted pointer-events-none z-10",
                IconClassName,
              )}
            />
          )}

          <select
            id={name}
            name={name}
            disabled={disabled}
            value={value}
            onChange={onChange}
            ref={ref}
            {...registerProps}
            className={cn(
              "w-full h-12 px-4 pe-10 pt-2.5 border rounded bg-zinc-50 transition-all outline-none text-base text-on-surface cursor-pointer",
              error
                ? "border-error focus:ring-2 focus:ring-error/20 focus:border-error"
                : "border-border focus:ring-2 focus:ring-border-focus focus:border-border-focus",
              Icon && "ps-11",
              disabled && "opacity-60 cursor-not-allowed",
              SelectClassName,
            )}
          >
            {placeholder && (
              <option
                value=""
                className="hover:bg-main! focus:bg-main! py-2 px-2"
              >
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
                className="hover:bg-main! focus:bg-main! py-2 px-2"
              >
                {opt.label}
              </option>
            ))}
          </select>

          <FaChevronDown className="absolute top-1/2 -translate-y-1/2 inset-e-4 text-sm text-on-surface-muted pointer-events-none " />
        </div>

        {error && (
          <p className="text-error text-xs font-medium mt-1.5">{error}</p>
        )}
      </div>
    );
  },
);

CustomSelect.displayName = "CustomSelect";

export default CustomSelect;
