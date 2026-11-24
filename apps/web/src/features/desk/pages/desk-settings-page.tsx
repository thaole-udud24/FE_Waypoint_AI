import { PageHeader } from "@/components/domain/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth-store";
import { useLanguage, pick } from "@/lib/i18n";

const t = {
  title: { vi: "Tài khoản", en: "Account", ja: "アカウント" },
  subtitle: { vi: "Thông tin cán bộ hỗ trợ và tổ chức.", en: "Support staff and organization details.", ja: "支援担当者と組織の情報。" },
  fullName: { vi: "Họ và tên", en: "Full name", ja: "氏名" },
  organization: { vi: "Tổ chức", en: "Organization", ja: "組織" },
  saveChanges: { vi: "Lưu thay đổi", en: "Save changes", ja: "変更を保存" },
};

export function DeskSettingsPage() {
  const { lang } = useLanguage();
  const user = useAuthStore((s) => s.user);
  return (
    <div className="space-y-5">
      <PageHeader title={pick(t.title, lang, t.title.vi)} subtitle={pick(t.subtitle, lang, t.subtitle.vi)} />
      <Card>
        <CardContent className="max-w-md space-y-4 pt-6">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">{pick(t.fullName, lang, t.fullName.vi)}</label>
            <Input defaultValue={user?.name ?? ""} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">{pick(t.organization, lang, t.organization.vi)}</label>
            <Input defaultValue="Nghiệp đoàn hỗ trợ ABC" disabled />
          </div>
          <Button>{pick(t.saveChanges, lang, t.saveChanges.vi)}</Button>
        </CardContent>
      </Card>
    </div>
  );
}
