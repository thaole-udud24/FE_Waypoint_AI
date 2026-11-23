import { useState } from "react";
import { CheckCircle2, AlertTriangle, Loader2, ShieldCheck, FolderCheck, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageHeader } from "@/components/domain/page-header";
import { ReconcileWizardModal } from "@/components/domain/reconcile-wizard-modal";
import { ReconcileLineDrawer } from "@/components/domain/reconcile-line-drawer";
import { useLanguage, pick } from "@/lib/i18n";
import { type ReconcileLine, type ReconcileStatus, mockPayguard } from "../data/mock-payguard";

const statusConfig: Record<
  ReconcileStatus,
  { icon: typeof CheckCircle2; badge: "success" | "warning" | "info"; label: { vi: string; en: string; ja: string } }
> = {
  matched: { icon: CheckCircle2, badge: "success", label: { vi: "Khớp", en: "Matched", ja: "一致" } },
  mismatch: { icon: AlertTriangle, badge: "warning", label: { vi: "Lệch", en: "Mismatch", ja: "不一致" } },
  checking: { icon: Loader2, badge: "info", label: { vi: "Đang xử lý", en: "Checking", ja: "処理中" } },
};

const t = {
  expected: { vi: "— kỳ vọng", en: "— expected", ja: "— 期待値" },
  actual: { vi: "— thực nhận", en: "— actual", ja: "— 実受取額" },
  diff: { vi: "Chênh lệch", en: "Difference", ja: "差額" },
  colItem: { vi: "Khoản mục", en: "Item", ja: "項目" },
  colExpected: { vi: "Kỳ vọng (theo hợp đồng/giờ làm)", en: "Expected (contract/work log)", ja: "期待値（契約・勤務記録）" },
  colActual: { vi: "Thực tế (theo phiếu lương)", en: "Actual (payslip)", ja: "実績（給与明細）" },
  colStatus: { vi: "Trạng thái", en: "Status", ja: "状態" },
  mismatchFound: {
    vi: (n: number) => `Phát hiện ${n} khoản lệch. Bạn có thể tạo hồ sơ nhờ hỗ trợ để nghiệp đoàn hoặc luật sư xem xét.`,
    en: (n: number) => `${n} mismatch(es) found. You can create a Case Pack for a union or lawyer to review.`,
    ja: (n: number) => `${n}件の不一致を検出しました。組合や弁護士に確認してもらうケースを作成できます。`,
  },
  createCasePack: { vi: "Tạo hồ sơ nhờ hỗ trợ", en: "Create Case Pack", ja: "支援ケースを作成" },
  disclaimer: {
    vi: "Kết quả đối chiếu dựa trên Law Pack đã công bố và dữ liệu bạn cung cấp — không phải kết luận pháp lý.",
    en: "Results are based on the published Law Pack and the data you provided — not a legal conclusion.",
    ja: "結果は公開済みのLaw Packとご提供データに基づくものであり、法的結論ではありません。",
  },
};

