import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";

export function Avatar({
  src,
  alt,
  fallback,
  className,
}: {
  src?: string;
  alt?: string;
  fallback: string;
  className?: string;
}) {
  return (
    <AvatarPrimitive.Root
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-[var(--color-primary-light)]",
        className
      )}
    >
      <AvatarPrimitive.Image src={src} alt={alt} className="h-full w-full object-cover" />
      <AvatarPrimitive.Fallback className="text-xs font-medium text-[var(--color-primary-dark)]">
        {fallback}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
}
