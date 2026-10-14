'use client';

import { useState } from "react";
import { Sparkles, Loader2, Volume2, VolumeX, X, Check, Share2 } from "lucide-react";

export default function AiBriefingDrawer({
  title,
  details,
  category,
  onClose,
}) {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);

  const fetchSummary = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/ai/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, details, category }),
      });

      const data = await res.json();
      if (data.summary) {
        setSummary(data.summary);
      } else if (data.fallback) {
        setSummary(data.fallback);
      } else {
        setError("Could not generate summary.");
      }
    } catch {
      setError("AI generation failed.");
    } finally {
      setLoading(false);
    }
  };

  // Run automatically on open
  useState(() => {
    fetchSummary();
  });

  // Browser Text-To-Speech Audio Narration
  const handlePlayAudio = () => {
    if (typeof window === "undefined" || !('speechSynthesis' in window)) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    const textToSpeak = summary
      ? `${summary.oneLiner}. Key takeaways: ${summary.keyTakeaways?.join(". ")}. Why it matters: ${summary.whyItMatters}`
      : `${title}. ${details?.slice(0, 300)}`;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  const handleCopy = () => {
    if (!summary) return;
    const shareText = `⚡ AI Briefing: ${title}\n\n${summary.oneLiner}\n\nKey Takeaways:\n${summary.keyTakeaways?.map(k => `• ${k}`).join("\n")}\n\nVia The Dragon Dispatch`;
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-red-50 via-white to-gray-50">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-red-600 text-white rounded-lg shadow-sm">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <h3 className="font-bold text-gray-900 text-base leading-tight">
                AI Executive Briefing
              </h3>
              <p className="text-[11px] text-gray-500 font-medium">
                Synthesized in ~250ms by Groq Llama/Qwen Intelligence
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handlePlayAudio}
              className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isPlaying
                  ? "bg-red-600 text-white shadow-sm"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
              title="Listen to audio briefing"
            >
              {isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{isPlaying ? "Stop" : "Listen"}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {loading ? (
            <div className="py-12 flex flex-col items-center justify-center gap-3 text-center">
              <Loader2 className="w-8 h-8 text-red-600 animate-spin" />
              <p className="text-sm font-semibold text-gray-800">
                Synthesizing story with Groq AI...
              </p>
              <p className="text-xs text-gray-400 max-w-xs">
                Extracting key facts, geopolitical context, and executive implications.
              </p>
            </div>
          ) : error ? (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm">
              {error}
            </div>
          ) : summary ? (
            <div className="space-y-5">
              {/* One-Liner */}
              <div className="p-4 bg-red-50/60 border border-red-100 rounded-xl">
                <span className="text-[10px] uppercase font-bold tracking-wider text-red-600 block mb-1">
                  The Bottom Line
                </span>
                <p className="text-base font-semibold text-gray-900 leading-snug">
                  {summary.oneLiner}
                </p>
              </div>

              {/* Key Takeaways */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Key Takeaways
                </h4>
                <ul className="space-y-2.5">
                  {summary.keyTakeaways?.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-2 flex-shrink-0" />
                      <span className="leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Why It Matters */}
              {summary.whyItMatters && (
                <div className="pt-3 border-t border-gray-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                    Why It Matters
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {summary.whyItMatters}
                  </p>
                </div>
              )}
            </div>
          ) : null}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-gray-50 border-t border-gray-100 text-xs text-gray-500">
          <span>Curated for quick decision-makers</span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors font-medium"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Share Briefing"}</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-black transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
