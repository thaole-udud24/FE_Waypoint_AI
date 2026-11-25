import { useState } from "react";
import { Modal, ModalContent, ModalTitle, ModalDescription } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { useLanguage, pick } from "@/lib/i18n";

const t = {
  cancel: { vi: "Hủy", en: "Cancel", ja: "キャンセル" },
  confirm: { vi: "Xác nhận", en: "Confirm", ja: "確認" },
  reasonPlaceholder: {
    vi: "Nhập lý do để lưu vào nhật ký…",
    en: "Enter a reason to record in the log…",
    ja: "ログに記録する理由を入力してください…",
  },
};

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  confirmLabel,
  loading,
  requireReason,
  reasonLabel,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  /** When `requireReason` is set, the collected reason is passed as the argument. */
  onConfirm: (reason?: string) => void;
  confirmLabel?: string;
  loading?: boolean;
  /** Shows a required reason field and disables confirm until it's filled. */
  requireReason?: boolean;
  reasonLabel?: string;
}) {
  const { lang } = useLanguage();
  const [reason, setReason] = useState("");

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalTitle>{title}</ModalTitle>
        {description && <ModalDescription>{description}</ModalDescription>}
        {requireReason && (
          <div className="mt-4">
            {reasonLabel && <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">{reasonLabel}</label>}
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder={pick(t.reasonPlaceholder, lang, t.reasonPlaceholder.vi)}
              rows={3}
              className="w-full rounded-[16px] border border-[var(--color-border)] bg-[var(--color-surface-tint)] p-3 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-disabled)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
        )}
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {pick(t.cancel, lang, t.cancel.vi)}
          </Button>
          <Button
            variant="destructive"
            onClick={() => onConfirm(requireReason ? reason : undefined)}
            loading={loading}
            disabled={requireReason && !reason.trim()}
          >
            {confirmLabel ?? pick(t.confirm, lang, t.confirm.vi)}
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
}
