import { useEffect, useState } from "react";

function OrbitScene() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative flex h-[380px] w-[380px] items-center justify-center">
        <div className="orbit-ring-1 absolute flex h-[380px] w-[380px] items-center justify-center rounded-full border border-white/40">
          <span className="absolute left-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-white shadow-[0_0_12px_2px_rgba(255,255,255,0.8)]" />
        </div>
        <div className="orbit-ring-2 absolute flex h-[260px] w-[260px] items-center justify-center rounded-full border border-white/50">
          <span className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-[var(--color-primary)] shadow-[0_0_14px_3px_rgba(255,255,255,0.6)]" />
        </div>
        <div className="orbit-ring-3 absolute flex h-[480px] w-[480px] items-center justify-center rounded-full border border-white/30">
          <span className="absolute bottom-2 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-white/90" />
        </div>
        <div className="h-16 w-16 rounded-full bg-gradient-to-br from-white to-[var(--color-primary)] shadow-[0_0_40px_10px_rgba(255,255,255,0.5)]" />
      </div>
    </div>
  );
}

function CloudScene() {
  return (
    <div className="absolute inset-0">
      <div className="cloud-a absolute -left-16 top-10 h-72 w-72 rounded-full bg-[var(--color-secondary)]/50 blur-3xl" />
      <div className="cloud-b absolute right-0 top-1/3 h-80 w-80 rounded-full bg-[var(--color-attention)]/40 blur-3xl" />
      <div className="cloud-c absolute bottom-10 left-1/4 h-64 w-64 rounded-full bg-[var(--color-primary-light)] blur-3xl" />
      <div className="cloud-b absolute bottom-1/4 right-1/4 h-56 w-56 rounded-full bg-white/50 blur-3xl" style={{ animationDelay: "3s" }} />
    </div>
  );
}

function AuroraScene() {
  return (
    <div className="absolute inset-0">
      <div className="cloud-a absolute left-1/4 top-0 h-[420px] w-[180px] rotate-12 rounded-full bg-gradient-to-b from-[var(--color-primary)]/40 to-transparent blur-3xl" />
      <div
        className="cloud-c absolute right-1/4 top-0 h-[420px] w-[180px] -rotate-12 rounded-full bg-gradient-to-b from-[var(--color-attention)]/40 to-transparent blur-3xl"
        style={{ animationDelay: "4s" }}
      />
      <div className="cloud-b absolute bottom-0 left-1/3 h-[300px] w-[220px] rounded-full bg-gradient-to-t from-white/40 to-transparent blur-3xl" />
    </div>
  );
}

const scenes = [OrbitScene, CloudScene, AuroraScene];

export function SpaceScene() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setActive((i) => (i + 1) % scenes.length), 8000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {scenes.map((Scene, i) => (
        <div key={i} className="absolute inset-0 transition-opacity duration-[1500ms]" style={{ opacity: i === active ? 1 : 0 }}>
          <Scene />
        </div>
      ))}

      {[
        { top: "12%", left: "20%", delay: "0s" },
        { top: "22%", left: "70%", delay: "0.6s" },
        { top: "65%", left: "15%", delay: "1.2s" },
        { top: "75%", left: "80%", delay: "0.3s" },
        { top: "40%", left: "85%", delay: "0.9s" },
        { top: "88%", left: "45%", delay: "1.5s" },
      ].map((star, i) => (
        <span
          key={i}
          className="star-twinkle absolute h-1 w-1 rounded-full bg-white"
          style={{ top: star.top, left: star.left, animationDelay: star.delay }}
        />
      ))}

      {/* chỉ báo cảnh hiện tại */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-1.5">
        {scenes.map((_, i) => (
          <span
            key={i}
            className="h-1.5 rounded-full bg-white/70 transition-all duration-500"
            style={{ width: i === active ? "18px" : "6px", opacity: i === active ? 1 : 0.4 }}
          />
        ))}
      </div>
    </div>
  );
}
