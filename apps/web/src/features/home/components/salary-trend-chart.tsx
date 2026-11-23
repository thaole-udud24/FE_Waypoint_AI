import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

// shortcut: dữ liệu mẫu minh họa biểu đồ. Thay bằng dữ liệu thật từ MOD_005 PayGuard AI khi có API.
const data = [
  { period: "T6", thucNhan: 192000, duKien: 198000 },
  { period: "T7", thucNhan: 201500, duKien: 205000 },
  { period: "T8", thucNhan: 208000, duKien: 209000 },
  { period: "T9", thucNhan: 199000, duKien: 212000 },
  { period: "T10", thucNhan: 221000, duKien: 219000 },
  { period: "T11", thucNhan: 214600, duKien: 233000 },
];

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-xs shadow-md">
      <p className="mb-1 font-medium text-[var(--color-text-primary)]">Kỳ {label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} style={{ color: p.color }}>
          {p.name}: ¥{p.value.toLocaleString("en-US")}
        </p>
      ))}
    </div>
  );
}

export function SalaryTrendChart() {
  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
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
            width={48}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="duKien"
            name="Dự kiến theo hợp đồng"
            stroke="var(--color-chart-2)"
            fill="url(#gradDuKien)"
            strokeWidth={2.5}
            strokeDasharray="5 4"
          />
          <Area
            type="monotone"
            dataKey="thucNhan"
            name="Thực nhận"
            stroke="var(--color-chart-1)"
            fill="url(#gradThucNhan)"
            strokeWidth={3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
