import { ShieldCheck, Archive, Scale } from "lucide-react";
import { SpaceScene } from "./space-scene";
import { WaypointLogo } from "@/components/brand/waypoint-logo";

const features = [
  { icon: ShieldCheck, label: "Đối chiếu lương" },
  { icon: Archive, label: "Lưu bằng chứng" },
  { icon: Scale, label: "Tra cứu luật" },
];

export function AuthHero() {
  return (
    <div className="relative hidden min-h-screen flex-col justify-center overflow-hidden bg-gradient-to-br from-[var(--color-primary-light)] via-[var(--color-secondary)]/50 to-[var(--color-attention-light)] p-12 md:flex">
      <SpaceScene />

      <div className="relative z-10 max-w-md">
        <WaypointLogo variant="aurora" size="lg" className="mb-6" />

        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/60 bg-white/50 px-3 py-1 text-xs font-medium text-[var(--color-text-secondary)] backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]" />
          Nền tảng đồng hành cho người lao động xa xứ
        </span>

        <h1 className="mt-5 text-4xl font-semibold leading-tight text-[var(--color-text-primary)]">
          Mỗi bước đi
          <br />
          đều có{" "}
          <span className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-attention)] bg-clip-text text-transparent">
            bằng chứng
          </span>{" "}
          rõ ràng.
        </h1>

        <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-secondary)]">
          Đối chiếu hợp đồng, lương và giờ làm một cách minh bạch, có căn cứ pháp lý — giữ lại mọi bằng chứng mang theo được trên suốt hành trình lao động của bạn.
        </p>

        <div className="mt-7 flex flex-wrap gap-2.5">
          {features.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 rounded-full border border-white/60 bg-white/60 px-3.5 py-2 text-xs font-medium text-[var(--color-text-primary)] backdrop-blur-sm"
            >
              <Icon className="h-3.5 w-3.5 text-[var(--color-primary)]" />
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
