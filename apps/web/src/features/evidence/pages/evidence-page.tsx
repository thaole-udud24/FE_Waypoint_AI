import { useState } from "react";
import { Archive, Camera, Mic, StickyNote, Plus, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PageHeader } from "@/components/domain/page-header";
import { HankoStamp } from "@/components/fx/hanko-stamp";
import { useLanguage, pick } from "@/lib/i18n";
import { useAuthStore } from "@/stores/auth-store";
import { type EvidenceKind, mockEvidence } from "../data/mock-evidence";

const kindConfig: Record<EvidenceKind, { icon: typeof Camera; label: { vi: string; en: string; ja: string } }> = {
  photo: { icon: Camera, label: { vi: "Ảnh", en: "Photo", ja: "写真" } },
  audio: { icon: Mic, label: { vi: "Ghi âm", en: "Recording", ja: "録音" } },
  note: { icon: StickyNote, label: { vi: "Ghi chú", en: "Note", ja: "メモ" } },
};

const t = {
  addButton: { vi: "Thêm bằng chứng", en: "Add evidence", ja: "証拠を追加" },
  emptyTitle: { vi: "Chưa có bằng chứng nào", en: "No evidence yet", ja: "証拠がありません" },
  emptyDesc: { vi: "Thêm ảnh, ghi âm hoặc ghi chú để bắt đầu.", en: "Add a photo, recording or note to get started.", ja: "写真・録音・メモを追加して始めましょう。" },
  linkedTo: { vi: "Liên kết", en: "Linked to", ja: "関連" },
  tabGrid: { vi: "Lưới", en: "Grid", ja: "グリッド" },
  tabPassport: { vi: "Passport", en: "Passport", ja: "パスポート" },
  passportTitle: { vi: "Hộ chiếu làm việc", en: "Work passport", ja: "就労パスポート" },
  employer: { vi: "Chủ sử dụng", en: "Employer", ja: "雇用主" },
  province: { vi: "Tỉnh/thành", en: "Province", ja: "都道府県" },
  startDate: { vi: "Ngày bắt đầu", en: "Start date", ja: "就労開始日" },
  periodsReconciled: { vi: "Kỳ đã đối chiếu", en: "Periods reconciled", ja: "照合済み期間" },
  portable: { vi: "Mang theo được (xuất PDF)", en: "Portable (export PDF)", ja: "持ち運び可能（PDF出力）" },
  exportPdf: { vi: "Xuất PDF", en: "Export PDF", ja: "PDFを出力" },
};

export function EvidencePage() {
  const { lang } = useLanguage();
  const user = useAuthStore((s) => s.user);
  const [items] = useState(mockEvidence);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Kho bằng chứng"
        kanji="証拠"
        subtitle="Lưu ảnh, ghi âm, ghi chú làm bằng chứng cho các khoản đối chiếu lương hoặc giờ làm."
        actions={
          <Button>
            <Plus className="h-4 w-4" /> {pick(t.addButton, lang, "Thêm bằng chứng")}
          </Button>
        }
      />

      <Tabs defaultValue="grid">
        <TabsList>
          <TabsTrigger value="grid">{pick(t.tabGrid, lang, "Lưới")}</TabsTrigger>
          <TabsTrigger value="passport">{pick(t.tabPassport, lang, "Passport")}</TabsTrigger>
        </TabsList>

        <TabsContent value="grid">
          {items.length === 0 ? (
            <Card>
              <CardContent>
                <EmptyState title={pick(t.emptyTitle, lang, "Chưa có bằng chứng nào")} description={pick(t.emptyDesc, lang, t.emptyDesc.vi)} icon={<Archive className="h-10 w-10" />} />
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => {
                const cfg = kindConfig[item.kind];
                const Icon = cfg.icon;
                return (
                  <Card key={item.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <div className="rounded-full bg-[var(--color-primary-light)] p-2">
                          <Icon className="h-4 w-4 text-[var(--color-primary-dark)]" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-[var(--color-text-primary)]">{pick(item.title, lang, item.title.vi)}</p>
                          <p className="mt-0.5 text-xs text-[var(--color-text-disabled)]">
                            {pick(cfg.label, lang, cfg.label.vi)} · {item.capturedAt}
                          </p>
                          {item.linkedTo && (
                            <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
                              {pick(t.linkedTo, lang, "Liên kết")}: {pick(item.linkedTo, lang, item.linkedTo.vi)}
                            </p>
                          )}
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {item.tags.map((tag) => (
                              <Badge key={tag.vi} variant="default">
                                {pick(tag, lang, tag.vi)}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="passport">
          <Card className="overflow-hidden border-none text-white" style={{ background: "var(--grad-cta)" }}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-white/80">{pick(t.passportTitle, lang, "Hộ chiếu làm việc")}</p>
                  <p className="mt-1 text-lg font-semibold">{user?.name ?? "—"}</p>
                </div>
                <HankoStamp label={{ vi: "Mang theo được", en: "Portable", ja: "携帯可" }} className="border-white/70 text-white" />
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs text-white/70">{pick(t.employer, lang, "Chủ sử dụng")}</p>
                  <p>Công ty TNHH Sản xuất ABC</p>
                </div>
                <div>
                  <p className="text-xs text-white/70">{pick(t.province, lang, "Tỉnh/thành")}</p>
                  <p>Tokyo</p>
                </div>
                <div>
                  <p className="text-xs text-white/70">{pick(t.startDate, lang, "Ngày bắt đầu")}</p>
                  <p>02/09/2026</p>
                </div>
                <div>
                  <p className="text-xs text-white/70">{pick(t.periodsReconciled, lang, "Kỳ đã đối chiếu")}</p>
                  <p>1 kỳ · 27/30 dòng khớp</p>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-white/20 pt-4">
                <p className="text-xs text-white/80">{pick(t.portable, lang, "Mang theo được (xuất PDF)")}</p>
                <Button variant="outline" size="sm" className="border-white/60 bg-white/10 text-white hover:bg-white/20">
                  <Download className="h-3.5 w-3.5" /> {pick(t.exportPdf, lang, "Xuất PDF")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
