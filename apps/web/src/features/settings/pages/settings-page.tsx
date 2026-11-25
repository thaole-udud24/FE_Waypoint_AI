import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { appToast } from "@/components/ui/toast";
import { PageHeader } from "@/components/domain/page-header";
import { ConsentToggle } from "@/components/domain/consent-toggle";
import { useLanguage, pick } from "@/lib/i18n";
import { useAuthStore } from "@/stores/auth-store";
import { useDiscreetStore } from "@/stores/discreet-store";
import { useConsentStore, type ConsentPurpose } from "@/stores/consent-store";
import { DeleteAccountModal } from "../components/delete-account-modal";

const t = {
  tabProfile: { vi: "Hồ sơ", en: "Profile", ja: "プロフィール" },
  tabNotifications: { vi: "Thông báo", en: "Notifications", ja: "通知" },
  tabSecurity: { vi: "Bảo mật", en: "Security", ja: "セキュリティ" },
  changeAvatar: { vi: "Đổi ảnh đại diện", en: "Change avatar", ja: "アイコンを変更" },
  fullName: { vi: "Họ và tên", en: "Full name", ja: "氏名" },
  email: { vi: "Email", en: "Email", ja: "メールアドレス" },
  saveChanges: { vi: "Lưu thay đổi", en: "Save changes", ja: "変更を保存" },
  emailNotif: { vi: "Thông báo qua email", en: "Email notifications", ja: "メール通知" },
  emailNotifDesc: { vi: "Nhận email khi có cập nhật quan trọng.", en: "Receive an email for important updates.", ja: "重要な更新があった際にメールを受け取ります。" },
  mismatchAlert: { vi: "Cảnh báo lệch lương", en: "Pay mismatch alerts", ja: "給与不一致の通知" },
  mismatchAlertDesc: { vi: "Báo ngay khi PayGuard AI phát hiện khoản lệch.", en: "Get notified as soon as PayGuard AI detects a mismatch.", ja: "PayGuard AIが不一致を検出した際、すぐに通知します。" },
  currentPassword: { vi: "Mật khẩu hiện tại", en: "Current password", ja: "現在のパスワード" },
  newPassword: { vi: "Mật khẩu mới", en: "New password", ja: "新しいパスワード" },
  changePassword: { vi: "Đổi mật khẩu", en: "Change password", ja: "パスワードを変更" },
  discreetMode: { vi: "Chế độ kín đáo", en: "Discreet mode", ja: "控えめモード" },
  discreetModeDesc: {
    vi: "Đổi tên, logo, tiêu đề tab và nội dung thông báo sang trung tính khi dùng ở nơi không an toàn.",
    en: "Switches the name, logo, tab title and notification content to neutral wording when in an unsafe place.",
    ja: "安全でない場所で使う際、名前・ロゴ・タブタイトル・通知内容を中立的な表現に切り替えます。",
  },
  tabPrivacy: { vi: "Quyền riêng tư & dữ liệu", en: "Privacy & data", ja: "プライバシー・データ" },
  consentSectionTitle: { vi: "Đồng ý theo mục đích", en: "Consent by purpose", ja: "目的別の同意" },
  consentSectionDesc: {
    vi: "Mỗi mục đích có đồng ý riêng, mặc định tắt. Bạn có thể rút lại bất cứ lúc nào.",
    en: "Each purpose has its own consent, off by default. You can withdraw it at any time.",
    ja: "目的ごとに個別の同意が必要で、初期設定はオフです。いつでも撤回できます。",
  },
  consentCaseShare: { vi: "Chia sẻ Case Pack", en: "Case Pack sharing", ja: "Case Packの共有" },
  consentCaseShareDesc: {
    vi: "Cho phép tóm tắt hồ sơ và bằng chứng đã chọn rời thiết bị để gửi tới tổ chức hỗ trợ.",
    en: "Allows the selected case summary and evidence to leave your device to reach a support organization.",
    ja: "選択したケースの要約と証拠が端末を離れ、支援組織へ送られることを許可します。",
  },
  consentExternalLlm: { vi: "Dùng LLM bên ngoài", en: "Use an external LLM", ja: "外部LLMの利用" },
  consentExternalLlmDesc: {
    vi: "Cho phép gửi câu hỏi và nội dung liên quan tới dịch vụ AI bên ngoài để có câu trả lời chi tiết hơn.",
    en: "Allows sending your question and related content to an external AI service for a more detailed answer.",
    ja: "より詳しい回答のため、質問と関連内容を外部AIサービスに送信することを許可します。",
  },
  consentAnon: { vi: "Đóng góp dữ liệu ẩn danh", en: "Anonymous data contribution", ja: "匿名データの提供" },
  consentAnonDesc: {
    vi: "Cho phép dữ liệu đã ẩn danh hóa được dùng để cải thiện Law Pack chung.",
    en: "Allows anonymized data to be used to improve the shared Law Pack.",
    ja: "匿名化されたデータを共通のLaw Pack改善のために利用することを許可します。",
  },
  consentSync: { vi: "Đồng bộ mã hóa nhiều thiết bị", en: "Encrypted multi-device sync", ja: "暗号化された複数端末間の同期" },
  consentSyncDesc: {
    vi: "Cho phép dữ liệu đã mã hóa rời thiết bị để đồng bộ sang thiết bị khác của bạn.",
    en: "Allows your encrypted data to leave this device to sync to your other devices.",
    ja: "暗号化されたデータが端末を離れ、あなたの別の端末と同期することを許可します。",
  },
  exportTitle: { vi: "Xuất dữ liệu cá nhân", en: "Export personal data", ja: "個人データの書き出し" },
  exportDesc: {
    vi: "Tải một bản sao toàn bộ dữ liệu của bạn (tài liệu, giờ làm, bằng chứng...).",
    en: "Download a copy of all your data (documents, work logs, evidence...).",
    ja: "あなたのすべてのデータ（書類・勤務記録・証拠など）のコピーをダウンロードします。",
  },
  exportButton: { vi: "Yêu cầu xuất dữ liệu", en: "Request export", ja: "データ書き出しを依頼" },
  exportSent: {
    vi: "Đã gửi liên kết tải xuống tới email của bạn (có hiệu lực 24 giờ).",
    en: "A download link has been sent to your email (valid for 24 hours).",
    ja: "ダウンロードリンクをメールで送信しました（有効期限24時間）。",
  },
  wipeTitle: { vi: "Xóa nhanh dữ liệu trên thiết bị", en: "Quick-wipe device data", ja: "端末データの緊急消去" },
  wipeDesc: {
    vi: "Khi bật, bạn có thể xóa ngay dữ liệu cục bộ trên thiết bị này trong tình huống khẩn.",
    en: "When enabled, you can immediately wipe this device's local data in an emergency.",
    ja: "有効にすると、緊急時にこの端末のローカルデータを即座に消去できます。",
  },
  wipeNow: { vi: "Xóa ngay", en: "Wipe now", ja: "今すぐ消去" },
  wipeConfirmTitle: { vi: "Xóa dữ liệu cục bộ trên thiết bị này?", en: "Wipe this device's local data?", ja: "この端末のローカルデータを消去しますか？" },
  wipeConfirmDesc: {
    vi: "Bạn sẽ bị đăng xuất và các tùy chọn riêng tư trên thiết bị này sẽ được đặt lại.",
    en: "You will be logged out and this device's privacy preferences will be reset.",
    ja: "ログアウトされ、この端末のプライバシー設定はリセットされます。",
  },
  dangerZone: { vi: "Vùng nguy hiểm", en: "Danger zone", ja: "危険な操作" },
  deleteAccountTitle: { vi: "Xóa tài khoản", en: "Delete account", ja: "アカウントを削除" },
  deleteAccountDesc: {
    vi: "Xóa vĩnh viễn tài khoản và toàn bộ dữ liệu cá nhân. Không thể hoàn tác.",
    en: "Permanently deletes your account and all personal data. This cannot be undone.",
    ja: "アカウントと個人データを完全に削除します。元に戻せません。",
  },
  deleteAccountButton: { vi: "Xóa tài khoản", en: "Delete account", ja: "アカウントを削除" },
  accountDeleted: { vi: "Đã xóa tài khoản.", en: "Account deleted.", ja: "アカウントを削除しました。" },
  deviceWiped: { vi: "Đã xóa dữ liệu cục bộ trên thiết bị này.", en: "This device's local data has been wiped.", ja: "この端末のローカルデータを消去しました。" },
};

