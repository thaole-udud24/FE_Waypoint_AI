import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Inbox, Bell, Settings, LogOut, Sun, Moon, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { WaypointLogo } from "@/components/brand/waypoint-logo";
import { useTheme } from "@/app/providers/theme-provider";
import { useAuthStore } from "@/stores/auth-store";
import { useLanguage, pick, LANG_LABEL, type Lang } from "@/lib/i18n";

const deskNav = [
  { to: "/desk", label: { vi: "Desk", en: "Desk", ja: "Desk" }, icon: Inbox, end: true },
  { to: "/desk/notifications", label: { vi: "Thông báo", en: "Notifications", ja: "通知" }, icon: Bell },
  { to: "/desk/settings", label: { vi: "Tài khoản", en: "Account", ja: "設定" }, icon: Settings },
];

const t = {
  groupLabel: { vi: "CÁN BỘ HỖ TRỢ", en: "SUPPORT STAFF", ja: "支援担当者" },
  logout: { vi: "Đăng xuất", en: "Log out", ja: "ログアウト" },
  onlyShared: {
    vi: "Bạn chỉ thấy phần người lao động đã chia sẻ. Mỗi lượt xem được ghi lại trong nhật ký.",
    en: "You only see what the worker has shared. Every view is recorded in the access log.",
    ja: "労働者が共有した内容のみ閲覧できます。すべての閲覧はアクセスログに記録されます。",
  },
};

export function DeskLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { logout } = useAuthStore();
  const { lang, setLang } = useLanguage();
  const { resolvedTheme, setTheme } = useTheme();

  const sidebarContent = (onNavigate?: () => void) => (
    <>
      <div className="flex h-12 items-center justify-between gap-2 px-2">
        <WaypointLogo variant="white" size="sm" />
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-0.5 rounded-full bg-white/10 p-0.5">
            {(["vi", "en", "ja"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={cn("rounded-full px-1.5 py-0.5 text-[10px] font-medium", lang === l ? "bg-white/20 text-white" : "text-white/60")}
              >
                {LANG_LABEL[l]}
              </button>
            ))}
          </div>
          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="rounded-full p-1.5 text-white/70 hover:bg-white/10 hover:text-white"
            aria-label="Đổi giao diện"
          >
            {resolvedTheme === "dark" ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>
      <p className="px-2 pb-2 pt-3 text-[11px] font-semibold tracking-[0.08em] text-white/45">
        {pick(t.groupLabel, lang, "CÁN BỘ HỖ TRỢ")}
      </p>
      <nav className="flex flex-1 flex-col gap-1">
        {deskNav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-white/75 hover:bg-white/10 hover:text-white",
                isActive && "bg-white/15 font-medium text-white"
              )
            }
          >
            <item.icon className="h-4 w-4" />
            {pick(item.label, lang, item.label.vi)}
          </NavLink>
        ))}
      </nav>
      <button
        onClick={() => {
          onNavigate?.();
          logout();
        }}
        className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-white/75 hover:bg-white/10 hover:text-white"
      >
        <LogOut className="h-4 w-4" /> {pick(t.logout, lang, "Đăng xuất")}
      </button>
    </>
  );

  return (
    <div
      className="flex h-screen gap-0 overflow-hidden p-0 md:gap-3 md:p-3"
      style={{ background: "var(--grad-desk-bg)" }}
    >
      <aside className="hidden w-64 shrink-0 flex-col rounded-[28px] border border-white/10 bg-[#0f3d36] p-3 text-white shadow-lg md:flex">
        {sidebarContent()}
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 flex h-full w-72 flex-col bg-[#0f3d36] p-3 text-white shadow-xl">
            <div className="mb-2 flex justify-end">
              <button onClick={() => setMobileOpen(false)} className="rounded-full p-1.5 text-white/70 hover:bg-white/10" aria-label="Đóng menu">
                <X className="h-4 w-4" />
              </button>
            </div>
            {sidebarContent(() => setMobileOpen(false))}
          </aside>
        </div>
      )}

      <div className="flex h-full flex-1 flex-col overflow-y-auto rounded-none border border-[var(--color-border)] bg-[var(--color-surface)] p-4 md:rounded-[28px] md:p-6">
        <div className="mb-4 flex items-center gap-3 rounded-2xl border border-[var(--color-teal)]/30 bg-[var(--card-mint)] px-4 py-2 text-xs text-[var(--color-text-secondary)]">
          <button
            onClick={() => setMobileOpen(true)}
            className="rounded-full p-1 text-[var(--color-text-primary)] hover:bg-[var(--chip-surface)] md:hidden"
            aria-label="Mở menu"
          >
            <Menu className="h-4 w-4" />
          </button>
          <span>{pick(t.onlyShared, lang, t.onlyShared.vi)}</span>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
