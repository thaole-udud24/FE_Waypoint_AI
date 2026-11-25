import {
  AlertTriangle,
  Clock3,
  ArrowRight,
  ShieldCheck,
  FolderCheck,
  ScrollText,
  Hand,
  FileText,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { useAuthStore } from "@/stores/auth-store";
import { SalaryTrendChart } from "../components/salary-trend-chart";
import { OrbitHero } from "@/components/fx/orbit-hero";
import { HankoStamp } from "@/components/fx/hanko-stamp";
import { KanbanBoard, type KanbanColumn } from "@/components/domain/kanban-board";
import { AgentDock } from "@/components/domain/agent-dock";
import { useLanguage, pick } from "@/lib/i18n";

// shortcut: dữ liệu mẫu minh họa bố cục Home. Thay bằng dữ liệu thật từ
// MOD_005 PayGuard AI / MOD_004 Work Log / MOD_013 Case Pack Desk khi có API.
const mockMismatch = {
  period: { vi: "Kỳ lương 11/2026", en: "Pay period 11/2026", ja: "2026年11月分給与" },
  amount: "¥18,400",
  reason: {
    vi: "Giờ làm thêm ban đêm chưa được tính phụ trội theo đúng mức luật định.",
    en: "Night overtime hours have not been paid at the legally required premium rate.",
    ja: "深夜残業の割増賃金が法定の最低率で計算されていません。",
  },
};

const todoCardI18n: Record<string, { title: Record<"en" | "ja", string>; meta: Record<"en" | "ja", string> }> = {
  t1: {
    title: { en: "Log today's work hours", ja: "本日の勤務時間を記録" },
    meta: { en: "Work log · due today", ja: "勤務記録・本日期限" },
  },
  t2: {
    title: { en: "Verify 3 payslip fields", ja: "給与明細の3項目を確認" },
    meta: { en: "Documents", ja: "書類" },
  },
  t3: {
    title: { en: "Draft overtime premium inquiry", ja: "残業割増率の問い合わせ文を作成" },
    meta: { en: "Contract", ja: "契約" },
  },
  t4: {
    title: { en: "Upload this month's payslip", ja: "今月の給与明細をアップロード" },
    meta: { en: "Documents", ja: "書類" },
  },
};

const initialTodoColumns: KanbanColumn[] = [
  {
    id: "todo",
    label: "Chưa làm",
    accent: "#ff7fb0",
    cards: [
      { id: "t1", title: "Ghi giờ làm hôm nay", meta: "Giờ làm · hạn hôm nay" },
      { id: "t2", title: "Xác nhận 3 trường phiếu lương", meta: "Tài liệu" },
    ],
  },
  {
    id: "doing",
    label: "Đang làm",
    accent: "#f2b100",
    cards: [{ id: "t3", title: "Soạn thư hỏi lại mức phụ trội", meta: "Hợp đồng" }],
  },
  {
    id: "done",
    label: "Đã xong",
    accent: "#2fbf8a",
    cards: [{ id: "t4", title: "Tải phiếu lương tháng này", meta: "Tài liệu" }],
  },
];

const todoColumnLabel: Record<string, { en: string; ja: string }> = {
  todo: { en: "To do", ja: "未着手" },
  doing: { en: "In progress", ja: "進行中" },
  done: { en: "Done", ja: "完了" },
};

const mockSalary = {
  period: { vi: "Kỳ 11/2026", en: "Period 11/2026", ja: "2026年11月分" },
  netReceived: "¥214,600",
  matched: 27,
  total: 30,
};
const mockCasePack = {
  status: "Đang chia sẻ",
  org: { vi: "Nghiệp đoàn hỗ trợ ABC", en: "ABC Support Union", ja: "ABC支援組合" },
  expiresInDays: 12,
};
const mockLawPack = { corridor: "VN → JP", version: "v2026.10", updatedAt: "02/11/2026" };

const t = {
  greetingLine: {
    vi: "Thứ Hai, 23 tháng 11 — đây là những gì cần chú ý hôm nay.",
    en: "Monday, Nov 23 — here's what needs your attention today.",
    ja: "11月23日（月）— 本日注意すべき内容です。",
  },
  mismatchDetected: { vi: "— phát hiện lệch lương", en: "— pay mismatch detected", ja: "— 給与の不一致を検出" },
  viewReconDetail: { vi: "Xem chi tiết đối chiếu", en: "View reconciliation", ja: "照合の詳細を見る" },
  matchedLines: {
    vi: (m: number, total: number) => `Đã đối chiếu khớp ${m}/${total} dòng`,
    en: (m: number, total: number) => `${m}/${total} lines matched`,
    ja: (m: number, total: number) => `${m}/${total}行が一致`,
  },
  incomeTrend: { vi: "Xu hướng thu nhập 6 kỳ gần nhất", en: "Income trend — last 6 periods", ja: "直近6期の収入推移" },
  actualReceived: { vi: "Thực nhận", en: "Actual", ja: "実受取額" },
  contractExpected: { vi: "Dự kiến hợp đồng", en: "Contract expected", ja: "契約上の見込み" },
  todoTitle: { vi: "Việc cần làm", en: "Tasks", ja: "タスク" },
  dragHint: { vi: "Kéo thẻ để đổi trạng thái", en: "Drag a card to change status", ja: "カードをドラッグしてステータス変更" },
  netReceivedLabel: { vi: "— thực nhận", en: "— actual received", ja: "— 実受取額" },
  casePackTitle: { vi: "Hồ sơ nhờ hỗ trợ", en: "Case Pack", ja: "支援ケース" },
  sharedWith: { vi: (org: string) => `với ${org}`, en: (org: string) => `with ${org}`, ja: (org: string) => `${org}と共有中` },
  shareExpiresIn: {
    vi: (d: number) => `Hết hạn chia sẻ sau ${d} ngày`,
    en: (d: number) => `Share expires in ${d} days`,
    ja: (d: number) => `共有は${d}日後に期限切れ`,
  },
  lawPackVersion: {
    vi: (v: string, d: string) => `Phiên bản ${v} · cập nhật ${d}`,
    en: (v: string, d: string) => `Version ${v} · updated ${d}`,
    ja: (v: string, d: string) => `バージョン ${v}・更新日 ${d}`,
  },
  disclaimer: {
    vi: "Mọi con số đối chiếu đều dựa trên Law Pack đã công bố — không phải kết luận pháp lý.",
    en: "All reconciliation figures are based on the published Law Pack — not a legal conclusion.",
    ja: "照合結果はすべて公開済みのLaw Packに基づくものであり、法的結論ではありません。",
  },
};

export function HomePage() {
  const { lang } = useLanguage();
  const user = useAuthStore((s) => s.user);
  const initials = (user?.name ?? "B").slice(0, 2).toUpperCase();
  const [todoColumns, setTodoColumns] = useState(initialTodoColumns);

  function moveCard(cardId: string, fromColumnId: string, toColumnId: string) {
    setTodoColumns((prev) => {
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
    <div className="space-y-6">
      {/* Hero: hệ quỹ đạo bốn nguồn */}
      <Card className="relative overflow-hidden border-none" style={{ background: "var(--grad-alert)" }}>
        <CardContent className="grid grid-cols-1 items-center gap-6 pt-6 sm:grid-cols-12">
          <div className="sm:col-span-7">
            <div className="flex items-center gap-3">
              <Avatar fallback={initials} className="h-12 w-12 ring-2 ring-[var(--color-surface)]" />
              <div>
                <h1 className="flex items-center gap-2 text-[length:var(--font-size-sectionHeading)] font-semibold text-[var(--color-text-primary)]">
                  {pick({ en: "Hi", ja: "こんにちは" }, lang, "Chào")} {user?.name ?? "bạn"}
                  <Hand className="h-5 w-5 text-[var(--color-attention-text)]" />
                  {lang === "ja" && (
                    <span lang="ja" className="ml-1 text-xs font-normal text-[var(--color-text-secondary)]" style={{ fontFamily: "var(--font-jp)" }}>
                      ホーム
                    </span>
                  )}
                </h1>
                <p className="mt-0.5 text-sm text-[var(--color-text-secondary)]">{pick(t.greetingLine, lang, t.greetingLine.vi)}</p>
              </div>
            </div>

            <div className="mt-5 rounded-[20px] bg-[var(--color-surface)]/70 p-4 backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-full bg-[var(--color-attention-text)]/15 p-2">
                  <AlertTriangle className="h-5 w-5 text-[var(--color-attention-text)]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-medium text-[var(--color-text-primary)]">
                      {pick(mockMismatch.period, lang, mockMismatch.period.vi)} {pick(t.mismatchDetected, lang, "— phát hiện lệch lương")}
                    </p>
                    <span className="font-[var(--font-numeric)] text-lg font-semibold text-[var(--color-attention-text)]">
                      {mockMismatch.amount}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{pick(mockMismatch.reason, lang, mockMismatch.reason.vi)}</p>
                  <div className="mt-3 flex items-center gap-3">
                    <Link
                      to="/payguard"
                      className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-attention-text)]"
                    >
                      {pick(t.viewReconDetail, lang, "Xem chi tiết đối chiếu")} <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    <HankoStamp label={{ vi: "Cần xác nhận", en: "Needs review", ja: "要確認" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="sm:col-span-5">
            <OrbitHero
              centerLabel={pick(mockSalary.period, lang, mockSalary.period.vi)}
              centerValue={mockSalary.netReceived}
              satellites={[
                { label: pick({ en: "Contract", ja: "契約" }, lang, "Hợp đồng"), icon: FileText, status: "ok", angle: -90, to: "/contract" },
                { label: pick({ en: "Work log", ja: "勤務" }, lang, "Giờ làm"), icon: Clock3, status: "ok", angle: 0, to: "/work-log" },
                { label: pick({ en: "Payslip", ja: "給与明細" }, lang, "Phiếu lương"), icon: Wallet, status: "warn", angle: 90, to: "/documents" },
                { label: pick({ en: "Net pay", ja: "手取り額" }, lang, "Tiền nhận"), icon: ShieldCheck, status: "bad", angle: 180, to: "/payguard" },
              ]}
            />
            <p className="mt-2 text-center text-xs font-medium text-[var(--color-text-secondary)]">
              {t.matchedLines[lang](mockSalary.matched, mockSalary.total)}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        {/* Vùng trọng tâm: biểu đồ + hành động */}
        <div className="space-y-5 lg:col-span-8">
          <Card className="bg-[var(--card-sky)]">
            <CardContent className="pt-6">
              <div className="mb-1 flex items-center justify-between">
                <p className="text-sm font-medium text-[var(--color-text-primary)]">{pick(t.incomeTrend, lang, t.incomeTrend.vi)}</p>
                <div className="flex items-center gap-3 text-xs font-medium text-[var(--color-text-secondary)]">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-chart-1)]" /> {pick(t.actualReceived, lang, "Thực nhận")}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-chart-2)]" /> {pick(t.contractExpected, lang, "Dự kiến hợp đồng")}
                  </span>
                </div>
              </div>
              <SalaryTrendChart />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-medium text-[var(--color-text-primary)]">{pick(t.todoTitle, lang, "Việc cần làm")}</p>
                <span className="text-xs text-[var(--color-text-secondary)]">{pick(t.dragHint, lang, "Kéo thẻ để đổi trạng thái")}</span>
              </div>
              <KanbanBoard
                columns={todoColumns.map((c) => ({
                  ...c,
                  label: pick(todoColumnLabel[c.id] ?? {}, lang, c.label),
                  cards: c.cards.map((card) => {
                    const tr = todoCardI18n[card.id];
                    if (!tr || lang === "vi") return card;
                    return { ...card, title: tr.title[lang], meta: tr.meta[lang] };
                  }),
                }))}
                onMoveCard={moveCard}
              />
            </CardContent>
          </Card>
        </div>

        {/* Dải trạng thái: Case Pack, Law Pack */}
        <div className="space-y-5 lg:col-span-4">
          <AgentDock />

          <Card className="overflow-hidden border-none text-white" style={{ background: "var(--grad-cta)" }}>
            <CardContent className="pt-6">
              <p className="text-xs font-medium uppercase tracking-wide text-white/80">
                {pick(mockSalary.period, lang, mockSalary.period.vi)} {pick(t.netReceivedLabel, lang, "— thực nhận")}
              </p>
              <p className="mt-1 font-[var(--font-numeric)] text-[length:var(--font-size-numeric)] font-semibold tracking-[var(--letter-spacing-numeric)]">
                {mockSalary.netReceived}
              </p>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/25">
                <div className="h-full bg-white" style={{ width: `${(mockSalary.matched / mockSalary.total) * 100}%` }} />
              </div>
            </CardContent>
          </Card>

          <Link to="/case-pack" className="block">
            <Card className="bg-[var(--card-mint)] transition-transform duration-150 hover:-translate-y-0.5">
              <CardContent className="flex items-start gap-3 pt-6">
                <div className="rounded-full bg-[var(--chip-surface)] p-2">
                  <FolderCheck className="h-4 w-4 text-[var(--color-teal-text)]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--color-text-primary)]">{pick(t.casePackTitle, lang, "Hồ sơ nhờ hỗ trợ")}</p>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    {pick({ en: "Sharing", ja: "共有中" }, lang, mockCasePack.status)} {t.sharedWith[lang](pick(mockCasePack.org, lang, mockCasePack.org.vi))}
                  </p>
                  <p className="mt-1 text-xs font-medium text-[var(--color-teal-text)]">{t.shareExpiresIn[lang](mockCasePack.expiresInDays)}</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/legal-compass" className="block">
            <Card className="bg-[var(--card-butter)] transition-transform duration-150 hover:-translate-y-0.5">
              <CardContent className="flex items-start gap-3 pt-6">
                <div className="rounded-full bg-[var(--chip-surface)] p-2">
                  <ScrollText className="h-4 w-4 text-[var(--color-gold-text)]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[var(--color-text-primary)]">Law Pack {mockLawPack.corridor}</p>
                  <p className="text-sm text-[var(--color-text-secondary)]">{t.lawPackVersion[lang](mockLawPack.version, mockLawPack.updatedAt)}</p>
                </div>
                <HankoStamp label={{ vi: "Đã công bố", en: "Published", ja: "公布済" }} />
              </CardContent>
            </Card>
          </Link>

          <Card className="border-dashed">
            <CardContent className="flex items-center gap-3 pt-6">
              <ShieldCheck className="h-4 w-4 text-[var(--color-text-secondary)]" />
              <p className="text-xs text-[var(--color-text-secondary)]">{pick(t.disclaimer, lang, t.disclaimer.vi)}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
