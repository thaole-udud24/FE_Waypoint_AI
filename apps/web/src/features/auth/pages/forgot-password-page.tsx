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

export function ForgotPasswordPage() {
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
        title={sentTo ? "Kiểm tra email của bạn" : "Quên mật khẩu?"}
        subtitle={
          sentTo
            ? `Mình đã gửi liên kết đặt lại mật khẩu tới ${sentTo}.`
            : "Nhập email đã đăng ký, mình sẽ gửi liên kết đặt lại mật khẩu."
        }
        footer={
          <Link to="/login" className="inline-flex items-center gap-1.5 font-medium text-[var(--color-primary)] hover:underline">
            <ArrowLeft className="h-3.5 w-3.5" />
            Quay lại đăng nhập
          </Link>
        }
      >
        {sentTo ? (
          <div className="mt-7 flex flex-col items-center gap-2 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface-secondary)] py-8 text-center">
            <MailCheck className="h-8 w-8 text-[var(--color-primary)]" />
            <p className="max-w-[220px] text-sm text-[var(--color-text-secondary)]">
              Không thấy email? Kiểm tra mục thư rác hoặc thử lại sau vài phút.
            </p>
          </div>
        ) : (
          <form className="mt-7 space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">Email</label>
              <Input type="email" placeholder="ban@email.com" error={!!errors.email} {...register("email")} />
              {errors.email && <p className="mt-1 text-xs text-[var(--color-error)]">{errors.email.message}</p>}
            </div>
            <Button type="submit" className="w-full" loading={isSubmitting}>
              Gửi liên kết đặt lại
            </Button>
          </form>
        )}
      </AuthFormShell>
    </div>
  );
}
