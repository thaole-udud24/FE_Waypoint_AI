import type { Lang } from "@/lib/i18n";

type Tri = Record<Lang, string>;

export interface CalendarEvent {
  id: string;
  day: number;
  label: Tri;
  kind: "worklog" | "payday" | "share_expiry" | "law_update";
}

// shortcut: dữ liệu mẫu tháng 11/2026, thay bằng gọi API Lịch tuần/nhắc việc (FUN_035) khi backend sẵn sàng.
export const mockCalendarEvents: CalendarEvent[] = [
  { id: "ev1", day: 5, label: { vi: "Ngày trả lương kỳ 10", en: "Payday — period 10", ja: "10期の給料日" }, kind: "payday" },
  { id: "ev2", day: 12, label: { vi: "Hết hạn chia sẻ Case Pack", en: "Case Pack share expires", ja: "ケース共有期限" }, kind: "share_expiry" },
  { id: "ev3", day: 20, label: { vi: "Cập nhật Law Pack v2026.10", en: "Law Pack v2026.10 update", ja: "Law Pack v2026.10更新" }, kind: "law_update" },
  { id: "ev4", day: 23, label: { vi: "Hôm nay", en: "Today", ja: "本日" }, kind: "worklog" },
];

export const eventKindColor: Record<CalendarEvent["kind"], string> = {
  worklog: "var(--color-primary)",
  payday: "var(--color-teal)",
  share_expiry: "var(--color-attention)",
  law_update: "var(--color-gold)",
};

export interface TaskCardData {
  id: string;
  code: string;
  title: Tri;
  meta: Tri;
  progress: number;
  tagLabel: Tri;
  tagColor: string;
  assignee: string;
}

export interface TaskColumn {
  id: string;
  label: Tri;
  accent: string;
  cards: TaskCardData[];
}

export const initialTaskColumns: TaskColumn[] = [
  {
    id: "todo",
    label: { vi: "Chưa bắt đầu", en: "Not started", ja: "未着手" },
    accent: "#ff7fb0",
    cards: [
      {
        id: "tk1",
        code: "WRK-41",
        title: { vi: "Ghi giờ làm tuần này", en: "Log hours this week", ja: "今週の勤務を記録" },
        tagLabel: { vi: "Giờ làm", en: "Work log", ja: "勤務" },
        tagColor: "#5b7cff",
        progress: 10,
        meta: { vi: "Hạn: hôm nay", en: "Due: today", ja: "期限：本日" },
        assignee: "B",
      },
      {
        id: "tk2",
        code: "WRK-38",
        title: { vi: "Bổ sung bảng chấm công gốc", en: "Attach the original timesheet", ja: "原本のタイムカードを添付" },
        tagLabel: { vi: "Hồ sơ hỗ trợ", en: "Case Pack", ja: "支援ケース" },
        tagColor: "#ff7fb0",
        progress: 0,
        meta: { vi: "Hạn: 2 ngày", en: "Due: 2 days", ja: "期限：2日後" },
        assignee: "B",
      },
    ],
  },
  {
    id: "doing",
    label: { vi: "Đang làm", en: "In progress", ja: "進行中" },
    accent: "#f2b100",
    cards: [
      {
        id: "tk3",
        code: "WRK-35",
        title: { vi: "Soạn thư hỏi lại mức phụ trội", en: "Draft a letter about the overtime rate", ja: "割増率についての文書を作成" },
        tagLabel: { vi: "Hợp đồng", en: "Contract", ja: "契約" },
        tagColor: "#f2b100",
        progress: 55,
        meta: { vi: "Hạn: 4 ngày", en: "Due: 4 days", ja: "期限：4日後" },
        assignee: "B",
      },
      {
        id: "tk4",
        code: "WRK-33",
        title: { vi: "Đối chiếu kỳ lương 11/2026", en: "Reconcile pay — period 11/2026", ja: "2026年11月分の給与照合" },
        tagLabel: { vi: "PayGuard", en: "PayGuard", ja: "PayGuard" },
        tagColor: "#5b7cff",
        progress: 70,
        meta: { vi: "Hạn: 6 ngày", en: "Due: 6 days", ja: "期限：6日後" },
        assignee: "B",
      },
    ],
  },
  {
    id: "done",
    label: { vi: "Hoàn thành", en: "Done", ja: "完了" },
    accent: "#2fbf8a",
    cards: [
      {
        id: "tk5",
        code: "WRK-30",
        title: { vi: "Tải phiếu lương tháng 11", en: "Upload November payslip", ja: "11月の給与明細をアップロード" },
        tagLabel: { vi: "Tài liệu", en: "Document", ja: "書類" },
        tagColor: "#2fbf8a",
        progress: 100,
        meta: { vi: "Đã xong", en: "Done", ja: "完了" },
        assignee: "B",
      },
    ],
  },
];
