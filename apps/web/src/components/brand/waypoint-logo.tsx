import { useId } from "react";
import { cn } from "@/lib/utils";

export type WaypointLogoVariant = "light" | "dark" | "aurora" | "ink" | "white";
export type WaypointLogoLayout = "horizontal" | "stacked" | "symbol";
export type WaypointLogoSize = "xs" | "sm" | "md" | "lg" | "xl";

const sizeMap: Record<WaypointLogoSize, { symbol: number; text: string; gap: string }> = {
  xs: { symbol: 18, text: "text-xs", gap: "gap-1.5" },
  sm: { symbol: 22, text: "text-sm", gap: "gap-2" },
  md: { symbol: 28, text: "text-base", gap: "gap-2.5" },
  lg: { symbol: 36, text: "text-lg", gap: "gap-3" },
  xl: { symbol: 56, text: "text-2xl", gap: "gap-4" },
};

// Màu biến thể khớp token Pastel Orbit (xem UI_CODE_RULES.md mục 3) thay vì mã
// màu cứng — "light"/"dark" ăn theo [data-theme] tự động vì dùng var(--color-*).
const variantColor: Record<Exclude<WaypointLogoVariant, "aurora">, { symbol: string; accent: string; word: string }> = {
  light: { symbol: "#5b7cff", accent: "#8f7cff", word: "#1b1740" },
  dark: { symbol: "#a7b9ff", accent: "#b5a5f3", word: "#f3f5ff" },
  ink: { symbol: "#202735", accent: "#202735", word: "#202735" },
  white: { symbol: "#ffffff", accent: "#ffffff", word: "#ffffff" },
};

/**
 * Biểu tượng ENSŌ PATH — monogram chữ W: vòng Ensō mảnh bao quanh (tinh thần
 * Nhật, gần khép kín) ôm lấy một chữ W hình học làm hành trình chính (hai
 * đoạn zíc-zắc đi xuống rồi lên), đỉnh giữa là điểm mốc (waypoint) xác thực.
 * Một hình học duy nhất, chỉ đổi màu theo variant, không đổi hình dạng.
 */
function EnsoPathSymbol({
  size,
  variant,
  gradientId,
}: {
  size: number;
  variant: WaypointLogoVariant;
  gradientId: string;
}) {
  const isAurora = variant === "aurora";
  const colors = isAurora ? variantColor.light : variantColor[variant];
  const ringStroke = isAurora ? `url(#${gradientId})` : colors.symbol;
  const pathStroke = isAurora ? `url(#${gradientId})` : colors.accent;
  const dotFill = isAurora ? `url(#${gradientId})` : colors.symbol;

  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" role="img" aria-hidden="true">
      {isAurora && (
        <defs>
          <linearGradient id={gradientId} x1="4" y1="8" x2="60" y2="58" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#7194f5" />
            <stop offset="55%" stopColor="#9b85e8" />
            <stop offset="100%" stopColor="#e0acd8" />
          </linearGradient>
        </defs>
      )}
      {/* Ensō: vòng tròn mảnh gần khép kín, khoảng mở ở góc trên phải */}
      <path
        d="M49 15.3A24 24 0 1 1 32 8"
        stroke={ringStroke}
        strokeWidth={2.4}
        strokeLinecap="round"
        fill="none"
        opacity={0.55}
      />
      {/* Chữ W hình học: hai đoạn zíc-zắc cân đối, góc bo tròn tinh giản */}
      <path
        d="M17 22 L24.2 43 L32 29 L39.8 43 L47 22"
        stroke={pathStroke}
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Điểm mốc: xác thực tại đỉnh giữa của hành trình */}
      <circle cx="32" cy="27.5" r="3.4" fill={dotFill} />
    </svg>
  );
}

export function WaypointLogo({
  variant = "light",
  layout = "horizontal",
  size = "md",
  className,
  ariaLabel = "Waypoint",
}: {
  variant?: WaypointLogoVariant;
  layout?: WaypointLogoLayout;
  size?: WaypointLogoSize;
  className?: string;
  ariaLabel?: string;
}) {
  const gradientId = useId();
  const { symbol, text, gap } = sizeMap[size];
  const wordColor = variant === "aurora" ? variantColor.light.word : variantColor[variant].word;

  const symbolNode = <EnsoPathSymbol size={symbol} variant={variant} gradientId={`wp-logo-${gradientId}`} />;

  if (layout === "symbol") {
    return (
      <span role="img" aria-label={ariaLabel} className={className}>
        {symbolNode}
      </span>
    );
  }

  const wordmark = (
    <span
      className={cn("font-extrabold uppercase tracking-[0.12em]", text)}
      style={{ color: wordColor, fontFamily: "var(--font-sans)" }}
    >
      Waypoint
    </span>
  );

  return (
    <span
      role="img"
      aria-label={ariaLabel}
      className={cn("inline-flex items-center", gap, layout === "stacked" && "flex-col", className)}
    >
      {symbolNode}
      {wordmark}
    </span>
  );
}
