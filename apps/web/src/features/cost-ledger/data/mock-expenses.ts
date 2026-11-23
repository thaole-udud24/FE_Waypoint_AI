export type ExpenseCategory = "housing" | "food" | "transport" | "remittance" | "other";

export interface Expense {
  id: string;
  label: string;
  category: ExpenseCategory;
  amount: number;
  date: string;
}

export const expenseCategoryLabel: Record<ExpenseCategory, { vi: string; en: string; ja: string }> = {
  housing: { vi: "Nhà ở", en: "Housing", ja: "住居" },
  food: { vi: "Ăn uống", en: "Food", ja: "食費" },
  transport: { vi: "Di chuyển", en: "Transport", ja: "交通費" },
  remittance: { vi: "Gửi về gia đình", en: "Remittance", ja: "家族への送金" },
  other: { vi: "Khác", en: "Other", ja: "その他" },
};

// shortcut: dữ liệu mẫu, thay bằng gọi MOD_010 API khi backend sẵn sàng.
export const mockExpenses: Expense[] = [
  { id: "e1", label: "Tiền thuê nhà tháng 11", category: "housing", amount: 45000, date: "05/11/2026" },
  { id: "e2", label: "Chợ & siêu thị", category: "food", amount: 32000, date: "10/11/2026" },
  { id: "e3", label: "Thẻ tàu điện", category: "transport", amount: 9000, date: "01/11/2026" },
  { id: "e4", label: "Gửi về cho mẹ", category: "remittance", amount: 80000, date: "15/11/2026" },
  { id: "e5", label: "Mua sắm cá nhân", category: "other", amount: 12000, date: "18/11/2026" },
];
