import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuthStore } from "@/stores/auth-store";
import { AuthHero } from "../components/auth-hero";
import { AuthFormShell } from "../components/auth-form-shell";
import { GoogleButton } from "../components/google-button";
import { OrDivider } from "../components/or-divider";
import { loginSchema, type LoginFormValues } from "../schemas/login-schema";
import { useLanguage, pick } from "@/lib/i18n";

const t = {
  title: { vi: "Đăng nhập vào Lộ Trình", en: "Log in to Lộ Trình", ja: "ロー・チンにログイン" },
  subtitle: {
    vi: "Chào mừng trở lại, vui lòng nhập thông tin của bạn.",
    en: "Welcome back, please enter your details.",
    ja: "お帰りなさい。情報を入力してください。",
  },
  noAccount: { vi: "Chưa có tài khoản?", en: "No account yet?", ja: "アカウントをお持ちでないですか？" },
  signUp: { vi: "Đăng ký", en: "Sign up", ja: "登録する" },
  email: { vi: "Email", en: "Email", ja: "メールアドレス" },
  password: { vi: "Mật khẩu", en: "Password", ja: "パスワード" },
  rememberMe: { vi: "Ghi nhớ đăng nhập", en: "Remember me", ja: "ログインを記憶する" },
  forgotPassword: { vi: "Quên mật khẩu?", en: "Forgot password?", ja: "パスワードをお忘れですか？" },
  continue: { vi: "Tiếp tục", en: "Continue", ja: "続ける" },
  continueWithGoogle: { vi: "Tiếp tục với Google", en: "Continue with Google", ja: "Googleで続ける" },
  loginFailed: { vi: "Đăng nhập thất bại", en: "Login failed", ja: "ログインに失敗しました" },
};

export function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const { lang } = useLanguage();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (values: LoginFormValues) => {
    setServerError(null);
    // shortcut: no real backend yet, mock login — vai trò suy ra từ tiền tố email
    // (admin@…, desk@…, còn lại là WRK). Thay bằng gọi API auth khi có backend.
    await new Promise((r) => setTimeout(r, 400));
    if (values.password.length < 6) {
      setServerError(pick(t.loginFailed, lang, t.loginFailed.vi));
      return;
    }
    const local = values.email.split("@")[0].toLowerCase();
    const role = local.startsWith("admin") ? "ADM" : local.startsWith("desk") ? "SUP" : "WRK";
    const destination = role === "ADM" ? "/admin" : role === "SUP" ? "/desk" : "/home";
    login({ id: "1", name: local, email: values.email, role }, "mock-token");
    navigate(destination);
  };

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
              {pick(t.signUp, lang, t.signUp.vi)}
            </Link>
          </>
        }
      >
        <form className="mt-7 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">{pick(t.email, lang, t.email.vi)}</label>
            <Input type="email" placeholder="ban@email.com" error={!!errors.email} {...register("email")} />
            {errors.email && <p className="mt-1 text-xs text-[var(--color-error)]">{errors.email.message}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">{pick(t.password, lang, t.password.vi)}</label>
            <Input type="password" placeholder="••••••••" error={!!errors.password} {...register("password")} />
            {errors.password && <p className="mt-1 text-xs text-[var(--color-error)]">{errors.password.message}</p>}
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
              <Checkbox defaultChecked />
              {pick(t.rememberMe, lang, t.rememberMe.vi)}
            </label>
            <Link to="/forgot-password" className="text-sm text-[var(--color-primary)] hover:underline">
              {pick(t.forgotPassword, lang, t.forgotPassword.vi)}
            </Link>
          </div>

          {serverError && <p className="text-xs text-[var(--color-error)]">{serverError}</p>}

          <Button type="submit" className="w-full" loading={isSubmitting}>
            {pick(t.continue, lang, t.continue.vi)}
          </Button>
        </form>

        <OrDivider />
        <GoogleButton label={pick(t.continueWithGoogle, lang, t.continueWithGoogle.vi)} />
      </AuthFormShell>
    </div>
  );
}
