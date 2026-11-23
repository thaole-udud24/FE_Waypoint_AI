import { useState } from "react";
import { Send, Bot, User, ScrollText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/domain/page-header";
import { useLanguage, pick, type Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type Tri = Record<Lang, string>;

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: Tri;
  sources?: Tri[];
}

// shortcut: hội thoại mẫu, thay bằng gọi MOD_009 API (rights agent) khi backend sẵn sàng.
const initialMessages: ChatMessage[] = [
  {
    id: "m1",
    role: "assistant",
    text: {
      vi: "Chào bạn, mình là trợ lý quyền lợi lao động. Bạn muốn hỏi gì về lương, giờ làm hay hợp đồng?",
      en: "Hi, I'm your labor rights assistant. What would you like to ask about pay, hours or your contract?",
      ja: "こんにちは。労働者の権利に関するアシスタントです。給与・勤務時間・契約について何でもお聞きください。",
    },
  },
  {
    id: "m2",
    role: "user",
    text: {
      vi: "Làm thêm giờ ban đêm được tính phụ trội bao nhiêu %?",
      en: "What percentage premium applies to night overtime?",
      ja: "深夜残業の割増率は何%ですか？",
    },
  },
  {
    id: "m3",
    role: "assistant",
    text: {
      vi: "Theo Law Pack VN→JP v2026.10, giờ làm thêm ban đêm (22h–5h) được tính tối thiểu 135% lương giờ thường, cao hơn mức 125% áp dụng cho giờ làm thêm ban ngày.",
      en: "Per Law Pack VN→JP v2026.10, night overtime (10pm–5am) is paid at a minimum of 135% of the regular hourly rate, higher than the 125% that applies to daytime overtime.",
      ja: "Law Pack VN→JP v2026.10によると、深夜残業（22時〜5時）は通常賃金の最低135%で計算され、日中残業に適用される125%より高くなります。",
    },
    sources: [
      { vi: "Law Pack VN→JP v2026.10 · Điều 37", en: "Law Pack VN→JP v2026.10 · Article 37", ja: "Law Pack VN→JP v2026.10・第37条" },
      { vi: "Hợp đồng lao động của bạn · Mục phụ trội", en: "Your employment contract · Premium pay section", ja: "あなたの雇用契約・割増賃金の項目" },
    ],
  },
];

const t = {
  placeholder: { vi: "Nhập câu hỏi về quyền lợi của bạn...", en: "Type your labor rights question...", ja: "労働者の権利に関する質問を入力..." },
  demoReply: {
    vi: "Mình đã ghi nhận câu hỏi của bạn. Đây là bản mô phỏng giao diện — câu trả lời thật sẽ được tạo từ Law Pack khi kết nối backend.",
    en: "Got your question. This is a UI mockup — real answers will be generated from the Law Pack once connected to a backend.",
    ja: "ご質問を受け付けました。これはUIのモックアップです — バックエンド接続後、Law Packに基づく実際の回答が生成されます。",
  },
};

export function RightsAgentPage() {
  const { lang } = useLanguage();
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");

  function handleSend() {
    if (!input.trim()) return;
    const typed = input.trim();
    const userMsg: ChatMessage = { id: `u-${Date.now()}`, role: "user", text: { vi: typed, en: typed, ja: typed } };
    const reply: ChatMessage = { id: `a-${Date.now()}`, role: "assistant", text: t.demoReply };
    setMessages((prev) => [...prev, userMsg, reply]);
    setInput("");
  }

  return (
    <div className="flex h-[calc(100vh-7.5rem)] flex-col gap-4">
      <PageHeader
        title="Hỏi đáp quyền lợi"
        kanji="相談"
        subtitle="Hỏi về quyền lợi lao động — câu trả lời dựa trên Law Pack và hợp đồng của bạn."
      />

      <Card className="flex flex-1 flex-col overflow-hidden">
        <CardContent className="flex-1 space-y-4 overflow-y-auto pt-6">
          {messages.map((m) => (
            <div key={m.id} className={cn("flex items-start gap-3", m.role === "user" && "flex-row-reverse")}>
              <div
                className={cn(
                  "rounded-full p-2",
                  m.role === "assistant" ? "bg-[var(--color-primary-light)]" : "bg-[var(--color-surface-secondary)]"
                )}
              >
                {m.role === "assistant" ? (
                  <Bot className="h-4 w-4 text-[var(--color-primary-dark)]" />
                ) : (
                  <User className="h-4 w-4 text-[var(--color-text-secondary)]" />
                )}
              </div>
              <div
                className={cn(
                  "max-w-[80%] rounded-[var(--radius-card)] px-4 py-2.5 text-sm",
                  m.role === "assistant"
                    ? "bg-[var(--color-surface-secondary)] text-[var(--color-text-primary)]"
                    : "bg-[var(--color-primary)] text-white"
                )}
              >
                <p>{pick(m.text, lang, m.text.vi)}</p>
                {m.sources && (
                  <div className="mt-2 space-y-1 border-t border-[var(--color-border)]/50 pt-2">
                    {m.sources.map((s) => (
                      <p key={s.vi} className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)]">
                        <ScrollText className="h-3 w-3" /> {pick(s, lang, s.vi)}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </CardContent>
        <div className="flex items-center gap-2 border-t border-[var(--color-border)] p-3">
          <Input
            placeholder={pick(t.placeholder, lang, t.placeholder.vi)}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <Button onClick={handleSend} disabled={!input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
