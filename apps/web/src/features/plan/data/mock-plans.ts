import type { Lang } from "@/lib/i18n";

type Tri = Record<Lang, string>;

export interface Plan {
  id: string;
  name: Tri;
  price: Tri;
  period: Tri;
  features: Tri[];
  current?: boolean;
  highlight?: boolean;
}

// shortcut: dữ liệu mẫu, thay bằng gọi MOD_016 API khi backend sẵn sàng.
export const mockPlans: Plan[] = [
  {
    id: "free",
    name: { vi: "Cơ bản", en: "Basic", ja: "ベーシック" },
    price: { vi: "¥0", en: "¥0", ja: "¥0" },
    period: { vi: "/tháng", en: "/month", ja: "/月" },
    features: [
      { vi: "Lưu tài liệu & hợp đồng", en: "Store documents & contracts", ja: "書類・契約書の保管" },
      { vi: "Ghi nhật ký giờ làm", en: "Log work hours", ja: "勤務記録" },
      { vi: "Tra cứu luật cơ bản", en: "Basic legal lookup", ja: "基本的な法令検索" },
    ],
    current: true,
  },
  {
    id: "pro",
    name: { vi: "Bảo vệ toàn diện", en: "Full Protection", ja: "フルプロテクション" },
    price: { vi: "¥590", en: "¥590", ja: "¥590" },
    period: { vi: "/tháng", en: "/month", ja: "/月" },
    features: [
      { vi: "Tất cả tính năng Cơ bản", en: "Everything in Basic", ja: "ベーシックの全機能" },
      { vi: "PayGuard AI đối chiếu lương tự động", en: "Automatic pay reconciliation with PayGuard AI", ja: "PayGuard AIによる自動給与照合" },
      { vi: "Hỏi đáp quyền lợi không giới hạn", en: "Unlimited rights Q&A", ja: "無制限の権利相談" },
      { vi: "Tạo hồ sơ nhờ hỗ trợ chia sẻ với nghiệp đoàn", en: "Create Case Packs to share with a union", ja: "組合と共有する支援ケースの作成" },
    ],
    highlight: true,
  },
  {
    id: "team",
    name: { vi: "Nhóm / Nghiệp đoàn", en: "Team / Union", ja: "チーム・組合" },
    price: { vi: "Liên hệ", en: "Contact us", ja: "お問い合わせ" },
    period: { vi: "", en: "", ja: "" },
    features: [
      { vi: "Tất cả tính năng Bảo vệ toàn diện", en: "Everything in Full Protection", ja: "フルプロテクションの全機能" },
      { vi: "Quản lý nhiều hồ sơ lao động", en: "Manage multiple worker cases", ja: "複数の労働者ケースの管理" },
      { vi: "Báo cáo tổng hợp cho nghiệp đoàn", en: "Aggregate reports for unions", ja: "組合向け集計レポート" },
    ],
  },
];
