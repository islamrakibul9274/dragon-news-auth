'use client';

import { useState } from "react";
import { Sparkles, Sun, ChevronRight, Zap, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function MorningDigestAI() {
  const [activeDigest, setActiveDigest] = useState({
    title: "Today's 5-Minute Executive Morning Pulse",
    date: new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" }),
    points: [
      {
        tag: "GEOPOLITICS",
        headline: "Global diplomatic shifts accelerate across emerging energy alliances",
        snippet: "Key defense pacts and supply-chain recalibrations point to restructured transatlantic trade flows.",
      },
      {
        tag: "TECHNOLOGY",
        headline: "Breakthrough autonomous reasoning models show 40% efficiency leaps",
        snippet: "Enterprise adoption surges as next-gen subagent workflows begin automating enterprise operations.",
      },
      {
        tag: "MARKETS",
        headline: "Central banks signal steady interest rate holds amid cooling inflation prints",
        snippet: "Venture debt and public equity markets react with renewed liquidity in high-growth infrastructure.",
      },
    ],
  });

  const [loading, setLoading] = useState(false);

  const handleRefresh = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ai/newsletter-builder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: "Top global headlines in technology, policy, and business today" }),
      });
      const data = await res.json();
      if (data?.edition?.quickBites) {
        setActiveDigest({
          title: data.edition.headline || "Fresh AI Intelligence Dispatch",
          date: new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" }),
          points: data.edition.quickBites.map((b, i) => ({
            tag: i === 0 ? "AI LEAD" : i === 1 ? "POLICY" : "MARKETS",
            headline: b.title,
            snippet: b.detail,
          })),
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-amber-500/10 via-red-500/5 to-purple-500/10 border border-amber-500/20 rounded-2xl p-5 md:p-6 mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-amber-500/15">
        <div className="flex items-center gap-2.5">
          <span className="p-2 bg-amber-500 text-white rounded-xl shadow-xs">
            <Sun className="w-4 h-4" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                Morning Intelligence
              </span>
              <span className="text-[11px] text-gray-500 font-medium">
                • {activeDigest.date}
              </span>
            </div>
            <h3 className="font-bold text-gray-900 text-base">
              {activeDigest.title}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-all flex items-center gap-1.5 shadow-2xs"
            title="Generate fresh AI synthesis"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-amber-600 ${loading ? "animate-spin" : ""}`} />
            <span>{loading ? "Synthesizing..." : "Refresh Pulse"}</span>
          </button>

          <Link
            href="/studio"
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white transition-all flex items-center gap-1 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">AI Studio</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
        {activeDigest.points.map((item, idx) => (
          <div
            key={idx}
            className="p-3.5 bg-white/80 backdrop-blur-xs border border-amber-500/10 rounded-xl hover:shadow-md transition-shadow"
          >
            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold tracking-wider text-amber-800 bg-amber-100 mb-2">
              {item.tag}
            </span>
            <h4 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2 mb-1.5">
              {item.headline}
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
              {item.snippet}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
