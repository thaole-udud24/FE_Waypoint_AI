import { Scale, Users, Building2, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/domain/page-header";
import { useLanguage, pick } from "@/lib/i18n";

// shortcut: dữ liệu mẫu, thay bằng gọi API tổng hợp (FUN_124) khi backend sẵn sàng.
const kpis = [
  { label: { vi: "Quy tắc đã phát hành", en: "Rules published", ja: "公開済みルール" }, value: "214", icon: Scale },
  { label: { vi: "Đề xuất Canh luật chờ xử lý", en: "Pending law-watch proposals", ja: "法令監視の保留中提案" }, value: "6", icon: AlertCircle },
  { label: { vi: "Tổ chức hoạt động", en: "Active organizations", ja: "稼働中の組織" }, value: "18", icon: Building2 },
  { label: { vi: "Cán bộ hỗ trợ", en: "Support staff", ja: "支援担当者" }, value: "42", icon: Users },
];

const t = {
  title: { vi: "Tổng quan quản trị", en: "Admin overview", ja: "管理概要" },
  subtitle: {
    vi: "Chỉ số vận hành tổng hợp — không có nội dung người dùng.",
    en: "Aggregate operational metrics — no user content.",
    ja: "集計運用指標 — ユーザーの内容は含みません。",
  },
  myWork: { vi: "Việc của tôi", en: "My work", ja: "自分の作業" },
  myWorkDetail: {
    vi: "3 quy tắc chờ bạn duyệt (không phải do bạn soạn) · 1 phiên bản Law Pack chờ phát hành.",
    en: "3 rules awaiting your review (not authored by you) · 1 Law Pack version pending release.",
    ja: "承認待ちのルール3件（あなたが作成したものではありません）・公開待ちのLaw Packバージョン1件。",
  },
};

export function AdminOverviewPage() {
  const { lang } = useLanguage();
  return (
    <div className="space-y-5">
      <PageHeader title={pick(t.title, lang, t.title.vi)} subtitle={pick(t.subtitle, lang, t.subtitle.vi)} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <Card key={k.label.vi}>
            <CardContent className="pt-6">
              <k.icon className="h-4 w-4 text-[#8f7cff]" />
              <p className="mt-2 font-[var(--font-numeric)] text-[length:var(--font-size-numeric)] font-bold text-[var(--color-text-primary)]">
                {k.value}
              </p>
              <p className="text-xs text-[var(--color-text-secondary)]">{pick(k.label, lang, k.label.vi)}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="pt-6">
          <p className="mb-2 text-sm font-medium text-[var(--color-text-primary)]">{pick(t.myWork, lang, t.myWork.vi)}</p>
          <p className="text-sm text-[var(--color-text-secondary)]">{pick(t.myWorkDetail, lang, t.myWorkDetail.vi)}</p>
        </CardContent>
      </Card>
    </div>
  );
}
