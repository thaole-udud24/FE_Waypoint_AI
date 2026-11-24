import { Switch } from "@/components/ui/switch";
import { useLanguage, pick, type Lang } from "@/lib/i18n";

type Tri = Record<Lang, string>;

/**
 * FUN_010 / BR_037: đồng ý tách riêng theo từng mục đích, mặc định tắt. Hiện
 * rõ dữ liệu nào sẽ rời thiết bị khi bật — dùng đúng component này ở mọi nơi
 * cần xin đồng ý (UI_CODE_RULES.md §6.2), không tự chế công tắc riêng.
 */
export function ConsentToggle({
  title,
  description,
  granted,
  onChange,
}: {
  title: Tri;
  description: Tri;
  granted: boolean;
  onChange: (next: boolean) => void;
}) {
  const { lang } = useLanguage();
  return (
    <div className="flex items-center justify-between gap-3 py-1">
      <div>
        <p className="text-sm font-medium text-[var(--color-text-primary)]">{pick(title, lang, title.vi)}</p>
        <p className="text-xs text-[var(--color-text-secondary)]">{pick(description, lang, description.vi)}</p>
      </div>
      <Switch checked={granted} onCheckedChange={onChange} />
    </div>
  );
}
