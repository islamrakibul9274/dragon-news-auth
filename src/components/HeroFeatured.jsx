'use client';

import { useState } from "react";
import Link from "next/link";
import { Sparkles, Clock, ArrowRight, Bookmark, Share2 } from "lucide-react";
import AiBriefingDrawer from "./AiBriefingDrawer";

export default function HeroFeatured({ article }) {
  const [showAiBriefing, setShowAiBriefing] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!article) return null;

  const handleSave = (e) => {
    e.preventDefault();
    try {
      const savedArticles = JSON.parse(localStorage.getItem("dragon_bookmarks") || "[]");
      if (savedArticles.some((a) => a._id === article._id)) {
        const filtered = savedArticles.filter((a) => a._id !== article._id);
        localStorage.setItem("dragon_bookmarks", JSON.stringify(filtered));
        setSaved(false);
      } else {
        savedArticles.push(article);
        localStorage.setItem("dragon_bookmarks", JSON.stringify(savedArticles));
        setSaved(true);
      }
    } catch {
      // storage fallback
    }
  };

  return (
    <>
      <div className="relative bg-gradient-to-b from-gray-900 via-neutral-900 to-black text-white rounded-3xl overflow-hidden shadow-2xl mb-8 border border-neutral-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[440px]">
          {/* Left Text Column */}
          <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 flex flex-col justify-between relative z-10">
            <div>
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <span className="px-3 py-1 rounded-full bg-red-600 text-white font-bold text-xs uppercase tracking-wider shadow-sm">
                  Lead Dispatch
                </span>
                <span className="text-gray-400 text-xs flex items-center gap-1 font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  4 min read
                </span>
                <span className="text-gray-500 text-xs">•</span>
                <span className="text-gray-400 text-xs">
                  {article.author?.published_date || "Today's Edition"}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-4 text-white hover:text-red-400 transition-colors">
                <Link href={`/news/${article._id}`}>{article.title}</Link>
              </h1>

              <p className="text-gray-300 text-sm md:text-base leading-relaxed line-clamp-3 mb-6 font-normal">
                {article.details}
              </p>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-neutral-800">
              <Link
                href={`/news/${article._id}`}
                className="px-6 py-2.5 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-semibold text-sm rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-red-600/30"
              >
                <span>Read Full Story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                onClick={() => setShowAiBriefing(true)}
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 active:scale-95 text-white font-semibold text-sm rounded-xl transition-all flex items-center gap-1.5 backdrop-blur-sm border border-white/10"
              >
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span>⚡ AI 30s Briefing</span>
              </button>

              <button
                onClick={handleSave}
                className={`p-2.5 rounded-xl border transition-all ${
                  saved
                    ? "bg-red-600/20 border-red-500 text-red-400"
                    : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10"
                }`}
                title={saved ? "Remove bookmark" : "Save for later"}
              >
                <Bookmark className="w-4 h-4" fill={saved ? "currentColor" : "none"} />
              </button>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full">
            <img
              src={article.image_url || "/assets/demo-card-thumbnail.png"}
              alt={article.title}
              className="absolute inset-0 w-full h-full object-cover object-center"
              onError={(e) => {
                e.currentTarget.src = "/assets/demo-card-thumbnail.png";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-gray-900 via-gray-900/40 to-transparent" />
          </div>
        </div>
      </div>

      {showAiBriefing && (
        <AiBriefingDrawer
          title={article.title}
          details={article.details}
          category={article.category_id}
          onClose={() => setShowAiBriefing(false)}
        />
      )}
    </>
  );
}
