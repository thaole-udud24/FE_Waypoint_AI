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

const STEPS = ["Định danh & mật khẩu", "Hồ sơ nơi làm việc", "Quyền riêng tư"];

function genRecoveryKey() {
  // shortcut: khóa khôi phục demo, thay bằng khóa sinh phía backend khi có API thật (FUN_001).
  return Array.from({ length: 4 }, () => Math.random().toString(36).slice(2, 7).toUpperCase()).join("-");
}

export function RegisterPage() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
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

  const strength = password.length >= 10 ? "Mạnh" : password.length >= 6 ? "Trung bình" : "Yếu";

  function finishRegistration() {
    login({ id: "1", name: email.split("@")[0] || "bạn", email, role: "WRK" }, "mock-token");
    navigate("/home");
  }

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      <AuthHero />

      <AuthFormShell
        title="Tạo tài khoản Lộ Trình"
        subtitle={`Bước ${step}/3 · ${STEPS[step - 1]}`}
        footer={
          <>
            Đã có tài khoản?{" "}
            <Link to="/login" className="font-medium text-[var(--color-primary)] hover:underline">
              Đăng nhập
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
                <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">Email hoặc số điện thoại</label>
                <Input type="email" placeholder="ban@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">Mật khẩu</label>
                <Input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
                {password && (
                  <p className="mt-1 text-xs text-[var(--color-text-secondary)]">Độ mạnh: {strength}</p>
                )}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">Nước làm việc</label>
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jp">Nhật Bản</SelectItem>
                    <SelectItem value="vn">Việt Nam</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">Tỉnh/thành</label>
                <Input placeholder="VD: Tokyo" value={province} onChange={(e) => setProvince(e.target.value)} />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">Ngôn ngữ giao diện</label>
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
                <span className="text-sm text-[var(--color-text-primary)]">Khóa PIN (tùy chọn)</span>
                <Switch checked={pinEnabled} onCheckedChange={setPinEnabled} />
              </div>
              <div className="flex items-center justify-between rounded-[14px] border border-dashed border-[var(--color-border)] p-3">
                <span className="text-sm text-[var(--color-text-primary)]">Đồng ý chia sẻ Case Pack khi cần</span>
                <Switch checked={consentShare} onCheckedChange={setConsentShare} />
              </div>
              <div className="flex items-center justify-between rounded-[14px] border border-dashed border-[var(--color-border)] p-3">
                <span className="text-sm text-[var(--color-text-primary)]">Đồng ý dùng LLM bên ngoài để trả lời câu hỏi</span>
                <Switch checked={consentLlm} onCheckedChange={setConsentLlm} />
              </div>
            </>
          )}

          {step === 3 && savedRecoveryKey === false && (
            <div className="rounded-[16px] bg-[var(--card-butter)] p-4">
              <p className="text-sm font-medium text-[var(--color-text-primary)]">Khóa khôi phục của bạn</p>
              <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
                Lưu lại mã này — bạn sẽ không thể xem lại sau khi rời trang. Dùng để khôi phục tài khoản khi không có email.
              </p>
              <div className="mt-2 flex items-center justify-between rounded-[12px] bg-[var(--color-surface)] px-3 py-2.5 font-mono text-sm text-[var(--color-text-primary)]">
                {recoveryKey}
                <button onClick={() => navigator.clipboard?.writeText(recoveryKey)} aria-label="Sao chép" className="text-[var(--color-text-secondary)]">
                  <Copy className="h-4 w-4" />
                </button>
              </div>
              <Button className="mt-3 w-full" onClick={() => setSavedRecoveryKey(true)}>
                <Check className="h-4 w-4" /> Đã lưu lại
              </Button>
            </div>
          )}

          {step === 3 && savedRecoveryKey && (
            <div className="rounded-[16px] bg-[var(--card-mint)] p-4 text-center">
              <Check className="mx-auto h-6 w-6 text-[var(--color-success)]" />
              <p className="mt-2 text-sm font-medium text-[var(--color-text-primary)]">Sẵn sàng bắt đầu!</p>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-between gap-2">
          {step > 1 && step < 3 && (
            <Button variant="outline" onClick={() => setStep((s) => s - 1)}>
              Quay lại
            </Button>
          )}
          {step === 1 && <span />}
          {step < 3 ? (
            <Button className="ml-auto" onClick={() => setStep((s) => s + 1)} disabled={step === 1 && (!email || password.length < 6)}>
              Tiếp tục
            </Button>
          ) : (
            savedRecoveryKey && (
              <Button className="ml-auto" onClick={finishRegistration}>
                Vào ứng dụng
              </Button>
            )
          )}
        </div>
      </AuthFormShell>
    </div>
  );
}
