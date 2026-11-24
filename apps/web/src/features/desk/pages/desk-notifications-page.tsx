import { PageHeader } from "@/components/domain/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Bell } from "lucide-react";
import { useLanguage, pick } from "@/lib/i18n";

const t = {
  title: { vi: "Thông báo", en: "Notifications", ja: "通知" },
  subtitle: {
    vi: "Cập nhật về case được giao và đề nghị sắp hết hạn.",
    en: "Updates about assigned cases and requests nearing expiry.",
    ja: "割り当てられたケースや期限が近いリクエストの更新。",
  },
  empty: { vi: "Không có thông báo mới", en: "No new notifications", ja: "新しい通知はありません" },
};

export function DeskNotificationsPage() {
  const { lang } = useLanguage();
  return (
    <div className="space-y-5">
      <PageHeader title={pick(t.title, lang, t.title.vi)} subtitle={pick(t.subtitle, lang, t.subtitle.vi)} />
      <Card>
        <CardContent>
          <EmptyState title={pick(t.empty, lang, t.empty.vi)} icon={<Bell className="h-10 w-10" />} />
        </CardContent>
      </Card>
    </div>
  );
}
