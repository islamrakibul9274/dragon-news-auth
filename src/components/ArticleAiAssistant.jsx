'use client';

import { useState } from "react";
import { Sparkles, Send, Loader2, Bot, ChevronDown, ChevronUp } from "lucide-react";

export default function ArticleAiAssistant({ articleTitle, articleContent }) {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const quickQuestions = [
    "Explain this simply in 2 sentences",
    "What are the main consequences?",
    "Who are the key figures involved?",
  ];

  const handleAsk = async (queryText) => {
    const q = queryText || question;
    if (!q.trim()) return;

    const userMsg = { role: "user", text: q };
    setMessages((prev) => [...prev, userMsg]);
    setQuestion("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: q,
          articleTitle,
          articleContent,
        }),
      });

      const data = await res.json();
      if (data.answer) {
        setMessages((prev) => [...prev, { role: "assistant", text: data.answer }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", text: "Unable to answer right now. Please try again." },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Error contacting AI assistant." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-8 border border-red-500/20 bg-gradient-to-br from-red-50/40 via-white to-amber-50/30 rounded-2xl p-5 shadow-xs">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between cursor-pointer"
      >
        <div className="flex items-center gap-2.5">
          <span className="p-1.5 bg-red-600 text-white rounded-lg">
            <Sparkles className="w-4 h-4" />
          </span>
          <div>
            <h4 className="font-bold text-gray-900 text-sm">
              Ask Dragon AI Companion
            </h4>
            <p className="text-xs text-gray-500">
              Instant contextual answers on this story powered by Groq
            </p>
          </div>
        </div>

        <button className="p-1 text-gray-400 hover:text-gray-600">
          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      {isOpen && (
        <div className="mt-4 pt-4 border-t border-red-500/10 space-y-4">
          {/* Quick Questions */}
          <div className="flex flex-wrap gap-1.5">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleAsk(q)}
                disabled={loading}
                className="text-xs px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-gray-700 hover:border-red-400 hover:text-red-600 transition-colors shadow-2xs font-medium"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Conversation history */}
          {messages.length > 0 && (
            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-xl text-xs leading-relaxed ${
                    msg.role === "user"
                      ? "bg-gray-100 text-gray-900 ml-8 font-medium"
                      : "bg-white border border-red-100 text-gray-800 mr-4 shadow-2xs"
                  }`}
                >
                  <span className="font-bold uppercase tracking-wider text-[10px] text-gray-400 block mb-1">
                    {msg.role === "user" ? "You" : "Dragon AI"}
                  </span>
                  <div className="whitespace-pre-line">{msg.text}</div>
                </div>
              ))}
            </div>
          )}

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAsk();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask anything about this story..."
              className="flex-1 px-3.5 py-2.5 bg-white border border-gray-300 rounded-xl text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              type="submit"
              disabled={loading || !question.trim()}
              className="px-4 py-2.5 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-semibold text-xs rounded-xl transition-all disabled:opacity-50 flex items-center gap-1.5"
            >
              {loading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Send className="w-3.5 h-3.5" />
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
