import { useState } from "react";
import { Plus, Mail, Pause, Play } from "lucide-react";
import { PageHeader } from "@/components/domain/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Modal, ModalContent, ModalTitle, ModalDescription } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { mockOrganizations, type Organization } from "../data/mock-organizations";
import { useLanguage, pick } from "@/lib/i18n";

const t = {
  inviteStaff: { vi: "Mời cán bộ", en: "Invite staff", ja: "担当者を招待" },
  sendInviteTo: { vi: (name: string) => `Gửi lời mời tham gia ${name}.`, en: (name: string) => `Send an invite to join ${name}.`, ja: (name: string) => `${name} への参加招待を送信します。` },
  cancel: { vi: "Hủy", en: "Cancel", ja: "キャンセル" },
  sendInvite: { vi: "Gửi lời mời", en: "Send invite", ja: "招待を送信" },
  title: { vi: "Tổ chức & cán bộ", en: "Organizations & staff", ja: "組織・担当者" },
  subtitle: {
    vi: "Danh bạ tổ chức nhận Case Pack và cán bộ hỗ trợ của từng tổ chức.",
    en: "Directory of organizations receiving Case Packs and each organization's support staff.",
    ja: "Case Packを受け取る組織と各組織の支援担当者の一覧。",
  },
  addOrg: { vi: "Thêm tổ chức", en: "Add organization", ja: "組織を追加" },
  organization: { vi: "Tổ chức", en: "Organization", ja: "組織" },
  type: { vi: "Loại", en: "Type", ja: "種別" },
  country: { vi: "Quốc gia", en: "Country", ja: "国" },
  receivesCasePack: { vi: "Nhận Case Pack", en: "Receives Case Pack", ja: "Case Pack受領" },
  staff: { vi: "Cán bộ", en: "Staff", ja: "担当者" },
  status: { vi: "Trạng thái", en: "Status", ja: "状態" },
  action: { vi: "Hành động", en: "Action", ja: "操作" },
  active: { vi: "Hoạt động", en: "Active", ja: "有効" },
  suspended: { vi: "Tạm ngưng", en: "Suspended", ja: "停止中" },
};

function InviteStaffModal({ open, onOpenChange, org }: { open: boolean; onOpenChange: (v: boolean) => void; org?: Organization }) {
  const { lang } = useLanguage();
  const [email, setEmail] = useState("");
  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalTitle>{pick(t.inviteStaff, lang, t.inviteStaff.vi)}</ModalTitle>
        <ModalDescription>{org && (t.sendInviteTo[lang] ?? t.sendInviteTo.vi)(org.name)}</ModalDescription>
        <div className="mt-4 space-y-3">
          <Input placeholder="email@tochuc.jp" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {pick(t.cancel, lang, t.cancel.vi)}
          </Button>
          <Button disabled={!email} onClick={() => onOpenChange(false)}>
            <Mail className="h-4 w-4" /> {pick(t.sendInvite, lang, t.sendInvite.vi)}
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
}

export function AdminOrganizationsPage() {
  const { lang } = useLanguage();
  const [orgs, setOrgs] = useState(mockOrganizations);
  const [inviteFor, setInviteFor] = useState<Organization | undefined>();

  function toggleField(id: string, field: "receivesCasePack") {
    setOrgs((prev) => prev.map((o) => (o.id === id ? { ...o, [field]: !o[field] } : o)));
  }

  function toggleStatus(id: string) {
    setOrgs((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: o.status === "active" ? "suspended" : "active" } : o))
    );
  }

  return (
    <div className="space-y-5">
      <PageHeader
        title={pick(t.title, lang, t.title.vi)}
        subtitle={pick(t.subtitle, lang, t.subtitle.vi)}
        actions={
          <Button>
            <Plus className="h-4 w-4" /> {pick(t.addOrg, lang, t.addOrg.vi)}
          </Button>
        }
      />

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{pick(t.organization, lang, t.organization.vi)}</TableHead>
                <TableHead>{pick(t.type, lang, t.type.vi)}</TableHead>
                <TableHead>{pick(t.country, lang, t.country.vi)}</TableHead>
                <TableHead>{pick(t.receivesCasePack, lang, t.receivesCasePack.vi)}</TableHead>
                <TableHead>{pick(t.staff, lang, t.staff.vi)}</TableHead>
                <TableHead>{pick(t.status, lang, t.status.vi)}</TableHead>
                <TableHead className="text-right">{pick(t.action, lang, t.action.vi)}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orgs.map((o) => (
                <TableRow key={o.id}>
                  <TableCell className="font-medium">{o.name}</TableCell>
                  <TableCell className="text-[var(--color-text-secondary)]">{o.type}</TableCell>
                  <TableCell className="text-[var(--color-text-secondary)]">{o.country}</TableCell>
                  <TableCell>
                    <Switch checked={o.receivesCasePack} onCheckedChange={() => toggleField(o.id, "receivesCasePack")} />
                  </TableCell>
                  <TableCell>{o.staffCount}</TableCell>
                  <TableCell>
                    <Badge variant={o.status === "active" ? "success" : "default"}>
                      {o.status === "active" ? pick(t.active, lang, t.active.vi) : pick(t.suspended, lang, t.suspended.vi)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="sm" onClick={() => setInviteFor(o)}>
                        <Mail className="h-3.5 w-3.5" /> {pick(t.inviteStaff, lang, t.inviteStaff.vi)}
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => toggleStatus(o.id)}>
                        {o.status === "active" ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <InviteStaffModal open={!!inviteFor} onOpenChange={(v) => !v && setInviteFor(undefined)} org={inviteFor} />
    </div>
  );
}
