import type { Lang } from "@/lib/i18n";

type Tri = Record<Lang, string>;

export type CasePackStatus = "draft" | "shared" | "expired";

export interface CasePack {
  id: string;
  title: Tri;
  status: CasePackStatus;
  sharedWith?: Tri;
  createdAt: string;
  expiresInDays?: number;
  itemCount: number;
}

// shortcut: dữ liệu mẫu, thay bằng gọi MOD_013 API khi backend sẵn sàng.
export const mockCasePacks: CasePack[] = [
  {
    id: "cp-1",
    title: { vi: "Lệch phụ trội làm thêm kỳ 11/2026", en: "Overtime premium mismatch — period 11/2026", ja: "2026年11月分の割増賃金の不一致" },
    status: "shared",
    sharedWith: { vi: "Nghiệp đoàn hỗ trợ ABC", en: "ABC Support Union", ja: "ABC支援組合" },
    createdAt: "22/11/2026",
    expiresInDays: 12,
    itemCount: 4,
  },
  {
    id: "cp-2",
    title: { vi: "Hợp đồng không khớp mức lương cam kết", en: "Contract doesn't match the promised wage", ja: "契約が約束された賃金と一致しない" },
    status: "draft",
    createdAt: "18/11/2026",
    itemCount: 2,
  },
];
