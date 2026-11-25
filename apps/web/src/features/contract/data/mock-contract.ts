import type { Lang } from "@/lib/i18n";

type Tri = Record<Lang, string>;

export interface ContractTerm {
  label: Tri;
  value: Tri;
  note?: Tri;
}

export interface ContractAlert {
  id: string;
  severity: "warning" | "info";
  message: Tri;
}

// shortcut: dữ liệu mẫu, thay bằng gọi MOD_003 API (trích xuất hợp đồng) khi backend sẵn sàng.
export const mockContract = {
  fileName: {
    vi: "Hợp đồng lao động - Công ty ABC.pdf",
    en: "Employment Contract - ABC Co.pdf",
    ja: "雇用契約書 - ABC株式会社.pdf",
  } as Tri,
  signedAt: "02/09/2026",
  expiresAt: "01/09/2027",
  employer: {
    vi: "Công ty TNHH Sản xuất ABC",
    en: "ABC Manufacturing Co., Ltd.",
    ja: "ABC製造株式会社",
  } as Tri,
  position: { vi: "Kỹ thuật viên lắp ráp", en: "Assembly technician", ja: "組立技術者" } as Tri,
  terms: [
    {
      label: { vi: "Lương cơ bản", en: "Base salary", ja: "基本給" },
      value: { vi: "¥198,000 / tháng", en: "¥198,000 / month", ja: "月額 198,000円" },
    },
    {
      label: { vi: "Phụ cấp nhà ở", en: "Housing allowance", ja: "住宅手当" },
      value: { vi: "¥15,000 / tháng", en: "¥15,000 / month", ja: "月額 15,000円" },
    },
    {
      label: { vi: "Giờ làm chuẩn", en: "Standard hours", ja: "所定労働時間" },
      value: { vi: "8 giờ/ngày, 40 giờ/tuần", en: "8 hrs/day, 40 hrs/week", ja: "1日8時間、週40時間" },
    },
    {
      label: { vi: "Mức phụ trội làm thêm", en: "Overtime premium", ja: "時間外割増率" },
      value: { vi: "125% lương giờ thường", en: "125% of regular hourly rate", ja: "通常賃金の125%" },
      note: { vi: "Đêm/ngày nghỉ: 135%", en: "Night/holiday: 135%", ja: "深夜・休日：135%" },
    },
    {
      label: { vi: "Ngày nghỉ có lương", en: "Paid leave", ja: "有給休暇" },
      value: { vi: "10 ngày/năm", en: "10 days/year", ja: "年10日" },
    },
    {
      label: { vi: "Thời hạn hợp đồng", en: "Contract term", ja: "契約期間" },
      value: { vi: "12 tháng, có thể gia hạn", en: "12 months, renewable", ja: "12か月、更新可" },
    },
  ] as ContractTerm[],
  alerts: [
    {
      id: "a1",
      severity: "warning",
      message: {
        vi: "Mức phụ trội làm thêm ghi trong hợp đồng (125%) thấp hơn mức tối thiểu luật định cho giờ đêm (135%).",
        en: "The overtime premium in the contract (125%) is below the legal minimum for night hours (135%).",
        ja: "契約記載の時間外割増率（125%）は、深夜労働の法定最低率（135%）を下回っています。",
      },
    },
    {
      id: "a2",
      severity: "info",
      message: {
        vi: "Hợp đồng sẽ hết hạn trong 9 tháng — nên theo dõi thông báo gia hạn.",
        en: "The contract expires in 9 months — watch for renewal notices.",
        ja: "契約はあと9か月で満了します — 更新通知にご注意ください。",
      },
    },
  ] as ContractAlert[],
};
