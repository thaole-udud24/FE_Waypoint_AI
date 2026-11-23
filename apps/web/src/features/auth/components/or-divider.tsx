export function OrDivider() {
  return (
    <div className="my-4 flex items-center gap-3">
      <div className="h-px flex-1 bg-[var(--color-border)]" />
      <span className="text-xs text-[var(--color-text-disabled)]">HOẶC</span>
      <div className="h-px flex-1 bg-[var(--color-border)]" />
    </div>
  );
}
