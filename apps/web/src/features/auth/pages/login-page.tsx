import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuthStore } from "@/stores/auth-store";
import { useLanguage, pick } from "@/lib/i18n";
import { AuthHero } from "../components/auth-hero";
import { AuthFormShell } from "../components/auth-form-shell";
import { GoogleButton } from "../components/google-button";
import { OrDivider } from "../components/or-divider";
import { loginSchema, type LoginFormValues } from "../schemas/login-schema";

const t = {
  title: { vi: "Đăng nhập vào Waypoint", en: "Sign in to Waypoint", ja: "Waypoint にログイン" },
  subtitle: {
    vi: "Chào mừng trở lại, vui lòng nhập thông tin của bạn.",
    en: "Welcome back, please enter your details.",
    ja: "おかえりなさい。ログイン情報を入力してください。",
  },
  email: { vi: "Email", en: "Email", ja: "メールアドレス" },
  password: { vi: "Mật khẩu", en: "Password", ja: "パスワード" },
  remember: { vi: "Ghi nhớ đăng nhập", en: "Remember me", ja: "ログイン状態を保持" },
  forgot: { vi: "Quên mật khẩu?", en: "Forgot password?", ja: "パスワードをお忘れですか？" },
  submit: { vi: "Tiếp tục", en: "Continue", ja: "続ける" },
  google: { vi: "Tiếp tục với Google", en: "Continue with Google", ja: "Google で続ける" },
  noAccount: { vi: "Chưa có tài khoản?", en: "Don't have an account?", ja: "アカウントをお持ちでないですか？" },
  register: { vi: "Đăng ký", en: "Sign up", ja: "新規登録" },
  loginFailed: { vi: "Đăng nhập thất bại", en: "Sign in failed", ja: "ログインに失敗しました" },
  demoFill: { vi: "Điền nhanh demo:", en: "Quick demo:", ja: "デモ入力:" },
  demoWrk: { vi: "Người lao động", en: "Worker", ja: "労働者" },
  demoSup: { vi: "Cán bộ hỗ trợ", en: "Supporter", ja: "支援員" },
  demoAdm: { vi: "Quản trị", en: "Admin", ja: "管理者" },
};

export function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const { lang } = useLanguage();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (values: LoginFormValues) => {
    setServerError(null);
    // shortcut: no real backend yet, mock login — vai trò suy ra từ tiền tố email
    // (admin@…, desk@…, còn lại là WRK). Thay bằng gọi API auth khi có backend.
    await new Promise((r) => setTimeout(r, 300));
    if (values.password.length < 6) {
      setServerError(pick(t.loginFailed, lang, "Đăng nhập thất bại"));
      return;
    }
    const local = values.email.split("@")[0].toLowerCase();
    const role = local.startsWith("admin") ? "ADM" : local.startsWith("desk") ? "SUP" : "WRK";
    const destination = role === "ADM" ? "/admin" : role === "SUP" ? "/desk" : "/home";
    login({ id: "1", name: local, email: values.email, role }, "mock-token");
    navigate(destination);
  };

  function fillDemo(email: string) {
    setValue("email", email, { shouldValidate: true });
    setValue("password", "123456", { shouldValidate: true });
  }

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      <AuthHero />

      <AuthFormShell
        title={pick(t.title, lang, t.title.vi)}
        subtitle={pick(t.subtitle, lang, t.subtitle.vi)}
        footer={
          <>
            {pick(t.noAccount, lang, t.noAccount.vi)}{" "}
            <Link to="/register" className="font-medium text-[var(--color-primary)] hover:underline">
              {pick(t.register, lang, "Đăng ký")}
            </Link>
          </>
        }
      >
        <form className="mt-7 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">{pick(t.email, lang, "Email")}</label>
            <Input type="email" placeholder="ban@email.com" error={!!errors.email} {...register("email")} />
            {errors.email && <p className="mt-1 text-xs text-[var(--color-error)]">{errors.email.message}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">{pick(t.password, lang, "Mật khẩu")}</label>
            <Input type="password" placeholder="••••••••" error={!!errors.password} {...register("password")} />
            {errors.password && <p className="mt-1 text-xs text-[var(--color-error)]">{errors.password.message}</p>}
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
              <Checkbox defaultChecked />
              {pick(t.remember, lang, t.remember.vi)}
            </label>
            <Link to="/forgot-password" className="text-sm text-[var(--color-primary)] hover:underline">
              {pick(t.forgot, lang, t.forgot.vi)}
            </Link>
          </div>

          {serverError && <p className="text-xs text-[var(--color-error)]">{serverError}</p>}

          <Button type="submit" className="w-full" loading={isSubmitting}>
            {pick(t.submit, lang, "Tiếp tục")}
          </Button>
        </form>

        <div className="mt-4 flex flex-wrap items-center gap-1.5 text-[11px] text-[var(--color-text-secondary)]">
          <span>{pick(t.demoFill, lang, t.demoFill.vi)}</span>
          {[
            { label: pick(t.demoWrk, lang, t.demoWrk.vi), email: "worker@waypoint.jp" },
            { label: pick(t.demoSup, lang, t.demoSup.vi), email: "desk@waypoint.jp" },
            { label: pick(t.demoAdm, lang, t.demoAdm.vi), email: "admin@waypoint.jp" },
          ].map((d) => (
            <button
              key={d.email}
              type="button"
              onClick={() => fillDemo(d.email)}
              className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface-secondary)] px-2.5 py-0.5 font-medium text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-primary)]/50 hover:text-[var(--color-primary)]"
            >
              {d.label}
            </button>
          ))}
        </div>

        <OrDivider />
        <GoogleButton label={pick(t.google, lang, t.google.vi)} />
      </AuthFormShell>
    </div>
  );
}
