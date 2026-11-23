import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Lock, LogOut, X, ChevronsRight, ChevronsLeft, StickyNote, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { navGroups, type NavItem } from "@/app/config/navigation";
import { useAuthStore } from "@/stores/auth-store";
import { useDiscreetStore } from "@/stores/discreet-store";
import { WaypointLogo } from "@/components/brand/waypoint-logo";
import { useLanguage, pick } from "@/lib/i18n";

// Khung icon cố định 40×40, stroke đồng nhất để mọi icon (dù hình dạng SVG
// khác nhau) có cùng trọng lượng thị giác và canh đúng tâm.
function IconSlot({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="grid h-10 w-10 shrink-0 place-items-center">
      <Icon className="h-[19px] w-[19px]" strokeWidth={1.75} />
    </span>
  );
}

// self-center: ghi đè align-items:stretch mặc định của cha flex-col, nếu
// không icon sẽ bị kéo giãn full-width rồi dạt về bên trái bên trong.
const railItemClass = (isActive: boolean, expanded: boolean) =>
  cn(
    "flex h-10 shrink-0 items-center self-center rounded-full text-sm text-white/70 transition-colors hover:text-white",
    expanded ? "w-full" : "w-10 justify-center",
    isActive && "bg-white font-medium text-[var(--color-primary-dark)] hover:text-[var(--color-primary-dark)]"
  );

function NavItemLink({ to, label, i18n, icon, expanded }: NavItem & { expanded: boolean }) {
  const { lang } = useLanguage();
  return (
    <NavLink to={to} className={({ isActive }) => railItemClass(isActive, expanded)}>
      <IconSlot icon={icon} />
      {expanded && <span className="truncate pr-3">{pick(i18n ?? {}, lang, label)}</span>}
    </NavLink>
  );
}

function RailButton({
  icon,
  label,
  expanded,
  onClick,
}: {
  icon: LucideIcon;
  label: string;
  expanded: boolean;
  onClick?: () => void;
}) {
  return (
    <button onClick={onClick} className={railItemClass(false, expanded)} aria-label={label}>
      <IconSlot icon={icon} />
      {expanded && <span className="truncate pr-3">{label}</span>}
    </button>
  );
}

function RailBody({ expanded }: { expanded: boolean }) {
  const { lang } = useLanguage();
  return (
    <nav className="scrollbar-thin flex min-h-0 flex-1 flex-col items-center gap-2 overflow-y-auto px-2 py-2">
      {navGroups.map((group) => (
        <div key={group.label} className={cn("flex w-full flex-col items-center gap-1", expanded && "items-stretch")}>
          {expanded && (
            <p className="px-3 pb-1 text-[11px] font-semibold tracking-[0.08em] text-white/40">
              {pick(group.i18n ?? {}, lang, group.label)}
            </p>
          )}
          {group.items.map((item) => (
            <NavItemLink key={item.to} {...item} expanded={expanded} />
          ))}
        </div>
      ))}
    </nav>
  );
}

export function Sidebar({ mobileOpen, onCloseMobile }: { mobileOpen: boolean; onCloseMobile: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const { logout, lock } = useAuthStore();
  const { lang } = useLanguage();
  const discreet = useDiscreetStore((s) => s.discreet);

  return (
    <>
      {/* Desktop Pill Rail — chỉ mở/thu khi bấm nút, không tự động theo hover */}
      <aside
        className={cn(
          "relative z-20 hidden h-full shrink-0 flex-col rounded-[32px] bg-[var(--color-text-primary)] shadow-[var(--shadow-float,0_14px_36px_rgba(27,23,64,.18))] transition-[width] duration-200 ease-out md:flex",
          expanded ? "w-64" : "w-[72px]"
        )}
      >
        <div className={cn("flex h-14 shrink-0 items-center gap-2 px-4", !expanded && "justify-center px-0")}>
          <span className={cn("flex flex-1 items-center overflow-hidden", !expanded && "justify-center")}>
            {discreet ? (
              <span className="flex items-center gap-2 text-white">
                <StickyNote className="h-5 w-5 shrink-0" />
                {expanded && <span className="text-sm font-semibold">Notes</span>}
              </span>
            ) : (
              <WaypointLogo variant="white" layout={expanded ? "horizontal" : "symbol"} size="sm" />
            )}
          </span>
          <button
            onClick={() => setExpanded((p) => !p)}
            className={cn(
              "grid h-6 w-6 shrink-0 place-items-center rounded-full text-white/50 hover:bg-white/10 hover:text-white",
              !expanded && "absolute -right-2.5 top-5 h-5 w-5 bg-[var(--color-text-primary)] shadow-md"
            )}
            aria-label={expanded ? "Thu gọn menu" : "Mở rộng menu"}
          >
            {expanded ? <ChevronsLeft className="h-3.5 w-3.5" /> : <ChevronsRight className="h-3 w-3" />}
          </button>
        </div>

        <RailBody expanded={expanded} />

        <div className={cn("flex shrink-0 flex-col items-center gap-1 px-2 pb-3 pt-2", expanded && "items-stretch")}>
          <RailButton icon={Lock} label={pick({ en: "Quick lock", ja: "ロック" }, lang, "Khóa nhanh")} expanded={expanded} onClick={lock} />
          <RailButton icon={LogOut} label={pick({ en: "Log out", ja: "ログアウト" }, lang, "Đăng xuất")} expanded={expanded} onClick={logout} />
        </div>
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={onCloseMobile} />
          <aside className="absolute left-0 top-0 flex h-full w-72 flex-col bg-[var(--color-text-primary)] shadow-lg">
            <div className="flex h-14 shrink-0 items-center justify-between px-4">
              <WaypointLogo variant="white" size="sm" />
              <button
                onClick={onCloseMobile}
                className="rounded-full p-1.5 text-white/70 hover:bg-white/10 hover:text-white"
                aria-label="Đóng menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <RailBody expanded />
          </aside>
        </div>
      )}
    </>
  );
}
