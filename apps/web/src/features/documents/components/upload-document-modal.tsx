import { useRef, useState } from "react";
import { UploadCloud } from "lucide-react";
import { Modal, ModalContent, ModalTitle, ModalDescription } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useLanguage, pick } from "@/lib/i18n";
import { type DocumentItem, type DocumentType, documentTypeLabel } from "../data/mock-documents";

const t = {
  title: { vi: "Tải tài liệu", en: "Upload document", ja: "書類をアップロード" },
  desc: { vi: "Hỗ trợ PDF, JPG, PNG. Tối đa 10MB.", en: "Supports PDF, JPG, PNG. Max 10MB.", ja: "PDF・JPG・PNG対応。最大10MB。" },
  typeLabel: { vi: "Loại tài liệu", en: "Document type", ja: "書類の種類" },
  dropHint: { vi: "Nhấn để chọn tệp hoặc kéo thả vào đây", en: "Click to choose a file or drag it here", ja: "クリックしてファイルを選択、またはここにドラッグ" },
  cancel: { vi: "Hủy", en: "Cancel", ja: "キャンセル" },
  upload: { vi: "Tải lên", en: "Upload", ja: "アップロード" },
};

export function UploadDocumentModal({
  open,
  onOpenChange,
  onUploaded,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUploaded: (doc: DocumentItem) => void;
}) {
  const { lang } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [type, setType] = useState<DocumentType>("payslip");
  const inputRef = useRef<HTMLInputElement>(null);

  function reset() {
    setFile(null);
    setType("payslip");
  }

  function handleUpload() {
    if (!file) return;
    onUploaded({
      id: `doc-${Date.now()}`,
      name: file.name,
      type,
      status: "pending",
      uploadedAt: new Date().toLocaleDateString("vi-VN"),
    });
    reset();
    onOpenChange(false);
  }

  return (
    <Modal
      open={open}
      onOpenChange={(next) => {
        if (!next) reset();
        onOpenChange(next);
      }}
    >
      <ModalContent>
        <ModalTitle>{pick(t.title, lang, "Tải tài liệu")}</ModalTitle>
        <ModalDescription>{pick(t.desc, lang, t.desc.vi)}</ModalDescription>

        <div className="mt-4 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">{pick(t.typeLabel, lang, "Loại tài liệu")}</label>
            <Select value={type} onValueChange={(v) => setType(v as DocumentType)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(documentTypeLabel).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {pick(label, lang, label.vi)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex w-full flex-col items-center gap-2 rounded-[var(--radius-card)] border-2 border-dashed border-[var(--color-border)] px-4 py-8 text-center hover:border-[var(--color-primary)]"
          >
            <UploadCloud className="h-6 w-6 text-[var(--color-text-secondary)]" />
            <span className="text-sm text-[var(--color-text-primary)]">{file ? file.name : pick(t.dropHint, lang, t.dropHint.vi)}</span>
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </button>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {pick(t.cancel, lang, "Hủy")}
          </Button>
          <Button onClick={handleUpload} disabled={!file}>
            {pick(t.upload, lang, "Tải lên")}
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
}