const CONSENT_COPY: Record<ConsentPurpose, { title: typeof t.consentCaseShare; desc: typeof t.consentCaseShareDesc }> = {
  CASE_SHARE: { title: t.consentCaseShare, desc: t.consentCaseShareDesc },
  EXTERNAL_LLM: { title: t.consentExternalLlm, desc: t.consentExternalLlmDesc },
  ANON_CONTRIBUTION: { title: t.consentAnon, desc: t.consentAnonDesc },
  SYNC: { title: t.consentSync, desc: t.consentSyncDesc },
};

export function SettingsPage() {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const { discreet, toggle: setDiscreet } = useDiscreetStore();
  const { consents, setConsent } = useConsentStore();
  const [name, setName] = useState(user?.name ?? "");
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifyMismatch, setNotifyMismatch] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [wipeEnabled, setWipeEnabled] = useState(false);
  const [wipeConfirmOpen, setWipeConfirmOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  // FUN_013: shortcut: không có backend thật, mô phỏng đóng gói + gửi email.
  async function handleExport() {
    setExporting(true);
    await new Promise((r) => setTimeout(r, 900));
    setExporting(false);
    appToast.success(pick(t.exportSent, lang, t.exportSent.vi));
  }

  // FUN_009: xác nhận kép — phải bật công tắc rồi mới bấm "Xóa ngay", sau đó
  // còn phải xác nhận trong hộp thoại.
  function handleWipeConfirmed() {
    setWipeConfirmOpen(false);
    logout();
    navigate("/login");
    appToast.success(pick(t.deviceWiped, lang, t.deviceWiped.vi));
  }

  // FUN_012 / BR_035, BR_019: xóa tài khoản thu hồi mọi chia sẻ ngay lập tức.
  function handleAccountDeleted() {
    setDeleteOpen(false);
    logout();
    navigate("/login");
    appToast.success(pick(t.accountDeleted, lang, t.accountDeleted.vi));
  }

  return (
    <div className="space-y-5">
      <PageHeader title="Tài khoản" kanji="設定" subtitle="Quản lý thông tin cá nhân và tùy chọn thông báo." />

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">{pick(t.tabProfile, lang, "Hồ sơ")}</TabsTrigger>
          <TabsTrigger value="notifications">{pick(t.tabNotifications, lang, "Thông báo")}</TabsTrigger>
          <TabsTrigger value="security">{pick(t.tabSecurity, lang, "Bảo mật")}</TabsTrigger>
          <TabsTrigger value="privacy">{pick(t.tabPrivacy, lang, t.tabPrivacy.vi)}</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardContent className="max-w-md space-y-4 pt-6">
              <div className="flex items-center gap-3">
                <Avatar fallback={(name || "B").slice(0, 2).toUpperCase()} className="h-14 w-14" />
                <Button variant="outline" size="sm">
                  {pick(t.changeAvatar, lang, "Đổi ảnh đại diện")}
                </Button>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">{pick(t.fullName, lang, "Họ và tên")}</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">{pick(t.email, lang, "Email")}</label>
                <Input value={user?.email ?? ""} disabled />
              </div>
              <Button>{pick(t.saveChanges, lang, "Lưu thay đổi")}</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardContent className="max-w-md space-y-4 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[var(--color-text-primary)]">{pick(t.emailNotif, lang, "Thông báo qua email")}</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">{pick(t.emailNotifDesc, lang, t.emailNotifDesc.vi)}</p>
                </div>
                <Switch checked={notifyEmail} onCheckedChange={setNotifyEmail} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[var(--color-text-primary)]">{pick(t.mismatchAlert, lang, "Cảnh báo lệch lương")}</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">{pick(t.mismatchAlertDesc, lang, t.mismatchAlertDesc.vi)}</p>
                </div>
                <Switch checked={notifyMismatch} onCheckedChange={setNotifyMismatch} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardContent className="max-w-md space-y-4 pt-6">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">{pick(t.currentPassword, lang, "Mật khẩu hiện tại")}</label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">{pick(t.newPassword, lang, "Mật khẩu mới")}</label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <Button>{pick(t.changePassword, lang, "Đổi mật khẩu")}</Button>

              <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-4">
                <div>
                  <p className="text-sm font-medium text-[var(--color-text-primary)]">{pick(t.discreetMode, lang, "Chế độ kín đáo")}</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">{pick(t.discreetModeDesc, lang, t.discreetModeDesc.vi)}</p>
                </div>
                <Switch checked={discreet} onCheckedChange={setDiscreet} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy">
          <div className="max-w-md space-y-5">
            <Card>
              <CardContent className="space-y-3 pt-6">
                <div>
                  <p className="text-sm font-medium text-[var(--color-text-primary)]">{pick(t.consentSectionTitle, lang, t.consentSectionTitle.vi)}</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">{pick(t.consentSectionDesc, lang, t.consentSectionDesc.vi)}</p>
                </div>
                {(Object.keys(CONSENT_COPY) as ConsentPurpose[]).map((purpose) => (
                  <ConsentToggle
                    key={purpose}
                    title={CONSENT_COPY[purpose].title}
                    description={CONSENT_COPY[purpose].desc}
                    granted={consents[purpose].granted}
                    onChange={(next) => setConsent(purpose, next)}
                  />
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="space-y-3 pt-6">
                <div>
                  <p className="text-sm font-medium text-[var(--color-text-primary)]">{pick(t.exportTitle, lang, t.exportTitle.vi)}</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">{pick(t.exportDesc, lang, t.exportDesc.vi)}</p>
                </div>
                <Button variant="outline" loading={exporting} onClick={handleExport}>
                  {pick(t.exportButton, lang, t.exportButton.vi)}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="space-y-3 pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[var(--color-text-primary)]">{pick(t.wipeTitle, lang, t.wipeTitle.vi)}</p>
                    <p className="text-xs text-[var(--color-text-secondary)]">{pick(t.wipeDesc, lang, t.wipeDesc.vi)}</p>
                  </div>
                  <Switch checked={wipeEnabled} onCheckedChange={setWipeEnabled} />
                </div>
                {wipeEnabled && (
                  <Button variant="destructive" size="sm" onClick={() => setWipeConfirmOpen(true)}>
                    {pick(t.wipeNow, lang, t.wipeNow.vi)}
                  </Button>
                )}
              </CardContent>
            </Card>

            <Card className="border-[var(--color-error)]/40">
              <CardContent className="space-y-3 pt-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-error)]">{pick(t.dangerZone, lang, t.dangerZone.vi)}</p>
                <div>
                  <p className="text-sm font-medium text-[var(--color-text-primary)]">{pick(t.deleteAccountTitle, lang, t.deleteAccountTitle.vi)}</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">{pick(t.deleteAccountDesc, lang, t.deleteAccountDesc.vi)}</p>
                </div>
                <Button variant="destructive" onClick={() => setDeleteOpen(true)}>
                  {pick(t.deleteAccountButton, lang, t.deleteAccountButton.vi)}
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <ConfirmDialog
        open={wipeConfirmOpen}
        onOpenChange={setWipeConfirmOpen}
        title={pick(t.wipeConfirmTitle, lang, t.wipeConfirmTitle.vi)}
        description={pick(t.wipeConfirmDesc, lang, t.wipeConfirmDesc.vi)}
        confirmLabel={pick(t.wipeNow, lang, t.wipeNow.vi)}
        onConfirm={handleWipeConfirmed}
      />
      <DeleteAccountModal open={deleteOpen} onOpenChange={setDeleteOpen} onConfirm={handleAccountDeleted} />
    </div>
  );
}
