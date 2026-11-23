export type ProviderKind = "llm" | "ocr" | "notification";
export type ProviderStatus = "active" | "disabled";

export interface AiProvider {
  id: string;
  name: string;
  kind: ProviderKind;
  priority: number;
  status: ProviderStatus;
}

export const providerKindLabel: Record<ProviderKind, string> = {
  llm: "LLM (trợ lý/giải thích)",
  ocr: "OCR (đọc tài liệu)",
  notification: "Thông báo",
};

// shortcut: dữ liệu mẫu, thay bằng gọi API cấu hình nhà cung cấp (FUN_129) khi backend sẵn sàng.
export const mockAiProviders: AiProvider[] = [
  { id: "p1", name: "Claude (chính)", kind: "llm", priority: 1, status: "active" },
  { id: "p2", name: "Mô hình nội bộ (dự phòng)", kind: "llm", priority: 2, status: "active" },
  { id: "p3", name: "OCR nhà cung cấp A", kind: "ocr", priority: 1, status: "active" },
  { id: "p4", name: "Email/SMS Gateway", kind: "notification", priority: 1, status: "disabled" },
];
