import { type LawLabelValue } from "@/components/domain/law-label";
import type { Lang } from "@/lib/i18n";

export interface ContractClause {
  no: number;
  topic: Record<Lang, string>;
  ja: string; // gốc tiếng Nhật — luôn giữ nguyên, không đổi theo ngôn ngữ giao diện
  translation: Record<Lang, string>; // bản dịch sang ngôn ngữ giao diện hiện tại
  lawLabel: LawLabelValue;
  note?: Record<Lang, string>;
  sources: string[];
}

// shortcut: dữ liệu mẫu song ngữ, thay bằng kết quả trích xuất + dịch thật
// (MOD_003 FUN_026/028/029) khi backend sẵn sàng.
export const mockContractClauses: ContractClause[] = [
  {
    no: 1,
    topic: { vi: "Tiền lương", en: "Wages", ja: "賃金" },
    ja: "基本給は月額198,000円とし、毎月25日に支払う。",
    translation: {
      vi: "Lương cơ bản là 198.000 yên/tháng, trả vào ngày 25 hằng tháng.",
      en: "Base salary is ¥198,000/month, paid on the 25th of each month.",
      ja: "基本給は月額198,000円とし、毎月25日に支払う。",
    },
    lawLabel: "compliant",
    sources: ["Hợp đồng tr.1"],
  },
  {
    no: 2,
    topic: { vi: "Giờ làm thêm", en: "Overtime", ja: "時間外労働" },
    ja: "時間外労働の割増賃金は通常賃金の125%とする。",
    translation: {
      vi: "Phụ trội làm thêm giờ được tính bằng 125% lương giờ thường.",
      en: "Overtime premium is paid at 125% of the regular hourly wage.",
      ja: "時間外労働の割増賃金は通常賃金の125%とする。",
    },
    lawLabel: "ask_again",
    note: {
      vi: "Mức này thấp hơn mức tối thiểu luật định 135% áp dụng cho giờ làm thêm ban đêm (22h–5h).",
      en: "This rate is below the legal minimum of 135% that applies to night overtime (10pm–5am).",
      ja: "この割増率は、深夜残業（22時〜5時）に適用される法定最低率135%を下回っています。",
    },
    sources: ["Hợp đồng tr.2", "Điều 37 Luật Tiêu chuẩn Lao động"],
  },
  {
    no: 3,
    topic: { vi: "Ngày nghỉ", en: "Leave", ja: "休暇" },
    ja: "年次有給休暇は勤続6か月後に10日付与する。",
    translation: {
      vi: "Nghỉ phép năm có lương: cấp 10 ngày sau 6 tháng làm việc liên tục.",
      en: "Annual paid leave: 10 days granted after 6 months of continuous employment.",
      ja: "年次有給休暇は勤続6か月後に10日付与する。",
    },
    lawLabel: "compliant",
    sources: ["Hợp đồng tr.2", "Điều 39 Luật Tiêu chuẩn Lao động"],
  },
  {
    no: 4,
    topic: { vi: "Giữ giấy tờ tùy thân", en: "ID document custody", ja: "身分証明書の保管" },
    ja: "会社は従業員のパスポートを保管しないものとする。",
    translation: {
      vi: "Công ty không được giữ hộ chiếu hoặc giấy tờ tùy thân của người lao động.",
      en: "The company shall not hold the employee's passport or ID documents.",
      ja: "会社は従業員のパスポートを保管しないものとする。",
    },
    lawLabel: "compliant",
    sources: ["Hợp đồng tr.3"],
  },
  {
    no: 5,
    topic: { vi: "Chấm dứt hợp đồng", en: "Termination", ja: "契約の終了" },
    ja: "解雇の場合、少なくとも30日前に予告するか、解雇予告手当を支払う。",
    translation: {
      vi: "Khi chấm dứt hợp đồng, công ty phải báo trước ít nhất 30 ngày hoặc trả trợ cấp báo trước.",
      en: "Upon termination, the company must give at least 30 days' notice or pay notice allowance instead.",
      ja: "解雇の場合、少なくとも30日前に予告するか、解雇予告手当を支払う。",
    },
    lawLabel: "no_rule",
    note: {
      vi: "Chưa có quy tắc tương ứng trong Law Pack hành lang hiện tại — không thể kết luận mức tối thiểu.",
      en: "No corresponding rule in the current Law Pack corridor — the minimum cannot be determined.",
      ja: "現在のLaw Pack（対象国間ルール）には対応する規定がなく、最低基準は判断できません。",
    },
    sources: ["Hợp đồng tr.4"],
  },
];
