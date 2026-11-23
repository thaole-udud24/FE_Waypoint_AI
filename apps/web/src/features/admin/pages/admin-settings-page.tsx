import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/domain/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Modal, ModalContent, ModalTitle, ModalDescription } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  type AiProvider,
  type ProviderKind,
  providerKindLabel,
  mockAiProviders,
} from "../data/mock-ai-providers";

function ProviderFormModal({
  open,
  onOpenChange,
  initial,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initial: AiProvider | null;
  onSave: (provider: AiProvider) => void;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [kind, setKind] = useState<ProviderKind>(initial?.kind ?? "llm");
  const [priority, setPriority] = useState(initial?.priority ?? 1);
  const [active, setActive] = useState(initial?.status !== "disabled");

  function reset() {
    setName(initial?.name ?? "");
    setKind(initial?.kind ?? "llm");
    setPriority(initial?.priority ?? 1);
    setActive(initial?.status !== "disabled");
  }

  function handleSave() {
    if (!name) return;
    onSave({
      id: initial?.id ?? `p-${Date.now()}`,
      name,
      kind,
      priority,
      status: active ? "active" : "disabled",
    });
    onOpenChange(false);
  }

  return (
    <Modal
      open={open}
      onOpenChange={(next) => {
        if (next) reset();
        onOpenChange(next);
      }}
    >
      <ModalContent>
        <ModalTitle>{initial ? "Sửa nhà cung cấp" : "Thêm nhà cung cấp"}</ModalTitle>
        <ModalDescription>Thứ tự ưu tiên nhỏ hơn được dùng trước; dự phòng khi nhà cung cấp chính lỗi.</ModalDescription>

        <div className="mt-4 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">Tên</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="VD: Claude (chính)" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">Loại</label>
              <Select value={kind} onValueChange={(v) => setKind(v as ProviderKind)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(providerKindLabel).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">Ưu tiên</label>
              <Input type="number" min={1} value={priority} onChange={(e) => setPriority(Number(e.target.value))} />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--color-text-primary)]">Đang bật</span>
            <Switch checked={active} onCheckedChange={setActive} />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Hủy
          </Button>
          <Button onClick={handleSave} disabled={!name}>
            Lưu
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
}

export function AdminSettingsPage() {
  const [providers, setProviders] = useState<AiProvider[]>(mockAiProviders);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<AiProvider | null>(null);
  const [pendingDelete, setPendingDelete] = useState<AiProvider | null>(null);

  function upsert(provider: AiProvider) {
    setProviders((prev) => {
      const exists = prev.some((p) => p.id === provider.id);
      return exists ? prev.map((p) => (p.id === provider.id ? provider : p)) : [provider, ...prev];
    });
  }

  return (
    <div className="space-y-5">
      <PageHeader
        title="Cấu hình & AI"
        subtitle="Quản lý nhà cung cấp LLM/OCR/Thông báo — thêm, sửa, xóa, đổi thứ tự dự phòng."
        actions={
          <Button
            onClick={() => {
              setEditing(null);
              setFormOpen(true);
            }}
          >
            <Plus className="h-4 w-4" /> Thêm nhà cung cấp
          </Button>
        }
      />

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên</TableHead>
                <TableHead>Loại</TableHead>
                <TableHead>Ưu tiên</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {providers.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell className="text-[var(--color-text-secondary)]">{providerKindLabel[p.kind]}</TableCell>
                  <TableCell>{p.priority}</TableCell>
                  <TableCell>
                    <Badge variant={p.status === "active" ? "success" : "default"}>
                      {p.status === "active" ? "Đang bật" : "Đã tắt"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <button
                        onClick={() => {
                          setEditing(p);
                          setFormOpen(true);
                        }}
                        className="rounded-md p-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-secondary)]"
                        aria-label="Sửa"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setPendingDelete(p)}
                        className="rounded-md p-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-error)]/10 hover:text-[var(--color-error)]"
                        aria-label="Xóa"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <ProviderFormModal open={formOpen} onOpenChange={setFormOpen} initial={editing} onSave={upsert} />

      <ConfirmDialog
        open={!!pendingDelete}
        onOpenChange={(open) => !open && setPendingDelete(null)}
        title="Xóa nhà cung cấp?"
        description={`"${pendingDelete?.name}" sẽ ngừng được dùng ngay. Nếu đây là nhà cung cấp tự host cuối cùng, hãy thêm nhà khác trước khi xóa.`}
        confirmLabel="Xóa"
        onConfirm={() => {
          setProviders((prev) => prev.filter((p) => p.id !== pendingDelete?.id));
          setPendingDelete(null);
        }}
      />
    </div>
  );
}
