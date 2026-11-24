import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useLanguage, pick } from "@/lib/i18n";

const expectedLabel = { vi: "Dự kiến", en: "Projected", ja: "見込み" };

export function ForecastChart({ data }: { data: { period: string; luong: number }[] }) {
  const { lang } = useLanguage();
  const label = pick(expectedLabel, lang, "Dự kiến");
  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 12, left: 4, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="var(--color-border)" />
          <XAxis dataKey="period" axisLine={false} tickLine={false} tick={{ fill: "var(--color-text-secondary)", fontSize: 12 }} />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--color-text-secondary)", fontSize: 12 }}
            tickFormatter={(v) => `¥${Math.round(v / 1000)}k`}
            width={58}
          />
          <Tooltip
            formatter={(v) => [`¥${Number(v).toLocaleString("en-US")}`, label]}
            labelStyle={{ color: "var(--color-text-primary)", fontWeight: 600 }}
            itemStyle={{ color: "var(--color-text-primary)" }}
            contentStyle={{
              borderRadius: 12,
              border: "1px solid var(--color-border)",
              background: "var(--color-surface)",
              color: "var(--color-text-primary)",
              fontSize: 12,
            }}
          />
          <Bar dataKey="luong" name={label} fill="var(--color-chart-1)" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
