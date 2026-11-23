import { Activity } from "lucide-react";
import { PageHeader } from "@/components/domain/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// shortcut: dữ liệu mẫu, thay bằng gọi API giám sát (FUN_132) khi backend sẵn sàng.
const services = [
  { name: "LLM (Claude)", status: "ok" as const, latencyMs: 820, queue: 2 },
  { name: "OCR", status: "ok" as const, latencyMs: 1400, queue: 5 },
  { name: "Thông báo (Email/SMS)", status: "degraded" as const, latencyMs: 3200, queue: 18 },
  { name: "Thanh toán", status: "ok" as const, latencyMs: 540, queue: 0 },
];

const statusVariant = { ok: "success", degraded: "warning", down: "error" } as const;
const statusLabel = { ok: "Bình thường", degraded: "Chậm", down: "Gián đoạn" } as const;

export function AdminMonitoringPage() {
  return (
    <div className="space-y-5">
      <PageHeader title="Giám sát vận hành" subtitle="Tình trạng dịch vụ kỹ thuật — không có nội dung người dùng." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {services.map((s) => (
          <Card key={s.name}>
            <CardContent className="flex items-start justify-between pt-6">
              <div>
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-[#8f7cff]" />
                  <p className="text-sm font-medium text-[var(--color-text-primary)]">{s.name}</p>
                </div>
                <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
                  Độ trễ {s.latencyMs}ms · Hàng đợi {s.queue}
                </p>
              </div>
              <Badge variant={statusVariant[s.status]}>{statusLabel[s.status]}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
