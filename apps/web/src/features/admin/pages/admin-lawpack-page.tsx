import { useState } from "react";
import { CheckCircle2, XCircle, History, RotateCcw } from "lucide-react";
import { PageHeader } from "@/components/domain/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { KanbanBoard, type KanbanColumn } from "@/components/domain/kanban-board";
import { mockDraftRule } from "../data/mock-rules";
import { useLanguage, pick } from "@/lib/i18n";

const t = {
  dragHint: { vi: "Kéo thẻ để đổi trạng thái soạn thảo.", en: "Drag a card to change its drafting status.", ja: "カードをドラッグして作成状態を変更します。" },
  identity: { vi: "Định danh", en: "Identity", ja: "識別情報" },
  ruleCode: { vi: "Mã quy tắc", en: "Rule code", ja: "ルールコード" },
  corridor: { vi: "Hành lang", en: "Corridor", ja: "コリドー" },
  titleField: { vi: "Tiêu đề", en: "Title", ja: "タイトル" },
  basis: { vi: "Căn cứ", en: "Basis", ja: "根拠" },
  source: { vi: "Nguồn", en: "Source", ja: "出典" },
  effectiveDate: { vi: "Ngày hiệu lực", en: "Effective date", ja: "施行日" },
  testCases: { vi: "Ca kiểm thử", en: "Test cases", ja: "テストケース" },
  runTests: { vi: "Chạy kiểm thử", en: "Run tests", ja: "テストを実行" },
  submitForApproval: { vi: "Nộp duyệt", en: "Submit for approval", ja: "承認申請" },
  pendingApproval: { vi: "— chờ duyệt", en: "— pending approval", ja: "— 承認待ち" },
  submitted: { vi: "Đã nộp", en: "Submitted", ja: "提出済み" },
  currentlyApplied: { vi: "Đang áp dụng", en: "Currently applied", ja: "現在適用中" },
  newProposal: { vi: "Đề xuất mới", en: "New proposal", ja: "新しい提案" },
  nightOvertime: { vi: (pct: number) => `Phụ trội đêm: ${pct}%`, en: (pct: number) => `Night overtime: ${pct}%`, ja: (pct: number) => `深夜手当：${pct}%` },
  allTests: { vi: "Mọi ca kiểm thử", en: "All test cases", ja: "すべてのテストケース" },
  approve: { vi: "Duyệt", en: "Approve", ja: "承認" },
  returnForComment: { vi: "Trả lại (cần ý kiến)", en: "Return (needs feedback)", ja: "返却（コメント要）" },
  createNewVersion: { vi: "Tạo phiên bản mới", en: "Create a new version", ja: "新しいバージョンを作成" },
  rulesWillBePackaged: { vi: (n: number) => `${n} quy tắc đã duyệt sẽ được đóng gói.`, en: (n: number) => `${n} approved rule(s) will be packaged.`, ja: (n: number) => `承認済みのルール${n}件がパッケージ化されます。` },
  changeNotePlaceholder: { vi: "Ghi chú thay đổi (5-2000 ký tự)", en: "Change notes (5-2000 characters)", ja: "変更メモ（5〜2000文字）" },
  release: { vi: "Phát hành", en: "Release", ja: "公開" },
  versionHistory: { vi: "Lịch sử phiên bản", en: "Version history", ja: "バージョン履歴" },
  restore: { vi: "Khôi phục", en: "Restore", ja: "復元" },
  pageTitle: { vi: "Law Pack — quy tắc", en: "Law Pack — rules", ja: "Law Pack — ルール" },
  pageSubtitle: {
    vi: "Soạn, kiểm thử, duyệt và phát hành quy tắc theo hành lang.",
    en: "Draft, test, approve, and release rules per corridor.",
    ja: "コリドーごとにルールを作成、テスト、承認、公開します。",
  },
  tabKanban: { vi: "Theo trạng thái", en: "By status", ja: "状態別" },
  tabCompose: { vi: "Soạn quy tắc", en: "Draft rule", ja: "ルール作成" },
  tabApprove: { vi: "Duyệt", en: "Approve", ja: "承認" },
  tabRelease: { vi: "Phát hành", en: "Release", ja: "公開" },
};

