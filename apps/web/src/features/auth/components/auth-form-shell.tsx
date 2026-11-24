import { type ReactNode } from "react";
import { Compass, Moon, Sun } from "lucide-react";
import { useTheme } from "@/app/providers/theme-provider";
import { useLanguage, LANG_LABEL, type Lang } from "@/lib/i18n";
import { WaypointLogo } from "@/components/brand/waypoint-logo";
import { cn } from "@/lib/utils";

export function AuthFormShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  const { resolvedTheme, setTheme } = useTheme();
  const { lang, setLang } = useLanguage();

  return (
    <div className="relative flex min-h-screen flex-col justify-center bg-[var(--color-surface)] px-6 py-12 sm:px-16 lg:px-24">
      <div className="absolute right-4 top-4 flex items-center gap-1.5 sm:right-6 sm:top-6">
        <div className="flex items-center gap-0.5 rounded-full bg-[var(--color-surface-secondary)] p-0.5">
          {(["vi", "en", "ja"] as Lang[]).map((l) => (
            <button
              key={l}
              type="button"
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
          type="button"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          className="rounded-full p-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-secondary)] hover:text-[var(--color-text-primary)]"
          aria-label="Đổi giao diện"
        >
          {resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </div>

      <div className="mx-auto w-full max-w-sm">
        <div className="mb-6 md:hidden">
          <WaypointLogo variant="aurora" size="md" />
        </div>
        <div className="mb-6 hidden h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary-light)] md:flex">
          <Compass className="h-5 w-5 text-[var(--color-primary)]" />
        </div>
        <h1 className="text-xl font-semibold text-[var(--color-text-primary)]">{title}</h1>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{subtitle}</p>

        {children}

        {footer && <p className="mt-6 text-center text-sm text-[var(--color-text-secondary)]">{footer}</p>}
      </div>
    </div>
  );
}
