import { useMemo, useState } from "react";
import { Search, Scale } from "lucide-react";
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
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
