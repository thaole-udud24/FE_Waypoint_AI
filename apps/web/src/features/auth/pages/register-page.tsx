import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useAuthStore } from "@/stores/auth-store";
import { AuthHero } from "../components/auth-hero";
import { AuthFormShell } from "../components/auth-form-shell";
import { useLanguage, pick } from "@/lib/i18n";

const STEPS = [
  { vi: "Định danh & mật khẩu", en: "Identity & password", ja: "ID・パスワード" },
  { vi: "Hồ sơ nơi làm việc", en: "Workplace profile", ja: "勤務先情報" },
  { vi: "Quyền riêng tư", en: "Privacy", ja: "プライバシー" },
];

const t = {
  title: { vi: "Tạo tài khoản Waypoint", en: "Create your Waypoint account", ja: "Waypoint アカウントを作成" },
  step: { vi: "Bước", en: "Step", ja: "ステップ" },
  haveAccount: { vi: "Đã có tài khoản?", en: "Already have an account?", ja: "すでにアカウントをお持ちですか？" },
  login: { vi: "Đăng nhập", en: "Log in", ja: "ログイン" },
  emailOrPhone: { vi: "Email hoặc số điện thoại", en: "Email or phone number", ja: "メールアドレスまたは電話番号" },
  password: { vi: "Mật khẩu", en: "Password", ja: "パスワード" },
  strengthLabel: { vi: "Độ mạnh", en: "Strength", ja: "強度" },
  strengthStrong: { vi: "Mạnh", en: "Strong", ja: "強い" },
  strengthMedium: { vi: "Trung bình", en: "Medium", ja: "普通" },
  strengthWeak: { vi: "Yếu", en: "Weak", ja: "弱い" },
  workCountry: { vi: "Nước làm việc", en: "Work country", ja: "就労国" },
  japan: { vi: "Nhật Bản", en: "Japan", ja: "日本" },
  vietnam: { vi: "Việt Nam", en: "Vietnam", ja: "ベトナム" },
  province: { vi: "Tỉnh/thành", en: "Province/city", ja: "都道府県・市" },
  interfaceLanguage: { vi: "Ngôn ngữ giao diện", en: "Interface language", ja: "表示言語" },
  pinLock: { vi: "Khóa PIN (tùy chọn)", en: "PIN lock (optional)", ja: "PINロック（任意）" },
  consentShare: { vi: "Đồng ý chia sẻ Case Pack khi cần", en: "Allow sharing a Case Pack when needed", ja: "必要時にCase Packの共有を許可する" },
  consentLlm: { vi: "Đồng ý dùng LLM bên ngoài để trả lời câu hỏi", en: "Allow using an external LLM to answer questions", ja: "質問への回答に外部LLMの利用を許可する" },
  recoveryKeyTitle: { vi: "Khóa khôi phục của bạn", en: "Your recovery key", ja: "あなたの復旧キー" },
  recoveryKeyBody: {
    vi: "Lưu lại mã này — bạn sẽ không thể xem lại sau khi rời trang. Dùng để khôi phục tài khoản khi không có email.",
    en: "Save this code — you won't be able to see it again after leaving this page. Use it to recover your account without email.",
    ja: "このコードを保存してください。ページを離れると再表示できません。メールがない場合のアカウント復旧に使用します。",
  },
  copy: { vi: "Sao chép", en: "Copy", ja: "コピー" },
  savedIt: { vi: "Đã lưu lại", en: "I've saved it", ja: "保存しました" },
  readyTitle: { vi: "Sẵn sàng bắt đầu!", en: "Ready to start!", ja: "準備が整いました！" },
  back: { vi: "Quay lại", en: "Back", ja: "戻る" },
  continue: { vi: "Tiếp tục", en: "Continue", ja: "続ける" },
  enterApp: { vi: "Vào ứng dụng", en: "Enter the app", ja: "アプリを開く" },
};

function genRecoveryKey() {
  // shortcut: khóa khôi phục demo, thay bằng khóa sinh phía backend khi có API thật (FUN_001).
  return Array.from({ length: 4 }, () => Math.random().toString(36).slice(2, 7).toUpperCase()).join("-");
}

