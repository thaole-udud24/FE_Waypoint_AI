import { type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", {
  variants: {
    variant: {
      default: "bg-[var(--color-surface-secondary)] text-[var(--color-text-primary)]",
      success: "bg-[var(--color-success)]/15 text-[var(--color-success)]",
      warning: "bg-[var(--color-warning)]/15 text-[var(--color-warning)]",
      error: "bg-[var(--color-error)]/15 text-[var(--color-error)]",
      info: "bg-[var(--color-info)]/15 text-[var(--color-info)]",
    },
  },
  defaultVariants: { variant: "default" },
});

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
