import { Scale, Users, Building2, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/domain/page-header";

// shortcut: dữ liệu mẫu, thay bằng gọi API tổng hợp (FUN_124) khi backend sẵn sàng.
const kpis = [
  { label: "Quy tắc đã phát hành", value: "214", icon: Scale },
  { label: "Đề xuất Canh luật chờ xử lý", value: "6", icon: AlertCircle },
  { label: "Tổ chức hoạt động", value: "18", icon: Building2 },
  { label: "Cán bộ hỗ trợ", value: "42", icon: Users },
];

export function AdminOverviewPage() {
  return (
    <div className="space-y-5">
      <PageHeader title="Tổng quan quản trị" subtitle="Chỉ số vận hành tổng hợp — không có nội dung người dùng." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <Card key={k.label}>
            <CardContent className="pt-6">
              <k.icon className="h-4 w-4 text-[#8f7cff]" />
              <p className="mt-2 font-[var(--font-numeric)] text-[length:var(--font-size-numeric)] font-bold text-[var(--color-text-primary)]">
                {k.value}
              </p>
              <p className="text-xs text-[var(--color-text-secondary)]">{k.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="pt-6">
          <p className="mb-2 text-sm font-medium text-[var(--color-text-primary)]">Việc của tôi</p>
          <p className="text-sm text-[var(--color-text-secondary)]">
            3 quy tắc chờ bạn duyệt (không phải do bạn soạn) · 1 phiên bản Law Pack chờ phát hành.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
