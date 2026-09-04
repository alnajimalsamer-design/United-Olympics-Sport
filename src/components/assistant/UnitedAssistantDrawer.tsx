import React, { useState } from "react";

export const UnitedAssistantDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: "user" | "assistant"; textEn: string; textAr?: string }>>([
    {
      sender: "assistant",
      textEn: "Welcome to United Olympics Sports. I am your system assistant. How can I guide you today?",
      textAr: "السلام عليكم 👋 أهلاً بك في يونايتد أوليمبيكس سبورت. كيف يمكنني مساعدتك اليوم؟"
    }
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setMessages((prev) => [...prev, { sender: "user", textEn: userMsg }]);
    setInput("");

    // Safe contextual fallbacks response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "assistant",
          textEn: `Navigating request: "${userMsg}". Official modules can be safely accessed through your portal control bar.`,
          textAr: `طلبك قيد المعالجة. يمكنك الوصول إلى الأقسام الرسمية عبر شريط التحكم الخاص ببوابتك.`
        }
      ]);
    }, 600);
  };

  return (
    <>
      {/* Floating Tactical Orb Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open United Assistant"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full bg-[var(--glass-l4-bg)] border border-[var(--color-gold-500)]/40 shadow-[0_0_25px_rgba(212,175,55,0.25)] backdrop-blur-[16px] hover:scale-105 active:scale-95 transition-all duration-[var(--transition-fast)] group cursor-pointer"
      >
        <div className="w-3 h-3 rounded-full bg-[var(--color-gold-500)] animate-pulse" />
        <span className="text-xs font-bold text-[var(--color-pure-white)] group-hover:text-[var(--color-gold-400)]">
          United Assistant
        </span>
      </button>

      {/* Floating Glass Assistant Drawer Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md h-full bg-[var(--glass-l4-bg)] border-l border-[var(--glass-l4-border)] backdrop-blur-[24px] p-6 flex flex-col justify-between shadow-[var(--glass-l4-shadow)] animate-in slide-in-from-right duration-300">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[var(--glass-l1-border)]">
              <div className="flex items-center gap-2">
                <img
                  src="/brand/united-olympics-sports-logo.png"
                  alt="UOS"
                  className="h-6 w-auto"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/public/brand/united-olympics-sports-logo.png';
                  }}
                />
                <div>
                  <h3 className="text-sm font-bold text-[var(--color-pure-white)]">United Assistant</h3>
                  <p className="text-[10px] text-[var(--color-gold-400)] font-arabic dir-rtl">مساعد يونايتد</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-[var(--color-text-tertiary)] hover:text-white text-lg font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Conversation Area */}
            <div className="flex-1 overflow-y-auto my-4 space-y-4 pr-1">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-[var(--radius-md)] text-xs leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-[var(--color-gold-500)]/15 border border-[var(--color-gold-500)]/30 text-[var(--color-pure-white)] ml-8"
                      : "bg-[var(--glass-l1-bg)] border border-[var(--glass-l1-border)] text-[var(--color-text-primary)] mr-8"
                  }`}
                >
                  <div>{msg.textEn}</div>
                  {msg.textAr && (
                    <div className="font-arabic dir-rtl mt-2 pt-2 border-t border-white/10 text-[var(--color-gold-300)]">
                      {msg.textAr}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Input Composer Form */}
            <form onSubmit={handleSend} className="pt-3 border-t border-[var(--glass-l1-border)] flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask United Assistant / اسأل مساعد يونايتد..."
                className="flex-1 h-11 px-3.5 rounded-[var(--radius-md)] bg-[var(--glass-l1-bg)] border border-[var(--glass-l1-border)] text-xs text-white placeholder:text-[var(--color-text-tertiary)] focus:outline-none focus:border-[var(--color-gold-500)]"
              />
              <button
                type="submit"
                className="px-4 h-11 rounded-[var(--radius-md)] bg-[var(--color-gold-500)] text-[var(--color-obsidian-950)] font-bold text-xs hover:brightness-110 cursor-pointer"
              >
                Send
              </button>
            </form>

          </div>
        </div>
      )}
    </>
  );
};
