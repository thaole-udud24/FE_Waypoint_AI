import { type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "@/lib/i18n";
import { pickPageHeader } from "@/app/config/page-header-i18n";

export function PageHeader({
  title,
  kanji,
  subtitle,
  actions,
}: {
  title: string;
  kanji?: string;
  subtitle?: ReactNode;
  actions?: ReactNode;
}) {
  const { lang } = useLanguage();
  const { pathname } = useLocation();
  const t = pickPageHeader(pathname, lang, { title, subtitle });

  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <h1 className="flex items-center gap-2 text-[length:var(--font-size-sectionHeading)] font-semibold text-[var(--color-text-primary)]">
          {t.title}
          {kanji && lang === "ja" && (
            <span lang="ja" className="text-xs font-normal text-[var(--color-text-disabled)]" style={{ fontFamily: "var(--font-jp)" }}>
              {kanji}
            </span>
          )}
        </h1>
        {t.subtitle && <p className="mt-0.5 text-sm text-[var(--color-text-secondary)]">{t.subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
