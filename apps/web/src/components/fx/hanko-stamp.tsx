export function HankoStamp({ label, className = "" }: { label: string; className?: string }) {
  return (
    <span
      lang="ja"
      className={`inline-flex -rotate-6 items-center justify-center rounded-full border-2 border-[var(--color-attention-text)]/70 px-2.5 py-1 text-[11px] font-bold text-[var(--color-attention-text)] ${className}`}
      style={{ fontFamily: "var(--font-jp)" }}
    >
      {label}
    </span>
  );
}
