"use client";

import { useState, useRef, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { track } from "@/lib/track";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const GREETING = "Hi! I'm the Zoyare assistant. Have a question about our services or want to know if Zoyare is the right fit for your project?";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: GREETING },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!res.ok || !res.body) throw new Error("Error fetching response.");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: updated[updated.length - 1].content + chunk,
          };
          return updated;
        });
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: "Something went wrong. Send an email to hello@zoyare.com.",
        };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <m.button
        onClick={() => {
          if (!open) track("chat_opened");
          setOpen((v) => !v);
        }}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-accent text-white flex items-center justify-center shadow-lg hover:bg-primary hover:text-background transition-colors duration-200"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <m.span
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.15 }}
              className="text-lg font-bold leading-none"
            >
              ×
            </m.span>
          ) : (
            <m.svg
              key="chat"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              width="20" height="20" viewBox="0 0 20 20" fill="none"
            >
              <path
                d="M2 3h16v11H11l-4 3v-3H2V3z"
                stroke="currentColor" strokeWidth="1.5"
                strokeLinejoin="round" fill="none"
              />
            </m.svg>
          )}
        </AnimatePresence>
      </m.button>

      <AnimatePresence>
        {open && (
          <m.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-20 right-4 left-4 sm:left-auto sm:right-6 sm:w-80 md:w-96 z-50 bg-background border border-border shadow-2xl flex flex-col"
            style={{ maxHeight: "480px" }}
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
              <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-primary">Zoyare Assistant</p>
                <p className="font-mono text-xs text-muted tracking-widest uppercase">Online</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] text-sm leading-relaxed px-3 py-2 ${
                      msg.role === "user"
                        ? "bg-accent text-white"
                        : "bg-surface text-primary border border-border"
                    }`}
                  >
                    {msg.content || (
                      <span className="flex gap-1 items-center py-0.5">
                        <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </span>
                    )}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            <div className="border-t border-border px-4 py-3 flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
                placeholder="Ask a question…"
                disabled={loading}
                aria-label="Message to Zoyare assistant"
                className="flex-1 bg-transparent text-sm text-primary placeholder:text-muted focus-visible:outline-none disabled:opacity-50"
              />
              <button
                onClick={send}
                disabled={loading || !input.trim()}
                aria-label="Send message"
                className="text-accent hover:text-primary transition-colors duration-200 disabled:opacity-30 flex-shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-sm"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M2 9h14M9 2l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
                </svg>
              </button>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
