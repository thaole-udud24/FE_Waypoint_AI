import { useState } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, Info, CheckCircle2, Bell } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/domain/page-header";
import { useLanguage, pick } from "@/lib/i18n";
import { useDiscreetStore } from "@/stores/discreet-store";
import { cn } from "@/lib/utils";
import { type NotificationKind, mockNotifications } from "../data/mock-notifications";

const kindConfig: Record<NotificationKind, { icon: typeof Bell; color: string }> = {
  alert: { icon: AlertTriangle, color: "text-[var(--color-attention-text)]" },
  info: { icon: Info, color: "text-[var(--color-info)]" },
  success: { icon: CheckCircle2, color: "text-[var(--color-success)]" },
};

const t = {
  newCount: { vi: (n: number) => ` (${n} mới)`, en: (n: number) => ` (${n} new)`, ja: (n: number) => `（新着${n}件）` },
  markAllRead: { vi: "Đánh dấu đã đọc tất cả", en: "Mark all as read", ja: "すべて既読にする" },
  empty: { vi: "Không có thông báo nào", en: "No notifications", ja: "通知はありません" },
  genericTitle: { vi: "Có cập nhật mới", en: "You have an update", ja: "新しい更新があります" },
  genericDesc: { vi: "Mở ứng dụng để xem chi tiết.", en: "Open the app to see details.", ja: "詳細はアプリ内でご確認ください。" },
};

export function NotificationsPage() {
  const { lang } = useLanguage();
  const discreet = useDiscreetStore((s) => s.discreet);
  const [items, setItems] = useState(mockNotifications);
  const unreadCount = items.filter((n) => !n.read).length;

  return (
    <div className="space-y-5">
      <PageHeader
        title={`Thông báo${unreadCount > 0 ? t.newCount[lang](unreadCount) : ""}`}
        kanji="設定"
        subtitle="Cập nhật từ các module đối chiếu lương, hợp đồng và hồ sơ hỗ trợ."
        actions={
          unreadCount > 0 ? (
            <Button variant="outline" onClick={() => setItems((prev) => prev.map((n) => ({ ...n, read: true })))}>
              {pick(t.markAllRead, lang, "Đánh dấu đã đọc tất cả")}
            </Button>
          ) : undefined
        }
      />

      {items.length === 0 ? (
        <Card>
          <CardContent>
            <EmptyState title={pick(t.empty, lang, "Không có thông báo nào")} icon={<Bell className="h-10 w-10" />} />
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {items.map((n) => {
            const cfg = kindConfig[n.kind];
            const Icon = cfg.icon;
            const content = (
              <Card className={cn(!n.read && "border-[var(--color-primary)]/30 bg-[var(--color-primary-light)]/40")}>
                <CardContent className="flex items-start gap-3 py-4">
                  <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", cfg.color)} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[var(--color-text-primary)]">
                      {discreet ? pick(t.genericTitle, lang, "Có cập nhật mới") : pick(n.title, lang, n.title.vi)}
                    </p>
                    <p className="mt-0.5 text-sm text-[var(--color-text-secondary)]">
                      {discreet ? pick(t.genericDesc, lang, "Mở ứng dụng để xem chi tiết.") : pick(n.description, lang, n.description.vi)}
                    </p>
                    <p className="mt-1 text-xs text-[var(--color-text-disabled)]">{pick(n.time, lang, n.time.vi)}</p>
                  </div>
                  {!n.read && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--color-primary)]" />}
                </CardContent>
              </Card>
            );
            return n.to ? (
              <Link key={n.id} to={n.to} className="block">
                {content}
              </Link>
            ) : (
              <div key={n.id}>{content}</div>
            );
          })}
        </div>
      )}
    </div>
  );
}
