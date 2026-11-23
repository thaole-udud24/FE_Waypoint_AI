import type { Lang } from "@/lib/i18n";

type Tri = Record<Lang, string>;

export type EvidenceKind = "photo" | "audio" | "note";

export interface EvidenceItem {
  id: string;
  title: Tri;
  kind: EvidenceKind;
  tags: Tri[];
  capturedAt: string;
  linkedTo?: Tri;
}

// shortcut: dữ liệu mẫu, thay bằng gọi MOD_007 API khi backend sẵn sàng.
export const mockEvidence: EvidenceItem[] = [
  {
    id: "ev-1",
    title: { vi: "Ảnh chụp bảng chấm công ca đêm 20/11", en: "Photo of night-shift timesheet, Nov 20", ja: "11月20日深夜シフトのタイムカード写真" },
    kind: "photo",
    tags: [
      { vi: "giờ làm", en: "work hours", ja: "勤務時間" },
      { vi: "ca đêm", en: "night shift", ja: "深夜シフト" },
    ],
    capturedAt: "20/11/2026",
    linkedTo: { vi: "Giờ làm 20/11/2026", en: "Work log 20/11/2026", ja: "勤務記録 2026/11/20" },
  },
  {
    id: "ev-2",
    title: { vi: "Ghi âm trao đổi với quản lý về phụ trội", en: "Recording of discussion with manager about overtime premium", ja: "割増賃金について上司と話した録音" },
    kind: "audio",
    tags: [
      { vi: "phụ trội", en: "overtime premium", ja: "割増賃金" },
      { vi: "trao đổi", en: "conversation", ja: "やり取り" },
    ],
    capturedAt: "21/11/2026",
  },
  {
    id: "ev-3",
    title: { vi: "Ghi chú: quản lý xác nhận miệng về mức lương", en: "Note: manager verbally confirmed the wage rate", ja: "メモ：上司が口頭で賃金額を確認" },
    kind: "note",
    tags: [{ vi: "lương", en: "wages", ja: "賃金" }],
    capturedAt: "22/11/2026",
  },
];
