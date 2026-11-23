import { type ReactNode } from "react";
import { Compass } from "lucide-react";

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
  return (
    <div className="flex min-h-screen flex-col justify-center bg-[var(--color-surface)] px-8 py-12 sm:px-16 lg:px-24">
      <div className="mx-auto w-full max-w-sm">
        <div className="mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary-light)]">
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
