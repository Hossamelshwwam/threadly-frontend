"use client";

import { useEffect, useRef } from "react";
import {
  FilterSidebar,
  type FiltersState,
} from "../../../domains/storefront/components/filters/FilterSidebar";

interface MobileFilterSheetProps {
  open: boolean;
  onClose: () => void;
  filters: FiltersState;
  onFilterChange: (key: string, value: string | undefined) => void;
  onApply: () => void;
  onReset: () => void;
  appliedFilterCount: number;
}

const FOCUSABLE =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function MobileFilterSheet({
  open,
  onClose,
  filters,
  onFilterChange,
  onApply,
  onReset,
  appliedFilterCount,
}: MobileFilterSheetProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      const panel = panelRef.current;
      if (panel) {
        const first = panel.querySelector<HTMLElement>(FOCUSABLE);
        first?.focus();
      }
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleKey = (e: KeyboardEvent) => {
      const panel = panelRef.current;
      if (!panel) return;

      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab") {
        const focusables = panel.querySelectorAll<HTMLElement>(FOCUSABLE);
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last?.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first?.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  const handleApply = () => {
    onApply();
    onClose();
  };

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-zinc-900/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Filters"
        className={`fixed top-0 right-0 bottom-0 w-[300px] bg-zinc-50 z-50 shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full overflow-y-auto p-4">
          <FilterSidebar
            filters={filters}
            onFilterChange={onFilterChange}
            onApply={handleApply}
            onReset={() => {
              onReset();
              onClose();
            }}
            appliedFilterCount={appliedFilterCount}
            onClose={onClose}
          />
        </div>
      </div>
    </>
  );
}
