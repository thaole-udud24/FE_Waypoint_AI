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

function InviteStaffModal({ open, onOpenChange, org }: { open: boolean; onOpenChange: (v: boolean) => void; org?: Organization }) {
  const [email, setEmail] = useState("");
  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalTitle>Mời cán bộ</ModalTitle>
        <ModalDescription>{org && `Gửi lời mời tham gia ${org.name}.`}</ModalDescription>
        <div className="mt-4 space-y-3">
          <Input placeholder="email@tochuc.jp" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Hủy
          </Button>
          <Button disabled={!email} onClick={() => onOpenChange(false)}>
            <Mail className="h-4 w-4" /> Gửi lời mời
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
}

export function AdminOrganizationsPage() {
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
        title="Tổ chức & cán bộ"
        subtitle="Danh bạ tổ chức nhận Case Pack và cán bộ hỗ trợ của từng tổ chức."
        actions={
          <Button>
            <Plus className="h-4 w-4" /> Thêm tổ chức
          </Button>
        }
      />

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tổ chức</TableHead>
                <TableHead>Loại</TableHead>
                <TableHead>Quốc gia</TableHead>
                <TableHead>Nhận Case Pack</TableHead>
                <TableHead>Cán bộ</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Hành động</TableHead>
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
                      {o.status === "active" ? "Hoạt động" : "Tạm ngưng"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="sm" onClick={() => setInviteFor(o)}>
                        <Mail className="h-3.5 w-3.5" /> Mời cán bộ
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
