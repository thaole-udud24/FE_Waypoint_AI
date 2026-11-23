export type ReconcileStatus = "matched" | "mismatch" | "checking";

export interface ReconcileLine {
  id: string;
  label: string;
  expected: string;
  actual: string;
  status: ReconcileStatus;
  reason?: string;
  formula?: string;
  sources?: string[];
  legalBasis?: { rule: string; article: string; effectiveFrom: string };
}

// shortcut: dữ liệu mẫu, thay bằng gọi MOD_005 API (đối chiếu hợp đồng/giờ làm/phiếu lương) khi backend sẵn sàng.
export const mockPayguard = {
  period: "Kỳ lương 11/2026",
  netExpected: 233000,
  netActual: 214600,
  lines: [
    {
      id: "l1",
      label: "Lương cơ bản",
      expected: "¥198,000",
      actual: "¥198,000",
      status: "matched" as const,
      formula: "198,000¥ (hợp đồng) = 198,000¥ (phiếu lương)",
      sources: ["Hợp đồng tr.1", "Phiếu lương tr.1"],
    },
    {
      id: "l2",
      label: "Phụ cấp nhà ở",
      expected: "¥15,000",
      actual: "¥15,000",
      status: "matched" as const,
      formula: "15,000¥ (hợp đồng) = 15,000¥ (phiếu lương)",
      sources: ["Hợp đồng tr.1", "Phiếu lương tr.1"],
    },
    {
      id: "l3",
      label: "Phụ trội làm thêm (3h đêm)",
      expected: "¥20,000",
      actual: "¥1,600",
      status: "mismatch" as const,
      reason: "Công ty tính phụ trội theo mức 125% thay vì 135% luật định cho giờ đêm.",
      formula: "1,300¥/h × 3h × 135% = 5,265¥ → nhưng phiếu lương chỉ ghi 1,300¥/h × 3h × 125%",
      sources: ["Giờ làm 20/11/2026", "Phiếu lương tr.2"],
      legalBasis: { rule: "Phụ trội làm thêm giờ đêm", article: "Điều 37 Luật Tiêu chuẩn Lao động", effectiveFrom: "01/04/2026" },
    },
    {
      id: "l4",
      label: "Khấu trừ bảo hiểm xã hội",
      expected: "¥18,400",
      actual: "¥18,400",
      status: "matched" as const,
      formula: "18,400¥ (hợp đồng) = 18,400¥ (phiếu lương)",
      sources: ["Phiếu lương tr.2"],
    },
    {
      id: "l5",
      label: "Phiếu lương kỳ này",
      expected: "Đã tải lên",
      actual: "Đang xử lý OCR",
      status: "checking" as const,
      sources: ["Tài liệu đã tải lên 20/11/2026"],
    },
  ] as ReconcileLine[],
};
