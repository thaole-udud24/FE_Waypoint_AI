import { Download } from "lucide-react";
import { PageHeader } from "@/components/domain/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockAuditLog } from "../data/mock-rules";

export function AdminAuditLogPage() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Nhật ký kiểm toán"
        subtitle="Chỉ đọc — không có nội dung người dùng, không thể sửa/xóa (BR_004)."
        actions={
          <Button variant="outline">
            <Download className="h-4 w-4" /> Xuất CSV
          </Button>
        }
      />

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Thời gian</TableHead>
                <TableHead>Tác nhân</TableHead>
                <TableHead>Hành động</TableHead>
                <TableHead>Đối tượng</TableHead>
                <TableHead>Kết quả</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAuditLog.map((l) => (
                <TableRow key={l.id}>
                  <TableCell className="font-mono text-xs text-[var(--color-text-secondary)]">{l.time}</TableCell>
                  <TableCell className="font-medium">{l.actor}</TableCell>
                  <TableCell className="text-[var(--color-text-secondary)]">{l.action}</TableCell>
                  <TableCell className="text-[var(--color-text-secondary)]">{l.target}</TableCell>
                  <TableCell>
                    <Badge variant={l.result === "success" ? "success" : "error"}>
                      {l.result === "success" ? "Thành công" : "Thất bại"}
                    </Badge>
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
