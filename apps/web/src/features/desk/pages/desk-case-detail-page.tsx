import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, FileText, Clock3, ShieldCheck, Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { mockCases, caseStatusLabel } from "../data/mock-cases";

// shortcut: dữ liệu bằng chứng/nhật ký mẫu, thay bằng gọi API thật (FUN_120-123).
const mockSharedEvidence = [
  { id: "e1", title: "Phiếu lương kỳ 11/2026.pdf" },
  { id: "e2", title: "Kết quả đối chiếu kỳ 11/2026" },
  { id: "e3", title: "Ghi âm trao đổi với quản lý" },
];

const mockAccessLog = [
  { id: "l1", actor: "Bạn", action: "Đã xem tóm tắt", time: "23/11/2026 09:12" },
  { id: "l2", actor: "Bạn", action: "Đã xem bằng chứng #2", time: "23/11/2026 09:14" },
];

export function DeskCaseDetailPage() {
  const { id } = useParams();
  const c = mockCases.find((x) => x.id === id) ?? mockCases[0];
  const [note, setNote] = useState("");
  const [infoRequest, setInfoRequest] = useState("");
  const [closeOpen, setCloseOpen] = useState(false);

  return (
    <div className="space-y-5">
      <Link to="/desk" className="inline-flex items-center gap-1.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]">
        <ArrowLeft className="h-3.5 w-3.5" /> Quay lại Desk
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <p className="font-mono text-xs text-[var(--color-text-disabled)]">{c.code}</p>
            <Badge variant="info">{caseStatusLabel[c.status]}</Badge>
          </div>
          <h1 className="mt-1 text-[length:var(--font-size-sectionHeading)] font-semibold text-[var(--color-text-primary)]">
            {c.issueType}
          </h1>
        </div>
        <Button variant="destructive" onClick={() => setCloseOpen(true)}>
          Đóng case
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        <div className="space-y-5 lg:col-span-7">
          <Card>
            <CardContent className="pt-6">
              <p className="mb-2 text-sm font-medium text-[var(--color-text-primary)]">Tóm tắt do người lao động chia sẻ</p>
              <p className="text-sm text-[var(--color-text-secondary)]">{c.summary}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <p className="mb-3 text-sm font-medium text-[var(--color-text-primary)]">Bằng chứng đã chia sẻ</p>
              <div className="space-y-2">
                {mockSharedEvidence.map((e) => (
                  <div key={e.id} className="flex items-center gap-2.5 rounded-[14px] border border-[var(--color-border)] px-3 py-2.5">
                    <FileText className="h-4 w-4 text-[var(--color-text-secondary)]" />
                    <span className="text-sm text-[var(--color-text-primary)]">{e.title}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <p className="mb-3 text-sm font-medium text-[var(--color-text-primary)]">Gửi đề nghị bổ sung thông tin</p>
              <textarea
                value={infoRequest}
                onChange={(e) => setInfoRequest(e.target.value)}
                placeholder="VD: Bạn có thể cung cấp thêm bảng chấm công gốc không?"
                rows={3}
                className="w-full rounded-[16px] border border-[var(--color-border)] bg-[var(--color-surface-tint)] p-3 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-disabled)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
              <Button className="mt-2" disabled={!infoRequest.trim()}>
                <Send className="h-4 w-4" /> Gửi đề nghị
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-5 lg:col-span-5">
          <Card className="bg-[var(--card-mint)]">
            <CardContent className="flex items-start gap-3 pt-6">
              <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-teal)]" />
              <div>
                <p className="text-sm font-medium text-[var(--color-text-primary)]">Hạn chia sẻ</p>
                <p className="text-sm text-[var(--color-text-secondary)]">Còn {c.shareExpiresInDays} ngày</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <p className="mb-2 text-sm font-medium text-[var(--color-text-primary)]">Ghi chú nội bộ</p>
              <p className="mb-2 text-xs text-[var(--color-text-disabled)]">Người lao động không nhìn thấy mục này.</p>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={4}
                className="w-full rounded-[16px] border border-[var(--color-border)] bg-[var(--color-surface-tint)] p-3 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <p className="mb-3 text-sm font-medium text-[var(--color-text-primary)]">Nhật ký truy cập</p>
              <div className="space-y-2">
                {mockAccessLog.map((l) => (
                  <div key={l.id} className="text-xs text-[var(--color-text-secondary)]">
                    <span className="font-medium text-[var(--color-text-primary)]">{l.actor}</span> {l.action} ·{" "}
                    {l.time}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-dashed">
            <CardContent className="flex items-center gap-3 pt-6">
              <ShieldCheck className="h-4 w-4 text-[var(--color-text-secondary)]" />
              <p className="text-xs text-[var(--color-text-secondary)]">Lượt xem của bạn được ghi lại trong nhật ký.</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <ConfirmDialog
        open={closeOpen}
        onOpenChange={setCloseOpen}
        title="Đóng case?"
        description="Người lao động sẽ được thông báo case đã đóng. Hành động này cần lý do để lưu vào nhật ký."
        confirmLabel="Đóng case"
        onConfirm={() => setCloseOpen(false)}
      />
    </div>
  );
}