export function RegisterPage() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const { lang } = useLanguage();
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("jp");
  const [province, setProvince] = useState("");
  const [language, setLanguage] = useState("vi");
  const [pinEnabled, setPinEnabled] = useState(false);
  const [consentShare, setConsentShare] = useState(false);
  const [consentLlm, setConsentLlm] = useState(false);

  const [recoveryKey] = useState(genRecoveryKey);
  const [savedRecoveryKey, setSavedRecoveryKey] = useState(false);

  const strengthDict = password.length >= 10 ? t.strengthStrong : password.length >= 6 ? t.strengthMedium : t.strengthWeak;
  const strength = pick(strengthDict, lang, strengthDict.vi);

  function finishRegistration() {
    login({ id: "1", name: email.split("@")[0] || "bạn", email, role: "WRK" }, "mock-token");
    navigate("/home");
  }

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      <AuthHero />

      <AuthFormShell
        title={pick(t.title, lang, t.title.vi)}
        subtitle={`${pick(t.step, lang, t.step.vi)} ${step}/3 · ${pick(STEPS[step - 1], lang, STEPS[step - 1].vi)}`}
        footer={
          <>
            {pick(t.haveAccount, lang, t.haveAccount.vi)}{" "}
            <Link to="/login" className="font-medium text-[var(--color-primary)] hover:underline">
              {pick(t.login, lang, t.login.vi)}
            </Link>
          </>
        }
      >
        <div className="mt-5 flex gap-1.5">
          {STEPS.map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full ${i < step ? "bg-[var(--color-primary)]" : "bg-[var(--color-surface-secondary)]"}`} />
          ))}
        </div>

        <div className="mt-6 space-y-4">
          {step === 1 && (
            <>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">{pick(t.emailOrPhone, lang, t.emailOrPhone.vi)}</label>
                <Input type="email" placeholder="ban@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">{pick(t.password, lang, t.password.vi)}</label>
                <Input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
                {password && (
                  <p className="mt-1 text-xs text-[var(--color-text-secondary)]">{pick(t.strengthLabel, lang, t.strengthLabel.vi)}: {strength}</p>
                )}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">{pick(t.workCountry, lang, t.workCountry.vi)}</label>
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jp">{pick(t.japan, lang, t.japan.vi)}</SelectItem>
                    <SelectItem value="vn">{pick(t.vietnam, lang, t.vietnam.vi)}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">{pick(t.province, lang, t.province.vi)}</label>
                <Input placeholder="VD: Tokyo" value={province} onChange={(e) => setProvince(e.target.value)} />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">{pick(t.interfaceLanguage, lang, t.interfaceLanguage.vi)}</label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vi">Tiếng Việt</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="ja">日本語</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {step === 3 && !savedRecoveryKey && (
            <>
              <div className="flex items-center justify-between rounded-[14px] border border-dashed border-[var(--color-border)] p-3">
                <span className="text-sm text-[var(--color-text-primary)]">{pick(t.pinLock, lang, t.pinLock.vi)}</span>
                <Switch checked={pinEnabled} onCheckedChange={setPinEnabled} />
              </div>
              <div className="flex items-center justify-between rounded-[14px] border border-dashed border-[var(--color-border)] p-3">
                <span className="text-sm text-[var(--color-text-primary)]">{pick(t.consentShare, lang, t.consentShare.vi)}</span>
                <Switch checked={consentShare} onCheckedChange={setConsentShare} />
              </div>
              <div className="flex items-center justify-between rounded-[14px] border border-dashed border-[var(--color-border)] p-3">
                <span className="text-sm text-[var(--color-text-primary)]">{pick(t.consentLlm, lang, t.consentLlm.vi)}</span>
                <Switch checked={consentLlm} onCheckedChange={setConsentLlm} />
              </div>
            </>
          )}

          {step === 3 && savedRecoveryKey === false && (
            <div className="rounded-[16px] bg-[var(--card-butter)] p-4">
              <p className="text-sm font-medium text-[var(--color-text-primary)]">{pick(t.recoveryKeyTitle, lang, t.recoveryKeyTitle.vi)}</p>
              <p className="mt-1 text-xs text-[var(--color-text-secondary)]">{pick(t.recoveryKeyBody, lang, t.recoveryKeyBody.vi)}</p>
              <div className="mt-2 flex items-center justify-between rounded-[12px] bg-[var(--color-surface)] px-3 py-2.5 font-mono text-sm text-[var(--color-text-primary)]">
                {recoveryKey}
                <button onClick={() => navigator.clipboard?.writeText(recoveryKey)} aria-label={pick(t.copy, lang, t.copy.vi)} className="text-[var(--color-text-secondary)]">
                  <Copy className="h-4 w-4" />
                </button>
              </div>
              <Button className="mt-3 w-full" onClick={() => setSavedRecoveryKey(true)}>
                <Check className="h-4 w-4" /> {pick(t.savedIt, lang, t.savedIt.vi)}
              </Button>
            </div>
          )}

          {step === 3 && savedRecoveryKey && (
            <div className="rounded-[16px] bg-[var(--card-mint)] p-4 text-center">
              <Check className="mx-auto h-6 w-6 text-[var(--color-success)]" />
              <p className="mt-2 text-sm font-medium text-[var(--color-text-primary)]">{pick(t.readyTitle, lang, t.readyTitle.vi)}</p>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-between gap-2">
          {step > 1 && step < 3 && (
            <Button variant="outline" onClick={() => setStep((s) => s - 1)}>
              {pick(t.back, lang, t.back.vi)}
            </Button>
          )}
          {step === 1 && <span />}
          {step < 3 ? (
            <Button className="ml-auto" onClick={() => setStep((s) => s + 1)} disabled={step === 1 && (!email || password.length < 6)}>
              {pick(t.continue, lang, t.continue.vi)}
            </Button>
          ) : (
            savedRecoveryKey && (
              <Button className="ml-auto" onClick={finishRegistration}>
                {pick(t.enterApp, lang, t.enterApp.vi)}
              </Button>
            )
          )}
        </div>
      </AuthFormShell>
    </div>
  );
}
