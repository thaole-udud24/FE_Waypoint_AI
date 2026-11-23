import { NavLink, Outlet } from "react-router-dom";
import { LayoutDashboard, Scale, Settings2, LogOut, Building2, ShieldAlert, FileClock, Activity, Radar } from "lucide-react";
import { cn } from "@/lib/utils";
import { WaypointLogo } from "@/components/brand/waypoint-logo";
import { useAuthStore } from "@/stores/auth-store";
import { useLanguage, pick, LANG_LABEL, type Lang } from "@/lib/i18n";

// Cổng Quản trị (ROLE_ADM): tím lavender + mực đậm, ít trang trí hơn cổng
// người lao động theo UI_CODE_RULES mục 3.1/3.4. Xem UI_SCREEN_SPEC mục 11.
const adminNav = [
  { to: "/admin", label: { vi: "Tổng quan", en: "Overview", ja: "概要" }, icon: LayoutDashboard, end: true },
  { to: "/admin/law-pack", label: { vi: "Law Pack", en: "Law Pack", ja: "Law Pack" }, icon: Scale },
  { to: "/admin/canh-luat", label: { vi: "Canh luật", en: "Law watch", ja: "法令監視" }, icon: Radar },
  { to: "/admin/organizations", label: { vi: "Tổ chức & cán bộ", en: "Organizations & staff", ja: "組織・担当者" }, icon: Building2 },
  { to: "/admin/admins", label: { vi: "Quản trị viên", en: "Administrators", ja: "管理者" }, icon: ShieldAlert },
  { to: "/admin/audit-log", label: { vi: "Nhật ký kiểm toán", en: "Audit log", ja: "監査ログ" }, icon: FileClock },
  { to: "/admin/settings", label: { vi: "Cấu hình & AI", en: "Settings & AI", ja: "設定・AI" }, icon: Settings2 },
  { to: "/admin/monitoring", label: { vi: "Giám sát", en: "Monitoring", ja: "監視" }, icon: Activity },
];

const t = {
  groupLabel: { vi: "QUẢN TRỊ", en: "ADMIN", ja: "管理" },
  exitPortal: { vi: "Thoát cổng quản trị", en: "Exit admin portal", ja: "管理ポータルを終了" },
  noUserData: { vi: "Quản trị không có quyền xem nội dung người dùng — chỉ số tổng hợp (BR_005).", en: "Admins cannot view user content — aggregate metrics only (BR_005).", ja: "管理者はユーザーの内容を閲覧できません — 集計指標のみ（BR_005）。" },
};

export function AdminLayout() {
  const { logout } = useAuthStore();
  const { lang, setLang } = useLanguage();

  return (
    <div
      className="flex h-screen gap-0 overflow-hidden p-3"
      style={{ background: "linear-gradient(160deg,#EEE6FF 0%,#DCD3F8 100%)" }}
    >
      <aside className="m-0 flex w-60 shrink-0 flex-col rounded-[28px] bg-[#2a2550] p-3 text-white">
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
        <p className="px-2 pb-2 pt-3 text-[11px] font-semibold tracking-[0.08em] text-white/40">{pick(t.groupLabel, lang, "QUẢN TRỊ")}</p>
        <nav className="scrollbar-thin flex flex-1 flex-col gap-1 overflow-y-auto">
          {adminNav.map((item) => (
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
          <LogOut className="h-4 w-4" /> {pick(t.exitPortal, lang, "Thoát cổng quản trị")}
        </button>
      </aside>

      <div className="flex h-full flex-1 flex-col overflow-y-auto rounded-[28px] bg-[var(--color-surface)] p-6">
        <div className="mb-4 rounded-2xl border border-[#8f7cff]/30 bg-[#eee6ff] px-4 py-2 text-xs text-[#4a4678]">
          {pick(t.noUserData, lang, t.noUserData.vi)}
        </div>
        <Outlet />
      </div>
    </div>
  );
}
