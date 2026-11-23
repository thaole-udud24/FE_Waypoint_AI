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
      <p className="text-sm text-[var(--color-text-secondary)]">Kéo thẻ để đổi trạng thái soạn thảo.</p>
      <KanbanBoard columns={columns} onMoveCard={moveCard} />
    </div>
  );
}

function ComposeTab() {
  const r = mockDraftRule;
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
      <div className="space-y-4 lg:col-span-8">
        <Card>
          <CardContent className="space-y-3 pt-6">
            <p className="text-sm font-medium text-[var(--color-text-primary)]">Định danh</p>
            <div className="grid grid-cols-2 gap-3">
              <Input defaultValue={r.code} placeholder="Mã quy tắc" />
              <Input defaultValue={r.corridor} placeholder="Hành lang" />
            </div>
            <Input defaultValue={r.title} placeholder="Tiêu đề" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-3 pt-6">
            <p className="text-sm font-medium text-[var(--color-text-primary)]">Căn cứ</p>
            <Input defaultValue={r.source} placeholder="Nguồn" />
            <Input defaultValue={r.effectiveFrom} placeholder="Ngày hiệu lực" />
          </CardContent>
        </Card>
      </div>
      <div className="space-y-4 lg:col-span-4">
        <Card>
          <CardContent className="pt-6">
            <p className="mb-2 text-sm font-medium text-[var(--color-text-primary)]">Ca kiểm thử</p>
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
              Chạy kiểm thử
            </Button>
          </CardContent>
        </Card>
        <Button className="w-full" disabled={r.testCases.some((t) => t.result !== "pass")}>
          Nộp duyệt
        </Button>
      </div>
    </div>
  );
}

function ApproveTab() {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-medium text-[var(--color-text-primary)]">{mockDraftRule.code} — chờ duyệt</p>
          <Badge variant="warning">Đã nộp</Badge>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-[20px] bg-[var(--color-surface-secondary)] p-4">
            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-[var(--color-text-disabled)]">
              Đang áp dụng
            </p>
            <p className="text-sm text-[var(--color-text-primary)]">Phụ trội đêm: 125%</p>
          </div>
          <div className="rounded-[20px] bg-[var(--card-mint)] p-4">
            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-[var(--color-text-disabled)]">
              Đề xuất mới
            </p>
            <p className="text-sm text-[var(--color-text-primary)]">Phụ trội đêm: 135%</p>
          </div>
        </div>
        <p className="mt-3 text-xs text-[var(--color-text-secondary)]">
          Mọi ca kiểm thử: <span className="font-medium text-[var(--color-success)]">PASS</span> · Nguồn:{" "}
          {mockDraftRule.source}
        </p>
        <div className="mt-4 flex gap-2">
          <Button>Duyệt</Button>
          <Button variant="outline">Trả lại (cần ý kiến)</Button>
        </div>
      </CardContent>
    </Card>
  );
}

function ReleaseTab() {
  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="pt-6">
          <p className="mb-2 text-sm font-medium text-[var(--color-text-primary)]">Tạo phiên bản mới</p>
          <p className="mb-3 text-sm text-[var(--color-text-secondary)]">1 quy tắc đã duyệt sẽ được đóng gói.</p>
          <Input placeholder="Ghi chú thay đổi (5-2000 ký tự)" />
          <Button className="mt-3">Phát hành</Button>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <p className="mb-3 text-sm font-medium text-[var(--color-text-primary)]">Lịch sử phiên bản</p>
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
                  <RotateCcw className="h-3.5 w-3.5" /> Khôi phục
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
  return (
    <div className="space-y-5">
      <PageHeader title="Law Pack — quy tắc" subtitle="Soạn, kiểm thử, duyệt và phát hành quy tắc theo hành lang." />
      <Tabs defaultValue="kanban">
        <TabsList>
          <TabsTrigger value="kanban">Theo trạng thái</TabsTrigger>
          <TabsTrigger value="compose">Soạn quy tắc</TabsTrigger>
          <TabsTrigger value="approve">Duyệt</TabsTrigger>
          <TabsTrigger value="release">Phát hành</TabsTrigger>
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
