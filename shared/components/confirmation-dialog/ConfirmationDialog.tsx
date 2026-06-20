"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/shared/components/ui/dialog";
import CustomButton from "@/shared/components/custom-button/custom-button";
import { cn } from "@/shared/lib/index";
import { PiCheckCircleBold, PiInfoBold, PiQuestionBold } from "react-icons/pi";
import { CiWarning } from "react-icons/ci";
import { CgDanger } from "react-icons/cg";

// ─── Types ─────────────────────────────────────────────────────────────────────

type Variant = "default" | "danger" | "warning" | "info" | "success";

interface ConfirmationDialogProps {
  children: React.ReactNode;
  onConfirm: () => void;
  onCancel?: () => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  loadingText?: string;
  requireCheckbox?: boolean;
  checkboxLabel?: string;
  variant?: Variant;
  autoClose?: boolean;
}

// ─── Variant config — Threadly tokens only ─────────────────────────────────────

const VARIANTS: Record<
  Variant,
  {
    accentLine: string; // gradient color stop
    iconBg: string; // icon wrapper bg + border
    iconColor: string; // icon color
    titleColor: string;
    checkboxBg: string;
    confirmTheme: "primary" | "neutral" | "danger" | "warning" | "success"; // maps to CustomButton theme
  }
> = {
  default: {
    accentLine: "#d99a4a",
    iconBg: "bg-amber-50 border-amber-200",
    iconColor: "text-amber-500",
    titleColor: "text-zinc-900",
    checkboxBg: "bg-zinc-50 border-zinc-200",
    confirmTheme: "primary",
  },
  danger: {
    accentLine: "#b03a2e",
    iconBg: "bg-red-50 border-red-200",
    iconColor: "text-red-500",
    titleColor: "text-red-700",
    checkboxBg: "bg-red-50 border-red-200",
    confirmTheme: "danger",
  },
  warning: {
    accentLine: "#c47f2e",
    iconBg: "bg-amber-50 border-amber-200",
    iconColor: "text-amber-500",
    titleColor: "text-amber-700",
    checkboxBg: "bg-amber-50 border-amber-200",
    confirmTheme: "warning",
  },
  info: {
    accentLine: "#3f3f46",
    iconBg: "bg-zinc-100 border-zinc-300",
    iconColor: "text-zinc-600",
    titleColor: "text-zinc-800",
    checkboxBg: "bg-zinc-50 border-zinc-200",
    confirmTheme: "neutral",
  },
  success: {
    accentLine: "#3d7a5e",
    iconBg: "bg-green-50 border-green-200",
    iconColor: "text-green-600",
    titleColor: "text-green-800",
    checkboxBg: "bg-green-50 border-green-200",
    confirmTheme: "success",
  },
};

// ─── Icon map ──────────────────────────────────────────────────────────────────

function VariantIcon({
  variant,
  className,
}: {
  variant: Variant;
  className?: string;
}) {
  const cls = cn("text-[22px]", className);
  switch (variant) {
    case "danger":
      return <CgDanger className={cls} />;
    case "warning":
      return <CiWarning className={cls} />;
    case "success":
      return <PiCheckCircleBold className={cls} />;
    case "info":
      return <PiInfoBold className={cls} />;
    default:
      return <PiQuestionBold className={cls} />;
  }
}

// ─── Component ─────────────────────────────────────────────────────────────────

export function ConfirmationDialog({
  children,
  onConfirm,
  onCancel,
  title = "Confirm Action",
  description = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  isLoading = false,
  loadingText = "Processing...",
  requireCheckbox = false,
  checkboxLabel = "I understand the consequences",
  variant = "default",
  autoClose = true,
}: ConfirmationDialogProps) {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  const cfg = VARIANTS[variant];
  const isConfirmDisabled = isLoading || (requireCheckbox && !checked);

  const handleConfirm = () => {
    if (requireCheckbox && !checked) return;
    onConfirm();
    if (autoClose) {
      setOpen(false);
      setChecked(false);
    }
  };

  const handleCancel = () => {
    onCancel?.();
    setOpen(false);
    setChecked(false);
  };

  return (
    <>
      {/* Trigger */}
      <span onClick={() => setOpen(true)} className="contents">
        {children}
      </span>

      <Dialog
        open={open}
        onOpenChange={(v) => {
          if (!v) handleCancel();
        }}
      >
        <DialogContent className="sm:max-w-100 p-0 overflow-hidden font-sans gap-0">
          {/* Accent line */}
          <div
            className="h-0.5 w-full shrink-0"
            style={{
              background: `linear-gradient(to right, transparent, ${cfg.accentLine}, transparent)`,
            }}
          />

          <div className="px-6 pt-6 pb-6 space-y-5">
            <DialogHeader className="p-0 space-y-0">
              {/* Icon + title centered */}
              <div className="flex flex-col items-center gap-3 text-center">
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl border flex items-center justify-center",
                    cfg.iconBg,
                  )}
                >
                  <VariantIcon variant={variant} className={cfg.iconColor} />
                </div>

                <DialogTitle
                  className={cn("text-lg font-bold", cfg.titleColor)}
                >
                  {title}
                </DialogTitle>

                <DialogDescription className="text-sm text-zinc-500 font-normal leading-relaxed max-w-75 mx-auto">
                  {description}
                </DialogDescription>
              </div>
            </DialogHeader>

            {/* Optional checkbox */}
            {requireCheckbox && (
              <div
                className={cn(
                  "flex items-start gap-3 p-3.5 rounded-lg border",
                  cfg.checkboxBg,
                )}
              >
                <input
                  type="checkbox"
                  id="confirm-check"
                  checked={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-zinc-300 accent-amber-500 cursor-pointer"
                />
                <label
                  htmlFor="confirm-check"
                  className="text-sm text-zinc-500 leading-relaxed cursor-pointer select-none"
                >
                  {checkboxLabel}
                </label>
              </div>
            )}

            {/* Footer buttons */}
            <DialogFooter className="p-0 flex gap-3 sm:gap-3">
              <CustomButton
                variant="outline"
                theme="neutral"
                size="lg"
                className="flex-1"
                onClick={handleCancel}
                disabled={isLoading}
              >
                {cancelText}
              </CustomButton>

              <CustomButton
                variant="solid"
                theme={cfg.confirmTheme}
                size="lg"
                className="flex-1"
                onClick={handleConfirm}
                disabled={isConfirmDisabled}
                loading={isLoading}
              >
                {isLoading ? loadingText : confirmText}
              </CustomButton>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
