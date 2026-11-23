// Lớp nền cosmic aurora toàn cục: tạo chiều sâu màu sắc phía sau mọi trang,
// tránh cảm giác "card trắng trên nền trắng". Cố định, không chặn tương tác.
export function AuroraBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[var(--color-background)]">
      <div className="cloud-a absolute -left-24 -top-24 h-[480px] w-[480px] rounded-full bg-[var(--color-primary)]/18 blur-3xl" />
      <div className="cloud-b absolute right-[-10%] top-[8%] h-[420px] w-[420px] rounded-full bg-[var(--color-teal)]/16 blur-3xl" />
      <div
        className="cloud-c absolute bottom-[-12%] left-[18%] h-[440px] w-[440px] rounded-full bg-[var(--color-attention)]/14 blur-3xl"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="cloud-a absolute bottom-[5%] right-[12%] h-[300px] w-[300px] rounded-full bg-[var(--color-gold)]/14 blur-3xl"
        style={{ animationDelay: "5s" }}
      />
    </div>
  );
}
