import { useState } from "react";
import { FileText, Upload, Download, Trash2, FileImage, FileSpreadsheet } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EmptyState } from "@/components/ui/empty-state";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { PageHeader } from "@/components/domain/page-header";
import { useLanguage, pick } from "@/lib/i18n";
import { UploadDocumentModal } from "../components/upload-document-modal";
import { type DocumentItem, documentTypeLabel, mockDocuments } from "../data/mock-documents";

const typeIcon: Record<DocumentItem["type"], typeof FileText> = {
  payslip: FileSpreadsheet,
  contract: FileText,
  id_card: FileImage,
  other: FileText,
};

const statusVariant: Record<DocumentItem["status"], "success" | "warning" | "info"> = {
  verified: "success",
  pending: "warning",
  processing: "info",
};

const statusLabel: Record<DocumentItem["status"], { vi: string; en: string; ja: string }> = {
  verified: { vi: "Đã xác minh", en: "Verified", ja: "確認済み" },
  pending: { vi: "Chờ xử lý", en: "Pending", ja: "処理待ち" },
  processing: { vi: "Đang xử lý", en: "Processing", ja: "処理中" },
};

const t = {
  uploadButton: { vi: "Tải tài liệu", en: "Upload document", ja: "書類をアップロード" },
  emptyTitle: { vi: "Chưa có tài liệu nào", en: "No documents yet", ja: "まだ書類がありません" },
  emptyDesc: {
    vi: "Tải lên phiếu lương, hợp đồng hoặc giấy tờ để bắt đầu.",
    en: "Upload a payslip, contract or ID document to get started.",
    ja: "給与明細・契約書・本人確認書類をアップロードして始めましょう。",
  },
  colName: { vi: "Tên tài liệu", en: "Document name", ja: "書類名" },
  colType: { vi: "Loại", en: "Type", ja: "種類" },
  colUploadedAt: { vi: "Ngày tải lên", en: "Uploaded", ja: "アップロード日" },
  colStatus: { vi: "Trạng thái", en: "Status", ja: "状態" },
  colAction: { vi: "Hành động", en: "Actions", ja: "操作" },
  download: { vi: "Tải xuống", en: "Download", ja: "ダウンロード" },
  delete: { vi: "Xóa", en: "Delete", ja: "削除" },
  confirmDeleteTitle: { vi: "Xóa tài liệu?", en: "Delete document?", ja: "書類を削除しますか？" },
  confirmDeleteDesc: {
    vi: (name?: string) => `"${name}" sẽ bị xóa khỏi hồ sơ của bạn. Hành động này không thể hoàn tác.`,
    en: (name?: string) => `"${name}" will be removed from your records. This cannot be undone.`,
    ja: (name?: string) => `「${name}」は記録から削除されます。この操作は取り消せません。`,
  },
};

export function DocumentsPage() {
  const { lang } = useLanguage();
  const [documents, setDocuments] = useState(mockDocuments);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<DocumentItem | null>(null);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Tài liệu"
        kanji="書類"
        subtitle="Phiếu lương, hợp đồng và giấy tờ tùy thân đã tải lên."
        actions={
          <Button onClick={() => setUploadOpen(true)}>
            <Upload className="h-4 w-4" /> {pick(t.uploadButton, lang, "Tải tài liệu")}
          </Button>
        }
      />

      <Card>
        <CardContent className="p-0">
          {documents.length === 0 ? (
            <EmptyState
              title={pick(t.emptyTitle, lang, "Chưa có tài liệu nào")}
              description={pick(t.emptyDesc, lang, t.emptyDesc.vi)}
              icon={<FileText className="h-10 w-10" />}
              action={
                <Button className="mt-2" onClick={() => setUploadOpen(true)}>
                  {pick(t.uploadButton, lang, "Tải tài liệu")}
                </Button>
              }
            />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{pick(t.colName, lang, "Tên tài liệu")}</TableHead>
                  <TableHead>{pick(t.colType, lang, "Loại")}</TableHead>
                  <TableHead>{pick(t.colUploadedAt, lang, "Ngày tải lên")}</TableHead>
                  <TableHead>{pick(t.colStatus, lang, "Trạng thái")}</TableHead>
                  <TableHead className="text-right">{pick(t.colAction, lang, "Hành động")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((doc) => {
                  const Icon = typeIcon[doc.type];
                  return (
                    <TableRow key={doc.id}>
                      <TableCell>
                        <div className="flex items-center gap-2.5">
                          <Icon className="h-4 w-4 text-[var(--color-text-secondary)]" />
                          <span className="font-medium">{doc.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-[var(--color-text-secondary)]">
                        {pick(documentTypeLabel[doc.type], lang, documentTypeLabel[doc.type].vi)}
                      </TableCell>
                      <TableCell className="text-[var(--color-text-secondary)]">{doc.uploadedAt}</TableCell>
                      <TableCell>
                        <Badge variant={statusVariant[doc.status]}>{pick(statusLabel[doc.status], lang, statusLabel[doc.status].vi)}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <button
                            className="rounded-md p-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-secondary)]"
                            aria-label={pick(t.download, lang, "Tải xuống")}
                          >
                            <Download className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => setPendingDelete(doc)}
                            className="rounded-md p-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-error)]/10 hover:text-[var(--color-error)]"
                            aria-label={pick(t.delete, lang, "Xóa")}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <UploadDocumentModal
        open={uploadOpen}
        onOpenChange={setUploadOpen}
        onUploaded={(doc) => setDocuments((prev) => [doc, ...prev])}
      />

      <ConfirmDialog
        open={!!pendingDelete}
        onOpenChange={(open) => !open && setPendingDelete(null)}
        title={pick(t.confirmDeleteTitle, lang, "Xóa tài liệu?")}
        description={t.confirmDeleteDesc[lang](pendingDelete?.name)}
        confirmLabel={pick(t.delete, lang, "Xóa")}
        onConfirm={() => {
          setDocuments((prev) => prev.filter((d) => d.id !== pendingDelete?.id));
          setPendingDelete(null);
        }}
      />
    </div>
  );
}
