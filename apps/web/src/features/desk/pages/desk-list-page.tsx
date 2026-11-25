import { useState } from "react";
import { Link } from "react-router-dom";
import { Inbox, Clock, CheckCircle2, UserCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/domain/page-header";
import { type CaseStatus, caseStatusLabel, mockCases } from "../data/mock-cases";
import { useLanguage, pick } from "@/lib/i18n";

const statusVariant: Record<CaseStatus, "info" | "warning" | "success" | "default"> = {
  new: "info",
  processing: "warning",
  waiting_worker: "default",
  closed: "success",
};

const t = {
  subtitle: { vi: "Danh sách case thuộc tổ chức của bạn.", en: "Cases belonging to your organization.", ja: "所属組織のケース一覧。" },
  newCases: { vi: "Case mới", en: "New cases", ja: "新規ケース" },
  processing: { vi: "Đang xử lý", en: "Processing", ja: "対応中" },
  waitingWorker: { vi: "Chờ người lao động", en: "Waiting on worker", ja: "労働者の対応待ち" },
  expiringSoon: { vi: "Sắp hết hạn chia sẻ (≤3 ngày)", en: "Sharing expiring soon (≤3 days)", ja: "共有期限間近（3日以内）" },
  expiresInDays: { vi: (n: number) => `Hết hạn sau ${n} ngày`, en: (n: number) => `Expires in ${n} days`, ja: (n: number) => `${n}日後に期限切れ` },
  receivedAt: { vi: "Nhận", en: "Received", ja: "受信" },
  evidenceCount: { vi: "bằng chứng", en: "evidence item(s)", ja: "件の証拠" },
  assignedTo: { vi: "Phụ trách", en: "Assigned to", ja: "担当" },
  claim: { vi: "Nhận xử lý", en: "Claim", ja: "対応を担当する" },
  you: { vi: "Bạn", en: "You", ja: "あなた" },
  viewDetail: { vi: "Xem chi tiết →", en: "View detail →", ja: "詳細を見る →" },
};

export function DeskListPage() {
  const { lang } = useLanguage();
  const [cases, setCases] = useState(mockCases);

  const kpis = [
    { label: pick(t.newCases, lang, t.newCases.vi), value: cases.filter((c) => c.status === "new").length, icon: Inbox },
    { label: pick(t.processing, lang, t.processing.vi), value: cases.filter((c) => c.status === "processing").length, icon: Clock },
    { label: pick(t.waitingWorker, lang, t.waitingWorker.vi), value: cases.filter((c) => c.status === "waiting_worker").length, icon: UserCheck },
    { label: pick(t.expiringSoon, lang, t.expiringSoon.vi), value: cases.filter((c) => c.shareExpiresInDays <= 3).length, icon: CheckCircle2 },
  ];

  return (
    <div className="space-y-5">
      <PageHeader title="Desk" subtitle={pick(t.subtitle, lang, t.subtitle.vi)} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <Card key={k.label}>
            <CardContent className="pt-6">
              <k.icon className="h-4 w-4 text-[var(--color-teal)]" />
              <p className="mt-2 font-[var(--font-numeric)] text-[length:var(--font-size-numeric)] font-bold text-[var(--color-text-primary)]">
                {k.value}
              </p>
              <p className="text-xs text-[var(--color-text-secondary)]">{k.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-3">
        {cases.map((c) => (
          <Card key={c.id}>
            <CardContent className="flex flex-wrap items-center justify-between gap-3 pt-6">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-mono text-xs text-[var(--color-text-disabled)]">{c.code}</p>
                  <Badge variant={statusVariant[c.status]}>{caseStatusLabel[c.status]}</Badge>
                  {c.shareExpiresInDays <= 3 && (
                    <Badge variant="warning">{(t.expiresInDays[lang] ?? t.expiresInDays.vi)(c.shareExpiresInDays)}</Badge>
                  )}
                </div>
                <p className="mt-1 font-medium text-[var(--color-text-primary)]">{c.issueType}</p>
                <p className="text-sm text-[var(--color-text-secondary)]">{c.summary}</p>
                <p className="mt-1 text-xs text-[var(--color-text-disabled)]">
                  {pick(t.receivedAt, lang, t.receivedAt.vi)} {c.receivedAt} · {c.evidenceCount} {pick(t.evidenceCount, lang, t.evidenceCount.vi)}{" "}
                  {c.assignee && `· ${pick(t.assignedTo, lang, t.assignedTo.vi)}: ${c.assignee}`}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {c.status === "new" ? (
                  <Button
                    size="sm"
                    onClick={() =>
                      setCases((prev) =>
                        prev.map((x) => (x.id === c.id ? { ...x, status: "processing", assignee: pick(t.you, lang, t.you.vi) } : x))
                      )
                    }
                  >
                    {pick(t.claim, lang, t.claim.vi)}
                  </Button>
                ) : (
                  <Link to={`/desk/case/${c.id}`} className="text-sm font-medium text-[var(--color-primary)] hover:underline">
                    {pick(t.viewDetail, lang, t.viewDetail.vi)}
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
