import { useState } from "react";
import { Plus, Lock, ShieldOff, AlertTriangle } from "lucide-react";
import { PageHeader } from "@/components/domain/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useLanguage, pick } from "@/lib/i18n";

// shortcut: dữ liệu mẫu, thay bằng gọi API quản trị viên (FUN_127) khi backend sẵn sàng.
const mockAdmins = [
  { id: "ad1", name: "Nguyễn Huy", status: "active" as const, lastLogin: "23/11/2026 08:40", self: true },
  { id: "ad2", name: "Trần Lan", status: "active" as const, lastLogin: "22/11/2026 17:02", self: false },
  { id: "ad3", name: "Phạm Đức", status: "invited" as const, lastLogin: "—", self: false },
];

const t = {
  title: { vi: "Quản trị viên", en: "Administrators", ja: "管理者" },
  subtitle: { vi: "Quản lý tài khoản có quyền quản trị hệ thống.", en: "Manage accounts with system administration rights.", ja: "システム管理権限を持つアカウントを管理します。" },
  inviteAdmin: { vi: "Mời quản trị viên", en: "Invite administrator", ja: "管理者を招待" },
  minAdminsWarning: {
    vi: "Hệ thống cần tối thiểu 2 Quản trị viên hoạt động (BR_002).",
    en: "The system requires at least 2 active administrators (BR_002).",
    ja: "システムには少なくとも2人の有効な管理者が必要です（BR_002）。",
  },
  name: { vi: "Tên", en: "Name", ja: "氏名" },
  status: { vi: "Trạng thái", en: "Status", ja: "状態" },
  lastLogin: { vi: "Đăng nhập gần nhất", en: "Last login", ja: "最終ログイン" },
  action: { vi: "Hành động", en: "Action", ja: "操作" },
  you: { vi: "(bạn)", en: "(you)", ja: "（あなた）" },
  active: { vi: "Hoạt động", en: "Active", ja: "有効" },
  invited: { vi: "Đã mời", en: "Invited", ja: "招待済み" },
  lock: { vi: "Khóa", en: "Lock", ja: "ロック" },
  revoke: { vi: "Thu hồi quyền", en: "Revoke access", ja: "権限を取り消す" },
};

export function AdminAdminsPage() {
  const { lang } = useLanguage();
  const [admins] = useState(mockAdmins);
  const activeCount = admins.filter((a) => a.status === "active").length;

  return (
    <div className="space-y-5">
      <PageHeader
        title={pick(t.title, lang, t.title.vi)}
        subtitle={pick(t.subtitle, lang, t.subtitle.vi)}
        actions={
          <Button>
            <Plus className="h-4 w-4" /> {pick(t.inviteAdmin, lang, t.inviteAdmin.vi)}
          </Button>
        }
      />

      {activeCount < 2 && (
        <Card className="border-[var(--color-attention)]/30 bg-[var(--color-attention-light)]">
          <CardContent className="flex items-center gap-3 py-3">
            <AlertTriangle className="h-4 w-4 text-[var(--color-attention-text)]" />
            <p className="text-sm text-[var(--color-text-primary)]">{pick(t.minAdminsWarning, lang, t.minAdminsWarning.vi)}</p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{pick(t.name, lang, t.name.vi)}</TableHead>
                <TableHead>{pick(t.status, lang, t.status.vi)}</TableHead>
                <TableHead>{pick(t.lastLogin, lang, t.lastLogin.vi)}</TableHead>
                <TableHead className="text-right">{pick(t.action, lang, t.action.vi)}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {admins.map((a) => (
                <TableRow key={a.id}>
                  <TableCell className="font-medium">
                    {a.name} {a.self && <span className="text-xs text-[var(--color-text-disabled)]">{pick(t.you, lang, t.you.vi)}</span>}
                  </TableCell>
                  <TableCell>
                    <Badge variant={a.status === "active" ? "success" : "warning"}>
                      {a.status === "active" ? pick(t.active, lang, t.active.vi) : pick(t.invited, lang, t.invited.vi)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-[var(--color-text-secondary)]">{a.lastLogin}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="sm" disabled={a.self}>
                        <Lock className="h-3.5 w-3.5" /> {pick(t.lock, lang, t.lock.vi)}
                      </Button>
                      <Button variant="ghost" size="sm" disabled={a.self}>
                        <ShieldOff className="h-3.5 w-3.5" /> {pick(t.revoke, lang, t.revoke.vi)}
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
