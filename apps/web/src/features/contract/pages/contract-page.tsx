import { FileText, Download, AlertTriangle, Info, CalendarClock, Building2, Briefcase, Languages } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PageHeader } from "@/components/domain/page-header";
import { LawLabel } from "@/components/domain/law-label";
import { SourceChip } from "@/components/domain/source-chip";
import { useLanguage, pick } from "@/lib/i18n";
import { mockContract } from "../data/mock-contract";
import { mockContractClauses } from "../data/mock-contract-clauses";

const alertStyle = {
  warning: {
    icon: AlertTriangle,
    wrap: "border-[var(--color-attention)]/30 bg-[var(--color-attention-light)]",
    iconColor: "text-[var(--color-attention-text)]",
  },
  info: {
    icon: Info,
    wrap: "border-[var(--color-border)] bg-[var(--color-surface-secondary)]",
    iconColor: "text-[var(--color-text-secondary)]",
  },
};

const t = {
  downloadOriginal: { vi: "Tải bản gốc", en: "Download original", ja: "原本をダウンロード" },
  tabBilingual: { vi: "Song ngữ", en: "Bilingual", ja: "対訳" },
  tabTerms: { vi: "Điều khoản chính", en: "Key terms", ja: "主要条項" },
  tabSummary: { vi: "Tóm tắt", en: "Summary", ja: "まとめ" },
  article: { vi: "Điều", en: "Article", ja: "第" },
  original: { vi: "Gốc · 原文", en: "Original · 原文", ja: "原文" },
  translationLabel: { vi: "Bản dịch", en: "Translation", ja: "翻訳" },
  keyTerms: { vi: "Điều khoản chính", en: "Key terms", ja: "主要条項" },
  clarityTitle: { vi: "Mức độ rõ ràng của hợp đồng", en: "Contract clarity overview", ja: "契約の明確性" },
  signedAt: { vi: "Ký ngày", en: "Signed", ja: "締結日" },
  expiresAt: { vi: "Hết hạn", en: "Expires", ja: "満了日" },
  active: { vi: "Đang có hiệu lực", en: "Active", ja: "有効" },
  disclaimer: {
    vi: "Các nhãn và cảnh báo trên dựa trên Law Pack đã công bố — không phải kết luận pháp lý. Cần xác minh thêm, hãy dùng mục Tra cứu luật hoặc Hỏi đáp quyền lợi.",
    en: "Labels and alerts above are based on the published Law Pack — not a legal conclusion. For more verification, use Legal Compass or Rights Q&A.",
    ja: "上記のラベルと警告は公開済みのLaw Packに基づくものであり、法的結論ではありません。詳しい確認は法令検索または相談機能をご利用ください。",
  },
};

function ContractSidebar() {
  const { lang } = useLanguage();
  const c = mockContract;
  return (
    <div className="space-y-5">
      <Card>
        <CardContent className="space-y-3 pt-6">
          <div className="flex items-center gap-2.5">
            <FileText className="h-4 w-4 text-[var(--color-text-secondary)]" />
            <p className="truncate text-sm font-medium text-[var(--color-text-primary)]">{c.fileName}</p>
          </div>
          <div className="flex items-center gap-2.5 text-sm text-[var(--color-text-secondary)]">
            <Building2 className="h-4 w-4" /> {c.employer}
          </div>
          <div className="flex items-center gap-2.5 text-sm text-[var(--color-text-secondary)]">
            <Briefcase className="h-4 w-4" /> {pick(c.position, lang, c.position.vi)}
          </div>
          <div className="flex items-center gap-2.5 text-sm text-[var(--color-text-secondary)]">
            <CalendarClock className="h-4 w-4" /> {pick(t.signedAt, lang, "Ký ngày")} {c.signedAt} · {pick(t.expiresAt, lang, "Hết hạn")} {c.expiresAt}
          </div>
          <Badge variant="success">{pick(t.active, lang, "Đang có hiệu lực")}</Badge>
        </CardContent>
      </Card>

      <Card className="border-dashed">
        <CardContent className="pt-6 text-xs text-[var(--color-text-secondary)]">{pick(t.disclaimer, lang, t.disclaimer.vi)}</CardContent>
      </Card>
    </div>
  );
}

