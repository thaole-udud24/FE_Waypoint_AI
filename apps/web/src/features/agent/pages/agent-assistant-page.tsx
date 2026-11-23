import { useState } from "react";
import { Bot, Check, X, ShieldAlert } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PageHeader } from "@/components/domain/page-header";
import { useLanguage, pick } from "@/lib/i18n";
import { sixAgentModels, mockApprovals, mockAgentHistory, type AgentStatus } from "../data/mock-agents";

const statusBadge: Record<AgentStatus, { variant: "default" | "warning" | "info"; label: { vi: string; en: string; ja: string } }> = {
  idle: { variant: "default", label: { vi: "Sẵn sàng", en: "Idle", ja: "待機中" } },
  running: { variant: "info", label: { vi: "Đang chạy", en: "Running", ja: "実行中" } },
  needs_approval: { variant: "warning", label: { vi: "Chờ duyệt", en: "Needs approval", ja: "承認待ち" } },
};

const t = {
  subtitle: {
    vi: "6 agent chuyên trách đồng hành cùng bạn — không bao giờ tự gửi, tự chia sẻ hay thanh toán.",
    en: "6 specialized agents working with you — they never send, share or pay on their own.",
    ja: "6つの専門エージェントがあなたをサポート — 自動で送信・共有・支払いを行うことはありません。",
  },
  tabTasks: { vi: "Nhiệm vụ", en: "Tasks", ja: "タスク" },
  tabApprovals: { vi: "Chờ duyệt", en: "Approvals", ja: "承認待ち" },
  tabHistory: { vi: "Lịch sử", en: "History", ja: "履歴" },
  tabSettings: { vi: "Thiết lập", en: "Settings", ja: "設定" },
  noApprovals: { vi: "Không có gì chờ duyệt.", en: "Nothing waiting for approval.", ja: "承認待ちの項目はありません。" },
  hoursLeft: { vi: (h: number) => `Còn ${h} giờ để quyết định`, en: (h: number) => `${h} hours left to decide`, ja: (h: number) => `決定まで残り${h}時間` },
  approve: { vi: "Duyệt", en: "Approve", ja: "承認" },
  reject: { vi: "Từ chối", en: "Reject", ja: "却下" },
  colAgent: { vi: "Agent", en: "Agent", ja: "エージェント" },
  colAction: { vi: "Hành động", en: "Action", ja: "アクション" },
  colDecision: { vi: "Quyết định", en: "Decision", ja: "判断" },
  colTime: { vi: "Thời điểm", en: "Time", ja: "日時" },
  decisionAuto: { vi: "Tự động", en: "Automatic", ja: "自動" },
  decisionApproved: { vi: "Đã duyệt", en: "Approved", ja: "承認済み" },
  decisionRejected: { vi: "Đã từ chối", en: "Rejected", ja: "却下済み" },
  proactiveMonitoring: { vi: "Giám sát chủ động", en: "Proactive monitoring", ja: "積極的な監視" },
  proactiveDesc: {
    vi: "Cho phép agent chủ động cảnh báo luật thay đổi, hạn quan trọng, dữ liệu thiếu.",
    en: "Let agents proactively flag legal changes, important deadlines and missing data.",
    ja: "法令変更、重要な期限、データ不足についてエージェントが自主的に警告することを許可。",
  },
  neverAuto: {
    vi: "Trợ lý không bao giờ tự gửi, tự chia sẻ hay thanh toán.",
    en: "The assistant never sends, shares or pays on its own.",
    ja: "アシスタントが自動で送信・共有・支払いを行うことはありません。",
  },
};

