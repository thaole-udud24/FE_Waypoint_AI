import { useState } from "react";
import { X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useLanguage, pick } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { mockEvidence } from "@/features/evidence/data/mock-evidence";

const STEPS = [
  { vi: "Thông tin", en: "Details", ja: "基本情報" },
  { vi: "Chọn bằng chứng", en: "Select evidence", ja: "証拠を選択" },
  { vi: "Xem trước & chia sẻ", en: "Preview & share", ja: "プレビュー・共有" },
];

const t = {
  title: { vi: "Tạo hồ sơ nhờ hỗ trợ", en: "Create Case Pack", ja: "支援ケースを作成" },
  caseTitle: { vi: "Tiêu đề hồ sơ", en: "Case title", ja: "ケースのタイトル" },
  caseTitlePlaceholder: { vi: "VD: Lệch phụ trội làm thêm kỳ 11/2026", en: "e.g. Overtime mismatch — period 11/2026", ja: "例：2026年11月分の割増賃金の不一致" },
  summary: { vi: "Tóm tắt (tiếng Việt)", en: "Summary", ja: "要約" },
  evidenceHint: { vi: "Chọn các mục từ Kho bằng chứng để đính kèm.", en: "Pick items from your Evidence Vault to attach.", ja: "証拠保管庫から添付する項目を選択してください。" },
  previewWillSee: { vi: "Tổ chức sẽ thấy", en: "The organization will see", ja: "組織が閲覧できる内容" },
  recipient: { vi: "Tổ chức nhận", en: "Receiving organization", ja: "受け取り組織" },
  recipientPlaceholder: { vi: "VD: Nghiệp đoàn hỗ trợ ABC", en: "e.g. ABC Support Union", ja: "例：ABC支援組合" },
  expiry: { vi: "Hạn chia sẻ (bắt buộc)", en: "Share expiry (required)", ja: "共有期限（必須）" },
  consent: { vi: "Tôi đồng ý chia sẻ hồ sơ này", en: "I consent to sharing this case", ja: "このケースの共有に同意します" },
  cancel: { vi: "Hủy", en: "Cancel", ja: "キャンセル" },
  next: { vi: "Tiếp tục", en: "Next", ja: "次へ" },
  back: { vi: "Quay lại", en: "Back", ja: "戻る" },
  share: { vi: "Chia sẻ", en: "Share", ja: "共有する" },
};

export function CasePackWizardModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { lang } = useLanguage();
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [selected, setSelected] = useState<string[]>([mockEvidence[0]?.id].filter(Boolean) as string[]);
  const [recipient, setRecipient] = useState("");
  const [expiry, setExpiry] = useState("");
  const [consent, setConsent] = useState(false);

  function reset() {
    setStep(1);
    setTitle("");
    setSummary("");
    setSelected([]);
    setRecipient("");
    setExpiry("");
    setConsent(false);
  }

  function close() {
    reset();
    onOpenChange(false);
  }

  const selectedItems = mockEvidence.filter((e) => selected.includes(e.id));
  const canShare = !!recipient && !!expiry && consent;

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={close}>
      <div
        className="w-full max-w-xl overflow-hidden rounded-[24px] bg-[var(--color-surface)] shadow-[var(--shadow-float,0_14px_36px_rgba(27,23,64,.25))]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-5 py-4">
          <div>
            <p className="text-sm font-semibold text-[var(--color-text-primary)]">{pick(t.title, lang, "Tạo hồ sơ nhờ hỗ trợ")}</p>
            <p className="text-xs text-[var(--color-text-secondary)]">
              {step}/3 · {pick(STEPS[step - 1], lang, STEPS[step - 1].vi)}
            </p>
          </div>
          <button onClick={close} className="rounded-full p-1.5 text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-secondary)]" aria-label="Đóng">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex gap-1.5 px-5 pt-4">
          {STEPS.map((_, i) => (
            <div key={i} className={cn("h-1.5 flex-1 rounded-full", i < step ? "bg-[var(--color-primary)]" : "bg-[var(--color-surface-secondary)]")} />
          ))}
        </div>

        <div className="min-h-[260px] px-5 py-5">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">{pick(t.caseTitle, lang, "Tiêu đề hồ sơ")}</label>
                <Input placeholder={pick(t.caseTitlePlaceholder, lang, t.caseTitlePlaceholder.vi)} value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">{pick(t.summary, lang, "Tóm tắt")}</label>
                <textarea
                  rows={4}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full rounded-[16px] border border-[var(--color-border)] bg-[var(--color-surface-tint)] p-3 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-2.5">
              <p className="text-sm text-[var(--color-text-secondary)]">{pick(t.evidenceHint, lang, t.evidenceHint.vi)}</p>
              {mockEvidence.map((e) => {
                const checked = selected.includes(e.id);
                return (
                  <button
                    key={e.id}
                    onClick={() => setSelected((prev) => (checked ? prev.filter((id) => id !== e.id) : [...prev, e.id]))}
                    className={cn(
                      "flex w-full items-center justify-between rounded-[14px] border px-3 py-2.5 text-left text-sm",
                      checked ? "border-[var(--color-primary)] bg-[var(--color-primary-light)]" : "border-[var(--color-border)]"
                    )}
                  >
                    <span className="text-[var(--color-text-primary)]">{pick(e.title, lang, e.title.vi)}</span>
                    {checked && <Check className="h-4 w-4 text-[var(--color-primary)]" />}
                  </button>
                );
              })}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-disabled)]">{pick(t.previewWillSee, lang, "Tổ chức sẽ thấy")}</p>
                <div className="rounded-[16px] bg-[var(--color-surface-secondary)] p-3 text-sm text-[var(--color-text-primary)]">
                  <p className="font-medium">{title || "—"}</p>
                  <p className="mt-1 text-xs text-[var(--color-text-secondary)]">{summary || "—"}</p>
                  <p className="mt-2 text-xs text-[var(--color-text-disabled)]">
                    {selectedItems.length} {pick({ vi: "bằng chứng đính kèm", en: "evidence items attached", ja: "件の証拠を添付" }, lang, "bằng chứng đính kèm")}
                  </p>
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">{pick(t.recipient, lang, "Tổ chức nhận")}</label>
                <Input placeholder={pick(t.recipientPlaceholder, lang, t.recipientPlaceholder.vi)} value={recipient} onChange={(e) => setRecipient(e.target.value)} />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">{pick(t.expiry, lang, "Hạn chia sẻ (bắt buộc)")}</label>
                <Input type="date" value={expiry} onChange={(e) => setExpiry(e.target.value)} />
              </div>
              <div className="flex items-center justify-between rounded-[14px] border border-dashed border-[var(--color-border)] p-3">
                <span className="text-sm text-[var(--color-text-primary)]">{pick(t.consent, lang, "Tôi đồng ý chia sẻ hồ sơ này")}</span>
                <Switch checked={consent} onCheckedChange={setConsent} />
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-[var(--color-border)] px-5 py-4">
          <Button variant="outline" onClick={() => (step === 1 ? close() : setStep((s) => s - 1))}>
            {step === 1 ? pick(t.cancel, lang, "Hủy") : pick(t.back, lang, "Quay lại")}
          </Button>
          {step < 3 ? (
            <Button onClick={() => setStep((s) => s + 1)} disabled={step === 1 && !title}>
              {pick(t.next, lang, "Tiếp tục")}
            </Button>
          ) : (
            <Button disabled={!canShare} onClick={close}>
              {pick(t.share, lang, "Chia sẻ")}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
