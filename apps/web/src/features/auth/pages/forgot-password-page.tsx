import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { MailCheck, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthHero } from "../components/auth-hero";
import { AuthFormShell } from "../components/auth-form-shell";
import { forgotPasswordSchema, type ForgotPasswordFormValues } from "../schemas/forgot-password-schema";
import { useLanguage, pick } from "@/lib/i18n";

const t = {
  checkEmailTitle: { vi: "Kiểm tra email của bạn", en: "Check your email", ja: "メールをご確認ください" },
  forgotTitle: { vi: "Quên mật khẩu?", en: "Forgot password?", ja: "パスワードをお忘れですか？" },
  sentTo: {
    vi: (email: string) => `Mình đã gửi liên kết đặt lại mật khẩu tới ${email}.`,
    en: (email: string) => `We sent a password reset link to ${email}.`,
    ja: (email: string) => `パスワード再設定リンクを ${email} に送信しました。`,
  },
  enterEmail: {
    vi: "Nhập email đã đăng ký, mình sẽ gửi liên kết đặt lại mật khẩu.",
    en: "Enter your registered email and we'll send you a password reset link.",
    ja: "登録済みのメールアドレスを入力してください。パスワード再設定リンクをお送りします。",
  },
  backToLogin: { vi: "Quay lại đăng nhập", en: "Back to login", ja: "ログインに戻る" },
  noEmail: {
    vi: "Không thấy email? Kiểm tra mục thư rác hoặc thử lại sau vài phút.",
    en: "Don't see the email? Check your spam folder or try again in a few minutes.",
    ja: "メールが届かない場合は、迷惑メールフォルダをご確認のうえ、数分後に再度お試しください。",
  },
  email: { vi: "Email", en: "Email", ja: "メールアドレス" },
  sendResetLink: { vi: "Gửi liên kết đặt lại", en: "Send reset link", ja: "再設定リンクを送信" },
};

export function ForgotPasswordPage() {
  const { lang } = useLanguage();
  const [sentTo, setSentTo] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({ resolver: zodResolver(forgotPasswordSchema) });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    // shortcut: no real backend yet, mock send. Upgrade when auth API exists.
    await new Promise((r) => setTimeout(r, 400));
    setSentTo(values.email);
  };

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      <AuthHero />

      <AuthFormShell
        title={sentTo ? pick(t.checkEmailTitle, lang, t.checkEmailTitle.vi) : pick(t.forgotTitle, lang, t.forgotTitle.vi)}
        subtitle={sentTo ? (t.sentTo[lang] ?? t.sentTo.vi)(sentTo) : pick(t.enterEmail, lang, t.enterEmail.vi)}
        footer={
          <Link to="/login" className="inline-flex items-center gap-1.5 font-medium text-[var(--color-primary)] hover:underline">
            <ArrowLeft className="h-3.5 w-3.5" />
            {pick(t.backToLogin, lang, t.backToLogin.vi)}
          </Link>
        }
      >
        {sentTo ? (
          <div className="mt-7 flex flex-col items-center gap-2 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] py-8 text-center">
            <MailCheck className="h-8 w-8 text-[var(--color-primary)]" />
            <p className="max-w-[220px] text-sm text-[var(--color-text-secondary)]">{pick(t.noEmail, lang, t.noEmail.vi)}</p>
          </div>
        ) : (
          <form className="mt-7 space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">{pick(t.email, lang, t.email.vi)}</label>
              <Input type="email" placeholder="ban@email.com" error={!!errors.email} {...register("email")} />
              {errors.email && <p className="mt-1 text-xs text-[var(--color-error)]">{errors.email.message}</p>}
            </div>
            <Button type="submit" className="w-full" loading={isSubmitting}>
              {pick(t.sendResetLink, lang, t.sendResetLink.vi)}
            </Button>
          </form>
        )}
      </AuthFormShell>
    </div>
  );
}
