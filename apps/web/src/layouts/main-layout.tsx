import { useEffect, useRef, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import {
  Menu,
  Sun,
  Moon,
  Bell,
  Search,
  Plus,
  RefreshCw,
  Clock3,
  FileUp,
  ShieldCheck,
  FolderCheck,
} from "lucide-react";
import { Sidebar } from "./sidebar";
import { useTheme } from "@/app/providers/theme-provider";
import { useAuthStore } from "@/stores/auth-store";
import { Avatar } from "@/components/ui/avatar";
import { appToast } from "@/components/ui/toast";
import { CommandPalette } from "@/components/domain/command-palette";
import { useLanguage, pick, LANG_LABEL, type Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const shellText = {
  greeting: { vi: "Xin chào", en: "Hello", ja: "こんにちは" },
  todayLine: { vi: "23 tháng 11 · 2 việc hôm nay", en: "Nov 23 · 2 tasks today", ja: "11月23日・本日のタスク2件" },
  searchPlaceholder: {
    vi: "Tìm tài liệu, kỳ lương, bằng chứng...",
    en: "Search documents, pay periods, evidence...",
    ja: "書類・給与期間・証拠を検索...",
  },
  refresh: { vi: "Làm mới", en: "Refresh", ja: "更新" },
  refreshedToast: { vi: "Đã làm mới dữ liệu.", en: "Data refreshed.", ja: "データを更新しました。" },
  quickLog: { vi: "Ghi giờ nhanh", en: "Quick log", ja: "すぐ記録" },
  quickActions: { vi: "Hành động nhanh", en: "Quick actions", ja: "クイック操作" },
  qaWorkLog: { vi: "Ghi giờ làm hôm nay", en: "Log today's hours", ja: "本日の勤務を記録" },
  qaUpload: { vi: "Tải tài liệu / phiếu lương", en: "Upload document / payslip", ja: "書類・明細をアップロード" },
  qaPayguard: { vi: "Đối chiếu lương kỳ 11/2026", en: "Reconcile period 11/2026", ja: "2026年11月分を照合" },
  qaCasePack: { vi: "Tạo hồ sơ nhờ hỗ trợ", en: "Create Case Pack", ja: "支援ケースを作成" },
};

export function MainLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [quickOpen, setQuickOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const quickRef = useRef<HTMLDivElement>(null);

  const { resolvedTheme, setTheme } = useTheme();
  const { user } = useAuthStore();
  const { lang, setLang } = useLanguage();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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

  useEffect(() => {
    if (!quickOpen) return;
    function onClickOutside(e: MouseEvent) {
      if (quickRef.current && !quickRef.current.contains(e.target as Node)) {
        setQuickOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [quickOpen]);

  async function handleRefresh() {
    setRefreshing(true);
    await queryClient.invalidateQueries();
    setTimeout(() => {
      setRefreshing(false);
      appToast.success(pick(shellText.refreshedToast, lang, shellText.refreshedToast.vi));
    }, 350);
  }

  const quickMenuItems = [
    { to: "/work-log", icon: Clock3, label: pick(shellText.qaWorkLog, lang, shellText.qaWorkLog.vi) },
    { to: "/documents", icon: FileUp, label: pick(shellText.qaUpload, lang, shellText.qaUpload.vi) },
    { to: "/payguard", icon: ShieldCheck, label: pick(shellText.qaPayguard, lang, shellText.qaPayguard.vi) },
    { to: "/case-pack", icon: FolderCheck, label: pick(shellText.qaCasePack, lang, shellText.qaCasePack.vi) },
  ];

  return (
    <div className="flex h-screen gap-0 overflow-hidden p-0 md:gap-3 md:p-3">
      <Sidebar mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />

      <div className="flex h-full flex-1 flex-col overflow-hidden rounded-none border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-sheet,0_40px_80px_rgba(70,70,160,.25))] md:rounded-[32px]">
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
              <p className="text-xs text-[var(--color-text-secondary)]">{pick(shellText.todayLine, lang, shellText.todayLine.vi)}</p>
            </div>
          </div>

          <button
            onClick={() => setPaletteOpen(true)}
            className="hidden max-w-sm flex-1 items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-secondary)] px-3.5 py-2 text-left transition-colors hover:border-[var(--color-primary)]/40 lg:flex"
          >
            <Search className="h-3.5 w-3.5 text-[var(--color-text-secondary)]" />
            <span className="flex-1 text-sm text-[var(--color-text-secondary)]">
              {pick(shellText.searchPlaceholder, lang, shellText.searchPlaceholder.vi)}
            </span>
            <kbd className="rounded border border-[var(--color-border)] px-1.5 py-0.5 text-[10px] text-[var(--color-text-secondary)]">⌘K</kbd>
          </button>

          <div className="flex items-center gap-1.5">
            <div className="hidden items-center gap-0.5 rounded-full bg-[var(--color-surface-secondary)] p-0.5 sm:flex">
              {(["vi", "en", "ja"] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={cn(
                    "rounded-full px-2 py-1 text-[11px] font-medium transition-colors",
                    lang === l
                      ? "bg-[var(--color-surface)] text-[var(--color-text-primary)] shadow-sm"
                      : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                  )}
                >
                  {LANG_LABEL[l]}
                </button>
              ))}
            </div>
            <button
              onClick={handleRefresh}
              className="hidden items-center gap-1.5 rounded-full border border-[var(--color-border)] px-3 py-1.5 text-xs font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface-secondary)] hover:text-[var(--color-text-primary)] sm:inline-flex"
              aria-label={pick(shellText.refresh, lang, "Làm mới")}
            >
              <RefreshCw className={cn("h-3.5 w-3.5", refreshing && "animate-spin")} />
              {pick(shellText.refresh, lang, "Làm mới")}
            </button>

            <div className="relative" ref={quickRef}>
              <button
                onClick={() => setQuickOpen((o) => !o)}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--cta-dark-bg)] text-[var(--cta-dark-fg)] shadow-sm transition-opacity hover:opacity-90"
                aria-label={pick(shellText.quickActions, lang, "Hành động nhanh")}
                aria-expanded={quickOpen}
              >
                <Plus className={cn("h-4 w-4 transition-transform duration-150", quickOpen && "rotate-45")} />
              </button>
              {quickOpen && (
                <div className="absolute right-0 top-11 z-30 w-64 overflow-hidden rounded-[20px] border border-[var(--color-border)] bg-[var(--color-surface)] p-1.5 shadow-[var(--shadow-float,0_14px_36px_rgba(27,23,64,.18))]">
                  <p className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-[var(--color-text-secondary)]">
                    {pick(shellText.quickActions, lang, "Hành động nhanh")}
                  </p>
                  {quickMenuItems.map((item) => (
                    <button
                      key={item.to}
                      onClick={() => {
                        setQuickOpen(false);
                        navigate(item.to);
                      }}
                      className="flex w-full items-center gap-2.5 rounded-[12px] px-3 py-2 text-left text-sm text-[var(--color-text-primary)] transition-colors hover:bg-[var(--color-surface-secondary)]"
                    >
                      <item.icon className="h-4 w-4 shrink-0 text-[var(--color-primary)]" />
                      <span className="truncate">{item.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => navigate("/notifications")}
              className="relative rounded-full p-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-secondary)] hover:text-[var(--color-text-primary)]"
              aria-label="Thông báo"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[var(--color-attention)]" />
            </button>
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="rounded-full p-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-secondary)] hover:text-[var(--color-text-primary)]"
              aria-label="Đổi giao diện"
            >
              {resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            {user && (
              <Link
                to="/settings"
                aria-label="Tài khoản"
                className="ml-1 border-l border-[var(--color-border)] pl-2"
              >
                <Avatar fallback={user.name.slice(0, 2).toUpperCase()} className="h-9 w-9 ring-2 ring-[var(--color-gold)]/60 transition-transform hover:scale-105" />
              </Link>
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
