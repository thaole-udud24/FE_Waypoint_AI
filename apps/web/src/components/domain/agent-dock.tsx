import { useState } from "react";
import { Link } from "react-router-dom";
import { Bot, FileText, Wallet, ShieldCheck, Scale, Users, Archive, Check, X, Lightbulb, RotateCcw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage, pick } from "@/lib/i18n";

// shortcut: dữ liệu mẫu, thay bằng gọi API Agent (FUN_072-078) khi backend sẵn sàng.
const agentIcons = [FileText, Wallet, ShieldCheck, Scale, Users, Archive];

const mockRunningTask = {
  vi: "Mochi đang đối chiếu kỳ 11/2026",
  en: "Mochi is reconciling period 11/2026",
  ja: "Mochiが2026年11月分を照合中",
};
const mockApproval = {
  description: {
    vi: "Soạn thư hỏi lại mức phụ trội làm thêm gửi tới phòng nhân sự.",
    en: "Draft a letter to HR querying the overtime premium rate.",
    ja: "残業割増率についてHRへ問い合わせる文書を作成。",
  },
  hoursLeft: 42,
};
const mockSuggestion = {
  vi: "Luật tiền lương tối thiểu Tokyo vừa đổi — xem ảnh hưởng tới hợp đồng của bạn?",
  en: "Tokyo's minimum wage law just changed — see how it affects your contract?",
  ja: "東京都の最低賃金が改定されました — 契約への影響を確認しますか？",
};

const t = {
  yourAssistant: { vi: "Trợ lý của bạn", en: "Your assistant", ja: "あなたのアシスタント" },
  waitingApproval: { vi: "Chờ bạn duyệt", en: "Waiting for your approval", ja: "承認待ち" },
  decidedApproved: {
    vi: "Đã duyệt — có thể hoàn tác trong 24 giờ.",
    en: "Approved — can be undone within 24 hours.",
    ja: "承認済み — 24時間以内なら取り消し可能。",
  },
  decidedRejected: { vi: "Đã từ chối.", en: "Rejected.", ja: "却下しました。" },
  undo: { vi: "Hoàn tác", en: "Undo", ja: "取り消す" },
  hoursLeftToDecide: {
    vi: (h: number) => `Còn ${h} giờ để quyết định`,
    en: (h: number) => `${h} hours left to decide`,
    ja: (h: number) => `決定まで残り${h}時間`,
  },
  approve: { vi: "Duyệt", en: "Approve", ja: "承認" },
  reject: { vi: "Từ chối", en: "Reject", ja: "却下" },
  runningCount: { vi: "việc đang chạy", en: "running", ja: "件実行中" },
  pendingCount: { vi: "chờ duyệt", en: "pending", ja: "件承認待ち" },
  viewAll: { vi: "Xem tất cả →", en: "View all →", ja: "すべて見る →" },
  neverAutoSend: {
    vi: "Trợ lý không bao giờ tự gửi, tự chia sẻ hay thanh toán.",
    en: "The assistant never sends, shares or pays on its own.",
    ja: "アシスタントが自動で送信・共有・支払いを行うことはありません。",
  },
};

export function AgentDock() {
  const { lang } = useLanguage();
  const [decided, setDecided] = useState<"approved" | "rejected" | null>(null);

  return (
    <Card className="overflow-hidden border-none" style={{ background: "linear-gradient(160deg,var(--card-butter) 0%,var(--card-sky) 100%)" }}>
      <CardContent className="pt-6">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-semibold text-[var(--color-text-primary)]">{pick(t.yourAssistant, lang, "Trợ lý của bạn")}</p>
          {lang === "ja" && (
            <span lang="ja" className="text-xs text-[var(--color-text-secondary)]" style={{ fontFamily: "var(--font-jp)" }}>
              助手
            </span>
          )}
        </div>

        <div className="relative mx-auto mb-4 flex h-24 w-24 items-center justify-center">
          <div className="orbit-ring-1 absolute inset-0 rounded-full border border-dashed border-[var(--stroke-orbit)]" />
          <div
            className="relative z-10 grid h-12 w-12 place-items-center rounded-full text-white shadow-sm"
            style={{ background: "var(--grad-planet)" }}
          >
            <Bot className="h-5 w-5" />
          </div>
          {agentIcons.map((Icon, i) => {
            const angle = (i * 360) / agentIcons.length;
            const rad = (angle * Math.PI) / 180;
            const r = 44;
            return (
              <div
                key={i}
                className="absolute grid h-6 w-6 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]"
                style={{ transform: `translate(${Math.cos(rad) * r}px, ${Math.sin(rad) * r}px)` }}
              >
                <Icon className="h-3 w-3 text-[var(--color-text-secondary)]" />
              </div>
            );
          })}
        </div>

        <p className="text-center text-xs font-medium text-[var(--color-text-secondary)]">{pick(mockRunningTask, lang, mockRunningTask.vi)}</p>

        <div className="mt-4 rounded-[16px] border border-[var(--color-border)] bg-[var(--color-surface)]/80 p-3 backdrop-blur-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-secondary)]">{pick(t.waitingApproval, lang, "Chờ bạn duyệt")}</p>
          <p className="mt-1 text-sm text-[var(--color-text-primary)]">{pick(mockApproval.description, lang, mockApproval.description.vi)}</p>
          {decided ? (
            <div className="mt-2 flex items-center justify-between gap-2">
              <p className="text-xs font-medium text-[var(--color-text-secondary)]">
                {decided === "approved" ? pick(t.decidedApproved, lang, t.decidedApproved.vi) : pick(t.decidedRejected, lang, t.decidedRejected.vi)}
              </p>
              <button
                type="button"
                onClick={() => setDecided(null)}
                className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-[var(--color-primary)] hover:underline"
              >
                <RotateCcw className="h-3 w-3" /> {pick(t.undo, lang, "Hoàn tác")}
              </button>
            </div>
          ) : (
            <>
              <p className="mt-1 text-xs text-[var(--color-text-secondary)]">{t.hoursLeftToDecide[lang](mockApproval.hoursLeft)}</p>
              <div className="mt-2 flex gap-2">
                <Button size="sm" onClick={() => setDecided("approved")}>
                  <Check className="h-3.5 w-3.5" /> {pick(t.approve, lang, "Duyệt")}
                </Button>
                <Button size="sm" variant="outline" onClick={() => setDecided("rejected")}>
                  <X className="h-3.5 w-3.5" /> {pick(t.reject, lang, "Từ chối")}
                </Button>
              </div>
            </>
          )}
        </div>

        <p className="mt-3 flex items-start gap-1.5 rounded-[16px] border border-dashed border-[var(--color-border)] px-3 py-2 text-xs text-[var(--color-text-secondary)]">
          <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-gold-text)]" />
          {pick(mockSuggestion, lang, mockSuggestion.vi)}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-3 text-xs text-[var(--color-text-secondary)]">
            <span>
              <strong className="text-[var(--color-text-primary)]">2</strong> {pick(t.runningCount, lang, "việc đang chạy")}
            </span>
            <span>
              <strong className="text-[var(--color-text-primary)]">{decided ? 0 : 1}</strong> {pick(t.pendingCount, lang, "chờ duyệt")}
            </span>
          </div>
          <Link to="/agent" className="text-xs font-medium text-[var(--color-primary)] hover:underline">
            {pick(t.viewAll, lang, "Xem tất cả →")}
          </Link>
        </div>

        <p className="mt-3 text-center text-[11px] text-[var(--color-text-secondary)]">{pick(t.neverAutoSend, lang, t.neverAutoSend.vi)}</p>
      </CardContent>
    </Card>
  );
}