const initialColumns: KanbanColumn[] = [
  {
    id: "draft",
    label: "Nháp",
    accent: "#8f7cff",
    cards: [
      { id: "r1", title: "RULE_OT_NIGHT_135", meta: "Phụ trội đêm · VN-JP" },
      { id: "r2", title: "RULE_MIN_WAGE_TOKYO", meta: "Lương tối thiểu · Tokyo" },
    ],
  },
  {
    id: "submitted",
    label: "Đã nộp",
    accent: "#f2b100",
    cards: [{ id: "r3", title: "RULE_PAID_LEAVE_10D", meta: "Nghỉ phép năm" }],
  },
  {
    id: "approved",
    label: "Đã duyệt",
    accent: "#2fbf8a",
    cards: [{ id: "r4", title: "RULE_PASSPORT_HOLD_BAN", meta: "Giữ hộ chiếu" }],
  },
  {
    id: "published",
    label: "Đã phát hành",
    accent: "#5b7cff",
    cards: [{ id: "r5", title: "RULE_OT_DAY_125", meta: "Phụ trội ban ngày" }],
  },
];

const versionHistory = [
  { version: "v2026.10", releasedAt: "02/11/2026", by: "ADM Huy", note: "Cập nhật phụ trội làm thêm giờ đêm.", status: "released" as const },
  { version: "v2026.09", releasedAt: "01/09/2026", by: "ADM Lan", note: "Thêm quy tắc trần phí dịch vụ.", status: "released" as const },
];

function KanbanTab() {
  const { lang } = useLanguage();
  const [columns, setColumns] = useState(initialColumns);
  function moveCard(cardId: string, fromColumnId: string, toColumnId: string) {
    setColumns((prev) => {
      const from = prev.find((c) => c.id === fromColumnId);
      const card = from?.cards.find((c) => c.id === cardId);
      if (!card) return prev;
      return prev.map((col) => {
        if (col.id === fromColumnId) return { ...col, cards: col.cards.filter((c) => c.id !== cardId) };
        if (col.id === toColumnId) return { ...col, cards: [...col.cards, card] };
        return col;
      });
    });
  }
  return (
    <div className="space-y-3">
      <p className="text-sm text-[var(--color-text-secondary)]">{pick(t.dragHint, lang, t.dragHint.vi)}</p>
      <KanbanBoard columns={columns} onMoveCard={moveCard} />
    </div>
  );
}

