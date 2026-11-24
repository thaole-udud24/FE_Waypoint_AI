import { type ReactNode } from "react";
import { Compass } from "lucide-react";
import { useLanguage, LANG_LABEL, type Lang } from "@/lib/i18n";
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
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex min-h-screen flex-col justify-center bg-[var(--color-surface)] px-8 py-12 sm:px-16 lg:px-24">
      <div className="mx-auto w-full max-w-sm">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary-light)]">
            <Compass className="h-5 w-5 text-[var(--color-primary)]" />
          </div>
          <div className="flex items-center gap-0.5 rounded-full border border-[var(--color-border)] p-0.5">
            {(["vi", "en", "ja"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={cn(
                  "rounded-full px-1.5 py-0.5 text-[10px] font-medium",
                  lang === l ? "bg-[var(--color-primary-light)] text-[var(--color-primary)]" : "text-[var(--color-text-disabled)]"
                )}
              >
                {LANG_LABEL[l]}
              </button>
            ))}
          </div>
        </div>
        <h1 className="text-xl font-semibold text-[var(--color-text-primary)]">{title}</h1>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{subtitle}</p>

        {children}

        {footer && <p className="mt-6 text-center text-sm text-[var(--color-text-secondary)]">{footer}</p>}
      </div>
    </div>
  );
}
