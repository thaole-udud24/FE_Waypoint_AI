import { useState } from "react";
import { Plus, Lock, ShieldOff, AlertTriangle } from "lucide-react";
import { PageHeader } from "@/components/domain/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// shortcut: dữ liệu mẫu, thay bằng gọi API quản trị viên (FUN_127) khi backend sẵn sàng.
const mockAdmins = [
  { id: "ad1", name: "Nguyễn Huy", status: "active" as const, lastLogin: "23/11/2026 08:40", self: true },
  { id: "ad2", name: "Trần Lan", status: "active" as const, lastLogin: "22/11/2026 17:02", self: false },
  { id: "ad3", name: "Phạm Đức", status: "invited" as const, lastLogin: "—", self: false },
];

export function AdminAdminsPage() {
  const [admins] = useState(mockAdmins);
  const activeCount = admins.filter((a) => a.status === "active").length;

  return (
    <div className="space-y-5">
      <PageHeader
        title="Quản trị viên"
        subtitle="Quản lý tài khoản có quyền quản trị hệ thống."
        actions={
          <Button>
            <Plus className="h-4 w-4" /> Mời quản trị viên
          </Button>
        }
      />

      {activeCount < 2 && (
        <Card className="border-[var(--color-attention)]/30 bg-[var(--color-attention-light)]">
          <CardContent className="flex items-center gap-3 py-3">
            <AlertTriangle className="h-4 w-4 text-[var(--color-attention-text)]" />
            <p className="text-sm text-[var(--color-text-primary)]">
              Hệ thống cần tối thiểu 2 Quản trị viên hoạt động (BR_002).
            </p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Đăng nhập gần nhất</TableHead>
                <TableHead className="text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {admins.map((a) => (
                <TableRow key={a.id}>
                  <TableCell className="font-medium">
                    {a.name} {a.self && <span className="text-xs text-[var(--color-text-disabled)]">(bạn)</span>}
                  </TableCell>
                  <TableCell>
                    <Badge variant={a.status === "active" ? "success" : "warning"}>
                      {a.status === "active" ? "Hoạt động" : "Đã mời"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-[var(--color-text-secondary)]">{a.lastLogin}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="sm" disabled={a.self}>
                        <Lock className="h-3.5 w-3.5" /> Khóa
                      </Button>
                      <Button variant="ghost" size="sm" disabled={a.self}>
                        <ShieldOff className="h-3.5 w-3.5" /> Thu hồi quyền
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
