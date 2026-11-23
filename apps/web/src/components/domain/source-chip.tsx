import { ScrollText } from "lucide-react";

// Chip bấm mở nguồn (tài liệu/điều luật) — hiện tại chỉ hiển thị, chưa nối
// trình xem nguồn thật.
export function SourceChip({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-1 text-xs text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-secondary)]"
    >
      <ScrollText className="h-3 w-3" />
      {label}
    </button>
  );
}
