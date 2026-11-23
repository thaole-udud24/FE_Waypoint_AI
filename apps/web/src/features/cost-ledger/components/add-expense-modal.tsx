import { useState } from "react";
import { Modal, ModalContent, ModalTitle, ModalDescription } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useLanguage, pick } from "@/lib/i18n";
import { type Expense, type ExpenseCategory, expenseCategoryLabel } from "../data/mock-expenses";

const t = {
  title: { vi: "Thêm chi phí", en: "Add expense", ja: "支出を追加" },
  desc: { vi: "Ghi lại một khoản chi để theo dõi dòng tiền hằng tháng.", en: "Record an expense to track your monthly cash flow.", ja: "支出を記録して月々の資金繰りを把握しましょう。" },
  label: { vi: "Nội dung", en: "Description", ja: "内容" },
  labelPlaceholder: { vi: "VD: Tiền thuê nhà tháng 12", en: "e.g. December rent", ja: "例：12月分の家賃" },
  category: { vi: "Danh mục", en: "Category", ja: "カテゴリー" },
  amount: { vi: "Số tiền (¥)", en: "Amount (¥)", ja: "金額（円）" },
  date: { vi: "Ngày chi", en: "Date", ja: "支出日" },
  cancel: { vi: "Hủy", en: "Cancel", ja: "キャンセル" },
  save: { vi: "Lưu", en: "Save", ja: "保存" },
};

export function AddExpenseModal({
  open,
  onOpenChange,
  onAdded,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdded: (expense: Expense) => void;
}) {
  const { lang } = useLanguage();
  const [label, setLabel] = useState("");
  const [category, setCategory] = useState<ExpenseCategory>("food");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  function reset() {
    setLabel("");
    setCategory("food");
    setAmount("");
    setDate("");
  }

  function handleSave() {
    const value = Number(amount);
    if (!label || !date || !value) return;
    onAdded({
      id: `e-${Date.now()}`,
      label,
      category,
      amount: value,
      date: new Date(date).toLocaleDateString("vi-VN"),
    });
    reset();
    onOpenChange(false);
  }

  return (
    <Modal
      open={open}
      onOpenChange={(next) => {
        if (!next) reset();
        onOpenChange(next);
      }}
    >
      <ModalContent>
        <ModalTitle>{pick(t.title, lang, "Thêm chi phí")}</ModalTitle>
        <ModalDescription>{pick(t.desc, lang, t.desc.vi)}</ModalDescription>

        <div className="mt-4 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">{pick(t.label, lang, "Nội dung")}</label>
            <Input placeholder={pick(t.labelPlaceholder, lang, t.labelPlaceholder.vi)} value={label} onChange={(e) => setLabel(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">{pick(t.category, lang, "Danh mục")}</label>
              <Select value={category} onValueChange={(v) => setCategory(v as ExpenseCategory)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(expenseCategoryLabel).map(([value, l]) => (
                    <SelectItem key={value} value={value}>
                      {pick(l, lang, l.vi)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">{pick(t.amount, lang, "Số tiền (¥)")}</label>
              <Input type="number" min={0} placeholder="0" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">{pick(t.date, lang, "Ngày chi")}</label>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {pick(t.cancel, lang, "Hủy")}
          </Button>
          <Button onClick={handleSave} disabled={!label || !date || !amount}>
            {pick(t.save, lang, "Lưu")}
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
}
