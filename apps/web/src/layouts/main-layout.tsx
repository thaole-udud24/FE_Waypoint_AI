import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { Menu, Sun, Moon, Bell, Search, Plus, RefreshCw, Clock3 } from "lucide-react";
import { Sidebar } from "./sidebar";
import { useTheme } from "@/app/providers/theme-provider";
import { useAuthStore } from "@/stores/auth-store";
import { Avatar } from "@/components/ui/avatar";
import { CommandPalette } from "@/components/domain/command-palette";
import { useLanguage, pick, LANG_LABEL, type Lang } from "@/lib/i18n";

const shellText = {
  greeting: { vi: "Xin chào", en: "Hello", ja: "こんにちは" },
  todayLine: { vi: "23 tháng 11 · 2 việc hôm nay", en: "Nov 23 · 2 tasks today", ja: "11月23日・本日のタスク2件" },
  searchPlaceholder: {
    vi: "Tìm tài liệu, kỳ lương, bằng chứng...",
    en: "Search documents, pay periods, evidence...",
    ja: "書類・給与期間・証拠を検索...",
  },
  refresh: { vi: "Làm mới", en: "Refresh", ja: "更新" },
  quickLog: { vi: "Ghi giờ nhanh", en: "Quick log", ja: "すぐ記録" },
};

export function MainLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user } = useAuthStore();
  const { lang, setLang } = useLanguage();

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="flex h-screen gap-0 overflow-hidden p-0 md:gap-3 md:p-3">
      <Sidebar mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />

      <div className="flex h-full flex-1 flex-col overflow-hidden rounded-none bg-[var(--color-surface)] shadow-[var(--shadow-sheet,0_40px_80px_rgba(70,70,160,.25))] md:rounded-[32px]">
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between gap-2 border-b border-[var(--color-border)] bg-[var(--color-surface)]/90 px-4 backdrop-blur-md md:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="rounded-full p-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-secondary)] md:hidden"
              aria-label="Mở menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                {pick(shellText.greeting, lang, "Xin chào")}, {user?.name ?? "bạn"}
              </p>
              <p className="text-xs text-[var(--color-text-secondary)]">{pick(shellText.todayLine, lang, "23 tháng 11 · 2 việc hôm nay")}</p>
            </div>
          </div>

          <button
            onClick={() => setPaletteOpen(true)}
            className="hidden max-w-sm flex-1 items-center gap-2 rounded-full bg-[var(--color-surface-secondary)] px-3.5 py-2 text-left lg:flex"
          >
            <Search className="h-3.5 w-3.5 text-[var(--color-text-disabled)]" />
            <span className="flex-1 text-sm text-[var(--color-text-disabled)]">
              {pick(shellText.searchPlaceholder, lang, "Tìm tài liệu, kỳ lương, bằng chứng...")}
            </span>
            <kbd className="rounded border border-[var(--color-border)] px-1.5 py-0.5 text-[10px] text-[var(--color-text-disabled)]">⌘K</kbd>
          </button>

          <div className="flex items-center gap-1.5">
            <div className="hidden items-center gap-0.5 rounded-full bg-[var(--color-surface-secondary)] p-0.5 sm:flex">
              {(["vi", "en", "ja"] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`rounded-full px-2 py-1 text-[11px] font-medium transition-colors ${
                    lang === l ? "bg-[var(--color-surface)] text-[var(--color-text-primary)] shadow-sm" : "text-[var(--color-text-disabled)]"
                  }`}
                >
                  {LANG_LABEL[l]}
                </button>
              ))}
            </div>
            <button
              className="hidden items-center gap-1.5 rounded-full border border-[var(--color-border)] px-3 py-1.5 text-xs font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-secondary)] sm:inline-flex"
              aria-label="Làm mới dữ liệu"
            >
              <RefreshCw className="h-3.5 w-3.5" /> {pick(shellText.refresh, lang, "Làm mới")}
            </button>
            <button
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--color-text-primary)] text-white hover:opacity-90"
              aria-label="Hành động nhanh"
            >
              <Plus className="h-4 w-4" />
            </button>
            <button
              className="relative rounded-full p-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-secondary)]"
              aria-label="Thông báo"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[var(--color-attention)]" />
            </button>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full p-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-secondary)]"
              aria-label="Đổi giao diện"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            {user && (
              <div className="ml-1 border-l border-[var(--color-border)] pl-2">
                <Avatar fallback={user.name.slice(0, 2).toUpperCase()} className="h-9 w-9 ring-2 ring-[var(--color-gold)]/60" />
              </div>
            )}
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>

      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />

      <Link
        to="/work-log"
        aria-label={pick(shellText.quickLog, lang, "Ghi giờ nhanh")}
        className="fixed bottom-5 right-5 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-primary)] text-white shadow-[var(--shadow-float,0_14px_36px_rgba(27,23,64,.25))] hover:bg-[var(--color-primary-dark)] lg:hidden"
      >
        <Clock3 className="h-6 w-6" />
      </Link>
    </div>
  );
}
