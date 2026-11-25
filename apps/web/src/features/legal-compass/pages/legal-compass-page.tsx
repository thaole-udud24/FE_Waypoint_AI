import { useMemo, useState } from "react";
import { Search, Scale, ShieldCheck, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/domain/page-header";
import { useLanguage, pick } from "@/lib/i18n";
import { mockLawArticles } from "../data/mock-law-articles";

const t = {
  searchPlaceholder: { vi: "Tìm theo từ khóa, VD: phụ trội, nghỉ phép...", en: "Search by keyword, e.g. overtime, leave...", ja: "キーワードで検索（例：割増、休暇）" },
  noResults: { vi: "Không tìm thấy điều luật phù hợp", en: "No matching articles found", ja: "該当する条文が見つかりません" },
  verifiedAgainst: {
    vi: "Mọi điều luật đã được đối chiếu trực tiếp với văn bản gốc trên e-Gov — cổng pháp luật điện tử chính thức của Chính phủ Nhật Bản.",
    en: "Every article is cross-checked against the original text on e-Gov — the Japanese government's official law portal.",
    ja: "すべての条文は、日本政府の公式法令ポータルe-Govの原文と照合済みです。",
  },
  viewSource: { vi: "Xem văn bản gốc", en: "View official source", ja: "原文を見る" },
  verifiedOn: { vi: "Đã đối chiếu", en: "Verified", ja: "照合日" },
};

export function LegalCompassPage() {
  const { lang } = useLanguage();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return mockLawArticles;
    return mockLawArticles.filter(
      (a) =>
        pick(a.title, lang, a.title.vi).toLowerCase().includes(q) ||
        pick(a.summary, lang, a.summary.vi).toLowerCase().includes(q) ||
        pick(a.category, lang, a.category.vi).toLowerCase().includes(q)
    );
  }, [query, lang]);

  return (
    <div className="space-y-5">
      <PageHeader title="Tra cứu luật" kanji="法令" subtitle="Law Pack VN → JP · phiên bản v2026.10 · cập nhật 02/11/2026" />

      <Card className="border-[var(--color-primary)]/20 bg-[var(--color-primary-light)]">
        <CardContent className="flex items-start gap-3 py-4">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-primary-dark)]" />
          <p className="text-sm text-[var(--color-text-primary)]">{pick(t.verifiedAgainst, lang, t.verifiedAgainst.vi)}</p>
        </CardContent>
      </Card>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-disabled)]" />
        <Input
          className="pl-9"
          placeholder={pick(t.searchPlaceholder, lang, t.searchPlaceholder.vi)}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <Card>
          <CardContent>
            <EmptyState title={pick(t.noResults, lang, "Không tìm thấy điều luật phù hợp")} icon={<Scale className="h-10 w-10" />} />
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((a) => (
            <Card key={a.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-[var(--color-text-primary)]">
                      {pick(a.code, lang, a.code.vi)} — {pick(a.title, lang, a.title.vi)}
                    </p>
                    <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{pick(a.summary, lang, a.summary.vi)}</p>
                  </div>
                  <Badge variant="info">{pick(a.category, lang, a.category.vi)}</Badge>
                </div>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-[var(--color-border)] pt-3 text-xs text-[var(--color-text-secondary)]">
                  <span>
                    {pick(a.sourceName, lang, a.sourceName.vi)} · {pick(t.verifiedOn, lang, "Đã đối chiếu")} {a.lastVerified}
                  </span>
                  <a
                    href={a.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-[var(--color-primary-dark)] hover:underline"
                  >
                    {pick(t.viewSource, lang, "Xem văn bản gốc")} <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
