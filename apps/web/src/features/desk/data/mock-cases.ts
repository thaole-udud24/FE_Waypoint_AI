export type CaseStatus = "new" | "processing" | "waiting_worker" | "closed";

export interface DeskCase {
  id: string;
  code: string;
  issueType: string;
  receivedAt: string;
  status: CaseStatus;
  assignee?: string;
  shareExpiresInDays: number;
  summary: string;
  evidenceCount: number;
}

export const caseStatusLabel: Record<CaseStatus, string> = {
  new: "Mới",
  processing: "Đang xử lý",
  waiting_worker: "Chờ người lao động",
  closed: "Đã đóng",
};

// shortcut: dữ liệu mẫu, thay bằng gọi API Desk (FUN_118-123) khi backend sẵn sàng.
export const mockCases: DeskCase[] = [
  {
    id: "c1",
    code: "CASE-2026-114",
    issueType: "Lệch phụ trội làm thêm",
    receivedAt: "22/11/2026",
    status: "new",
    shareExpiresInDays: 12,
    summary: "Phát hiện phụ trội làm thêm đêm tính thiếu ¥18,400 trong kỳ 11/2026.",
    evidenceCount: 4,
  },
  {
    id: "c2",
    code: "CASE-2026-109",
    issueType: "Hợp đồng không rõ ràng",
    receivedAt: "18/11/2026",
    status: "processing",
    assignee: "Cán bộ Tanaka",
    shareExpiresInDays: 6,
    summary: "Mức lương cam kết miệng khác với hợp đồng ký.",
    evidenceCount: 2,
  },
  {
    id: "c3",
    code: "CASE-2026-098",
    issueType: "Giữ giấy tờ tùy thân",
    receivedAt: "10/11/2026",
    status: "waiting_worker",
    assignee: "Cán bộ Linh",
    shareExpiresInDays: 2,
    summary: "Đã gửi đề nghị bổ sung thông tin, chờ người lao động trả lời.",
    evidenceCount: 3,
  },
];
