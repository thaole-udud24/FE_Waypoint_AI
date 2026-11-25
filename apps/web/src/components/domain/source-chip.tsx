import { ScrollText } from "lucide-react";
import { useLanguage, pick, type Lang } from "@/lib/i18n";

const sourceDict: Record<string, Partial<Record<Lang, string>>> = {
  "Hợp đồng tr.1": { en: "Contract p.1", ja: "契約書 p.1" },
  "Hợp đồng tr.2": { en: "Contract p.2", ja: "契約書 p.2" },
  "Hợp đồng tr.3": { en: "Contract p.3", ja: "契約書 p.3" },
  "Hợp đồng tr.4": { en: "Contract p.4", ja: "契約書 p.4" },
  "Phiếu lương tr.1": { en: "Payslip p.1", ja: "給与明細 p.1" },
  "Phiếu lương tr.2": { en: "Payslip p.2", ja: "給与明細 p.2" },
  "Giờ làm 20/11/2026": { en: "Work log 20/11/2026", ja: "勤務記録 2026/11/20" },
  "Điều 37 Luật Tiêu chuẩn Lao động": {
    en: "Labor Standards Act Art. 37",
    ja: "労働基準法 第37条",
  },
  "Điều 39 Luật Tiêu chuẩn Lao động": {
    en: "Labor Standards Act Art. 39",
    ja: "労働基準法 第39条",
  },
};

// Chip bấm mở nguồn (tài liệu/điều luật) — hiện tại chỉ hiển thị, chưa nối
// trình xem nguồn thật.
export function SourceChip({ label }: { label: string }) {
  const { lang } = useLanguage();
  const translated = sourceDict[label] ? pick(sourceDict[label], lang, label) : label;

  return (
    <button
      type="button"
      className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-1 text-xs text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-secondary)]"
    >
      <ScrollText className="h-3 w-3" />
      {translated}
    </button>
  );
}