export function ContractPage() {
  const { lang } = useLanguage();
  const c = mockContract;

  return (
    <div className="space-y-5">
      <PageHeader
        title="Hợp đồng"
        kanji="契約"
        subtitle="Điều khoản đã được trích xuất tự động từ hợp đồng bạn đã tải lên."
        actions={
          <Button variant="outline">
            <Download className="h-4 w-4" /> {pick(t.downloadOriginal, lang, "Tải bản gốc")}
          </Button>
        }
      />

      {c.alerts.length > 0 && (
        <div className="space-y-2">
          {c.alerts.map((alert) => {
            const style = alertStyle[alert.severity];
            const Icon = style.icon;
            return (
              <Card key={alert.id} className={style.wrap}>
                <CardContent className="flex items-start gap-3 py-3">
                  <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${style.iconColor}`} />
                  <p className="text-sm text-[var(--color-text-primary)]">{pick(alert.message, lang, alert.message.vi)}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <Tabs defaultValue="bilingual">
        <TabsList>
          <TabsTrigger value="bilingual">
            <span className="inline-flex items-center gap-1.5">
              <Languages className="h-3.5 w-3.5" /> {pick(t.tabBilingual, lang, "Song ngữ")}
            </span>
          </TabsTrigger>
          <TabsTrigger value="terms">{pick(t.tabTerms, lang, "Điều khoản chính")}</TabsTrigger>
          <TabsTrigger value="summary">{pick(t.tabSummary, lang, "Tóm tắt")}</TabsTrigger>
        </TabsList>

        {/* Song ngữ: đối chiếu từng điều khoản gốc (Nhật) với bản dịch theo ngôn ngữ giao diện */}
        <TabsContent value="bilingual">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
            <div className="space-y-3 lg:col-span-8">
              {mockContractClauses.map((clause) => (
                <Card key={clause.no}>
                  <CardContent className="pt-6">
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                        {pick(t.article, lang, "Điều")} {clause.no} · {pick(clause.topic, lang, clause.topic.vi)}
                      </p>
                      <LawLabel value={clause.lawLabel} />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="rounded-[20px] bg-[var(--color-surface-secondary)] p-4">
                        <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-[var(--color-text-disabled)]">
                          {pick(t.original, lang, "Gốc · 原文")}
                        </p>
                        <p lang="ja" className="text-sm leading-relaxed text-[var(--color-text-primary)]" style={{ fontFamily: "var(--font-jp)" }}>
                          {clause.ja}
                        </p>
                      </div>
                      <div className="rounded-[20px] bg-[var(--card-sky)] p-4">
                        <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-[var(--color-text-disabled)]">
                          {pick(t.translationLabel, lang, "Bản dịch")}
                        </p>
                        <p className="text-sm leading-relaxed text-[var(--color-text-primary)]">{pick(clause.translation, lang, clause.translation.vi)}</p>
                      </div>
                    </div>

                    {clause.note && (
                      <p className="mt-3 rounded-[16px] bg-[var(--card-butter)] px-3.5 py-2.5 text-sm text-[var(--color-text-primary)]">
                        {pick(clause.note, lang, clause.note.vi)}
                      </p>
                    )}

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {clause.sources.map((s) => (
                        <SourceChip key={s} label={s} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="lg:col-span-4">
              <ContractSidebar />
            </div>
          </div>
        </TabsContent>

        {/* Điều khoản chính: bảng tóm lược con số đã xác nhận */}
        <TabsContent value="terms">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <Card>
                <CardContent className="pt-6">
                  <p className="mb-3 text-sm font-medium text-[var(--color-text-primary)]">{pick(t.keyTerms, lang, "Điều khoản chính")}</p>
                  <dl className="divide-y divide-[var(--color-border)]">
                    {c.terms.map((term) => (
                      <div key={term.label.vi} className="flex items-start justify-between gap-4 py-2.5">
                        <dt className="text-sm text-[var(--color-text-secondary)]">{pick(term.label, lang, term.label.vi)}</dt>
                        <dd className="text-right text-sm font-medium text-[var(--color-text-primary)]">
                          {pick(term.value, lang, term.value.vi)}
                          {term.note && (
                            <p className="mt-0.5 text-xs font-normal text-[var(--color-text-disabled)]">{pick(term.note, lang, term.note.vi)}</p>
                          )}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </CardContent>
              </Card>
            </div>
            <div className="lg:col-span-4">
              <ContractSidebar />
            </div>
          </div>
        </TabsContent>

        {/* Tóm tắt: trạng thái rõ ràng theo nhãn luật */}
        <TabsContent value="summary">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
            <div className="space-y-5 lg:col-span-8">
              <Card>
                <CardContent className="pt-6">
                  <p className="mb-3 text-sm font-medium text-[var(--color-text-primary)]">{pick(t.clarityTitle, lang, "Mức độ rõ ràng của hợp đồng")}</p>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    {(["compliant", "ask_again", "no_rule"] as const).map((v) => {
                      const count = mockContractClauses.filter((cl) => cl.lawLabel === v).length;
                      return (
                        <div key={v} className="rounded-[20px] bg-[var(--color-surface-secondary)] py-4">
                          <p className="font-[var(--font-numeric)] text-[length:var(--font-size-numeric)] font-bold text-[var(--color-text-primary)]">
                            {count}
                          </p>
                          <div className="mt-1.5 flex justify-center">
                            <LawLabel value={v} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="lg:col-span-4">
              <ContractSidebar />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
