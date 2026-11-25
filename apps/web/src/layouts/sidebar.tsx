import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Lock, LogOut, X, ChevronsRight, ChevronsLeft, StickyNote, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { navGroups, type NavItem } from "@/app/config/navigation";
import { useAuthStore } from "@/stores/auth-store";
import { useDiscreetStore } from "@/stores/discreet-store";
import { WaypointLogo } from "@/components/brand/waypoint-logo";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useLanguage, pick } from "@/lib/i18n";

function IconSlot({ icon: Icon, compact }: { icon: LucideIcon; compact?: boolean }) {
  return (
    <span className={cn("grid shrink-0 place-items-center", compact ? "h-8 w-8" : "h-10 w-10")}>
      <Icon className="h-[17px] w-[17px]" strokeWidth={1.75} />
    </span>
  );
}

const railItemClass = (isActive: boolean, expanded: boolean) =>
  cn(
    "flex shrink-0 items-center self-center rounded-full text-sm text-white/75 transition-colors hover:bg-white/10 hover:text-white",
    expanded ? "h-9 w-full" : "h-8 w-8 justify-center",
    isActive && "bg-white font-medium text-[#1b1740] hover:bg-white hover:text-[#1b1740]"
  );

function NavItemLink({
  to,
  label,
  i18n,
  icon,
  expanded,
  onNavigate,
}: NavItem & { expanded: boolean; onNavigate?: () => void }) {
  const { lang } = useLanguage();
  const displayLabel = pick(i18n ?? {}, lang, label);

  const link = (
    <NavLink
      to={to}
      onClick={onNavigate}
      aria-label={displayLabel}
      className={({ isActive }) => railItemClass(isActive, expanded)}
    >
      <IconSlot icon={icon} compact={!expanded} />
      {expanded && <span className="truncate pr-3">{displayLabel}</span>}
    </NavLink>
  );

  if (expanded) return link;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="inline-flex">{link}</span>
      </TooltipTrigger>
      <TooltipContent side="right">{displayLabel}</TooltipContent>
    </Tooltip>
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
  const btn = (
    <button onClick={onClick} className={railItemClass(false, expanded)} aria-label={label}>
      <IconSlot icon={icon} compact={!expanded} />
      {expanded && <span className="truncate pr-3">{label}</span>}
    </button>
  );

  if (expanded) return btn;

  return (
    <Tooltip>
      <TooltipTrigger asChild>{btn}</TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  );
}

function RailBody({ expanded, onNavigate }: { expanded: boolean; onNavigate?: () => void }) {
  const { lang } = useLanguage();
  return (
    <nav className="scrollbar-thin flex min-h-0 flex-1 flex-col items-center gap-1 overflow-y-auto px-2 py-1">
      {navGroups.map((group) => (
        <div key={group.label} className={cn("flex w-full flex-col items-center gap-0.5", expanded && "items-stretch")}>
          {expanded && (
            <p className="px-3 pb-0.5 pt-1 text-[11px] font-semibold tracking-[0.08em] text-white/45">
              {pick(group.i18n ?? {}, lang, group.label)}
            </p>
          )}
          {group.items.map((item) => (
            <NavItemLink key={item.to} {...item} expanded={expanded} onNavigate={onNavigate} />
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

  const lockLabel = pick({ en: "Quick lock", ja: "ロック" }, lang, "Khóa nhanh");
  const logoutLabel = pick({ en: "Log out", ja: "ログアウト" }, lang, "Đăng xuất");

  return (
    <TooltipProvider delayDuration={200}>
      {/* Desktop Pill Rail */}
      <aside
        className={cn(
          "relative z-20 hidden h-full shrink-0 flex-col rounded-[32px] border border-[var(--rail-border)] bg-[var(--rail-bg)] shadow-[var(--shadow-float,0_14px_36px_rgba(27,23,64,.18))] transition-[width] duration-200 ease-out md:flex",
          expanded ? "w-64" : "w-[68px]"
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
              "grid h-6 w-6 shrink-0 place-items-center rounded-full text-white/60 hover:bg-white/15 hover:text-white",
              !expanded && "absolute -right-2.5 top-5 h-5 w-5 border border-[var(--rail-border)] bg-[var(--rail-bg)] shadow-md"
            )}
            aria-label={expanded ? "Thu gọn menu" : "Mở rộng menu"}
          >
            {expanded ? <ChevronsLeft className="h-3.5 w-3.5" /> : <ChevronsRight className="h-3 w-3" />}
          </button>
        </div>

        <RailBody expanded={expanded} />

        <div className={cn("flex shrink-0 flex-col items-center gap-1 border-t border-white/10 px-2 pb-3 pt-2", expanded && "items-stretch")}>
          <RailButton icon={Lock} label={lockLabel} expanded={expanded} onClick={lock} />
          <RailButton icon={LogOut} label={logoutLabel} expanded={expanded} onClick={logout} />
        </div>
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" onClick={onCloseMobile} />
          <aside className="absolute left-0 top-0 flex h-full w-72 flex-col bg-[var(--rail-bg)] shadow-xl">
            <div className="flex h-14 shrink-0 items-center justify-between px-4">
              {discreet ? (
                <span className="flex items-center gap-2 text-white">
                  <StickyNote className="h-5 w-5" />
                  <span className="text-sm font-semibold">Notes</span>
                </span>
              ) : (
                <WaypointLogo variant="white" size="sm" />
              )}
              <button
                onClick={onCloseMobile}
                className="rounded-full p-1.5 text-white/75 hover:bg-white/10 hover:text-white"
                aria-label="Đóng menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <RailBody expanded onNavigate={onCloseMobile} />
            <div className="flex shrink-0 flex-col gap-1 border-t border-white/10 px-2 pb-4 pt-2">
              <RailButton
                icon={Lock}
                label={lockLabel}
                expanded
                onClick={() => {
                  onCloseMobile();
                  lock();
                }}
              />
              <RailButton
                icon={LogOut}
                label={logoutLabel}
                expanded
                onClick={() => {
                  onCloseMobile();
                  logout();
                }}
              />
            </div>
          </aside>
        </div>
      )}
    </TooltipProvider>
  );
}
