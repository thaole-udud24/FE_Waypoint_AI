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
import { useLanguage, pick } from "@/lib/i18n";

const t = {
  editProvider: { vi: "Sửa nhà cung cấp", en: "Edit provider", ja: "プロバイダーを編集" },
  addProvider: { vi: "Thêm nhà cung cấp", en: "Add provider", ja: "プロバイダーを追加" },
  priorityHint: {
    vi: "Thứ tự ưu tiên nhỏ hơn được dùng trước; dự phòng khi nhà cung cấp chính lỗi.",
    en: "A lower priority number is used first; it falls back when the primary provider fails.",
    ja: "優先度の数値が小さいほど先に使用され、メインのプロバイダーが失敗した際のフォールバックになります。",
  },
  name: { vi: "Tên", en: "Name", ja: "名前" },
  namePlaceholder: { vi: "VD: Claude (chính)", en: "E.g.: Claude (primary)", ja: "例：Claude（メイン）" },
  kind: { vi: "Loại", en: "Kind", ja: "種別" },
  priority: { vi: "Ưu tiên", en: "Priority", ja: "優先度" },
  enabled: { vi: "Đang bật", en: "Enabled", ja: "有効" },
  cancel: { vi: "Hủy", en: "Cancel", ja: "キャンセル" },
  save: { vi: "Lưu", en: "Save", ja: "保存" },
  title: { vi: "Cấu hình & AI", en: "Settings & AI", ja: "設定・AI" },
  subtitle: {
    vi: "Quản lý nhà cung cấp LLM/OCR/Thông báo — thêm, sửa, xóa, đổi thứ tự dự phòng.",
    en: "Manage LLM/OCR/Notification providers — add, edit, delete, and reorder fallback priority.",
    ja: "LLM/OCR/通知プロバイダーを管理 — 追加、編集、削除、フォールバック順序の変更。",
  },
  status: { vi: "Trạng thái", en: "Status", ja: "状態" },
  action: { vi: "Hành động", en: "Action", ja: "操作" },
  enabledBadge: { vi: "Đang bật", en: "Enabled", ja: "有効" },
  disabledBadge: { vi: "Đã tắt", en: "Disabled", ja: "無効" },
  edit: { vi: "Sửa", en: "Edit", ja: "編集" },
  delete: { vi: "Xóa", en: "Delete", ja: "削除" },
  deleteProviderTitle: { vi: "Xóa nhà cung cấp?", en: "Delete provider?", ja: "プロバイダーを削除しますか？" },
  deleteProviderDescription: {
    vi: (name: string) => `"${name}" sẽ ngừng được dùng ngay. Nếu đây là nhà cung cấp tự host cuối cùng, hãy thêm nhà khác trước khi xóa.`,
    en: (name: string) => `"${name}" will stop being used immediately. If this is your last self-hosted provider, add another before deleting.`,
    ja: (name: string) => `"${name}" は直ちに使用停止されます。これが最後のセルフホストプロバイダーの場合は、削除前に別のプロバイダーを追加してください。`,
  },
};

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
  const { lang } = useLanguage();
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
        <ModalTitle>{initial ? pick(t.editProvider, lang, t.editProvider.vi) : pick(t.addProvider, lang, t.addProvider.vi)}</ModalTitle>
        <ModalDescription>{pick(t.priorityHint, lang, t.priorityHint.vi)}</ModalDescription>

        <div className="mt-4 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">{pick(t.name, lang, t.name.vi)}</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder={pick(t.namePlaceholder, lang, t.namePlaceholder.vi)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">{pick(t.kind, lang, t.kind.vi)}</label>
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
              <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">{pick(t.priority, lang, t.priority.vi)}</label>
              <Input type="number" min={1} value={priority} onChange={(e) => setPriority(Number(e.target.value))} />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--color-text-primary)]">{pick(t.enabled, lang, t.enabled.vi)}</span>
            <Switch checked={active} onCheckedChange={setActive} />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {pick(t.cancel, lang, t.cancel.vi)}
          </Button>
          <Button onClick={handleSave} disabled={!name}>
            {pick(t.save, lang, t.save.vi)}
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
}

export function AdminSettingsPage() {
  const { lang } = useLanguage();
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
        title={pick(t.title, lang, t.title.vi)}
        subtitle={pick(t.subtitle, lang, t.subtitle.vi)}
        actions={
          <Button
            onClick={() => {
              setEditing(null);
              setFormOpen(true);
            }}
          >
            <Plus className="h-4 w-4" /> {pick(t.addProvider, lang, t.addProvider.vi)}
          </Button>
        }
      />

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{pick(t.name, lang, t.name.vi)}</TableHead>
                <TableHead>{pick(t.kind, lang, t.kind.vi)}</TableHead>
                <TableHead>{pick(t.priority, lang, t.priority.vi)}</TableHead>
                <TableHead>{pick(t.status, lang, t.status.vi)}</TableHead>
                <TableHead className="text-right">{pick(t.action, lang, t.action.vi)}</TableHead>
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
                      {p.status === "active" ? pick(t.enabledBadge, lang, t.enabledBadge.vi) : pick(t.disabledBadge, lang, t.disabledBadge.vi)}
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
                        aria-label={pick(t.edit, lang, t.edit.vi)}
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setPendingDelete(p)}
                        className="rounded-md p-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-error)]/10 hover:text-[var(--color-error)]"
                        aria-label={pick(t.delete, lang, t.delete.vi)}
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
        title={pick(t.deleteProviderTitle, lang, t.deleteProviderTitle.vi)}
        description={pendingDelete ? (t.deleteProviderDescription[lang] ?? t.deleteProviderDescription.vi)(pendingDelete.name) : undefined}
        confirmLabel={pick(t.delete, lang, t.delete.vi)}
        onConfirm={() => {
          setProviders((prev) => prev.filter((p) => p.id !== pendingDelete?.id));
          setPendingDelete(null);
        }}
      />
    </div>
  );
}
