import type { ReactNode } from "react";
import type { Lang } from "@/lib/i18n";

interface Entry {
  en: { title: string; subtitle?: string };
  ja: { title: string; subtitle?: string };
}

// Bản dịch tiêu đề/mô tả PageHeader theo route — tra trung tâm tại đây thay
// vì sửa từng trang, vi giữ nguyên prop gốc (không cần liệt kê).
export const pageHeaderI18n: Record<string, Entry> = {
  "/home": { en: { title: "Home" }, ja: { title: "ホーム" } },
  "/calendar": {
    en: { title: "Calendar & tasks", subtitle: "Drag events between days, drag task cards to change status." },
    ja: { title: "予定・タスク", subtitle: "イベントを別の日にドラッグ、タスクはカードをドラッグしてステータス変更。" },
  },
  "/documents": {
    en: { title: "Documents", subtitle: "Payslips, contracts and ID documents you've uploaded." },
    ja: { title: "書類", subtitle: "アップロードした給与明細・契約書・本人確認書類。" },
  },
  "/contract": {
    en: { title: "Contract", subtitle: "Terms automatically extracted from your uploaded contract." },
    ja: { title: "契約", subtitle: "アップロードした契約書から自動抽出した条項。" },
  },
  "/work-log": {
    en: { title: "Work log", subtitle: "Daily work-hour log — used to reconcile with pay (PayGuard AI)." },
    ja: { title: "勤務", subtitle: "日々の勤務記録 — 給与照合（PayGuard AI）に使用。" },
  },
  "/payguard": {
    en: { title: "Pay reconciliation", subtitle: "Match payslip against contract and work log — auto-detect mismatches." },
    ja: { title: "照合", subtitle: "給与明細と契約・勤務記録を照合し、不一致を自動検出。" },
  },
  "/salary-twin": {
    en: { title: "Income simulator", subtitle: "Try changing overtime hours or bonus months to see projected income change." },
    ja: { title: "試算", subtitle: "残業時間や賞与月数を変えて、見込み収入の変化を試算。" },
  },
  "/cost-ledger": {
    en: { title: "Expenses", subtitle: "Track monthly expenses to balance against your net income." },
    ja: { title: "費用", subtitle: "月々の支出を記録し、手取り収入とのバランスを確認。" },
  },
  "/debt-family": {
    en: { title: "Debt & family", subtitle: "Track debts and monthly obligations against your net income." },
    ja: { title: "家族", subtitle: "負債と毎月の返済義務を、手取り収入と照らして管理。" },
  },
  "/evidence": {
    en: { title: "Evidence vault", subtitle: "Keep photos, recordings and notes as evidence for pay or hours disputes." },
    ja: { title: "証拠", subtitle: "給与・勤務時間の証拠となる写真、録音、メモを保管。" },
  },
  "/rights-agent": {
    en: { title: "Rights Q&A", subtitle: "Ask about your labor rights — answers grounded in the Law Pack and your contract." },
    ja: { title: "相談", subtitle: "労働者の権利について質問 — Law Packと契約書に基づいて回答。" },
  },
  "/case-pack": {
    en: { title: "Case Pack", subtitle: "Bundle evidence, pay reconciliation and contract into a case to share with a union or lawyer." },
    ja: { title: "支援", subtitle: "証拠・給与照合・契約をまとめ、組合や弁護士へ共有するケースを作成。" },
  },
  "/legal-compass": {
    en: { title: "Legal compass", subtitle: "Law Pack VN → JP · version v2026.10 · updated 02/11/2026" },
    ja: { title: "法令", subtitle: "Law Pack ベトナム→日本・バージョン v2026.10・更新日 2026/11/02" },
  },
  "/notifications": {
    en: { title: "Notifications" },
    ja: { title: "通知" },
  },
  "/plan": {
    en: { title: "Plan", subtitle: "Choose a plan to unlock features that protect your labor rights." },
    ja: { title: "プラン", subtitle: "労働者の権利を守る機能を使うためのプランを選択。" },
  },
  "/settings": {
    en: { title: "Account", subtitle: "Manage your personal information and notification preferences." },
    ja: { title: "設定", subtitle: "個人情報と通知設定を管理。" },
  },
};

export function pickPageHeader(
  pathname: string,
  lang: Lang,
  fallback: { title: string; subtitle?: ReactNode }
): { title: ReactNode; subtitle?: ReactNode } {
  const entry = pageHeaderI18n[pathname];
  if (!entry || lang === "vi") return fallback;
  const t = entry[lang];
  return { title: t.title, subtitle: t.subtitle ?? fallback.subtitle };
}
