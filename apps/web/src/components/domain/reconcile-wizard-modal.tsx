import { useState } from "react";
import { Check, AlertTriangle, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { cn } from "@/lib/utils";

const STEPS = ["Chọn kỳ & tài liệu", "Kiểm tra dữ liệu", "Tiền thực nhận", "Chạy đối chiếu"];

// shortcut: dữ liệu mẫu, thay bằng gọi API thật (FUN_037-039) khi backend sẵn sàng.
const initialSourceChecks = [
  { id: "contract", label: "Hợp đồng đã xác nhận trường", ok: true },
  { id: "payslip", label: "Phiếu lương đã tải lên", ok: true },
  { id: "worklog", label: "Giờ làm đủ ngày trong kỳ", ok: false, hint: "Thiếu 2 ngày — bổ sung tại Giờ làm" },
];

const runSteps = ["Chọn quy tắc", "Tính từng khoản", "So bốn nguồn", "Gán nhãn", "Tổng hợp"];

export function ReconcileWizardModal({
  open,
  onOpenChange,
  onComplete,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete?: () => void;
}) {
  const [step, setStep] = useState(1);
  const [period, setPeriod] = useState("2026-11");
  const [payslip, setPayslip] = useState("payslip-11");
  const [netReceived, setNetReceived] = useState("");
  const [receivedDate, setReceivedDate] = useState("");
  const [running, setRunning] = useState(false);
  const [runStepIndex, setRunStepIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [sourceChecks, setSourceChecks] = useState(initialSourceChecks);

  const missing = sourceChecks.filter((c) => !c.ok);

  function reset() {
    setStep(1);
    setSourceChecks(initialSourceChecks);
    setNetReceived("");
    setReceivedDate("");
    setRunning(false);
    setRunStepIndex(0);
    setDone(false);
  }

  function close() {
    reset();
    onOpenChange(false);
  }

  function runReconciliation() {
    setRunning(true);
    setRunStepIndex(0);
    let i = 0;
    const timer = setInterval(() => {
      i += 1;
      setRunStepIndex(i);
      if (i >= runSteps.length) {
        clearInterval(timer);
        setDone(true);
        setRunning(false);
      }
    }, 450);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={close}>
      <div
        className="w-full max-w-xl overflow-hidden rounded-[24px] bg-[var(--color-surface)] shadow-[var(--shadow-float,0_14px_36px_rgba(27,23,64,.25))]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-5 py-4">
          <div>
            <p className="text-sm font-semibold text-[var(--color-text-primary)]">Tạo kỳ đối chiếu</p>
            <p className="text-xs text-[var(--color-text-secondary)]">
              Bước {step}/4 · {STEPS[step - 1]}
            </p>
          </div>
          <button onClick={close} className="rounded-full p-1.5 text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-secondary)]" aria-label="Đóng">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex gap-1.5 px-5 pt-4">
          {STEPS.map((_, i) => (
            <div key={i} className={cn("h-1.5 flex-1 rounded-full", i < step ? "bg-[var(--color-primary)]" : "bg-[var(--color-surface-secondary)]")} />
          ))}
        </div>

        <div className="min-h-[220px] px-5 py-5">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">Kỳ lương</label>
                <Select value={period} onValueChange={setPeriod}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2026-11">Kỳ 11/2026</SelectItem>
                    <SelectItem value="2026-10">Kỳ 10/2026</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">Hợp đồng</label>
                <Input disabled value="Hợp đồng lao động - Công ty ABC.pdf" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">Phiếu lương</label>
                <Select value={payslip} onValueChange={setPayslip}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="payslip-11">Phiếu lương kỳ 11/2026.pdf</SelectItem>
                    <SelectItem value="payslip-10">Phiếu lương kỳ 10/2026.pdf</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-2.5">
              <p className="text-sm text-[var(--color-text-secondary)]">Bốn nguồn cần có để chạy đối chiếu:</p>
              {sourceChecks.map((c) => (
                <div key={c.id} className="flex items-start gap-2.5 rounded-[14px] border border-[var(--color-border)] px-3 py-2.5">
                  {c.ok ? (
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-success)]" />
                  ) : (
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-attention-text)]" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm text-[var(--color-text-primary)]">{c.label}</p>
                    {!c.ok && c.hint && <p className="text-xs text-[var(--color-attention-text)]">{c.hint}</p>}
                  </div>
                  {!c.ok && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSourceChecks((prev) => prev.map((x) => (x.id === c.id ? { ...x, ok: true } : x)))}
                    >
                      Bổ sung ngay
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">Số tiền thực nhận (¥)</label>
                <Input type="number" min={0} placeholder="0" value={netReceived} onChange={(e) => setNetReceived(e.target.value)} />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">Ngày nhận</label>
                <Input type="date" value={receivedDate} onChange={(e) => setReceivedDate(e.target.value)} />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">Nhãn tài khoản (không nhập số tài khoản)</label>
                <Input placeholder="VD: Tài khoản chính" />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="flex flex-col items-center justify-center gap-4 py-4 text-center">
              {!running && !done && (
                <>
                  <p className="text-sm text-[var(--color-text-secondary)]">Sẵn sàng chạy đối chiếu cho {period === "2026-11" ? "Kỳ 11/2026" : "Kỳ 10/2026"}.</p>
                  <Button onClick={runReconciliation}>Chạy đối chiếu</Button>
                </>
              )}
              {running && (
                <div className="w-full space-y-2">
                  {runSteps.map((s, i) => (
                    <div key={s} className="flex items-center gap-2.5 text-sm">
                      {i < runStepIndex ? (
                        <Check className="h-4 w-4 text-[var(--color-success)]" />
                      ) : i === runStepIndex ? (
                        <Loader2 className="h-4 w-4 animate-spin text-[var(--color-primary)]" />
                      ) : (
                        <span className="h-4 w-4 rounded-full border border-[var(--color-border)]" />
                      )}
                      <span className={i <= runStepIndex ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-disabled)]"}>{s}</span>
                    </div>
                  ))}
                </div>
              )}
              {done && (
                <>
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-[var(--card-mint)]">
                    <Check className="h-6 w-6 text-[var(--color-success)]" />
                  </div>
                  <p className="text-sm font-medium text-[var(--color-text-primary)]">Đã tạo kỳ đối chiếu.</p>
                </>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-[var(--color-border)] px-5 py-4">
          <Button variant="outline" onClick={() => (step === 1 ? close() : setStep((s) => s - 1))} disabled={running}>
            {step === 1 ? "Hủy" : "Quay lại"}
          </Button>
          {step < 4 ? (
            <Button onClick={() => setStep((s) => s + 1)} disabled={step === 2 && missing.length > 0}>
              Tiếp tục
            </Button>
          ) : (
            done && (
              <Button
                onClick={() => {
                  onComplete?.();
                  close();
                }}
              >
                Xem kết quả
              </Button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
