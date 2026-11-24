import { useState } from "react";
import { Radar, Check, X } from "lucide-react";
import { PageHeader } from "@/components/domain/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { mockLawProposals } from "../data/mock-rules";
import { useLanguage, pick } from "@/lib/i18n";

const t = {
  title: { vi: "Đề xuất từ Canh luật", en: "Law-watch proposals", ja: "法令監視からの提案" },
  subtitle: {
    vi: "Đề xuất không tự áp dụng — mọi thay đổi phải qua soạn & duyệt quy tắc thủ công (BR_027).",
    en: "Proposals never auto-apply — every change must go through manual rule drafting and approval (BR_027).",
    ja: "提案は自動適用されません — すべての変更は手動でのルール作成・承認を経る必要があります（BR_027）。",
  },
  empty: { vi: "Không có đề xuất mới", en: "No new proposals", ja: "新しい提案はありません" },
  detectedAt: { vi: "Phát hiện", en: "Detected", ja: "検出" },
  affected: { vi: "Ảnh hưởng", en: "Affects", ja: "影響" },
  accept: { vi: "Chấp nhận", en: "Accept", ja: "承認" },
  reject: { vi: "Từ chối", en: "Reject", ja: "拒否" },
};

export function AdminCanhLuatPage() {
  const { lang } = useLanguage();
  const [proposals, setProposals] = useState(mockLawProposals);

  return (
    <div className="space-y-5">
      <PageHeader title={pick(t.title, lang, t.title.vi)} subtitle={pick(t.subtitle, lang, t.subtitle.vi)} />

      {proposals.length === 0 ? (
        <Card>
          <CardContent>
            <EmptyState title={pick(t.empty, lang, t.empty.vi)} icon={<Radar className="h-10 w-10" />} />
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {proposals.map((p) => (
            <Card key={p.id}>
              <CardContent className="flex flex-wrap items-start justify-between gap-3 pt-6">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant="info">{p.source}</Badge>
                    <span className="text-xs text-[var(--color-text-disabled)]">{pick(t.detectedAt, lang, t.detectedAt.vi)} {p.detectedAt}</span>
                  </div>
                  <p className="mt-2 max-w-xl text-sm text-[var(--color-text-primary)]">{p.summary}</p>
                  {p.affectedRule && (
                    <p className="mt-1 font-mono text-xs text-[var(--color-text-disabled)]">
                      {pick(t.affected, lang, t.affected.vi)}: {p.affectedRule}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => setProposals((prev) => prev.filter((x) => x.id !== p.id))}>
                    <Check className="h-3.5 w-3.5" /> {pick(t.accept, lang, t.accept.vi)}
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setProposals((prev) => prev.filter((x) => x.id !== p.id))}>
                    <X className="h-3.5 w-3.5" /> {pick(t.reject, lang, t.reject.vi)}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
