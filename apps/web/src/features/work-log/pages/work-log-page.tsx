import { useMemo, useState } from "react";
import { Clock3, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/domain/page-header";
import { useLanguage, pick } from "@/lib/i18n";
import { AddWorkLogModal } from "../components/add-work-log-modal";
import { mockWorkLog } from "../data/mock-work-log";

const t = {
  addButton: { vi: "Ghi giờ làm", en: "Log hours", ja: "勤務を記録" },
  totalStandard: { vi: "Tổng giờ chuẩn", en: "Total standard hours", ja: "所定労働時間合計" },
  totalOvertime: { vi: "Tổng giờ làm thêm", en: "Total overtime", ja: "時間外労働合計" },
  emptyTitle: { vi: "Chưa có nhật ký giờ làm", en: "No work log yet", ja: "勤務記録がありません" },
  emptyDesc: {
    vi: "Ghi lại giờ vào/ra mỗi ngày để đối chiếu với phiếu lương.",
    en: "Log your daily clock-in/out to reconcile with your payslip.",
    ja: "毎日の出退勤を記録し、給与明細との照合に使いましょう。",
  },
  colDate: { vi: "Ngày", en: "Date", ja: "日付" },
  colCheckIn: { vi: "Giờ vào", en: "Clock in", ja: "出勤時刻" },
  colCheckOut: { vi: "Giờ ra", en: "Clock out", ja: "退勤時刻" },
  colStandard: { vi: "Giờ chuẩn", en: "Standard", ja: "所定時間" },
  colOvertime: { vi: "Làm thêm", en: "Overtime", ja: "時間外" },
  colNote: { vi: "Ghi chú", en: "Note", ja: "メモ" },
};

export function WorkLogPage() {
  const { lang } = useLanguage();
  const [entries, setEntries] = useState(mockWorkLog);
  const [addOpen, setAddOpen] = useState(false);

  const totals = useMemo(
    () => ({
      hours: entries.reduce((sum, e) => sum + e.hours, 0),
      overtime: entries.reduce((sum, e) => sum + e.overtimeHours, 0),
    }),
    [entries]
  );

  return (
    <div className="space-y-5">
      <PageHeader
        title="Giờ làm"
        kanji="勤務"
        subtitle="Nhật ký giờ làm hằng ngày — dùng để đối chiếu với lương (PayGuard AI)."
        actions={
          <Button onClick={() => setAddOpen(true)}>
            <Plus className="h-4 w-4" /> {pick(t.addButton, lang, "Ghi giờ làm")}
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-text-secondary)]">
              {pick(t.totalStandard, lang, "Tổng giờ chuẩn")}
            </p>
            <p className="mt-1 font-[var(--font-numeric)] text-[length:var(--font-size-numeric)] font-semibold">
              {totals.hours}h
            </p>
          </CardContent>
        </Card>
        <Card className="border-[var(--color-attention)]/30 bg-[var(--color-attention-light)]">
          <CardContent className="pt-6">
            <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-attention-text)]">
              {pick(t.totalOvertime, lang, "Tổng giờ làm thêm")}
            </p>
            <p className="mt-1 font-[var(--font-numeric)] text-[length:var(--font-size-numeric)] font-semibold text-[var(--color-attention-text)]">
              {totals.overtime}h
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-0">
          {entries.length === 0 ? (
            <EmptyState
              title={pick(t.emptyTitle, lang, "Chưa có nhật ký giờ làm")}
              description={pick(t.emptyDesc, lang, t.emptyDesc.vi)}
              icon={<Clock3 className="h-10 w-10" />}
              action={
                <Button className="mt-2" onClick={() => setAddOpen(true)}>
                  {pick(t.addButton, lang, "Ghi giờ làm")}
                </Button>
              }
            />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{pick(t.colDate, lang, "Ngày")}</TableHead>
                  <TableHead>{pick(t.colCheckIn, lang, "Giờ vào")}</TableHead>
                  <TableHead>{pick(t.colCheckOut, lang, "Giờ ra")}</TableHead>
                  <TableHead>{pick(t.colStandard, lang, "Giờ chuẩn")}</TableHead>
                  <TableHead>{pick(t.colOvertime, lang, "Làm thêm")}</TableHead>
                  <TableHead>{pick(t.colNote, lang, "Ghi chú")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {entries.map((e) => (
                  <TableRow key={e.id}>
                    <TableCell className="font-medium">{e.date}</TableCell>
                    <TableCell className="text-[var(--color-text-secondary)]">{e.checkIn}</TableCell>
                    <TableCell className="text-[var(--color-text-secondary)]">{e.checkOut}</TableCell>
                    <TableCell>{e.hours}h</TableCell>
                    <TableCell>
                      {e.overtimeHours > 0 ? (
                        <Badge variant="warning">+{e.overtimeHours}h</Badge>
                      ) : (
                        <span className="text-[var(--color-text-disabled)]">—</span>
                      )}
                    </TableCell>
                    <TableCell className="max-w-xs truncate text-[var(--color-text-secondary)]">
                      {e.note ?? "—"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <AddWorkLogModal open={addOpen} onOpenChange={setAddOpen} onAdded={(entry) => setEntries((prev) => [entry, ...prev])} />
    </div>
  );
}
