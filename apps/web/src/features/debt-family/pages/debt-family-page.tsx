import { Users, CalendarClock, Landmark } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/domain/page-header";
import { GanttTimeline, type GanttRow } from "@/components/domain/gantt-timeline";
import { useLanguage, pick } from "@/lib/i18n";
import { mockDebts } from "../data/mock-debts";

const DEBT_COLORS = ["var(--color-gold)", "var(--color-primary)"];
const GANTT_MONTHS = 14;

const t = {
  totalRemaining: { vi: "Tổng nợ còn lại", en: "Total remaining debt", ja: "残債合計" },
  monthlyPayment: { vi: "Trả hằng tháng", en: "Monthly payment", ja: "月々の返済額" },
  repaymentPlan: {
    vi: (m: number) => `Kế hoạch trả nợ — ${m} tháng tới`,
    en: (m: number) => `Repayment plan — next ${m} months`,
    ja: (m: number) => `返済計画 — 今後${m}か月`,
  },
  nextDue: { vi: "Kỳ trả tiếp theo", en: "Next due", ja: "次回返済日" },
  remainingOf: { vi: "còn lại / ", en: "remaining / ", ja: "残り / " },
  paidPercent: { vi: (p: number) => `Đã trả ${p}%`, en: (p: number) => `${p}% paid`, ja: (p: number) => `${p}%返済済み` },
  perMonth: { vi: "/tháng", en: "/month", ja: "/月" },
};

export function DebtFamilyPage() {
  const { lang } = useLanguage();
  const totalRemaining = mockDebts.reduce((sum, d) => sum + d.remaining, 0);
  const totalMonthly = mockDebts.reduce((sum, d) => sum + d.monthlyPayment, 0);

  const ganttRows: GanttRow[] = mockDebts.map((debt, i) => ({
    id: debt.id,
    label: pick(debt.label, lang, debt.label.vi),
    subtitle: `¥${debt.monthlyPayment.toLocaleString("en-US")}${pick(t.perMonth, lang, "/tháng")}`,
    startMonth: 0,
    months: Math.min(Math.ceil(debt.remaining / debt.monthlyPayment), GANTT_MONTHS),
    color: DEBT_COLORS[i % DEBT_COLORS.length],
  }));

  return (
    <div className="space-y-5">
      <PageHeader
        title="Nợ & gia đình"
        kanji="家族"
        subtitle="Theo dõi các khoản nợ và nghĩa vụ trả hằng tháng, đối chiếu với thu nhập thực nhận."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-text-secondary)]">
              {pick(t.totalRemaining, lang, "Tổng nợ còn lại")}
            </p>
            <p className="mt-1 font-[var(--font-numeric)] text-[length:var(--font-size-numeric)] font-semibold">
              ¥{totalRemaining.toLocaleString("en-US")}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-text-secondary)]">
              {pick(t.monthlyPayment, lang, "Trả hằng tháng")}
            </p>
            <p className="mt-1 font-[var(--font-numeric)] text-[length:var(--font-size-numeric)] font-semibold">
              ¥{totalMonthly.toLocaleString("en-US")}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <p className="mb-3 text-sm font-medium text-[var(--color-text-primary)]">{t.repaymentPlan[lang](GANTT_MONTHS)}</p>
          <GanttTimeline rows={ganttRows} totalMonths={GANTT_MONTHS} />
        </CardContent>
      </Card>

      <div className="space-y-3">
        {mockDebts.map((debt) => {
          const progress = Math.round(((debt.total - debt.remaining) / debt.total) * 100);
          return (
            <Card key={debt.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-[var(--color-gold)]/20 p-2">
                      <Landmark className="h-4 w-4 text-[var(--color-gold)]" />
                    </div>
                    <div>
                      <p className="font-medium text-[var(--color-text-primary)]">{pick(debt.label, lang, debt.label.vi)}</p>
                      <p className="mt-0.5 flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)]">
                        <Users className="h-3 w-3" /> {pick(debt.lender, lang, debt.lender.vi)}
                      </p>
                      <p className="mt-0.5 flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)]">
                        <CalendarClock className="h-3 w-3" /> {pick(t.nextDue, lang, "Kỳ trả tiếp theo")}: {debt.dueDate} · ¥
                        {debt.monthlyPayment.toLocaleString("en-US")}
                      </p>
                    </div>
                  </div>
                  <p className="text-right font-[var(--font-numeric)] text-sm font-semibold text-[var(--color-text-primary)]">
                    ¥{debt.remaining.toLocaleString("en-US")}
                    <span className="block text-xs font-normal text-[var(--color-text-disabled)]">
                      {pick(t.remainingOf, lang, "còn lại / ")}¥{debt.total.toLocaleString("en-US")}
                    </span>
                  </p>
                </div>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[var(--color-surface-secondary)]">
                  <div className="h-full bg-[var(--color-gold)]" style={{ width: `${progress}%` }} />
                </div>
                <p className="mt-1 text-xs text-[var(--color-text-disabled)]">{t.paidPercent[lang](progress)}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
