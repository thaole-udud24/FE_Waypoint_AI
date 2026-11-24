import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { WaypointLogo } from "@/components/brand/waypoint-logo";

// shortcut: mô phỏng kích hoạt từ link mời (FUN_147), chưa nối API thật.
export function DeskActivatePage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  return (
    <div className="flex min-h-screen items-center justify-center p-4" style={{ background: "var(--grad-desk-bg)" }}>
      <Card className="w-full max-w-sm">
        <CardContent className="pt-8">
          <WaypointLogo variant="light" size="md" className="mb-5" />
          <p className="text-sm text-[var(--color-text-secondary)]">
            Bạn được mời tham gia <strong className="text-[var(--color-text-primary)]">Nghiệp đoàn hỗ trợ ABC</strong> với vai trò
            Cán bộ hỗ trợ.
          </p>
          <div className="mt-5 space-y-3">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">Email được mời</label>
              <Input value="canbo@abc-union.jp" disabled />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">Đặt mật khẩu</label>
              <Input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>
          <Button className="mt-5 w-full" disabled={password.length < 6} onClick={() => navigate("/desk")}>
            <ShieldCheck className="h-4 w-4" /> Kích hoạt tài khoản
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
