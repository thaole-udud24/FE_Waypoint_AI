import { PageHeader } from "@/components/domain/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth-store";

export function DeskSettingsPage() {
  const user = useAuthStore((s) => s.user);
  return (
    <div className="space-y-5">
      <PageHeader title="Tài khoản" subtitle="Thông tin cán bộ hỗ trợ và tổ chức." />
      <Card>
        <CardContent className="max-w-md space-y-4 pt-6">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">Họ và tên</label>
            <Input defaultValue={user?.name ?? ""} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">Tổ chức</label>
            <Input defaultValue="Nghiệp đoàn hỗ trợ ABC" disabled />
          </div>
          <Button>Lưu thay đổi</Button>
        </CardContent>
      </Card>
    </div>
  );
}
