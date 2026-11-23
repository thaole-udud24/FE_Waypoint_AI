import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PageHeader } from "@/components/domain/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { KanbanBoard } from "@/components/domain/kanban-board";
import { useLanguage, pick } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { mockCalendarEvents, eventKindColor, initialTaskColumns } from "../data/mock-calendar";

const WEEKDAYS: Record<"vi" | "en" | "ja", string[]> = {
  vi: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
  en: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  ja: ["月", "火", "水", "木", "金", "土", "日"],
};
const DAYS_IN_MONTH = 30; // Tháng 11/2026
const FIRST_WEEKDAY_OFFSET = 6; // 01/11/2026 là Chủ Nhật -> 6 ô trống trước đó
const TODAY = 23;

const t = {
  monthTitle: { vi: "Tháng 11, 2026", en: "November 2026", ja: "2026年11月" },
  prevMonth: { vi: "Tháng trước", en: "Previous month", ja: "前月" },
  nextMonth: { vi: "Tháng sau", en: "Next month", ja: "翌月" },
  dragEventHint: { vi: " — kéo để đổi ngày", en: " — drag to change date", ja: " — ドラッグで日付変更" },
  taskBoard: { vi: "Bảng việc", en: "Task board", ja: "タスクボード" },
  dragCardHint: { vi: "Kéo thẻ để đổi trạng thái", en: "Drag a card to change status", ja: "カードをドラッグしてステータス変更" },
};

export function CalendarPage() {
  const { lang } = useLanguage();
  const [columns, setColumns] = useState(initialTaskColumns);
  const [events, setEvents] = useState(mockCalendarEvents);
  const [draggingEventId, setDraggingEventId] = useState<string | null>(null);
  const [overDay, setOverDay] = useState<number | null>(null);

  function moveCard(cardId: string, fromColumnId: string, toColumnId: string) {
    setColumns((prev) => {
      const from = prev.find((c) => c.id === fromColumnId);
      const card = from?.cards.find((c) => c.id === cardId);
      if (!card) return prev;
      return prev.map((col) => {
        if (col.id === fromColumnId) return { ...col, cards: col.cards.filter((c) => c.id !== cardId) };
        if (col.id === toColumnId) return { ...col, cards: [...col.cards, card] };
        return col;
      });
    });
  }

  function moveEvent(eventId: string, toDay: number) {
    setEvents((prev) => prev.map((e) => (e.id === eventId ? { ...e, day: toDay } : e)));
  }

  const localizedColumns = columns.map((col) => ({
    ...col,
    label: pick(col.label, lang, col.label.vi),
    cards: col.cards.map((c) => ({
      ...c,
      title: pick(c.title, lang, c.title.vi),
      meta: pick(c.meta, lang, c.meta.vi),
      tagLabel: pick(c.tagLabel, lang, c.tagLabel.vi),
    })),
  }));

  const eventsByDay = new Map<number, typeof mockCalendarEvents>();
  for (const e of events) {
    eventsByDay.set(e.day, [...(eventsByDay.get(e.day) ?? []), e]);
  }
  const cells = [...Array(FIRST_WEEKDAY_OFFSET).fill(null), ...Array.from({ length: DAYS_IN_MONTH }, (_, i) => i + 1)];

  return (
    <div className="space-y-5">
      <PageHeader title="Lịch & việc cần làm" kanji="予定" subtitle="Kéo sự kiện sang ngày khác, kéo thẻ việc để đổi trạng thái." />

      <Card>
        <CardContent className="pt-6">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold text-[var(--color-text-primary)]">{pick(t.monthTitle, lang, "Tháng 11, 2026")}</p>
            <div className="flex items-center gap-1">
              <button className="rounded-md p-1.5 text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-secondary)]" aria-label={pick(t.prevMonth, lang, "Tháng trước")}>
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button className="rounded-md p-1.5 text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-secondary)]" aria-label={pick(t.nextMonth, lang, "Tháng sau")}>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-px overflow-hidden rounded-[12px] border border-[var(--color-border)] bg-[var(--color-border)]">
            {WEEKDAYS[lang].map((w) => (
              <div key={w} className="bg-[var(--color-surface-secondary)] py-1.5 text-center text-[11px] font-semibold text-[var(--color-text-disabled)]">
                {w}
              </div>
            ))}
            {cells.map((day, i) => {
              if (day === null) return <div key={`empty-${i}`} className="min-h-[72px] bg-[var(--color-surface)]" />;
              const dayEvents = eventsByDay.get(day) ?? [];
              const isToday = day === TODAY;
              return (
                <div
                  key={day}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setOverDay(day);
                  }}
                  onDragLeave={() => setOverDay((d) => (d === day ? null : d))}
                  onDrop={(e) => {
                    e.preventDefault();
                    if (draggingEventId) moveEvent(draggingEventId, day);
                    setDraggingEventId(null);
                    setOverDay(null);
                  }}
                  className={cn(
                    "flex min-h-[72px] flex-col gap-0.5 p-1.5 transition-colors",
                    overDay === day ? "bg-[var(--color-primary-light)]" : "bg-[var(--color-surface)]"
                  )}
                >
                  <span
                    className={cn(
                      "grid h-5 w-5 place-items-center rounded-full text-xs",
                      isToday ? "bg-[var(--color-primary)] font-semibold text-white" : "text-[var(--color-text-secondary)]"
                    )}
                  >
                    {day}
                  </span>
                  {dayEvents.map((e) => {
                    const label = pick(e.label, lang, e.label.vi);
                    return (
                      <span
                        key={e.id}
                        draggable
                        onDragStart={() => setDraggingEventId(e.id)}
                        onDragEnd={() => setDraggingEventId(null)}
                        className={cn(
                          "cursor-grab truncate rounded px-1.5 py-0.5 text-left text-[10px] font-medium leading-tight text-white active:cursor-grabbing",
                          draggingEventId === e.id && "opacity-40"
                        )}
                        style={{ background: eventKindColor[e.kind] }}
                        title={`${label}${pick(t.dragEventHint, lang, " — kéo để đổi ngày")}`}
                      >
                        {label}
                      </span>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-medium text-[var(--color-text-primary)]">{pick(t.taskBoard, lang, "Bảng việc")}</p>
            <span className="text-xs text-[var(--color-text-disabled)]">{pick(t.dragCardHint, lang, "Kéo thẻ để đổi trạng thái")}</span>
          </div>
          <KanbanBoard columns={localizedColumns} onMoveCard={moveCard} />
        </CardContent>
      </Card>
    </div>
  );
}
