import { useState } from "react";
import { Modal, ModalContent, ModalTitle, ModalDescription } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage, pick } from "@/lib/i18n";
import { type WorkLogEntry } from "../data/mock-work-log";

const t = {
  title: { vi: "Ghi giờ làm", en: "Log hours", ja: "勤務を記録" },
  desc: {
    vi: "Giờ làm thêm được tính tự động khi tổng giờ vượt 8h/ngày.",
    en: "Overtime is calculated automatically when total hours exceed 8h/day.",
    ja: "1日の合計時間が8時間を超えると、時間外労働が自動計算されます。",
  },
  date: { vi: "Ngày", en: "Date", ja: "日付" },
  checkIn: { vi: "Giờ vào", en: "Clock in", ja: "出勤時刻" },
  checkOut: { vi: "Giờ ra", en: "Clock out", ja: "退勤時刻" },
  noteOptional: { vi: "Ghi chú (không bắt buộc)", en: "Note (optional)", ja: "メモ（任意）" },
  notePlaceholder: {
    vi: "VD: Làm thêm ca đêm theo yêu cầu quản lý",
    en: "e.g. Night overtime requested by manager",
    ja: "例：上司の指示による深夜残業",
  },
  cancel: { vi: "Hủy", en: "Cancel", ja: "キャンセル" },
  save: { vi: "Lưu", en: "Save", ja: "保存" },
};

function toHours(checkIn: string, checkOut: string) {
  const [inH, inM] = checkIn.split(":").map(Number);
  const [outH, outM] = checkOut.split(":").map(Number);
  const diff = outH + outM / 60 - (inH + inM / 60);
  return Math.max(0, Math.round(diff * 100) / 100);
}

export function AddWorkLogModal({
  open,
  onOpenChange,
  onAdded,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdded: (entry: WorkLogEntry) => void;
}) {
  const { lang } = useLanguage();
  const [date, setDate] = useState("");
  const [checkIn, setCheckIn] = useState("08:00");
  const [checkOut, setCheckOut] = useState("17:00");
  const [note, setNote] = useState("");

  function reset() {
    setDate("");
    setCheckIn("08:00");
    setCheckOut("17:00");
    setNote("");
  }

  function handleSave() {
    if (!date) return;
    const total = toHours(checkIn, checkOut);
    const standard = 8;
    onAdded({
      id: `wl-${Date.now()}`,
      date: new Date(date).toLocaleDateString("vi-VN"),
      checkIn,
      checkOut,
      hours: Math.min(total, standard),
      overtimeHours: Math.max(0, Math.round((total - standard) * 100) / 100),
      note: note || undefined,
    });
    reset();
    onOpenChange(false);
  }

  return (
    <Modal
      open={open}
      onOpenChange={(next) => {
        if (!next) reset();
        onOpenChange(next);
      }}
    >
      <ModalContent>
        <ModalTitle>{pick(t.title, lang, "Ghi giờ làm")}</ModalTitle>
        <ModalDescription>{pick(t.desc, lang, t.desc.vi)}</ModalDescription>

        <div className="mt-4 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">{pick(t.date, lang, "Ngày")}</label>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">{pick(t.checkIn, lang, "Giờ vào")}</label>
              <Input type="time" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">{pick(t.checkOut, lang, "Giờ ra")}</label>
              <Input type="time" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">{pick(t.noteOptional, lang, "Ghi chú (không bắt buộc)")}</label>
            <Input placeholder={pick(t.notePlaceholder, lang, t.notePlaceholder.vi)} value={note} onChange={(e) => setNote(e.target.value)} />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {pick(t.cancel, lang, "Hủy")}
          </Button>
          <Button onClick={handleSave} disabled={!date}>
            {pick(t.save, lang, "Lưu")}
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
}
