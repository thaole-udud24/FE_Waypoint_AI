import { Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/domain/page-header";
import { useLanguage, pick } from "@/lib/i18n";
import { mockPlans } from "../data/mock-plans";

const t = {
  current: { vi: "Đang dùng", en: "Current", ja: "利用中" },
  popular: { vi: "Phổ biến", en: "Popular", ja: "人気" },
  currentPlan: { vi: "Gói hiện tại", en: "Current plan", ja: "現在のプラン" },
  upgrade: { vi: "Nâng cấp", en: "Upgrade", ja: "アップグレード" },
};

export function PlanPage() {
  const { lang } = useLanguage();
  return (
    <div className="space-y-5">
      <PageHeader
        title="Gói dịch vụ"
        kanji="設定"
        subtitle="Chọn gói phù hợp để mở khóa các tính năng bảo vệ quyền lợi lao động của bạn."
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {mockPlans.map((plan) => (
          <Card
            key={plan.id}
            className={cn(
              "flex flex-col",
              plan.highlight && "border-[var(--color-primary)] ring-1 ring-[var(--color-primary)]/40"
            )}
          >
            <CardContent className="flex flex-1 flex-col pt-6">
              <div className="mb-3 flex items-center justify-between">
                <p className="font-medium text-[var(--color-text-primary)]">{pick(plan.name, lang, plan.name.vi)}</p>
                {plan.current && <Badge variant="info">{pick(t.current, lang, "Đang dùng")}</Badge>}
                {plan.highlight && !plan.current && <Badge variant="success">{pick(t.popular, lang, "Phổ biến")}</Badge>}
              </div>
              <p className="mb-4">
                <span className="font-[var(--font-numeric)] text-[length:var(--font-size-numeric)] font-semibold text-[var(--color-text-primary)]">
                  {pick(plan.price, lang, plan.price.vi)}
                </span>
                <span className="text-sm text-[var(--color-text-secondary)]">{pick(plan.period, lang, plan.period.vi)}</span>
              </p>
              <ul className="mb-5 flex-1 space-y-2">
                {plan.features.map((f) => (
                  <li key={f.vi} className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-success)]" /> {pick(f, lang, f.vi)}
                  </li>
                ))}
              </ul>
              <Button variant={plan.current ? "outline" : "primary"} disabled={plan.current} className="w-full">
                {plan.current ? pick(t.currentPlan, lang, "Gói hiện tại") : pick(t.upgrade, lang, "Nâng cấp")}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
