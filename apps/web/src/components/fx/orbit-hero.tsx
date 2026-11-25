import { type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export interface OrbitSatellite {
  label: string;
  icon: LucideIcon;
  status: "ok" | "warn" | "bad";
  angle: number;
  to?: string;
}

const statusColor: Record<OrbitSatellite["status"], string> = {
  ok: "border-[var(--color-teal)] text-[var(--color-teal-text)]",
  warn: "border-[var(--color-gold)] text-[var(--color-gold-text)]",
  bad: "border-[var(--color-attention)] text-[var(--color-attention-text)]",
};

export function OrbitHero({
  centerLabel,
  centerValue,
  satellites,
}: {
  centerLabel: string;
  centerValue: string;
  satellites: OrbitSatellite[];
}) {
  return (
    <div className="relative mx-auto flex h-60 w-60 items-center justify-center sm:h-72 sm:w-72">
      <div className="orbit-ring-1 absolute inset-0 rounded-full border border-dashed border-[var(--stroke-orbit)]" />
      <div className="orbit-ring-2 absolute inset-6 rounded-full border border-dashed border-[var(--stroke-orbit)]" />

      <div
        className="relative z-10 flex h-32 w-32 flex-col items-center justify-center rounded-full text-center shadow-[var(--shadow-card,0_10px_30px_rgba(91,124,255,.12))]"
        style={{ background: "var(--grad-planet)" }}
      >
        <span className="text-[10px] font-semibold uppercase tracking-wide text-white/95 drop-shadow-sm">{centerLabel}</span>
        <span className="font-[var(--font-numeric)] text-lg font-bold tabular-nums text-white drop-shadow-sm">{centerValue}</span>
      </div>

      {satellites.map((sat) => {
        const Icon = sat.icon;
        const rad = (sat.angle * Math.PI) / 180;
        const radius = 104;
        const x = Math.cos(rad) * radius;
        const y = Math.sin(rad) * radius;

        const inner = (
          <>
            <div
              className={cn(
                "grid h-10 w-10 place-items-center rounded-full border-2 bg-[var(--color-surface)] shadow-sm transition-transform group-hover:scale-110",
                statusColor[sat.status]
              )}
            >
              <Icon className="h-4 w-4" />
            </div>
            <span className="pointer-events-none absolute left-1/2 top-full z-20 mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-full border border-[var(--color-border)] bg-[var(--tooltip-bg)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--tooltip-fg)] opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              {sat.label}
            </span>
          </>
        );

        if (sat.to) {
          return (
            <Link
              key={sat.label}
              to={sat.to}
              aria-label={sat.label}
              className="group absolute z-10 focus:outline-none"
              style={{ transform: `translate(${x}px, ${y}px)` }}
              title={sat.label}
            >
              {inner}
            </Link>
          );
        }

        return (
          <div
            key={sat.label}
            className="group absolute z-10"
            style={{ transform: `translate(${x}px, ${y}px)` }}
            title={sat.label}
          >
            {inner}
          </div>
        );
      })}
    </div>
  );
}
