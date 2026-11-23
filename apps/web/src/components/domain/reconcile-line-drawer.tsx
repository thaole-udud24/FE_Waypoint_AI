import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SourceChip } from "@/components/domain/source-chip";
import { useLanguage, pick } from "@/lib/i18n";
import type { ReconcileLine } from "@/features/payguard/data/mock-payguard";

const t = {
  formula: { vi: "Công thức đã thay số", en: "Formula with values", ja: "数値を代入した計算式" },
  legalBasis: { vi: "Căn cứ luật", en: "Legal basis", ja: "法的根拠" },
  effectiveFrom: { vi: "Hiệu lực từ", en: "Effective from", ja: "施行日" },
  explanation: { vi: "Giải thích", en: "Explanation", ja: "説明" },
  addToEvidence: { vi: "Đưa vào Kho bằng chứng", en: "Add to Evidence Vault", ja: "証拠として保管" },
  footer: {
    vi: "Số liệu do bộ tính cố định tạo ra, không do AI tính.",
    en: "Figures are produced by a fixed calculator, not computed by AI.",
    ja: "数値は固定の計算ロジックによるもので、AIが計算したものではありません。",
  },
};

export function ReconcileLineDrawer({ line, onClose }: { line: ReconcileLine | null; onClose: () => void }) {
  const { lang } = useLanguage();
  if (!line) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40" onClick={onClose}>
      <div
        className="flex h-full w-full max-w-md flex-col overflow-y-auto bg-[var(--color-surface)] shadow-[var(--shadow-float,0_14px_36px_rgba(27,23,64,.25))]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-5 py-4">
          <p className="text-sm font-semibold text-[var(--color-text-primary)]">{line.label}</p>
          <button onClick={onClose} className="rounded-full p-1.5 text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-secondary)]" aria-label="Đóng">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 space-y-5 p-5">
          {line.formula && (
            <div>
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-disabled)]">{pick(t.formula, lang, "Công thức đã thay số")}</p>
              <p className="rounded-[14px] bg-[var(--color-surface-secondary)] p-3 font-mono text-sm text-[var(--color-text-primary)]">{line.formula}</p>
            </div>
          )}

          {line.legalBasis && (
            <div>
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-disabled)]">{pick(t.legalBasis, lang, "Căn cứ luật")}</p>
              <div className="rounded-[14px] border border-[var(--color-border)] p-3">
                <p className="text-sm font-medium text-[var(--color-text-primary)]">{line.legalBasis.rule}</p>
                <p className="text-xs text-[var(--color-text-secondary)]">{line.legalBasis.article}</p>
                <p className="mt-1 text-xs text-[var(--color-text-disabled)]">
                  {pick(t.effectiveFrom, lang, "Hiệu lực từ")} {line.legalBasis.effectiveFrom}
                </p>
              </div>
            </div>
          )}

          {line.reason && (
            <div>
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-disabled)]">{pick(t.explanation, lang, "Giải thích")}</p>
              <p className="text-sm text-[var(--color-text-primary)]">{line.reason}</p>
            </div>
          )}

          {line.sources && line.sources.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {line.sources.map((s) => (
                <SourceChip key={s} label={s} />
              ))}
            </div>
          )}

          <Button variant="outline" className="w-full">
            {pick(t.addToEvidence, lang, "Đưa vào Kho bằng chứng")}
          </Button>
        </div>

        <div className="border-t border-[var(--color-border)] px-5 py-3 text-[11px] text-[var(--color-text-disabled)]">
          {pick(t.footer, lang, t.footer.vi)}
        </div>
      </div>
    </div>
  );
}
