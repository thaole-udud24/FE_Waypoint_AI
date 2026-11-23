import { useState } from "react";
import { FolderCheck, Plus, Share2, FileStack, FileClock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/domain/page-header";
import { useLanguage, pick } from "@/lib/i18n";
import { CasePackWizardModal } from "../components/case-pack-wizard-modal";
import { AccessLogDrawer } from "../components/access-log-drawer";
import { type CasePackStatus, mockCasePacks } from "../data/mock-case-packs";

const statusConfig: Record<CasePackStatus, { label: { vi: string; en: string; ja: string }; variant: "success" | "warning" | "default" }> = {
  shared: { label: { vi: "Đang chia sẻ", en: "Sharing", ja: "共有中" }, variant: "success" },
  draft: { label: { vi: "Bản nháp", en: "Draft", ja: "下書き" }, variant: "warning" },
  expired: { label: { vi: "Đã hết hạn", en: "Expired", ja: "期限切れ" }, variant: "default" },
};

const t = {
  createButton: { vi: "Tạo hồ sơ mới", en: "Create new case", ja: "新規ケースを作成" },
  emptyTitle: { vi: "Chưa có hồ sơ nào", en: "No cases yet", ja: "まだケースがありません" },
  emptyDesc: { vi: "Tạo hồ sơ từ các khoản lệch được phát hiện ở PayGuard AI.", en: "Create a case from mismatches detected by PayGuard AI.", ja: "PayGuard AIが検出した不一致からケースを作成しましょう。" },
  items: { vi: "mục", en: "items", ja: "件" },
  created: { vi: "Tạo", en: "Created", ja: "作成日" },
  expiresIn: { vi: (d: number) => ` · hết hạn sau ${d} ngày`, en: (d: number) => ` · expires in ${d} days`, ja: (d: number) => ` ・${d}日後に期限切れ` },
  revokeNow: { vi: "Thu hồi ngay", en: "Revoke now", ja: "今すぐ取り消す" },
  viewLog: { vi: "Xem nhật ký", en: "View log", ja: "履歴を見る" },
};

export function CasePackPage() {
  const { lang } = useLanguage();
  const [packs, setPacks] = useState(mockCasePacks);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [logOpenFor, setLogOpenFor] = useState<string | null>(null);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Hồ sơ nhờ hỗ trợ"
        kanji="支援"
        subtitle="Gom bằng chứng, đối chiếu lương và hợp đồng thành một bộ hồ sơ để chia sẻ với nghiệp đoàn hoặc luật sư."
        actions={
          <Button onClick={() => setWizardOpen(true)}>
            <Plus className="h-4 w-4" /> {pick(t.createButton, lang, "Tạo hồ sơ mới")}
          </Button>
        }
      />

      {packs.length === 0 ? (
        <Card>
          <CardContent>
            <EmptyState title={pick(t.emptyTitle, lang, "Chưa có hồ sơ nào")} description={pick(t.emptyDesc, lang, t.emptyDesc.vi)} icon={<FolderCheck className="h-10 w-10" />} />
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {packs.map((pack) => {
            const cfg = statusConfig[pack.status];
            return (
              <Card key={pack.id}>
                <CardContent className="flex flex-wrap items-center justify-between gap-3 pt-6">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-[var(--color-teal)]/15 p-2">
                      <FolderCheck className="h-4 w-4 text-[var(--color-teal)]" />
                    </div>
                    <div>
                      <p className="font-medium text-[var(--color-text-primary)]">{pick(pack.title, lang, pack.title.vi)}</p>
                      <p className="mt-0.5 flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)]">
                        <FileStack className="h-3 w-3" /> {pack.itemCount} {pick(t.items, lang, "mục")} · {pick(t.created, lang, "Tạo")} {pack.createdAt}
                      </p>
                      {pack.sharedWith && (
                        <p className="mt-1 flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)]">
                          <Share2 className="h-3 w-3" /> {pick(pack.sharedWith, lang, pack.sharedWith.vi)}
                          {pack.expiresInDays != null && t.expiresIn[lang](pack.expiresInDays)}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <Badge variant={cfg.variant}>{pick(cfg.label, lang, cfg.label.vi)}</Badge>
                    {pack.status === "shared" && (
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost" onClick={() => setLogOpenFor(pack.id)}>
                          <FileClock className="h-3.5 w-3.5" /> {pick(t.viewLog, lang, "Xem nhật ký")}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setPacks((prev) => prev.map((p) => (p.id === pack.id ? { ...p, status: "expired" } : p)))}
                        >
                          {pick(t.revokeNow, lang, "Thu hồi ngay")}
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <CasePackWizardModal open={wizardOpen} onOpenChange={setWizardOpen} />
      <AccessLogDrawer open={!!logOpenFor} onClose={() => setLogOpenFor(null)} />
    </div>
  );
}
