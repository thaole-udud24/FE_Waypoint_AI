import { ShieldCheck, Archive, Scale } from "lucide-react";
import { SpaceScene } from "./space-scene";
import { WaypointLogo } from "@/components/brand/waypoint-logo";
import { useLanguage, pick } from "@/lib/i18n";

const t = {
  badge: {
    vi: "Nền tảng đồng hành cho người lao động xa xứ",
    en: "A companion platform for migrant workers",
    ja: "海外で働く人々のための伴走プラットフォーム",
  },
  titlePrefix: {
    vi: "Mỗi bước đi\nđều có",
    en: "Every step\nhas clear",
    ja: "すべての一歩に",
  },
  titleHighlight: {
    vi: "bằng chứng",
    en: "evidence",
    ja: "確かな証拠",
  },
  titleSuffix: {
    vi: "rõ ràng.",
    en: "you own.",
    ja: "を。",
  },
  subtitle: {
    vi: "Đối chiếu hợp đồng, lương và giờ làm một cách minh bạch, có căn cứ pháp lý — giữ lại mọi bằng chứng mang theo được trên suốt hành trình lao động của bạn.",
    en: "Reconcile contracts, pay and working hours transparently with legal references — and keep portable evidence throughout your journey.",
    ja: "契約・給与・労働時間を法的根拠とともに透明に照合し、いつでも持ち運べる証拠として安全に保管できます。",
  },
  f1: { vi: "Đối chiếu lương", en: "Pay check", ja: "給与照合" },
  f2: { vi: "Lưu bằng chứng", en: "Evidence vault", ja: "証拠保管" },
  f3: { vi: "Tra cứu luật", en: "Legal compass", ja: "法令検索" },
};

export function AuthHero() {
  const { lang } = useLanguage();

  const features = [
    { icon: ShieldCheck, label: pick(t.f1, lang, "Đối chiếu lương") },
    { icon: Archive, label: pick(t.f2, lang, "Lưu bằng chứng") },
    { icon: Scale, label: pick(t.f3, lang, "Tra cứu luật") },
  ];

  return (
    <div
      className="relative hidden min-h-screen flex-col justify-center overflow-hidden p-12 md:flex"
      style={{ background: "var(--grad-cosmos)" }}
    >
      <SpaceScene />

      <div className="relative z-10 max-w-md">
        <WaypointLogo variant="aurora" size="lg" className="mb-6" />

        <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--chip-border)] bg-[var(--chip-surface)] px-3 py-1 text-xs font-medium text-[var(--color-text-primary)] backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]" />
          {pick(t.badge, lang, t.badge.vi)}
        </span>

        <h1 className="mt-5 whitespace-pre-line text-4xl font-semibold leading-tight text-[var(--color-text-primary)]">
          {pick(t.titlePrefix, lang, t.titlePrefix.vi)}{" "}
          <span className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-attention)] bg-clip-text text-transparent">
            {pick(t.titleHighlight, lang, t.titleHighlight.vi)}
          </span>{" "}
          {pick(t.titleSuffix, lang, t.titleSuffix.vi)}
        </h1>

        <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-secondary)]">
          {pick(t.subtitle, lang, t.subtitle.vi)}
        </p>

        <div className="mt-7 flex flex-wrap gap-2.5">
          {features.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 rounded-full border border-[var(--chip-border)] bg-[var(--chip-surface)] px-3.5 py-2 text-xs font-medium text-[var(--color-text-primary)] backdrop-blur-md"
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
