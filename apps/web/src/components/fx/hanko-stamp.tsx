import { useLanguage, pick, type Lang } from "@/lib/i18n";

export type HankoLabel = string | Partial<Record<Lang, string>>;

export function HankoStamp({ label, className = "" }: { label: HankoLabel; className?: string }) {
  const { lang } = useLanguage();
  const text = typeof label === "string" ? label : pick(label, lang, label.vi ?? "");

  return (
    <span
      lang={lang}
      className={`inline-flex -rotate-6 items-center justify-center rounded-full border-2 border-[var(--color-attention-text)]/70 px-2.5 py-0.5 text-[11px] font-bold tracking-wide text-[var(--color-attention-text)] ${className}`}
      style={lang === "ja" ? { fontFamily: "var(--font-jp)" } : undefined}
    >
      {text}
    </span>
  );
}
