import { useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface KanbanCard {
  id: string;
  title: string;
  meta?: string;
  code?: string; // mã thẻ kiểu Jira, vd "WRK-41"
  assignee?: string; // chữ cái đầu hiển thị trong avatar tròn
  progress?: number; // 0-100, hiện thanh tiến độ nếu có
  tagLabel?: string;
  tagColor?: string; // màu nhãn/viền cột, vd "#5b7cff"
}

export interface KanbanColumn {
  id: string;
  label: string;
  accent?: string; // màu viền trên đầu cột, vd "#ff7fb0"
  cards: KanbanCard[];
}

/**
 * Bảng Kanban kéo-thả bằng HTML5 Drag and Drop thuần (không phụ thuộc thư
 * viện ngoài), phong cách gần với Jira/Trello: cột có viền màu trên đầu, thẻ
 * có nhãn, mã thẻ và avatar người phụ trách. Dùng cho "Việc cần làm", quản
 * trị quy tắc Law Pack theo trạng thái, v.v. State do component cha quản lý.
 */
export function KanbanBoard({
  columns,
  onMoveCard,
  renderCard,
}: {
  columns: KanbanColumn[];
  onMoveCard: (cardId: string, fromColumnId: string, toColumnId: string) => void;
  renderCard?: (card: KanbanCard) => ReactNode;
}) {
  const [dragging, setDragging] = useState<{ cardId: string; fromColumnId: string } | null>(null);
  const [overColumn, setOverColumn] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  function moveByKeyboard(cardId: string, fromColumnId: string, direction: -1 | 1) {
    const fromIndex = columns.findIndex((c) => c.id === fromColumnId);
    const toIndex = fromIndex + direction;
    const toColumn = columns[toIndex];
    if (!toColumn) return;
    onMoveCard(cardId, fromColumnId, toColumn.id);
    setAnnouncement(`Đã chuyển thẻ sang cột "${toColumn.label}"`);
    // Focus follows the card into its new column after the re-render.
    requestAnimationFrame(() => cardRefs.current[cardId]?.focus());
  }

  return (
    <div
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[repeat(var(--kanban-cols),minmax(0,1fr))]"
      style={{ "--kanban-cols": columns.length } as CSSProperties}
    >
      <span role="status" aria-live="polite" className="sr-only">{announcement}</span>
      {columns.map((col) => (
        <div
          key={col.id}
          onDragOver={(e) => {
            e.preventDefault();
            setOverColumn(col.id);
          }}
          onDragLeave={() => setOverColumn((c) => (c === col.id ? null : c))}
          onDrop={(e) => {
            e.preventDefault();
            if (dragging && dragging.fromColumnId !== col.id) {
              onMoveCard(dragging.cardId, dragging.fromColumnId, col.id);
            }
            setDragging(null);
            setOverColumn(null);
          }}
          className={cn(
            "flex min-h-[140px] flex-col gap-2 rounded-[16px] border border-[var(--color-border)] bg-[var(--color-surface-secondary)]/40 p-2.5 pt-0 transition-colors",
            overColumn === col.id && "bg-[var(--color-primary-light)]"
          )}
        >
          <div
            className="-mx-2.5 mb-1 flex items-center justify-between rounded-t-[16px] border-b-[3px] px-3 py-2"
            style={{ borderColor: col.accent ?? "var(--color-border)" }}
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-secondary)]">{col.label}</span>
            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-[var(--color-surface-secondary)] px-1 text-[11px] font-medium text-[var(--color-text-secondary)]">
              {col.cards.length}
            </span>
          </div>

          {col.cards.map((card) => (
            <div
              key={card.id}
              ref={(el) => {
                cardRefs.current[card.id] = el;
              }}
              draggable
              onDragStart={() => setDragging({ cardId: card.id, fromColumnId: col.id })}
              onDragEnd={() => setDragging(null)}
              role="button"
              tabIndex={0}
              aria-label={`${card.title}, cột "${col.label}". Dùng mũi tên trái/phải để chuyển cột.`}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") {
                  e.preventDefault();
                  moveByKeyboard(card.id, col.id, 1);
                } else if (e.key === "ArrowLeft") {
                  e.preventDefault();
                  moveByKeyboard(card.id, col.id, -1);
                }
              }}
              className={cn(
                "cursor-grab rounded-[12px] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2.5 text-sm text-[var(--color-text-primary)] shadow-sm hover:shadow-md active:cursor-grabbing focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]",
                dragging?.cardId === card.id && "opacity-40"
              )}
            >
              {renderCard ? (
                renderCard(card)
              ) : (
                <>
                  {card.tagLabel && (
                    <span
                      className="mb-1.5 inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium"
                      style={{ background: `${card.tagColor ?? "var(--color-primary)"}1f`, color: card.tagColor ?? "var(--color-primary)" }}
                    >
                      {card.tagLabel}
                    </span>
                  )}
                  <p className="leading-snug">{card.title}</p>
                  {typeof card.progress === "number" && (
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[var(--color-surface-secondary)]">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${card.progress}%`, background: card.tagColor ?? "var(--color-primary)" }}
                      />
                    </div>
                  )}
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-mono text-[11px] text-[var(--color-text-disabled)]">{card.code ?? card.meta}</span>
                    {card.assignee && (
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-[var(--color-primary-light)] text-[10px] font-semibold text-[var(--color-primary-dark)]">
                        {card.assignee}
                      </span>
                    )}
                  </div>
                  {card.code && card.meta && (
                    <p className="mt-1 text-xs text-[var(--color-text-disabled)]">{card.meta}</p>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
