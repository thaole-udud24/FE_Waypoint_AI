import { type ReactNode } from "react";
import { Inbox } from "lucide-react";

export function EmptyState({
  title,
  description,
  icon,
  action,
}: {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
      <div className="text-[var(--color-text-disabled)]">{icon ?? <Inbox className="h-10 w-10" />}</div>
      <p className="text-sm font-medium text-[var(--color-text-primary)]">{title}</p>
      {description && <p className="text-sm text-[var(--color-text-secondary)]">{description}</p>}
      {action}
    </div>
  );
}
