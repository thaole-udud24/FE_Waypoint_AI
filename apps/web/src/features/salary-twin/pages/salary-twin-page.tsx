import { useMemo, useState } from "react";
import { Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/domain/page-header";
import { useLanguage, pick } from "@/lib/i18n";
import { ForecastChart } from "../components/forecast-chart";

// shortcut: giả định dựa trên hợp đồng mẫu (MOD_003), thay bằng dữ liệu hợp đồng thật khi có API.
const BASE_SALARY = 198000;
const HOUSING_ALLOWANCE = 15000;
const HOURLY_RATE = BASE_SALARY / (22 * 8);
const OVERTIME_RATE = 1.35;
const MONTHS = 6;

const t = {
  next6: { vi: "Dự kiến 6 kỳ tới", en: "Next 6 periods projection", ja: "今後6期の見込み" },
  monthlyProjected: { vi: "Thu nhập/tháng dự kiến", en: "Projected monthly income", ja: "月収見込み" },
  yearlyEstimate: {
    vi: (v: string) => `Ước tính cho năm: ¥${v}`,
    en: (v: string) => `Yearly estimate: ¥${v}`,
    ja: (v: string) => `年間見込み：¥${v}`,
  },
  overtimePerMonth: { vi: "Giờ làm thêm / tháng", en: "Overtime hours / month", ja: "月間残業時間" },
  bonusPerYear: { vi: "Số tháng thưởng / năm", en: "Bonus months / year", ja: "年間賞与月数" },
  monthsOfSalary: { vi: (n: number) => `${n} tháng lương`, en: (n: number) => `${n} months' pay`, ja: (n: number) => `${n}か月分` },
  disclaimer: {
    vi: "Mô phỏng dựa trên lương cơ bản và mức phụ trội trong hợp đồng hiện tại — chỉ mang tính tham khảo, không thay thế phiếu lương thật.",
    en: "This simulation is based on the base salary and premium rate in your current contract — for reference only, not a substitute for your real payslip.",
    ja: "この試算は現在の契約の基本給と割増率に基づくものです — 参考情報であり、実際の給与明細の代わりにはなりません。",
  },
};

export function SalaryTwinPage() {
  const { lang } = useLanguage();
  const [overtimeHours, setOvertimeHours] = useState(10);
  const [bonusMonths, setBonusMonths] = useState(0);

  const monthlyGross = useMemo(
    () => BASE_SALARY + HOUSING_ALLOWANCE + overtimeHours * HOURLY_RATE * OVERTIME_RATE,
    [overtimeHours]
  );

  const chartData = useMemo(
    () =>
      Array.from({ length: MONTHS }, (_, i) => ({
        period: `T${i + 1}`,
        luong: Math.round(monthlyGross + (i === MONTHS - 1 ? bonusMonths * BASE_SALARY : 0)),
      })),
    [monthlyGross, bonusMonths]
  );

  const yearlyProjection = Math.round(monthlyGross * 12 + bonusMonths * BASE_SALARY);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Mô phỏng thu nhập"
        kanji="試算"
        subtitle="Thử thay đổi giờ làm thêm hoặc tháng thưởng để xem thu nhập dự kiến thay đổi thế nào."
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        <div className="space-y-5 lg:col-span-8">
          <Card>
            <CardContent className="pt-6">
              <p className="mb-1 text-sm font-medium text-[var(--color-text-primary)]">{pick(t.next6, lang, "Dự kiến 6 kỳ tới")}</p>
              <ForecastChart data={chartData} />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-5 lg:col-span-4">
          <Card className="overflow-hidden border-none bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white">
            <CardContent className="pt-6">
              <p className="text-xs font-medium uppercase tracking-wide text-white/80">{pick(t.monthlyProjected, lang, "Thu nhập/tháng dự kiến")}</p>
              <p className="mt-1 font-[var(--font-numeric)] text-[length:var(--font-size-numeric)] font-semibold">
                ¥{Math.round(monthlyGross).toLocaleString("en-US")}
              </p>
              <p className="mt-1 text-xs text-white/80">{t.yearlyEstimate[lang](yearlyProjection.toLocaleString("en-US"))}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-4 pt-6">
              <div>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <label className="font-medium text-[var(--color-text-primary)]">{pick(t.overtimePerMonth, lang, "Giờ làm thêm / tháng")}</label>
                  <span className="text-[var(--color-text-secondary)]">{overtimeHours}h</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={60}
                  step={1}
                  value={overtimeHours}
                  onChange={(e) => setOvertimeHours(Number(e.target.value))}
                  className="w-full accent-[var(--color-primary)]"
                />
              </div>
              <div>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <label className="font-medium text-[var(--color-text-primary)]">{pick(t.bonusPerYear, lang, "Số tháng thưởng / năm")}</label>
                  <span className="text-[var(--color-text-secondary)]">{t.monthsOfSalary[lang](bonusMonths)}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={3}
                  step={0.5}
                  value={bonusMonths}
                  onChange={(e) => setBonusMonths(Number(e.target.value))}
                  className="w-full accent-[var(--color-primary)]"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-dashed">
            <CardContent className="flex items-start gap-3 pt-6 text-xs text-[var(--color-text-secondary)]">
              <Info className="mt-0.5 h-4 w-4 shrink-0" />
              {pick(t.disclaimer, lang, t.disclaimer.vi)}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
