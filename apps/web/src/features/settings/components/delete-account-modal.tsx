import { useState } from "react";
import { Modal, ModalContent, ModalTitle, ModalDescription } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage, pick } from "@/lib/i18n";
import { mockCasePacks } from "@/features/case-pack/data/mock-case-packs";

const t = {
  title: { vi: "Xóa tài khoản", en: "Delete account", ja: "アカウントを削除" },
  desc: {
    vi: "Hành động này xóa toàn bộ dữ liệu cá nhân và không thể hoàn tác.",
    en: "This permanently deletes your personal data and cannot be undone.",
    ja: "この操作は個人データを完全に削除し、元に戻せません。",
  },
  activeShareWarning: {
    vi: "Bạn đang có Case Pack chia sẻ với tổ chức — việc chia sẻ sẽ bị thu hồi ngay khi xóa tài khoản.",
    en: "You have a Case Pack shared with an organization — the share will be revoked immediately once the account is deleted.",
    ja: "組織と共有中のCase Packがあります。アカウント削除と同時に共有は即時取り消されます。",
  },
  passwordLabel: { vi: "Nhập mật khẩu để xác nhận", en: "Enter your password to confirm", ja: "確認のためパスワードを入力してください" },
  cancel: { vi: "Hủy", en: "Cancel", ja: "キャンセル" },
  confirm: { vi: "Xóa vĩnh viễn", en: "Delete permanently", ja: "完全に削除する" },
};

// FUN_012: BR_035 xóa tài khoản thu hồi mọi chia sẻ; BR_019 thu hồi có hiệu
// lực ngay. Yêu cầu xác nhận mật khẩu trước khi xóa.
export function DeleteAccountModal({
  open,
  onOpenChange,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}) {
  const { lang } = useLanguage();
  const [password, setPassword] = useState("");
  const hasActiveShare = mockCasePacks.some((c) => c.status === "shared");

  function close() {
    setPassword("");
    onOpenChange(false);
  }

  return (
    <Modal open={open} onOpenChange={(next) => (next ? onOpenChange(next) : close())}>
      <ModalContent>
        <ModalTitle>{pick(t.title, lang, "Xóa tài khoản")}</ModalTitle>
        <ModalDescription>{pick(t.desc, lang, t.desc.vi)}</ModalDescription>

        {hasActiveShare && (
          <p className="mt-3 rounded-[16px] bg-[var(--color-attention-light)] p-3 text-xs text-[var(--color-attention-text)]">
            {pick(t.activeShareWarning, lang, t.activeShareWarning.vi)}
          </p>
        )}

        <div className="mt-4">
          <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">
            {pick(t.passwordLabel, lang, "Nhập mật khẩu để xác nhận")}
          </label>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={close}>
            {pick(t.cancel, lang, "Hủy")}
          </Button>
          <Button variant="destructive" disabled={password.length < 6} onClick={onConfirm}>
            {pick(t.confirm, lang, "Xóa vĩnh viễn")}
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
}
