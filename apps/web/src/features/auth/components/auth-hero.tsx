import { ShieldCheck, Archive, Scale } from "lucide-react";
import { SpaceScene } from "./space-scene";
import { WaypointLogo } from "@/components/brand/waypoint-logo";
import { useLanguage, pick } from "@/lib/i18n";

const features = [
  { icon: ShieldCheck, label: { vi: "Đối chiếu lương", en: "Pay reconciliation", ja: "給与の照合" } },
  { icon: Archive, label: { vi: "Lưu bằng chứng", en: "Keep evidence", ja: "証拠の保存" } },
  { icon: Scale, label: { vi: "Tra cứu luật", en: "Look up the law", ja: "法令の検索" } },
];

const t = {
  badge: {
    vi: "Nền tảng đồng hành cho người lao động xa xứ",
    en: "A companion platform for workers far from home",
    ja: "海外で働く人のための同行プラットフォーム",
  },
  headlineLead: { vi: "Mỗi bước đi", en: "Every step", ja: "一歩一歩に" },
  headlineMid: { vi: "đều có", en: "comes with", ja: "必ず" },
  headlineEmphasis: { vi: "bằng chứng", en: "evidence", ja: "証拠" },
  headlineTail: { vi: "rõ ràng.", en: "that's clear.", ja: "が残ります。" },
  body: {
    vi: "Đối chiếu hợp đồng, lương và giờ làm một cách minh bạch, có căn cứ pháp lý — giữ lại mọi bằng chứng mang theo được trên suốt hành trình lao động của bạn.",
    en: "Reconcile your contract, pay, and hours transparently and on legal grounds — keeping every piece of evidence portable throughout your working journey.",
    ja: "契約・給与・勤務時間を透明かつ法的根拠をもって照合し、働く旅のあいだ持ち運べる証拠として残します。",
  },
};

export function AuthHero() {
  const { lang } = useLanguage();

  return (
    <div className="relative hidden min-h-screen flex-col justify-center overflow-hidden bg-gradient-to-br from-[var(--color-primary-light)] via-[var(--color-secondary)]/50 to-[var(--color-attention-light)] p-12 md:flex">
      <SpaceScene />

      <div className="relative z-10 max-w-md">
        <WaypointLogo variant="aurora" size="lg" className="mb-6" />

        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/60 bg-white/50 px-3 py-1 text-xs font-medium text-[var(--color-text-secondary)] backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]" />
          {pick(t.badge, lang, t.badge.vi)}
        </span>

        <h1 className="mt-5 text-4xl font-semibold leading-tight text-[var(--color-text-primary)]">
          {pick(t.headlineLead, lang, t.headlineLead.vi)}
          <br />
          {pick(t.headlineMid, lang, t.headlineMid.vi)}{" "}
          <span className="font-bold text-[var(--color-primary)]">{pick(t.headlineEmphasis, lang, t.headlineEmphasis.vi)}</span>{" "}
          {pick(t.headlineTail, lang, t.headlineTail.vi)}
        </h1>

        <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-secondary)]">{pick(t.body, lang, t.body.vi)}</p>

        <div className="mt-7 flex flex-wrap gap-2.5">
          {features.map(({ icon: Icon, label }) => (
            <div
              key={label.vi}
              className="flex items-center gap-2 rounded-full border border-white/60 bg-white/60 px-3.5 py-2 text-xs font-medium text-[var(--color-text-primary)] backdrop-blur-sm"
            >
              <Icon className="h-3.5 w-3.5 text-[var(--color-primary)]" />
              {pick(label, lang, label.vi)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
