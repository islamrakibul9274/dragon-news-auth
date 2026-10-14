'use client';

import { useState } from "react";
import Link from "next/link";
import { Sparkles, Clock, ArrowRight, Bookmark } from "lucide-react";
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
      <div className="relative rounded-3xl overflow-hidden shadow-xl border-2 border-gray-200/80 mb-8 min-h-[460px] md:min-h-[500px] flex flex-col justify-start group">
        {/* Background Image Overlay spanning the whole section */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={article.image_url || "/assets/demo-card-thumbnail.png"}
            alt={article.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            onError={(e) => {
              e.currentTarget.src = "/assets/demo-card-thumbnail.png";
            }}
          />
          {/* Lighter, balanced gradient: keeps the image clearly visible while providing contrast for upper text */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/35 to-black/10" />
        </div>

        {/* Text and Controls in the Upper Portion */}
        <div className="relative z-10 p-6 sm:p-8 md:p-10 flex flex-col justify-start max-w-4xl">
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3 py-1 rounded-full bg-red-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-md">
              Lead Dispatch of the Day
            </span>
            <span className="text-white text-xs flex items-center gap-1.5 font-semibold bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 shadow-sm">
              <Clock className="w-3.5 h-3.5 text-red-400" />
              4 min read
            </span>
            <span className="text-white/60 text-xs">•</span>
            <span className="text-white/90 text-xs font-semibold drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
              {article.author?.published_date || "Today's Edition"}
            </span>
          </div>

          {/* Headline with drop shadow for razor-sharp legibility over the image */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[38px] font-black font-serif tracking-tight leading-tight mb-4 text-white hover:text-red-400 transition-colors drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            <Link href={`/news/${article._id}`}>{article.title}</Link>
          </h2>

          {/* Excerpt Summary */}
          <p className="text-white/95 text-sm sm:text-base leading-relaxed line-clamp-3 mb-6 font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.95)] max-w-3xl">
            {article.details}
          </p>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href={`/news/${article._id}`}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold text-sm rounded-2xl transition-all flex items-center gap-2 shadow-lg shadow-red-600/40"
            >
              <span>Read Full Story</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => setShowAiBriefing(true)}
              className="px-4 py-3 bg-black/60 hover:bg-black/80 active:scale-95 text-white font-bold text-sm rounded-2xl backdrop-blur-md transition-all flex items-center gap-1.5 border border-white/25 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>⚡ AI 30s Briefing</span>
            </button>

            <button
              onClick={handleSave}
              className={`p-3 rounded-2xl border backdrop-blur-md transition-all shadow-md ${
                saved
                  ? "bg-red-600 border-red-500 text-white"
                  : "bg-black/60 border-white/25 text-white hover:bg-black/80"
              }`}
              title={saved ? "Remove bookmark" : "Save for later"}
            >
              <Bookmark className="w-4 h-4" fill={saved ? "currentColor" : "none"} />
            </button>
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
