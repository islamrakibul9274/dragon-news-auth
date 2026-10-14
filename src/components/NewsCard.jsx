'use client';

import { useState } from "react";
import { FaRegEye, FaStar } from "react-icons/fa";
import { Sparkles, Bookmark, Clock, ArrowRight, Share2 } from "lucide-react";
import Link from "next/link";
import AiBriefingDrawer from "./AiBriefingDrawer";

const NewsCard = ({ news = {} }) => {
  const [showAi, setShowAi] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const authorName = news?.author?.name || "Anonymous";
  const authorDate = news?.author?.published_date || "";
  const authorImg = news?.author?.img || "/assets/user.png";
  const title = news?.title || "Untitled Article";
  const imageUrl = news?.image_url || "/assets/demo-card-thumbnail.png";
  const details = news?.details || "";
  const ratingNumber = news?.rating?.number || 4.5;
  const totalView = news?.total_view || 120;
  const newsId = news?._id || "";

  const readTime = Math.max(2, Math.ceil((details?.length || 400) / 350));

  const toggleBookmark = (e) => {
    e.preventDefault();
    try {
      const saved = JSON.parse(localStorage.getItem("dragon_bookmarks") || "[]");
      if (saved.some((item) => item._id === newsId)) {
        const filtered = saved.filter((item) => item._id !== newsId);
        localStorage.setItem("dragon_bookmarks", JSON.stringify(filtered));
        setIsBookmarked(false);
      } else {
        saved.push(news);
        localStorage.setItem("dragon_bookmarks", JSON.stringify(saved));
        setIsBookmarked(true);
      }
    } catch {
      // storage
    }
  };

  return (
    <>
      <div className="group bg-white rounded-2xl border border-gray-150 hover:border-gray-300 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between mb-5">
        <div>
          {/* Card Top / Author */}
          <div className="flex items-center justify-between p-4 bg-gray-50/70 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <img
                src={authorImg}
                alt={authorName}
                className="w-9 h-9 rounded-full object-cover border border-gray-200"
                onError={(e) => {
                  e.currentTarget.src = "/assets/user.png";
                }}
              />
              <div>
                <h4 className="font-semibold text-gray-900 text-xs">{authorName}</h4>
                <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                  <span>{authorDate || "Today"}</span>
                  <span>•</span>
                  <span className="flex items-center gap-0.5">
                    <Clock className="w-3 h-3" />
                    {readTime}m read
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowAi(true)}
                className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 text-xs font-semibold flex items-center gap-1 transition-colors"
                title="Instant AI Executive Summary"
              >
                <Sparkles className="w-3 h-3 text-amber-600" />
                <span className="hidden sm:inline">AI Brief</span>
              </button>

              <button
                onClick={toggleBookmark}
                className={`p-1.5 rounded-lg transition-colors ${
                  isBookmarked
                    ? "text-red-600 bg-red-50"
                    : "text-gray-400 hover:text-gray-700 hover:bg-gray-100"
                }`}
                title={isBookmarked ? "Saved" : "Save for later"}
              >
                <Bookmark className="w-4 h-4" fill={isBookmarked ? "currentColor" : "none"} />
              </button>
            </div>
          </div>

          {/* Title */}
          <div className="p-4 sm:p-5">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug group-hover:text-red-600 transition-colors mb-3">
              <Link href={`/news/${newsId}`}>{title}</Link>
            </h3>

            {/* Thumbnail */}
            <div className="relative rounded-xl overflow-hidden mb-3 aspect-video bg-gray-100">
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                onError={(e) => {
                  e.currentTarget.src = "/assets/demo-card-thumbnail.png";
                }}
              />
            </div>

            {/* Details snippet */}
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-2">
              {details}
            </p>
          </div>
        </div>

        {/* Card Footer */}
        <div className="px-4 sm:px-5 py-3 border-t border-gray-100 flex items-center justify-between bg-white text-xs">
          <div className="flex items-center gap-4 text-gray-500">
            <div className="flex items-center gap-1 text-amber-500 font-semibold">
              <FaStar className="w-3.5 h-3.5" />
              <span className="text-gray-800">{ratingNumber}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaRegEye className="w-3.5 h-3.5" />
              <span>{totalView}</span>
            </div>
          </div>

          <Link
            href={`/news/${newsId}`}
            className="text-red-600 font-bold hover:text-red-700 flex items-center gap-1 group/btn"
          >
            <span>Read Story</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      {showAi && (
        <AiBriefingDrawer
          title={title}
          details={details}
          category={news?.category_id}
          onClose={() => setShowAi(false)}
        />
      )}
    </>
  );
};

export default NewsCard;
