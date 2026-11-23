import { Fragment } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export function Breadcrumb({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-[var(--color-text-secondary)]">
      {items.map((item, i) => (
        <Fragment key={item.label}>
          {i > 0 && <ChevronRight className="h-3.5 w-3.5" />}
          {item.to ? (
            <Link to={item.to} className="hover:text-[var(--color-text-primary)]">
              {item.label}
            </Link>
          ) : (
            <span className="text-[var(--color-text-primary)]">{item.label}</span>
          )}
        </Fragment>
      ))}
    </nav>
  );
}
