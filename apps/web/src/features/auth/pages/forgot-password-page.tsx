import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { MailCheck, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage, pick } from "@/lib/i18n";
import { AuthHero } from "../components/auth-hero";
import { AuthFormShell } from "../components/auth-form-shell";
import { forgotPasswordSchema, type ForgotPasswordFormValues } from "../schemas/forgot-password-schema";

const t = {
  sentTitle: { vi: "Kiểm tra email của bạn", en: "Check your email", ja: "メールをご確認ください" },
  title: { vi: "Quên mật khẩu?", en: "Forgot password?", ja: "パスワードをお忘れですか？" },
  sentSub: {
    vi: (e: string) => `Mình đã gửi liên kết đặt lại mật khẩu tới ${e}.`,
    en: (e: string) => `We sent a password reset link to ${e}.`,
    ja: (e: string) => `${e} にパスワード再設定リンクを送信しました。`,
  },
  sub: {
    vi: "Nhập email đã đăng ký, mình sẽ gửi liên kết đặt lại mật khẩu.",
    en: "Enter your registered email and we'll send a reset link.",
    ja: "登録済みのメールアドレスを入力してください。再設定リンクを送信します。",
  },
  backToLogin: { vi: "Quay lại đăng nhập", en: "Back to sign in", ja: "ログインに戻る" },
  spamHint: {
    vi: "Không thấy email? Kiểm tra mục thư rác hoặc thử lại sau vài phút.",
    en: "Didn't receive it? Check your spam folder or try again in a few minutes.",
    ja: "メールが届かない場合は迷惑メールフォルダをご確認いただくか、数分後に再試行してください。",
  },
  email: { vi: "Email", en: "Email", ja: "メールアドレス" },
  sendLink: { vi: "Gửi liên kết đặt lại", en: "Send reset link", ja: "再設定リンクを送信" },
};

export function ForgotPasswordPage() {
  const [sentTo, setSentTo] = useState<string | null>(null);
  const { lang } = useLanguage();

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
        title={sentTo ? pick(t.sentTitle, lang, t.sentTitle.vi) : pick(t.title, lang, t.title.vi)}
        subtitle={sentTo ? t.sentSub[lang](sentTo) : pick(t.sub, lang, t.sub.vi)}
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
            <p className="max-w-[240px] text-sm text-[var(--color-text-secondary)]">
              {pick(t.spamHint, lang, t.spamHint.vi)}
            </p>
          </div>
        ) : (
          <form className="mt-7 space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">{pick(t.email, lang, t.email.vi)}</label>
              <Input type="email" placeholder="ban@email.com" error={!!errors.email} {...register("email")} />
              {errors.email && <p className="mt-1 text-xs text-[var(--color-error)]">{errors.email.message}</p>}
            </div>
            <Button type="submit" className="w-full" loading={isSubmitting}>
              {pick(t.sendLink, lang, t.sendLink.vi)}
            </Button>
          </form>
        )}
      </AuthFormShell>
    </div>
  );
}
