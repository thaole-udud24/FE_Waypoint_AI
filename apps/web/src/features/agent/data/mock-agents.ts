import type { Lang } from "@/lib/i18n";
import { FileText, Wallet, ShieldCheck, Scale, Users, Archive, type LucideIcon } from "lucide-react";

type Tri = Record<Lang, string>;

export type AgentStatus = "idle" | "running" | "needs_approval";

export interface AgentModel {
  id: string;
  name: Tri;
  description: Tri;
  icon: LucideIcon;
  status: AgentStatus;
}

// 6 model agent cố định theo đặc tả — không được thiếu cái nào (UI_SCREEN_SPEC mục 2.1, SCR_120).
export const sixAgentModels: AgentModel[] = [
  {
    id: "contract",
    name: { vi: "Hợp đồng", en: "Contract", ja: "契約" },
    description: { vi: "Đọc và gắn nhãn luật cho điều khoản hợp đồng.", en: "Reads and law-labels contract clauses.", ja: "契約条項を読み取り、法令ラベルを付与。" },
    icon: FileText,
    status: "idle",
  },
  {
    id: "cost",
    name: { vi: "Chi phí đi làm", en: "Work-related costs", ja: "就労費用" },
    description: { vi: "Theo dõi trần phí dịch vụ và chi phí phát sinh.", en: "Tracks service fee caps and incurred costs.", ja: "サービス料上限と発生費用を追跡。" },
    icon: Wallet,
    status: "idle",
  },
  {
    id: "payguard",
    name: { vi: "Đối chiếu lương", en: "Pay reconciliation", ja: "給与照合" },
    description: { vi: "So khớp hợp đồng, giờ làm và phiếu lương.", en: "Matches contract, hours and payslip.", ja: "契約・勤務時間・給与明細を照合。" },
    icon: ShieldCheck,
    status: "running",
  },
  {
    id: "law_watch",
    name: { vi: "Canh luật", en: "Law watch", ja: "法令監視" },
    description: { vi: "Theo dõi thay đổi luật từ nguồn chính thức.", en: "Monitors legal changes from official sources.", ja: "公式情報源からの法令変更を監視。" },
    icon: Scale,
    status: "idle",
  },
  {
    id: "support_family",
    name: { vi: "Hỗ trợ / Nợ / Gia đình", en: "Support / Debt / Family", ja: "支援・負債・家族" },
    description: { vi: "Theo dõi kế hoạch trả nợ và hồ sơ nhờ hỗ trợ.", en: "Tracks repayment plans and support cases.", ja: "返済計画と支援ケースを追跡。" },
    icon: Users,
    status: "needs_approval",
  },
  {
    id: "evidence_case",
    name: { vi: "Bằng chứng & Hồ sơ", en: "Evidence & Case", ja: "証拠・ケース" },
    description: { vi: "Gắn thẻ, xác minh toàn vẹn bằng chứng.", en: "Tags and verifies evidence integrity.", ja: "証拠へのタグ付けと完全性の検証。" },
    icon: Archive,
    status: "idle",
  },
];

export interface AgentApproval {
  id: string;
  agentId: string;
  description: Tri;
  autonomyLevel: 0 | 1 | 2;
  hoursLeft: number;
}

export const mockApprovals: AgentApproval[] = [
  {
    id: "ap1",
    agentId: "support_family",
    description: {
      vi: "Soạn thư hỏi lại mức phụ trội làm thêm gửi tới phòng nhân sự.",
      en: "Draft a letter to HR querying the overtime premium rate.",
      ja: "残業割増率についてHRへ問い合わせる文書を作成。",
    },
    autonomyLevel: 1,
    hoursLeft: 42,
  },
];

export interface AgentHistoryEntry {
  id: string;
  agentId: string;
  action: Tri;
  decision: "approved" | "rejected" | "auto";
  time: string;
}

export const mockAgentHistory: AgentHistoryEntry[] = [
  { id: "h1", agentId: "payguard", action: { vi: "Chạy đối chiếu kỳ 11/2026", en: "Ran reconciliation for period 11/2026", ja: "2026年11月分の照合を実行" }, decision: "auto", time: "23/11/2026 09:00" },
  { id: "h2", agentId: "evidence_case", action: { vi: "Xác minh toàn vẹn 4 bằng chứng", en: "Verified integrity of 4 evidence items", ja: "証拠4件の完全性を検証" }, decision: "auto", time: "22/11/2026 14:12" },
  { id: "h3", agentId: "law_watch", action: { vi: "Đề xuất cập nhật lương tối thiểu Tokyo", en: "Proposed Tokyo minimum wage update", ja: "東京都最低賃金の更新を提案" }, decision: "approved", time: "20/11/2026 08:30" },
];
