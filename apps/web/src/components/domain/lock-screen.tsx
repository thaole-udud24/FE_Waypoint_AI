import { useState } from "react";
import { Delete, Fingerprint } from "lucide-react";
import { useAuthStore } from "@/stores/auth-store";
import { useLanguage, pick } from "@/lib/i18n";
import { WaypointLogo } from "@/components/brand/waypoint-logo";

const PIN_LENGTH = 4;
// shortcut: demo chỉ cần đủ 4 số bất kỳ để mở khóa, chưa xác thực PIN thật
// (FUN_015). Thay bằng so khớp PIN đã lưu khi backend sẵn sàng.

const t = {
  title: { vi: "Nhập mã PIN để tiếp tục", en: "Enter your PIN to continue", ja: "続けるにはPINを入力してください" },
  useBiometric: { vi: "Dùng sinh trắc học", en: "Use biometrics", ja: "生体認証を使う" },
};

export function LockScreen() {
  const { lang } = useLanguage();
  const unlock = useAuthStore((s) => s.unlock);
  const [pin, setPin] = useState("");

  function pressDigit(d: string) {
    if (pin.length >= PIN_LENGTH) return;
    const next = pin + d;
    setPin(next);
    if (next.length === PIN_LENGTH) {
      setTimeout(() => {
        unlock();
        setPin("");
      }, 200);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 p-6"
      style={{ background: "linear-gradient(160deg,#DCE8FF 0%,#C7D2FF 45%,#E3D3FF 100%)" }}
    >
      <WaypointLogo variant="aurora" size="lg" />
      <p className="text-sm font-medium text-[var(--color-text-primary)]">{pick(t.title, lang, "Nhập mã PIN để tiếp tục")}</p>

      <div className="flex gap-3">
        {Array.from({ length: PIN_LENGTH }, (_, i) => (
          <span
            key={i}
            className="h-4 w-4 rounded-full border-2 border-[var(--color-primary)] transition-colors"
            style={{ background: i < pin.length ? "var(--color-primary)" : "transparent" }}
          />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((d) => (
          <button
            key={d}
            onClick={() => pressDigit(d)}
            className="grid h-14 w-14 place-items-center rounded-full bg-[var(--color-surface)] text-lg font-medium text-[var(--color-text-primary)] shadow-sm hover:bg-[var(--color-surface-secondary)]"
          >
            {d}
          </button>
        ))}
        <button
          className="grid h-14 w-14 place-items-center rounded-full text-[var(--color-text-secondary)] hover:bg-white/40"
          aria-label={pick(t.useBiometric, lang, "Dùng sinh trắc học")}
        >
          <Fingerprint className="h-5 w-5" />
        </button>
        <button
          onClick={() => pressDigit("0")}
          className="grid h-14 w-14 place-items-center rounded-full bg-[var(--color-surface)] text-lg font-medium text-[var(--color-text-primary)] shadow-sm hover:bg-[var(--color-surface-secondary)]"
        >
          0
        </button>
        <button
          onClick={() => setPin((p) => p.slice(0, -1))}
          className="grid h-14 w-14 place-items-center rounded-full text-[var(--color-text-secondary)] hover:bg-white/40"
          aria-label="Backspace"
        >
          <Delete className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
