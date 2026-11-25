import { useLanguage, pick } from "@/lib/i18n";

// Chỉ 3 nhãn luật theo BR_009 — không tự thêm nhãn khác, không dùng từ
// "vi phạm"/"bất hợp pháp".
export type LawLabelValue = "compliant" | "ask_again" | "no_rule";

const config: Record<LawLabelValue, { label: { vi: string; en: string; ja: string }; className: string }> = {
  compliant: { label: { vi: "Phù hợp", en: "Compliant", ja: "適合" }, className: "bg-[var(--card-mint)] text-[var(--color-teal-text)]" },
  ask_again: { label: { vi: "Nên hỏi lại", en: "Worth asking", ja: "要確認" }, className: "bg-[var(--card-butter)] text-[var(--color-gold-text)]" },
  no_rule: {
    label: { vi: "Chưa có quy tắc", en: "No rule yet", ja: "規定なし" },
    className: "bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)]",
  },
};

export function LawLabel({ value }: { value: LawLabelValue }) {
  const { lang } = useLanguage();
  const { label, className } = config[value];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${className}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {pick(label, lang, label.vi)}
    </span>
  );
}
