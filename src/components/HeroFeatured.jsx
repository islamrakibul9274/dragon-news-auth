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
      <div className="bg-white text-gray-950 rounded-3xl overflow-hidden shadow-xl border-2 border-gray-200/80 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left Text Column */}
          <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <span className="px-3 py-1 rounded-full bg-red-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-sm">
                  Lead Dispatch of the Day
                </span>
                <span className="text-gray-600 text-xs flex items-center gap-1 font-semibold">
                  <Clock className="w-3.5 h-3.5 text-gray-500" />
                  4 min read
                </span>
                <span className="text-gray-300 text-xs">•</span>
                <span className="text-gray-500 text-xs font-medium">
                  {article.author?.published_date || "Today's Edition"}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-serif tracking-tight leading-tight mb-4 text-gray-950 hover:text-red-600 transition-colors">
                <Link href={`/news/${article._id}`}>{article.title}</Link>
              </h2>

              <p className="text-gray-700 text-sm sm:text-base leading-relaxed line-clamp-3 mb-6 font-normal">
                {article.details}
              </p>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-gray-150">
              <Link
                href={`/news/${article._id}`}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold text-sm rounded-2xl transition-all flex items-center gap-2 shadow-lg shadow-red-600/30"
              >
                <span>Read Full Story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                onClick={() => setShowAiBriefing(true)}
                className="px-4 py-3 bg-amber-100 hover:bg-amber-200 active:scale-95 text-amber-900 font-bold text-sm rounded-2xl transition-all flex items-center gap-1.5 border border-amber-300 shadow-2xs"
              >
                <Sparkles className="w-4 h-4 text-amber-700" />
                <span>⚡ AI 30s Briefing</span>
              </button>

              <button
                onClick={handleSave}
                className={`p-3 rounded-2xl border transition-all ${
                  saved
                    ? "bg-red-50 border-red-400 text-red-600"
                    : "bg-gray-100 border-gray-200 text-gray-600 hover:text-black hover:bg-gray-200"
                }`}
                title={saved ? "Remove bookmark" : "Save for later"}
              >
                <Bookmark className="w-4 h-4" fill={saved ? "currentColor" : "none"} />
              </button>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full bg-gray-100">
            <img
              src={article.image_url || "/assets/demo-card-thumbnail.png"}
              alt={article.title}
              className="w-full h-full object-cover object-center"
              onError={(e) => {
                e.currentTarget.src = "/assets/demo-card-thumbnail.png";
              }}
            />
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
