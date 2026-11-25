import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { WaypointLogo } from "@/components/brand/waypoint-logo";
import { useLanguage, pick } from "@/lib/i18n";

const t = {
  invited: {
    vi: (org: string) => <>Bạn được mời tham gia <strong className="text-[var(--color-text-primary)]">{org}</strong> với vai trò Cán bộ hỗ trợ.</>,
    en: (org: string) => <>You've been invited to join <strong className="text-[var(--color-text-primary)]">{org}</strong> as Support staff.</>,
    ja: (org: string) => <><strong className="text-[var(--color-text-primary)]">{org}</strong> に支援担当者として参加するよう招待されています。</>,
  },
  invitedEmail: { vi: "Email được mời", en: "Invited email", ja: "招待されたメールアドレス" },
  setPassword: { vi: "Đặt mật khẩu", en: "Set a password", ja: "パスワードを設定" },
  activateAccount: { vi: "Kích hoạt tài khoản", en: "Activate account", ja: "アカウントを有効化" },
};

// shortcut: mô phỏng kích hoạt từ link mời (FUN_147), chưa nối API thật.
export function DeskActivatePage() {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const [password, setPassword] = useState("");

  return (
    <div className="flex min-h-screen items-center justify-center p-4" style={{ background: "var(--grad-desk-bg)" }}>
      <Card className="w-full max-w-sm">
        <CardContent className="pt-8">
          <WaypointLogo variant="light" size="md" className="mb-5" />
          <p className="text-sm text-[var(--color-text-secondary)]">{(t.invited[lang] ?? t.invited.vi)("Nghiệp đoàn hỗ trợ ABC")}</p>
          <div className="mt-5 space-y-3">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">{pick(t.invitedEmail, lang, t.invitedEmail.vi)}</label>
              <Input value="canbo@abc-union.jp" disabled />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">{pick(t.setPassword, lang, t.setPassword.vi)}</label>
              <Input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>
          <Button className="mt-5 w-full" disabled={password.length < 6} onClick={() => navigate("/desk")}>
            <ShieldCheck className="h-4 w-4" /> {pick(t.activateAccount, lang, t.activateAccount.vi)}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
