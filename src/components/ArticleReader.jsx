'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Volume2,
  VolumeX,
  Sparkles,
  Bookmark,
  Share2,
  Clock,
  ArrowLeft,
  Check,
  Type,
  ThumbsUp,
  Heart,
} from "lucide-react";
import AiBriefingDrawer from "./AiBriefingDrawer";
import ArticleAiAssistant from "./ArticleAiAssistant";
import CommentsSection from "./CommentsSection";

export default function ArticleReader({ news }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [fontSize, setFontSize] = useState("normal"); // "normal" | "large" | "xl"
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);

  // Reactions state
  const [reactions, setReactions] = useState({
    fire: 42,
    bulb: 28,
    clap: 57,
    mind: 19,
  });
  const [userReacted, setUserReacted] = useState({});

  // Reading progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const scrollPercent = (totalScroll / windowHeight) * 100;
        setScrollProgress(scrollPercent);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check initial bookmark
  useEffect(() => {
    if (!news?._id) return;
    try {
      const saved = JSON.parse(localStorage.getItem("dragon_bookmarks") || "[]");
      if (saved.some((item) => item._id === news._id)) {
        setIsBookmarked(true);
      }
    } catch {
      // storage
    }
  }, [news?._id]);

  const toggleBookmark = () => {
    try {
      const saved = JSON.parse(localStorage.getItem("dragon_bookmarks") || "[]");
      if (isBookmarked) {
        const filtered = saved.filter((item) => item._id !== news._id);
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

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleAudioNarration = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    const textToSpeak = `${news.title}. Published by ${news.author?.name || "Editorial Desk"}. ${news.details}`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 1.0;
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
    setIsPlayingAudio(true);
  };

  const handleReact = (type) => {
    if (userReacted[type]) return;
    setReactions((prev) => ({ ...prev, [type]: prev[type] + 1 }));
    setUserReacted((prev) => ({ ...prev, [type]: true }));
  };

  const fontClass = {
    normal: "text-base sm:text-lg leading-relaxed",
    large: "text-lg sm:text-xl leading-relaxed",
    xl: "text-xl sm:text-2xl leading-loose",
  }[fontSize];

  return (
    <>
      {/* Sticky Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-50 bg-gray-100">
        <div
          className="h-full bg-red-600 transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <article className="max-w-3xl mx-auto">
        {/* Navigation & Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-gray-150">
          <Link
            href={`/category/${news?.category_id || "01"}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Category</span>
          </Link>

          <div className="flex items-center gap-2">
            {/* Font Size Adjuster */}
            <div className="flex items-center bg-gray-100 rounded-lg p-0.5 text-xs font-bold text-gray-600">
              <button
                onClick={() => setFontSize("normal")}
                className={`px-2 py-1 rounded ${
                  fontSize === "normal" ? "bg-white text-black shadow-2xs" : ""
                }`}
                title="Normal text"
              >
                A
              </button>
              <button
                onClick={() => setFontSize("large")}
                className={`px-2 py-1 rounded ${
                  fontSize === "large" ? "bg-white text-black shadow-2xs" : ""
                }`}
                title="Large text"
              >
                A+
              </button>
            </div>

            {/* Audio Narration */}
            <button
              onClick={handleAudioNarration}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isPlayingAudio
                  ? "bg-red-600 text-white shadow-xs"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              {isPlayingAudio ? (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span>Stop Audio</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Listen</span>
                </>
              )}
            </button>

            {/* AI 30s Briefing */}
            <button
              onClick={() => setShowAiModal(true)}
              className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 text-xs font-semibold flex items-center gap-1 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>AI Brief</span>
            </button>

            {/* Bookmark */}
            <button
              onClick={toggleBookmark}
              className={`p-1.5 rounded-lg transition-colors ${
                isBookmarked
                  ? "text-red-600 bg-red-50"
                  : "text-gray-400 hover:text-gray-700 hover:bg-gray-100"
              }`}
              title="Bookmark story"
            >
              <Bookmark className="w-4 h-4" fill={isBookmarked ? "currentColor" : "none"} />
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              title="Copy story link"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-gray-950 font-serif leading-tight tracking-tight mb-6">
          {news?.title}
        </h1>

        {/* Author / Metadata Row */}
        <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-150">
          <img
            src={news?.author?.img || "/assets/user.png"}
            alt={news?.author?.name || "Author"}
            className="w-11 h-11 rounded-full object-cover border border-gray-200"
            onError={(e) => {
              e.currentTarget.src = "/assets/user.png";
            }}
          />
          <div>
            <div className="font-bold text-gray-900 text-sm">
              {news?.author?.name || "The Dragon Dispatch Editorial Desk"}
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>{news?.author?.published_date || "Today"}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                4 min read
              </span>
              <span>•</span>
              <span>Verified Dispatch</span>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <figure className="mb-8 rounded-2xl overflow-hidden shadow-lg border border-gray-150 bg-gray-100">
          <img
            src={news?.image_url || "/assets/demo-card-thumbnail.png"}
            alt={news?.title}
            className="w-full max-h-[500px] object-cover"
            onError={(e) => {
              e.currentTarget.src = "/assets/demo-card-thumbnail.png";
            }}
          />
        </figure>

        {/* Article Body */}
        <div className={`text-gray-800 font-serif tracking-normal ${fontClass} whitespace-pre-line space-y-4`}>
          <p>{news?.details}</p>
        </div>

        {/* Live Emoji Reactions */}
        <div className="my-10 p-5 bg-gray-50 border border-gray-150 rounded-2xl">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 text-center sm:text-left">
            How does this dispatch resonate with you?
          </h4>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
            {[
              { type: "fire", emoji: "🔥", label: "Insightful" },
              { type: "bulb", emoji: "💡", label: "Eye-Opening" },
              { type: "clap", emoji: "👏", label: "Well-Reported" },
              { type: "mind", emoji: "🤯", label: "Mind-Blowing" },
            ].map((btn) => (
              <button
                key={btn.type}
                onClick={() => handleReact(btn.type)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                  userReacted[btn.type]
                    ? "bg-red-600 text-white shadow-xs scale-105"
                    : "bg-white border border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-100"
                }`}
              >
                <span className="text-base">{btn.emoji}</span>
                <span>{btn.label}</span>
                <span className="text-[11px] opacity-75 font-mono">
                  {reactions[btn.type]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Groq AI Interactive Companion */}
        <ArticleAiAssistant
          articleTitle={news?.title}
          articleContent={news?.details}
        />

        {/* Reader Comments & Pusher Live Sync */}
        <CommentsSection articleId={news?._id} />
      </article>

      {/* AI Briefing Drawer */}
      {showAiModal && (
        <AiBriefingDrawer
          title={news?.title}
          details={news?.details}
          category={news?.category_id}
          onClose={() => setShowAiModal(false)}
        />
      )}
    </>
  );
}
