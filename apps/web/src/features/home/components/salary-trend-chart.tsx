import { useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Table2, TrendingUp } from "lucide-react";
import { useLanguage, pick } from "@/lib/i18n";

// shortcut: dữ liệu mẫu minh họa biểu đồ. Thay bằng dữ liệu thật từ MOD_005 PayGuard AI khi có API.
const data = [
  { period: "T6", thucNhan: 192000, duKien: 198000 },
  { period: "T7", thucNhan: 201500, duKien: 205000 },
  { period: "T8", thucNhan: 208000, duKien: 209000 },
  { period: "T9", thucNhan: 199000, duKien: 212000 },
  { period: "T10", thucNhan: 221000, duKien: 219000 },
  { period: "T11", thucNhan: 214600, duKien: 233000 },
];

const t = {
  period: { vi: "Kỳ", en: "Period", ja: "期間" },
  actual: { vi: "Thực nhận", en: "Actual", ja: "実受取額" },
  expected: { vi: "Dự kiến theo hợp đồng", en: "Contract expected", ja: "契約上の見込み" },
  viewTable: { vi: "Xem dạng bảng", en: "Table view", ja: "表で見る" },
  viewChart: { vi: "Xem biểu đồ", en: "Chart view", ja: "グラフで見る" },
  diff: { vi: "Chênh lệch", en: "Difference", ja: "差額" },
};

function CustomTooltip({ active, payload, label, periodPrefix }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-[16px] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-xs shadow-md">
      <p className="mb-1 font-medium text-[var(--color-text-primary)]">
        {periodPrefix} {label}
      </p>
      {payload.map((p: any) => (
        <p key={p.dataKey} className="tabular-nums" style={{ color: p.color }}>
          {p.name}: ¥{Number(p.value).toLocaleString("en-US")}
        </p>
      ))}
    </div>
  );
}

export function SalaryTrendChart() {
  const { lang } = useLanguage();
  const [asTable, setAsTable] = useState(false);

  const actualName = pick(t.actual, lang, "Thực nhận");
  const expectedName = pick(t.expected, lang, "Dự kiến theo hợp đồng");
  const periodPrefix = pick(t.period, lang, "Kỳ");

  return (
    <div>
      <div className="mb-2 flex justify-end">
        <button
          type="button"
          onClick={() => setAsTable((v) => !v)}
          className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/70 px-2.5 py-1 text-[11px] font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
        >
          {asTable ? <TrendingUp className="h-3 w-3" /> : <Table2 className="h-3 w-3" />}
          {asTable ? pick(t.viewChart, lang, "Xem biểu đồ") : pick(t.viewTable, lang, "Xem dạng bảng")}
        </button>
      </div>

      {asTable ? (
        <div className="overflow-x-auto rounded-[16px] border border-[var(--color-border)] bg-[var(--color-surface)]/80">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[var(--color-border)] text-[var(--color-text-secondary)]">
                <th className="px-3 py-2 text-left font-medium">{periodPrefix}</th>
                <th className="px-3 py-2 text-right font-medium">{actualName}</th>
                <th className="px-3 py-2 text-right font-medium">{expectedName}</th>
                <th className="px-3 py-2 text-right font-medium">{pick(t.diff, lang, "Chênh lệch")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)] tabular-nums">
              {data.map((row) => {
                const diff = row.thucNhan - row.duKien;
                return (
                  <tr key={row.period} className="text-[var(--color-text-primary)]">
                    <td className="px-3 py-2 font-medium">{row.period}</td>
                    <td className="px-3 py-2 text-right">¥{row.thucNhan.toLocaleString("en-US")}</td>
                    <td className="px-3 py-2 text-right">¥{row.duKien.toLocaleString("en-US")}</td>
                    <td
                      className="px-3 py-2 text-right font-medium"
                      style={{ color: diff < 0 ? "var(--color-attention-text)" : "var(--color-teal-text)" }}
                    >
                      {diff >= 0 ? "+" : "-"}¥{Math.abs(diff).toLocaleString("en-US")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 8, right: 12, left: 4, bottom: 0 }}>
              <defs>
                <linearGradient id="gradThucNhan" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradDuKien" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-chart-2)" stopOpacity={0.22} />
                  <stop offset="100%" stopColor="var(--color-chart-2)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="var(--color-border)" />
              <XAxis
                dataKey="period"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--color-text-secondary)", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--color-text-secondary)", fontSize: 12 }}
                tickFormatter={(v) => `¥${Math.round(v / 1000)}k`}
                width={58}
              />
              <Tooltip content={<CustomTooltip periodPrefix={periodPrefix} />} />
              <Area
                type="monotone"
                dataKey="duKien"
                name={expectedName}
                stroke="var(--color-chart-2)"
                fill="url(#gradDuKien)"
                strokeWidth={2.5}
                strokeDasharray="5 4"
              />
              <Area
                type="monotone"
                dataKey="thucNhan"
                name={actualName}
                stroke="var(--color-chart-1)"
                fill="url(#gradThucNhan)"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
