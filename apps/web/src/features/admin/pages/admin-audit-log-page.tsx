import { Download } from "lucide-react";
import { PageHeader } from "@/components/domain/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockAuditLog } from "../data/mock-rules";
import { useLanguage, pick } from "@/lib/i18n";

const t = {
  title: { vi: "Nhật ký kiểm toán", en: "Audit log", ja: "監査ログ" },
  subtitle: {
    vi: "Chỉ đọc — không có nội dung người dùng, không thể sửa/xóa (BR_004).",
    en: "Read-only — no user content, cannot be edited or deleted (BR_004).",
    ja: "読み取り専用 — ユーザーの内容は含まれず、編集・削除はできません（BR_004）。",
  },
  exportCsv: { vi: "Xuất CSV", en: "Export CSV", ja: "CSVを出力" },
  time: { vi: "Thời gian", en: "Time", ja: "日時" },
  actor: { vi: "Tác nhân", en: "Actor", ja: "実行者" },
  action: { vi: "Hành động", en: "Action", ja: "操作" },
  target: { vi: "Đối tượng", en: "Target", ja: "対象" },
  result: { vi: "Kết quả", en: "Result", ja: "結果" },
  success: { vi: "Thành công", en: "Success", ja: "成功" },
  failure: { vi: "Thất bại", en: "Failure", ja: "失敗" },
};

export function AdminAuditLogPage() {
  const { lang } = useLanguage();
  return (
    <div className="space-y-5">
      <PageHeader
        title={pick(t.title, lang, t.title.vi)}
        subtitle={pick(t.subtitle, lang, t.subtitle.vi)}
        actions={
          <Button variant="outline">
            <Download className="h-4 w-4" /> {pick(t.exportCsv, lang, t.exportCsv.vi)}
          </Button>
        }
      />

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{pick(t.time, lang, t.time.vi)}</TableHead>
                <TableHead>{pick(t.actor, lang, t.actor.vi)}</TableHead>
                <TableHead>{pick(t.action, lang, t.action.vi)}</TableHead>
                <TableHead>{pick(t.target, lang, t.target.vi)}</TableHead>
                <TableHead>{pick(t.result, lang, t.result.vi)}</TableHead>
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
                      {l.result === "success" ? pick(t.success, lang, t.success.vi) : pick(t.failure, lang, t.failure.vi)}
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
