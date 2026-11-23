export interface GanttRow {
  id: string;
  label: string;
  subtitle?: string;
  startMonth: number; // 0-based, tháng bắt đầu tính từ hôm nay
  months: number; // số tháng kéo dài
  color: string;
}

/**
 * Dải tiến độ kiểu roadmap/Gantt đơn giản: mỗi hàng là một thanh ngang trên
 * trục tháng. Không kéo-thả (chỉ trực quan hoá tiến độ theo thời gian) — nếu
 * cần kéo-thả đổi lịch, nên nối vào KanbanBoard hoặc nâng cấp sau.
 */
export function GanttTimeline({ rows, totalMonths }: { rows: GanttRow[]; totalMonths: number }) {
  const months = Array.from({ length: totalMonths }, (_, i) => i + 1);

  return (
    <div className="overflow-x-auto">
      <div style={{ minWidth: totalMonths * 56 }}>
        <div className="mb-2 grid" style={{ gridTemplateColumns: `140px repeat(${totalMonths}, 1fr)` }}>
          <div />
          {months.map((m) => (
            <div key={m} className="text-center text-[11px] font-medium text-[var(--color-text-disabled)]">
              T{m}
            </div>
          ))}
        </div>

        {rows.map((row) => (
          <div
            key={row.id}
            className="grid items-center py-1.5"
            style={{ gridTemplateColumns: `140px repeat(${totalMonths}, 1fr)` }}
          >
            <div className="pr-2">
              <p className="truncate text-sm font-medium text-[var(--color-text-primary)]">{row.label}</p>
              {row.subtitle && <p className="truncate text-xs text-[var(--color-text-disabled)]">{row.subtitle}</p>}
            </div>
            <div className="relative col-span-full h-6" style={{ gridColumn: `2 / span ${totalMonths}` }}>
              <div className="absolute inset-0 rounded-full bg-[var(--color-surface-secondary)]/60" />
              <div
                className="absolute inset-y-0 rounded-full"
                style={{
                  left: `${(row.startMonth / totalMonths) * 100}%`,
                  width: `${(row.months / totalMonths) * 100}%`,
                  background: row.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
