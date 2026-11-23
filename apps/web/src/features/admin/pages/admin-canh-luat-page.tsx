import { useState } from "react";
import { Radar, Check, X } from "lucide-react";
import { PageHeader } from "@/components/domain/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { mockLawProposals } from "../data/mock-rules";

export function AdminCanhLuatPage() {
  const [proposals, setProposals] = useState(mockLawProposals);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Đề xuất từ Canh luật"
        subtitle="Đề xuất không tự áp dụng — mọi thay đổi phải qua soạn & duyệt quy tắc thủ công (BR_027)."
      />

      {proposals.length === 0 ? (
        <Card>
          <CardContent>
            <EmptyState title="Không có đề xuất mới" icon={<Radar className="h-10 w-10" />} />
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
                    <span className="text-xs text-[var(--color-text-disabled)]">Phát hiện {p.detectedAt}</span>
                  </div>
                  <p className="mt-2 max-w-xl text-sm text-[var(--color-text-primary)]">{p.summary}</p>
                  {p.affectedRule && (
                    <p className="mt-1 font-mono text-xs text-[var(--color-text-disabled)]">
                      Ảnh hưởng: {p.affectedRule}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => setProposals((prev) => prev.filter((x) => x.id !== p.id))}>
                    <Check className="h-3.5 w-3.5" /> Chấp nhận
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setProposals((prev) => prev.filter((x) => x.id !== p.id))}>
                    <X className="h-3.5 w-3.5" /> Từ chối
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
