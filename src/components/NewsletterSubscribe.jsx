'use client';

import { useState } from "react";
import confetti from "canvas-confetti";
import { Mail, CheckCircle2, Sparkles, Loader2, ArrowRight } from "lucide-react";

export default function NewsletterSubscribe({
  variant = "card", // "card" | "inline" | "banner"
  className = "",
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // "idle" | "loading" | "success" | "error"
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setMessage(data.message || "Welcome! Check your inbox.");
        try {
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.7 },
            colors: ["#dc2626", "#111827", "#f59e0b", "#10b981"],
          });
        } catch {
          // confetti fallback
        }
      } else {
        setStatus("error");
        setMessage(data.error || "Subscription failed. Please retry.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  };

  if (variant === "banner") {
    return (
      <div className={`bg-neutral-900 text-white p-6 md:p-8 rounded-2xl relative overflow-hidden shadow-xl ${className}`}>
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              The Daily Intelligence Dispatch
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Start your morning 5 minutes smarter.
            </h3>
            <p className="text-gray-400 text-sm mt-2">
              Curated investigative briefings, AI executive summaries, and global market signals delivered daily.
            </p>
          </div>

          <div className="w-full md:w-auto min-w-[320px]">
            {status === "success" ? (
              <div className="flex items-center gap-2 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm font-medium">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <span>{message}</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-60 shadow-lg shadow-red-600/30"
                >
                  {status === "loading" ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
            {status === "error" && (
              <p className="text-xs text-red-400 mt-2">{message}</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-6 bg-gradient-to-br from-neutral-900 to-neutral-950 text-white rounded-2xl border border-neutral-800 shadow-xl relative overflow-hidden ${className}`}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/20 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          <span className="text-xs uppercase font-bold tracking-wider text-red-400">
            Free Daily Newsletter
          </span>
        </div>

        <h3 className="text-xl font-bold tracking-tight text-white mb-2">
          The Dragon Dispatch
        </h3>
        <p className="text-xs text-gray-400 leading-relaxed mb-4">
          Join 48,000+ founders, analysts, and leaders receiving our 5-minute morning briefing.
        </p>

        {status === "success" ? (
          <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs font-medium">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{message}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-2">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@work.com"
                required
                className="w-full pl-9 pr-3 py-2.5 bg-neutral-800/80 border border-neutral-700/80 rounded-xl text-white placeholder-gray-500 text-xs focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-2.5 bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md shadow-red-600/25"
            >
              {status === "loading" ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <>
                  <span>Join The Dispatch</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="text-[11px] text-red-400 mt-1.5">{message}</p>
        )}

        <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-gray-500">
          <span>✓ Free forever</span>
          <span>✓ 1-click unsubscribe</span>
        </div>
      </div>
    </div>
  );
}
