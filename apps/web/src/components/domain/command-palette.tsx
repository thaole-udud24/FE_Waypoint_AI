import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, CornerDownLeft, Clock3, ShieldCheck, FolderCheck, MessageCircleQuestion } from "lucide-react";
import { allNavItems } from "@/app/config/navigation";
import { cn } from "@/lib/utils";

interface Command {
  id: string;
  label: string;
  hint?: string;
  icon: typeof Search;
  action: (navigate: ReturnType<typeof useNavigate>) => void;
}

// Lệnh nhanh ngoài điều hướng — thao tác hay dùng theo luồng nghiệp vụ.
const quickActions: Command[] = [
  { id: "qa-worklog", label: "Ghi giờ làm hôm nay", icon: Clock3, action: (nav) => nav("/work-log") },
  { id: "qa-recon", label: "Chạy đối chiếu kỳ 11/2026", icon: ShieldCheck, action: (nav) => nav("/payguard") },
  { id: "qa-casepack", label: "Tạo Case Pack", icon: FolderCheck, action: (nav) => nav("/case-pack") },
  { id: "qa-ask", label: "Hỏi về quyền lợi lao động", icon: MessageCircleQuestion, action: (nav) => nav("/rights-agent") },
];

const navCommands: Command[] = allNavItems.map((item) => ({
  id: `nav-${item.to}`,
  label: item.label,
  hint: item.to,
  icon: item.icon,
  action: (nav) => nav(item.to),
}));

const allCommands = [...quickActions, ...navCommands];

export function CommandPalette({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allCommands;
    return allCommands.filter((c) => c.label.toLowerCase().includes(q));
  }, [query]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => setActiveIndex(0), [query]);

  function runCommand(cmd: Command) {
    cmd.action(navigate);
    onOpenChange(false);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 pt-[12vh]" onClick={() => onOpenChange(false)}>
      <div
        className="w-full max-w-lg overflow-hidden rounded-[20px] bg-[var(--color-surface)] shadow-[var(--shadow-float,0_14px_36px_rgba(27,23,64,.25))]"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === "Escape") onOpenChange(false);
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
          }
          if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex((i) => Math.max(i - 1, 0));
          }
          if (e.key === "Enter" && filtered[activeIndex]) {
            runCommand(filtered[activeIndex]);
          }
        }}
      >
        <div className="flex items-center gap-2.5 border-b border-[var(--color-border)] px-4 py-3">
          <Search className="h-4 w-4 text-[var(--color-text-disabled)]" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm tài liệu, kỳ lương, bằng chứng, chạy lệnh..."
            className="w-full bg-transparent text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-disabled)] focus:outline-none"
          />
          <kbd className="rounded border border-[var(--color-border)] px-1.5 py-0.5 text-[10px] text-[var(--color-text-disabled)]">Esc</kbd>
        </div>

        <div className="max-h-80 overflow-y-auto p-1.5">
          {filtered.length === 0 ? (
            <p className="px-3 py-6 text-center text-sm text-[var(--color-text-secondary)]">Không tìm thấy kết quả.</p>
          ) : (
            filtered.map((cmd, i) => (
              <button
                key={cmd.id}
                onClick={() => runCommand(cmd)}
                onMouseEnter={() => setActiveIndex(i)}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-[12px] px-3 py-2.5 text-left text-sm text-[var(--color-text-primary)]",
                  i === activeIndex && "bg-[var(--color-primary-light)]"
                )}
              >
                <cmd.icon className="h-4 w-4 shrink-0 text-[var(--color-text-secondary)]" />
                <span className="flex-1 truncate">{cmd.label}</span>
                {i === activeIndex && <CornerDownLeft className="h-3.5 w-3.5 text-[var(--color-text-disabled)]" />}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
