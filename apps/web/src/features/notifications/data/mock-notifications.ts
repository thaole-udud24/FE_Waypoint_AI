import type { Lang } from "@/lib/i18n";

type Tri = Record<Lang, string>;

export type NotificationKind = "alert" | "info" | "success";

export interface AppNotification {
  id: string;
  kind: NotificationKind;
  title: Tri;
  description: Tri;
  time: Tri;
  read: boolean;
  to?: string;
}

// shortcut: dữ liệu mẫu, thay bằng gọi MOD_015 API khi backend sẵn sàng.
export const mockNotifications: AppNotification[] = [
  {
    id: "n1",
    kind: "alert",
    title: { vi: "Phát hiện lệch lương kỳ 11/2026", en: "Pay mismatch detected — period 11/2026", ja: "2026年11月分の給与不一致を検出" },
    description: {
      vi: "PayGuard AI phát hiện khoản phụ trội làm thêm bị tính thiếu ¥18,400.",
      en: "PayGuard AI found an underpaid overtime premium of ¥18,400.",
      ja: "PayGuard AIが¥18,400の割増賃金未払いを検出しました。",
    },
    time: { vi: "2 giờ trước", en: "2 hours ago", ja: "2時間前" },
    read: false,
    to: "/payguard",
  },
  {
    id: "n2",
    kind: "info",
    title: { vi: "Hợp đồng sắp hết hạn", en: "Contract expiring soon", ja: "契約まもなく満了" },
    description: {
      vi: "Hợp đồng lao động của bạn sẽ hết hạn trong 9 tháng.",
      en: "Your employment contract expires in 9 months.",
      ja: "あなたの雇用契約はあと9か月で満了します。",
    },
    time: { vi: "1 ngày trước", en: "1 day ago", ja: "1日前" },
    read: false,
    to: "/contract",
  },
  {
    id: "n3",
    kind: "success",
    title: { vi: "Hồ sơ nhờ hỗ trợ đã được tiếp nhận", en: "Case Pack received", ja: "支援ケースが受理されました" },
    description: {
      vi: "Nghiệp đoàn hỗ trợ ABC đã xác nhận nhận hồ sơ của bạn.",
      en: "ABC Support Union has confirmed receiving your case.",
      ja: "ABC支援組合があなたのケースを受領したことを確認しました。",
    },
    time: { vi: "3 ngày trước", en: "3 days ago", ja: "3日前" },
    read: true,
    to: "/case-pack",
  },
];