function ComposeTab() {
  const { lang } = useLanguage();
  const r = mockDraftRule;
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
      <div className="space-y-4 lg:col-span-8">
        <Card>
          <CardContent className="space-y-3 pt-6">
            <p className="text-sm font-medium text-[var(--color-text-primary)]">{pick(t.identity, lang, t.identity.vi)}</p>
            <div className="grid grid-cols-2 gap-3">
              <Input defaultValue={r.code} placeholder={pick(t.ruleCode, lang, t.ruleCode.vi)} />
              <Input defaultValue={r.corridor} placeholder={pick(t.corridor, lang, t.corridor.vi)} />
            </div>
            <Input defaultValue={r.title} placeholder={pick(t.titleField, lang, t.titleField.vi)} />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-3 pt-6">
            <p className="text-sm font-medium text-[var(--color-text-primary)]">{pick(t.basis, lang, t.basis.vi)}</p>
            <Input defaultValue={r.source} placeholder={pick(t.source, lang, t.source.vi)} />
            <Input defaultValue={r.effectiveFrom} placeholder={pick(t.effectiveDate, lang, t.effectiveDate.vi)} />
          </CardContent>
        </Card>
      </div>
      <div className="space-y-4 lg:col-span-4">
        <Card>
          <CardContent className="pt-6">
            <p className="mb-2 text-sm font-medium text-[var(--color-text-primary)]">{pick(t.testCases, lang, t.testCases.vi)}</p>
            <div className="space-y-2">
              {r.testCases.map((tc) => (
                <div key={tc.id} className="flex items-center justify-between rounded-[14px] border border-[var(--color-border)] px-3 py-2 text-xs">
                  <span className="text-[var(--color-text-secondary)]">
                    {tc.input} → {tc.expected}
                  </span>
                  {tc.result === "pass" ? (
                    <CheckCircle2 className="h-4 w-4 text-[var(--color-success)]" />
                  ) : (
                    <XCircle className="h-4 w-4 text-[var(--color-error)]" />
                  )}
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" className="mt-3 w-full">
              {pick(t.runTests, lang, t.runTests.vi)}
            </Button>
          </CardContent>
        </Card>
        <Button className="w-full" disabled={r.testCases.some((t) => t.result !== "pass")}>
          {pick(t.submitForApproval, lang, t.submitForApproval.vi)}
        </Button>
      </div>
    </div>
  );
}

function ApproveTab() {
  const { lang } = useLanguage();
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-medium text-[var(--color-text-primary)]">
            {mockDraftRule.code} {pick(t.pendingApproval, lang, t.pendingApproval.vi)}
          </p>
          <Badge variant="warning">{pick(t.submitted, lang, t.submitted.vi)}</Badge>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-[20px] bg-[var(--color-surface-secondary)] p-4">
            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-[var(--color-text-disabled)]">
              {pick(t.currentlyApplied, lang, t.currentlyApplied.vi)}
            </p>
            <p className="text-sm text-[var(--color-text-primary)]">{(t.nightOvertime[lang] ?? t.nightOvertime.vi)(125)}</p>
          </div>
          <div className="rounded-[20px] bg-[var(--card-mint)] p-4">
            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-[var(--color-text-disabled)]">
              {pick(t.newProposal, lang, t.newProposal.vi)}
            </p>
            <p className="text-sm text-[var(--color-text-primary)]">{(t.nightOvertime[lang] ?? t.nightOvertime.vi)(135)}</p>
          </div>
        </div>
        <p className="mt-3 text-xs text-[var(--color-text-secondary)]">
          {pick(t.allTests, lang, t.allTests.vi)}: <span className="font-medium text-[var(--color-success)]">PASS</span> ·{" "}
          {pick(t.source, lang, t.source.vi)}: {mockDraftRule.source}
        </p>
        <div className="mt-4 flex gap-2">
          <Button>{pick(t.approve, lang, t.approve.vi)}</Button>
          <Button variant="outline">{pick(t.returnForComment, lang, t.returnForComment.vi)}</Button>
        </div>
      </CardContent>
    </Card>
  );
}

function ReleaseTab() {
  const { lang } = useLanguage();
  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="pt-6">
          <p className="mb-2 text-sm font-medium text-[var(--color-text-primary)]">{pick(t.createNewVersion, lang, t.createNewVersion.vi)}</p>
          <p className="mb-3 text-sm text-[var(--color-text-secondary)]">{(t.rulesWillBePackaged[lang] ?? t.rulesWillBePackaged.vi)(1)}</p>
          <Input placeholder={pick(t.changeNotePlaceholder, lang, t.changeNotePlaceholder.vi)} />
          <Button className="mt-3">{pick(t.release, lang, t.release.vi)}</Button>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <p className="mb-3 text-sm font-medium text-[var(--color-text-primary)]">{pick(t.versionHistory, lang, t.versionHistory.vi)}</p>
          <div className="space-y-2">
            {versionHistory.map((v) => (
              <div key={v.version} className="flex items-center justify-between rounded-[14px] border border-[var(--color-border)] px-3 py-2.5">
                <div className="flex items-center gap-2.5">
                  <History className="h-4 w-4 text-[var(--color-text-secondary)]" />
                  <div>
                    <p className="text-sm font-medium text-[var(--color-text-primary)]">
                      {v.version} · {v.releasedAt}
                    </p>
                    <p className="text-xs text-[var(--color-text-secondary)]">
                      {v.by} · {v.note}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <RotateCcw className="h-3.5 w-3.5" /> {pick(t.restore, lang, t.restore.vi)}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function AdminLawPackPage() {
  const { lang } = useLanguage();
  return (
    <div className="space-y-5">
      <PageHeader title={pick(t.pageTitle, lang, t.pageTitle.vi)} subtitle={pick(t.pageSubtitle, lang, t.pageSubtitle.vi)} />
      <Tabs defaultValue="kanban">
        <TabsList>
          <TabsTrigger value="kanban">{pick(t.tabKanban, lang, t.tabKanban.vi)}</TabsTrigger>
          <TabsTrigger value="compose">{pick(t.tabCompose, lang, t.tabCompose.vi)}</TabsTrigger>
          <TabsTrigger value="approve">{pick(t.tabApprove, lang, t.tabApprove.vi)}</TabsTrigger>
          <TabsTrigger value="release">{pick(t.tabRelease, lang, t.tabRelease.vi)}</TabsTrigger>
        </TabsList>
        <TabsContent value="kanban">
          <KanbanTab />
        </TabsContent>
        <TabsContent value="compose">
          <ComposeTab />
        </TabsContent>
        <TabsContent value="approve">
          <ApproveTab />
        </TabsContent>
        <TabsContent value="release">
          <ReleaseTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
