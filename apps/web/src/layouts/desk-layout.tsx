import { NavLink, Outlet } from "react-router-dom";
import { Inbox, Bell, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { WaypointLogo } from "@/components/brand/waypoint-logo";
import { useAuthStore } from "@/stores/auth-store";
import { useLanguage, pick, LANG_LABEL, type Lang } from "@/lib/i18n";

// Cổng Cán bộ hỗ trợ (ROLE_SUP): xanh bạc hà + xanh dương, tách biệt với
// cổng người lao động. Xem UI_SCREEN_SPEC mục 10.
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
  const { logout } = useAuthStore();
  const { lang, setLang } = useLanguage();

  return (
    <div
      className="flex h-screen gap-0 overflow-hidden p-3"
      style={{ background: "linear-gradient(160deg,#DDF7EC 0%,#D3E1FF 100%)" }}
    >
      <aside className="flex w-60 shrink-0 flex-col rounded-[28px] bg-[#0f3d36] p-3 text-white">
        <div className="flex h-12 items-center justify-between gap-2 px-2">
          <WaypointLogo variant="white" size="sm" />
          <div className="flex items-center gap-0.5 rounded-full bg-white/10 p-0.5">
            {(["vi", "en", "ja"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={cn("rounded-full px-1.5 py-0.5 text-[10px] font-medium", lang === l ? "bg-white/20 text-white" : "text-white/50")}
              >
                {LANG_LABEL[l]}
              </button>
            ))}
          </div>
        </div>
        <p className="px-2 pb-2 pt-3 text-[11px] font-semibold tracking-[0.08em] text-white/40">{pick(t.groupLabel, lang, "CÁN BỘ HỖ TRỢ")}</p>
        <nav className="flex flex-1 flex-col gap-1">
          {deskNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-white/70 hover:text-white",
                  isActive && "bg-white/10 font-medium text-white"
                )
              }
            >
              <item.icon className="h-4 w-4" />
              {pick(item.label, lang, item.label.vi)}
            </NavLink>
          ))}
        </nav>
        <button
          onClick={logout}
          className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-white/70 hover:text-white"
        >
          <LogOut className="h-4 w-4" /> {pick(t.logout, lang, "Đăng xuất")}
        </button>
      </aside>

      <div className="flex h-full flex-1 flex-col overflow-y-auto rounded-[28px] bg-[var(--color-surface)] p-6">
        <div className="mb-4 rounded-2xl border border-[var(--color-teal)]/30 bg-[var(--card-mint)] px-4 py-2 text-xs text-[var(--color-text-secondary)]">
          {pick(t.onlyShared, lang, t.onlyShared.vi)}
        </div>
        <Outlet />
      </div>
    </div>
  );
}