export function AgentAssistantPage() {
  const { lang } = useLanguage();
  const [approvals, setApprovals] = useState(mockApprovals);
  const [proactive, setProactive] = useState(true);

  function agentById(id: string) {
    return sixAgentModels.find((a) => a.id === id);
  }

  return (
    <div className="space-y-5">
      <PageHeader title="Trợ lý AI" kanji="助手" subtitle="6 agent chuyên trách đồng hành cùng bạn." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sixAgentModels.map((agent) => {
          const Icon = agent.icon;
          const badge = statusBadge[agent.status];
          return (
            <Card key={agent.id}>
              <CardContent className="flex items-start gap-3 pt-6">
                <div className="rounded-full bg-[var(--color-primary-light)] p-2.5">
                  <Icon className="h-4 w-4 text-[var(--color-primary-dark)]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-[var(--color-text-primary)]">{pick(agent.name, lang, agent.name.vi)}</p>
                    <Badge variant={badge.variant}>{pick(badge.label, lang, badge.label.vi)}</Badge>
                  </div>
                  <p className="mt-0.5 text-xs text-[var(--color-text-secondary)]">{pick(agent.description, lang, agent.description.vi)}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="tasks">
        <TabsList>
          <TabsTrigger value="tasks">{pick(t.tabTasks, lang, "Nhiệm vụ")}</TabsTrigger>
          <TabsTrigger value="approvals">{pick(t.tabApprovals, lang, "Chờ duyệt")}</TabsTrigger>
          <TabsTrigger value="history">{pick(t.tabHistory, lang, "Lịch sử")}</TabsTrigger>
          <TabsTrigger value="settings">{pick(t.tabSettings, lang, "Thiết lập")}</TabsTrigger>
        </TabsList>

        <TabsContent value="tasks">
          <Card>
            <CardContent className="flex items-center gap-3 pt-6 text-sm text-[var(--color-text-secondary)]">
              <Bot className="h-4 w-4" />
              {pick(agentById("payguard")!.name, lang, "Đối chiếu lương")} — {pick(statusBadge.running.label, lang, "Đang chạy")}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approvals">
          {approvals.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-sm text-[var(--color-text-secondary)]">{pick(t.noApprovals, lang, "Không có gì chờ duyệt.")}</CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {approvals.map((ap) => {
                const agent = agentById(ap.agentId);
                return (
                  <Card key={ap.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2">
                        {agent && <agent.icon className="h-4 w-4 text-[var(--color-text-secondary)]" />}
                        <p className="text-sm font-medium text-[var(--color-text-primary)]">{agent && pick(agent.name, lang, agent.name.vi)}</p>
                      </div>
                      <p className="mt-1.5 text-sm text-[var(--color-text-primary)]">{pick(ap.description, lang, ap.description.vi)}</p>
                      <p className="mt-1 text-xs text-[var(--color-text-disabled)]">{t.hoursLeft[lang](ap.hoursLeft)}</p>
                      <div className="mt-3 flex gap-2">
                        <Button size="sm" onClick={() => setApprovals((prev) => prev.filter((x) => x.id !== ap.id))}>
                          <Check className="h-3.5 w-3.5" /> {pick(t.approve, lang, "Duyệt")}
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setApprovals((prev) => prev.filter((x) => x.id !== ap.id))}>
                          <X className="h-3.5 w-3.5" /> {pick(t.reject, lang, "Từ chối")}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-[var(--color-border)]">
                {mockAgentHistory.map((h) => {
                  const agent = agentById(h.agentId);
                  const decisionLabel =
                    h.decision === "auto" ? t.decisionAuto : h.decision === "approved" ? t.decisionApproved : t.decisionRejected;
                  return (
                    <div key={h.id} className="flex items-center justify-between gap-3 px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        {agent && <agent.icon className="h-4 w-4 text-[var(--color-text-secondary)]" />}
                        <div>
                          <p className="text-sm text-[var(--color-text-primary)]">{pick(h.action, lang, h.action.vi)}</p>
                          <p className="text-xs text-[var(--color-text-disabled)]">{h.time}</p>
                        </div>
                      </div>
                      <Badge variant={h.decision === "rejected" ? "default" : "success"}>{pick(decisionLabel, lang, decisionLabel.vi)}</Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardContent className="space-y-4 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[var(--color-text-primary)]">{pick(t.proactiveMonitoring, lang, "Giám sát chủ động")}</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">{pick(t.proactiveDesc, lang, t.proactiveDesc.vi)}</p>
                </div>
                <Switch checked={proactive} onCheckedChange={setProactive} />
              </div>
              <div className="flex items-center gap-2 rounded-[14px] border border-dashed border-[var(--color-border)] p-3 text-xs text-[var(--color-text-secondary)]">
                <ShieldAlert className="h-4 w-4 shrink-0" /> {pick(t.neverAuto, lang, t.neverAuto.vi)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
