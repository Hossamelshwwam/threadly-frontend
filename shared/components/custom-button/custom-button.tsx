import React from "react";
import { FaSpinner } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

type ButtonVariant = "solid" | "outline" | "ghost" | "soft" | "link";

type ButtonTheme = "primary" | "neutral" | "success" | "warning" | "danger";

type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  theme?: ButtonTheme;
  size?: ButtonSize;

  loading?: boolean;

  pill?: boolean;
  fullWidth?: boolean;

  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;

  iconOnly?: boolean;
}

const baseStyles =
  "relative cursor-pointer inline-flex items-center justify-center gap-2 font-sans font-semibold transition-all duration-200 outline-none whitespace-nowrap select-none";

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-12 px-6 text-sm",
  lg: "h-14 px-8 text-base",
};

const iconOnlySizes: Record<ButtonSize, string> = {
  sm: "size-9",
  md: "size-12",
  lg: "size-14",
};

const themeStyles: Record<ButtonVariant, Record<ButtonTheme, string>> = {
  solid: {
    primary:
      "bg-main text-on-main border-transparent shadow-main hover:bg-amber-500 focus:ring-border-focus",

    neutral:
      "bg-zinc-900 text-white border-transparent shadow-sm hover:bg-zinc-800 focus:ring-zinc-900",

    success:
      "bg-success text-white border-transparent hover:opacity-90 focus:ring-success",

    warning:
      "bg-warning text-white border-transparent hover:opacity-90 focus:ring-warning",

    danger:
      "bg-error text-white border-transparent hover:opacity-90 focus:ring-error",
  },

  soft: {
    primary:
      "bg-amber-100 text-amber-900 border-transparent hover:bg-amber-200 focus:ring-border-focus",

    neutral:
      "bg-surface-mid text-on-surface border-transparent hover:bg-surface-high focus:ring-border-strong",

    success:
      "bg-success-bg text-success border-transparent hover:opacity-90 focus:ring-success",

    warning:
      "bg-warning-bg text-warning border-transparent hover:opacity-90 focus:ring-warning",

    danger:
      "bg-error-bg text-error border-transparent hover:opacity-90 focus:ring-error",
  },

  outline: {
    primary:
      "bg-transparent text-main border-main hover:bg-amber-50 focus:ring-border-focus",

    neutral:
      "bg-transparent text-on-surface border-border hover:bg-surface-low focus:ring-border-strong",

    success:
      "bg-transparent text-success border-success hover:bg-success-bg focus:ring-success",

    warning:
      "bg-transparent text-warning border-warning hover:bg-warning-bg focus:ring-warning",

    danger:
      "bg-transparent text-error border-error hover:bg-error-bg focus:ring-error",
  },

  ghost: {
    primary:
      "bg-transparent text-main border-transparent hover:bg-amber-50 focus:ring-border-focus",

    neutral:
      "bg-transparent text-on-surface border-transparent hover:bg-surface-low focus:ring-border-strong",

    success:
      "bg-transparent text-success border-transparent hover:bg-success-bg focus:ring-success",

    warning:
      "bg-transparent text-warning border-transparent hover:bg-warning-bg focus:ring-warning",

    danger:
      "bg-transparent text-error border-transparent hover:bg-error-bg focus:ring-error",
  },

  link: {
    primary:
      "bg-transparent border-transparent text-main hover:underline shadow-none",

    neutral:
      "bg-transparent border-transparent text-on-surface hover:underline shadow-none",

    success:
      "bg-transparent border-transparent text-success hover:underline shadow-none",

    warning:
      "bg-transparent border-transparent text-warning hover:underline shadow-none",

    danger:
      "bg-transparent border-transparent text-error hover:underline shadow-none",
  },
};

const CustomButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "solid",
      theme = "primary",
      size = "md",

      loading = false,

      pill = false,
      fullWidth = false,

      leftIcon,
      rightIcon,

      iconOnly = false,

      className,
      children,
      disabled,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={twMerge(
          baseStyles,

          "border",

          "focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface",

          "active:scale-[0.98]",

          pill ? "rounded-full" : "rounded-md",

          fullWidth && "w-full",

          iconOnly ? iconOnlySizes[size] : sizeStyles[size],

          themeStyles[variant][theme],

          "disabled:pointer-events-none disabled:opacity-60 disabled:shadow-none disabled:active:scale-100",

          className,
        )}
        {...props}
      >
        {loading && <FaSpinner className="animate-spin shrink-0" size={16} />}

        {!loading && leftIcon && <span className="shrink-0">{leftIcon}</span>}

        {!iconOnly && <span className="truncate">{children}</span>}

        {!loading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  },
);

CustomButton.displayName = "CustomButton";

export default CustomButton;
