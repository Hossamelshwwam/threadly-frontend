"use client";

interface PayoutAdminNoteProps {
  note?: string;
}

export function PayoutAdminNote({ note }: PayoutAdminNoteProps) {
  if (!note) return null;

  return (
    <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-xs">
      <h3 className="text-sm font-bold text-zinc-900 mb-3">Admin Note</h3>
      <p className="text-sm text-zinc-600 bg-zinc-50 p-4 rounded-lg border border-zinc-100">
        {note}
      </p>
    </div>
  );
}
