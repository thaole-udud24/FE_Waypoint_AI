import type { Lang } from "@/lib/i18n";

type Tri = Record<Lang, string>;

export interface Debt {
  id: string;
  label: Tri;
  lender: Tri;
  remaining: number;
  total: number;
  monthlyPayment: number;
  dueDate: string;
}

// shortcut: dữ liệu mẫu, thay bằng gọi MOD_011 API khi backend sẵn sàng.
export const mockDebts: Debt[] = [
  {
    id: "d1",
    label: { vi: "Vay chi phí xuất khẩu lao động", en: "Labor export fee loan", ja: "技能実習渡航費ローン" },
    lender: { vi: "Công ty môi giới XYZ", en: "XYZ Brokerage Co.", ja: "XYZ仲介会社" },
    remaining: 420000,
    total: 600000,
    monthlyPayment: 30000,
    dueDate: "05/12/2026",
  },
  {
    id: "d2",
    label: { vi: "Vay người thân ở quê", en: "Loan from family back home", ja: "故郷の家族からの借入" },
    lender: { vi: "Gia đình", en: "Family", ja: "家族" },
    remaining: 50000,
    total: 100000,
    monthlyPayment: 10000,
    dueDate: "01/12/2026",
  },
];
