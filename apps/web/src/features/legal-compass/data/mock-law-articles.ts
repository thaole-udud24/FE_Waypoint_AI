import type { Lang } from "@/lib/i18n";

type Tri = Record<Lang, string>;

export interface LawArticle {
  id: string;
  code: Tri;
  title: Tri;
  summary: Tri;
  category: Tri;
}

// shortcut: dữ liệu mẫu, thay bằng gọi MOD_008 API (Law Pack) khi backend sẵn sàng.
export const mockLawArticles: LawArticle[] = [
  {
    id: "law-1",
    code: { vi: "Điều 37", en: "Article 37", ja: "第37条" },
    title: { vi: "Phụ trội làm thêm giờ ban đêm", en: "Night overtime premium", ja: "深夜残業の割増賃金" },
    summary: {
      vi: "Giờ làm thêm từ 22h–5h được tính tối thiểu 135% lương giờ thường.",
      en: "Overtime from 10pm–5am is paid at a minimum of 135% of the regular hourly wage.",
      ja: "22時〜5時の残業は通常賃金の最低135%で計算されます。",
    },
    category: { vi: "Tiền lương", en: "Wages", ja: "賃金" },
  },
  {
    id: "law-2",
    code: { vi: "Điều 32", en: "Article 32", ja: "第32条" },
    title: { vi: "Giới hạn giờ làm tiêu chuẩn", en: "Standard working hour limits", ja: "法定労働時間の上限" },
    summary: {
      vi: "Không vượt quá 8 giờ/ngày và 40 giờ/tuần, trừ trường hợp có thỏa thuận làm thêm hợp lệ.",
      en: "Must not exceed 8 hours/day and 40 hours/week, except under a valid overtime agreement.",
      ja: "有効な時間外労働協定がない限り、1日8時間・週40時間を超えてはならない。",
    },
    category: { vi: "Giờ làm", en: "Work hours", ja: "労働時間" },
  },
  {
    id: "law-3",
    code: { vi: "Điều 39", en: "Article 39", ja: "第39条" },
    title: { vi: "Ngày nghỉ có lương hằng năm", en: "Annual paid leave", ja: "年次有給休暇" },
    summary: {
      vi: "Người lao động làm việc liên tục 6 tháng được hưởng tối thiểu 10 ngày nghỉ có lương.",
      en: "Employees with 6 months of continuous service are entitled to at least 10 days of paid leave.",
      ja: "6か月間継続勤務した労働者は、最低10日間の有給休暇を取得できる。",
    },
    category: { vi: "Nghỉ phép", en: "Leave", ja: "休暇" },
  },
  {
    id: "law-4",
    code: { vi: "Điều 15", en: "Article 15", ja: "第15条" },
    title: { vi: "Nội dung bắt buộc của hợp đồng lao động", en: "Mandatory contract terms", ja: "労働契約の必須記載事項" },
    summary: {
      vi: "Hợp đồng phải ghi rõ mức lương, giờ làm, thời hạn và điều kiện chấm dứt hợp đồng.",
      en: "The contract must clearly state wages, working hours, term and termination conditions.",
      ja: "契約には賃金、労働時間、契約期間、解雇条件を明記しなければならない。",
    },
    category: { vi: "Hợp đồng", en: "Contract", ja: "契約" },
  },
];
