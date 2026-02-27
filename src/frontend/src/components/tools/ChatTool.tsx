import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Trash2 } from "lucide-react";
import { generateChatResponse } from "@/utils/aiGenerators";
import { useSaveHistory } from "@/hooks/useQueries";
import { toast } from "sonner";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export function ChatTool() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Namaste! 👋 I'm your AI assistant. Ask me anything in English or Hindi — I'm here to help!\n\nनमस्ते! मैं आपकी AI सहायक हूँ। आप मुझसे हिंदी या अंग्रेजी में कुछ भी पूछ सकते हैं!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const saveHistory = useSaveHistory();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isTyping) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    await new Promise((res) => setTimeout(res, 900 + Math.random() * 600));

    const response = generateChatResponse(text);
    const aiMsg: Message = {
      id: `ai-${Date.now()}`,
      role: "assistant",
      content: response,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, aiMsg]);
    setIsTyping(false);

    saveHistory.mutate({ toolType: "chat", input: text, output: response });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: "welcome-new",
        role: "assistant",
        content: "Chat cleared! Start a new conversation. 🆕\n\nचैट साफ हो गई! नई बातचीत शुरू करें।",
        timestamp: new Date(),
      },
    ]);
    toast.success("Chat cleared");
  };

  return (
    <div className="flex flex-col h-full min-h-[560px] max-h-[calc(100vh-280px)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-border/60">
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-tool-chat animate-pulse" />
          <span className="tool-section-label">
            {messages.length - 1} message{messages.length !== 2 ? "s" : ""}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearChat}
          className="text-muted-foreground hover:text-destructive gap-1.5 h-7 text-xs"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Clear
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 pr-3 mb-4">
        <div className="space-y-3">
          {messages.map((msg, idx) => (
            <div
              key={msg.id}
              className="flex gap-3 animate-slide-up"
              style={{ animationDelay: `${Math.min(idx * 0.04, 0.25)}s` }}
            >
              {/* Avatar */}
              <div
                className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center mt-1 ${
                  msg.role === "assistant"
                    ? "bg-tool-chat/15 border border-tool-chat/25"
                    : "bg-accent border border-border"
                }`}
              >
                {msg.role === "assistant" ? (
                  <Bot className="w-3.5 h-3.5 text-tool-chat" />
                ) : (
                  <User className="w-3.5 h-3.5 text-muted-foreground" />
                )}
              </div>

              {/* Bubble */}
              <div className="flex-1 min-w-0">
                <div
                  className={`rounded-xl px-3.5 py-2.5 text-[0.84rem] leading-relaxed whitespace-pre-wrap break-words ${
                    msg.role === "assistant"
                      ? "bg-secondary/80 text-foreground border border-border/40"
                      : "bg-tool-chat/15 border border-tool-chat/25 text-foreground"
                  }`}
                >
                  {msg.content}
                </div>
                <p className="text-[0.68rem] text-muted-foreground/60 mt-1 ml-1.5 tabular-nums">
                  {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-full bg-tool-chat/15 border border-tool-chat/25 flex items-center justify-center shrink-0 mt-1">
                <Bot className="w-3.5 h-3.5 text-tool-chat" />
              </div>
              <div className="bg-secondary/80 border border-border/40 rounded-xl px-3.5 py-2.5 flex items-center">
                <div className="flex gap-1 items-center h-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-tool-chat typing-dot" />
                  <div className="w-1.5 h-1.5 rounded-full bg-tool-chat typing-dot" />
                  <div className="w-1.5 h-1.5 rounded-full bg-tool-chat typing-dot" />
                </div>
              </div>
            </div>
          )}
        </div>
        <div ref={bottomRef} />
      </ScrollArea>

      {/* Input area */}
      <div className="flex gap-2.5 pt-3.5 border-t border-border/60">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message... / कुछ पूछें..."
          className="min-h-[48px] max-h-[120px] resize-none bg-secondary/80 border-border/60 text-foreground placeholder:text-muted-foreground/50 focus-visible:ring-1 focus-visible:ring-tool-chat/60 rounded-xl text-sm"
          disabled={isTyping}
        />
        <Button
          onClick={handleSend}
          disabled={!input.trim() || isTyping}
          className="h-[48px] w-[48px] rounded-xl bg-tool-chat hover:bg-tool-chat/80 text-white shrink-0 p-0 transition-all hover:shadow-[0_0_16px_oklch(0.63_0.21_258/0.4)]"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
      <p className="tool-section-label text-center mt-2 opacity-60">
        Enter to send · Shift+Enter for new line
      </p>
    </div>
  );
}
