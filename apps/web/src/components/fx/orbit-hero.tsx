import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface OrbitSatellite {
  label: string;
  icon: LucideIcon;
  status: "ok" | "warn" | "bad";
  angle: number;
}

const statusColor: Record<OrbitSatellite["status"], string> = {
  ok: "border-[var(--color-teal)] text-[var(--color-teal)]",
  warn: "border-[var(--color-gold)] text-[var(--color-gold)]",
  bad: "border-[var(--color-attention)] text-[var(--color-attention)]",
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
    <div className="relative mx-auto flex h-64 w-64 items-center justify-center sm:h-72 sm:w-72">
      <div className="orbit-ring-1 absolute inset-0 rounded-full border border-dashed border-[var(--stroke-orbit)]" />
      <div className="orbit-ring-2 absolute inset-6 rounded-full border border-dashed border-[var(--stroke-orbit)]" />

      <div className="relative z-10 flex h-32 w-32 flex-col items-center justify-center rounded-full text-center shadow-[var(--shadow-card,0_10px_30px_rgba(91,124,255,.12))]" style={{ background: "var(--grad-planet)" }}>
        <span className="text-[10px] font-medium uppercase tracking-wide text-white/90">{centerLabel}</span>
        <span className="font-[var(--font-numeric)] text-lg font-bold text-white">{centerValue}</span>
      </div>

      {satellites.map((sat) => {
        const Icon = sat.icon;
        const rad = (sat.angle * Math.PI) / 180;
        const radius = 112;
        const x = Math.cos(rad) * radius;
        const y = Math.sin(rad) * radius;
        return (
          <div
            key={sat.label}
            className="group absolute z-10"
            style={{ transform: `translate(${x}px, ${y}px)` }}
            title={sat.label}
          >
            <div
              className={cn(
                "grid h-10 w-10 place-items-center rounded-full border-2 bg-[var(--color-surface)] shadow-sm",
                statusColor[sat.status]
              )}
            >
              <Icon className="h-4 w-4" />
            </div>
            <span className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-full bg-[var(--color-text-primary)] px-2 py-0.5 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100">
              {sat.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
