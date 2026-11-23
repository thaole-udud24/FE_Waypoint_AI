import {
  LayoutDashboard,
  CalendarDays,
  FileStack,
  FileText,
  Clock,
  ShieldCheck,
  LineChart,
  Wallet,
  Users,
  Archive,
  MessageCircleQuestion,
  FolderCheck,
  Scale,
  Bell,
  Package,
  Settings,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { Lang } from "@/lib/i18n";

export interface NavItem {
  to: string;
  label: string; // tiếng Việt (mặc định/fallback)
  i18n?: Partial<Record<Lang, string>>;
  icon: LucideIcon;
  moduleCode: string;
}

export interface NavGroup {
  label: string;
  i18n?: Partial<Record<Lang, string>>;
  items: NavItem[];
}

// Nhóm theo hành trình nghiệp vụ thật của người lao động (BRD Waypoint AI),
// không dùng tên nhóm generic Workspace/Operations/System.
export const navGroups: NavGroup[] = [
  {
    label: "TỔNG QUAN",
    i18n: { en: "OVERVIEW", ja: "概要" },
    items: [
      { to: "/home", label: "Trang chủ", i18n: { en: "Home", ja: "ホーム" }, icon: LayoutDashboard, moduleCode: "HOME" },
      {
        to: "/calendar",
        label: "Lịch & việc cần làm",
        i18n: { en: "Calendar & tasks", ja: "予定・タスク" },
        icon: CalendarDays,
        moduleCode: "HOME",
      },
    ],
  },
  {
    label: "HỒ SƠ & GIỜ LÀM",
    i18n: { en: "RECORDS & HOURS", ja: "書類・勤務" },
    items: [
      { to: "/documents", label: "Tài liệu", i18n: { en: "Documents", ja: "書類" }, icon: FileStack, moduleCode: "MOD_002" },
      { to: "/contract", label: "Hợp đồng", i18n: { en: "Contract", ja: "契約" }, icon: FileText, moduleCode: "MOD_003" },
      { to: "/work-log", label: "Giờ làm", i18n: { en: "Work log", ja: "勤務" }, icon: Clock, moduleCode: "MOD_004" },
    ],
  },
  {
    label: "LƯƠNG & CHI PHÍ",
    i18n: { en: "PAY & EXPENSES", ja: "給与・費用" },
    items: [
      { to: "/payguard", label: "Đối chiếu lương", i18n: { en: "Pay reconciliation", ja: "照合" }, icon: ShieldCheck, moduleCode: "MOD_005" },
      { to: "/salary-twin", label: "Mô phỏng thu nhập", i18n: { en: "Income simulator", ja: "試算" }, icon: LineChart, moduleCode: "MOD_006" },
      { to: "/cost-ledger", label: "Chi phí", i18n: { en: "Expenses", ja: "費用" }, icon: Wallet, moduleCode: "MOD_010" },
      { to: "/debt-family", label: "Nợ & gia đình", i18n: { en: "Debt & family", ja: "家族" }, icon: Users, moduleCode: "MOD_011" },
    ],
  },
  {
    label: "BẰNG CHỨNG & HỖ TRỢ",
    i18n: { en: "EVIDENCE & SUPPORT", ja: "証拠・支援" },
    items: [
      { to: "/evidence", label: "Kho bằng chứng", i18n: { en: "Evidence vault", ja: "証拠" }, icon: Archive, moduleCode: "MOD_007" },
      {
        to: "/rights-agent",
        label: "Hỏi đáp quyền lợi",
        i18n: { en: "Rights Q&A", ja: "相談" },
        icon: MessageCircleQuestion,
        moduleCode: "MOD_009",
      },
      { to: "/case-pack", label: "Hồ sơ nhờ hỗ trợ", i18n: { en: "Case Pack", ja: "支援" }, icon: FolderCheck, moduleCode: "MOD_013" },
      { to: "/agent", label: "Trợ lý AI", i18n: { en: "AI Assistant", ja: "AIアシスタント" }, icon: Sparkles, moduleCode: "MOD_009" },
    ],
  },
  {
    label: "PHÁP LUẬT",
    i18n: { en: "LEGAL", ja: "法令" },
    items: [{ to: "/legal-compass", label: "Tra cứu luật", i18n: { en: "Legal compass", ja: "法令" }, icon: Scale, moduleCode: "MOD_008" }],
  },
  {
    label: "TÀI KHOẢN",
    i18n: { en: "ACCOUNT", ja: "設定" },
    items: [
      { to: "/notifications", label: "Thông báo", i18n: { en: "Notifications", ja: "通知" }, icon: Bell, moduleCode: "MOD_015" },
      { to: "/plan", label: "Gói dịch vụ", i18n: { en: "Plan", ja: "プラン" }, icon: Package, moduleCode: "MOD_016" },
      { to: "/settings", label: "Tài khoản", i18n: { en: "Account", ja: "設定" }, icon: Settings, moduleCode: "MOD_001" },
    ],
  },
];

export const allNavItems = navGroups.flatMap((g) => g.items);
