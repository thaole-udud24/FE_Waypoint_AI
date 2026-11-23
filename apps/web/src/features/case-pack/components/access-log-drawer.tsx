import { X } from "lucide-react";
import { useLanguage, pick } from "@/lib/i18n";

const t = {
  title: { vi: "Nhật ký truy cập", en: "Access log", ja: "アクセス履歴" },
  subtitle: { vi: "Ai đã xem hồ sơ này và khi nào.", en: "Who viewed this case and when.", ja: "このケースを誰がいつ閲覧したか。" },
};

// shortcut: dữ liệu mẫu, thay bằng gọi API nhật ký truy cập (BR_020) khi backend sẵn sàng.
const mockAccessLog = [
  { id: "l1", actor: "Cán bộ Tanaka · Nghiệp đoàn hỗ trợ ABC", action: { vi: "Đã xem tóm tắt", en: "Viewed summary", ja: "要約を閲覧" }, time: "23/11/2026 09:12" },
  { id: "l2", actor: "Cán bộ Tanaka · Nghiệp đoàn hỗ trợ ABC", action: { vi: "Đã xem bằng chứng #2", en: "Viewed evidence #2", ja: "証拠#2を閲覧" }, time: "23/11/2026 09:14" },
];

export function AccessLogDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { lang } = useLanguage();
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40" onClick={onClose}>
      <div className="flex h-full w-full max-w-md flex-col overflow-y-auto bg-[var(--color-surface)]" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-5 py-4">
          <div>
            <p className="text-sm font-semibold text-[var(--color-text-primary)]">{pick(t.title, lang, "Nhật ký truy cập")}</p>
            <p className="text-xs text-[var(--color-text-secondary)]">{pick(t.subtitle, lang, t.subtitle.vi)}</p>
          </div>
          <button onClick={onClose} className="rounded-full p-1.5 text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-secondary)]" aria-label="Đóng">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="divide-y divide-[var(--color-border)]">
          {mockAccessLog.map((l) => (
            <div key={l.id} className="px-5 py-3">
              <p className="text-sm font-medium text-[var(--color-text-primary)]">{l.actor}</p>
              <p className="text-sm text-[var(--color-text-secondary)]">{pick(l.action, lang, l.action.vi)}</p>
              <p className="mt-0.5 text-xs text-[var(--color-text-disabled)]">{l.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
