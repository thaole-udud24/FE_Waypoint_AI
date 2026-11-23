import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3">
      <h1 className="text-4xl font-semibold text-[var(--color-text-primary)]">404</h1>
      <p className="text-[var(--color-text-secondary)]">Trang bạn tìm không tồn tại.</p>
      <Link to="/home">
        <Button>Về trang chính</Button>
      </Link>
    </div>
  );
}
