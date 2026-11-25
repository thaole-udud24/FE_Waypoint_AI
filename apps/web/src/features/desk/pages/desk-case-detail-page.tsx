import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, FileText, Clock3, ShieldCheck, Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { mockCases, caseStatusLabel } from "../data/mock-cases";
import { useLanguage, pick } from "@/lib/i18n";

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

const t = {
  backToDesk: { vi: "Quay lại Desk", en: "Back to Desk", ja: "Deskに戻る" },
  closeCase: { vi: "Đóng case", en: "Close case", ja: "ケースを閉じる" },
  workerSummary: {
    vi: "Tóm tắt do người lao động chia sẻ",
    en: "Summary shared by the worker",
    ja: "労働者が共有した要約",
  },
  sharedEvidence: { vi: "Bằng chứng đã chia sẻ", en: "Shared evidence", ja: "共有された証拠" },
  sendInfoRequest: {
    vi: "Gửi đề nghị bổ sung thông tin",
    en: "Send a request for more information",
    ja: "追加情報のリクエストを送信",
  },
  infoRequestPlaceholder: {
    vi: "VD: Bạn có thể cung cấp thêm bảng chấm công gốc không?",
    en: "E.g.: Could you provide the original timesheet?",
    ja: "例：元の勤怠表を提供していただけますか？",
  },
  sendRequest: { vi: "Gửi đề nghị", en: "Send request", ja: "リクエストを送信" },
  shareDeadline: { vi: "Hạn chia sẻ", en: "Share deadline", ja: "共有期限" },
  daysLeftText: {
    vi: (n: number) => `Còn ${n} ngày`,
    en: (n: number) => `${n} days left`,
    ja: (n: number) => `あと${n}日`,
  },
  internalNote: { vi: "Ghi chú nội bộ", en: "Internal note", ja: "内部メモ" },
  workerCannotSee: {
    vi: "Người lao động không nhìn thấy mục này.",
    en: "The worker cannot see this section.",
    ja: "このセクションは労働者には表示されません。",
  },
  accessLog: { vi: "Nhật ký truy cập", en: "Access log", ja: "アクセスログ" },
  viewsLogged: {
    vi: "Lượt xem của bạn được ghi lại trong nhật ký.",
    en: "Your views are recorded in the access log.",
    ja: "あなたの閲覧はアクセスログに記録されます。",
  },
  closeCaseTitle: { vi: "Đóng case?", en: "Close this case?", ja: "このケースを閉じますか？" },
  closeCaseDescription: {
    vi: "Người lao động sẽ được thông báo case đã đóng. Hành động này cần lý do để lưu vào nhật ký.",
    en: "The worker will be notified the case is closed. This action requires a reason to be logged.",
    ja: "労働者にはケースが閉じられたことが通知されます。この操作にはログに記録する理由が必要です。",
  },
  closeReasonLabel: { vi: "Lý do đóng case", en: "Reason for closing", ja: "ケースを閉じる理由" },
};

export function DeskCaseDetailPage() {
  const { id } = useParams();
  const { lang } = useLanguage();
  const c = mockCases.find((x) => x.id === id) ?? mockCases[0];
  const [note, setNote] = useState("");
  const [infoRequest, setInfoRequest] = useState("");
  const [closeOpen, setCloseOpen] = useState(false);

  function handleCloseCase(reason?: string) {
    // shortcut: ghi log ở console cho demo, thay bằng gọi API audit-log thật khi có backend.
    console.info("Case closed", { caseId: c.id, reason });
    setCloseOpen(false);
  }

  return (
    <div className="space-y-5">
      <Link to="/desk" className="inline-flex items-center gap-1.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]">
        <ArrowLeft className="h-3.5 w-3.5" /> {pick(t.backToDesk, lang, t.backToDesk.vi)}
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
          {pick(t.closeCase, lang, t.closeCase.vi)}
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        <div className="space-y-5 lg:col-span-7">
          <Card>
            <CardContent className="pt-6">
              <p className="mb-2 text-sm font-medium text-[var(--color-text-primary)]">{pick(t.workerSummary, lang, t.workerSummary.vi)}</p>
              <p className="text-sm text-[var(--color-text-secondary)]">{c.summary}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <p className="mb-3 text-sm font-medium text-[var(--color-text-primary)]">{pick(t.sharedEvidence, lang, t.sharedEvidence.vi)}</p>
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
              <p className="mb-3 text-sm font-medium text-[var(--color-text-primary)]">{pick(t.sendInfoRequest, lang, t.sendInfoRequest.vi)}</p>
              <textarea
                value={infoRequest}
                onChange={(e) => setInfoRequest(e.target.value)}
                placeholder={pick(t.infoRequestPlaceholder, lang, t.infoRequestPlaceholder.vi)}
                rows={3}
                className="w-full rounded-[16px] border border-[var(--color-border)] bg-[var(--color-surface-tint)] p-3 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-disabled)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
              <Button className="mt-2" disabled={!infoRequest.trim()}>
                <Send className="h-4 w-4" /> {pick(t.sendRequest, lang, t.sendRequest.vi)}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-5 lg:col-span-5">
          <Card className="bg-[var(--card-mint)]">
            <CardContent className="flex items-start gap-3 pt-6">
              <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-teal)]" />
              <div>
                <p className="text-sm font-medium text-[var(--color-text-primary)]">{pick(t.shareDeadline, lang, t.shareDeadline.vi)}</p>
                <p className="text-sm text-[var(--color-text-secondary)]">{(t.daysLeftText[lang] ?? t.daysLeftText.vi)(c.shareExpiresInDays)}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <p className="mb-2 text-sm font-medium text-[var(--color-text-primary)]">{pick(t.internalNote, lang, t.internalNote.vi)}</p>
              <p className="mb-2 text-xs text-[var(--color-text-disabled)]">{pick(t.workerCannotSee, lang, t.workerCannotSee.vi)}</p>
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
              <p className="mb-3 text-sm font-medium text-[var(--color-text-primary)]">{pick(t.accessLog, lang, t.accessLog.vi)}</p>
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
              <p className="text-xs text-[var(--color-text-secondary)]">{pick(t.viewsLogged, lang, t.viewsLogged.vi)}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <ConfirmDialog
        open={closeOpen}
        onOpenChange={setCloseOpen}
        title={pick(t.closeCaseTitle, lang, t.closeCaseTitle.vi)}
        description={pick(t.closeCaseDescription, lang, t.closeCaseDescription.vi)}
        confirmLabel={pick(t.closeCase, lang, t.closeCase.vi)}
        requireReason
        reasonLabel={pick(t.closeReasonLabel, lang, t.closeReasonLabel.vi)}
        onConfirm={handleCloseCase}
      />
    </div>
  );
}
