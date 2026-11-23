export interface TestCase {
  id: string;
  input: string;
  expected: string;
  result?: "pass" | "fail";
}

export interface LawRule {
  id: string;
  code: string;
  topic: string;
  corridor: string;
  title: string;
  source: string;
  effectiveFrom: string;
  testCases: TestCase[];
}

// shortcut: dữ liệu mẫu, thay bằng gọi API soạn quy tắc (FUN_099-103) khi backend sẵn sàng.
export const mockDraftRule: LawRule = {
  id: "r1",
  code: "RULE_OT_NIGHT_135",
  topic: "Phụ trội làm thêm giờ đêm",
  corridor: "VN-JP",
  title: "Phụ trội tối thiểu 135% cho giờ làm đêm (22h–5h)",
  source: "Điều 37 Luật Tiêu chuẩn Lao động Nhật Bản",
  effectiveFrom: "01/04/2026",
  testCases: [
    { id: "tc1", input: "Giờ thường 1300¥/h, 3h đêm", expected: "5,265¥", result: "pass" },
    { id: "tc2", input: "Giờ thường 1000¥/h, 0h đêm", expected: "0¥", result: "pass" },
  ],
};

export interface AuditLogEntry {
  id: string;
  actor: string;
  action: string;
  target: string;
  result: "success" | "failure";
  time: string;
}

export const mockAuditLog: AuditLogEntry[] = [
  { id: "a1", actor: "ADM Huy", action: "Phát hành phiên bản v2026.10", target: "Law Pack VN-JP", result: "success", time: "02/11/2026 10:02" },
  { id: "a2", actor: "ADM Lan", action: "Duyệt quy tắc RULE_PAID_LEAVE_10D", target: "Rule", result: "success", time: "30/10/2026 15:40" },
  { id: "a3", actor: "ADM Huy", action: "Mời cán bộ canbo@abc-union.jp", target: "Organization ABC", result: "success", time: "28/10/2026 09:21" },
  { id: "a4", actor: "SYSTEM", action: "Đồng bộ nguồn luật thất bại", target: "e-Gov API", result: "failure", time: "27/10/2026 03:00" },
];

export interface LawProposal {
  id: string;
  source: string;
  detectedAt: string;
  summary: string;
  affectedRule?: string;
}

export const mockLawProposals: LawProposal[] = [
  {
    id: "p1",
    source: "e-Gov · Bộ Y tế, Lao động và Phúc lợi",
    detectedAt: "20/11/2026",
    summary: "Mức lương tối thiểu vùng Tokyo dự kiến tăng từ 1,113¥ lên 1,163¥/giờ, hiệu lực 01/10/2027.",
    affectedRule: "RULE_MIN_WAGE_TOKYO",
  },
  {
    id: "p2",
    source: "Cổng thông tin Chính phủ Việt Nam",
    detectedAt: "15/11/2026",
    summary: "Nghị định mới về chi phí dịch vụ xuất khẩu lao động, cần rà soát trần phí môi giới.",
  },
];
