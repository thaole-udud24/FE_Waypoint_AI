import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PageHeader } from "@/components/domain/page-header";
import { useLanguage, pick } from "@/lib/i18n";
import { useAuthStore } from "@/stores/auth-store";
import { useDiscreetStore } from "@/stores/discreet-store";

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
};

export function SettingsPage() {
  const { lang } = useLanguage();
  const user = useAuthStore((s) => s.user);
  const { discreet, toggle: setDiscreet } = useDiscreetStore();
  const [name, setName] = useState(user?.name ?? "");
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifyMismatch, setNotifyMismatch] = useState(true);

  return (
    <div className="space-y-5">
      <PageHeader title="Tài khoản" kanji="設定" subtitle="Quản lý thông tin cá nhân và tùy chọn thông báo." />

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">{pick(t.tabProfile, lang, "Hồ sơ")}</TabsTrigger>
          <TabsTrigger value="notifications">{pick(t.tabNotifications, lang, "Thông báo")}</TabsTrigger>
          <TabsTrigger value="security">{pick(t.tabSecurity, lang, "Bảo mật")}</TabsTrigger>
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
      </Tabs>
    </div>
  );
}
