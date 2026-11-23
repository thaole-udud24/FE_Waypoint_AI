import { useMemo, useState } from "react";
import { Plus, Wallet, Home, Utensils, Train, Send, MoreHorizontal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/domain/page-header";
import { useLanguage, pick } from "@/lib/i18n";
import { AddExpenseModal } from "../components/add-expense-modal";
import { type Expense, type ExpenseCategory, expenseCategoryLabel, mockExpenses } from "../data/mock-expenses";

const categoryIcon: Record<ExpenseCategory, typeof Home> = {
  housing: Home,
  food: Utensils,
  transport: Train,
  remittance: Send,
  other: MoreHorizontal,
};

const t = {
  addButton: { vi: "Thêm chi phí", en: "Add expense", ja: "支出を追加" },
  totalThisMonth: { vi: "Tổng chi tháng này", en: "Total this month", ja: "今月の合計支出" },
  emptyTitle: { vi: "Chưa có khoản chi nào", en: "No expenses yet", ja: "支出記録がありません" },
  emptyDesc: { vi: "Thêm khoản chi để theo dõi dòng tiền hằng tháng.", en: "Add an expense to track your monthly cash flow.", ja: "支出を追加して月々の資金繰りを把握しましょう。" },
  colLabel: { vi: "Nội dung", en: "Description", ja: "内容" },
  colCategory: { vi: "Danh mục", en: "Category", ja: "カテゴリー" },
  colDate: { vi: "Ngày chi", en: "Date", ja: "支出日" },
  colAmount: { vi: "Số tiền", en: "Amount", ja: "金額" },
};

export function CostLedgerPage() {
  const { lang } = useLanguage();
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses);
  const [addOpen, setAddOpen] = useState(false);

  const total = useMemo(() => expenses.reduce((sum, e) => sum + e.amount, 0), [expenses]);

  const byCategory = useMemo(() => {
    const map = new Map<ExpenseCategory, number>();
    for (const e of expenses) map.set(e.category, (map.get(e.category) ?? 0) + e.amount);
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }, [expenses]);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Chi phí"
        kanji="費用"
        subtitle="Theo dõi các khoản chi hằng tháng để cân đối với thu nhập thực nhận."
        actions={
          <Button onClick={() => setAddOpen(true)}>
            <Plus className="h-4 w-4" /> {pick(t.addButton, lang, "Thêm chi phí")}
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Card className="overflow-hidden border-none bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white sm:col-span-2 lg:col-span-1">
          <CardContent className="pt-6">
            <p className="text-xs font-medium uppercase tracking-wide text-white/80">{pick(t.totalThisMonth, lang, "Tổng chi tháng này")}</p>
            <p className="mt-1 font-[var(--font-numeric)] text-[length:var(--font-size-numeric)] font-semibold">
              ¥{total.toLocaleString("en-US")}
            </p>
          </CardContent>
        </Card>
        {byCategory.map(([category, amount]) => {
          const Icon = categoryIcon[category];
          return (
            <Card key={category}>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-[var(--color-text-secondary)]">
                  <Icon className="h-3.5 w-3.5" /> {pick(expenseCategoryLabel[category], lang, expenseCategoryLabel[category].vi)}
                </div>
                <p className="mt-1 font-[var(--font-numeric)] text-lg font-semibold text-[var(--color-text-primary)]">
                  ¥{amount.toLocaleString("en-US")}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardContent className="p-0">
          {expenses.length === 0 ? (
            <EmptyState
              title={pick(t.emptyTitle, lang, "Chưa có khoản chi nào")}
              description={pick(t.emptyDesc, lang, t.emptyDesc.vi)}
              icon={<Wallet className="h-10 w-10" />}
              action={
                <Button className="mt-2" onClick={() => setAddOpen(true)}>
                  {pick(t.addButton, lang, "Thêm chi phí")}
                </Button>
              }
            />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{pick(t.colLabel, lang, "Nội dung")}</TableHead>
                  <TableHead>{pick(t.colCategory, lang, "Danh mục")}</TableHead>
                  <TableHead>{pick(t.colDate, lang, "Ngày chi")}</TableHead>
                  <TableHead className="text-right">{pick(t.colAmount, lang, "Số tiền")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenses.map((e) => (
                  <TableRow key={e.id}>
                    <TableCell className="font-medium">{e.label}</TableCell>
                    <TableCell className="text-[var(--color-text-secondary)]">{pick(expenseCategoryLabel[e.category], lang, expenseCategoryLabel[e.category].vi)}</TableCell>
                    <TableCell className="text-[var(--color-text-secondary)]">{e.date}</TableCell>
                    <TableCell className="text-right font-[var(--font-numeric)]">
                      ¥{e.amount.toLocaleString("en-US")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <AddExpenseModal open={addOpen} onOpenChange={setAddOpen} onAdded={(e) => setExpenses((prev) => [e, ...prev])} />
    </div>
  );
}