export function PayguardPage() {
  const { lang } = useLanguage();
  const { period, netExpected, netActual, lines } = mockPayguard;
  const diff = netExpected - netActual;
  const mismatches = lines.filter((l) => l.status === "mismatch");
  const [wizardOpen, setWizardOpen] = useState(false);
  const [activeLine, setActiveLine] = useState<ReconcileLine | null>(null);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Đối chiếu lương"
        kanji="照合"
        subtitle="So khớp phiếu lương với hợp đồng và nhật ký giờ làm — tự động phát hiện sai lệch."
        actions={
          <Button onClick={() => setWizardOpen(true)}>
            <Plus className="h-4 w-4" /> Tạo kỳ mới
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-text-secondary)]">
              {period} {pick(t.expected, lang, "— kỳ vọng")}
            </p>
            <p className="mt-1 font-[var(--font-numeric)] text-[length:var(--font-size-numeric)] font-semibold">
              ¥{netExpected.toLocaleString("vi-VN")}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-text-secondary)]">
              {period} {pick(t.actual, lang, "— thực nhận")}
            </p>
            <p className="mt-1 font-[var(--font-numeric)] text-[length:var(--font-size-numeric)] font-semibold">
              ¥{netActual.toLocaleString("vi-VN")}
            </p>
          </CardContent>
        </Card>
        <Card className={diff > 0 ? "border-[var(--color-attention)]/30 bg-[var(--color-attention-light)]" : ""}>
          <CardContent className="pt-6">
            <p
              className={`text-xs font-medium uppercase tracking-wide ${
                diff > 0 ? "text-[var(--color-attention-text)]" : "text-[var(--color-text-secondary)]"
              }`}
            >
              {pick(t.diff, lang, "Chênh lệch")}
            </p>
            <p
              className={`mt-1 font-[var(--font-numeric)] text-[length:var(--font-size-numeric)] font-semibold ${
                diff > 0 ? "text-[var(--color-attention-text)]" : ""
              }`}
            >
              {diff > 0 ? "−" : ""}¥{Math.abs(diff).toLocaleString("vi-VN")}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{pick(t.colItem, lang, "Khoản mục")}</TableHead>
                <TableHead>{pick(t.colExpected, lang, "Kỳ vọng (theo hợp đồng/giờ làm)")}</TableHead>
                <TableHead>{pick(t.colActual, lang, "Thực tế (theo phiếu lương)")}</TableHead>
                <TableHead>{pick(t.colStatus, lang, "Trạng thái")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lines.map((line) => {
                const cfg = statusConfig[line.status];
                const Icon = cfg.icon;
                return (
                  <TableRow key={line.id} className="cursor-pointer" onClick={() => setActiveLine(line)}>
                    <TableCell className="font-medium">{line.label}</TableCell>
                    <TableCell className="text-[var(--color-text-secondary)]">{line.expected}</TableCell>
                    <TableCell className="text-[var(--color-text-secondary)]">{line.actual}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Icon className={`h-3.5 w-3.5 ${line.status === "checking" ? "animate-spin" : ""}`} />
                        <Badge variant={cfg.badge}>{pick(cfg.label, lang, cfg.label.vi)}</Badge>
                      </div>
                      {line.reason && (
                        <p className="mt-1 max-w-sm text-xs text-[var(--color-text-secondary)]">{line.reason}</p>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {mismatches.length > 0 && (
        <Card className="border-[var(--color-attention)]/30 bg-[var(--color-attention-light)]">
          <CardContent className="flex flex-wrap items-center justify-between gap-3 py-4">
            <div className="flex items-start gap-3">
              <FolderCheck className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-attention-text)]" />
              <p className="text-sm text-[var(--color-text-primary)]">{t.mismatchFound[lang](mismatches.length)}</p>
            </div>
            <Link
              to="/case-pack"
              className="inline-flex h-10 items-center justify-center rounded-[var(--radius-button)] border border-[var(--color-border)] bg-transparent px-4 text-sm font-medium text-[var(--color-text-primary)] hover:bg-[var(--color-surface-secondary)]"
            >
              {pick(t.createCasePack, lang, "Tạo hồ sơ nhờ hỗ trợ")}
            </Link>
          </CardContent>
        </Card>
      )}

      <Card className="border-dashed">
        <CardContent className="flex items-center gap-3 pt-6">
          <ShieldCheck className="h-4 w-4 text-[var(--color-text-secondary)]" />
          <p className="text-xs text-[var(--color-text-secondary)]">{pick(t.disclaimer, lang, t.disclaimer.vi)}</p>
        </CardContent>
      </Card>

      <ReconcileWizardModal open={wizardOpen} onOpenChange={setWizardOpen} />
      <ReconcileLineDrawer line={activeLine} onClose={() => setActiveLine(null)} />
    </div>
  );
}
