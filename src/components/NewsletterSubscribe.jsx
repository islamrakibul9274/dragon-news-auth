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
            colors: ["#dc2626", "#ea580c", "#f59e0b", "#10b981"],
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
      <div
        className={`bg-gradient-to-r from-red-50/90 via-white to-amber-50/70 text-gray-900 p-8 md:p-10 rounded-3xl border-2 border-red-200/80 shadow-xl shadow-red-500/5 relative overflow-hidden ${className}`}
      >
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-red-600" />
              The Daily Intelligence Dispatch
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black font-serif tracking-tight text-gray-950">
              Start your morning 5 minutes smarter.
            </h3>
            <p className="text-gray-600 text-sm sm:text-base mt-2 leading-relaxed">
              Curated investigative briefings, AI executive summaries, and global market signals delivered daily to your inbox.
            </p>
          </div>

          <div className="w-full md:w-auto min-w-[340px]">
            {status === "success" ? (
              <div className="flex items-center gap-2.5 p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-800 text-sm font-semibold">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-600" />
                <span>{message}</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-1">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full pl-10 pr-4 py-3.5 bg-white border-2 border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-red-600 shadow-xs transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="px-7 py-3.5 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold text-sm rounded-2xl transition-all flex items-center justify-center gap-2 disabled:opacity-60 shadow-lg shadow-red-600/30"
                >
                  {status === "loading" ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>Join Dispatch</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
            {status === "error" && (
              <p className="text-xs text-red-600 mt-2 font-medium">{message}</p>
            )}
            <p className="text-[11px] text-gray-500 mt-2 text-center md:text-left">
              ✓ Free forever • ✓ 1-click unsubscribe • Over 48,000 readers
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`p-6 bg-gradient-to-br from-red-50/70 via-white to-amber-50/50 text-gray-900 rounded-3xl border-2 border-red-200/80 shadow-lg shadow-red-500/5 relative overflow-hidden ${className}`}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
          <span className="text-xs uppercase font-extrabold tracking-wider text-red-600">
            Free Daily Newsletter
          </span>
        </div>

        <h3 className="text-xl font-black font-serif tracking-tight text-gray-950 mb-1.5">
          The Dragon Dispatch
        </h3>
        <p className="text-xs text-gray-600 leading-relaxed mb-4">
          Join 48,000+ founders, analysts, and leaders receiving our curated 5-minute morning briefing.
        </p>

        {status === "success" ? (
          <div className="flex items-center gap-2 p-3.5 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-800 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600" />
            <span>{message}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-2.5">
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@work.com"
                required
                className="w-full pl-10 pr-3 py-3 bg-white border-2 border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 text-xs focus:outline-none focus:border-red-600 shadow-2xs transition-all font-medium"
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-3 bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white font-bold text-xs rounded-2xl transition-all flex items-center justify-center gap-1.5 shadow-md shadow-red-600/25"
            >
              {status === "loading" ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <>
                  <span>Join The Dispatch Free</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="text-[11px] text-red-600 mt-2 font-medium">{message}</p>
        )}

        <div className="mt-4 pt-3 border-t border-gray-200/80 flex items-center justify-between text-[11px] text-gray-500 font-medium">
          <span>✓ Free forever</span>
          <span>✓ 1-click unsubscribe</span>
        </div>
      </div>
    </div>
  );
}
