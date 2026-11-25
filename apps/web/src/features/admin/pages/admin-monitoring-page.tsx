import { Activity } from "lucide-react";
import { PageHeader } from "@/components/domain/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage, pick } from "@/lib/i18n";

// shortcut: dữ liệu mẫu, thay bằng gọi API giám sát (FUN_132) khi backend sẵn sàng.
const services = [
  { name: "LLM (Claude)", status: "ok" as const, latencyMs: 820, queue: 2 },
  { name: "OCR", status: "ok" as const, latencyMs: 1400, queue: 5 },
  { name: { vi: "Thông báo (Email/SMS)", en: "Notifications (Email/SMS)", ja: "通知（メール/SMS）" }, status: "degraded" as const, latencyMs: 3200, queue: 18 },
  { name: { vi: "Thanh toán", en: "Payments", ja: "決済" }, status: "ok" as const, latencyMs: 540, queue: 0 },
];

const statusVariant = { ok: "success", degraded: "warning", down: "error" } as const;
const statusLabel = {
  ok: { vi: "Bình thường", en: "Normal", ja: "正常" },
  degraded: { vi: "Chậm", en: "Degraded", ja: "低下" },
  down: { vi: "Gián đoạn", en: "Down", ja: "停止" },
} as const;

const t = {
  title: { vi: "Giám sát vận hành", en: "Operational monitoring", ja: "運用監視" },
  subtitle: {
    vi: "Tình trạng dịch vụ kỹ thuật — không có nội dung người dùng.",
    en: "Technical service status — no user content.",
    ja: "技術サービスの状況 — ユーザーの内容は含みません。",
  },
  latency: { vi: "Độ trễ", en: "Latency", ja: "レイテンシ" },
  queue: { vi: "Hàng đợi", en: "Queue", ja: "キュー" },
};

export function AdminMonitoringPage() {
  const { lang } = useLanguage();
  return (
    <div className="space-y-5">
      <PageHeader title={pick(t.title, lang, t.title.vi)} subtitle={pick(t.subtitle, lang, t.subtitle.vi)} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {services.map((s) => {
          const name = typeof s.name === "string" ? s.name : pick(s.name, lang, s.name.vi);
          return (
            <Card key={name}>
              <CardContent className="flex items-start justify-between pt-6">
                <div>
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-[#8f7cff]" />
                    <p className="text-sm font-medium text-[var(--color-text-primary)]">{name}</p>
                  </div>
                  <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
                    {pick(t.latency, lang, t.latency.vi)} {s.latencyMs}ms · {pick(t.queue, lang, t.queue.vi)} {s.queue}
                  </p>
                </div>
                <Badge variant={statusVariant[s.status]}>{pick(statusLabel[s.status], lang, statusLabel[s.status].vi)}</Badge>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
