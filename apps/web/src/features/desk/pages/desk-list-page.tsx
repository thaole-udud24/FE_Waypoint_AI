import { useState } from "react";
import { Link } from "react-router-dom";
import { Inbox, Clock, CheckCircle2, UserCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/domain/page-header";
import { type CaseStatus, caseStatusLabel, mockCases } from "../data/mock-cases";

const statusVariant: Record<CaseStatus, "info" | "warning" | "success" | "default"> = {
  new: "info",
  processing: "warning",
  waiting_worker: "default",
  closed: "success",
};

export function DeskListPage() {
  const [cases, setCases] = useState(mockCases);

  const kpis = [
    { label: "Case mới", value: cases.filter((c) => c.status === "new").length, icon: Inbox },
    { label: "Đang xử lý", value: cases.filter((c) => c.status === "processing").length, icon: Clock },
    { label: "Chờ người lao động", value: cases.filter((c) => c.status === "waiting_worker").length, icon: UserCheck },
    { label: "Sắp hết hạn chia sẻ (≤3 ngày)", value: cases.filter((c) => c.shareExpiresInDays <= 3).length, icon: CheckCircle2 },
  ];

  return (
    <div className="space-y-5">
      <PageHeader title="Desk" subtitle="Danh sách case thuộc tổ chức của bạn." />

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
                  {c.shareExpiresInDays <= 3 && <Badge variant="warning">Hết hạn sau {c.shareExpiresInDays} ngày</Badge>}
                </div>
                <p className="mt-1 font-medium text-[var(--color-text-primary)]">{c.issueType}</p>
                <p className="text-sm text-[var(--color-text-secondary)]">{c.summary}</p>
                <p className="mt-1 text-xs text-[var(--color-text-disabled)]">
                  Nhận {c.receivedAt} · {c.evidenceCount} bằng chứng {c.assignee && `· Phụ trách: ${c.assignee}`}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {c.status === "new" ? (
                  <Button
                    size="sm"
                    onClick={() => setCases((prev) => prev.map((x) => (x.id === c.id ? { ...x, status: "processing", assignee: "Bạn" } : x)))}
                  >
                    Nhận xử lý
                  </Button>
                ) : (
                  <Link to={`/desk/case/${c.id}`} className="text-sm font-medium text-[var(--color-primary)] hover:underline">
                    Xem chi tiết →
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
