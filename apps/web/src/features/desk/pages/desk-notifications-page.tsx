import { PageHeader } from "@/components/domain/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Bell } from "lucide-react";

export function DeskNotificationsPage() {
  return (
    <div className="space-y-5">
      <PageHeader title="Thông báo" subtitle="Cập nhật về case được giao và đề nghị sắp hết hạn." />
      <Card>
        <CardContent>
          <EmptyState title="Không có thông báo mới" icon={<Bell className="h-10 w-10" />} />
        </CardContent>
      </Card>
    </div>
  );
}
