export type DocumentType = "payslip" | "contract" | "id_card" | "other";
export type DocumentStatus = "verified" | "pending" | "processing";

export interface DocumentItem {
  id: string;
  name: string;
  type: DocumentType;
  status: DocumentStatus;
  uploadedAt: string;
}

export const documentTypeLabel: Record<DocumentType, { vi: string; en: string; ja: string }> = {
  payslip: { vi: "Phiếu lương", en: "Payslip", ja: "給与明細" },
  contract: { vi: "Hợp đồng", en: "Contract", ja: "契約書" },
  id_card: { vi: "Giấy tờ tùy thân", en: "ID document", ja: "本人確認書類" },
  other: { vi: "Khác", en: "Other", ja: "その他" },
};

// shortcut: dữ liệu mẫu, thay bằng gọi MOD_002 API khi backend sẵn sàng.
export const mockDocuments: DocumentItem[] = [
  { id: "doc-1", name: "Phiếu lương kỳ 11/2026.pdf", type: "payslip", status: "verified", uploadedAt: "20/11/2026" },
  { id: "doc-2", name: "Hợp đồng lao động.pdf", type: "contract", status: "verified", uploadedAt: "02/09/2026" },
  { id: "doc-3", name: "Thẻ lưu trú.jpg", type: "id_card", status: "pending", uploadedAt: "15/11/2026" },
  { id: "doc-4", name: "Phiếu lương kỳ 10/2026.pdf", type: "payslip", status: "processing", uploadedAt: "01/11/2026" },
];
