"use client";

import { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { cn } from "@/shared/lib";
import CustomButton from "../custom-button/custom-button";
import {
  RiArrowDownSLine,
  RiArrowRightLine,
  RiArrowUpSLine,
  RiInboxLine,
} from "react-icons/ri";
import Link from "next/link";

interface CustomTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;

  // Empty State Props
  emptyStateIcon?: React.ReactNode;
  emptyStateTitle?: string;
  emptyStateDescription?: string;
  onClearFilters?: () => void;

  // Server-side Pagination Props
  page?: number;
  limit?: number;
  totalPages?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;

  title?: string;
  href?: string;
}

export default function CustomTable<TData, TValue>({
  columns,
  data,
  isLoading,
  emptyStateIcon = <RiInboxLine className="text-5xl text-zinc-300 mx-auto" />,
  emptyStateTitle = "No data found",
  emptyStateDescription = "Try adjusting your search or filters",
  onClearFilters,
  page = 1,
  limit = 20,
  totalPages = 1,
  totalItems = 0,
  onPageChange,
  href,
  title,
}: CustomTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const currentItemsCount = data?.length ?? 0;
  const start =
    totalItems > 0 ? (page - 1) * limit + 1 : currentItemsCount > 0 ? 1 : 0;
  const end =
    totalItems > 0 ? Math.min(page * limit, totalItems) : currentItemsCount;

  const showPagination =
    !isLoading && onPageChange && (totalPages > 1 || totalItems > limit);

  return (
    // FIX: Added w-full to ensure it respects parent constraints
    <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden font-sans w-full">
      {(title || href) && (
        <div className="flex items-center justify-between px-4 sm:px-5 py-4 border-b border-zinc-100">
          <h2 className="text-base font-bold text-zinc-900">{title}</h2>
          {href && (
            <Link
              href={href}
              className="flex items-center gap-1.5 text-xs font-semibold text-amber-600 hover:text-amber-700 transition-colors cursor-pointer"
            >
              View all
              <RiArrowRightLine />
            </Link>
          )}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-zinc-100">
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  return (
                    <th
                      key={header.id}
                      className="text-left px-4 sm:px-5 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wider whitespace-nowrap"
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          className={cn(
                            "flex items-center gap-1.5",
                            canSort &&
                              "cursor-pointer select-none hover:text-zinc-600 transition-colors",
                          )}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {{
                            asc: <RiArrowUpSLine className="text-sm" />,
                            desc: <RiArrowDownSLine className="text-sm" />,
                          }[header.column.getIsSorted() as string] ??
                            (canSort ? (
                              <RiArrowDownSLine className="text-sm opacity-0 group-hover:opacity-50" />
                            ) : null)}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          <tbody className="divide-y divide-zinc-50">
            {isLoading ? (
              Array.from({ length: limit > 10 ? 6 : limit }).map((_, i) => (
                <tr key={i} className="border-b border-zinc-50">
                  {columns.map((_, j) => (
                    <td key={j} className="px-4 sm:px-5 py-4">
                      <div
                        className={cn(
                          "h-4 rounded bg-zinc-100 animate-pulse",
                          j === 0 ? "w-32" : "w-16",
                        )}
                      />
                    </td>
                  ))}
                </tr>
              ))
            ) : table.getRowModel().rows.length === 0 ? (
              <tr>
                {/* FIX: Added px-4 to prevent empty state text from touching screen edges on mobile */}
                <td colSpan={columns.length} className="py-16 text-center px-4">
                  {emptyStateIcon}
                  <p className="text-zinc-500 font-semibold mt-3">
                    {emptyStateTitle}
                  </p>
                  <p className="text-zinc-400 text-sm mt-1">
                    {emptyStateDescription}
                  </p>
                  {onClearFilters && (
                    <div className="mt-4 flex justify-center">
                      <CustomButton
                        variant="outline"
                        theme="neutral"
                        size="sm"
                        onClick={onClearFilters}
                      >
                        Clear filters
                      </CustomButton>
                    </div>
                  )}
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-zinc-50/60 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 sm:px-5 py-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {showPagination && (
        // FIX 1: `flex-col-reverse` puts buttons ABOVE the text on mobile, `sm:flex-row` side-by-side on tablet
        <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-4 px-4 sm:px-5 py-4 border-t border-zinc-100 select-none">
          <p className="text-xs sm:text-sm text-zinc-500 text-center sm:text-left">
            Showing{" "}
            <span className="font-semibold text-zinc-900">
              {start}–{end}
            </span>{" "}
            {totalItems > 0 ? `of ${totalItems.toLocaleString()}` : ""} items
          </p>

          {/* FIX 2: w-full on mobile, auto on desktop */}
          <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
            <CustomButton
              variant="outline"
              theme="neutral"
              size="sm"
              disabled={page <= 1}
              onClick={() => onPageChange(page - 1)}
              // FIX 3: Buttons stretch to fill available space on mobile
              className="flex-1 sm:flex-none"
            >
              Previous
            </CustomButton>

            <span className="text-xs sm:text-sm text-zinc-500 px-2 min-w-[3rem] text-center font-medium">
              {page} / {totalPages || 1}
            </span>

            <CustomButton
              variant="outline"
              theme="neutral"
              size="sm"
              disabled={page >= (totalPages || 1)}
              onClick={() => onPageChange(page + 1)}
              // FIX 3: Buttons stretch to fill available space on mobile
              className="flex-1 sm:flex-none"
            >
              Next
            </CustomButton>
          </div>
        </div>
      )}
    </div>
  );
}
