import { useCallback, useEffect, useState } from "react";
import { Delete, Fingerprint } from "lucide-react";
import { useAuthStore } from "@/stores/auth-store";
import { useLanguage, pick } from "@/lib/i18n";
import { WaypointLogo } from "@/components/brand/waypoint-logo";
import { appToast } from "@/components/ui/toast";

const PIN_LENGTH = 4;
// shortcut: demo chỉ cần đủ 4 số bất kỳ để mở khóa, chưa xác thực PIN thật
// (FUN_015). Thay bằng so khớp PIN đã lưu khi backend sẵn sàng.

const t = {
  title: { vi: "Nhập mã PIN để tiếp tục", en: "Enter your PIN to continue", ja: "続けるにはPINを入力してください" },
  useBiometric: { vi: "Dùng sinh trắc học", en: "Use biometrics", ja: "生体認証を使う" },
  biometricHint: {
    vi: "Sinh trắc học chỉ khả dụng trên thiết bị di động hỗ trợ.",
    en: "Biometrics are only available on supported mobile devices.",
    ja: "生体認証は対応するモバイル端末でのみ利用できます。",
  },
};

export function LockScreen() {
  const { lang } = useLanguage();
  const unlock = useAuthStore((s) => s.unlock);
  const [pin, setPin] = useState("");

  const pressDigit = useCallback(
    (d: string) => {
      setPin((prev) => {
        if (prev.length >= PIN_LENGTH) return prev;
        const next = prev + d;
        if (next.length === PIN_LENGTH) {
          setTimeout(() => {
            unlock();
            setPin("");
          }, 200);
        }
        return next;
      });
    },
    [unlock]
  );

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (/^[0-9]$/.test(e.key)) {
        pressDigit(e.key);
      } else if (e.key === "Backspace") {
        setPin((p) => p.slice(0, -1));
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [pressDigit]);

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 p-6"
      style={{ background: "var(--grad-cosmos)" }}
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
            className="grid h-14 w-14 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-lg font-medium text-[var(--color-text-primary)] shadow-sm transition-colors hover:bg-[var(--color-surface-secondary)]"
          >
            {d}
          </button>
        ))}
        <button
          onClick={() => appToast.info(pick(t.biometricHint, lang, t.biometricHint.vi))}
          className="grid h-14 w-14 place-items-center rounded-full text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--chip-surface)]"
          aria-label={pick(t.useBiometric, lang, "Dùng sinh trắc học")}
        >
          <Fingerprint className="h-5 w-5" />
        </button>
        <button
          onClick={() => pressDigit("0")}
          className="grid h-14 w-14 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-lg font-medium text-[var(--color-text-primary)] shadow-sm transition-colors hover:bg-[var(--color-surface-secondary)]"
        >
          0
        </button>
        <button
          onClick={() => setPin((p) => p.slice(0, -1))}
          className="grid h-14 w-14 place-items-center rounded-full text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--chip-surface)]"
          aria-label="Backspace"
        >
          <Delete className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
